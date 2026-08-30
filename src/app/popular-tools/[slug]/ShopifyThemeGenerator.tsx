"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./shopify-theme-generator.module.css";

interface DetectedHero {
  heading: string;
  subheading: string;
  image?: { src: string };
}

interface ConversionResult {
  source: {
    url: string;
    brand: string;
    title: string;
    colors: { accent: string };
    convertedAt: string;
  };
  detected: {
    header: { links: number; logo: boolean };
    hero: DetectedHero | null;
    imageWithText: { heading: string } | null;
    featured: { heading: string; cards: unknown[] } | null;
    testimonials: { items: unknown[] } | null;
    faq: { items: unknown[] } | null;
    footer: { links: number };
  };
  warnings: string[];
  previewHtml: string;
  theme: {
    fileCount: number;
    files: string[];
    sizeBytes: number;
    zipBase64: string;
    fileName: string;
  };
}

type PreviewDevice = "desktop" | "mobile";

function SectionRow({ name, found, detail }: { name: string; found: boolean; detail: string }) {
  return (
    <div className={styles.sectionRow}>
      <span className={`${styles.statusDot} ${found ? styles.found : styles.missing}`} />
      <div>
        <p className={styles.sectionName}>{name}</p>
        <p className={styles.sectionMeta}>{detail}</p>
      </div>
    </div>
  );
}

export default function ShopifyThemeGenerator() {
  const [url, setUrl] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [device, setDevice] = useState<PreviewDevice>("desktop");

  const convert = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/tools/shopify-theme-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, authorized }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Could not convert that page.");
        return;
      }

      setResult(data as ConversionResult);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!result) return;

    const binary = atob(result.theme.zipBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }

    const blobUrl = URL.createObjectURL(new Blob([bytes], { type: "application/zip" }));
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = result.theme.fileName;
    anchor.click();
    URL.revokeObjectURL(blobUrl);
  };

  const detected = result?.detected;

  return (
    <div className={styles.wrap}>
      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="source-url">
            Website URL
          </label>
          <input
            id="source-url"
            className={styles.input}
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && url && authorized && !loading) convert();
            }}
          />
        </div>

        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={authorized}
            onChange={(event) => setAuthorized(event.target.checked)}
          />
          <span>
            I own this website or have written permission to convert its content. This tool reads
            only publicly available pages — it never retrieves private theme code or bypasses a login.
          </span>
        </label>

        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={convert}
            disabled={!url || !authorized || loading}
          >
            {loading ? "Converting…" : "Convert to Shopify theme"}
          </button>
        </div>

        <p className={styles.formHint}>
          We read only the public page you enter, and nothing is stored. Conversion usually takes a few seconds.
        </p>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {result && detected && (
        <div className={styles.results}>
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>What we detected</h3>
            <div className={styles.sectionList}>
              <SectionRow
                name="Header"
                found={detected.header.links > 0}
                detail={`${detected.header.links} menu link(s)${detected.header.logo ? ", logo found" : ""}`}
              />
              <SectionRow
                name="Hero"
                found={Boolean(detected.hero)}
                detail={detected.hero ? detected.hero.heading : "No <h1> found — placeholder generated"}
              />
              <SectionRow
                name="Image with text"
                found={Boolean(detected.imageWithText)}
                detail={detected.imageWithText ? detected.imageWithText.heading : "Placeholder generated"}
              />
              <SectionRow
                name="Featured collection"
                found={Boolean(detected.featured)}
                detail={
                  detected.featured
                    ? `${detected.featured.cards.length} card(s) imported`
                    : "No repeating card grid found"
                }
              />
              <SectionRow
                name="Testimonials"
                found={Boolean(detected.testimonials)}
                detail={
                  detected.testimonials
                    ? `${detected.testimonials.items.length} quote(s) imported`
                    : "Placeholder generated"
                }
              />
              <SectionRow
                name="FAQ"
                found={Boolean(detected.faq)}
                detail={detected.faq ? `${detected.faq.items.length} question(s) imported` : "Placeholder generated"}
              />
              <SectionRow
                name="Footer"
                found={detected.footer.links > 0}
                detail={`${detected.footer.links} link(s) imported`}
              />
            </div>
          </div>

          {result.warnings.length > 0 && (
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Before you upload this</h3>
              <ul className={styles.warnings}>
                {result.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.panel}>
            <div className={styles.previewHead}>
              <h3 className={styles.panelTitle}>Preview</h3>
              <div className={styles.deviceToggle}>
                <button
                  className={device === "desktop" ? styles.deviceActive : styles.deviceBtn}
                  onClick={() => setDevice("desktop")}
                >
                  Desktop
                </button>
                <button
                  className={device === "mobile" ? styles.deviceActive : styles.deviceBtn}
                  onClick={() => setDevice("mobile")}
                >
                  Mobile
                </button>
              </div>
            </div>
            <div className={device === "mobile" ? styles.previewMobile : styles.previewDesktop}>
              <iframe
                title="Generated theme preview"
                className={styles.previewFrame}
                srcDoc={result.previewHtml}
                sandbox=""
              />
            </div>
          </div>

          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Theme contents</h3>
            <pre className={styles.fileTree}>{result.theme.files.join("\n")}</pre>
            <div className={styles.meta}>
              <span>{result.theme.fileCount} files</span>
              <span>{(result.theme.sizeBytes / 1024).toFixed(1)} KB</span>
              <span>Online Store 2.0</span>
            </div>
            <div className={styles.actions} style={{ marginTop: 16 }}>
              <button className={styles.primaryBtn} onClick={download}>
                Download theme ZIP
              </button>
            </div>
          </div>

          <div className={styles.cta}>
            <h3>Need a production-ready Shopify theme?</h3>
            <p>
              This starter covers the homepage structure. Product pages, cart behaviour, app
              integrations, and performance work are where a real storefront is won — our team
              finishes those.
            </p>
            <Link className={styles.secondaryBtn} href="/contact">
              Hire our team
            </Link>
          </div>
        </div>
      )}

      <section className={styles.infoSection}>
        <span className={styles.eyebrow}>How it works</span>
        <h2>From a public URL to an <em>editable Shopify starter theme.</em></h2>
        <div className={styles.stepsGrid}>
          <article><span>1</span><h3>Enter your URL</h3><p>Submit one public page you own or are authorized to convert.</p></article>
          <article><span>2</span><h3>We analyse the page</h3><p>The tool identifies visible structure, text, links, and permitted public images.</p></article>
          <article><span>3</span><h3>Review the result</h3><p>Check detected sections, warnings, and the responsive starter preview.</p></article>
          <article><span>4</span><h3>Download the ZIP</h3><p>Use the generated Shopify Online Store 2.0 theme as your starting point.</p></article>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.splitGrid}>
          <div>
            <span className={styles.eyebrow}>What you get</span>
            <h2>A useful foundation, not a copied private theme.</h2>
            <p>The generated ZIP includes reusable Liquid sections, JSON templates, assets, and settings that you can adapt in Shopify&apos;s Theme Editor.</p>
          </div>
          <div className={styles.checkList}>
            <p><b>•</b> Header, hero, card grid, FAQ, and footer sections</p>
            <p><b>•</b> Downloaded permitted public images and theme assets</p>
            <p><b>•</b> Online Store 2.0 JSON templates and editable schema</p>
            <p><b>•</b> Clear warnings for features that need custom development</p>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <span className={styles.eyebrow}>FAQs</span>
        <h2>Before you convert a website</h2>
        <div className={styles.faqGrid}>
          <details><summary>Does this download another store&apos;s Liquid source?<span>+</span></summary><p>No. Shopify renders Liquid on its servers. This tool creates a new starter theme from the public page output of a URL you are authorized to use.</p></details>
          <details><summary>Can it recreate cart, checkout, or app logic?<span>+</span></summary><p>Not automatically. Dynamic product, cart, checkout, customer, and third-party app functionality needs further Shopify development.</p></details>
          <details><summary>Can I upload the ZIP to Shopify?<span>+</span></summary><p>Yes. The output is built as an Online Store 2.0 starter theme. Review it in an unpublished theme before making anything live.</p></details>
          <details><summary>Need an exact production rebuild?<span>+</span></summary><p>Use the generated theme as a starting point, then contact our team for responsive implementation, integrations, performance work, and QA.</p></details>
        </div>
      </section>
    </div>
  );
}
