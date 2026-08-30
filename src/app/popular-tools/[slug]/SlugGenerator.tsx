"use client";

import { useMemo, useState } from "react";
import styles from "./tool-detail.module.css";

function slugify(value: string, separator: string, keepCase: boolean, stripStopwords: boolean, limit: number) {
  let slug = value
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, separator)
    .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "")
    .replace(new RegExp(`${separator}{2,}`, "g"), separator);

  if (!keepCase) slug = slug.toLowerCase();
  if (stripStopwords) {
    const stop = new Set([
      "a", "an", "the", "and", "or", "but", "of", "for", "in", "on", "at", "to", "with", "by", "from",
      "is", "are", "was", "were", "be", "been", "this", "that",
    ]);
    slug = slug
      .split(separator)
      .filter((part) => !stop.has(part.toLowerCase()))
      .join(separator);
  }

  const parts = slug.split(separator).filter(Boolean);
  const truncated = parts.slice(0, Math.max(1, Math.min(limit, 12))).join(separator);
  return truncated || "untitled";
}

function toTitleCase(value: string) {
  return value.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
}

export default function SlugGenerator() {
  const [title, setTitle] = useState("How to Grow Your Online Store with Local SEO");
  const [separator, setSeparator] = useState("-");
  const [keepCase, setKeepCase] = useState(false);
  const [stripStopwords, setStripStopwords] = useState(false);
  const [limit, setLimit] = useState(6);
  const [copied, setCopied] = useState(false);

  const slug = useMemo(
    () => slugify(title, separator, keepCase, stripStopwords, limit),
    [title, separator, keepCase, stripStopwords, limit]
  );

  const alternatives = useMemo(
    () => [
      slugify(title, "-", false, false, 8),
      slugify(title, "_", false, false, 8),
      slugify(title, "-", true, false, 8),
      slugify(title, "-", false, true, 8),
    ].filter((s, i, arr) => arr.indexOf(s) === i),
    [title]
  );

  const copySlug = async () => {
    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <div className={styles.metricGrid}>
        <div className={styles.metric}>
          <span>Input length</span>
          <strong>{title.trim().length} chars</strong>
        </div>
        <div className={styles.metric}>
          <span>Estimated words</span>
          <strong>{title.trim().split(/\s+/).filter(Boolean).length} words</strong>
        </div>
      </div>

      <label className={styles.label} htmlFor="slug-title">Page title or headline</label>
      <textarea
        id="slug-title"
        className={styles.textarea}
        style={{ minHeight: 84 }}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Type a headline, e.g. Best Smartwatches Under 100 Dollars"
      />

      <div className={styles.twoCol}>
        <div>
          <label className={styles.label}>Separator</label>
          <select className={styles.select} value={separator} onChange={(event) => setSeparator(event.target.value)}>
            <option value="-">Dash ( - )</option>
            <option value="_">Underscore ( _ )</option>
            <option value="/">Slash ( / )</option>
            <option value="">None</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>Max words</label>
          <select className={styles.select} value={limit} onChange={(event) => setLimit(Number(event.target.value))}>
            {[3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
              <option key={n} value={n}>{n} words</option>
            ))}
          </select>
        </div>
      </div>

      <label className={styles.checkLabel} style={{ display: "flex", alignItems: "center", gap: 8, margin: "0.75rem 0" }}>
        <input type="checkbox" checked={keepCase} onChange={(event) => setKeepCase(event.target.checked)} />
        Keep original casing (not recommended)
      </label>
      <label className={styles.checkLabel} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" checked={stripStopwords} onChange={(event) => setStripStopwords(event.target.checked)} />
        Remove stopwords (the, and, of…)
      </label>

      <div className={styles.buttonRow}>
        <button type="button" className={styles.button} onClick={copySlug}>{copied ? "Copied!" : "Copy slug"}</button>
        <button
          type="button"
          className={styles.buttonSecondary}
          onClick={() => setTitle("How to Grow Your Online Store with Local SEO")}
        >
          Load sample
        </button>
        <button type="button" className={styles.buttonSecondary} onClick={() => setTitle("")}>Clear</button>
      </div>

      <div className={styles.output} style={{ fontSize: "1.1rem", fontWeight: 600, color: "#cc5500" }}>{slug || "Type above to generate a slug"}</div>

      <p className={styles.helperText}>Other combinations:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {alternatives.map((alt) => (
          <button
            key={alt}
            type="button"
            className={styles.buttonSecondary}
            onClick={() => {
              setTitle(alt.split(/[-_/]+/).map(toTitleCase).join(" "));
            }}
          >
            {alt}
          </button>
        ))}
      </div>
    </div>
  );
}