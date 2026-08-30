"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./tool-detail.module.css";

type AuditCheck = {
  id: string;
  label: string;
  passed: boolean;
  value?: string;
  details?: string;
};

type AuditSection = {
  id: string;
  title: string;
  score: number;
  checks: AuditCheck[];
};

type AuditResult = {
  normalizedUrl: string;
  overallScore: number;
  responseTimeMs: number;
  pageSizeBytes: number;
  screenshotUrl: string;
  sections: AuditSection[];
  metrics: {
    title: string;
    metaDescription: string;
    canonical: string;
    favicon: string;
    robotsMeta: string;
    robotsUrl: string;
    sitemapUrl: string;
    wordCount: number;
    h1Count: number;
    h2Count: number;
    schemaCount: number;
    imageCount: number;
    imagesWithoutAlt: number;
    imagesMissingDimensions: number;
    internalLinks: number;
    externalLinks: number;
    socialLinks: number;
    htmlLang: string;
    viewportPresent: boolean;
    buttonsCount: number;
    formsCount: number;
    labelsCount: number;
    inputCount: number;
  };
  pageSpeed: {
    mobile: {
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
    } | null;
    desktop: {
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
    } | null;
  };
};

type ScoreRingProps = {
  label: string;
  score: number;
  toneClassName: string;
};

type PriorityIssue = {
  id: string;
  title: string;
  description: string;
  impact: string;
  uplift: number;
  severity: "high" | "medium" | "low";
};

function scoreTone(score: number) {
  if (score >= 80) {
    return { label: "Strong", className: styles.auditScoreStrong };
  }
  if (score >= 55) {
    return { label: "Average", className: styles.auditScoreAverage };
  }
  return { label: "Needs work", className: styles.auditScoreWeak };
}

function sectionScore(result: AuditResult | null, id: string) {
  return result?.sections.find((section) => section.id === id)?.score ?? 0;
}

function ScoreRing({ label, score, toneClassName }: ScoreRingProps) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (Math.max(0, Math.min(100, score)) / 100) * circumference;

  return (
    <div className={styles.auditRingCard}>
      <div className={styles.auditRingWrap}>
        <svg viewBox="0 0 120 120" className={styles.auditRingSvg} aria-hidden="true">
          <circle className={styles.auditRingTrack} cx="60" cy="60" r={radius} />
          <circle
            className={`${styles.auditRingProgress} ${toneClassName}`}
            cx="60"
            cy="60"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className={styles.auditRingCenter}>
          <strong>{score}</strong>
          <span>%</span>
        </div>
      </div>
      <p>{label}</p>
    </div>
  );
}

function buildPriorityIssues(result: AuditResult): PriorityIssue[] {
  const issues: PriorityIssue[] = [];

  if ((result.pageSpeed.mobile?.performanceScore ?? 100) < 60) {
    issues.push({
      id: "mobile-performance",
      title: "Improve mobile performance",
      description: "Google PageSpeed mobile performance is low, which can hurt user experience, bounce rate, and perceived quality.",
      impact: `Mobile PSI: ${result.pageSpeed.mobile?.performanceScore ?? "NA"}`,
      uplift: 4,
      severity: "high",
    });
  }

  if ((result.pageSpeed.mobile?.cumulativeLayoutShift ?? "") !== "Unavailable") {
    const cls = Number(result.pageSpeed.mobile?.cumulativeLayoutShift ?? "0");
    if (!Number.isNaN(cls) && cls > 0.1) {
      issues.push({
        id: "cls",
        title: "Reduce layout shift",
        description: "Your page shows layout instability. Reserve image space, stabilize banners, and avoid late UI jumps above the fold.",
        impact: `CLS: ${result.pageSpeed.mobile?.cumulativeLayoutShift}`,
        uplift: 3,
        severity: "high",
      });
    }
  }

  if (!result.metrics.viewportPresent) {
    issues.push({
      id: "viewport",
      title: "Fix mobile viewport setup",
      description: "The page is missing a viewport meta tag, which can break responsive rendering on phones and tablets.",
      impact: "Responsive rendering risk",
      uplift: 2,
      severity: "high",
    });
  }

  if (result.metrics.imagesMissingDimensions > 0) {
    issues.push({
      id: "image-dimensions",
      title: "Add image width and height",
      description: "Some images do not reserve layout space, which can create visual jumps and weak visual stability.",
      impact: `${result.metrics.imagesMissingDimensions} image(s) missing dimensions`,
      uplift: 2,
      severity: "medium",
    });
  }

  if (!result.metrics.htmlLang) {
    issues.push({
      id: "lang",
      title: "Declare document language",
      description: "The HTML document is missing a lang attribute, which affects accessibility and language detection.",
      impact: "Accessibility and localization issue",
      uplift: 1,
      severity: "medium",
    });
  }

  if (result.metrics.inputCount > 0 && result.metrics.labelsCount < Math.max(1, Math.floor(result.metrics.inputCount / 2))) {
    issues.push({
      id: "form-labels",
      title: "Improve form labeling",
      description: "Forms appear under-labeled. Add visible labels and clearer field guidance to improve usability and accessibility.",
      impact: `${result.metrics.labelsCount}/${result.metrics.inputCount} labels to fields`,
      uplift: 2,
      severity: "medium",
    });
  }

  if (result.metrics.imagesWithoutAlt > 0) {
    issues.push({
      id: "alt-text",
      title: "Add missing image alt text",
      description: "Several images are missing alt text, reducing accessibility and image search clarity.",
      impact: `${result.metrics.imagesWithoutAlt} image(s) missing alt`,
      uplift: 1,
      severity: "low",
    });
  }

  if (!result.metrics.canonical) {
    issues.push({
      id: "canonical",
      title: "Add canonical URL",
      description: "A canonical tag helps search engines understand the preferred page version and avoids duplicate URL ambiguity.",
      impact: "SEO consolidation issue",
      uplift: 2,
      severity: "medium",
    });
  }

  if (!result.metrics.metaDescription) {
    issues.push({
      id: "meta-description",
      title: "Write a proper meta description",
      description: "The page is missing or weak on meta description content, which can lower click-through from search results.",
      impact: "Search snippet quality issue",
      uplift: 1,
      severity: "low",
    });
  }

  return issues
    .sort((a, b) => b.uplift - a.uplift || a.title.localeCompare(b.title))
    .slice(0, 8);
}

export default function WebsiteAuditTool() {
  const [url, setUrl] = useState("https://example.com");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("Preparing audit");
  const [error, setError] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [reportEmail, setReportEmail] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailMessage, setEmailMessage] = useState("");

  // Posts the result to the report route and opens the printable document,
  // where the browser's own "Save as PDF" produces the file.
  const openReport = async () => {
    if (!result) return;

    const response = await fetch("/api/tools/website-audit/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result }),
    });

    if (!response.ok) return;

    const blobUrl = URL.createObjectURL(await response.blob());
    window.open(blobUrl, "_blank", "noopener");
    // Give the new tab time to load before releasing the object URL.
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
  };

  const emailReport = async () => {
    if (!result || !reportEmail) return;

    setEmailState("sending");
    setEmailMessage("");

    try {
      const response = await fetch("/api/tools/website-audit/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: reportEmail, result }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setEmailState("error");
        setEmailMessage(data.error || "Could not send the report.");
        return;
      }

      setEmailState("sent");
      setEmailMessage(`Report sent to ${reportEmail}.`);
    } catch {
      setEmailState("error");
      setEmailMessage("Network error. Please try again.");
    }
  };

  const overallTone = useMemo(() => scoreTone(result?.overallScore ?? 0), [result]);
  const onPageScore = useMemo(() => sectionScore(result, "seo"), [result]);
  const technicalScore = useMemo(() => sectionScore(result, "technical"), [result]);
  const socialScore = useMemo(() => sectionScore(result, "social"), [result]);
  const performanceScore = useMemo(() => sectionScore(result, "performance"), [result]);
  const usabilityScore = useMemo(() => sectionScore(result, "usability"), [result]);
  const pageSpeedScore = useMemo(() => sectionScore(result, "page-speed"), [result]);
  const onPageTone = useMemo(() => scoreTone(onPageScore), [onPageScore]);
  const technicalTone = useMemo(() => scoreTone(technicalScore), [technicalScore]);
  const socialTone = useMemo(() => scoreTone(socialScore), [socialScore]);
  const performanceTone = useMemo(() => scoreTone(performanceScore), [performanceScore]);
  const usabilityTone = useMemo(() => scoreTone(usabilityScore), [usabilityScore]);
  const pageSpeedTone = useMemo(() => scoreTone(pageSpeedScore), [pageSpeedScore]);
  const screenshotBaseUrl = useMemo(() => {
    if (!result) {
      return "";
    }

    return `/api/tools/website-screenshot?url=${encodeURIComponent(result.normalizedUrl)}`;
  }, [result]);
  const designIssueNotes = useMemo(() => {
    if (!result) {
      return [];
    }

    const notes: string[] = [];

    if (!result.metrics.viewportPresent) {
      notes.push("Mobile responsiveness risk: viewport meta tag is missing.");
    }
    if (result.metrics.imagesMissingDimensions > 0) {
      notes.push(`Layout shift risk: ${result.metrics.imagesMissingDimensions} image(s) are missing explicit width or height.`);
    }
    if ((result.pageSpeed.mobile?.performanceScore ?? 100) < 60) {
      notes.push("Mobile performance is weak, so above-the-fold layout may feel heavy or unstable.");
    }
    if (result.pageSpeed.mobile?.cumulativeLayoutShift && result.pageSpeed.mobile.cumulativeLayoutShift !== "Unavailable") {
      notes.push(`Google CLS signal: ${result.pageSpeed.mobile.cumulativeLayoutShift}. Review hero, banners, and lazy-loaded media.`);
    }
    if (result.metrics.imagesWithoutAlt > 0) {
      notes.push(`Content presentation issue: ${result.metrics.imagesWithoutAlt} image(s) are missing alt text.`);
    }

    return notes.slice(0, 5);
  }, [result]);
  const priorityIssues = useMemo(() => (result ? buildPriorityIssues(result) : []), [result]);
  const upliftTotal = useMemo(() => priorityIssues.reduce((sum, issue) => sum + issue.uplift, 0), [priorityIssues]);

  useEffect(() => {
    if (!loading) {
      return;
    }

    setProgress(8);
    setProgressLabel("Preparing audit");

    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;

      if (elapsed < 1200) {
        setProgress(18);
        setProgressLabel("Fetching page HTML");
        return;
      }

      if (elapsed < 2800) {
        setProgress(38);
        setProgressLabel("Checking SEO and technical signals");
        return;
      }

      if (elapsed < 5200) {
        setProgress(62);
        setProgressLabel("Running usability and design checks");
        return;
      }

      if (elapsed < 9000) {
        setProgress(82);
        setProgressLabel("Collecting Google PageSpeed data");
        return;
      }

      setProgress((current) => Math.min(94, current + 1));
      setProgressLabel("Finalizing audit report");
    }, 250);

    return () => window.clearInterval(interval);
  }, [loading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setProgress(5);
    setProgressLabel("Starting audit");
    setError("");

    try {
      const response = await fetch("/api/tools/website-audit", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const payload = (await response.json()) as { success: boolean; result?: AuditResult; error?: string };

      if (!response.ok || !payload.success || !payload.result) {
        throw new Error(payload.error || "Audit failed.");
      }

      setProgress(100);
      setProgressLabel("Audit complete");
      setResult(payload.result);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Audit failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`${styles.playgroundCard} ${styles.auditDashboard}`}>
      <form className={styles.auditForm} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="audit-url">
            Website URL
          </label>
          <input
            id="audit-url"
            className={styles.input}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            autoComplete="url"
            inputMode="url"
          />
        </div>
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Running audit…" : "Run audit"}
        </button>
      </form>

      <p className={styles.helperText}>
        This integrated version of the audit tool checks public pages for core SEO, technical, social, and lightweight performance signals.
      </p>

      {loading ? (
        <div className={styles.auditLoadingCard} role="status" aria-live="polite">
          <div className={styles.auditLoadingTop}>
            <strong>{progress}%</strong>
            <span>{progressLabel}</span>
          </div>
          <div className={styles.auditLoadingTrack}>
            <div className={styles.auditLoadingBar} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.auditLoadingSteps}>
            <span className={progress >= 18 ? styles.auditLoadingStepActive : ""}>Fetch</span>
            <span className={progress >= 38 ? styles.auditLoadingStepActive : ""}>SEO</span>
            <span className={progress >= 62 ? styles.auditLoadingStepActive : ""}>Design</span>
            <span className={progress >= 82 ? styles.auditLoadingStepActive : ""}>PageSpeed</span>
            <span className={progress >= 100 ? styles.auditLoadingStepActive : ""}>Report</span>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className={`${styles.statusBadge} ${styles.error}`}>
          {error}
        </div>
      ) : null}

      {result ? (
        <div className={styles.auditLayout}>
          <section className={styles.auditReportHeader}>
            <p className={styles.auditReportEyebrow}>SEO Analysis Report</p>
            <h2 className={styles.auditReportTitle}>Detailed website audit and reporting</h2>
            <p className={styles.auditTarget}>{result.normalizedUrl}</p>

            <div className={styles.auditExport}>
              <button type="button" className={styles.auditExportBtn} onClick={openReport}>
                Download PDF report
              </button>

              <div className={styles.auditEmailRow}>
                <input
                  className={styles.auditEmailInput}
                  type="email"
                  placeholder="you@company.com"
                  value={reportEmail}
                  onChange={(event) => setReportEmail(event.target.value)}
                  aria-label="Email address for the audit report"
                />
                <button
                  type="button"
                  className={styles.auditEmailBtn}
                  onClick={emailReport}
                  disabled={!reportEmail || emailState === "sending"}
                >
                  {emailState === "sending" ? "Sending…" : "Email me the report"}
                </button>
              </div>

              {emailMessage ? (
                <p className={emailState === "error" ? styles.auditEmailError : styles.auditEmailOk}>
                  {emailMessage}
                </p>
              ) : null}
            </div>
          </section>

          <section className={styles.auditPrioritySection}>
            <div className={styles.auditPriorityIntro}>
              <div>
                <p className={styles.auditPriorityEyebrow}>Top Issues First</p>
                <h3 className={styles.auditPriorityTitle}>Priority fixes to tackle at the top</h3>
                <p className={styles.auditPriorityText}>
                  These are the highest-signal issues across performance, design, usability, and SEO. The uplift values are estimated score gains if each issue is fixed.
                </p>
              </div>
              <div className={styles.auditPrioritySummary}>
                <strong>{priorityIssues.length}</strong>
                <span>priority issue{priorityIssues.length === 1 ? "" : "s"}</span>
                <p>Potential uplift: +{upliftTotal}%</p>
              </div>
            </div>

            <div className={styles.auditPriorityGrid}>
              {priorityIssues.map((issue) => (
                <article key={issue.id} className={styles.auditPriorityCard}>
                  <div className={styles.auditPriorityTop}>
                    <span
                      className={`${styles.auditSeverityPill} ${
                        issue.severity === "high"
                          ? styles.auditSeverityHigh
                          : issue.severity === "medium"
                            ? styles.auditSeverityMedium
                            : styles.auditSeverityLow
                      }`}
                    >
                      {issue.severity} priority
                    </span>
                    <span className={styles.auditUpliftBadge}>Fixing this may boost score by +{issue.uplift}%</span>
                  </div>
                  <h4>{issue.title}</h4>
                  <p>{issue.description}</p>
                  <div className={styles.auditPriorityMeta}>
                    <span>{issue.impact}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.auditExecutiveGrid}>
            <article className={styles.auditExecutivePanel}>
              <p className={styles.auditPanelEyebrow}>Executive Snapshot</p>
              <h3>Modern audit overview</h3>
              <p>
                This report combines SEO, technical quality, PageSpeed, usability, and visual design checks in one workspace so you can prioritize the fixes that matter first.
              </p>
              <div className={styles.auditExecutiveStats}>
                <div className={styles.auditExecutiveStat}>
                  <span>Overall score</span>
                  <strong>{result.overallScore}%</strong>
                </div>
                <div className={styles.auditExecutiveStat}>
                  <span>Potential uplift</span>
                  <strong>+{upliftTotal}%</strong>
                </div>
                <div className={styles.auditExecutiveStat}>
                  <span>Top issue</span>
                  <strong>{priorityIssues[0]?.title ?? "No critical issue detected"}</strong>
                </div>
              </div>
            </article>

            <article className={styles.auditExecutivePanel}>
              <p className={styles.auditPanelEyebrow}>Recommended Order</p>
              <h3>What to improve first</h3>
              <ul className={styles.auditRecommendationList}>
                <li>Stabilize layout and responsiveness first so users stop seeing visual jumps and weak mobile rendering.</li>
                <li>Improve PageSpeed and loading perception next, especially on mobile devices.</li>
                <li>Then tighten metadata, accessibility, content structure, and supporting SEO quality signals.</li>
              </ul>
            </article>
          </section>

          <section className={styles.auditOverview}>
            <div className={styles.auditOverallCard}>
              <span className={styles.auditEyebrow}>Overall</span>
              <div className={`${styles.auditScoreValue} ${overallTone.className}`}>{result.overallScore}%</div>
              <p className={styles.auditScoreLabel}>{overallTone.label}</p>
            </div>

            <div className={styles.auditBarsCard}>
              <div className={styles.auditBarRow}>
                <div className={styles.auditBarTrack}>
                  <div className={`${styles.auditBarFill} ${styles.auditBarGreen}`} style={{ width: `${onPageScore}%` }}>
                    <span>On-Page SEO</span>
                  </div>
                </div>
                <strong>{onPageScore}%</strong>
              </div>

              <div className={styles.auditBarRow}>
                <div className={styles.auditBarTrack}>
                  <div className={`${styles.auditBarFill} ${styles.auditBarRed}`} style={{ width: `${technicalScore}%` }}>
                    <span>Technical SEO</span>
                  </div>
                </div>
                <strong>{technicalScore}%</strong>
              </div>

              <div className={styles.auditBarRow}>
                <div className={styles.auditBarTrack}>
                  <div className={`${styles.auditBarFill} ${styles.auditBarYellow}`} style={{ width: `${performanceScore}%` }}>
                    <span>Site Performance</span>
                  </div>
                </div>
                <strong>{performanceScore}%</strong>
              </div>

              <div className={styles.auditBarRow}>
                <div className={styles.auditBarTrack}>
                  <div className={`${styles.auditBarFill} ${styles.auditBarBlue}`} style={{ width: `${usabilityScore}%` }}>
                    <span>Usability & Design</span>
                  </div>
                </div>
                <strong>{usabilityScore}%</strong>
              </div>
            </div>
          </section>

          <section className={styles.auditChartsGrid}>
            <div className={styles.auditSectionCard}>
              <div className={styles.auditSectionHead}>
                <div>
                  <h3 className={styles.auditSectionTitle}>Score circles</h3>
                  <p className={styles.auditSectionSubtitle}>Circular filters and score graphs inspired by the older audit layout.</p>
                </div>
              </div>
              <div className={styles.auditRingsGrid}>
                <ScoreRing label="On-Page SEO" score={onPageScore} toneClassName={onPageTone.className} />
                <ScoreRing label="Technical SEO" score={technicalScore} toneClassName={technicalTone.className} />
                <ScoreRing label="Social" score={socialScore} toneClassName={socialTone.className} />
                <ScoreRing label="Performance" score={performanceScore} toneClassName={performanceTone.className} />
                <ScoreRing label="Usability" score={usabilityScore} toneClassName={usabilityTone.className} />
                <ScoreRing label="PageSpeed" score={pageSpeedScore} toneClassName={pageSpeedTone.className} />
              </div>
            </div>

            <div className={styles.auditSectionCard}>
              <div className={styles.auditSectionHead}>
                <div>
                  <h3 className={styles.auditSectionTitle}>Score graph</h3>
                  <p className={styles.auditSectionSubtitle}>A compact bar chart for the main audit categories.</p>
                </div>
              </div>
              <div className={styles.auditGraphCard}>
                <div className={styles.auditGraphRow}>
                  <span>On-Page SEO</span>
                  <div className={styles.auditGraphTrack}>
                    <div className={`${styles.auditGraphBar} ${styles.auditBarGreen}`} style={{ height: `${Math.max(12, onPageScore)}%` }} />
                  </div>
                  <strong>{onPageScore}%</strong>
                </div>
                <div className={styles.auditGraphRow}>
                  <span>Technical SEO</span>
                  <div className={styles.auditGraphTrack}>
                    <div className={`${styles.auditGraphBar} ${styles.auditBarRed}`} style={{ height: `${Math.max(12, technicalScore)}%` }} />
                  </div>
                  <strong>{technicalScore}%</strong>
                </div>
                <div className={styles.auditGraphRow}>
                  <span>Social</span>
                  <div className={styles.auditGraphTrack}>
                    <div className={`${styles.auditGraphBar} ${styles.auditBarBlue}`} style={{ height: `${Math.max(12, socialScore)}%` }} />
                  </div>
                  <strong>{socialScore}%</strong>
                </div>
                <div className={styles.auditGraphRow}>
                  <span>Performance</span>
                  <div className={styles.auditGraphTrack}>
                    <div className={`${styles.auditGraphBar} ${styles.auditBarYellow}`} style={{ height: `${Math.max(12, performanceScore)}%` }} />
                  </div>
                  <strong>{performanceScore}%</strong>
                </div>
                <div className={styles.auditGraphRow}>
                  <span>Usability</span>
                  <div className={styles.auditGraphTrack}>
                    <div className={`${styles.auditGraphBar} ${styles.auditBarBlue}`} style={{ height: `${Math.max(12, usabilityScore)}%` }} />
                  </div>
                  <strong>{usabilityScore}%</strong>
                </div>
                <div className={styles.auditGraphRow}>
                  <span>PageSpeed</span>
                  <div className={styles.auditGraphTrack}>
                    <div className={`${styles.auditGraphBar} ${styles.auditBarGreen}`} style={{ height: `${Math.max(12, pageSpeedScore)}%` }} />
                  </div>
                  <strong>{pageSpeedScore}%</strong>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.auditChartsGrid}>
            <div className={styles.auditSectionCard}>
              <div className={styles.auditSectionHead}>
                <div>
                  <h3 className={styles.auditSectionTitle}>Google PageSpeed Insights</h3>
                  <p className={styles.auditSectionSubtitle}>Mobile and desktop scores plus core web vitals-style metrics.</p>
                </div>
              </div>
              <div className={styles.auditPsiCards}>
                <div className={styles.auditPsiCard}>
                  <h4>Mobile</h4>
                  <div className={styles.auditPsiScore}>{result.pageSpeed.mobile?.performanceScore ?? "NA"}</div>
                  <div className={styles.auditPsiMetrics}>
                    <div><span>Accessibility</span><strong>{result.pageSpeed.mobile?.accessibilityScore ?? "NA"}</strong></div>
                    <div><span>SEO</span><strong>{result.pageSpeed.mobile?.seoScore ?? "NA"}</strong></div>
                    <div><span>Best Practices</span><strong>{result.pageSpeed.mobile?.bestPracticesScore ?? "NA"}</strong></div>
                    <div><span>FCP</span><strong>{result.pageSpeed.mobile?.firstContentfulPaint ?? "NA"}</strong></div>
                    <div><span>LCP</span><strong>{result.pageSpeed.mobile?.largestContentfulPaint ?? "NA"}</strong></div>
                    <div><span>CLS</span><strong>{result.pageSpeed.mobile?.cumulativeLayoutShift ?? "NA"}</strong></div>
                    <div><span>Speed Index</span><strong>{result.pageSpeed.mobile?.speedIndex ?? "NA"}</strong></div>
                    <div><span>Total Blocking Time</span><strong>{result.pageSpeed.mobile?.totalBlockingTime ?? "NA"}</strong></div>
                  </div>
                </div>
                <div className={styles.auditPsiCard}>
                  <h4>Desktop</h4>
                  <div className={styles.auditPsiScore}>{result.pageSpeed.desktop?.performanceScore ?? "NA"}</div>
                  <div className={styles.auditPsiMetrics}>
                    <div><span>Accessibility</span><strong>{result.pageSpeed.desktop?.accessibilityScore ?? "NA"}</strong></div>
                    <div><span>SEO</span><strong>{result.pageSpeed.desktop?.seoScore ?? "NA"}</strong></div>
                    <div><span>Best Practices</span><strong>{result.pageSpeed.desktop?.bestPracticesScore ?? "NA"}</strong></div>
                    <div><span>FCP</span><strong>{result.pageSpeed.desktop?.firstContentfulPaint ?? "NA"}</strong></div>
                    <div><span>LCP</span><strong>{result.pageSpeed.desktop?.largestContentfulPaint ?? "NA"}</strong></div>
                    <div><span>CLS</span><strong>{result.pageSpeed.desktop?.cumulativeLayoutShift ?? "NA"}</strong></div>
                    <div><span>Speed Index</span><strong>{result.pageSpeed.desktop?.speedIndex ?? "NA"}</strong></div>
                    <div><span>Total Blocking Time</span><strong>{result.pageSpeed.desktop?.totalBlockingTime ?? "NA"}</strong></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.auditSectionCard}>
              <div className={styles.auditSectionHead}>
                <div>
                  <h3 className={styles.auditSectionTitle}>Design & usability issues</h3>
                  <p className={styles.auditSectionSubtitle}>Site-side checks that affect layout stability, accessibility, and responsiveness.</p>
                </div>
              </div>
              <div className={styles.auditMetricList}>
                <div className={styles.auditMetricRow}>
                  <span>Viewport meta</span>
                  <strong>{result.metrics.viewportPresent ? "Present" : "Missing"}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>HTML lang</span>
                  <strong>{result.metrics.htmlLang || "Missing"}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>Buttons</span>
                  <strong>{result.metrics.buttonsCount}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>Forms</span>
                  <strong>{result.metrics.formsCount}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>Labels / fields</span>
                  <strong>{result.metrics.labelsCount} / {result.metrics.inputCount}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>Images missing size</span>
                  <strong>{result.metrics.imagesMissingDimensions}</strong>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.auditSectionCard}>
            <div className={styles.auditSectionHead}>
              <div>
                <h3 className={styles.auditSectionTitle}>Page preview screenshots</h3>
                <p className={styles.auditSectionSubtitle}>Desktop, mobile, and tablet previews similar to the original audit report.</p>
              </div>
            </div>
            <div className={styles.auditScreenshotsGrid}>
              <div className={styles.auditScreenshotCard}>
                <h4>Desktop</h4>
                <div className={styles.auditDesktopFrame}>
                  <img className={styles.auditFramedImage} src={`${screenshotBaseUrl}&device=desktop`} alt="Desktop screenshot" />
                </div>
              </div>
              <div className={styles.auditScreenshotCard}>
                <h4>Mobile</h4>
                <div className={styles.auditMobileFrame}>
                  <img className={styles.auditFramedImage} src={`${screenshotBaseUrl}&device=mobile`} alt="Mobile screenshot" />
                </div>
              </div>
              <div className={styles.auditScreenshotCard}>
                <h4>Tablet</h4>
                <div className={styles.auditTabletFrame}>
                  <img className={styles.auditFramedImage} src={`${screenshotBaseUrl}&device=tablet`} alt="Tablet screenshot" />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.auditSectionCard}>
            <div className={styles.auditSectionHead}>
              <div>
                <h3 className={styles.auditSectionTitle}>Design issue review screenshots</h3>
                <p className={styles.auditSectionSubtitle}>Additional screenshots focused on layout review, visual stability, and responsive design checks.</p>
              </div>
            </div>
            <div className={styles.auditDesignGrid}>
              <div className={styles.auditDesignCard}>
                <div className={styles.auditDesignHead}>
                  <h4>Wide desktop review</h4>
                  <span>Navigation, hero, spacing</span>
                </div>
                <div className={styles.auditDesignFrame}>
                  <img className={styles.auditFramedImage} src={`${screenshotBaseUrl}&device=desktop&variant=wide`} alt="Wide desktop layout review" />
                </div>
              </div>

              <div className={styles.auditDesignCard}>
                <div className={styles.auditDesignHead}>
                  <h4>Long page review</h4>
                  <span>Scroll flow, section rhythm</span>
                </div>
                <div className={styles.auditDesignFrame}>
                  <img className={styles.auditFramedImage} src={`${screenshotBaseUrl}&device=desktop&variant=tall`} alt="Long page design review" />
                </div>
              </div>

              <div className={styles.auditDesignCard}>
                <div className={styles.auditDesignHead}>
                  <h4>Tall mobile review</h4>
                  <span>Stacking, readability, CTA flow</span>
                </div>
                <div className={styles.auditDesignMobileFrame}>
                  <img className={styles.auditFramedImage} src={`${screenshotBaseUrl}&device=mobile&variant=tall`} alt="Tall mobile design review" />
                </div>
              </div>

              <div className={styles.auditDesignCard}>
                <div className={styles.auditDesignHead}>
                  <h4>Tablet content review</h4>
                  <span>Mid-size layout balance</span>
                </div>
                <div className={styles.auditDesignTabletFrame}>
                  <img className={styles.auditFramedImage} src={`${screenshotBaseUrl}&device=tablet&variant=tall`} alt="Tablet design review" />
                </div>
              </div>
            </div>

            {designIssueNotes.length ? (
              <div className={styles.auditIssueList}>
                {designIssueNotes.map((note) => (
                  <div key={note} className={styles.auditIssuePill}>
                    {note}
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          <section className={styles.auditSnapshotSection}>
            <div className={styles.auditSnapshotCard}>
              <h3 className={styles.auditSectionTitle}>Key findings</h3>
              <div className={styles.auditMetricList}>
                <div className={styles.auditMetricRow}>
                  <span>Response time</span>
                  <strong>{result.responseTimeMs} ms</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>HTML size</span>
                  <strong>{(result.pageSizeBytes / 1024).toFixed(1)} KB</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>Words</span>
                  <strong>{result.metrics.wordCount}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>H1 tags</span>
                  <strong>{result.metrics.h1Count}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>H2 tags</span>
                  <strong>{result.metrics.h2Count}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>Schema blocks</span>
                  <strong>{result.metrics.schemaCount}</strong>
                </div>
              </div>
            </div>

            <div className={styles.auditSnapshotCard}>
              <h3 className={styles.auditSectionTitle}>Link and media summary</h3>
              <div className={styles.auditMetricList}>
                <div className={styles.auditMetricRow}>
                  <span>Images</span>
                  <strong>{result.metrics.imageCount}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>Images missing alt</span>
                  <strong>{result.metrics.imagesWithoutAlt}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>Internal links</span>
                  <strong>{result.metrics.internalLinks}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>External links</span>
                  <strong>{result.metrics.externalLinks}</strong>
                </div>
                <div className={styles.auditMetricRow}>
                  <span>Social links</span>
                  <strong>{result.metrics.socialLinks}</strong>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.auditSectionStack}>
            {result.sections.map((section) => {
              const tone = scoreTone(section.score);

              return (
                <article key={section.id} className={styles.auditSectionCard}>
                  <div className={styles.auditSectionHead}>
                    <div>
                      <h3 className={styles.auditSectionTitle}>{section.title}</h3>
                      <p className={styles.auditSectionSubtitle}>
                        {section.checks.filter((check) => check.passed).length} of {section.checks.length} checks passed
                      </p>
                    </div>
                    <div className={`${styles.auditMiniScore} ${tone.className}`}>
                      {section.score}
                    </div>
                  </div>

                  <div className={styles.auditChecks}>
                    {section.checks.map((check) => (
                      <div key={check.id} className={styles.auditCheckRow}>
                        <div className={styles.auditCheckStatus}>
                          <span className={check.passed ? styles.auditPass : styles.auditFail}>
                            {check.passed ? "Pass" : "Issue"}
                          </span>
                        </div>
                        <div className={styles.auditCheckBody}>
                          <div className={styles.auditCheckTop}>
                            <strong>{check.label}</strong>
                            {check.value ? <code>{check.value}</code> : null}
                          </div>
                          {check.details ? <p>{check.details}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </section>

          <section className={styles.auditSectionCard}>
            <div className={styles.auditSectionHead}>
              <div>
                <h3 className={styles.auditSectionTitle}>Metadata</h3>
                <p className={styles.auditSectionSubtitle}>Quick reference values extracted from the page.</p>
              </div>
            </div>
            <div className={styles.auditMetaGrid}>
              <div className={styles.auditMetaItem}>
                <span>Title</span>
                <code>{result.metrics.title || "Missing"}</code>
              </div>
              <div className={styles.auditMetaItem}>
                <span>Description</span>
                <code>{result.metrics.metaDescription || "Missing"}</code>
              </div>
              <div className={styles.auditMetaItem}>
                <span>Canonical</span>
                <code>{result.metrics.canonical || "Missing"}</code>
              </div>
              <div className={styles.auditMetaItem}>
                <span>Favicon</span>
                <code>{result.metrics.favicon || "Missing"}</code>
              </div>
              <div className={styles.auditMetaItem}>
                <span>robots.txt</span>
                <code>{result.metrics.robotsUrl}</code>
              </div>
              <div className={styles.auditMetaItem}>
                <span>sitemap.xml</span>
                <code>{result.metrics.sitemapUrl}</code>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
