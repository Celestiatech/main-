"use client";

import { useState } from "react";
import styles from "./tool-detail.module.css";

type StrategyResult = {
  strategy: "mobile" | "desktop";
  performanceScore: number | null;
  accessibilityScore: number | null;
  seoScore: number | null;
  bestPracticesScore: number | null;
  firstContentfulPaint: string;
  largestContentfulPaint: string;
  cumulativeLayoutShift: string;
  speedIndex: string;
  totalBlockingTime: string;
  timeToInteractive: string;
};

type Result = { url: string; results: StrategyResult[] };

function scoreTone(score: number | null) {
  if (score === null) return { color: "#4b627b", label: "N/A" };
  if (score >= 90) return { color: "#166534", label: "Good" };
  if (score >= 50) return { color: "#b45309", label: "Needs improvement" };
  return { color: "#cc5500", label: "Poor" };
}

const VITALS: { key: keyof StrategyResult; label: string }[] = [
  { key: "firstContentfulPaint", label: "First Contentful Paint" },
  { key: "largestContentfulPaint", label: "Largest Contentful Paint" },
  { key: "cumulativeLayoutShift", label: "Cumulative Layout Shift" },
  { key: "speedIndex", label: "Speed Index" },
  { key: "totalBlockingTime", label: "Total Blocking Time" },
  { key: "timeToInteractive", label: "Time To Interactive" },
];

export default function PagespeedChecker() {
  const [url, setUrl] = useState("https://example.com");
  const [mobile, setMobile] = useState(true);
  const [desktop, setDesktop] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const run = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/tools/pagespeed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, strategies: mobile && desktop ? "mobile,desktop" : mobile ? "mobile" : "desktop" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "PageSpeed could not analyze this URL.");
      setResult(data.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "PageSpeed is unavailable right now.");
    } finally {
      setLoading(false);
    }
  };

  const toneColors = (result?.results ?? []).map((r) => ({
    strategy: r.strategy,
    performance: scoreTone(r.performanceScore),
  }));

  return (
    <div>
      <label className={styles.label}>Website URL</label>
      <input
        className={styles.input}
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        onKeyDown={(event) => { if (event.key === "Enter") run(); }}
        placeholder="https://example.com"
      />
      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        {([
          ["mobile", "Mobile", mobile, setMobile],
          ["desktop", "Desktop", desktop, setDesktop],
        ] as const).map(([key, label, value, setter]) => (
          <label key={key} className={styles.checkLabel} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={value} onChange={(event) => setter(event.target.checked)} />
            {label}
          </label>
        ))}
      </div>
      <div className={styles.buttonRow}>
        <button type="button" className={styles.button} onClick={run} disabled={!url.trim() || loading || (!mobile && !desktop)}>
          {loading ? "Running Lighthouse audit…" : "Analyze with PageSpeed"}
        </button>
        <button type="button" className={styles.buttonSecondary} onClick={() => setUrl("https://www.google.com")}>Load sample</button>
      </div>
      {(!mobile && !desktop) && <p className={`${styles.statusBadge} ${styles.error}`}>Select at least one device.</p>}
      {error && <p className={`${styles.statusBadge} ${styles.error}`}>{error}</p>}
      {loading && <p className={styles.helperText}>This can take 30–90 seconds while Google runs a live Lighthouse audit.</p>}

      {result && !loading && (
        <div style={{ marginTop: 16 }}>
          <p className={styles.helperText}>Analyzed: <strong>{result.url}</strong></p>
          {result.results.map((r) => {
            const tone = toneColors.find((t) => t.strategy === r.strategy)?.performance ?? scoreTone(null);
            return (
              <section key={r.strategy} style={{ border: "1px solid #d5deea", borderRadius: 14, padding: "1rem", marginTop: 12, background: "#f8fafc" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                  <h3 style={{ margin: 0 }}>Performance · <span style={{ textTransform: "capitalize" }}>{r.strategy}</span></h3>
                  <span className={styles.statusBadge} style={{ marginTop: 0, background: tone.color, color: "#fff", padding: "0.35rem 0.9rem" }}>
                    {r.performanceScore ?? "N/A"} · {tone.label}
                  </span>
                </div>
                <div className={styles.metricGrid}>
                  {([["performanceScore", "Performance"], ["accessibilityScore", "Accessibility"], ["seoScore", "SEO"], ["bestPracticesScore", "Best practices"]] as const).map(([key, label]) => {
                    const value = r[key];
                    const t = scoreTone(value);
                    return (
                      <div className={styles.metric} key={key}>
                        <span>{label}</span>
                        <strong style={{ color: t.color }}>{value ?? "N/A"}</strong>
                      </div>
                    );
                  })}
                </div>
                <label className={styles.label} style={{ marginTop: 12 }}>Core web vitals & fields</label>
                <div style={{ display: "grid", gap: 6 }}>
                  {VITALS.map((vital) => (
                    <div key={vital.key} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: "0.9rem", borderBottom: "1px solid #e5ebf3", paddingBottom: 6 }}>
                      <span style={{ color: "#4b627b" }}>{vital.label}</span>
                      <strong>{String(r[vital.key])}</strong>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
          <p className={styles.helperText}>
            Scores are 0–100. 90+ is good, 50–89 needs improvement, below 50 is poor. Field data is simulated by the
            Lighthouse lab when real field data is unavailable.
          </p>
        </div>
      )}
    </div>
  );
}