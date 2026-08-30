"use client";

import { useMemo, useState } from "react";
import styles from "./da-pa-checker.module.css";

type MetricResult = {
  request_url?: string;
  status_code?: number;
  result?: { domain_authority?: number | string | null; page_authority?: number | string | null; spam_score?: number | string | null };
};

type Row = { url: string; status: number; da: number | null; pa: number | null; spam: number | null };

const toNumber = (value: number | string | null | undefined) => {
  const number = typeof value === "number" ? value : Number.parseFloat(value ?? "");
  return Number.isFinite(number) ? number : null;
};

const normalizeUrl = (value: string) => value.trim().replace(/\/+$/, "");

function scoreClass(score: number | null) {
  if (score === null) return styles.scoreUnknown;
  if (score >= 60) return styles.scoreGood;
  if (score >= 30) return styles.scoreMedium;
  return styles.scoreLow;
}

export default function DaPaChecker() {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<Row[]>([]);

  const submittedUrls = useMemo(() => urls.split("\n").map(normalizeUrl).filter(Boolean), [urls]);
  const tooMany = submittedUrls.length > 10;

  const checkAuthority = async () => {
    if (!submittedUrls.length || tooMany) return;
    setLoading(true);
    setError("");
    setRows([]);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkdapa`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "frontend-api-token": process.env.NEXT_PUBLIC_FRONTEND_API_TOKEN ?? "" },
        body: JSON.stringify({ urls: submittedUrls.join("\n") }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "The authority service could not process those URLs.");

      const responseItems: MetricResult[] = Array.isArray(data.redirect_urls) ? data.redirect_urls : [];
      const byUrl = new Map(responseItems.map((item) => [normalizeUrl(item.request_url ?? ""), item]));
      setRows(submittedUrls.map((url) => {
        const item = byUrl.get(url);
        return { url, status: item?.status_code ?? 404, da: toNumber(item?.result?.domain_authority), pa: toNumber(item?.result?.page_authority), spam: toNumber(item?.result?.spam_score) };
      }));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to check authority right now.");
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = () => {
    const csv = ["URL,Domain Authority,Page Authority,Spam Score,Status", ...rows.map((row) => `"${row.url}",${row.da ?? "N/A"},${row.pa ?? "N/A"},${row.spam ?? "N/A"},${row.status === 200 ? "Valid" : "Unavailable"}`)].join("\n");
    const href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = href; link.download = "da-pa-report.csv"; link.click(); URL.revokeObjectURL(href);
  };

  return <div className={styles.wrap}>
    <div className={styles.toolCard}>
      <div className={styles.cardHead}><div><h2>DA PA Checker</h2><p>Paste up to 10 website URLs to check Domain Authority, Page Authority, and spam score.</p></div><span>Bulk checker · 10 URLs</span></div>
      <div className={styles.cardBody}>
        <textarea value={urls} onChange={(event) => setUrls(event.target.value)} placeholder={"https://example.com\nhttps://competitor.com\nhttps://your-site.com/page"} aria-label="Website URLs, one per line" />
        <div className={styles.fieldMeta}><span>One URL per line. Include http:// or https://</span><b className={tooMany ? styles.overLimit : ""}>{tooMany ? "Maximum 10 URLs" : `${submittedUrls.length} / 10 URLs`}</b></div>
        <div className={styles.actions}><button type="button" onClick={checkAuthority} disabled={!submittedUrls.length || tooMany || loading}>{loading ? "Checking…" : "Check Authority"}</button><button type="button" className={styles.outlineButton} onClick={() => setUrls("https://www.google.com\nhttps://www.wikipedia.org")}>Load sample URLs</button><button type="button" className={styles.clearButton} onClick={() => { setUrls(""); setRows([]); setError(""); }}>Clear</button></div>
        {tooMany && <p className={styles.error}>You can check a maximum of 10 URLs at one time.</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>

    {rows.length > 0 && <section className={styles.results}><div className={styles.resultsHead}><p>Results for <strong>{rows.length} URL{rows.length > 1 ? "s" : ""}</strong></p><button type="button" className={styles.outlineButton} onClick={downloadCsv}>Download CSV report</button></div><div className={styles.tableScroll}><table><thead><tr><th>#</th><th>URL</th><th>DA</th><th>PA</th><th>Spam score</th><th>Status</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.url}><td>{index + 1}</td><td><a href={row.url.startsWith("http") ? row.url : `https://${row.url}`} target="_blank" rel="noreferrer">{row.url}</a></td><td><strong className={scoreClass(row.da)}>{row.da ?? "N/A"}</strong></td><td><strong className={scoreClass(row.pa)}>{row.pa ?? "N/A"}</strong></td><td><span className={row.spam !== null && row.spam <= 30 ? styles.spamLow : styles.spamUnknown}>{row.spam === null ? "N/A" : `${row.spam}%`}</span></td><td><span className={row.status === 200 ? styles.valid : styles.invalid}>{row.status === 200 ? "Valid URL" : "Unavailable"}</span></td></tr>)}</tbody></table></div></section>}
  </div>;
}
