import Link from "next/link";
import styles from "../page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Floating orbs for background */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* 3D Geometric Shapes */}
      <div className="morph-shape" style={{ top: '10%', left: '5%' }}></div>
      <div className="morph-shape" style={{ top: '60%', right: '10%' }}></div>

      {/* 3D Particle System */}
      <div className="particle-3d"></div>
      <div className="particle-3d"></div>
      <div className="particle-3d"></div>
      <div className="particle-3d"></div>

      <div className={styles.topStrip}>
        <span>Need help with SEO or PPC?</span>
        <span>Grow your Shopify or e‑commerce store.</span>
        <span>Custom web solutions in React, Next.js and Node.js.</span>
        <span>Specialists in WordPress, Wix, Webflow and Joomla.</span>
      </div>

      <header className={styles.header}>
        <div className={styles.logo}>YourAgency</div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <div className={styles.navItem}>
            <button type="button" className={styles.navTrigger}>
              Services
            </button>
            <div className={styles.navMenu}>
              <div className={styles.navMenuGroup}>
                <div className={styles.navMenuTitle}>Web Development</div>
                <Link href="/website-development-services" className={styles.navMenuItem}>
                  Website Development Services
                </Link>
                <Link href="/nextjs-development-services" className={styles.navMenuItem}>
                  Next.js Development
                </Link>
                <Link href="/shopify-development-services" className={styles.navMenuItem}>
                  Shopify Development
                </Link>
                <Link href="/wordpress-development-services" className={styles.navMenuItem}>
                  WordPress Development
                </Link>
                <Link href="/joomla-development-services" className={styles.navMenuItem}>
                  Joomla Development
                </Link>
                <Link href="/laravel-development-services" className={styles.navMenuItem}>
                  Laravel Development
                </Link>
                <Link href="/reactjs-development-services" className={styles.navMenuItem}>
                  ReactJS Development
                </Link>
                <Link href="/nodejs-development-services" className={styles.navMenuItem}>
                  Node.js Development
                </Link>
                <Link href="/vuejs-development-services" className={styles.navMenuItem}>
                  Vue.js Development
                </Link>
                <Link href="/wix-development-services" className={styles.navMenuItem}>
                  Wix Development
                </Link>
                <Link href="/webflow-development-services" className={styles.navMenuItem}>
                  Webflow Development
                </Link>
              </div>
              <div className={styles.navMenuGroup}>
                <div className={styles.navMenuTitle}>Web Design</div>
                <Link href="/website-design-services" className={styles.navMenuItem}>
                  Website Design Services
                </Link>
                <Link href="/ux-design-services" className={styles.navMenuItem}>
                  UX Design Services
                </Link>
                <Link href="/graphic-design-services" className={styles.navMenuItem}>
                  Graphic Design Services
                </Link>
                <Link href="/logo-design-services" className={styles.navMenuItem}>
                  Logo Design Services
                </Link>
                <Link href="/brochure-design-services" className={styles.navMenuItem}>
                  Brochure Design Services
                </Link>
                <Link href="/banner-design-services" className={styles.navMenuItem}>
                  Banner Design Services
                </Link>
              </div>
              <div className={styles.navMenuGroup}>
                <div className={styles.navMenuTitle}>Digital Marketing</div>
                <Link href="/digital-marketing-services" className={styles.navMenuItem}>
                  Digital Marketing Services
                </Link>
                <Link href="/seo-services" className={styles.navMenuItem}>
                  SEO Services
                </Link>
                <Link href="/social-media-marketing-services" className={styles.navMenuItem}>
                  Social Media Marketing
                </Link>
                <Link href="/pay-per-click-advertising-services" className={styles.navMenuItem}>
                  PPC Advertising
                </Link>
                <Link href="/email-marketing-services" className={styles.navMenuItem}>
                  Email Marketing
                </Link>
                <Link href="/search-engine-marketing-services" className={styles.navMenuItem}>
                  Search Engine Marketing
                </Link>
              </div>
              <div className={styles.navMenuGroup}>
                <div className={styles.navMenuTitle}>Mobile Apps</div>
                <Link href="/mobile-app-development-services" className={styles.navMenuItem}>
                  Mobile App Development
                </Link>
                <Link href="/ios-application-development-services" className={styles.navMenuItem}>
                  iOS App Development
                </Link>
                <Link href="/android-app-development-services" className={styles.navMenuItem}>
                  Android App Development
                </Link>
                <Link href="/flutter-app-development-services" className={styles.navMenuItem}>
                  Flutter App Development
                </Link>
              </div>
            </div>
          </div>
          <Link href="/industries" className={styles.navLink}>
            Industries We Serve
          </Link>
          <Link href="/work" className={styles.navLink}>
            Our Work
          </Link>
          <Link href="/testimonials" className={styles.navLink}>
            Testimonials
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>
        </nav>
        <Link href="/clients" className={styles.headerCta}>
          For Clients
        </Link>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>About Us</h2>
            <p>Learn about our mission, values, and the team behind YourAgency.</p>
          </div>
          <div className={styles.cardsGrid}>
            <article className={styles.card}>
              <h3>Our Mission</h3>
              <p>To empower businesses with cutting-edge digital solutions that drive growth and success.</p>
            </article>
            <article className={styles.card}>
              <h3>Our Vision</h3>
              <p>To be the leading digital agency that transforms ideas into exceptional online experiences.</p>
            </article>
            <article className={styles.card}>
              <h3>Our Values</h3>
              <p>Innovation, quality, integrity, and client satisfaction are at the core of everything we do.</p>
            </article>
            <article className={styles.card}>
              <h3>Our Team</h3>
              <p>A diverse group of talented professionals passionate about digital excellence.</p>
            </article>
          </div>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Work with us
            </Link>
            <Link href="/" className={styles.secondaryButton}>
              Back to home
            </Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerColumns}>
          <div>
            <h3>Services</h3>
            <ul>
              <li>
                <Link href="/services">Web Development Services</Link>
              </li>
              <li>
                <Link href="/services">Web Design Services</Link>
              </li>
              <li>
                <Link href="/services">Digital Marketing Services</Link>
              </li>
              <li>
                <Link href="/services">Mobile App Services</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li>
                <Link href="/services">Our Services</Link>
              </li>
              <li>
                <Link href="/work">Our Work</Link>
              </li>
              <li>
                <Link href="/testimonials">Testimonials</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul>
              <li>
                <Link href="/industries">Industries We Serve</Link>
              </li>
              <li>
                <Link href="/proposal">Get a Free Proposal</Link>
              </li>
              <li>
                <Link href="/request-a-call">Request a Call</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} YourAgency. All rights reserved.</span>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
