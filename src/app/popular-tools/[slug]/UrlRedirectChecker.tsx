"use client";

import { useMemo, useState } from "react";
import styles from "./tool-detail.module.css";

type Hop = { url: string; status: number | null; location: string | null };
type Result = {
  url: string;
  finalUrl: string;
  status: number | null;
  ok: boolean;
  hops: Hop[];
  redirectCount: number;
  loop: boolean;
  error?: string;
};

const normalizeUrl = (value: string) => value.trim().replace(/\/+$/, "");

function statusClass(status: number | null, ok: boolean, loop: boolean) {
  return `${styles.statusBadge} ${status === null || !ok || loop ? styles.error : styles.ok}`;
}

export default function UrlRedirectChecker() {
  const [urls, setUrls] = useState("https://example.com\nhttps://example.com/old-page");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const submittedUrls = useMemo(() => urls.split(/[\n,]/).map(normalizeUrl).filter(Boolean), [urls]);
  const tooMany = submittedUrls.length > 10;

  const run = async () => {
    if (!submittedUrls.length || tooMany) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/tools/url-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: submittedUrls.join("\n") }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not check these URLs.");
      setResults(data.results || []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to check these URLs.");
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = () => {
    const csv = ["URL,Status,Redirects,Final URL", ...results.map((r) => `"${r.url}",${r.status ?? "ERR"},${r.loop ? "LOOP" : r.redirectCount},"${r.finalUrl}"`)].join("\n");
    const href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = href;
    link.download = "url-status-report.csv";
    link.click();
    URL.revokeObjectURL(href);
  };

  const toggle = (index: number) => setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <div>
      <textarea
        className={styles.textarea}
        style={{ minHeight: 120 }}
        value={urls}
        onChange={(event) => setUrls(event.target.value)}
        placeholder={"https://example.com\nhttps://example.com/old-page"}
        aria-label="URLs, one per line"
      />
      <div className={styles.helperText} style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
        <span>One URL per line or comma separated. Include http:// or https://</span>
        <b>{tooMany ? "Maximum 10 URLs" : `${submittedUrls.length} / 10 URLs`}</b>
      </div>
      <div className={styles.buttonRow}>
        <button type="button" className={styles.button} onClick={run} disabled={!submittedUrls.length || tooMany || loading}>
          {loading ? "Checking…" : "Check URLs"}
        </button>
        <button type="button" className={styles.buttonSecondary} onClick={() => setUrls("https://www.google.com\nhttps://blog.hubspot.com/marketing")}>Load sample URLs</button>
        <button type="button" className={styles.buttonSecondary} onClick={() => { setUrls(""); setResults([]); setError(""); }}>Clear</button>
      </div>

      {tooMany && <p className={`${styles.statusBadge} ${styles.error}`}>You can check a maximum of 10 URLs at one time.</p>}
      {error && <p className={`${styles.statusBadge} ${styles.error}`}>{error}</p>}

      {results.length > 0 && (
        <section style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p className={styles.helperText} style={{ margin: 0 }}>Results for <strong>{results.length} URL{results.length > 1 ? "s" : ""}</strong></p>
            <button type="button" className={styles.buttonSecondary} onClick={downloadCsv}>Download CSV</button>
          </div>
          {results.map((result, index) => (
            <div key={result.url} style={{ border: "1px solid #d5deea", borderRadius: 12, padding: "0.75rem", marginTop: 10, background: "#f8fafc" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ minWidth: 0 }}>
                  <a href={result.url.startsWith("http") ? result.url : `https://${result.url}`} target="_blank" rel="noreferrer" style={{ wordBreak: "break-all", fontWeight: 500 }}>{result.url}</a>
                  <p className={styles.helperText} style={{ margin: "0.2rem 0 0" }}>
                    {result.loop ? <>Redirect <strong>loop detected</strong> — the URL keeps redirecting back to itself.</> : result.error ? <>{result.error}</> : result.redirectCount > 0 ? <>Redirected {result.redirectCount} time{result.redirectCount > 1 ? "s" : ""} to <strong style={{ wordBreak: "break-all" }}>{result.finalUrl}</strong></> : <>Loads directly, no redirects.</>}
                  </p>
                </div>
                <span className={statusClass(result.status, result.ok, result.loop)} style={{ whiteSpace: "nowrap" }}>
                  {result.status ?? "Error"}
                </span>
              </div>
              {result.hops.length > 1 && (
                <button type="button" className={styles.buttonSecondary} style={{ marginTop: 8 }} onClick={() => toggle(index)}>
                  {expanded[index] ? "Hide redirect chain" : "View redirect chain"}
                </button>
              )}
              {expanded[index] && (
                <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
                  {result.hops.map((hop, hopIndex) => (
                    <div key={`${hop.url}-${hopIndex}`} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: "0.85rem" }}>
                      <span style={{ color: "#4b627b", whiteSpace: "nowrap" }}>{hop.status ?? "ERR"}</span>
                      <span style={{ wordBreak: "break-all" }}>
                        {hop.url}
                        {hop.location && hopIndex < result.hops.length - 1 && <span style={{ color: "#4b627b" }}> → {hop.location}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}