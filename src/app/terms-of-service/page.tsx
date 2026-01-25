"use client";

import Link from "next/link";
import "../globals.css";
import styles from "../page.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function TermsOfService() {
  return (
    <div className={styles.page}>
      <Header />
      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Terms of Service</h1>
            <p>Last updated: January 2024</p>
          </div>
        </div>
      </section>

      {/* ===== BREADCRUMBS ===== */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <div className={styles.breadcrumbContent}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>›</span>
            <span className={styles.breadcrumbCurrent}>Terms of Service</span>
          </div>
        </div>
      </div>

      {/* ===== TERMS CONTENT ===== */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="card">
              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                1. Acceptance of Terms
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this website. NexaVibe Solutions reserves the right to change these terms from time to time without notice.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                2. Use of Services
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                Our services are intended for business purposes. By using our services, you agree to:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>Provide accurate and complete information when requesting our services</li>
                <li style={{ marginBottom: "8px" }}>Use our services only for lawful purposes and in accordance with these terms</li>
                <li style={{ marginBottom: "8px" }}>Not attempt to gain unauthorized access to any part of our website or systems</li>
                <li style={{ marginBottom: "8px" }}>Not use our services in any way that could damage, disable, or impair our website</li>
                <li style={{ marginBottom: "8px" }}>Respect the intellectual property rights of NexaVibe Solutions and third parties</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                3. Intellectual Property Rights
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                The content, features, and functionality of this website, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by NexaVibe Solutions or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from this website without our prior written consent. You may print copies of materials for personal, non-commercial use only.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                4. Service Agreements
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                Any agreement for our development services shall be governed by separate terms and conditions outlined in the respective service agreement or contract. These general terms of service apply to your use of the website.
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>All quotes and proposals are valid for 30 days from the date of issuance</li>
                <li style={{ marginBottom: "8px" }}>Project timelines are estimates and may be subject to change based on requirements</li>
                <li style={{ marginBottom: "8px" }}>Payment terms will be specified in individual project agreements</li>
                <li style={{ marginBottom: "8px" }}>Additional work outside the scope of an agreement will require a change order</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                5. Confidentiality
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                Both parties agree to maintain the confidentiality of any proprietary information exchanged during the course of business. This includes but is not limited to business plans, technical data, source code, trade secrets, and other confidential information. Confidentiality obligations shall survive the termination of any business relationship.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                6. Limitation of Liability
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                To the maximum extent permitted by applicable law, NexaVibe Solutions shall not be liable for:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li style={{ marginBottom: "8px" }}>Loss of profits, revenue, data, or business opportunities</li>
                <li style={{ marginBottom: "8px" }}>Service interruptions or technical failures</li>
                <li style={{ marginBottom: "8px" }}>Any actions of third parties</li>
              </ul>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                Our total liability shall not exceed the amount paid by you for the services in the twelve months preceding the claim.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                7. Warranties and Disclaimers
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                <strong>Our Warranty:</strong> We warrant that our services will be performed in a professional manner consistent with industry standards. If you are not satisfied with our work, we will make reasonable efforts to address your concerns.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                <strong>Disclaimer:</strong> The website and its content are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, timely, secure, or error-free.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                8. Indemnification
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                You agree to indemnify, defend, and hold harmless NexaVibe Solutions, its officers, directors, employees, and agents from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of our services or your breach of these Terms of Service.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                9. Termination
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason including:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>Breach of these Terms of Service</li>
                <li style={{ marginBottom: "8px" }}>Violating applicable laws or regulations</li>
                <li style={{ marginBottom: "8px" }}>Engaging in fraudulent or illegal activities</li>
                <li style={{ marginBottom: "8px" }}>Non-payment for services rendered</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                10. Third-Party Links
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                Our website may contain links to third-party websites, services, or resources that are not owned or controlled by NexaVibe Solutions. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that NexaVibe Solutions shall not be responsible or liable for any damage or loss caused by or in connection with your use of any third-party content.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                11. Governing Law and Jurisdiction
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                Any disputes arising out of or relating to these terms or our services shall be subject to the exclusive jurisdiction of the courts in Dubai, UAE, or Mohali, India, depending on the applicable circumstances and mutual agreement.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                12. Dispute Resolution
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                In the event of any dispute, controversy, or claim arising out of or relating to these Terms or the breach, termination, or invalidity thereof, the parties agree to:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>First attempt to resolve the dispute through good-faith negotiations</li>
                <li style={{ marginBottom: "8px" }}>If negotiation fails, consider mediation before pursuing litigation</li>
                <li style={{ marginBottom: "8px" }}>Pursue binding arbitration if required by applicable law or agreement</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                13. Force Majeure
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                NexaVibe Solutions shall not be liable for any failure or delay in performing our obligations under these Terms if such failure or delay results from circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                14. Communications
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                By using our services, you agree to receive electronic communications from us, including:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>Email responses to your inquiries</li>
                <li style={{ marginBottom: "8px" }}>Project-related communications and updates</li>
                <li style={{ marginBottom: "8px" }}>Marketing communications (with your consent)</li>
              </ul>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                You may opt out of marketing communications at any time by clicking the unsubscribe link or contacting us directly.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                15. Changes to These Terms
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                We reserve the right to modify, amend, or replace these Terms at any time. If a revision is material, we will provide notice prior to any new terms taking effect. Your continued use of our services after such changes constitutes acceptance of the new Terms.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                16. Severability
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving its original intent.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                17. Contact Information
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div style={{ 
                background: "var(--bg-primary)", 
                padding: "24px", 
                borderRadius: "var(--radius-lg)",
                marginBottom: "24px"
              }}>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "12px" }}>
                  <strong>NexaVibe Solutions</strong>
                </p>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  📍 Dubai, UAE: Business Bay, Dubai
                </p>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  📍 India: Mohali, Punjab
                </p>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
                  📧 <Link href="mailto:legal@nexavibe.com" style={{ color: "var(--primary)" }}>legal@nexavibe.com</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Ready to Work Together?</h2>
          <p>Let's discuss your project and turn your vision into reality</p>
          <Link href="/proposal" className="btn btn-accent">
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}


