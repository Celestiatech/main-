import type { Metadata } from \"quot;next\"quot;;
import Link from \"quot;next/link\"quot;;
import \"quot;../globals.css\"quot;;
import styles from \"quot;../page.module.css\"quot;;

export const metadata: Metadata = {
  title: \"quot;Privacy Policy | TechNova Solutions\"quot;,
  description: \"quot;Read TechNova's Privacy Policy to understand how we collect, use, and protect your personal information.\"quot;,
};

export default function PrivacyPolicy() {
  return (
    <div className=\"quot;page\"quot;>
      {/* ===== PAGE HERO ===== */}
      <section className=\"quot;pageHero\"quot;>
        <div className=\"quot;container\"quot;>
          <div className=\"quot;pageHeroContent\"quot;>
            <h1>Privacy Policy</h1>
            <p>Last updated: January 2024</p>
          </div>
        </div>
      </section>

      {/* ===== BREADCRUMBS ===== */}
      <div className=\"quot;breadcrumb\"quot;>
        <div className=\"quot;container\"quot;>
          <div className=\"quot;breadcrumbContent\"quot;>
            <Link href=\"quot;/\"quot; className=\"quot;breadcrumbLink\"quot;>Home</Link>
            <span className=\"quot;breadcrumbSeparator\"quot;>›</span>
            <span className=\"quot;breadcrumbCurrent\"quot;>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* ===== PRIVACY CONTENT ===== */}
      <section className=\"quot;section\"quot;>
        <div className=\"quot;container\"quot;>
          <div style={{ maxWidth: \"quot;800px\"quot;, margin: \"quot;0 auto\"quot; }}>
            <div className=\"quot;card\"quot;>
              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                1. Introduction
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Welcome to TechNova Solutions (\"quot;we,\"quot; \"quot;our,\"quot; or \"quot;us\"quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                2. Information We Collect
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Fill out contact or inquiry forms on our website</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Request a consultation or quote for our services</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Subscribe to our newsletter or marketing communications</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Apply for a job or career opportunity</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Participate in surveys, contests, or promotions</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                3. Types of Information Collected
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                The personal information we may collect includes:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Professional Information:</strong> Job title, company details, business needs</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Technical Information:</strong> IP address, browser type, operating system, referring URLs</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Communication Preferences:</strong> Newsletter subscriptions, marketing preferences</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                4. How We Use Your Information
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                We use the information we collect to:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Respond to your inquiries and provide customer support</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Send you relevant information about our services and solutions</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Process job applications and recruitment inquiries</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Improve our website, services, and user experience</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Comply with legal obligations and protect our rights</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Send promotional materials and marketing communications (with your consent)</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                5. Information Sharing and Disclosure
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist in our business operations</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Legal Requirements:</strong> We may disclose information when required by law, court order, or government request</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as a business asset</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Consent:</strong> We may share information with your explicit consent</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                6. Data Security
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                7. Cookies and Tracking Technologies
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience. For more information about our cookie practices, please refer to our Cookie Policy.
              </p>
              <Link href=\"quot;/cookie-policy\"quot; style={{ color: \"quot;var(--primary)\"quot;, fontWeight: \"quot;500\"quot; }}>
                Read our Cookie Policy →
              </Link>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot;, marginTop: \"quot;32px\"quot; }}>
                8. Your Rights
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Right to access and receive a copy of your personal data</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Right to rectify inaccurate or incomplete data</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Right to request deletion of your personal data</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Right to object to or restrict processing</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Right to data portability</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Right to withdraw consent at any time</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                9. Third-Party Links
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Our website may contain links to third-party websites, services, or applications. We are not responsible for the privacy practices or content of these third parties. We encourage you to review their privacy policies before providing any personal information.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                10. Children's Privacy
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                11. International Data Transfers
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We ensure appropriate safeguards are in place to protect your information in compliance with applicable data protection laws.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                12. Changes to This Policy
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the \"quot;Last updated\"quot; date at the top of this policy. We encourage you to review this Privacy Policy periodically.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                13. Contact Us
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div style={{ 
                background: \"quot;var(--bg-primary)\"quot;, 
                padding: \"quot;24px\"quot;, 
                borderRadius: \"quot;var(--radius-lg)\"quot;,
                marginBottom: \"quot;24px\"quot;
              }}>
                <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;12px\"quot; }}>
                  <strong>TechNova Solutions</strong>
                </p>
                <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;8px\"quot; }}>
                  📍 Dubai, UAE: Business Bay, Dubai
                </p>
                <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;8px\"quot; }}>
                  📍 India: Mohali, Punjab
                </p>
                <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot; }}>
                  📧 <Link href=\"quot;mailto:privacy@technova.com\"quot; style={{ color: \"quot;var(--primary)\"quot; }}>privacy@technova.com</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className=\"quot;container\"quot;>
          <h2>Ready to Work Together?</h2>
          <p>Let's discuss your project and turn your vision into reality</p>
          <Link href=\"quot;/proposal\"quot; className=\"quot;btn btn-accent\"quot;>
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className=\"quot;container\"quot;>
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
                <a href=\"quot;#\"quot;>in</a>
                <a href=\"quot;#\"quot;>tw</a>
                <a href=\"quot;#\"quot;>fb</a>
                <a href=\"quot;#\"quot;>ig</a>
              </div>
            </div>
            <div className={styles.footerColumn}>
              <h4>Services</h4>
              <ul>
                <li><Link href=\"quot;/services\"quot;>Mobile Development</Link></li>
                <li><Link href=\"quot;/services\"quot;>Web Development</Link></li>
                <li><Link href=\"quot;/services\"quot;>Game Development</Link></li>
                <li><Link href=\"quot;/services\"quot;>AI Solutions</Link></li>
                <li><Link href=\"quot;/services\"quot;>Blockchain</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <ul>
                <li><Link href=\"quot;/about\"quot;>About Us</Link></li>
                <li><Link href=\"quot;/career\"quot;>Careers</Link></li>
                <li><Link href=\"quot;/blog\"quot;>Blog</Link></li>
                <li><Link href=\"quot;/contact\"quot;>Contact</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Blogs</h4>
              <ul>
                <li><Link href=\"quot;/industries\"quot;>Healthcare</Link></li>
                <li><Link href=\"quot;/industries\"quot;>Education</Link></li>
                <li><Link href=\"quot;/industries\"quot;>Finance</Link></li>
                <li><Link href=\"quot;/industries\"quot;>E-commerce</Link></li>
                <li><Link href=\"quot;/industries\"quot;>Real Estate</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Support</h4>
              <ul>
                <li><Link href=\"quot;/help-center\"quot;>Help Center</Link></li>
                <li><Link href=\"quot;/privacy-policy\"quot;>Privacy Policy</Link></li>
                <li><Link href=\"quot;/terms-of-service\"quot;>Terms of Service</Link></li>
                <li><Link href=\"quot;/sitemap\"quot;>Sitemap</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2024 TechNova Solutions. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <Link href=\"quot;/privacy-policy\"quot;>Privacy Policy</Link>
              <Link href=\"quot;/terms-of-service\"quot;>Terms of Service</Link>
              <Link href=\"quot;/cookie-policy\"quot;>Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



