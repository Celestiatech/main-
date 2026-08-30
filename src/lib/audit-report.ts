export interface AuditCheck {
  id: string;
  label: string;
  passed: boolean;
  value?: string;
  details?: string;
}

export interface AuditSection {
  id: string;
  title: string;
  score: number;
  checks: AuditCheck[];
}

export interface AuditResult {
  requestedUrl: string;
  normalizedUrl: string;
  overallScore: number;
  responseTimeMs: number;
  pageSizeBytes: number;
  screenshotUrl?: string;
  sections: AuditSection[];
  metrics: Record<string, string | number | boolean>;
}

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function grade(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "Excellent", color: "#16a34a" };
  if (score >= 75) return { label: "Good", color: "#65a30d" };
  if (score >= 50) return { label: "Needs work", color: "#d97706" };
  return { label: "Poor", color: "#dc2626" };
}

function scoreRing(score: number): string {
  const { color } = grade(score);
  return `background: conic-gradient(${color} ${score * 3.6}deg, #e5e7eb ${score * 3.6}deg);`;
}

const METRIC_LABELS: Record<string, string> = {
  title: "Title",
  metaDescription: "Meta description",
  canonical: "Canonical URL",
  robotsMeta: "Robots meta",
  wordCount: "Word count",
  h1Count: "H1 tags",
  h2Count: "H2 tags",
  schemaCount: "Structured data blocks",
  imageCount: "Images",
  imagesWithoutAlt: "Images missing alt",
  imagesMissingDimensions: "Images missing dimensions",
  internalLinks: "Internal links",
  externalLinks: "External links",
  socialLinks: "Social links",
  htmlLang: "HTML lang",
  viewportPresent: "Viewport meta",
  formsCount: "Forms",
  inputCount: "Inputs",
};

/**
 * Renders the audit as a standalone, print-ready HTML document.
 *
 * Deliberately not a server-side PDF: a Playwright/Chromium render would not
 * run on this project's serverless target. The page carries @page rules and a
 * print button, so the browser's own "Save as PDF" produces the file — same
 * output, no extra dependency, and it also works as the email body.
 */
export function buildAuditReportHtml(result: AuditResult, options: { forEmail?: boolean } = {}): string {
  const { forEmail = false } = options;
  const overall = grade(result.overallScore);
  const generatedAt = new Date().toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" });

  const failed = result.sections.flatMap((section) =>
    section.checks.filter((check) => !check.passed).map((check) => ({ section: section.title, check }))
  );

  const sectionCards = result.sections
    .map((section) => {
      const sectionGrade = grade(section.score);
      const rows = section.checks
        .map(
          (check) => `
            <tr>
              <td class="status">
                <span class="pill ${check.passed ? "pass" : "fail"}">${check.passed ? "PASS" : "FIX"}</span>
              </td>
              <td>
                <strong>${esc(check.label)}</strong>
                ${check.value ? `<div class="value">${esc(check.value)}</div>` : ""}
                ${check.details ? `<div class="details">${esc(check.details)}</div>` : ""}
              </td>
            </tr>`
        )
        .join("");

      return `
        <section class="card">
          <div class="card-head">
            <h2>${esc(section.title)}</h2>
            <span class="score" style="color:${sectionGrade.color}">${section.score}<small>/100</small></span>
          </div>
          <table>${rows}</table>
        </section>`;
    })
    .join("");

  const priorityList = failed.length
    ? failed
        .slice(0, 10)
        .map(
          (item) => `
          <li>
            <strong>${esc(item.check.label)}</strong>
            <span class="tag">${esc(item.section)}</span>
            ${item.check.details ? `<div class="details">${esc(item.check.details)}</div>` : ""}
          </li>`
        )
        .join("")
    : `<li><strong>No failing checks.</strong> Every test in this audit passed.</li>`;

  const metricRows = Object.entries(METRIC_LABELS)
    .filter(([key]) => result.metrics[key] !== undefined && result.metrics[key] !== "")
    .map(
      ([key, label]) => `
        <tr><td>${esc(label)}</td><td>${esc(
          typeof result.metrics[key] === "boolean"
            ? result.metrics[key]
              ? "Yes"
              : "No"
            : result.metrics[key]
        )}</td></tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SEO audit — ${esc(result.normalizedUrl)}</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f1f5f9; color: #0f172a;
         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; }
  .sheet { max-width: 820px; margin: 0 auto; background: #fff; }
  header { background: linear-gradient(135deg, #cc5500 0%, #ff8c00 100%); color: #fff; padding: 32px 40px; }
  header p.brand { margin: 0; font-size: 12px; letter-spacing: .15em; text-transform: uppercase; color: #ffedd5; }
  header h1 { margin: 8px 0 4px; font-size: 26px; font-weight: 600; }
  header .url { font-size: 14px; color: #ffedd5; word-break: break-all; }
  .summary { display: flex; gap: 28px; align-items: center; padding: 28px 40px; border-bottom: 1px solid #e2e8f0; }
  .ring { width: 108px; height: 108px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; }
  .ring i { width: 84px; height: 84px; background: #fff; border-radius: 50%; display: grid; place-items: center;
            font-style: normal; font-size: 26px; font-weight: 700; }
  .summary-meta { font-size: 14px; color: #475569; }
  .summary-meta strong { color: #0f172a; }
  .card { padding: 24px 40px; border-bottom: 1px solid #e2e8f0; break-inside: avoid; }
  .card-head { display: flex; justify-content: space-between; align-items: baseline; }
  .card h2 { margin: 0 0 12px; font-size: 17px; }
  .score { font-size: 22px; font-weight: 700; }
  .score small { font-size: 12px; color: #94a3b8; font-weight: 500; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 9px 0; vertical-align: top; border-top: 1px solid #f1f5f9; font-size: 13.5px; }
  td.status { width: 58px; }
  .pill { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10.5px; font-weight: 700; letter-spacing: .04em; }
  .pass { background: #dcfce7; color: #166534; }
  .fail { background: #fee2e2; color: #991b1b; }
  .value { color: #334155; word-break: break-word; margin-top: 2px; }
  .details { color: #64748b; font-size: 12.5px; margin-top: 2px; }
  .priority { padding: 24px 40px; background: #fff7ed; border-bottom: 1px solid #fed7aa; }
  .priority h2 { margin: 0 0 12px; font-size: 17px; color: #7c2d12; }
  .priority ol { margin: 0; padding-left: 20px; }
  .priority li { margin-bottom: 10px; font-size: 13.5px; }
  .tag { display: inline-block; margin-left: 8px; padding: 1px 8px; border-radius: 999px;
         background: #ffedd5; color: #9a3412; font-size: 10.5px; font-weight: 600; }
  footer { padding: 24px 40px; text-align: center; color: #64748b; font-size: 12px; }
  footer a { color: #cc5500; font-weight: 600; }
  .cta { margin: 0 40px 24px; padding: 20px; border-radius: 12px; background: #fff7ed; border: 1px solid #fed7aa; text-align: center; }
  .cta h3 { margin: 0 0 6px; color: #7c2d12; font-size: 16px; }
  .cta p { margin: 0 0 14px; color: #9a3412; font-size: 13.5px; }
  .btn { display: inline-block; padding: 11px 24px; border-radius: 999px; background: #cc5500; color: #fff;
         text-decoration: none; font-weight: 600; font-size: 14px; }
  .toolbar { position: sticky; top: 0; display: flex; justify-content: flex-end; gap: 10px; padding: 12px 40px;
             background: #0f172a; }
  .toolbar button { padding: 9px 20px; border: none; border-radius: 999px; background: #ff8c00; color: #fff;
                    font-weight: 600; font-size: 13px; cursor: pointer; }
  @media print { .toolbar { display: none; } body { background: #fff; } .sheet { max-width: none; } }
</style>
</head>
<body>
<div class="sheet">
  ${
    forEmail
      ? ""
      : `<div class="toolbar"><button onclick="window.print()">Save as PDF</button></div>`
  }

  <header>
    <p class="brand">W3Tech &middot; Website Audit</p>
    <h1>SEO &amp; technical audit</h1>
    <div class="url">${esc(result.normalizedUrl)}</div>
  </header>

  <div class="summary">
    <div class="ring" style="${scoreRing(result.overallScore)}">
      <i style="color:${overall.color}">${result.overallScore}</i>
    </div>
    <div class="summary-meta">
      <div><strong>${esc(overall.label)}</strong> &mdash; overall score ${result.overallScore}/100</div>
      <div>${failed.length} check${failed.length === 1 ? "" : "s"} need attention across ${result.sections.length} categories.</div>
      <div>Response time <strong>${result.responseTimeMs} ms</strong> &middot; page weight <strong>${(result.pageSizeBytes / 1024).toFixed(1)} KB</strong></div>
      <div>Generated ${esc(generatedAt)}</div>
    </div>
  </div>

  <div class="priority">
    <h2>Fix these first</h2>
    <ol>${priorityList}</ol>
  </div>

  ${sectionCards}

  ${
    metricRows
      ? `<section class="card"><div class="card-head"><h2>Page metrics</h2></div><table>${metricRows}</table></section>`
      : ""
  }

  <div class="cta">
    <h3>Want these fixed rather than listed?</h3>
    <p>Our team implements every item in this report — technical SEO, performance, and accessibility.</p>
    <a class="btn" href="https://www.w3tech.co.in/contact">Talk to W3Tech</a>
  </div>

  <footer>
    Generated by the <a href="https://www.w3tech.co.in/popular-tools/website-audit-tool">W3Tech Website Audit Tool</a>.
    Scores are indicative and based on a single page fetch plus Google PageSpeed Insights.
  </footer>
</div>
</body>
</html>`;
}
