"use client";

import { useMemo, useState } from "react";
import styles from "./phase-one-tools.module.css";

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function fromBase64(value: string) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function buildPassword(length: number, symbols: boolean) {
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const symbolSet = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const charset = symbols ? alpha + symbolSet : alpha;
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += charset[Math.floor(Math.random() * charset.length)];
  }
  return out;
}

export default function PhaseOneTools() {
  const [wordText, setWordText] = useState("Paste your content here...");
  const [charText, setCharText] = useState("Count every character quickly.");
  const [caseText, setCaseText] = useState("Convert me to title case");
  const [diffA, setDiffA] = useState("line one\nline two\nline three");
  const [diffB, setDiffB] = useState("line one\nline 2\nline three\nline four");
  const [dupText, setDupText] = useState("apple\nbanana\napple\norange\nbanana");
  const [sortText, setSortText] = useState("zebra\napple\ncarrot\nbanana");
  const [base64Text, setBase64Text] = useState("Hello tools");
  const [base64Encoded, setBase64Encoded] = useState("");
  const [urlText, setUrlText] = useState("https://example.com/search?q=hello world");
  const [urlEncoded, setUrlEncoded] = useState("");
  const [jsonText, setJsonText] = useState('{"name":"Tool","version":1}');
  const [passwordLength, setPasswordLength] = useState(14);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState(() => buildPassword(14, true));
  const [uuid, setUuid] = useState(() => crypto.randomUUID());

  const wordCount = useMemo(() => {
    const words = wordText.trim().split(/\s+/).filter(Boolean).length;
    const chars = wordText.length;
    const sentences = wordText.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean).length;
    return { words, chars, sentences };
  }, [wordText]);

  const charCount = charText.length;

  const caseResult = useMemo(() => {
    return {
      upper: caseText.toUpperCase(),
      lower: caseText.toLowerCase(),
      title: titleCase(caseText),
    };
  }, [caseText]);

  const diffResult = useMemo(() => {
    const aLines = diffA.split("\n");
    const bLines = diffB.split("\n");
    const removed = aLines.filter((line) => !bLines.includes(line));
    const added = bLines.filter((line) => !aLines.includes(line));
    return { added, removed };
  }, [diffA, diffB]);

  const dedupedLines = useMemo(() => {
    return Array.from(new Set(dupText.split("\n").map((line) => line.trim()).filter(Boolean))).join("\n");
  }, [dupText]);

  const sortedLines = useMemo(() => {
    return sortText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
      .join("\n");
  }, [sortText]);

  const jsonParsed = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText);
      return { valid: true, pretty: JSON.stringify(parsed, null, 2) };
    } catch (error) {
      return { valid: false, pretty: "Invalid JSON" };
    }
  }, [jsonText]);

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2>Live Tools (Phase 1)</h2>
        <p>First 12 tools are now functional on this page.</p>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h3>Word Counter</h3>
          <textarea value={wordText} onChange={(e) => setWordText(e.target.value)} rows={4} />
          <p>Words: {wordCount.words} | Characters: {wordCount.chars} | Sentences: {wordCount.sentences}</p>
        </article>

        <article className={styles.card}>
          <h3>Character Counter</h3>
          <textarea value={charText} onChange={(e) => setCharText(e.target.value)} rows={4} />
          <p>Total characters: {charCount}</p>
        </article>

        <article className={styles.card}>
          <h3>Case Converter</h3>
          <textarea value={caseText} onChange={(e) => setCaseText(e.target.value)} rows={4} />
          <pre>UPPER: {caseResult.upper}\nLOWER: {caseResult.lower}\nTITLE: {caseResult.title}</pre>
        </article>

        <article className={styles.card}>
          <h3>Password Generator</h3>
          <div className={styles.row}>
            <input type="number" min={8} max={64} value={passwordLength} onChange={(e) => setPasswordLength(Number(e.target.value))} />
            <label className={styles.check}><input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />Symbols</label>
            <button onClick={() => setPassword(buildPassword(passwordLength, includeSymbols))}>Generate</button>
          </div>
          <pre>{password}</pre>
        </article>

        <article className={styles.card}>
          <h3>UUID Generator</h3>
          <button onClick={() => setUuid(crypto.randomUUID())}>Generate UUID</button>
          <pre>{uuid}</pre>
        </article>

        <article className={styles.card}>
          <h3>Base64 Encoder / Decoder</h3>
          <textarea value={base64Text} onChange={(e) => setBase64Text(e.target.value)} rows={4} />
          <div className={styles.row}>
            <button onClick={() => setBase64Encoded(toBase64(base64Text))}>Encode</button>
            <button
              onClick={() => {
                try {
                  setBase64Text(fromBase64(base64Text));
                } catch {
                  setBase64Text("Invalid Base64 string");
                }
              }}
            >
              Decode To Text
            </button>
          </div>
          <pre>{base64Encoded}</pre>
        </article>

        <article className={styles.card}>
          <h3>URL Encoder / Decoder</h3>
          <textarea value={urlText} onChange={(e) => setUrlText(e.target.value)} rows={4} />
          <div className={styles.row}>
            <button onClick={() => setUrlEncoded(encodeURIComponent(urlText))}>Encode</button>
            <button
              onClick={() => {
                try {
                  setUrlText(decodeURIComponent(urlText));
                } catch {
                  setUrlText("Invalid encoded URL");
                }
              }}
            >
              Decode
            </button>
          </div>
          <pre>{urlEncoded}</pre>
        </article>

        <article className={styles.card}>
          <h3>JSON Formatter + Validator</h3>
          <textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)} rows={5} />
          <p>Validation: {jsonParsed.valid ? "Valid JSON" : "Invalid JSON"}</p>
          <pre>{jsonParsed.pretty}</pre>
        </article>

        <article className={styles.card}>
          <h3>Remove Duplicate Lines</h3>
          <textarea value={dupText} onChange={(e) => setDupText(e.target.value)} rows={5} />
          <pre>{dedupedLines}</pre>
        </article>

        <article className={styles.card}>
          <h3>Text Sorter</h3>
          <textarea value={sortText} onChange={(e) => setSortText(e.target.value)} rows={5} />
          <pre>{sortedLines}</pre>
        </article>

        <article className={styles.card}>
          <h3>Text Diff Checker</h3>
          <div className={styles.cols}>
            <textarea value={diffA} onChange={(e) => setDiffA(e.target.value)} rows={5} />
            <textarea value={diffB} onChange={(e) => setDiffB(e.target.value)} rows={5} />
          </div>
          <pre>Added:\n{diffResult.added.join("\n") || "-"}\n\nRemoved:\n{diffResult.removed.join("\n") || "-"}</pre>
        </article>
      </div>
    </section>
  );
}
