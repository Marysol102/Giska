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
const DAILY_LIMIT = 500;

const STOP_WORDS = new Set([
  "es","un","una","unos","unas","el","la","los","las","al","del",
  "de","en","por","para","con","sin","sobre","entre","hacia","hasta",
  "que","quien","cual","donde","cuando","como","cuanto","cuantos",
  "su","sus","mi","tu","se","me","te","le","nos","les","lo",
  "y","o","pero","mas","muy","ya","no","si","ni","tambien","tan",
  "tiene","puede","ser","estar","hay","son","era","fueron","algo",
  "este","esta","ese","esa","eso","aquello","esto",
  "suele","suelen","saber","hacer","mismo","misma","tipo","forma","vez",
]);

function normalize(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[¿?¡!,.\-;:'"]/g,"").replace(/\s+/g," ").trim();
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
  let bestMatch: CacheEntry | null = null;
  let bestScore = 0;
  for (const entry of entries) {
    const score = keywordSimilarity(keywords, entry.keywords);
    if (score > bestScore && score >= 0.6) { bestScore = score; bestMatch = entry; }
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
  previousQuestions: { q: string; a: boolean }[], meta?: Record<string, boolean>
): Promise<{ answer: boolean | "no_sense"; explanation: string }> {
  const metaInfo = typeof meta === 'object' && meta
    ? Object.entries(meta).filter(([, v]) => v === true).map(([k]) => k.replace(/_/g, ' ')).join(', ')
    : 'no disponible';

  const prevQsText = previousQuestions?.map((pq) => `- Pregunta: "${pq.q}" -> Respuesta: ${pq.a ? "Si" : "No"}`).join("\n") || "Ninguna.";

  const systemPrompt = `Eres un juez en un juego de adivinanzas. Tu trabajo es responder SI o NO con precision.

PALABRA SECRETA: "${meaning}" (en ${language}: "${word}")
DATOS OBJETIVOS de la palabra: ${metaInfo}
Preguntas ya respondidas:
 ${prevQsText}

Reglas ESTRICTAS:
1. Respondes SOLO con JSON: {"answer": true/false, "explanation": "razon breve en espanol"}
2. Si la pregunta no se puede responder con si/no: {"answer": "no_sense", "explanation": "No puedo responder eso."}
3. NO reveles NUNCA la palabra secreta ni partes de ella
4. NO inventes informacion. Usa los datos objetivos proporcionados para decidir.
5. Si la pregunta es sobre algo que no esta en los datos objetivos, razona logicamente pero no inventes.
6. Responde EXACTAMENTE JSON, sin texto antes ni despues.`;

  const userPrompt = `Pregunta del jugador: "${question}"\n\nResponde en JSON.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model: GROQ_MODEL, temperature: 0.1, max_tokens: 150,
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API error ${response.status}: ${errText.slice(0, 200)}`);
  }

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
      return NextResponse.json({ answer: "no_sense", explanation: "La IA no esta configurada.", noApiKey: true }, { status: 200 });
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

    const result = await askGroq(question, meaning, word, language, previousQuestions || [], meta as Record<string, boolean> | undefined);
    incrementDailyCount();
    storeInCache(meaning, normalizedQ, keywords, result.answer, result.explanation);

    return NextResponse.json({ answer: result.answer, explanation: result.explanation, cached: false, dailyCount: getDailyCount(), dailyLimit: DAILY_LIMIT });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("AI question error:", errorMsg);
    return NextResponse.json({ answer: "no_sense", explanation: `Error: ${errorMsg}` }, { status: 200 });
  }
}
