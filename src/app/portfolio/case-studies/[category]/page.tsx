import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { CASE_STUDIES } from "@/lib/grocitoPortfolio";

function getDeliveryChecklist(category: string) {
  switch (category) {
    case "web":
      return [
        "Information architecture and page hierarchy",
        "Responsive UI with fast-loading media",
        "Technical SEO basics (metadata, structure)",
        "Lead capture, forms, and conversion flow",
      ];
    case "mobile":
      return [
        "Onboarding and primary user journeys",
        "API integration and data handling",
        "Push notifications and engagement hooks",
        "App store readiness and QA cycles",
      ];
    case "game":
      return [
        "Gameplay loop UX and core screens",
        "Performance and asset optimization",
        "Leaderboards / progression (if needed)",
        "Release pipeline and post-launch updates",
      ];
    case "design":
      return [
        "Brand + UI system (components, spacing)",
        "Conversion-first layout and hierarchy",
        "Design handoff readiness for dev",
        "Iteration cycles with stakeholder feedback",
      ];
    case "blockchain":
      return [
        "Wallet UX and transaction state clarity",
        "Security-minded flows and confirmations",
        "Smart contract integration touchpoints",
        "Error handling and trust-building UI",
      ];
    case "ai":
      return [
        "Problem-to-workflow mapping for AI features",
        "Prompt UX and guided input/output patterns",
        "Safety messaging and edge-case handling",
        "Monitoring, iteration, and evaluation hooks",
      ];
    default:
      return ["Discovery and requirements", "UI/UX design and build", "Testing and polishing", "Launch support"];
  }
}

function getSuggestedStack(category: string) {
  if (category === "web") return ["Next.js", "React", "CMS/Content", "Performance + SEO"];
  if (category === "mobile") return ["React Native / Flutter", "REST/GraphQL", "Push + Analytics", "CI/CD"];
  if (category === "ai") return ["LLM APIs", "Vector Search", "Observability", "Guardrails"];
  if (category === "blockchain") return ["Wallet Connect", "Ethers/Web3", "Indexing", "Security Review"];
  if (category === "game") return ["Unity / Unreal", "Backend Services", "Live Ops", "Analytics"];
  if (category === "design") return ["Design System", "Component Library", "Accessibility", "Prototyping"];
  return ["Discovery", "UI/UX", "Engineering", "QA"];
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const study = CASE_STUDIES.find((entry) => entry.category === category);
  if (!study) return { title: "Case Study Not Found" };

  return {
    title: `${study.title} — Portfolio`,
    description: study.summary,
  };
}

export default async function PortfolioCaseStudyPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const study = CASE_STUDIES.find((entry) => entry.category === category);
  if (!study) notFound();

  const isExternal = /^https?:\/\//.test(study.url);
  const delivery = getDeliveryChecklist(study.category);
  const stack = getSuggestedStack(study.category);

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.eyebrow}>Portfolio Case Study</div>
              <h1>{study.title}</h1>
              <p className={styles.subtitle}>{study.subtitle}</p>
              <p className={styles.summary}>{study.summary}</p>
              <div className={styles.actions}>
                <Link
                  href={study.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className={styles.primaryButton}
                >
                  {study.ctaLabel}
                </Link>
                <Link href="/portfolio" className={styles.secondaryButton}>
                  Back to Portfolio
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
                  src={study.panelImage}
                  alt={study.title}
                  className={styles.image}
                  width={1200}
                  height={750}
                  sizes="100vw"
                />
              </div>
            </div>

            <div className={styles.metaGrid}>
              <div className={styles.metaCard}>
                <div className={styles.metaLabel}>Category</div>
                <p className={styles.metaValue}>{study.category}</p>
              </div>
              <div className={styles.metaCard}>
                <div className={styles.metaLabel}>Focus</div>
                <p className={styles.metaValue}>{study.accent}</p>
              </div>
              <div className={styles.metaCard}>
                <div className={styles.metaLabel}>Portfolio Path</div>
                <p className={styles.metaValue}>/portfolio/case-studies/{study.category}</p>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>What This Covers</h2>
            <p className={styles.leadText}>
              This is a short internal overview for the <strong>{study.title}</strong> category—use it to understand delivery scope, typical modules,
              and the kind of outcomes we optimize for.
            </p>

            <div className={styles.gridTwo}>
              <div className={styles.listCard}>
                <h3 className={styles.listTitle}>Delivery Checklist</h3>
                <ul className={styles.bullets}>
                  {delivery.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.listCard}>
                <h3 className={styles.listTitle}>Typical Outcomes</h3>
                <ul className={styles.bullets}>
                  <li>Clearer user journeys and higher conversions</li>
                  <li>Better performance and faster page/app flow</li>
                  <li>Maintainable code and reusable UI patterns</li>
                  <li>Launch-ready quality with practical QA</li>
                </ul>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Suggested Stack</h2>
            <div className={styles.chips} aria-label="Suggested stack">
              {stack.map((label) => (
                <span key={label} className={styles.chip}>
                  {label}
                </span>
              ))}
            </div>

            <div className={styles.ctaCard}>
              <h3 className={styles.ctaCardTitle}>Plan a similar build</h3>
              <p className={styles.ctaCardText}>
                Tell us what you’re building (goal, timeline, must-have features). We’ll suggest the right structure and give you a clear estimate to move forward.
              </p>
              <div className={styles.actions}>
                <Link href="/contact" className={styles.primaryButton}>
                  Talk to Us
                </Link>
                <Link href="/work" className={styles.secondaryButton}>
                  Browse Live Projects
                </Link>
                <Link
                  href={study.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className={styles.secondaryButton}
                >
                  {study.ctaLabel}
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
