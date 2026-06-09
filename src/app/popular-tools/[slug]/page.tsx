import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { FontAwesomeLoader } from "../../components/FontAwesomeLoader";
import ToolPlayground from "./ToolPlayground";
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

  return (
    <div className={styles.page}>
      <FontAwesomeLoader />
      <Header />
      <div className={styles.headerGap} />

      <main className={`${styles.main} ${isAuditTool ? styles.auditMain : ""}`}>
        <Link className={`${styles.backLink} ${isAuditTool ? styles.auditBackLink : ""}`} href="/popular-tools">
          Back to All Tools
        </Link>

        <section className={`${styles.heroCard} ${isAuditTool ? styles.auditHeroCard : ""}`}>
          <p className={styles.categoryLabel}>{tool.category.replaceAll("-", " ")}</p>
          <h1>{tool.title}</h1>
          <p>{tool.description}</p>
          <span className={`${styles.badge} ${tool.status === "live" ? styles.live : styles.soon}`}>
            {tool.status === "live" ? "Live Tool" : "Coming Soon"}
          </span>
        </section>

        <section className={`${styles.workspaceCard} ${isAuditTool ? styles.auditWorkspaceCard : ""}`}>
          <ToolPlayground slug={tool.slug} />
        </section>

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
