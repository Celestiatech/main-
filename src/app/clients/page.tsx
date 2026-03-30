
"use client";

import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function ClientsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "For Clients" },
  ];

  const resources = [
    {
      icon: "📧",
      title: "Client Portal",
      description: "Access your project dashboard, documents, and reports",
      link: "#",
    },
    {
      icon: "📊",
      title: "Project Updates",
      description: "View progress reports and milestone completions",
      link: "#",
    },
    {
      icon: "💬",
      title: "Support Ticket",
      description: "Submit and track support requests",
      link: "#",
    },
    {
      icon: "📅",
      title: "Book a Meeting",
      description: "Schedule calls with your project manager",
      link: "#",
    },
  ];

  const faqs = [
    {
      question: "How do I access my project dashboard?",
      answer: "You should have received login credentials via email. Use those credentials to access your personalized project dashboard.",
    },
    {
      question: "How can I request changes to my project?",
      answer: "Submit a change request through your client portal or directly email your project manager with details of the changes needed.",
    },
    {
      question: "What is the typical response time for support?",
      answer: "For critical issues, we respond within 2 hours. General inquiries are typically addressed within 24 business hours.",
    },
    {
      question: "How do I download project deliverables?",
      answer: "All completed deliverables are available in the 'Deliverables' section of your client portal.",
    },
  ];

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <Header />

      <Breadcrumb items={breadcrumbItems} />

      {/* ===== PAGE HERO ===== */}

      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Client Portal</h1>
            <p>Access resources, track progress, and manage your project</p>
          </div>
        </div>
      </section>

      {/* ===== RESOURCES SECTION ===== */}
      <section className={styles.services}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Quick Access</h2>
            <p>Everything you need to manage your project efficiently</p>
          </div>
          <div className={styles.whyGrid}>
            {resources.map((resource, index) => (
              <a key={index} href={resource.link} className={styles.whyCard}>
                <div className={styles.whyIcon}>{resource.icon}</div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common client questions</p>
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

      {/* ===== CONTACT CTA ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Need Immediate Assistance?</h2>
          <p>Our support team is here to help</p>
          <Link href="/contact" className="btn btn-accent">
            Contact Support
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
