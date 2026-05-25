import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { getPortfolioItemBySlug } from "@/lib/grocitoPortfolio";

function formatDomain(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function getCategoryHighlights(category: string) {
  switch (category) {
    case "web":
      return [
        "Responsive UI built for mobile-first browsing",
        "SEO-ready structure and clean page hierarchy",
        "Fast load experience with optimized media",
        "Clear CTAs to increase inquiries and orders",
      ];
    case "mobile":
      return [
        "App-like UX patterns and touch-friendly layouts",
        "Performance tuning for slower networks/devices",
        "Retention-focused flows (onboarding, actions)",
        "Analytics-ready screens and event hooks",
      ];
    case "ai":
      return [
        "User-friendly AI features that feel practical",
        "Clean inputs/outputs and guided workflows",
        "Safety-first UI with clear system messaging",
        "Scalable architecture for iteration",
      ];
    case "blockchain":
      return [
        "Trust-building UX for complex workflows",
        "Clear transaction states and confirmations",
        "Security-minded UI patterns and guardrails",
        "Simplified flows for onboarding and usage",
      ];
    case "game":
      return [
        "Visually engaging presentation and branding",
        "Performance-minded asset handling",
        "Clear funnel from landing to gameplay",
        "Retention and community touchpoints",
      ];
    case "design":
      return [
        "Consistent layout, spacing, and typography",
        "Conversion-first visual hierarchy",
        "Brand-ready components and reusable styles",
        "Polished interactions and micro-details",
      ];
    default:
      return [
        "Modern UI tailored to the product",
        "Clean structure for scalability",
        "Performance-focused media and layout",
        "Clear messaging and conversion flow",
      ];
  }
}

function getRecommendedStack(category: string) {
  if (category === "web") return ["Next.js", "React", "SEO Setup", "Performance Optimization"];
  if (category === "mobile") return ["React Native / Flutter", "API Integration", "Push Notifications", "Analytics"];
  if (category === "ai") return ["LLM Integration", "Prompt + UX Design", "API Layer", "Observability"];
  if (category === "blockchain") return ["Wallet Connect", "Smart Contract Integration", "Web3 UX", "Security Review"];
  if (category === "game") return ["Unity / WebGL", "Backend Services", "Leaderboards", "Live Ops Hooks"];
  return ["UI/UX System", "Front-end Build", "QA + Fixes", "Launch Support"];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) return { title: "Project Not Found" };
  return {
    title: `${item.title} — Portfolio`,
    description: `Project detail page for ${item.title}.`,
  };
}

export default async function PortfolioItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) notFound();

  const domain = formatDomain(item.url);
  const highlights = getCategoryHighlights(item.category);
  const stack = getRecommendedStack(item.category);

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.eyebrowRow}>
                <span className={styles.eyebrow}>Portfolio Project</span>
                <span className={styles.badge}>{item.category}</span>
              </div>
              <h1>{item.title}</h1>
              <p className={styles.heroMeta}>
                View project details inside the site. You can open the live site anytime from here.
              </p>
              <div className={styles.actions}>
                <Link href={item.url} target="_blank" rel="noreferrer" className={styles.primaryButton}>
                  Open Live Site
                </Link>
                <Link href="/work" className={styles.secondaryButton}>
                  Back to Work Directory
                </Link>
                <Link href="/contact" className={styles.secondaryButton}>
                  Build Similar
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className="container">
            <div className={styles.mediaCard}>
              <div className={styles.media}>
                <Image
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                  width={1200}
                  height={750}
                  sizes="100vw"
                />
              </div>
            </div>

            <div className={styles.detailGrid}>
              <div className={styles.detailCard}>
                <div className={styles.detailLabel}>Website</div>
                <p className={styles.detailValue}>{domain}</p>
              </div>
              <div className={styles.detailCard}>
                <div className={styles.detailLabel}>Category</div>
                <p className={styles.detailValue}>{item.category}</p>
              </div>
              <div className={styles.detailCard}>
                <div className={styles.detailLabel}>Portfolio Path</div>
                <p className={styles.detailValue}>/portfolio/{slug}</p>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Project Overview</h2>
            <p className={styles.leadText}>
              {item.title} is a live {item.category} project showcased in our portfolio. This internal page gives a quick snapshot of what matters
              (category fit, UX goals, and delivery highlights) while keeping the live link one click away.
            </p>

            <div className={styles.gridTwo}>
              <div className={styles.listCard}>
                <h3 className={styles.listTitle}>What We Focused On</h3>
                <ul className={styles.bullets}>
                  {highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.listCard}>
                <h3 className={styles.listTitle}>Typical Build Modules</h3>
                <ul className={styles.bullets}>
                  <li>UI screens and reusable components</li>
                  <li>Forms, lead capture, or checkout flows</li>
                  <li>Admin/content updates (where needed)</li>
                  <li>Testing, bug fixes, and launch support</li>
                </ul>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Recommended Tech Stack</h2>
            <div className={styles.chips} aria-label="Recommended stack">
              {stack.map((label) => (
                <span key={label} className={styles.chip}>
                  {label}
                </span>
              ))}
            </div>

            <div className={styles.ctaCard}>
              <h3 className={styles.ctaCardTitle}>Want something similar?</h3>
              <p className={styles.ctaCardText}>
                Share your goals and we’ll map the right structure, pages, and features for your business—then deliver a build that’s fast, stable,
                and easy to scale.
              </p>
              <div className={styles.actions}>
                <Link href="/contact" className={styles.primaryButton}>
                  Get a Quote
                </Link>
                <Link href="/work" className={styles.secondaryButton}>
                  View More Projects
                </Link>
                <Link href={item.url} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
                  Open {domain}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
