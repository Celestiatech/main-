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
  title: "Startup MVP Development Services",
  description: "Build your MVP in 60-90 days with our startup development services. Expert team, proven process, and 2,500+ successful launches. Get your product to market faster.",
  path: "/startup-mvp-development",
});

const faqs = [
  {
    question: "How long does it take to build an MVP?",
    answer: "Typically 60-90 days depending on complexity. We follow an agile process to get your MVP to market quickly while maintaining quality.",
  },
  {
    question: "What's included in MVP development?",
    answer: "Core features, basic UI/UX, backend infrastructure, testing, and deployment. We focus on essential functionality to validate your business idea quickly.",
  },
  {
    question: "How much does MVP development cost?",
    answer: "MVP costs vary based on features and complexity. Contact us for a free consultation and detailed quote tailored to your requirements.",
  },
  {
    question: "What technologies do you use for MVPs?",
    answer: "We use modern, scalable technologies like React, Next.js, Node.js, React Native, and cloud platforms (AWS, Vercel) to ensure your MVP can scale as you grow.",
  },
];

export default function StartupMVPDevelopmentPage() {
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
                <h1>Startup MVP Development Services</h1>
                <p>Launch your product in 60-90 days with our proven MVP development process</p>
                <div className={styles.heroActions}>
                  <Link href="/contact" className="btn btn-primary btn-lg">
                    Get Free Consultation
                  </Link>
                  <Link href="/pricing" className="btn btn-secondary btn-lg">
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Problem Statement */}
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>The Startup Challenge</h2>
                <p>Building an MVP is critical, but time and budget constraints make it challenging</p>
              </div>
              <div className={styles.problemGrid}>
                <div className={styles.problemCard}>
                  <h3>Time to Market</h3>
                  <p>Every day counts. Delayed launches mean missed opportunities and increased competition.</p>
                </div>
                <div className={styles.problemCard}>
                  <h3>Budget Constraints</h3>
                  <p>Limited resources require smart allocation. You need maximum value from every dollar.</p>
                </div>
                <div className={styles.problemCard}>
                  <h3>Technical Complexity</h3>
                  <p>Choosing the right tech stack and architecture is crucial for future scalability.</p>
                </div>
                <div className={styles.problemCard}>
                  <h3>Market Validation</h3>
                  <p>You need to test your idea quickly without overbuilding features users don't want.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Solution Approach */}
          <section className={styles.section} style={{ background: "var(--color-gray-50)" }}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>Our MVP Development Process</h2>
                <p>A proven methodology that gets you to market faster</p>
              </div>
              <div className={styles.processSteps}>
                <div className={styles.processStep}>
                  <div className={styles.processIcon}>
                    <Image src="/images/icons/idea.svg" alt="Discovery" width={60} height={60} />
                  </div>
                  <h3>Week 1-2: Discovery & Planning</h3>
                  <p>We understand your vision, define core features, and create a detailed roadmap.</p>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.processIcon}>
                    <Image src="/images/icons/concept.svg" alt="Design" width={60} height={60} />
                  </div>
                  <h3>Week 3-4: Design & Prototyping</h3>
                  <p>Create user flows, wireframes, and interactive prototypes for validation.</p>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.processIcon}>
                    <Image src="/images/icons/develop.svg" alt="Development" width={60} height={60} />
                  </div>
                  <h3>Week 5-10: Agile Development</h3>
                  <p>Build core features in 2-week sprints with regular demos and feedback loops.</p>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.processIcon}>
                    <Image src="/images/icons/launch.svg" alt="Launch" width={60} height={60} />
                  </div>
                  <h3>Week 11-12: Testing & Launch</h3>
                  <p>Quality assurance, beta testing, and deployment to production.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>Why Choose NexaVibe for Your MVP?</h2>
              </div>
              <div className={styles.benefitsGrid}>
                <div className={styles.benefitCard}>
                  <h3>60-90 Day Launch</h3>
                  <p>Proven process that gets your MVP to market in 2-3 months, not years.</p>
                </div>
                <div className={styles.benefitCard}>
                  <h3>Scalable Architecture</h3>
                  <p>Built to grow. Your MVP won't need a complete rebuild as you scale.</p>
                </div>
                <div className={styles.benefitCard}>
                  <h3>Expert Team</h3>
                  <p>200+ developers with experience building successful startups.</p>
                </div>
                <div className={styles.benefitCard}>
                  <h3>Fixed-Price Options</h3>
                  <p>Transparent pricing with no hidden costs. Know exactly what you're paying.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className={styles.section} style={{ background: "var(--color-gray-50)" }}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>MVP Development Pricing</h2>
                <p>Transparent pricing for startup MVPs</p>
              </div>
              <div className={styles.pricingGrid}>
                <div className={styles.pricingCard}>
                  <h3>Basic MVP</h3>
                  <div className={styles.pricingAmount}>$15,000 - $25,000</div>
                  <ul>
                    <li>Core features only</li>
                    <li>Basic UI/UX</li>
                    <li>Single platform (web or mobile)</li>
                    <li>60-day timeline</li>
                  </ul>
                  <Link href="/contact" className="btn btn-primary">Get Started</Link>
                </div>
                <div className={styles.pricingCard} style={{ border: "2px solid var(--color-primary)" }}>
                  <h3>Standard MVP</h3>
                  <div className={styles.pricingAmount}>$25,000 - $45,000</div>
                  <ul>
                    <li>Core + secondary features</li>
                    <li>Premium UI/UX design</li>
                    <li>Cross-platform (web + mobile)</li>
                    <li>75-day timeline</li>
                  </ul>
                  <Link href="/contact" className="btn btn-primary">Get Started</Link>
                </div>
                <div className={styles.pricingCard}>
                  <h3>Premium MVP</h3>
                  <div className={styles.pricingAmount}>$45,000+</div>
                  <ul>
                    <li>Full feature set</li>
                    <li>Enterprise-grade UI/UX</li>
                    <li>Multi-platform</li>
                    <li>90-day timeline</li>
                  </ul>
                  <Link href="/contact" className="btn btn-primary">Get Started</Link>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={styles.section}>
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
              <h2>Ready to Build Your MVP?</h2>
              <p>Let&apos;s discuss your startup idea and create a plan to get you to market in 60-90 days</p>
              <div className={styles.heroActions}>
                <Link href="/contact" className="btn btn-accent btn-lg">
                  Get Free Consultation
                </Link>
                <Link href="/proposal" className="btn btn-secondary btn-lg">
                  Request Proposal
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
