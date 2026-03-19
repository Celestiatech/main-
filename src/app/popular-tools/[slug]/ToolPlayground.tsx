"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./tool-detail.module.css";

interface ToolPlaygroundProps {
  slug: string;
}

type TimeZoneOption = {
  value: string;
  label: string;
};

const timeZones: TimeZoneOption[] = [
  { value: "UTC", label: "UTC" },
  { value: "Asia/Kolkata", label: "Asia/Kolkata" },
  { value: "America/New_York", label: "America/New_York" },
  { value: "Europe/London", label: "Europe/London" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo" },
  { value: "Australia/Sydney", label: "Australia/Sydney" },
];

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function markdownToHtml(markdown: string) {
  const safe = escapeHtml(markdown);
  return safe
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br />");
}

function randomWord() {
  const partsA = ["neo", "hyper", "pixel", "flux", "smart", "alpha", "core", "rapid", "quant", "meta"];
  const partsB = ["cloud", "flow", "spark", "craft", "grid", "logic", "forge", "scope", "drive", "stack"];
  return `${partsA[Math.floor(Math.random() * partsA.length)]}${partsB[Math.floor(Math.random() * partsB.length)]}`;
}

function loremIpsum(paragraphs: number) {
  const base =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, ligula non sollicitudin feugiat, odio arcu aliquet eros, eget tristique massa sem in nunc.";
  return Array.from({ length: Math.max(1, paragraphs) }, (_, idx) => `${idx + 1}. ${base}`).join("\n\n");
}

function fakeUser() {
  const firstNames = ["Aarav", "Mia", "Liam", "Noah", "Ava", "Emma", "Lucas", "Olivia", "Sophia", "Aria"];
  const lastNames = ["Sharma", "Patel", "Smith", "Johnson", "Brown", "Taylor", "Clark", "Davis", "Wilson", "Lewis"];
  const cities = ["Mumbai", "Delhi", "London", "New York", "Sydney", "Toronto", "Tokyo", "Dubai"];

  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  const id = Math.floor(1000 + Math.random() * 9000);

  return {
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${id}@example.com`,
    city: cities[Math.floor(Math.random() * cities.length)],
    company: `${toTitleCase(randomWord())} Labs`,
  };
}

function scorePassword(value: string) {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[a-z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  if (score <= 2) return { label: "Weak", score };
  if (score <= 4) return { label: "Medium", score };
  return { label: "Strong", score };
}

function formatDateInZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

function parseHexColorToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const normalized = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const int = parseInt(normalized, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function parsePdfPageRange(rangeStr: string, totalPages: number): number[] {
  const indices: number[] = [];
  const parts = rangeStr.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.includes("-")) {
      const [startStr, endStr] = trimmed.split("-");
      const start = Math.max(1, parseInt(startStr, 10));
      const end = Math.min(totalPages, parseInt(endStr, 10));
      for (let i = start; i <= end; i += 1) indices.push(i - 1);
    } else {
      const page = parseInt(trimmed, 10);
      if (page >= 1 && page <= totalPages) indices.push(page - 1);
    }
  }
  return [...new Set(indices)].sort((a, b) => a - b);
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
  const [regexPattern, setRegexPattern] = useState("\\b\\w{4}\\b");
  const [regexFlags, setRegexFlags] = useState("g");
  const [regexInput, setRegexInput] = useState("This line has many four word bits.");
  const [minifyInput, setMinifyInput] = useState("<div>  Hello    world  </div>");
  const [markdownInput, setMarkdownInput] = useState("# Markdown Editor\n\nType **bold** and *italic* text.");
  const [randomTextWords, setRandomTextWords] = useState(24);
  const [loremParagraphs, setLoremParagraphs] = useState(3);
  const [metaTitle, setMetaTitle] = useState("Best Tool Hub");
  const [metaDescription, setMetaDescription] = useState("Use free online tools for SEO, text and development.");
  const [metaUrl, setMetaUrl] = useState("https://example.com/tool");
  const [metaKeywords, setMetaKeywords] = useState("tools, seo, developer tools");
  const [robotsAllowIndex, setRobotsAllowIndex] = useState(true);
  const [sitemapUrls, setSitemapUrls] = useState("https://example.com\nhttps://example.com/popular-tools");
  const [keywordTarget, setKeywordTarget] = useState("tools");
  const [ogTitle, setOgTitle] = useState("My Page Title");
  const [ogDescription, setOgDescription] = useState("Social preview description");
  const [ogImage, setOgImage] = useState("https://example.com/preview.jpg");
  const [qrText, setQrText] = useState("https://example.com");
  const [paletteCount, setPaletteCount] = useState(5);
  const [gradientA, setGradientA] = useState("#2563eb");
  const [gradientB, setGradientB] = useState("#16a34a");
  const [gradientAngle, setGradientAngle] = useState(135);
  const [fakeUserCount, setFakeUserCount] = useState(3);
  const [randomNameCount, setRandomNameCount] = useState(8);
  const [invoiceClient, setInvoiceClient] = useState("Client Name");
  const [invoiceService, setInvoiceService] = useState("Web Development");
  const [invoiceAmount, setInvoiceAmount] = useState(1200);
  const [passwordToCheck, setPasswordToCheck] = useState("");
  const [dob, setDob] = useState("1998-01-01");
  const [timestampInput, setTimestampInput] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateToTimestamp, setDateToTimestamp] = useState(new Date().toISOString().slice(0, 16));
  const [countdownTarget, setCountdownTarget] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16));
  const [countdownNow, setCountdownNow] = useState(Date.now());
  const [timezoneDateTime, setTimezoneDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [timezoneTarget, setTimezoneTarget] = useState("UTC");
  const [unitCategory, setUnitCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [unitValue, setUnitValue] = useState(1000);

  const [imageSource, setImageSource] = useState("");
  const [imageOutput, setImageOutput] = useState("");
  const [imageQuality, setImageQuality] = useState(0.75);
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);
  const [convertFormat, setConvertFormat] = useState("image/jpeg");
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(300);
  const [cropHeight, setCropHeight] = useState(300);
  const [bgRemoveColor, setBgRemoveColor] = useState("#ffffff");
  const [bgThreshold, setBgThreshold] = useState(28);
  const [blurAmount, setBlurAmount] = useState(6);
  const [watermarkText, setWatermarkText] = useState("My Brand");

  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pdfPlainText, setPdfPlainText] = useState("");
  const [pdfPageRange, setPdfPageRange] = useState("1-2");
  const [pdfStatus, setPdfStatus] = useState("");
  const [pdfProcessing, setPdfProcessing] = useState(false);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyToClipboard = useCallback((value: string, key: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedKey(key);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopiedKey(null), 1800);
    }).catch(() => {
      setCopiedKey(`${key}-fail`);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopiedKey(null), 2000);
    });
  }, []);

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

  const regexResult = useMemo(() => {
    try {
      const re = new RegExp(regexPattern, regexFlags);
      const matches = Array.from(regexInput.matchAll(re)).map((item) => item[0]);
      return { ok: true, matches, error: "" };
    } catch (error) {
      return { ok: false, matches: [] as string[], error: error instanceof Error ? error.message : "Invalid regex" };
    }
  }, [regexPattern, regexFlags, regexInput]);

  const minifiedOutput = useMemo(() => {
    if (slug === "html-minifier") {
      return minifyInput.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").trim();
    }
    if (slug === "css-minifier") {
      return minifyInput
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s{2,}/g, " ")
        .replace(/\s*([{}:;,])\s*/g, "$1")
        .trim();
    }
    if (slug === "javascript-minifier") {
      return minifyInput
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|\s+)\/\/.*$/gm, "")
        .replace(/\s{2,}/g, " ")
        .replace(/\s*([{}();,:+\-*/=<>&|!])\s*/g, "$1")
        .trim();
    }
    return minifyInput;
  }, [minifyInput, slug]);

  const randomTextOutput = useMemo(() => {
    return Array.from({ length: Math.max(1, randomTextWords) }, () => randomWord()).join(" ");
  }, [randomTextWords]);

  const loremOutput = useMemo(() => loremIpsum(loremParagraphs), [loremParagraphs]);

  const keywordDensity = useMemo(() => {
    if (!text.trim() || !keywordTarget.trim()) {
      return { count: 0, density: 0 };
    }
    const words = text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
    const target = keywordTarget.toLowerCase();
    const count = words.filter((w) => w === target).length;
    return {
      count,
      density: words.length > 0 ? Number(((count / words.length) * 100).toFixed(2)) : 0,
    };
  }, [text, keywordTarget]);

  const generatedPalette = useMemo(() => {
    return Array.from({ length: Math.max(2, paletteCount) }, (_, idx) => {
      const hue = Math.round((360 / Math.max(2, paletteCount)) * idx + Math.random() * 20);
      return `hsl(${hue % 360}, 75%, 55%)`;
    });
  }, [paletteCount]);

  const fakeUsers = useMemo(() => {
    return Array.from({ length: Math.max(1, fakeUserCount) }, () => fakeUser());
  }, [fakeUserCount]);

  const randomNames = useMemo(() => {
    return Array.from({ length: Math.max(1, randomNameCount) }, () => fakeUser().name);
  }, [randomNameCount]);

  const passwordStrength = useMemo(() => scorePassword(passwordToCheck), [passwordToCheck]);

  const ageData = useMemo(() => {
    if (!dob) {
      return null;
    }
    const birth = new Date(dob);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months, days };
  }, [dob]);

  const timestampToDate = useMemo(() => {
    const num = Number(timestampInput);
    if (Number.isNaN(num)) {
      return "Invalid timestamp";
    }
    return new Date(num * 1000).toString();
  }, [timestampInput]);

  const dateAsTimestamp = useMemo(() => {
    if (!dateToTimestamp) {
      return "";
    }
    return String(Math.floor(new Date(dateToTimestamp).getTime() / 1000));
  }, [dateToTimestamp]);

  const countdownText = useMemo(() => {
    const target = new Date(countdownTarget).getTime();
    const diff = target - countdownNow;
    if (diff <= 0) {
      return "Countdown completed";
    }
    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, [countdownTarget, countdownNow]);

  useEffect(() => {
    if (slug !== "countdown-timer") {
      return;
    }
    const id = window.setInterval(() => setCountdownNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [slug]);

  const convertedTimezone = useMemo(() => {
    if (!timezoneDateTime) {
      return "";
    }
    const date = new Date(timezoneDateTime);
    return formatDateInZone(date, timezoneTarget);
  }, [timezoneDateTime, timezoneTarget]);

  const unitResult = useMemo(() => {
    const val = Number(unitValue);
    if (Number.isNaN(val)) {
      return "Invalid value";
    }

    if (unitCategory === "length") {
      const map: Record<string, number> = { meter: 1, kilometer: 1000, centimeter: 0.01, mile: 1609.34, foot: 0.3048 };
      const meters = val * map[fromUnit];
      return String(meters / map[toUnit]);
    }

    if (unitCategory === "weight") {
      const map: Record<string, number> = { kilogram: 1, gram: 0.001, pound: 0.453592, ounce: 0.0283495 };
      const kg = val * map[fromUnit];
      return String(kg / map[toUnit]);
    }

    if (unitCategory === "temperature") {
      const toC = (v: number, from: string) => {
        if (from === "celsius") return v;
        if (from === "fahrenheit") return ((v - 32) * 5) / 9;
        return v - 273.15;
      };
      const fromC = (v: number, to: string) => {
        if (to === "celsius") return v;
        if (to === "fahrenheit") return (v * 9) / 5 + 32;
        return v + 273.15;
      };
      return String(fromC(toC(val, fromUnit), toUnit));
    }

    return "";
  }, [unitValue, unitCategory, fromUnit, toUnit]);

  const unitOptions = useMemo(() => {
    if (unitCategory === "length") return ["meter", "kilometer", "centimeter", "mile", "foot"];
    if (unitCategory === "weight") return ["kilogram", "gram", "pound", "ounce"];
    return ["celsius", "fahrenheit", "kelvin"];
  }, [unitCategory]);

  useEffect(() => {
    setFromUnit(unitOptions[0]);
    setToUnit(unitOptions[1] ?? unitOptions[0]);
  }, [unitOptions]);

  const handleImageUpload = async (file: File | null) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const data = String(reader.result || "");
      setImageSource(data);
      setImageOutput(data);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (
    painter: (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => void,
    mimeType = "image/png",
    quality = 0.92
  ) => {
    if (!imageSource) {
      return;
    }
    const img = await loadImage(imageSource);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    painter(ctx, img, canvas);
    setImageOutput(canvas.toDataURL(mimeType, quality));
  };

  const gradientCss = `linear-gradient(${gradientAngle}deg, ${gradientA}, ${gradientB})`;

  const robotsText = `User-agent: *\n${robotsAllowIndex ? "Allow: /" : "Disallow: /"}`;

  const sitemapXml = useMemo(() => {
    const urls = sitemapUrls
      .split(/\r?\n/)
      .map((u) => u.trim())
      .filter(Boolean);

    const body = urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join("\n");
    return `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n${body}\n</urlset>`;
  }, [sitemapUrls]);

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
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{diffOutput || "Diff will appear here"}</pre>
          {diffOutput && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(diffOutput, "diff")}>{(copiedKey === "diff" ? "Copied!" : copiedKey === "diff-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  if (slug === "remove-duplicate-lines") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste lines here" />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{deduplicatedLines || "Deduplicated lines will appear here"}</pre>
          {deduplicatedLines && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(deduplicatedLines, "dedup")}>{(copiedKey === "dedup" ? "Copied!" : copiedKey === "dedup-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  if (slug === "text-sorter") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="One item per line" />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{sortedLines || "Sorted lines will appear here"}</pre>
          {sortedLines && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(sortedLines, "sorted")}>{(copiedKey === "sorted" ? "Copied!" : copiedKey === "sorted-fail" ? "Failed!" : "Copy")}</button>}
        </div>
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
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{generatedPassword || "Click generate to create a password"}</pre>
          {generatedPassword && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(generatedPassword, "pw")}>{(copiedKey === "pw" ? "Copied!" : copiedKey === "pw-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  if (slug === "uuid-generator") {
    return (
      <div className={styles.playgroundCard}>
        <button className={styles.button} type="button" onClick={() => setGeneratedUuid(generateUuidV4())}>
          Generate UUID
        </button>
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{generatedUuid || "Click generate to create a UUID"}</pre>
          {generatedUuid && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(generatedUuid, "uuid")}>{(copiedKey === "uuid" ? "Copied!" : copiedKey === "uuid-fail" ? "Failed!" : "Copy")}</button>}
        </div>
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

  if (slug === "json-formatter" || slug === "json-validator" || slug === "api-response-viewer") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={jsonText} onChange={(e) => setJsonText(e.target.value)} placeholder="Paste JSON" />
        <div className={`${styles.statusBadge} ${jsonResult.ok ? styles.ok : styles.error}`}>
          {jsonResult.message}
        </div>
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{jsonResult.ok ? jsonResult.formatted : "Fix JSON errors to view output"}</pre>
          {jsonResult.ok && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(jsonResult.formatted, "json")}>{(copiedKey === "json" ? "Copied!" : copiedKey === "json-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  if (slug === "regex-tester") {
    const regexOutput = regexResult.ok ? (regexResult.matches.length > 0 ? regexResult.matches.join("\n") : "No matches") : "";
    return (
      <div className={styles.playgroundCard}>
        <div className={styles.twoCol}>
          <div>
            <label className={styles.label}>Regex pattern</label>
            <input className={styles.input} value={regexPattern} onChange={(e) => setRegexPattern(e.target.value)} />
          </div>
          <div>
            <label className={styles.label}>Flags</label>
            <input className={styles.input} value={regexFlags} onChange={(e) => setRegexFlags(e.target.value)} placeholder="gim" />
          </div>
        </div>
        <textarea className={styles.textarea} value={regexInput} onChange={(e) => setRegexInput(e.target.value)} placeholder="Input text" />
        {regexResult.ok ? (
          <div className={styles.copyWrapper}>
            <pre className={styles.output}>{regexOutput}</pre>
            {regexResult.matches.length > 0 && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(regexOutput, "regex")}>{(copiedKey === "regex" ? "Copied!" : copiedKey === "regex-fail" ? "Failed!" : "Copy")}</button>}
          </div>
        ) : (
          <div className={`${styles.statusBadge} ${styles.error}`}>{regexResult.error}</div>
        )}
      </div>
    );
  }

  if (slug === "html-minifier" || slug === "css-minifier" || slug === "javascript-minifier") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={minifyInput} onChange={(e) => setMinifyInput(e.target.value)} />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{minifiedOutput}</pre>
          {minifiedOutput && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(minifiedOutput, "min")}>{(copiedKey === "min" ? "Copied!" : copiedKey === "min-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  if (slug === "markdown-editor") {
    return (
      <div className={styles.playgroundCard}>
        <div className={styles.twoCol}>
          <textarea className={styles.textarea} value={markdownInput} onChange={(e) => setMarkdownInput(e.target.value)} />
          <div className={styles.preview} dangerouslySetInnerHTML={{ __html: markdownToHtml(markdownInput) }} />
        </div>
      </div>
    );
  }

  if (slug === "random-text-generator") {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Number of words</label>
        <input className={styles.input} type="number" min={1} max={500} value={randomTextWords} onChange={(e) => setRandomTextWords(Number(e.target.value) || 1)} />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{randomTextOutput}</pre>
          {randomTextOutput && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(randomTextOutput, "rtext")}>{(copiedKey === "rtext" ? "Copied!" : copiedKey === "rtext-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  if (slug === "lorem-ipsum-generator") {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Paragraphs</label>
        <input className={styles.input} type="number" min={1} max={20} value={loremParagraphs} onChange={(e) => setLoremParagraphs(Number(e.target.value) || 1)} />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{loremOutput}</pre>
          {loremOutput && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(loremOutput, "lorem")}>{(copiedKey === "lorem" ? "Copied!" : copiedKey === "lorem-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  if (["image-compressor", "image-resizer", "image-converter", "image-crop-tool", "background-remover", "screenshot-to-image", "blur-image-tool", "watermark-tool"].includes(slug)) {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Upload image</label>
        <input className={styles.input} type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] ?? null)} />

        {slug === "image-compressor" && (
          <>
            <label className={styles.label}>Quality (0.1 - 1)</label>
            <input className={styles.input} type="number" min={0.1} max={1} step={0.05} value={imageQuality} onChange={(e) => setImageQuality(Number(e.target.value) || 0.75)} />
            <button className={styles.button} type="button" onClick={() => processImage((ctx, img) => ctx.drawImage(img, 0, 0), "image/jpeg", imageQuality)}>
              Compress
            </button>
          </>
        )}

        {slug === "image-resizer" && (
          <>
            <div className={styles.twoCol}>
              <div>
                <label className={styles.label}>Width</label>
                <input className={styles.input} type="number" value={resizeWidth} onChange={(e) => setResizeWidth(Number(e.target.value) || 1)} />
              </div>
              <div>
                <label className={styles.label}>Height</label>
                <input className={styles.input} type="number" value={resizeHeight} onChange={(e) => setResizeHeight(Number(e.target.value) || 1)} />
              </div>
            </div>
            <button
              className={styles.button}
              type="button"
              onClick={async () => {
                if (!imageSource) return;
                const img = await loadImage(imageSource);
                const canvas = document.createElement("canvas");
                canvas.width = resizeWidth;
                canvas.height = resizeHeight;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.drawImage(img, 0, 0, resizeWidth, resizeHeight);
                setImageOutput(canvas.toDataURL("image/png"));
              }}
            >
              Resize
            </button>
          </>
        )}

        {slug === "image-converter" && (
          <>
            <label className={styles.label}>Output format</label>
            <select className={styles.select} value={convertFormat} onChange={(e) => setConvertFormat(e.target.value)}>
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WEBP</option>
            </select>
            <button className={styles.button} type="button" onClick={() => processImage((ctx, img) => ctx.drawImage(img, 0, 0), convertFormat, imageQuality)}>
              Convert
            </button>
          </>
        )}

        {slug === "image-crop-tool" && (
          <>
            <div className={styles.gridThree}>
              <input className={styles.input} type="number" value={cropX} onChange={(e) => setCropX(Number(e.target.value) || 0)} placeholder="X" />
              <input className={styles.input} type="number" value={cropY} onChange={(e) => setCropY(Number(e.target.value) || 0)} placeholder="Y" />
              <input className={styles.input} type="number" value={cropWidth} onChange={(e) => setCropWidth(Number(e.target.value) || 1)} placeholder="Width" />
              <input className={styles.input} type="number" value={cropHeight} onChange={(e) => setCropHeight(Number(e.target.value) || 1)} placeholder="Height" />
            </div>
            <button
              className={styles.button}
              type="button"
              onClick={async () => {
                if (!imageSource) return;
                const img = await loadImage(imageSource);
                const canvas = document.createElement("canvas");
                canvas.width = cropWidth;
                canvas.height = cropHeight;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
                setImageOutput(canvas.toDataURL("image/png"));
              }}
            >
              Crop
            </button>
          </>
        )}

        {slug === "background-remover" && (
          <>
            <div className={styles.twoCol}>
              <div>
                <label className={styles.label}>Background color</label>
                <input className={styles.input} type="color" value={bgRemoveColor} onChange={(e) => setBgRemoveColor(e.target.value)} />
              </div>
              <div>
                <label className={styles.label}>Threshold</label>
                <input className={styles.input} type="number" value={bgThreshold} onChange={(e) => setBgThreshold(Number(e.target.value) || 0)} />
              </div>
            </div>
            <button
              className={styles.button}
              type="button"
              onClick={() =>
                processImage((ctx, img, canvas) => {
                  ctx.drawImage(img, 0, 0);
                  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  const target = parseHexColorToRgb(bgRemoveColor);

                  for (let i = 0; i < imageData.data.length; i += 4) {
                    const dr = Math.abs(imageData.data[i] - target.r);
                    const dg = Math.abs(imageData.data[i + 1] - target.g);
                    const db = Math.abs(imageData.data[i + 2] - target.b);
                    if (dr + dg + db < bgThreshold * 3) {
                      imageData.data[i + 3] = 0;
                    }
                  }
                  ctx.putImageData(imageData, 0, 0);
                })
              }
            >
              Remove Background Color
            </button>
          </>
        )}

        {slug === "screenshot-to-image" && (
          <>
            <p className={styles.helperText}>Upload screenshot and download optimized JPG output.</p>
            <button className={styles.button} type="button" onClick={() => processImage((ctx, img) => ctx.drawImage(img, 0, 0), "image/jpeg", 0.82)}>
              Convert Screenshot
            </button>
          </>
        )}

        {slug === "blur-image-tool" && (
          <>
            <label className={styles.label}>Blur amount</label>
            <input className={styles.input} type="number" min={1} max={30} value={blurAmount} onChange={(e) => setBlurAmount(Number(e.target.value) || 1)} />
            <button
              className={styles.button}
              type="button"
              onClick={() =>
                processImage((ctx, img, canvas) => {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.filter = `blur(${blurAmount}px)`;
                  ctx.drawImage(img, 0, 0);
                  ctx.filter = "none";
                })
              }
            >
              Blur Image
            </button>
          </>
        )}

        {slug === "watermark-tool" && (
          <>
            <label className={styles.label}>Watermark text</label>
            <input className={styles.input} value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} />
            <button
              className={styles.button}
              type="button"
              onClick={() =>
                processImage((ctx, img, canvas) => {
                  ctx.drawImage(img, 0, 0);
                  ctx.font = `${Math.max(18, Math.round(canvas.width / 20))}px Arial`;
                  ctx.fillStyle = "rgba(255,255,255,0.75)";
                  ctx.textAlign = "right";
                  ctx.fillText(watermarkText, canvas.width - 20, canvas.height - 25);
                })
              }
            >
              Add Watermark
            </button>
          </>
        )}

        {(imageSource || imageOutput) && (
          <div className={styles.imageWrap}>
            <img src={imageOutput || imageSource} className={styles.imagePreview} alt="Tool output" />
            <button
              className={styles.buttonSecondary}
              type="button"
              onClick={async () => {
                const response = await fetch(imageOutput || imageSource);
                const blob = await response.blob();
                downloadBlob(blob, `${slug}-output.${blob.type.includes("jpeg") ? "jpg" : "png"}`);
              }}
            >
              Download Output
            </button>
          </div>
        )}
      </div>
    );
  }

  if (["pdf-to-word", "word-to-pdf", "merge-pdf", "split-pdf", "compress-pdf", "pdf-page-extractor", "pdf-password-remover"].includes(slug)) {
    const isMultiFile = slug === "merge-pdf";
    const needsRange = slug === "split-pdf" || slug === "pdf-page-extractor";
    const isWordToPdf = slug === "word-to-pdf";
    const needsPassword = slug === "pdf-password-remover";

    const handlePdfAction = async () => {
      if (isWordToPdf) {
        if (!pdfPlainText.trim()) { setPdfStatus("Please paste some text first."); return; }
        setPdfProcessing(true);
        setPdfStatus("");
        try {
          const { default: jsPDF } = await import("jspdf");
          const doc = new jsPDF();
          const lines = doc.splitTextToSize(pdfPlainText, 180) as string[];
          let y = 10;
          for (const line of lines) {
            if (y > 275) { doc.addPage(); y = 10; }
            doc.text(line, 10, y);
            y += 7;
          }
          downloadBlob(new Blob([doc.output("arraybuffer")], { type: "application/pdf" }), "document.pdf");
          setPdfStatus("PDF downloaded.");
        } catch (err) {
          setPdfStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
          setPdfProcessing(false);
        }
        return;
      }

      if (pdfFiles.length === 0) { setPdfStatus("Please select a PDF file first."); return; }
      setPdfProcessing(true);
      setPdfStatus("");

      try {
        const { PDFDocument } = await import("pdf-lib");

        if (slug === "merge-pdf") {
          const merged = await PDFDocument.create();
          for (const file of pdfFiles) {
            const bytes = await file.arrayBuffer();
            const doc = await PDFDocument.load(bytes);
            const pages = await merged.copyPages(doc, doc.getPageIndices());
            pages.forEach((p) => merged.addPage(p));
          }
          const out = await merged.save();
          downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), "merged.pdf");
          setPdfStatus(`Merged ${pdfFiles.length} files successfully.`);

        } else if (slug === "split-pdf" || slug === "pdf-page-extractor") {
          const bytes = await pdfFiles[0].arrayBuffer();
          const original = await PDFDocument.load(bytes);
          const indices = parsePdfPageRange(pdfPageRange, original.getPageCount());
          if (indices.length === 0) { setPdfStatus("No valid pages in that range."); setPdfProcessing(false); return; }
          const newDoc = await PDFDocument.create();
          const pages = await newDoc.copyPages(original, indices);
          pages.forEach((p) => newDoc.addPage(p));
          const out = await newDoc.save();
          downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), `${slug}-output.pdf`);
          setPdfStatus(`Extracted ${indices.length} page(s) from ${original.getPageCount()} total.`);

        } else if (slug === "compress-pdf") {
          const bytes = await pdfFiles[0].arrayBuffer();
          const doc = await PDFDocument.load(bytes);
          const out = await doc.save({ useObjectStreams: true });
          downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), "compressed.pdf");
          const saved = ((bytes.byteLength - out.byteLength) / bytes.byteLength * 100).toFixed(1);
          setPdfStatus(`Done. Original: ${(bytes.byteLength / 1024).toFixed(1)} KB → Output: ${(out.byteLength / 1024).toFixed(1)} KB (${saved}% reduction).`);

        } else if (slug === "pdf-password-remover") {
          const bytes = await pdfFiles[0].arrayBuffer();
          try {
            const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
            const out = await doc.save();
            downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), "unlocked.pdf");
            setPdfStatus("PDF re-saved (encryption stripped). Download the unlocked PDF.");
          } catch (encryptErr) {
            setPdfStatus(`Could not process this PDF: ${encryptErr instanceof Error ? encryptErr.message : "Unsupported encryption method."}`);
          }

        } else if (slug === "pdf-to-word") {
          const bytes = await pdfFiles[0].arrayBuffer();
          const doc = await PDFDocument.load(bytes);
          const info = [
            `File: ${pdfFiles[0].name}`,
            `Size: ${(bytes.byteLength / 1024).toFixed(1)} KB`,
            `Pages: ${doc.getPageCount()}`,
            `Title: ${doc.getTitle() ?? "(none)"}`,
            `Author: ${doc.getAuthor() ?? "(none)"}`,
            `Subject: ${doc.getSubject() ?? "(none)"}`,
            ``,
            `Note: Full text extraction and Word conversion requires server-side processing.`,
            `The metadata above was extracted client-side with pdf-lib.`,
          ].join("\n");
          downloadBlob(new Blob([info], { type: "text/plain" }), "pdf-info.txt");
          setPdfStatus("PDF info extracted. For DOCX output, server-side conversion (e.g. LibreOffice) is needed.");
        }
      } catch (err) {
        setPdfStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setPdfProcessing(false);
      }
    };

    return (
      <div className={styles.playgroundCard}>
        {!isWordToPdf && (
          <>
            <label className={styles.label}>{isMultiFile ? "PDF files (select multiple)" : "PDF file"}</label>
            <input
              className={styles.input}
              type="file"
              accept="application/pdf"
              multiple={isMultiFile}
              onChange={(e) => { setPdfFiles(Array.from(e.target.files ?? [])); setPdfStatus(""); }}
            />
          </>
        )}

        {needsRange && (
          <>
            <label className={styles.label}>Page range (e.g. 1-3,5)</label>
            <input className={styles.input} value={pdfPageRange} onChange={(e) => setPdfPageRange(e.target.value)} />
          </>
        )}

        {isWordToPdf && (
          <>
            <label className={styles.label}>Paste or type your text</label>
            <textarea className={styles.textarea} value={pdfPlainText} onChange={(e) => setPdfPlainText(e.target.value)} placeholder="Your document text here…" />
          </>
        )}

        {needsPassword && (
          <p className={styles.helperText}>This tool uses pdf-lib to re-save the PDF with encryption stripped (works on PDFs with standard encryption).</p>
        )}

        <button className={styles.button} type="button" disabled={pdfProcessing} onClick={handlePdfAction}>
          {pdfProcessing ? "Processing…" : slug === "merge-pdf" ? "Merge & Download" : slug === "word-to-pdf" ? "Convert to PDF" : slug === "compress-pdf" ? "Compress & Download" : slug === "pdf-password-remover" ? "Remove Password & Download" : "Extract & Download"}
        </button>

        {pdfStatus && <p className={styles.helperText}>{pdfStatus}</p>}
      </div>
    );
  }

  if (slug === "meta-tag-generator") {
    const metaSnippet = `<title>${escapeHtml(metaTitle)}</title>\n<meta name=\"description\" content=\"${escapeHtml(metaDescription)}\" />\n<meta name=\"keywords\" content=\"${escapeHtml(metaKeywords)}\" />\n<link rel=\"canonical\" href=\"${escapeHtml(metaUrl)}\" />`;
    return (
      <div className={styles.playgroundCard}>
        <input className={styles.input} value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Title" />
        <textarea className={styles.textarea} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Meta description" />
        <input className={styles.input} value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="Keywords" />
        <input className={styles.input} value={metaUrl} onChange={(e) => setMetaUrl(e.target.value)} placeholder="Canonical URL" />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{metaSnippet}</pre>
          <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(metaSnippet, "meta")}>{(copiedKey === "meta" ? "Copied!" : copiedKey === "meta-fail" ? "Failed!" : "Copy")}</button>
        </div>
      </div>
    );
  }

  if (slug === "robots-txt-generator") {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.checkLabel}>
          <input type="checkbox" checked={robotsAllowIndex} onChange={(e) => setRobotsAllowIndex(e.target.checked)} />
          Allow indexing
        </label>
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{robotsText}</pre>
          <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(robotsText, "robots")}>{(copiedKey === "robots" ? "Copied!" : copiedKey === "robots-fail" ? "Failed!" : "Copy")}</button>
        </div>
      </div>
    );
  }

  if (slug === "sitemap-generator") {
    return (
      <div className={styles.playgroundCard}>
        <textarea className={styles.textarea} value={sitemapUrls} onChange={(e) => setSitemapUrls(e.target.value)} placeholder="One URL per line" />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{sitemapXml}</pre>
          <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(sitemapXml, "sitemap")}>{(copiedKey === "sitemap" ? "Copied!" : copiedKey === "sitemap-fail" ? "Failed!" : "Copy")}</button>
        </div>
      </div>
    );
  }

  if (slug === "keyword-density-checker") {
    return (
      <div className={styles.playgroundCard}>
        <input className={styles.input} value={keywordTarget} onChange={(e) => setKeywordTarget(e.target.value)} placeholder="Target keyword" />
        <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste content" />
        <div className={styles.metricGrid}>
          <div className={styles.metric}><span>Occurrences</span><strong>{keywordDensity.count}</strong></div>
          <div className={styles.metric}><span>Density %</span><strong>{keywordDensity.density}</strong></div>
        </div>
      </div>
    );
  }

  if (slug === "website-screenshot-tool") {
    const screenshotUrl = `https://image.thum.io/get/width/1200/noanimate/${encodeURIComponent(metaUrl || "https://example.com")}`;
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Website URL</label>
        <input className={styles.input} value={metaUrl} onChange={(e) => setMetaUrl(e.target.value)} placeholder="https://example.com" />
        <p className={styles.helperText}>Preview is fetched via a third-party screenshot service.</p>
        <img className={styles.imagePreview} src={screenshotUrl} alt="Website screenshot" />
      </div>
    );
  }

  if (slug === "open-graph-preview-tool") {
    return (
      <div className={styles.playgroundCard}>
        <input className={styles.input} value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} placeholder="OG title" />
        <textarea className={styles.textarea} value={ogDescription} onChange={(e) => setOgDescription(e.target.value)} placeholder="OG description" />
        <input className={styles.input} value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="OG image URL" />
        <div className={styles.ogCard}>
          <img src={ogImage} alt="OG preview" className={styles.ogImage} />
          <div>
            <h4>{ogTitle || "Title"}</h4>
            <p>{ogDescription || "Description"}</p>
            <span>{metaUrl}</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "qr-code-generator") {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(qrText)}`;
    return (
      <div className={styles.playgroundCard}>
        <input className={styles.input} value={qrText} onChange={(e) => setQrText(e.target.value)} placeholder="Text or URL" />
        <img className={styles.qrImage} src={qrUrl} alt="QR code" />
      </div>
    );
  }

  if (slug === "color-palette-generator") {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Colors count</label>
        <input className={styles.input} type="number" min={2} max={12} value={paletteCount} onChange={(e) => setPaletteCount(Number(e.target.value) || 2)} />
        <div className={styles.paletteGrid}>
          {generatedPalette.map((color) => (
            <div key={color} className={styles.paletteItem}>
              <div className={styles.paletteSwatch} style={{ background: color }} />
              <code>{color}</code>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === "gradient-generator") {
    const gradientCode = `background: ${gradientCss};`;
    return (
      <div className={styles.playgroundCard}>
        <div className={styles.twoCol}>
          <div>
            <label className={styles.label}>Color A</label>
            <input className={styles.input} type="color" value={gradientA} onChange={(e) => setGradientA(e.target.value)} />
          </div>
          <div>
            <label className={styles.label}>Color B</label>
            <input className={styles.input} type="color" value={gradientB} onChange={(e) => setGradientB(e.target.value)} />
          </div>
        </div>
        <label className={styles.label}>Angle (degrees)</label>
        <input className={styles.input} type="number" value={gradientAngle} onChange={(e) => setGradientAngle(Number(e.target.value) || 0)} />
        <div className={styles.gradientPreview} style={{ background: gradientCss }} />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{gradientCode}</pre>
          <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(gradientCode, "grad")}>{(copiedKey === "grad" ? "Copied!" : copiedKey === "grad-fail" ? "Failed!" : "Copy")}</button>
        </div>
      </div>
    );
  }

  if (slug === "fake-user-generator") {
    const fakeUsersJson = JSON.stringify(fakeUsers, null, 2);
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Users count</label>
        <input className={styles.input} type="number" min={1} max={50} value={fakeUserCount} onChange={(e) => setFakeUserCount(Number(e.target.value) || 1)} />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{fakeUsersJson}</pre>
          <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(fakeUsersJson, "fakeuser")}>{(copiedKey === "fakeuser" ? "Copied!" : copiedKey === "fakeuser-fail" ? "Failed!" : "Copy")}</button>
        </div>
      </div>
    );
  }

  if (slug === "random-name-generator") {
    const namesText = randomNames.join("\n");
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Names count</label>
        <input className={styles.input} type="number" min={1} max={100} value={randomNameCount} onChange={(e) => setRandomNameCount(Number(e.target.value) || 1)} />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{namesText}</pre>
          <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(namesText, "names")}>{(copiedKey === "names" ? "Copied!" : copiedKey === "names-fail" ? "Failed!" : "Copy")}</button>
        </div>
      </div>
    );
  }

  if (slug === "invoice-generator") {
    const invoiceText = `Invoice #${Math.floor(10000 + Math.random() * 90000)}\nClient: ${invoiceClient}\nService: ${invoiceService}\nAmount: $${invoiceAmount.toFixed(2)}\nDate: ${new Date().toLocaleDateString()}`;
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Client name</label>
        <input className={styles.input} value={invoiceClient} onChange={(e) => setInvoiceClient(e.target.value)} placeholder="Client" />
        <label className={styles.label}>Service description</label>
        <input className={styles.input} value={invoiceService} onChange={(e) => setInvoiceService(e.target.value)} placeholder="Service" />
        <label className={styles.label}>Amount ($)</label>
        <input className={styles.input} type="number" value={invoiceAmount} onChange={(e) => setInvoiceAmount(Number(e.target.value) || 0)} placeholder="Amount" />
        <pre className={styles.output}>{invoiceText}</pre>
        <button className={styles.buttonSecondary} type="button" onClick={() => downloadBlob(new Blob([invoiceText], { type: "text/plain" }), "invoice.txt")}>Download Invoice</button>
      </div>
    );
  }

  if (slug === "password-strength-checker") {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Enter password to check</label>
        <input className={styles.input} type="text" value={passwordToCheck} onChange={(e) => setPasswordToCheck(e.target.value)} placeholder="Type a password…" />
        <div className={styles.metric}><span>Strength</span><strong>{passwordStrength.label}</strong></div>
        <div className={styles.progressBar}><div style={{ width: `${(passwordStrength.score / 5) * 100}%` }} /></div>
      </div>
    );
  }

  if (slug === "age-calculator") {
    const ageText = ageData ? `${ageData.years} years, ${ageData.months} months, ${ageData.days} days` : "Pick a valid date";
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Date of birth</label>
        <input className={styles.input} type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{ageText}</pre>
          {ageData && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(ageText, "age")}>{(copiedKey === "age" ? "Copied!" : copiedKey === "age-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  if (slug === "timestamp-converter") {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Unix timestamp → Human date</label>
        <input className={styles.input} value={timestampInput} onChange={(e) => setTimestampInput(e.target.value)} placeholder="e.g. 1700000000" />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{timestampToDate}</pre>
          {timestampToDate && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(timestampToDate, "ts1")}>{(copiedKey === "ts1" ? "Copied!" : copiedKey === "ts1-fail" ? "Failed!" : "Copy")}</button>}
        </div>
        <label className={styles.label}>Date/time → Unix timestamp</label>
        <input className={styles.input} type="datetime-local" value={dateToTimestamp} onChange={(e) => setDateToTimestamp(e.target.value)} />
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{dateAsTimestamp}</pre>
          {dateAsTimestamp && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(dateAsTimestamp, "ts2")}>{(copiedKey === "ts2" ? "Copied!" : copiedKey === "ts2-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  if (slug === "countdown-timer") {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Target date/time</label>
        <input className={styles.input} type="datetime-local" value={countdownTarget} onChange={(e) => setCountdownTarget(e.target.value)} />
        <pre className={styles.output}>{countdownText}</pre>
      </div>
    );
  }

  if (slug === "time-zone-converter") {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Date/time (local)</label>
        <input className={styles.input} type="datetime-local" value={timezoneDateTime} onChange={(e) => setTimezoneDateTime(e.target.value)} />
        <label className={styles.label}>Target timezone</label>
        <select className={styles.select} value={timezoneTarget} onChange={(e) => setTimezoneTarget(e.target.value)}>
          {timeZones.map((tz) => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{convertedTimezone}</pre>
          {convertedTimezone && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(convertedTimezone, "tz")}>{(copiedKey === "tz" ? "Copied!" : copiedKey === "tz-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  if (slug === "unit-converter") {
    return (
      <div className={styles.playgroundCard}>
        <label className={styles.label}>Category</label>
        <select className={styles.select} value={unitCategory} onChange={(e) => setUnitCategory(e.target.value)}>
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>
        <label className={styles.label}>Value</label>
        <input className={styles.input} type="number" value={unitValue} onChange={(e) => setUnitValue(Number(e.target.value) || 0)} />
        <div className={styles.twoCol}>
          <div>
            <label className={styles.label}>From</label>
            <select className={styles.select} value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {unitOptions.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>To</label>
            <select className={styles.select} value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {unitOptions.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.copyWrapper}>
          <pre className={styles.output}>{unitResult}</pre>
          {unitResult && <button type="button" className={styles.copyBtn} onClick={() => copyToClipboard(unitResult, "unit")}>{(copiedKey === "unit" ? "Copied!" : copiedKey === "unit-fail" ? "Failed!" : "Copy")}</button>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.comingSoonCard}>
      <h3>Tool not mapped</h3>
      <p>Add this slug in ToolPlayground to make it interactive.</p>
    </div>
  );
}
