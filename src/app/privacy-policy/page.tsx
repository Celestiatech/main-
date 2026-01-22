import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | TechNova Solutions",
  description: "Read TechNova's Privacy Policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Privacy Policy</h1>
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
            <span className={styles.breadcrumbCurrent}>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* ===== PRIVACY CONTENT ===== */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="card">
              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                1. Introduction
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                Welcome to TechNova Solutions ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                2. Information We Collect
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>Fill out contact or inquiry forms on our website</li>
                <li style={{ marginBottom: "8px" }}>Request a consultation or quote for our services</li>
                <li style={{ marginBottom: "8px" }}>Subscribe to our newsletter or marketing communications</li>
                <li style={{ marginBottom: "8px" }}>Apply for a job or career opportunity</li>
                <li style={{ marginBottom: "8px" }}>Participate in surveys, contests, or promotions</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                3. Types of Information Collected
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                The personal information we may collect includes:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
                <li style={{ marginBottom: "8px" }}><strong>Professional Information:</strong> Job title, company details, business needs</li>
                <li style={{ marginBottom: "8px" }}><strong>Technical Information:</strong> IP address, browser type, operating system, referring URLs</li>
                <li style={{ marginBottom: "8px" }}><strong>Communication Preferences:</strong> Newsletter subscriptions, marketing preferences</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                4. How We Use Your Information
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                We use the information we collect to:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>Respond to your inquiries and provide customer support</li>
                <li style={{ marginBottom: "8px" }}>Send you relevant information about our services and solutions</li>
                <li style={{ marginBottom: "8px" }}>Process job applications and recruitment inquiries</li>
                <li style={{ marginBottom: "8px" }}>Improve our website, services, and user experience</li>
                <li style={{ marginBottom: "8px" }}>Comply with legal obligations and protect our rights</li>
                <li style={{ marginBottom: "8px" }}>Send promotional materials and marketing communications (with your consent)</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                5. Information Sharing and Disclosure
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}><strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist in our business operations</li>
                <li style={{ marginBottom: "8px" }}><strong>Legal Requirements:</strong> We may disclose information when required by law, court order, or government request</li>
                <li style={{ marginBottom: "8px" }}><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as a business asset</li>
                <li style={{ marginBottom: "8px" }}><strong>Consent:</strong> We may share information with your explicit consent</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                6. Data Security
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                7. Cookies and Tracking Technologies
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience. For more information about our cookie practices, please refer to our Cookie Policy.
              </p>
              <Link href="/cookie-policy" style={{ color: "var(--primary)", fontWeight: "500" }}>
                Read our Cookie Policy →
              </Link>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)", marginTop: "32px" }}>
                8. Your Rights
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>Right to access and receive a copy of your personal data</li>
                <li style={{ marginBottom: "8px" }}>Right to rectify inaccurate or incomplete data</li>
                <li style={{ marginBottom: "8px" }}>Right to request deletion of your personal data</li>
                <li style={{ marginBottom: "8px" }}>Right to object to or restrict processing</li>
                <li style={{ marginBottom: "8px" }}>Right to data portability</li>
                <li style={{ marginBottom: "8px" }}>Right to withdraw consent at any time</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                9. Third-Party Links
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                Our website may contain links to third-party websites, services, or applications. We are not responsible for the privacy practices or content of these third parties. We encourage you to review their privacy policies before providing any personal information.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                10. Children's Privacy
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                11. International Data Transfers
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We ensure appropriate safeguards are in place to protect your information in compliance with applicable data protection laws.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                12. Changes to This Policy
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy. We encourage you to review this Privacy Policy periodically.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                13. Contact Us
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div style={{ 
                background: "var(--bg-primary)", 
                padding: "24px", 
                borderRadius: "var(--radius-lg)",
                marginBottom: "24px"
              }}>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "12px" }}>
                  <strong>TechNova Solutions</strong>
                </p>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  📍 Dubai, UAE: Business Bay, Dubai
                </p>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  📍 India: Mohali, Punjab
                </p>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
                  📧 <Link href="mailto:privacy@technova.com" style={{ color: "var(--primary)" }}>privacy@technova.com</Link>
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
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerAbout}>
              <div className={styles.logo}>
                <div className={styles.logoIcon}>T</div>
                TechNova
              </div>
              <p>
                Premium IT development company delivering innovative solutions 
                in mobile apps, web development, AI, and blockchain technologies.
              </p>
              <div className={styles.footerSocial}>
                <a href="#">in</a>
                <a href="#">tw</a>
                <a href="#">fb</a>
                <a href="#">ig</a>
              </div>
            </div>
            <div className={styles.footerColumn}>
              <h4>Services</h4>
              <ul>
                <li><Link href="/services">Mobile Development</Link></li>
                <li><Link href="/services">Web Development</Link></li>
                <li><Link href="/services">Game Development</Link></li>
                <li><Link href="/services">AI Solutions</Link></li>
                <li><Link href="/services">Blockchain</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/career">Careers</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Blogs</h4>
              <ul>
                <li><Link href="/industries">Healthcare</Link></li>
                <li><Link href="/industries">Education</Link></li>
                <li><Link href="/industries">Finance</Link></li>
                <li><Link href="/industries">E-commerce</Link></li>
                <li><Link href="/industries">Real Estate</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Support</h4>
              <ul>
                <li><Link href="/help-center">Help Center</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service">Terms of Service</Link></li>
                <li><Link href="/sitemap">Sitemap</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2024 TechNova Solutions. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



