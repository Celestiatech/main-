"use client";

import { useMemo, useState } from "react";
import styles from "./tool-detail.module.css";

type SentenceResult = { text: string; ai: number; label: "AI" | "Human" | "Mixed" };
type Pattern = { name: string; detected: boolean; score: number };

type Data = {
  AI: number;
  Human: number;
  Label: "AI" | "Human" | "Mixed";
  Mode: string;
  Model: string;
  explanation: string[];
  patterns: Pattern[];
  Sentences: SentenceResult[];
  totalSentences: number;
  totalAiSentences: number;
  totalHumanSentences: number;
};

const SAMPLE = `In today's digital world, having a strong online presence is essential for businesses of all sizes. It is important to implement effective strategies to improve visibility and drive consistent traffic. By focusing on content quality and search engine optimization, you can achieve long-term success.`;

function scoreColor(score: number) {
  if (score >= 70) return "#cc5500";
  if (score >= 45) return "#d97706";
  return "#166534";
}

export default function AiContentDetector() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"balanced" | "aggressive" | "conservative">("balanced");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<Data | null>(null);

  const sentenceCount = useMemo(() => (text.trim() ? (text.trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).length : 0), [text]);

  const detect = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/tools/ai-content-detector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The detector could not process this text.");
      setData(result.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The detector is unavailable right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.twoCol}>
        <div>
          <label className={styles.label}>Detection mode</label>
          <select className={styles.select} value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}>
            <option value="balanced">Balanced (default)</option>
            <option value="aggressive">Aggressive — flags more</option>
            <option value="conservative">Conservative — flags less</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>Current text</label>
          <div className={styles.metric} style={{ marginTop: 0 }}>
            <span>Sentences</span>
            <strong>{sentenceCount}</strong>
          </div>
        </div>
      </div>

      <label className={styles.label} style={{ marginTop: 12 }}>Text to analyze</label>
      <textarea
        className={styles.textarea}
        style={{ minHeight: 200 }}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Paste the text you want to check… (max 60,000 characters)"
      />
      <div className={styles.helperText} style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
        <span>A heuristic analyzer — estimate, not a guarantee.</span>
        <b style={{ color: text.length > 60000 ? "#cc5500" : undefined }}>{text.length > 60000 ? "Over limit" : `${text.length.toLocaleString()} chars`}</b>
      </div>
      <div className={styles.buttonRow}>
        <button type="button" className={styles.button} onClick={detect} disabled={!text.trim() || loading || text.length > 60000}>
          {loading ? "Analyzing…" : "Detect AI content"}
        </button>
        <button type="button" className={styles.buttonSecondary} onClick={() => setText(SAMPLE)}>Load sample</button>
        <button type="button" className={styles.buttonSecondary} onClick={() => { setText(""); setData(null); setError(""); }}>Clear</button>
      </div>

      {error && <p className={`${styles.statusBadge} ${styles.error}`}>{error}</p>}

      {data && (
        <div style={{ marginTop: 16 }}>
          <div style={{ border: `1px solid ${scoreColor(data.AI)}`, borderRadius: 14, padding: "1rem", background: "#fffaf5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div>
                <h3 style={{ margin: 0, color: scoreColor(data.AI), fontSize: "1.5rem" }}>
                  {data.AI}% AI<span style={{ fontSize: "0.9rem", color: "#4b627b" }}> / {data.Human}% human</span>
                </h3>
                <p className={styles.helperText} style={{ margin: "0.2rem 0 0" }}>
                  Verdict: <strong>{data.Label}</strong> · {data.totalAiSentences} of {data.totalSentences} sentences look AI-written · {data.Model}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className={styles.statusBadge} style={{ marginTop: 0, background: scoreColor(data.AI), color: "#fff", padding: "0.35rem 0.9rem" }}>
                  {data.Label === "AI" ? "Likely AI-written" : data.Label === "Mixed" ? "Mixed content" : "Likely human"}
                </span>
              </div>
            </div>

            {data.explanation.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                {data.explanation.map((item) => (
                  <span key={item} className={styles.statusBadge} style={{ marginTop: 0, background: "#ffedd5", color: "#664000", padding: "0.3rem 0.7rem" }}>{item}</span>
                ))}
              </div>
            )}

            {data.patterns.filter((p) => p.detected).length > 0 && (
              <div style={{ marginTop: 14 }}>
                <p className={styles.label} style={{ marginBottom: 6 }}>Detected patterns</p>
                {data.patterns.filter((p) => p.detected).slice(0, 8).map((pattern) => (
                  <div key={pattern.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ flex: 1, fontSize: "0.9rem" }}>{pattern.name}</span>
                    <div style={{ width: 140, height: 8, borderRadius: 6, background: "#e5ebf3", overflow: "hidden" }}>
                      <div style={{ width: `${Math.round(pattern.score * 100)}%`, height: "100%", background: scoreColor(pattern.score * 100) }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className={styles.label} style={{ marginTop: 14 }}>Sentence-by-sentence</label>
          <div style={{ display: "grid", gap: 6, maxHeight: 380, overflow: "auto" }}>
            {data.Sentences.map((sentence, index) => (
              <div key={`${sentence.text}-${index}`} style={{ display: "flex", gap: 10, alignItems: "flex-start", border: "1px solid #e5ebf3", borderRadius: 10, padding: "0.6rem", background: sentence.label === "AI" ? "#fff7ed" : "#f8fafc" }}>
                <span style={{ whiteSpace: "nowrap", fontSize: "0.8rem", color: sentence.label === "AI" ? "#cc5500" : "#166534", fontWeight: 600, minWidth: 78 }}>{Math.round(sentence.ai * 100)}% {sentence.label}</span>
                <span style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>{sentence.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}