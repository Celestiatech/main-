import type { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import styles from "../page.module.css";

export const metadata: Metadata = genMeta({
  title: "Accessibility Statement",
  description: "NexaVibe Solutions is committed to ensuring digital accessibility for people with disabilities. Learn about our accessibility efforts and how to report issues.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <section className={styles.pageHero}>
          <div className="container">
            <div className={styles.pageHeroContent}>
              <h1>Accessibility Statement</h1>
              <p>Our commitment to digital accessibility</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <div className="card">
                <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                  Commitment to Accessibility
                </h2>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                  NexaVibe Solutions is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to achieve WCAG 2.1 Level AA compliance.
                </p>

                <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                  Conformance Status
                </h2>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                  The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
                </p>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                  NexaVibe Solutions is partially conformant with WCAG 2.1 Level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
                </p>

                <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                  Accessibility Features
                </h2>
                <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Keyboard navigation support for all interactive elements</li>
                  <li style={{ marginBottom: "8px" }}>ARIA labels and roles for screen readers</li>
                  <li style={{ marginBottom: "8px" }}>Alt text for all images</li>
                  <li style={{ marginBottom: "8px" }}>Proper heading hierarchy (H1-H6)</li>
                  <li style={{ marginBottom: "8px" }}>Color contrast ratios meeting WCAG 2.1 AA standards</li>
                  <li style={{ marginBottom: "8px" }}>Focus indicators on all interactive elements</li>
                  <li style={{ marginBottom: "8px" }}>Support for reduced motion preferences</li>
                  <li style={{ marginBottom: "8px" }}>Skip to main content link</li>
                </ul>

                <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                  Known Issues
                </h2>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                  We are aware that some parts of our website may not be fully accessible. We are actively working to address these issues and improve our accessibility compliance.
                </p>

                <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                  Feedback
                </h2>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                  We welcome your feedback on the accessibility of NexaVibe Solutions website. If you encounter accessibility barriers, please contact us:
                </p>
                <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Email: <a href="mailto:accessibility@nexavibe.com" style={{ color: "var(--color-primary)" }}>accessibility@nexavibe.com</a></li>
                  <li style={{ marginBottom: "8px" }}>Phone: +971 50 000 0000 (UAE) or +91 98765 43210 (India)</li>
                  <li style={{ marginBottom: "8px" }}>Postal Address: Business Bay, Dubai, UAE</li>
                </ul>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                  We aim to respond to accessibility feedback within 5 business days.
                </p>

                <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                  Assessment Approach
                </h2>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                  NexaVibe Solutions assessed the accessibility of this website through self-evaluation and automated testing tools. This statement was created on January 25, 2026, and will be reviewed and updated regularly.
                </p>

                <div style={{ marginTop: "32px", padding: "20px", background: "var(--color-gray-50)", borderRadius: "12px" }}>
                  <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--text-primary)" }}>Last Updated</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>January 25, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
