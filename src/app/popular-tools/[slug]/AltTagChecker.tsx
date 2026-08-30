"use client";

import { useMemo, useState } from "react";
import styles from "./tool-detail.module.css";

type ImgRow = {
  src: string;
  alt: string | null;
  missing: boolean;
  empty: boolean;
  hasTitle: boolean;
};

const imgRegex = /<img\b[^>]*>/gi;

function parseImages(html: string): ImgRow[] {
  const rows: ImgRow[] = [];
  let match: RegExpExecArray | null;
  while ((match = imgRegex.exec(html))) {
    const tag = match[0];
    const srcMatch = /src\s*=\s*("([^"]*)"|'([^']*)')/i.exec(tag);
    const altMatch = /alt\s*=\s*("([^"]*)"|'([^']*)')/i.exec(tag);
    const titleMatch = /title\s*=\s*("([^"]*)"|'([^']*)')/i.exec(tag);
    const src = srcMatch ? (srcMatch[2] ?? srcMatch[3] ?? "") : "";
    const alt = altMatch ? (altMatch[2] ?? altMatch[3] ?? "") : null;
    rows.push({
      src: src || "(no src)",
      alt,
      missing: alt === null,
      empty: alt !== null && alt.trim() === "",
      hasTitle: Boolean(titleMatch),
    });
  }
  return rows;
}

export default function AltTagChecker() {
  const [mode, setMode] = useState<"url" | "html">("url");
  const [url, setUrl] = useState("https://example.com");
  const [htmlInput, setHtmlInput] = useState('<img src="/logo.png" />\n<img src="/hero.jpg" alt="Hero banner" />\n<img src="/cta.png" alt="" />');
  const [error, setError] = useState("");
  const [rows, setRows] = useState<ImgRow[]>([]);
  const [checkedUrl, setCheckedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setError("");
    setRows([]);
    setCheckedUrl("");
    if (mode === "html") {
      setRows(parseImages(htmlInput));
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/tools/fetch-page?url=${encodeURIComponent(url)}`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not fetch the page.");
      setRows(parseImages(String(data.html || "")));
      setCheckedUrl(data.url || url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to read the page.");
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(() => {
    const total = rows.length;
    const missing = rows.filter((r) => r.missing).length;
    const empty = rows.filter((r) => r.empty).length;
    const pass = total - missing - empty;
    return { total, missing, empty, pass };
  }, [rows]);

  const downloadCsv = () => {
    const csv = ["Image,Alt text,Status", ...rows.map((row) => `"${row.src}",${row.alt === null ? "MISSING" : row.alt.replace(/"/g, '""')},${row.missing ? "Missing" : row.empty ? "Empty" : "OK"}`)].join("\n");
    const href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = href;
    link.download = "alt-tag-report.csv";
    link.click();
    URL.revokeObjectURL(href);
  };

  return (
    <div>
      <div className={styles.twoCol}>
        <div>
          <label className={styles.label}>Check by page URL</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className={styles.input}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") run(); }}
              disabled={mode !== "url"}
              placeholder="https://example.com/page"
            />
            <button type="button" className={styles.button} onClick={() => setMode("url")} disabled={mode === "url"}>Use URL</button>
          </div>
        </div>
        <div>
          <label className={styles.label}>Or paste HTML</label>
          <button type="button" className={styles.button} onClick={() => setMode("html")} disabled={mode === "html"} style={{ width: "100%" }}>Paste HTML</button>
        </div>
      </div>

      {mode === "html" && (
        <textarea
          className={styles.textarea}
          style={{ marginTop: 12 }}
          value={htmlInput}
          onChange={(event) => setHtmlInput(event.target.value)}
          placeholder="<img src=&quot;...&quot; />"
        />
      )}

      <div className={styles.buttonRow}>
        <button type="button" className={styles.button} onClick={run} disabled={loading || (mode === "url" && !url.trim())}>
          {loading ? "Fetching page…" : mode === "url" ? "Check page" : "Analyze HTML"}
        </button>
        <button type="button" className={styles.buttonSecondary} onClick={() => { setRows([]); setError(""); }}>Clear</button>
      </div>

      {error && <p className={`${styles.statusBadge} ${styles.error}`}>{error}</p>}

      {rows.length > 0 && (
        <>
          <div className={styles.metricGrid}>
            <div className={styles.metric}><span>Total images</span><strong>{summary.total}</strong></div>
            <div className={styles.metric}><span>With alt text</span><strong>{summary.pass}</strong></div>
            <div className={styles.metric}><span>Missing alt</span><strong style={{ color: "#cc5500" }}>{summary.missing}</strong></div>
            <div className={styles.metric}><span>Empty alt (decorative)</span><strong>{summary.empty}</strong></div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0.85rem 0 0.5rem" }}>
            <p className={styles.helperText} style={{ margin: 0 }}>
              {checkedUrl ? `Scanned: ${checkedUrl}` : "Analysis from pasted HTML"}
              {summary.missing > 0 && ` — ${summary.missing} image${summary.missing > 1 ? "s are" : " is"} missing alt text.`}
            </p>
            <button type="button" className={styles.buttonSecondary} onClick={downloadCsv}>Download CSV</button>
          </div>

          <div style={{ maxHeight: 420, overflow: "auto", border: "1px solid #d5deea", borderRadius: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ textAlign: "left", background: "#f8fbff" }}>
                  <th style={{ padding: "0.6rem" }}>#</th>
                  <th style={{ padding: "0.6rem" }}>Image source</th>
                  <th style={{ padding: "0.6rem" }}>Alt text</th>
                  <th style={{ padding: "0.6rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={`${row.src}-${index}`} style={{ borderTop: "1px solid #e5ebf3" }}>
                    <td style={{ padding: "0.6rem" }}>{index + 1}</td>
                    <td style={{ padding: "0.6rem", wordBreak: "break-all" }}>{row.src}</td>
                    <td style={{ padding: "0.6rem", color: row.missing ? "#991b1b" : "#0f172a" }}>
                      {row.missing ? "(none)" : row.empty ? "(decorative)" : row.alt}
                    </td>
                    <td style={{ padding: "0.6rem" }}>
                      <span className={styles.statusBadge} style={{ display: "inline-block", padding: "0.2rem 0.6rem", background: row.missing ? "#fee2e2" : row.empty ? "#fef3c7" : "#dcfce7", color: row.missing ? "#991b1b" : row.empty ? "#92400e" : "#166534", marginTop: 0 }}>
                        {row.missing ? "Missing" : row.empty ? "Empty" : "OK"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={styles.helperText}>
            Empty alt text (<code>{"alt=\"\""}</code>) is valid for decorative images. Missing attributes should be added so
            screen readers and image search can understand each image.
          </p>
        </>
      )}
    </div>
  );
}