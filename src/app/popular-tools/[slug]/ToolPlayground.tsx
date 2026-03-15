"use client";

import { useMemo, useState } from "react";
import styles from "./tool-detail.module.css";

interface ToolPlaygroundProps {
  slug: string;
}

function toTitleCase(value: string) {
  return value.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
}

function generatePassword(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateUuidV4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const rand = Math.floor(Math.random() * 16);
    const val = char === "x" ? rand : (rand & 0x3) | 0x8;
    return val.toString(16);
  });
}

export default function ToolPlayground({ slug }: ToolPlaygroundProps) {
  const [text, setText] = useState("");
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [jsonText, setJsonText] = useState('{\n  "hello": "world"\n}');
  const [base64Text, setBase64Text] = useState("");
  const [urlText, setUrlText] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [generatedUuid, setGeneratedUuid] = useState("");

  const wordCount = useMemo(() => {
    if (!text.trim()) {
      return 0;
    }
    return text.trim().split(/\s+/).length;
  }, [text]);

  const characterCount = text.length;

  const deduplicatedLines = useMemo(() => {
    const lines = text.split(/\r?\n/);
    return Array.from(new Set(lines)).join("\n");
  }, [text]);

  const sortedLines = useMemo(() => {
    const lines = text
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0)
      .sort((a, b) => a.localeCompare(b));
    return lines.join("\n");
  }, [text]);

  const diffOutput = useMemo(() => {
    const left = leftText.split(/\r?\n/);
    const right = rightText.split(/\r?\n/);
    const maxLines = Math.max(left.length, right.length);
    const rows: string[] = [];

    for (let i = 0; i < maxLines; i += 1) {
      const a = left[i] ?? "";
      const b = right[i] ?? "";

      if (a === b) {
        rows.push(`  ${a}`);
      } else {
        if (a) rows.push(`- ${a}`);
        if (b) rows.push(`+ ${b}`);
      }
    }

    return rows.join("\n");
  }, [leftText, rightText]);

  const jsonResult = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText);
      return {
        ok: true,
        message: "Valid JSON",
        formatted: JSON.stringify(parsed, null, 2),
      };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Invalid JSON",
        formatted: "",
      };
    }
  }, [jsonText]);

  if (slug === "word-counter") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text here" />
        <div className={styles.metricGrid}>
          <div className={styles.metric}><span>Words</span><strong>{wordCount}</strong></div>
          <div className={styles.metric}><span>Characters</span><strong>{characterCount}</strong></div>
        </div>
      </div>
    );
  }

  if (slug === "character-counter") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Start typing" />
        <div className={styles.metric}><span>Total characters</span><strong>{characterCount}</strong></div>
      </div>
    );
  }

  if (slug === "case-converter") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Text to convert" />
        <div className={styles.buttonRow}>
          <button className={styles.button} type="button" onClick={() => setText(text.toUpperCase())}>UPPERCASE</button>
          <button className={styles.button} type="button" onClick={() => setText(text.toLowerCase())}>lowercase</button>
          <button className={styles.button} type="button" onClick={() => setText(toTitleCase(text))}>Title Case</button>
        </div>
      </div>
    );
  }

  if (slug === "text-diff-checker") {
    return (
      <div className={styles.playgroundCard}>
        <div className={styles.twoCol}>
          <textarea className={styles.textarea} value={leftText} onChange={(e) => setLeftText(e.target.value)} placeholder="Original text" />
          <textarea className={styles.textarea} value={rightText} onChange={(e) => setRightText(e.target.value)} placeholder="Changed text" />
        </div>
        <pre className={styles.output}>{diffOutput || "Diff will appear here"}</pre>
      </div>
    );
  }

  if (slug === "remove-duplicate-lines") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste lines here" />
        <pre className={styles.output}>{deduplicatedLines || "Deduplicated lines will appear here"}</pre>
      </div>
    );
  }

  if (slug === "text-sorter") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="One item per line" />
        <pre className={styles.output}>{sortedLines || "Sorted lines will appear here"}</pre>
      </div>
    );
  }

  if (slug === "password-generator") {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label} htmlFor="password-length">Password length</label>
        <input
          id="password-length"
          className={styles.input}
          type="number"
          min={8}
          max={64}
          value={passwordLength}
          onChange={(e) => setPasswordLength(Math.min(64, Math.max(8, Number(e.target.value) || 8)))}
        />
        <button className={styles.button} type="button" onClick={() => setGeneratedPassword(generatePassword(passwordLength))}>
          Generate Password
        </button>
        <pre className={styles.output}>{generatedPassword || "Click generate to create a password"}</pre>
      </div>
    );
  }

  if (slug === "uuid-generator") {
    return (
      <div className={styles.playgroundCard}>
        <button className={styles.button} type="button" onClick={() => setGeneratedUuid(generateUuidV4())}>
          Generate UUID
        </button>
        <pre className={styles.output}>{generatedUuid || "Click generate to create a UUID"}</pre>
      </div>
    );
  }

  if (slug === "base64-encoder-decoder") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={base64Text} onChange={(e) => setBase64Text(e.target.value)} placeholder="Text or Base64 input" />
        <div className={styles.buttonRow}>
          <button className={styles.button} type="button" onClick={() => setBase64Text(btoa(unescape(encodeURIComponent(base64Text))))}>Encode</button>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              try {
                const decoded = decodeURIComponent(escape(atob(base64Text)));
                setBase64Text(decoded);
              } catch {
                setBase64Text("Invalid Base64 input");
              }
            }}
          >
            Decode
          </button>
        </div>
      </div>
    );
  }

  if (slug === "url-encoder-decoder") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={urlText} onChange={(e) => setUrlText(e.target.value)} placeholder="URL text" />
        <div className={styles.buttonRow}>
          <button className={styles.button} type="button" onClick={() => setUrlText(encodeURIComponent(urlText))}>Encode</button>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              try {
                setUrlText(decodeURIComponent(urlText));
              } catch {
                setUrlText("Invalid URL encoded input");
              }
            }}
          >
            Decode
          </button>
        </div>
      </div>
    );
  }

  if (slug === "json-formatter" || slug === "json-validator") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={jsonText} onChange={(e) => setJsonText(e.target.value)} placeholder="Paste JSON" />
        <div className={`${styles.statusBadge} ${jsonResult.ok ? styles.ok : styles.error}`}>
          {jsonResult.message}
        </div>
        {slug === "json-formatter" && (
          <pre className={styles.output}>{jsonResult.ok ? jsonResult.formatted : "Fix JSON errors to format"}</pre>
        )}
      </div>
    );
  }

  return (
    <div className={styles.comingSoonCard}>
      <h3>Tool UI is in queue</h3>
      <p>This tool has a dedicated page and URL. Interactive implementation will be added in the next rollout.</p>
    </div>
  );
}
