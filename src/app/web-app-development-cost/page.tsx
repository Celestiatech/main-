import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { getFAQSchema } from "@/lib/structured-data";
import styles from "../page.module.css";

export const metadata: Metadata = genMeta({
  title: "Web App Development Cost - Pricing Guide 2024",
  description: "Complete guide to web app development costs. Learn pricing factors, get cost estimates for different project types, and understand what affects development pricing.",
  path: "/web-app-development-cost",
});

const faqs = [
  {
    question: "How much does web app development cost?",
    answer: "Web app development costs range from $15,000 for simple apps to $100,000+ for complex enterprise solutions. Factors include features, complexity, design requirements, and timeline.",
  },
  {
    question: "What factors affect web app development cost?",
    answer: "Key factors include: number of features, design complexity, third-party integrations, user authentication, payment processing, real-time features, and scalability requirements.",
  },
  {
    question: "Is it cheaper to build a web app or mobile app?",
    answer: "Web apps are typically more cost-effective as they work across platforms. Mobile apps require separate iOS and Android development, increasing costs by 30-50%.",
  },
  {
    question: "Can I get a fixed-price quote?",
    answer: "Yes, we offer fixed-price quotes for well-defined projects. After understanding your requirements, we provide a detailed breakdown with no hidden costs.",
  },
];

export default function WebAppDevelopmentCostPage() {
  return (
    <>
      <StructuredData data={getFAQSchema(faqs)} />
      <div className={styles.page}>
        <Header />
        
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.pageHero}>
            <div className="container">
              <div className={styles.pageHeroContent}>
                <h1>Web App Development Cost Guide</h1>
                <p>Understand web app development pricing and get accurate cost estimates for your project</p>
                <div className={styles.heroActions}>
                  <Link href="/contact" className="btn btn-primary btn-lg">
                    Get Free Quote
                  </Link>
                  <Link href="/pricing" className="btn btn-secondary btn-lg">
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Factors */}
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>What Affects Web App Development Cost?</h2>
                <p>Understanding the factors that determine your project cost</p>
              </div>
              <div className={styles.problemGrid}>
                <div className={styles.problemCard}>
                  <h3>Project Complexity</h3>
                  <p>Simple apps with basic features cost less. Complex apps with advanced functionality, integrations, and custom logic cost more.</p>
                </div>
                <div className={styles.problemCard}>
                  <h3>Design Requirements</h3>
                  <p>Custom UI/UX design, animations, and premium visuals increase costs. Template-based designs are more affordable.</p>
                </div>
                <div className={styles.problemCard}>
                  <h3>Third-Party Integrations</h3>
                  <p>Payment gateways, APIs, analytics, and other integrations add development time and cost.</p>
                </div>
                <div className={styles.problemCard}>
                  <h3>Timeline</h3>
                  <p>Rush projects require more resources and cost 20-30% more. Standard timelines offer better value.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Examples */}
          <section className={styles.section} style={{ background: "var(--color-gray-50)" }}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>Web App Development Cost Estimates</h2>
                <p>Typical pricing ranges for different project types</p>
              </div>
              <div className={styles.pricingGrid}>
                <div className={styles.pricingCard}>
                  <h3>Simple Web App</h3>
                  <div className={styles.pricingAmount}>$15,000 - $30,000</div>
                  <ul>
                    <li>Basic features (5-10 pages)</li>
                    <li>Simple UI/UX</li>
                    <li>Standard authentication</li>
                    <li>Basic database</li>
                    <li>2-3 months timeline</li>
                  </ul>
                  <Link href="/contact" className="btn btn-primary">Get Quote</Link>
                </div>
                <div className={styles.pricingCard} style={{ border: "2px solid var(--color-primary)" }}>
                  <h3>Medium Complexity</h3>
                  <div className={styles.pricingAmount}>$30,000 - $60,000</div>
                  <ul>
                    <li>Advanced features (15-25 pages)</li>
                    <li>Custom UI/UX design</li>
                    <li>Payment integration</li>
                    <li>Admin dashboard</li>
                    <li>3-5 months timeline</li>
                  </ul>
                  <Link href="/contact" className="btn btn-primary">Get Quote</Link>
                </div>
                <div className={styles.pricingCard}>
                  <h3>Complex Web App</h3>
                  <div className={styles.pricingAmount}>$60,000 - $150,000+</div>
                  <ul>
                    <li>Enterprise features</li>
                    <li>Premium design</li>
                    <li>Multiple integrations</li>
                    <li>Real-time features</li>
                    <li>6-12 months timeline</li>
                  </ul>
                  <Link href="/contact" className="btn btn-primary">Get Quote</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Breakdown */}
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>Typical Cost Breakdown</h2>
                <p>How your budget is allocated across different phases</p>
              </div>
              <div className={styles.benefitsGrid}>
                <div className={styles.benefitCard}>
                  <h3>Planning & Design (15-20%)</h3>
                  <p>Requirements analysis, wireframing, UI/UX design, and project planning.</p>
                </div>
                <div className={styles.benefitCard}>
                  <h3>Development (50-60%)</h3>
                  <p>Frontend and backend development, database setup, and feature implementation.</p>
                </div>
                <div className={styles.benefitCard}>
                  <h3>Testing & QA (10-15%)</h3>
                  <p>Quality assurance, bug fixing, performance testing, and security audits.</p>
                </div>
                <div className={styles.benefitCard}>
                  <h3>Deployment & Support (10-15%)</h3>
                  <p>Deployment, hosting setup, documentation, and initial support.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={styles.section} style={{ background: "var(--color-gray-50)" }}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className={styles.faqGrid}>
                {faqs.map((faq, index) => (
                  <div key={index} className={styles.faqCard}>
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.cta}>
            <div className="container">
              <h2>Get an Accurate Cost Estimate</h2>
              <p>Share your project requirements and get a detailed, transparent quote with no hidden costs</p>
              <div className={styles.heroActions}>
                <Link href="/contact" className="btn btn-accent btn-lg">
                  Get Free Quote
                </Link>
                <Link href="/proposal" className="btn btn-secondary btn-lg">
                  Request Detailed Proposal
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
