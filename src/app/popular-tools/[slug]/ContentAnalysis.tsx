"use client";

import { useMemo, useState } from "react";
import styles from "./tool-detail.module.css";

const stripHtml = (value: string) =>
  value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

function countSyllables(word: string) {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const matches = w.match(/[aeiouy]+/g);
  let count = matches ? matches.length : 0;
  if (w.endsWith("e")) count -= 1;
  if (w.endsWith("le") && w.length > 2 && !/[aeiouy]le$/.test(w) && w[w.length - 3] !== w[w.length - 2]) count += 1;
  return Math.max(1, count);
}

function readability(text: string) {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return null;
  const sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((s) => s.trim());
  const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  const sentenceCount = sentences.length || 1;
  const fre = 206.835 - 1.015 * (words.length / sentenceCount) - 84.6 * (totalSyllables / words.length);
  const grade = 0.39 * (words.length / sentenceCount) + 11.8 * (totalSyllables / words.length) - 15.59;
  const clampedFre = Math.max(0, Math.min(100, Math.round(fre)));
  const clampedGrade = Math.max(1, Math.round(grade));
  return { fre: clampedFre, grade: clampedGrade };
}

function gradeLabel(fre: number) {
  if (fre >= 90) return "Very easy (5th grade)";
  if (fre >= 80) return "Easy (6th grade)";
  if (fre >= 70) return "Fairly easy (7th grade)";
  if (fre >= 60) return "Standard (8th-9th grade)";
  if (fre >= 50) return "Fairly difficult (10th-12th grade)";
  if (fre >= 30) return "Difficult (college)";
  return "Very difficult (college graduate)";
}

export default function ContentAnalysis() {
  const [mode, setMode] = useState<"text" | "url">("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("https://example.com/blog/post");
  const [keywords, setKeywords] = useState("best seo tools, free tools");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const runWithUrl = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/tools/fetch-page?url=${encodeURIComponent(url)}`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not fetch the page.");
      setText(String(data.html || ""));
      setMode("text");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to read the page.");
    } finally {
      setLoading(false);
    }
  };

  const analysis = useMemo(() => {
    const isHtml = /<[a-z][\s\S]*>/i.test(text);
    const mainText = isHtml ? stripHtml(text) : text;
    const cleanText = mainText.replace(/\s+/g, " ").trim();
    const words = cleanText ? cleanText.split(" ").filter(Boolean) : [];
    const wordCount = words.length;
    const sentences = (cleanText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((s) => s.split(/\s+/).filter(Boolean).length >= 2);
    const sentenceCount = sentences.length;
    const readingMinutes = wordCount / 200;
    const speakingMinutes = wordCount / 130;
    const sentenceLengths = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
    const avgSentenceLength = sentenceLengths.length ? sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length : 0;
    const read = readability(cleanText);

    const keywordList = keywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
    const lowerText = cleanText.toLowerCase();
    const density = keywordList.map((keyword) => {
      const count = lowerText.split(keyword).length - 1;
      return { keyword, count, density: wordCount ? Math.round((count / wordCount) * 1000) / 10 : 0 };
    });

    const headings = isHtml ? (text.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || []).length : null;

    const suggestions: string[] = [];
    if (wordCount > 0 && wordCount < 300) suggestions.push("Content is on the shorter side — pages under 300 words rarely rank for competitive terms.");
    if (read && read.fre < 50) suggestions.push("Readability is low. Shorten sentences and use simpler words to reach a wider audience.");
    if (read && read.fre >= 60 && read.fre <= 80) suggestions.push("Readability is in a comfortable range for most web readers.");
    if (sentenceCount > 0 && avgSentenceLength > 22) suggestions.push(`Average sentence length is ${Math.round(avgSentenceLength)} words — aim for 15–20.`);
    if (headings !== null && headings === 0 && isHtml) suggestions.push("No heading tags (<h1>–<h6>) found. Use them to structure the page.");
    if (density.some((d) => d.count > 0 && d.density < 0.5)) suggestions.push("Target keywords appear less than 0.5% — consider using them naturally a few more times.");
    if (density.every((d) => d.count === 0)) suggestions.push("None of your target keywords appear in the content.");

    return {
      isHtml,
      wordCount,
      sentenceCount,
      readingMinutes,
      speakingMinutes,
      avgSentenceLength,
      fre: read?.fre ?? null,
      grade: read?.grade ?? null,
      headings,
      keywordDensity: density,
      suggestions: suggestions.slice(0, 6),
    };
  }, [text, keywords]);

  return (
    <div>
      <div className={styles.twoCol}>
        <div>
          <label className={styles.label}>Content (paste text or HTML)</label>
          <button type="button" className={styles.button} onClick={() => setMode("text")} disabled={mode === "text"}>Paste content</button>
        </div>
        <div>
          <label className={styles.label}>Analyze a live page URL</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className={styles.input}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              disabled={mode !== "url"}
              placeholder="https://example.com/blog/post"
            />
            <button type="button" className={styles.button} onClick={() => setMode("url")} disabled={mode === "url"}>Use URL</button>
          </div>
        </div>
      </div>

      {mode === "url" && (
        <div style={{ marginTop: 12 }}>
          <button type="button" className={styles.button} onClick={runWithUrl} disabled={loading || !url.trim()}>
            {loading ? "Fetching page…" : "Fetch & analyze"}
          </button>
        </div>
      )}

      {mode === "text" && (
        <textarea
          className={styles.textarea}
          style={{ marginTop: 12 }}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Paste your article or HTML here, then add target keywords below."
        />
      )}

      <label className={styles.label} style={{ marginTop: 12 }}>Target keywords (comma separated)</label>
      <input className={styles.input} value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="best seo tools, free tools" />

      {error && <p className={`${styles.statusBadge} ${styles.error}`}>{error}</p>}

      {analysis.wordCount > 0 && (
        <>
          <div className={styles.metricGrid}>
            <div className={styles.metric}><span>Words</span><strong>{analysis.wordCount.toLocaleString()}</strong></div>
            <div className={styles.metric}><span>Sentences</span><strong>{analysis.sentenceCount}</strong></div>
            <div className={styles.metric}><span>Reading time</span><strong>{Math.ceil(analysis.readingMinutes)} min</strong></div>
            <div className={styles.metric}><span>Avg sentence length</span><strong>{Math.round(analysis.avgSentenceLength)} words</strong></div>
          </div>
          {analysis.fre !== null && (
            <div className={styles.twoCol} style={{ marginTop: "0.7rem" }}>
              <div className={styles.metric}><span>Readability (Flesch)</span><strong>{analysis.fre}/100</strong></div>
              <div className={styles.metric}><span>Reading level</span><strong>{analysis.grade}th grade</strong></div>
            </div>
          )}
          <p className={styles.helperText}>{analysis.fre !== null ? gradeLabel(analysis.fre) : ""}</p>

          {analysis.keywordDensity.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12, fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ textAlign: "left", background: "#f8fbff" }}>
                  <th style={{ padding: "0.6rem" }}>Keyword</th>
                  <th style={{ padding: "0.6rem" }}>Occurrences</th>
                  <th style={{ padding: "0.6rem" }}>Density</th>
                </tr>
              </thead>
              <tbody>
                {analysis.keywordDensity.map((item) => (
                  <tr key={item.keyword} style={{ borderTop: "1px solid #e5ebf3" }}>
                    <td style={{ padding: "0.6rem" }}>{item.keyword}</td>
                    <td style={{ padding: "0.6rem" }}>{item.count}</td>
                    <td style={{ padding: "0.6rem" }}>{item.count ? `${item.density}%` : "0%"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className={styles.output} style={{ background: "#fff7ed" }}>
            <strong>Suggestions</strong>
            {analysis.suggestions.length ? (
              <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.1rem" }}>
                {analysis.suggestions.map((suggestion) => (
                  <li key={suggestion} style={{ margin: "0.25rem 0" }}>{suggestion}</li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: "0.5rem 0 0" }}>Content looks strong — no major red flags detected.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}