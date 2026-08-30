import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const normalizeWhitespace = (text: string) =>
  String(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

const stripMarkdown = (text: string) =>
  String(text || "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "$1")
    .replace(/^(\s*[-*+])\s+/gm, "$1 ")
    .replace(/^(\s*\d+\.)\s+/gm, "$1 ")
    .replace(/^---+$/gm, "")
    .replace(/^(?:>\s?)+/gm, "")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/~~(.+?)~~/g, "$1")
    .replace(/\|(.+?)\|/g, "$1")
    .replace(/^(\s*[-*+])$|^(\s*\d+\.)$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const splitWords = (text: string) => normalizeWhitespace(text).split(/\s+/).filter(Boolean);

const splitSentences = (text: string) => {
  const full = normalizeWhitespace(text);
  if (!full) return [];
  return (full.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map((s) => s.trim()).filter(Boolean);
};

const TOHUMAN_API_KEY = process.env.TOHUMAN_API_KEY || "";

const buildPrompt = (text: string) =>
  `Revise the following text to sound more human and natural, minimizing patterns typically associated with AI-generated writing. Use a mix of short and long sentences, vary sentence structures, reduce repetitive phrasing, keep the meaning intact, and preserve clarity. Avoid sounding robotic or overly formal unless the source requires it. Here is the text:\n\n${text}`;

const humanizeWithToHuman = async (text: string, signal: AbortSignal) => {
  if (!TOHUMAN_API_KEY) return null;
  const response = await fetch("https://tohuman.io/api/v1/humanizations/sync", {
    method: "POST",
    headers: {
      authorization: `Bearer ${TOHUMAN_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ content: text, intensity: "medium" }),
    signal,
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`ToHuman returned ${response.status}`);
  }
  const data = (await response.json()) as Record<string, unknown>;
  const out = String(data?.output_content || data?.humanized_text || data?.output || "").trim();
  if (!out) throw new Error("ToHuman returned empty text");
  return out;
};

const humanizeWithPollinations = async (text: string, signal: AbortSignal) => {
  const prompt = buildPrompt(text);
  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "*/*",
      origin: "https://zayuvalya.github.io",
      referer: "https://zayuvalya.github.io/",
      "user-agent": "Mozilla/5.0",
    },
    signal,
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Pollinations returned ${response.status}`);
  }
  const out = stripMarkdown(normalizeWhitespace(await response.text()));
  if (!out) throw new Error("Pollinations returned empty text");
  return out;
};

const buildStats = (originalText: string, humanizedText: string) => {
  const originalWords = splitWords(originalText);
  const humanizedWords = splitWords(humanizedText);
  const originalSentences = splitSentences(originalText);
  const humanizedSentences = splitSentences(humanizedText);
  const avgWordLen = humanizedWords.length
    ? humanizedWords.reduce((sum, word) => sum + word.length, 0) / humanizedWords.length
    : 0;
  const sentLengths = humanizedSentences.map((sentence) => splitWords(sentence).length).filter((n) => n > 0);
  const sentMean = sentLengths.length ? sentLengths.reduce((a, b) => a + b, 0) / sentLengths.length : 0;
  const sentVariance =
    sentLengths.length && sentMean
      ? sentLengths.reduce((sum, len) => sum + (len - sentMean) ** 2, 0) / sentLengths.length
      : 0;
  const varietyScore = Math.max(0, Math.min(100, Math.round((Math.sqrt(sentVariance) / Math.max(sentMean, 1)) * 120)));
  const readabilityScore = Math.max(0, Math.min(100, Math.round(((9.2 - avgWordLen) / 5.2) * 100)));

  return {
    original_words: originalWords.length,
    humanized_words: humanizedWords.length,
    original_sentences: originalSentences.length,
    humanized_sentences: humanizedSentences.length,
    variety_score: varietyScore,
    readability_score: readabilityScore,
  };
};

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const text = typeof (body as Record<string, unknown>)?.text === "string" ? String((body as Record<string, unknown>).text) : "";
  if (!text.trim()) {
    return NextResponse.json({ success: false, error: "Text is required" }, { status: 400 });
  }
  if (text.length > 12_000) {
    return NextResponse.json(
      { success: false, error: "Text too long for cloud humanizer (max 12,000 chars)" },
      { status: 400 }
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    let humanizedText = "";
    let provider = "Pollinations Humanizer";
    const errors: string[] = [];

    try {
      if (TOHUMAN_API_KEY) {
        try {
          humanizedText = (await humanizeWithToHuman(text, controller.signal)) || "";
          provider = "ToHuman Humanizer";
        } catch (error) {
          errors.push(error instanceof Error ? error.message : String(error));
        }
      }
      if (!humanizedText) {
        try {
          humanizedText = await humanizeWithPollinations(text, controller.signal);
        } catch (error) {
          errors.push(error instanceof Error ? error.message : String(error));
        }
      }
    } finally {
      clearTimeout(timeout);
    }

    if (!humanizedText) {
      return NextResponse.json(
        {
          success: false,
          error: "Humanizer unavailable",
          details: errors.join("; ") || "No humanizer provider configured",
        },
        { status: 502 }
      );
    }

    const cleanOriginal = normalizeWhitespace(text);
    const stats = buildStats(cleanOriginal, humanizedText);

    return NextResponse.json(
      {
        success: true,
        data: {
          Model: provider,
          original_text: cleanOriginal,
          humanized_text: humanizedText,
          stats,
          changes: ["Cloud rewrite", "Naturalized phrasing", "Sentence rhythm adjusted"],
          note: "Review the output for tone, meaning, and factual accuracy before publishing.",
        },
        message: "Humanized text is now ready.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Humanizer failed to run",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 503 }
    );
  }
}