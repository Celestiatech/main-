
"use client";

import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MultiStepForm } from "../components/MultiStepForm";

export default function ProposalPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Get a Proposal" },
  ];

  const handleFormSubmit = (data: any) => {
    // Handle form submission
    alert("Thank you! We&apos;ll send your proposal request within 24 hours.");
  };

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      {/* ===== PAGE HERO ===== */}

      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Request a Free Proposal</h1>
            <p>Tell us about your project and receive a detailed proposal within 24 hours</p>
          </div>
        </div>
      </section>

      {/* ===== PROPOSAL SECTION ===== */}
      <section className={styles.proposalSection}>
        <div className="container">
          <div className={styles.proposalContent}>
            <div className={styles.proposalInfo}>
              <h2>Let&apos;s Build Something Amazing</h2>
              <p>
                At NexaVibe, we believe every project deserves a tailored approach. 
                Share your vision with us, and we&apos;ll create a comprehensive proposal 
                that addresses your unique requirements and goals.
              </p>
              <p>
                Our team of experts will analyze your needs and provide you with:
              </p>
              <div className={styles.proposalBenefits}>
                <h3>What&apos;s Included</h3>
                <ul>
                  <li>Detailed project scope and requirements analysis</li>
                  <li>Technical architecture and technology recommendations</li>
                  <li>Project timeline and milestones breakdown</li>
                  <li>Transparent pricing with milestone-based payments</li>
                  <li>Resource allocation and team composition</li>
                  <li>Risk assessment and mitigation strategies</li>
                </ul>
              </div>
            </div>
            <MultiStepForm onSubmit={handleFormSubmit} showTrustReinforcements={true} />
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Prefer to Discuss First?</h2>
          <p>Schedule a free 30-minute consultation call</p>
          <Link href="/request-a-call" className="btn btn-accent">
            Schedule a Call
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}

