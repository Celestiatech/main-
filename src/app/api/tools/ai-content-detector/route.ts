import { NextRequest, NextResponse } from "next/server";
import { detectAIContentHeuristic } from "@/lib/ai-content-detector";

function parseMode(value: unknown) {
  const mode = String(value || "balanced").toLowerCase();
  if (mode === "aggressive" || mode === "conservative") return mode;
  return "balanced";
}

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
  if (text.length > 60_000) {
    return NextResponse.json({ success: false, error: "Text too long (max 60,000 chars)" }, { status: 400 });
  }

  try {
    const data = detectAIContentHeuristic(text, parseMode((body as Record<string, unknown>)?.mode));
    return NextResponse.json(
      { success: true, data, message: "AI content detection results are ready." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Detector failed to run", details: error instanceof Error ? error.message : String(error) },
      { status: 503 }
    );
  }
}