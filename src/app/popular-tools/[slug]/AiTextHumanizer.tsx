"use client";

import { useState } from "react";
import styles from "./tool-detail.module.css";

type Stats = {
  original_words: number;
  humanized_words: number;
  original_sentences: number;
  humanized_sentences: number;
  variety_score: number;
  readability_score: number;
};

type Result = {
  Model: string;
  original_text: string;
  humanized_text: string;
  stats: Stats;
  changes: string[];
  note: string;
};

const SAMPLE = `In today's digital world, having a strong online presence is essential for businesses of all sizes. It is important to implement effective strategies to improve visibility and drive consistent traffic. By focusing on content quality and search engine optimization, you can achieve long-term success. Whether you're a small startup or an established company, these approaches provide reliable results and help you make informed decisions.`;

export default function AiTextHumanizer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const humanize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/tools/ai-text-humanizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The humanizer could not process this text. Try again in a moment.");
      setResult(data.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The humanizer is unavailable right now.");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.humanized_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const href = URL.createObjectURL(new Blob([result.humanized_text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = href;
    link.download = "humanized-text.txt";
    link.click();
    URL.revokeObjectURL(href);
  };

  return (
    <div>
      <label className={styles.label}>Original AI-generated text</label>
      <textarea
        className={styles.textarea}
        style={{ minHeight: 200 }}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Paste your AI-generated text here… (max 12,000 characters)"
      />
      <div className={styles.helperText} style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
        <span>{text.trim().length > 0 ? `${text.trim().length.toLocaleString()} characters` : "Paste up to 12,000 characters"}</span>
        <b style={{ color: text.length > 12000 ? "#cc5500" : undefined }}>{text.length > 12000 ? "Over limit" : ""}</b>
      </div>
      <div className={styles.buttonRow}>
        <button type="button" className={styles.button} onClick={humanize} disabled={!text.trim() || loading || text.length > 12000}>
          {loading ? "Humanizing…" : "Humanize text"}
        </button>
        <button type="button" className={styles.buttonSecondary} onClick={() => setText(SAMPLE)}>Load sample</button>
        <button type="button" className={styles.buttonSecondary} onClick={() => { setText(""); setResult(null); setError(""); }}>Clear</button>
      </div>

      {error && <p className={`${styles.statusBadge} ${styles.error}`}>{error}</p>}

      {result && (
        <div style={{ marginTop: 16 }}>
          <div className={styles.twoCol}>
            <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <p className={styles.helperText} style={{ margin: 0 }}>
                Rewritten with <strong>{result.Model}</strong>
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className={styles.button} onClick={copyResult}>{copied ? "Copied!" : "Copy"}</button>
                <button type="button" className={styles.buttonSecondary} onClick={downloadResult}>Download</button>
              </div>
            </div>
          </div>

          <div className={styles.metricGrid}>
            <div className={styles.metric}><span>Original words</span><strong>{result.stats.original_words.toLocaleString()}</strong></div>
            <div className={styles.metric}><span>Humanized words</span><strong>{result.stats.humanized_words.toLocaleString()}</strong></div>
            <div className={styles.metric}><span>Sentence variety</span><strong>{result.stats.variety_score}/100</strong></div>
            <div className={styles.metric}><span>Readability</span><strong>{result.stats.readability_score}/100</strong></div>
          </div>

          <label className={styles.label} style={{ marginTop: 12 }}>Humanized version</label>
          <div className={styles.output} style={{ minHeight: 200, fontSize: "0.95rem", lineHeight: 1.7 }}>{result.humanized_text}</div>

          <p className={styles.helperText}>{result.note}</p>
          {result.changes.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {result.changes.map((change) => (
                <span key={change} className={styles.statusBadge} style={{ marginTop: 0, background: "#ffedd5", color: "#664000", padding: "0.3rem 0.7rem" }}>{change}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}