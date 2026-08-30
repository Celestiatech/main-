import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { FontAwesomeLoader } from "../../components/FontAwesomeLoader";
import ToolPlayground from "./ToolPlayground";
import ToolInsightSections from "./ToolInsightSections";
import styles from "./tool-detail.module.css";
import { getToolBySlug } from "@/lib/tools-catalog";

type ToolDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const isAuditTool = tool.slug === "website-audit-tool";
  const toolLimit = tool.slug === "da-pa-checker"
    ? "Bulk check up to 10 URLs"
    : tool.slug === "shopify-theme-generator"
      ? "Convert one authorized URL"
      : "Free to use";

  return (
    <div className={styles.page}>
      <FontAwesomeLoader />
      <Header />
      <div className={styles.headerGap} />

      <main className={`${styles.main} ${isAuditTool ? styles.auditMain : ""}`}>
        <section className={styles.toolHero}>
          <nav className={styles.toolBreadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/popular-tools">Popular Tools</Link><span>/</span><strong>{tool.title}</strong>
          </nav>
          <p className={styles.toolCategory}>{tool.category.replaceAll("-", " ")}</p>
          <h1>Free <em>{tool.title}</em></h1>
          <p className={styles.toolDescription}>{tool.description}</p>
          <div className={styles.toolTrust}>
            <span>Instant results</span>
            <span>No sign-up required</span>
            <span>{toolLimit}</span>
            <span>{tool.status === "live" ? "100% free" : "Coming soon"}</span>
          </div>
        </section>

        <section className={`${styles.workspaceCard} ${isAuditTool ? styles.auditWorkspaceCard : ""}`}>
          <ToolPlayground slug={tool.slug} />
        </section>

        {tool.slug !== "website-audit-tool" && tool.slug !== "meta-video-downloader" && (
          <ToolInsightSections tool={tool} />
        )}

        {tool.slug === "website-audit-tool" && (
          <>
            <section className={`${styles.contentSection} ${styles.auditCenter}`}>
              <div className={`${styles.auditEyebrow} ${styles.auditEyebrowCenter}`}>Inside the report</div>
              <h2 className={styles.auditSectionTitle}>
                What&apos;s inside your website <em>SEO audit?</em>
              </h2>
              <p className={styles.auditSectionLead}>
                See exactly what is holding your site back, with every finding tied to a fix.
              </p>

              <div className={styles.auditReportGrid}>
                {[
                  { icon: "◎", title: "Overall score (0–100)", desc: "An instant snapshot of your page's technical and SEO health, weighted across six categories." },
                  { icon: "⚠", title: "Priority fixes first", desc: "Failing checks are ranked by impact, so you always know what to change before anything else." },
                  { icon: "⚡", title: "Core Web Vitals", desc: "Live Lighthouse data for LCP, CLS, Speed Index, and Total Blocking Time on mobile and desktop." },
                  { icon: "◧", title: "On-page structure", desc: "Title, meta description, canonical, heading hierarchy, word count, and structured data blocks." },
                  { icon: "⛨", title: "Technical & security", desc: "HTTPS, robots.txt, sitemap.xml, indexability, favicon, and viewport configuration." },
                  { icon: "⇗", title: "Links & social", desc: "Internal, external, and social link counts, plus Open Graph tags that control how you share." },
                ].map((item, index) => (
                  <article key={item.title} className={styles.auditReportCard}>
                    <div className={styles.auditReportCardTop}>
                      <span className={styles.auditReportNum}>{String(index + 1).padStart(2, "0")}.</span>
                      <span className={styles.auditReportIcon} aria-hidden="true">{item.icon}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.contentSection}>
              <div className={styles.auditEyebrow}>Behind the analysis</div>
              <h2 className={styles.auditSectionTitle}>
                How we generate <em>your results</em>
              </h2>
              <p className={styles.auditSectionLead}>
                Four steps, run against your site&apos;s live environment. Nothing is cached and nothing is guessed.
              </p>

              <div className={styles.auditStepList}>
                {[
                  { step: "Step 1", title: "The technical crawl", desc: "We request your page with a real browser user-agent, following redirects and retrying the www variant if the apex domain refuses us. Then we probe robots.txt and sitemap.xml — if search engines cannot reach you, nothing else matters." },
                  { step: "Step 2", title: "Code and on-page analysis", desc: "We parse the returned HTML for title, meta description, canonical, heading hierarchy, image alt coverage, structured data, and link structure — checking whether your markup tells search engines a clear story." },
                  { step: "Step 3", title: "Performance stress-test", desc: "We run your URL through Google PageSpeed Insights on both mobile and desktop, pulling live Core Web Vitals rather than estimates, and flag the metrics outside Google's own thresholds." },
                  { step: "Step 4", title: "Scoring and prioritisation", desc: "Every check is scored per category and rolled into one number. Failing checks are sorted into a fix-first list, so the report ends with an action plan instead of a wall of data." },
                ].map((item) => (
                  <article key={item.step} className={styles.auditStepRow}>
                    <span className={styles.auditStepBadge}>{item.step}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.contentSection}>
              <div className={styles.auditEyebrow}>Why use this tool</div>
              <h2 className={styles.auditSectionTitle}>
                Everything you need to <em>improve your rankings.</em>
              </h2>
              <p className={styles.auditSectionLead}>
                Built by the team that ships and maintains production sites for clients every week.
              </p>

              <div className={styles.auditFeatureGrid}>
                {[
                  { title: "Instant free analysis", desc: "A full report in seconds. No registration, no credit card, no trial that expires. Enter a URL and run it." },
                  { title: "Six category scores", desc: "SEO, Technical, Social, Performance, Usability, and Google PageSpeed — so you know which area needs attention first." },
                  { title: "Fix recommendations", desc: "Every failing check explains why it matters and what to change, not just that something is wrong." },
                  { title: "Live PageSpeed data", desc: "Core Web Vitals come from Google's own API on both mobile and desktop, not from a local approximation." },
                  { title: "PDF report", desc: "Export the full audit as a branded PDF you can send to a client or keep as a before-and-after record." },
                  { title: "Emailed to you", desc: "Send the report to your inbox in one click, so the findings are still there when you sit down to fix them." },
                ].map((item) => (
                  <article key={item.title} className={styles.auditFeatureCard}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.contentSection}>
              <div className={styles.auditEyebrow}>Honest comparison</div>
              <h2 className={styles.auditSectionTitle}>
                W3Tech audit tool vs. <em>other audit tools</em>
              </h2>

              <div className={styles.auditCompare}>
                <div className={styles.auditCompareScroll}>
                  <table className={styles.auditCompareTable}>
                    <thead>
                      <tr>
                        <th>Feature</th>
                        <th>Other big tools</th>
                        <th className={styles.auditCompareOurs}>W3Tech</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: "Cost", other: "Free trial, then paid", ours: "Always free" },
                        { feature: "Login required", other: "Yes", ours: "No" },
                        { feature: "Audit limits", other: "Limited per month", ours: "Unlimited" },
                        { feature: "PDF report", other: "Often paid", ours: "Instant and free" },
                        { feature: "Core Web Vitals", other: "Sometimes estimated", ours: "Live Google PageSpeed data" },
                      ].map((row) => (
                        <tr key={row.feature}>
                          <td>{row.feature}</td>
                          <td>{row.other}</td>
                          <td className={styles.auditCompareWin}>{row.ours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={styles.contentSection}>
              <div className={styles.auditEyebrow}>Questions</div>
              <h2 className={styles.auditSectionTitle}>
                Frequently asked <em>questions</em>
              </h2>

              <div className={styles.auditFaqGrid}>
                {[
                  { q: "Is this audit really free?", a: "Yes. There is no account, no trial, and no cap on how many pages you audit." },
                  { q: "Which page does it audit?", a: "The exact URL you enter. Audit your homepage first, then run the pages that matter most to you individually." },
                  { q: "Why is my score lower than another tool's?", a: "Every tool weights checks differently. Use the score to track your own progress over time rather than to compare against another tool's number." },
                  { q: "Do you store my results?", a: "No. The audit runs on request and nothing is saved. Export the PDF or email it to yourself to keep a copy." },
                  { q: "Why did the audit fail on my site?", a: "Some hosts block automated requests, and pages that build their content with JavaScript return very little HTML to analyse. Both show up as a fetch error or an unusually low word count." },
                  { q: "Can you fix these issues for us?", a: "Yes — that is our day job. Send us the report from the contact page and we will scope the work." },
                ].map((item) => (
                  <details key={item.q} className={styles.auditFaqItem}>
                    <summary>
                      {item.q}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </>
        )}

        {tool.slug === "meta-video-downloader" && (
          <>
            <section className={styles.contentSection}>
              <h2>How to Download Meta Videos</h2>
              <div className={styles.stepsGrid}>
                <div className={styles.stepCard}>
                  <span className={styles.stepNum}>1</span>
                  <h3>Copy the Video URL</h3>
                  <p>Open Facebook or Instagram, find the video you want, and copy its URL from the browser address bar or the share button.</p>
                </div>
                <div className={styles.stepCard}>
                  <span className={styles.stepNum}>2</span>
                  <h3>Paste It Above</h3>
                  <p>Paste the copied link into the input field. The tool will automatically detect whether it is a Facebook or Instagram video.</p>
                </div>
                <div className={styles.stepCard}>
                  <span className={styles.stepNum}>3</span>
                  <h3>Choose Quality</h3>
                  <p>Select your preferred video quality — HD (1080p), SD (720p), or Standard (480p). Higher quality means larger file size.</p>
                </div>
                <div className={styles.stepCard}>
                  <span className={styles.stepNum}>4</span>
                  <h3>Download</h3>
                  <p>Click the Download button and the video will be processed and saved to your device in MP4 format.</p>
                </div>
              </div>
            </section>

            <section className={styles.contentSection}>
              <h2>Why Use This Tool?</h2>
              <div className={styles.featuresGrid}>
                <div className={styles.featureCard}>
                  <h3>No Login Required</h3>
                  <p>Download public videos without signing into Facebook or Instagram. Just paste the link and go.</p>
                </div>
                <div className={styles.featureCard}>
                  <h3>High Quality</h3>
                  <p>Get videos in up to 1080p HD resolution. Choose the quality that works best for your needs.</p>
                </div>
                <div className={styles.featureCard}>
                  <h3>Fast & Free</h3>
                  <p>No hidden charges, no watermarks, no limits. Download as many videos as you want, completely free.</p>
                </div>
                <div className={styles.featureCard}>
                  <h3>Works Everywhere</h3>
                  <p>Compatible with all Facebook video formats and Instagram Reels, Stories, and feed videos.</p>
                </div>
              </div>
            </section>

            <section className={styles.contentSection}>
              <h2>Frequently Asked Questions</h2>
              <div className={styles.faqList}>
                <div className={styles.faqItem}>
                  <h3>Is this tool free?</h3>
                  <p>Yes, the Meta Video Downloader is completely free to use with no hidden charges or usage limits.</p>
                </div>
                <div className={styles.faqItem}>
                  <h3>What video formats are supported?</h3>
                  <p>All downloaded videos are saved in MP4 format, which works on all devices and platforms.</p>
                </div>
                <div className={styles.faqItem}>
                  <h3>Can I download private videos?</h3>
                  <p>No, this tool only works with publicly accessible videos. Private or friends-only content cannot be downloaded.</p>
                </div>
                <div className={styles.faqItem}>
                  <h3>Do I need to install anything?</h3>
                  <p>No installation required. Everything works directly in your browser with no plugins or software needed.</p>
                </div>
              </div>
            </section>

            <section className={styles.contentSection}>
              <h2>Supported Platforms</h2>
              <div className={styles.platformsGrid}>
                <div className={styles.platformCard}>
                  <h3>Facebook</h3>
                  <ul>
                    <li>Feed videos</li>
                    <li>Watch party videos</li>
                    <li>Reels</li>
                    <li>Live stream replays</li>
                    <li>Shared video posts</li>
                  </ul>
                </div>
                <div className={styles.platformCard}>
                  <h3>Instagram</h3>
                  <ul>
                    <li>Reels</li>
                    <li>Feed videos</li>
                    <li>IGTV videos</li>
                    <li>Story highlights</li>
                    <li>Carousel videos</li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
