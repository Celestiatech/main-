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
  title: "Hire Dedicated Developers - Remote Development Team",
  description: "Hire dedicated developers for your project. Expert remote teams in React, Node.js, mobile development, AI, and blockchain. Flexible engagement models, 12+ years experience.",
  path: "/hire-dedicated-developers",
});

const faqs = [
  {
    question: "What is a dedicated development team?",
    answer: "A dedicated development team is a remote team of developers exclusively working on your project. They integrate with your workflow, follow your processes, and act as an extension of your in-house team.",
  },
  {
    question: "How do I hire dedicated developers?",
    answer: "Contact us with your requirements. We&apos;ll match you with the right developers, conduct interviews, and set up the team. You can start working within 1-2 weeks.",
  },
  {
    question: "What technologies do your developers specialize in?",
    answer: "Our developers specialize in React, Next.js, Node.js, Python, React Native, Flutter, iOS, Android, AI/ML, blockchain, cloud services (AWS, Azure, GCP), and more.",
  },
  {
    question: "Can I interview developers before hiring?",
    answer: "Yes, you can interview all developers before they join your team. We ensure you&apos;re comfortable with the team members and their skills match your requirements.",
  },
  {
    question: "What are the engagement models?",
    answer: "We offer full-time dedicated teams, part-time developers, hourly-based engagement, and project-based teams. Choose the model that best fits your needs and budget.",
  },
];

export default function HireDedicatedDevelopersPage() {
  return (
    <div className={styles.page}>
      <StructuredData data={getFAQSchema(faqs)} />
      <Header />

      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Hire Dedicated Developers</h1>
            <p>Build your remote development team with expert developers</p>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>The Challenge: Finding the Right Development Talent</h2>
            <p>Many businesses face these challenges when building development teams:</p>
          </div>
          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <h3>High Hiring Costs</h3>
              <p>Recruiting, onboarding, and retaining developers is expensive and time-consuming.</p>
            </div>
            <div className={styles.problemCard}>
              <h3>Skill Gaps</h3>
              <p>Finding developers with the right skills and experience for your specific tech stack.</p>
            </div>
            <div className={styles.problemCard}>
              <h3>Scaling Challenges</h3>
              <p>Rapidly scaling teams up or down based on project needs is difficult with in-house hiring.</p>
            </div>
            <div className={styles.problemCard}>
              <h3>Time to Productivity</h3>
              <p>New hires take weeks or months to become fully productive, delaying project timelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION SECTION ===== */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Dedicated Team Solution</h2>
            <p>Get a fully integrated remote development team in days, not months</p>
          </div>
          <div className={styles.solutionGrid}>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>👥</div>
              <h3>Pre-vetted Developers</h3>
              <p>All developers are pre-screened for technical skills, communication, and cultural fit. Interview and select the perfect team.</p>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>⚡</div>
              <h3>Fast Onboarding</h3>
              <p>Teams are ready to start within 1-2 weeks. We handle all setup, tools, and infrastructure so you can focus on building.</p>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>🔄</div>
              <h3>Flexible Scaling</h3>
              <p>Easily scale your team up or down based on project needs. Add or remove developers with minimal notice.</p>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>💼</div>
              <h3>Multiple Engagement Models</h3>
              <p>Choose from full-time, part-time, hourly, or project-based engagement models that fit your budget and requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM COMPOSITION SECTION ===== */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Team Composition</h2>
            <p>Build the perfect team for your project</p>
          </div>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <h3>Frontend Developers</h3>
              <p>React, Next.js, Vue.js, Angular experts</p>
              <ul>
                <li>UI/UX implementation</li>
                <li>Responsive design</li>
                <li>Performance optimization</li>
              </ul>
            </div>
            <div className={styles.teamCard}>
              <h3>Backend Developers</h3>
              <p>Node.js, Python, Java, .NET specialists</p>
              <ul>
                <li>API development</li>
                <li>Database design</li>
                <li>Cloud infrastructure</li>
              </ul>
            </div>
            <div className={styles.teamCard}>
              <h3>Mobile Developers</h3>
              <p>iOS, Android, React Native, Flutter</p>
              <ul>
                <li>Native app development</li>
                <li>Cross-platform solutions</li>
                <li>App store deployment</li>
              </ul>
            </div>
            <div className={styles.teamCard}>
              <h3>Full-Stack Developers</h3>
              <p>End-to-end development expertise</p>
              <ul>
                <li>Full application stack</li>
                <li>DevOps integration</li>
                <li>System architecture</li>
              </ul>
            </div>
            <div className={styles.teamCard}>
              <h3>Specialized Developers</h3>
              <p>AI/ML, Blockchain, DevOps engineers</p>
              <ul>
                <li>Domain expertise</li>
                <li>Advanced technologies</li>
                <li>Industry best practices</li>
              </ul>
            </div>
            <div className={styles.teamCard}>
              <h3>QA Engineers</h3>
              <p>Testing and quality assurance</p>
              <ul>
                <li>Automated testing</li>
                <li>Manual testing</li>
                <li>Performance testing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Pricing Models</h2>
            <p>Choose the engagement model that works for you</p>
          </div>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3>Full-Time Dedicated</h3>
              <div className={styles.pricingAmount}>$3,000 - $8,000/month</div>
              <p>Per developer</p>
              <ul>
                <li>40 hours/week commitment</li>
                <li>Dedicated to your project</li>
                <li>Long-term engagement</li>
                <li>Best for ongoing projects</li>
              </ul>
            </div>
            <div className={styles.pricingCard}>
              <h3>Part-Time Dedicated</h3>
              <div className={styles.pricingAmount}>$1,500 - $4,000/month</div>
              <p>Per developer (20 hrs/week)</p>
              <ul>
                <li>20 hours/week commitment</li>
                <li>Flexible scheduling</li>
                <li>Cost-effective option</li>
                <li>Ideal for smaller projects</li>
              </ul>
            </div>
            <div className={styles.pricingCard}>
              <h3>Hourly Rate</h3>
              <div className={styles.pricingAmount}>$25 - $75/hour</div>
              <p>Based on experience</p>
              <ul>
                <li>Pay only for hours worked</li>
                <li>Maximum flexibility</li>
                <li>No minimum commitment</li>
                <li>Perfect for variable workloads</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
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

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Ready to Build Your Development Team?</h2>
          <p>Get started with dedicated developers in 1-2 weeks</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className="btn btn-primary">
              Hire Developers Now
            </Link>
            <Link href="/proposal" className="btn btn-secondary">
              Get Team Proposal
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
