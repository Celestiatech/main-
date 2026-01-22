import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Cookie Policy | TechNova Solutions",
  description: "Learn how TechNova Solutions uses cookies and similar technologies on our website.",
};

export default function CookiePolicy() {
  return (
    <div className={styles.page}>
      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Cookie Policy</h1>
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
            <span className={styles.breadcrumbCurrent}>Cookie Policy</span>
          </div>
        </div>
      </div>

      {/* ===== COOKIE CONTENT ===== */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="card">
              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                1. Introduction
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                This Cookie Policy explains what Cookies are and how TechNova Solutions ("we," "our," or "us") uses them on our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                2. What Are Cookies?
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently and to provide reporting information.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                Cookies can be "first-party" (set by the website you are visiting) or "third-party" (set by a domain other than the one you are visiting). First-party cookies are placed directly by us, while third-party cookies are placed by our partners and service providers.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                3. Types of Cookies We Use
              </h2>
              
              <h3 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--text-primary)", marginTop: "24px" }}>
                3.1 Essential Cookies
              </h3>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to your actions like setting privacy preferences, logging in, or filling forms.
              </p>
              <div style={{ 
                background: "var(--bg-primary)", 
                padding: "16px", 
                borderRadius: "var(--radius-md)",
                marginBottom: "24px"
              }}>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  <strong>Examples:</strong>
                </p>
                <ul style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.8", paddingLeft: "20px" }}>
                  <li>Session cookies to keep you logged in</li>
                  <li>Security cookies for authentication</li>
                  <li>Load balancing cookies</li>
                </ul>
              </div>

              <h3 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--text-primary)", marginTop: "24px" }}>
                3.2 Performance & Analytics Cookies
              </h3>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve the performance of our website.
              </p>
              <div style={{ 
                background: "var(--bg-primary)", 
                padding: "16px", 
                borderRadius: "var(--radius-md)",
                marginBottom: "24px"
              }}>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  <strong>Examples:</strong>
                </p>
                <ul style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.8", paddingLeft: "20px" }}>
                  <li>Google Analytics to track page views and user behavior</li>
                  <li>Heatmap tools to understand user engagement</li>
                  <li>Error tracking to identify and fix issues</li>
                </ul>
              </div>

              <h3 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--text-primary)", marginTop: "24px" }}>
                3.3 Functionality Cookies
              </h3>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                These cookies enable enhanced functionality and personalization, such as remembering your preferences, choices, and customized settings.
              </p>
              <div style={{ 
                background: "var(--bg-primary)", 
                padding: "16px", 
                borderRadius: "var(--radius-md)",
                marginBottom: "24px"
              }}>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  <strong>Examples:</strong>
                </p>
                <ul style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.8", paddingLeft: "20px" }}>
                  <li>Remembering your language preference</li>
                  <li>Remembering form information</li>
                  <li>Customized widget configurations</li>
                </ul>
              </div>

              <h3 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--text-primary)", marginTop: "24px" }}>
                3.4 Marketing & Tracking Cookies
              </h3>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                These cookies are used to track visitors across websites to display relevant advertisements. They may be set by our advertising partners to build a profile of your interests.
              </p>
              <div style={{ 
                background: "var(--bg-primary)", 
                padding: "16px", 
                borderRadius: "var(--radius-md)",
                marginBottom: "24px"
              }}>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                  <strong>Examples:</strong>
                </p>
                <ul style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.8", paddingLeft: "20px" }}>
                  <li>Retargeting ads on social media platforms</li>
                  <li>Conversion tracking for marketing campaigns</li>
                  <li>Demographic and interest-based reporting</li>
                </ul>
              </div>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                4. Specific Cookies We Use
              </h2>
              <div style={{ overflowX: "auto", marginBottom: "24px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "var(--bg-primary)" }}>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid var(--border-light)" }}>Cookie Name</th>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid var(--border-light)" }}>Purpose</th>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid var(--border-light)" }}>Duration</th>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid var(--border-light)" }}>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>_ga</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>Google Analytics - distinguishes users</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>2 years</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>Analytics</td>
                    </tr>
                    <tr style={{ background: "var(--bg-primary)" }}>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>_gid</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>Google Analytics - distinguishes users</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>24 hours</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>Analytics</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>_cf_bm</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>Cloudflare - bot management</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>30 minutes</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>Essential</td>
                    </tr>
                    <tr style={{ background: "var(--bg-primary)" }}>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>intercom-session</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>Live chat support session</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>1 week</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid var(--border-light)" }}>Essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                5. Other Tracking Technologies
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                Besides cookies, we may use other similar technologies:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "12px" }}><strong>Web Beacons:</strong> Small graphic images (also called "pixels" or "tags") that help us understand how users navigate our website and measure the effectiveness of campaigns.</li>
                <li style={{ marginBottom: "12px" }}><strong>Local Storage:</strong> Data stored in your browser's local storage mechanism to remember your preferences and settings.</li>
                <li style={{ marginBottom: "12px" }}><strong>IP Addresses:</strong> We may collect your IP address for security purposes and to understand website traffic patterns.</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                6. How to Manage Cookies
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                You have several options for managing cookies:
              </p>
              
              <h3 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--text-primary)", marginTop: "24px" }}>
                6.1 Browser Settings
              </h3>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                Most browsers allow you to:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>View cookies stored on your device</li>
                <li style={{ marginBottom: "8px" }}>Delete all or specific cookies</li>
                <li style={{ marginBottom: "8px" }}>Block cookies from all or specific websites</li>
                <li style={{ marginBottom: "8px" }}>Set preferences for first-party and third-party cookies</li>
              </ul>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                To manage cookies in your browser, look for "Settings," "Privacy," or "Cookies" in your browser options.
              </p>

              <h3 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--text-primary)", marginTop: "24px" }}>
                6.2 Third-Party Tools
              </h3>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                You can opt out of specific tracking:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}><Link href="https://tools.google.com/dlpage/gaoptout" style={{ color: "var(--primary)" }} target="_blank">Google Analytics Opt-out</Link></li>
                <li style={{ marginBottom: "8px" }}><Link href="https://www.aboutads.info/choices" style={{ color: "var(--primary)" }} target="_blank">Digital Advertising Alliance</Link></li>
                <li style={{ marginBottom: "8px" }}><Link href="https://youronlinechoices.com" style={{ color: "var(--primary)" }} target="_blank">Your Online Choices (EU)</Link></li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                7. Impact of Disabling Cookies
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                If you disable or delete cookies:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>Some features of the website may not work properly</li>
                <li style={{ marginBottom: "8px" }}>You may need to log in more frequently</li>
                <li style={{ marginBottom: "8px" }}>Your preferences may not be saved</li>
                <li style={{ marginBottom: "8px" }}>The website may load more slowly</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                8. Do Not Track
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                Some browsers have a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Currently, there is no industry standard for handling DNT signals, so our website does not respond to DNT signals at this time.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                9. Third-Party Cookies
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                The following third parties may place cookies on your device when you visit our website:
              </p>
              <ul style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li style={{ marginBottom: "8px" }}><strong>Cloudflare:</strong> For security and performance optimization</li>
                <li style={{ marginBottom: "8px" }}><strong>Intercom:</strong> For live chat and customer support</li>
                <li style={{ marginBottom: "8px" }}><strong>Social Media Platforms:</strong> For social sharing functionality</li>
              </ul>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                10. Updates to This Policy
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
              </p>

              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                11. Contact Us
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.7" }}>
                If you have questions about our use of cookies, please contact us:
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

