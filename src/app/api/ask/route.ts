import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_MODEL = "openai/gpt-oss-120b";

interface CacheEntry {
  answer: boolean | "no_sense";
  explanation: string;
  normalizedQ: string;
  keywords: string[];
}

const questionCache = new Map<string, CacheEntry[]>();
const dailyCallCount = new Map<string, number>();
const DAILY_LIMIT = 200;

const STOP_WORDS = new Set([
  "es", "un", "una", "unos", "unas", "el", "la", "los", "las", "al", "del",
  "de", "en", "por", "para", "con", "sin", "sobre", "entre", "hacia", "hasta",
  "que", "quien", "cual", "donde", "cuando", "como", "cuanto", "cuantos",
  "su", "sus", "mi", "tu", "se", "me", "te", "le", "nos", "les", "lo",
  "y", "o", "pero", "mas", "muy", "ya", "no", "si", "ni", "tambien", "tan",
  "tiene", "puede", "ser", "estar", "hay", "son", "era", "fueron", "algo",
  "este", "esta", "ese", "esa", "eso", "aquello", "esto",
  "suele", "suelen", "saber", "hacer",
  "mismo", "misma", "tipo", "forma", "vez",
]);

function normalize(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[¿?¡!,.\-;:'"]/g, "").replace(/\s+/g, " ").trim();
}

function extractKeywords(normalizedQ: string): string[] {
  return normalizedQ.split(" ").filter((w) => w.length > 2 && !STOP_WORDS.has(w)).sort();
}

function keywordSimilarity(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  let overlap = 0;
  for (const kw of setA) { if (setB.has(kw)) overlap++; }
  const union = new Set([...setA, ...setB]).size;
  return union > 0 ? overlap / union : 0;
}

function findCachedAnswer(meaning: string, normalizedQ: string, keywords: string[]): CacheEntry | null {
  const entries = questionCache.get(meaning);
  if (!entries || entries.length === 0) return null;
  const exact = entries.find((e) => e.normalizedQ === normalizedQ);
  if (exact) return exact;
  const THRESHOLD = 0.6;
  let bestMatch: CacheEntry | null = null;
  let bestScore = 0;
  for (const entry of entries) {
    const score = keywordSimilarity(keywords, entry.keywords);
    if (score > bestScore && score >= THRESHOLD) { bestScore = score; bestMatch = entry; }
  }
  return bestMatch;
}

function storeInCache(meaning: string, normalizedQ: string, keywords: string[], answer: boolean | "no_sense", explanation: string) {
  const entries = questionCache.get(meaning) || [];
  entries.push({ answer, explanation, normalizedQ, keywords });
  if (entries.length > 500) entries.splice(0, entries.length - 500);
  questionCache.set(meaning, entries);
}

function getTodayKey(): string { return new Date().toISOString().slice(0, 10); }
function getDailyCount(): number { return dailyCallCount.get(getTodayKey()) || 0; }
function incrementDailyCount(): void {
  const key = getTodayKey();
  dailyCallCount.set(key, (dailyCallCount.get(key) || 0) + 1);
}

async function askGroq(
  question: string, meaning: string, word: string, language: string,
  previousQuestions: { q: string; a: boolean }[],
  meta: Record<string, boolean> | null
): Promise<{ answer: boolean | "no_sense"; explanation: string }> {
  const prevQsText = previousQuestions?.map((pq) => `- Pregunta: "${pq.q}" -> Respuesta: ${pq.a ? "Si" : "No"}`).join("\n") || "Ninguna.";

  let metaText = "";
  if (meta && typeof meta === "object" && Object.keys(meta).length > 0) {
    const labels: Record<string, string> = {
      is_animal: "Animal", is_food: "Comida/bebida", is_object: "Objeto",
      is_body_part: "Parte del cuerpo", is_place: "Lugar",
      is_emotion: "Emocion/sentimiento", is_action: "Accion/verbo",
      is_clothing: "Ropa/accesorio", is_vehicle: "Vehiculo", is_plant: "Planta",
      is_weather: "Fenomeno climatico", is_profession: "Profesion/oficio",
      is_natural: "Natural (no creado por humanos)", is_alive: "Esta vivo",
      is_man_made: "Creado por humanos", is_tangible: "Se puede tocar",
      is_heavy: "Pesado", is_soft: "Suave/flexible", is_round: "Redondo",
      is_shiny: "Brilla/refleja luz", is_colorful: "Colorido",
      is_cold: "Frio al tacto", has_parts: "Tiene varias partes",
      is_found_indoors: "Se encuentra dentro de casa",
      is_found_outdoors: "Se encuentra al aire libre",
      is_found_in_water: "Se encuentra en el agua",
      is_found_in_sky: "Se encuentra en el cielo/alto",
      is_used_daily: "Se usa a diario", can_be_bought: "Se puede comprar en tienda",
      is_edible: "Se puede comer/beber", is_dangerous: "Peligroso",
      makes_sound: "Hace sonido", can_be_worn: "Se puede llevar puesto",
      is_bigger_than_person: "Mas grande que una persona",
      fits_in_hand: "Cabe en una mano",
    };
    const metaLines = Object.entries(meta)
      .filter(([key]) => labels[key])
      .map(([key, val]) => `  - ${labels[key]}: ${val ? "SI" : "NO"}`)
      .join("\n");
    metaText = `
DATOS OBJETIVOS SOBRE LA PALABRA (usa ESTOS datos para responder, son la fuente de verdad):
${metaLines}
IMPORTANTE: Nunca reveles estos datos directamente al jugador.`;
  }

 const systemPrompt = `Eres un asistente en un juego de adivinanzas de palabras. Respondes SI o NO a las preguntas del jugador sobre la palabra secreta.

La palabra secreta es: "${meaning}" (en ${language}: "${word}")

 ${metaText}

Preguntas ya realizadas:
 ${prevQsText}

REGLAS ESTRICTAS:
1. Piensa con cuidado antes de responder. Considera qué es realmente "${meaning}" en el mundo real y responde de forma precisa.
2. Si la pregunta no tiene sentido o no se puede responder con si/no, responde 'no_sense'
3. NUNCA reveles la palabra secreta ni des pistas directas.
4. No reveles los datos objetivos al jugador.
5. Si la pregunta esta cubierta por los datos objetivos, usa esos datos. Si no esta cubierta, usa tu conocimiento general sobre "${meaning}".
6. Responde SOLO en JSON: { "answer": true/false/"no_sense", "explanation": "explicacion breve en espanol, maximo 15 palabras" }
7. No anadas texto adicional fuera del JSON.

EJEMPLOS de como debes razonar:
- Pregunta "¿Crece con el tiempo?" sobre algo que crece → answer: true
- Pregunta "¿Es de metal?" sobre un objeto metalico → answer: true
- Pregunta "¿Se puede comer?" sobre algo no comestible → answer: false
- Pregunta "¿Es un animal?" sobre un objeto → answer: false`;

  const url = "https://api.groq.com/openai/v1/chat/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.1,
      max_tokens: 100,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Pregunta del jugador: "${question}"` },
      ],
    }),
  });

  if (!response.ok) throw new Error(`Groq API error: ${response.status}`);

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || "";

  let parsed: { answer: boolean | string; explanation: string };
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) { parsed = JSON.parse(jsonMatch[0]); } else { throw new Error("No JSON found"); }
  } catch {
    const lower = content.toLowerCase();
    if (lower.includes("no_sense") || lower.includes("no se") || lower.includes("no sé")) {
      parsed = { answer: "no_sense", explanation: "No puedo responder a esa pregunta." };
    } else if (lower.includes('"answer": true') || lower.includes('"answer":true') || (lower.includes("si") && !lower.includes("no_sense"))) {
      parsed = { answer: true, explanation: "Si, es correcto." };
    } else {
      parsed = { answer: false, explanation: "No, eso no es correcto." };
    }
  }

  return {
    answer: parsed.answer === "no_sense" ? "no_sense" : !!parsed.answer,
    explanation: typeof parsed.explanation === "string" ? parsed.explanation.slice(0, 100) : "Procesando respuesta...",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, meaning, word, language, previousQuestions, meta } = body;

    if (!question || !meaning || !word || !language) {
      return NextResponse.json({ error: "Faltan parametros requeridos" }, { status: 400 });
    }
    if (question.trim().length < 3) {
      return NextResponse.json({ answer: "no_sense", explanation: "La pregunta es demasiado corta." }, { status: 200 });
    }
    if (!GROQ_API_KEY) {
      return NextResponse.json({ answer: "no_sense", explanation: "La IA no esta configurada. El administrador necesita agregar la API key de Groq.", noApiKey: true }, { status: 200 });
    }
    const dailyCount = getDailyCount();
    if (dailyCount >= DAILY_LIMIT) {
      return NextResponse.json({ answer: "no_sense", explanation: "Hoy se han agotado las preguntas a la IA.", dailyLimitReached: true, dailyCount, dailyLimit: DAILY_LIMIT }, { status: 200 });
    }

    const normalizedQ = normalize(question);
    const keywords = extractKeywords(normalizedQ);
    const cached = findCachedAnswer(meaning, normalizedQ, keywords);
    if (cached) {
      return NextResponse.json({ answer: cached.answer, explanation: cached.explanation, cached: true, dailyCount, dailyLimit: DAILY_LIMIT });
    }

    const result = await askGroq(question, meaning, word, language, previousQuestions || [], meta || null);
    incrementDailyCount();
    storeInCache(meaning, normalizedQ, keywords, result.answer, result.explanation);
    return NextResponse.json({ answer: result.answer, explanation: result.explanation, cached: false, dailyCount: getDailyCount(), dailyLimit: DAILY_LIMIT });
  } catch (error) {
    console.error("AI question error:", error);
    return NextResponse.json({ answer: "no_sense", explanation: "Error al procesar la pregunta. Intentalo de nuevo." }, { status: 200 });
  }
}
