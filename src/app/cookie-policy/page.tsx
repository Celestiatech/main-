import type { Metadata } from \"quot;next\"quot;;
import Link from \"quot;next/link\"quot;;
import \"quot;../globals.css\"quot;;
import \"quot;../../page.module.css\"quot;;

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
  title: \"quot;Cookie Policy | TechNova Solutions\"quot;,
  description: \"quot;Learn how TechNova Solutions uses cookies and similar technologies on our website.\"quot;,
};

export default function CookiePolicy() {
  return (
    <div className=\"quot;page\"quot;>
      {/* ===== PAGE HERO ===== */}
      <section className=\"quot;pageHero\"quot;>
        <div className=\"quot;container\"quot;>
          <div className=\"quot;pageHeroContent\"quot;>
            <h1>Cookie Policy</h1>
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
            <span className=\"quot;breadcrumbCurrent\"quot;>Cookie Policy</span>
          </div>
        </div>
      </div>

      {/* ===== COOKIE CONTENT ===== */}
      <section className=\"quot;section\"quot;>
        <div className=\"quot;container\"quot;>
          <div style={{ maxWidth: \"quot;800px\"quot;, margin: \"quot;0 auto\"quot; }}>
            <div className=\"quot;card\"quot;>
              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                1. Introduction
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                This Cookie Policy explains what Cookies are and how TechNova Solutions (\"quot;we,\"quot; \"quot;our,\"quot; or \"quot;us\"quot;) uses them on our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                2. What Are Cookies?
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently and to provide reporting information.
              </p>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Cookies can be \"quot;first-party\"quot; (set by the website you are visiting) or \"quot;third-party\"quot; (set by a domain other than the one you are visiting). First-party cookies are placed directly by us, while third-party cookies are placed by our partners and service providers.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                3. Types of Cookies We Use
              </h2>
              
              <h3 style={{ fontSize: \"quot;18px\"quot;, marginBottom: \"quot;16px\"quot;, color: \"quot;var(--text-primary)\"quot;, marginTop: \"quot;24px\"quot; }}>
                3.1 Essential Cookies
              </h3>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to your actions like setting privacy preferences, logging in, or filling forms.
              </p>
              <div style={{ 
                background: \"quot;var(--bg-primary)\"quot;, 
                padding: \"quot;16px\"quot;, 
                borderRadius: \"quot;var(--radius-md)\"quot;,
                marginBottom: \"quot;24px\"quot;
              }}>
                <p style={{ fontSize: \"quot;14px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;8px\"quot; }}>
                  <strong>Examples:</strong>
                </p>
                <ul style={{ fontSize: \"quot;14px\"quot;, color: \"quot;var(--text-secondary)\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                  <li>Session cookies to keep you logged in</li>
                  <li>Security cookies for authentication</li>
                  <li>Load balancing cookies</li>
                </ul>
              </div>

              <h3 style={{ fontSize: \"quot;18px\"quot;, marginBottom: \"quot;16px\"quot;, color: \"quot;var(--text-primary)\"quot;, marginTop: \"quot;24px\"quot; }}>
                3.2 Performance & Analytics Cookies
              </h3>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve the performance of our website.
              </p>
              <div style={{ 
                background: \"quot;var(--bg-primary)\"quot;, 
                padding: \"quot;16px\"quot;, 
                borderRadius: \"quot;var(--radius-md)\"quot;,
                marginBottom: \"quot;24px\"quot;
              }}>
                <p style={{ fontSize: \"quot;14px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;8px\"quot; }}>
                  <strong>Examples:</strong>
                </p>
                <ul style={{ fontSize: \"quot;14px\"quot;, color: \"quot;var(--text-secondary)\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                  <li>Google Analytics to track page views and user behavior</li>
                  <li>Heatmap tools to understand user engagement</li>
                  <li>Error tracking to identify and fix issues</li>
                </ul>
              </div>

              <h3 style={{ fontSize: \"quot;18px\"quot;, marginBottom: \"quot;16px\"quot;, color: \"quot;var(--text-primary)\"quot;, marginTop: \"quot;24px\"quot; }}>
                3.3 Functionality Cookies
              </h3>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                These cookies enable enhanced functionality and personalization, such as remembering your preferences, choices, and customized settings.
              </p>
              <div style={{ 
                background: \"quot;var(--bg-primary)\"quot;, 
                padding: \"quot;16px\"quot;, 
                borderRadius: \"quot;var(--radius-md)\"quot;,
                marginBottom: \"quot;24px\"quot;
              }}>
                <p style={{ fontSize: \"quot;14px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;8px\"quot; }}>
                  <strong>Examples:</strong>
                </p>
                <ul style={{ fontSize: \"quot;14px\"quot;, color: \"quot;var(--text-secondary)\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                  <li>Remembering your language preference</li>
                  <li>Remembering form information</li>
                  <li>Customized widget configurations</li>
                </ul>
              </div>

              <h3 style={{ fontSize: \"quot;18px\"quot;, marginBottom: \"quot;16px\"quot;, color: \"quot;var(--text-primary)\"quot;, marginTop: \"quot;24px\"quot; }}>
                3.4 Marketing & Tracking Cookies
              </h3>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                These cookies are used to track visitors across websites to display relevant advertisements. They may be set by our advertising partners to build a profile of your interests.
              </p>
              <div style={{ 
                background: \"quot;var(--bg-primary)\"quot;, 
                padding: \"quot;16px\"quot;, 
                borderRadius: \"quot;var(--radius-md)\"quot;,
                marginBottom: \"quot;24px\"quot;
              }}>
                <p style={{ fontSize: \"quot;14px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;8px\"quot; }}>
                  <strong>Examples:</strong>
                </p>
                <ul style={{ fontSize: \"quot;14px\"quot;, color: \"quot;var(--text-secondary)\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                  <li>Retargeting ads on social media platforms</li>
                  <li>Conversion tracking for marketing campaigns</li>
                  <li>Demographic and interest-based reporting</li>
                </ul>
              </div>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                4. Specific Cookies We Use
              </h2>
              <div style={{ overflowX: \"quot;auto\"quot;, marginBottom: \"quot;24px\"quot; }}>
                <table style={{ width: \"quot;100%\"quot;, borderCollapse: \"quot;collapse\"quot;, fontSize: \"quot;14px\"quot; }}>
                  <thead>
                    <tr style={{ background: \"quot;var(--bg-primary)\"quot; }}>
                      <th style={{ padding: \"quot;12px\"quot;, textAlign: \"quot;left\"quot;, borderBottom: \"quot;2px solid var(--border-light)\"quot; }}>Cookie Name</th>
                      <th style={{ padding: \"quot;12px\"quot;, textAlign: \"quot;left\"quot;, borderBottom: \"quot;2px solid var(--border-light)\"quot; }}>Purpose</th>
                      <th style={{ padding: \"quot;12px\"quot;, textAlign: \"quot;left\"quot;, borderBottom: \"quot;2px solid var(--border-light)\"quot; }}>Duration</th>
                      <th style={{ padding: \"quot;12px\"quot;, textAlign: \"quot;left\"quot;, borderBottom: \"quot;2px solid var(--border-light)\"quot; }}>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>_ga</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>Google Analytics - distinguishes users</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>2 years</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>Analytics</td>
                    </tr>
                    <tr style={{ background: \"quot;var(--bg-primary)\"quot; }}>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>_gid</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>Google Analytics - distinguishes users</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>24 hours</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>Analytics</td>
                    </tr>
                    <tr>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>_cf_bm</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>Cloudflare - bot management</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>30 minutes</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>Essential</td>
                    </tr>
                    <tr style={{ background: \"quot;var(--bg-primary)\"quot; }}>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>intercom-session</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>Live chat support session</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>1 week</td>
                      <td style={{ padding: \"quot;12px\"quot;, borderBottom: \"quot;1px solid var(--border-light)\"quot; }}>Essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                5. Other Tracking Technologies
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Besides cookies, we may use other similar technologies:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;12px\"quot; }}><strong>Web Beacons:</strong> Small graphic images (also called \"quot;pixels\"quot; or \"quot;tags\"quot;) that help us understand how users navigate our website and measure the effectiveness of campaigns.</li>
                <li style={{ marginBottom: \"quot;12px\"quot; }}><strong>Local Storage:</strong> Data stored in your browser's local storage mechanism to remember your preferences and settings.</li>
                <li style={{ marginBottom: \"quot;12px\"quot; }}><strong>IP Addresses:</strong> We may collect your IP address for security purposes and to understand website traffic patterns.</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                6. How to Manage Cookies
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                You have several options for managing cookies:
              </p>
              
              <h3 style={{ fontSize: \"quot;18px\"quot;, marginBottom: \"quot;16px\"quot;, color: \"quot;var(--text-primary)\"quot;, marginTop: \"quot;24px\"quot; }}>
                6.1 Browser Settings
              </h3>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Most browsers allow you to:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>View cookies stored on your device</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Delete all or specific cookies</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Block cookies from all or specific websites</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Set preferences for first-party and third-party cookies</li>
              </ul>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                To manage cookies in your browser, look for \"quot;Settings,\"quot; \"quot;Privacy,\"quot; or \"quot;Cookies\"quot; in your browser options.
              </p>

              <h3 style={{ fontSize: \"quot;18px\"quot;, marginBottom: \"quot;16px\"quot;, color: \"quot;var(--text-primary)\"quot;, marginTop: \"quot;24px\"quot; }}>
                6.2 Third-Party Tools
              </h3>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                You can opt out of specific tracking:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><Link href=\"quot;https://tools.google.com/dlpage/gaoptout\"quot; style={{ color: \"quot;var(--primary)\"quot; }} target=\"quot;_blank\"quot;>Google Analytics Opt-out</Link></li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><Link href=\"quot;https://www.aboutads.info/choices\"quot; style={{ color: \"quot;var(--primary)\"quot; }} target=\"quot;_blank\"quot;>Digital Advertising Alliance</Link></li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><Link href=\"quot;https://youronlinechoices.com\"quot; style={{ color: \"quot;var(--primary)\"quot; }} target=\"quot;_blank\"quot;>Your Online Choices (EU)</Link></li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                7. Impact of Disabling Cookies
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                If you disable or delete cookies:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Some features of the website may not work properly</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>You may need to log in more frequently</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>Your preferences may not be saved</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}>The website may load more slowly</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                8. Do Not Track
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                Some browsers have a \"quot;Do Not Track\"quot; (DNT) feature that signals to websites that you do not want to be tracked. Currently, there is no industry standard for handling DNT signals, so our website does not respond to DNT signals at this time.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                9. Third-Party Cookies
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                The following third parties may place cookies on your device when you visit our website:
              </p>
              <ul style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.8\"quot;, paddingLeft: \"quot;20px\"quot; }}>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Cloudflare:</strong> For security and performance optimization</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Intercom:</strong> For live chat and customer support</li>
                <li style={{ marginBottom: \"quot;8px\"quot; }}><strong>Social Media Platforms:</strong> For social sharing functionality</li>
              </ul>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                10. Updates to This Policy
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;24px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the \"quot;Last updated\"quot; date.
              </p>

              <h2 style={{ fontSize: \"quot;24px\"quot;, marginBottom: \"quot;20px\"quot;, color: \"quot;var(--text-primary)\"quot; }}>
                11. Contact Us
              </h2>
              <p style={{ fontSize: \"quot;15px\"quot;, color: \"quot;var(--text-secondary)\"quot;, marginBottom: \"quot;16px\"quot;, lineHeight: \"quot;1.7\"quot; }}>
                If you have questions about our use of cookies, please contact us:
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

