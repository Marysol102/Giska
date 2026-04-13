import { NextRequest, NextResponse } from "next/server";

// ============================================================
// GOOGLE GEMINI API — Free tier: 1,500 requests/day
// ============================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = "gemini-2.5-flash";

// ============================================================
// SMART CACHE — Semantic keyword matching for similar questions
// ============================================================

interface CacheEntry {
  answer: boolean | "no_sense";
  explanation: string;
  normalizedQ: string;
  keywords: string[];
}

// In-memory cache: key = meaning (daily word), value = array of cached Q&A
const questionCache = new Map<string, CacheEntry[]>();

// Daily AI call counter: key = date string (YYYY-MM-DD)
const dailyCallCount = new Map<string, number>();
const DAILY_LIMIT = 200; // Free safety margin (Gemini allows 1,500/day)

// Spanish stop words to ignore when extracting keywords
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
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!,.\-;:'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractKeywords(normalizedQ: string): string[] {
  const words = normalizedQ.split(" ");
  return words
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .sort();
}

function keywordSimilarity(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  let overlap = 0;
  for (const kw of setA) {
    if (setB.has(kw)) overlap++;
  }
  const union = new Set([...setA, ...setB]).size;
  return union > 0 ? overlap / union : 0;
}

function findCachedAnswer(
  meaning: string,
  normalizedQ: string,
  keywords: string[]
): CacheEntry | null {
  const entries = questionCache.get(meaning);
  if (!entries || entries.length === 0) return null;

  const exact = entries.find((e) => e.normalizedQ === normalizedQ);
  if (exact) return exact;

  const THRESHOLD = 0.6;
  let bestMatch: CacheEntry | null = null;
  let bestScore = 0;

  for (const entry of entries) {
    const score = keywordSimilarity(keywords, entry.keywords);
    if (score > bestScore && score >= THRESHOLD) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch;
}

function storeInCache(
  meaning: string,
  normalizedQ: string,
  keywords: string[],
  answer: boolean | "no_sense",
  explanation: string
) {
  const entries = questionCache.get(meaning) || [];
  entries.push({ answer, explanation, normalizedQ, keywords });
  if (entries.length > 500) {
    entries.splice(0, entries.length - 500);
  }
  questionCache.set(meaning, entries);
}

// ============================================================
// DAILY LIMIT
// ============================================================

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDailyCount(): number {
  return dailyCallCount.get(getTodayKey()) || 0;
}

function incrementDailyCount(): void {
  const key = getTodayKey();
  dailyCallCount.set(key, (dailyCallCount.get(key) || 0) + 1);
}

// ============================================================
// GOOGLE GEMINI API CALL
// ============================================================

async function askGemini(
  question: string,
  meaning: string,
  word: string,
  language: string,
  previousQuestions: { q: string; a: boolean }[]
): Promise<{ answer: boolean | "no_sense"; explanation: string }> {
  const prevQsText =
    previousQuestions
      ?.map(
        (pq) =>
          `- Pregunta: "${pq.q}" -> Respuesta: ${pq.a ? "Si" : "No"}`
      )
      .join("\n") || "Ninguna.";

  const systemPrompt = `Estas jugando a un juego de adivinanzas de palabras. La palabra secreta es '${meaning}' (en ${language}, se escribe '${word}').

Tu UNICA funcion es responder SI o NO a las preguntas del jugador. NUNCA reveles la palabra secreta ni des pistas directas sobre ella.

Preguntas ya realizadas por el jugador:
${prevQsText}

Reglas:
1. Si la pregunta no tiene sentido o no se puede responder con si/no, responde 'no_sense'
2. No reveles NUNCA la palabra secreta ni partes de ella
3. Responde SOLO en formato JSON exacto: { "answer": true/false/"no_sense", "explanation": "breve explicacion en espanol de maximo 15 palabras" }
4. No anadas texto adicional fuera del JSON`;

  const userPrompt = `Pregunta del jugador: "${question}"`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\n${userPrompt}` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 100,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gemini API error:", response.status, errText);
    throw new Error(`Gemini API error ${response.status}: ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  let parsed: { answer: boolean | string; explanation: string };
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("No JSON found");
    }
  } catch {
    const lower = content.toLowerCase();
    if (lower.includes("no_sense") || lower.includes("no se") || lower.includes("no sé")) {
      parsed = {
        answer: "no_sense",
        explanation: "No puedo responder a esa pregunta.",
      };
    } else if (
      lower.includes('"answer": true') ||
      lower.includes('"answer":true') ||
      (lower.includes("si") && !lower.includes("no_sense"))
    ) {
      parsed = { answer: true, explanation: "Si, es correcto." };
    } else {
      parsed = { answer: false, explanation: "No, eso no es correcto." };
    }
  }

  return {
    answer: parsed.answer === "no_sense" ? "no_sense" : !!parsed.answer,
    explanation:
      typeof parsed.explanation === "string"
        ? parsed.explanation.slice(0, 100)
        : "Procesando respuesta...",
  };
}

// ============================================================
// API ROUTE
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, meaning, word, language, previousQuestions } = body;

    if (!question || !meaning || !word || !language) {
      return NextResponse.json(
        { error: "Faltan parametros requeridos" },
        { status: 400 }
      );
    }

    if (question.trim().length < 3) {
      return NextResponse.json(
        { answer: "no_sense", explanation: "La pregunta es demasiado corta." },
        { status: 200 }
      );
    }

    // Check if Gemini API key is configured
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        {
          answer: "no_sense",
          explanation: "La IA no esta configurada todavia. El administrador necesita agregar la API key de Gemini.",
          noApiKey: true,
        },
        { status: 200 }
      );
    }

    // Check daily limit
    const dailyCount = getDailyCount();
    if (dailyCount >= DAILY_LIMIT) {
      return NextResponse.json(
        {
          answer: "no_sense",
          explanation: "Hoy se han agotado las preguntas a la IA. Vuelve manana o usa las preguntas predefinidas.",
          dailyLimitReached: true,
          dailyCount,
          dailyLimit: DAILY_LIMIT,
        },
        { status: 200 }
      );
    }

    // Normalize and extract keywords for cache lookup
    const normalizedQ = normalize(question);
    const keywords = extractKeywords(normalizedQ);

    // Check cache first
    const cached = findCachedAnswer(meaning, normalizedQ, keywords);
    if (cached) {
      console.log(`[CACHE HIT] "${question}" -> matched "${cached.normalizedQ}"`);
      return NextResponse.json({
        answer: cached.answer,
        explanation: cached.explanation,
        cached: true,
        dailyCount,
        dailyLimit: DAILY_LIMIT,
      });
    }

    // Cache miss — ask Gemini
    console.log(`[AI CALL ${dailyCount + 1}/${DAILY_LIMIT}] "${question}" (keywords: [${keywords.join(", ")}])`);
    const result = await askGemini(
      question,
      meaning,
      word,
      language,
      previousQuestions || []
    );

    // Increment counter and store in cache
    incrementDailyCount();
    storeInCache(meaning, normalizedQ, keywords, result.answer, result.explanation);

    return NextResponse.json({
      answer: result.answer,
      explanation: result.explanation,
      cached: false,
      dailyCount: getDailyCount(),
      dailyLimit: DAILY_LIMIT,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("AI question error:", errorMsg);
    return NextResponse.json(
      {
        answer: "no_sense",
        explanation: `Error: ${errorMsg}`,
      },
      { status: 200 }
    );
  }
}
