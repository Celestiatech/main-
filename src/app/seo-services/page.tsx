import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { siteConfig } from "@/lib/metadata";
import styles from "./seo-services.module.css";

/*
 * This route used to be redirect("/popular-tools"), which meant a page in the
 * main navigation and the sitemap had no H1, no content and no structured
 * data. It is a commercial keyword, so it now has a real page.
 */

const SERVICES = [
  {
    title: "Technical SEO",
    body: "Crawlability, indexing, canonical URLs, server-rendered content and site structure — the work that makes everything else eligible to rank.",
  },
  {
    title: "Core Web Vitals",
    body: "LCP, INP and CLS brought inside Google's thresholds and kept there, measured against real users rather than a lab test.",
  },
  {
    title: "On-page and content structure",
    body: "Titles, descriptions, heading hierarchy and internal linking that tell search engines what each page is actually for.",
  },
  {
    title: "Structured data",
    body: "Organization, Article, FAQ and LocalBusiness markup that matches the visible content, so rich results are earned rather than claimed.",
  },
  {
    title: "Answer engine optimisation",
    body: "Content structured so AI overviews and assistants can extract and cite it, not just rank it in a list of links.",
  },
  {
    title: "Migration and recovery SEO",
    body: "Replatforming without losing rankings, and diagnosing the traffic drop when a previous migration already did.",
  },
];

const PROCESS = [
  {
    step: "Audit",
    title: "Find what is actually broken",
    body: "A full technical crawl plus field performance data. You get a prioritised list, not a 200-page PDF nobody reads.",
  },
  {
    step: "Fix",
    title: "Implement, not just recommend",
    body: "We are a development team, so we ship the fixes ourselves rather than handing your developers a wishlist.",
  },
  {
    step: "Measure",
    title: "Track the metrics that matter",
    body: "Rankings, impressions and Core Web Vitals from Search Console and CrUX — real data, not a proprietary score.",
  },
];

const FAQ = [
  {
    question: "How long does SEO take to show results?",
    answer:
      "Technical fixes such as Core Web Vitals, indexing and structured data often show within two to six weeks. Ranking and content improvements typically take three to six months, because search engines need to recrawl and reassess the site.",
  },
  {
    question: "Do you guarantee first-page rankings?",
    answer:
      "No, and neither should anyone else. Nobody controls Google's index. What we do commit to is fixing the technical issues that keep pages from ranking, and reporting the actual metrics rather than a made-up score.",
  },
  {
    question: "What is the difference between technical SEO and content SEO?",
    answer:
      "Technical SEO makes content eligible to rank: crawlability, rendering, speed and structure. Content SEO decides whether it deserves to. Both matter, but technical problems cap what content can achieve, so they come first.",
  },
  {
    question: "Do you work on sites you did not build?",
    answer:
      "Yes. Most SEO work we do is on existing sites, often ones built by another agency. We start with a paid audit and tell you honestly whether fixing or rebuilding is better value.",
  },
];

export default function SEOServicesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Search engine optimisation",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: "Worldwide",
    description:
      "Technical SEO, Core Web Vitals, structured data and answer-engine optimisation delivered by a development team.",
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, serviceSchema]) }}
      />

      <Header />
      <div className={styles.headerGap} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <strong>SEO Services</strong>
          </nav>

          <p className={styles.eyebrow}>Search &amp; AI visibility</p>
          <h1>SEO Services From a Development Team</h1>
          <p className={styles.heroSub}>
            Most SEO problems are engineering problems. We fix the technical work that keeps good
            pages from ranking — then prove it with Search Console data rather than a proprietary score.
          </p>

          <div className={styles.trust}>
            <span>Fixes shipped, not just listed</span>
            <span>Real Search Console reporting</span>
            <span>No ranking guarantees</span>
          </div>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryBtn}>
              Get an SEO audit
            </Link>
            <Link href="/popular-tools/website-audit-tool" className={styles.secondaryBtn}>
              Run the free audit tool
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What we work on</h2>
          <div className={styles.grid}>
            {SERVICES.map((service) => (
              <article key={service.title} className={styles.card}>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How we work</h2>
          <div className={styles.steps}>
            {PROCESS.map((step) => (
              <article key={step.step} className={styles.step}>
                <span className={styles.stepBadge}>{step.step}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
          <div className={styles.faqGrid}>
            {FAQ.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Find out what is holding your site back</h2>
          <p>
            Run our free audit tool for an instant read, or talk to us for a full technical review with
            the fixes prioritised by impact.
          </p>
          <Link href="/contact" className={styles.primaryBtn}>
            Talk to W3Tech
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
