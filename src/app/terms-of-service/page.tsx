import type { Metadata } from \"quot;next\"quot;;
import Link from \"quot;next/link\"quot;;
import { useState } from \"quot;react\"quot;;
import Image from \"quot;next/image\"quot;;
import \"quot;../globals.css\"quot;;
import styles from \"quot;../page.module.css\"quot;;

const styles = {
  cta: \"quot;cta\"quot;,
  footer: \"quot;footer\"quot;,
  footerGrid: \"quot;footerGrid\"quot;,
  footerAbout: \"quot;footerAbout\"quot;,
  logo: \"quot;logo\"quot;,
  logoIcon: \"quot;logoIcon\"quot;,
  footerSocial: \"quot;footerSocial\"quot;,
  footerColumn: \"quot;footerColumn\"quot;,
  footerBottom: \"quot;footerBottom\"quot;,
  footerLegal: \"quot;footerLegal\"quot;,
};

export const metadata: Metadata = {
  title: \"quot;Terms of Service | TechNova Solutions\"quot;,
  description: \"quot;Review TechNova's Terms of Service governing the use of our website and services.\"quot;,
};

export default function TermsOfService() {
  return (
    <div className=\"quot;page\"quot;>
      {/* ===== PAGE HERO ===== */}
      <section className=\"quot;pageHero\"quot;>
        <div className=\"quot;container\"quot;>
          <div className=\"quot;pageHeroContent\"quot;>
            <h1>Terms of Service</h1>
            <p>Last updated: January 2024</p>
          </div>
        </div>
      </section>

      {/* ===== BREADCRUMBS ===== */}
      <div className={styles.breadcrumb}>
        <div className=\"quot;container\"quot;>
          <div className={styles.breadcrumbContent}>
            <Link href=\"quot;/\"quot; className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>›</span>
            <span className={styles.breadcrumbCurrent}>Terms of Service</span>
          </div>
        </div>
      </div>

      {/* ===== TERMS CONTENT ===== */}
      <section className=\"quot;section\"quot;>
        <div className=\"quot;container\"quot;>
          <div style={{ maxWidth: \"quot;800px\"quot;, margin: \"quot;0 auto\"quot; }}>
            <div className=\"quot;card\"quot;>
              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                1. Acceptance of Terms
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this website. TechNova Solutions reserves the right to change these terms from time to time without notice.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                2. Use of Services
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Our services are intended for business purposes. By using our services, you agree to:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Provide accurate and complete information when requesting our services</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Use our services only for lawful purposes and in accordance with these terms</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Not attempt to gain unauthorized access to any part of our website or systems</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Not use our services in any way that could damage, disable, or impair our website</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Respect the intellectual property rights of TechNova Solutions and third parties</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                3. Intellectual Property Rights
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                The content, features, and functionality of this website, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by TechNova Solutions or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from this website without our prior written consent. You may print copies of materials for personal, non-commercial use only.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                4. Service Agreements
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Any agreement for our development services shall be governed by separate terms and conditions outlined in the respective service agreement or contract. These general terms of service apply to your use of the website.
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>All quotes and proposals are valid for 30 days from the date of issuance</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Project timelines are estimates and may be subject to change based on requirements</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Payment terms will be specified in individual project agreements</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Additional work outside the scope of an agreement will require a change order</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                5. Confidentiality
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Both parties agree to maintain the confidentiality of any proprietary information exchanged during the course of business. This includes but is not limited to business plans, technical data, source code, trade secrets, and other confidential information. Confidentiality obligations shall survive the termination of any business relationship.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                6. Limitation of Liability
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                To the maximum extent permitted by applicable law, TechNova Solutions shall not be liable for:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Loss of profits, revenue, data, or business opportunities</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Service interruptions or technical failures</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Any actions of third parties</li>
              </ul>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Our total liability shall not exceed the amount paid by you for the services in the twelve months preceding the claim.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                7. Warranties and Disclaimers
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                <strong>Our Warranty:</strong> We warrant that our services will be performed in a professional manner consistent with industry standards. If you are not satisfied with our work, we will make reasonable efforts to address your concerns.
              </p>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                <strong>Disclaimer:</strong> The website and its content are provided \"quot;as is\"quot; and \"quot;as available\"quot; without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, timely, secure, or error-free.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                8. Indemnification
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                You agree to indemnify, defend, and hold harmless TechNova Solutions, its officers, directors, employees, and agents from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of our services or your breach of these Terms of Service.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                9. Termination
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason including:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Breach of these Terms of Service</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Violating applicable laws or regulations</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Engaging in fraudulent or illegal activities</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Non-payment for services rendered</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                10. Third-Party Links
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Our website may contain links to third-party websites, services, or resources that are not owned or controlled by TechNova Solutions. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that TechNova Solutions shall not be responsible or liable for any damage or loss caused by or in connection with your use of any third-party content.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                11. Governing Law and Jurisdiction
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Any disputes arising out of or relating to these terms or our services shall be subject to the exclusive jurisdiction of the courts in Dubai, UAE, or Mohali, India, depending on the applicable circumstances and mutual agreement.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                12. Dispute Resolution
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                In the event of any dispute, controversy, or claim arising out of or relating to these Terms or the breach, termination, or invalidity thereof, the parties agree to:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>First attempt to resolve the dispute through good-faith negotiations</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>If negotiation fails, consider mediation before pursuing litigation</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Pursue binding arbitration if required by applicable law or agreement</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                13. Force Majeure
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                TechNova Solutions shall not be liable for any failure or delay in performing our obligations under these Terms if such failure or delay results from circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                14. Communications
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                By using our services, you agree to receive electronic communications from us, including:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Email responses to your inquiries</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Project-related communications and updates</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Marketing communications (with your consent)</li>
              </ul>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                You may opt out of marketing communications at any time by clicking the unsubscribe link or contacting us directly.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                15. Changes to These Terms
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                We reserve the right to modify, amend, or replace these Terms at any time. If a revision is material, we will provide notice prior to any new terms taking effect. Your continued use of our services after such changes constitutes acceptance of the new Terms.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                16. Severability
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving its original intent.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                17. Contact Information
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                If you have any questions about these Terms of Service, please contact us:
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
                  📧 <Link href=\"quot;mailto:legal@technova.com\"quot; style={{ color: \"quot;var(--primary)\"quot; }}>legal@technova.com</Link>
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

const styles = {
  cta: \"quot;cta\"quot;,
  footer: \"quot;footer\"quot;,
  footerGrid: \"quot;footerGrid\"quot;,
  footerAbout: \"quot;footerAbout\"quot;,
  logo: \"quot;logo\"quot;,
  logoIcon: \"quot;logoIcon\"quot;,
  footerSocial: \"quot;footerSocial\"quot;,
  footerColumn: \"quot;footerColumn\"quot;,
  footerBottom: \"quot;footerBottom\"quot;,
  footerLegal: \"quot;footerLegal\"quot;,
};


