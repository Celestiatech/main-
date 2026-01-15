import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
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
                <div className={styles.navMenuTitle}>Web Development Services</div>
                <Link href="#services" className={styles.navMenuItem}>
                  WordPress Development
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  Joomla Development
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  Laravel Development
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  ReactJS Development
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  Node.js Development
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  Vue.js Development
                </Link>
              </div>
              <div className={styles.navMenuGroup}>
                <div className={styles.navMenuTitle}>Web Design Services</div>
                <Link href="#services" className={styles.navMenuItem}>
                  Website UI/UX Design
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  Branding & Visual Identity
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  Landing Page Design
                </Link>
              </div>
              <div className={styles.navMenuGroup}>
                <div className={styles.navMenuTitle}>Digital Marketing Services</div>
                <Link href="#services" className={styles.navMenuItem}>
                  SEO Services
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  PPC Management
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  Social Media Marketing
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  Content Marketing
                </Link>
              </div>
              <div className={styles.navMenuGroup}>
                <div className={styles.navMenuTitle}>Mobile App Services</div>
                <Link href="#services" className={styles.navMenuItem}>
                  Android App Development
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  iOS App Development
                </Link>
                <Link href="#services" className={styles.navMenuItem}>
                  App UI/UX Design
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
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.badge}>Digital marketing, web design and development agency</p>
            <h1>We craft websites and campaigns that grow your business.</h1>
            <p className={styles.heroSubtitle}>
              Modern websites, result-focused marketing and long-term support to help your
              business stand out online.
            </p>
            <div className={styles.heroActions}>
              <Link href="/proposal" className={styles.primaryButton}>
                Get free proposal
              </Link>
              <Link href="/work" className={styles.secondaryButton}>
                View work
              </Link>
            </div>
            <div className={styles.metrics}>
              <div>
                <span className={styles.metricValue}>10+</span>
                <span className={styles.metricLabel}>Years experience</span>
              </div>
              <div>
                <span className={styles.metricValue}>300+</span>
                <span className={styles.metricLabel}>Happy clients</span>
              </div>
              <div>
                <span className={styles.metricValue}>900+</span>
                <span className={styles.metricLabel}>Projects delivered</span>
              </div>
            </div>
          </div>
          <div className={styles.heroPanel}>
            <h2>What we can help with</h2>
            <ul>
              <li>Corporate and agency websites</li>
              <li>E‑commerce and booking platforms</li>
              <li>Branding and user experience</li>
              <li>SEO, PPC and social media campaigns</li>
            </ul>
          </div>
        </section>

        <section id="services" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Our Services</h2>
            <p>
              From idea to launch and ongoing growth, we cover every step of your digital
              journey.
            </p>
          </div>
          <div className={styles.cardsGrid}>
            <article className={styles.card}>
              <h3>Web Design</h3>
              <p>
                Conversion-focused designs that match your brand and guide visitors to take
                action.
              </p>
              <ul>
                <li>Responsive layouts</li>
                <li>UI/UX design</li>
                <li>Design systems</li>
              </ul>
            </article>
            <article className={styles.card}>
              <h3>Web Development</h3>
              <p>
                Fast, secure and scalable websites powered by modern frameworks and best
                practices.
              </p>
              <ul>
                <li>Next.js and React</li>
                <li>Content management</li>
                <li>API integrations</li>
              </ul>
            </article>
            <article className={styles.card}>
              <h3>Digital Marketing</h3>
              <p>
                Data-driven campaigns that increase visibility, traffic and qualified leads.
              </p>
              <ul>
                <li>SEO and content</li>
                <li>Paid search and social</li>
                <li>Analytics and reporting</li>
              </ul>
            </article>
            <article className={styles.card}>
              <h3>Ongoing Support</h3>
              <p>
                Long-term partners for maintenance, improvements and continuous optimization.
              </p>
              <ul>
                <li>Performance monitoring</li>
                <li>Security updates</li>
                <li>A/B testing</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="industries" className={styles.sectionMuted}>
          <div className={styles.sectionHeader}>
            <h2>Industries We Serve</h2>
            <p>
              We adapt our approach to different markets while keeping the same focus on
              measurable results.
            </p>
          </div>
          <div className={styles.pills}>
            <span>Technology & SaaS</span>
            <span>E‑commerce</span>
            <span>Professional services</span>
            <span>Education</span>
            <span>Real estate</span>
            <span>Healthcare</span>
          </div>
        </section>

        <section id="work" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Our Work</h2>
            <p>
              A snapshot of the types of projects we deliver. Replace these with your own
              case studies.
            </p>
          </div>
          <div className={styles.projectsGrid}>
            <article className={styles.projectCard}>
              <h3>Grasshopper Soccer</h3>
              <p>
                Community sports website with online enrolment, location search and mobile-first
                experience.
              </p>
            </article>
            <article className={styles.projectCard}>
              <h3>Zion Cases</h3>
              <p>
                Product-focused storefront with optimized product pages and streamlined checkout.
              </p>
            </article>
            <article className={styles.projectCard}>
              <h3>Finance Platform</h3>
              <p>
                Marketing site for a fintech product, highlighting features, security and
                customer stories.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Awards & Certifications</h2>
            <p>Clients trust us because we focus on quality, consistency and support.</p>
          </div>
          <div className={styles.awardsStrip}>
            <span>10+ Years Experience</span>
            <span>300+ Clients Worldwide</span>
            <span>900+ Projects Completed</span>
            <span>Verified Web & Marketing Experts</span>
          </div>
        </section>

        <section id="testimonials" className={styles.sectionMuted}>
          <div className={styles.sectionHeader}>
            <h2>What clients say</h2>
            <p>
              Clients choose us for clear communication, reliable delivery and long-term
              partnerships.
            </p>
          </div>
          <div className={styles.testimonialsGrid}>
            <article className={styles.testimonialCard}>
              <p>
                “They quickly understood our product and delivered a site that feels fast,
                modern and on-brand.”
              </p>
              <span className={styles.testimonialAuthor}>Ben Wright, Founder</span>
            </article>
            <article className={styles.testimonialCard}>
              <p>
                “Process was smooth from start to finish and the results exceeded our
                expectations.”
              </p>
              <span className={styles.testimonialAuthor}>Ivana Jablanovic, Project Manager</span>
            </article>
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <div className={styles.contactLayout}>
            <div>
              <h2>Ready to start?</h2>
              <p>
                Tell us about your project, timelines and goals. We will get back to you
                within one business day.
              </p>
              <div className={styles.contactHighlights}>
                <span>Free initial consultation</span>
                <span>Clear pricing before we start</span>
                <span>Dedicated project manager</span>
              </div>
            </div>
            <form className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="Your name" />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" placeholder="you@example.com" type="email" />
              </div>
              <div className={styles.field}>
                <label htmlFor="company">Company</label>
                <input id="company" name="company" placeholder="Your company" />
              </div>
              <div className={styles.field}>
                <label htmlFor="budget">Budget range</label>
                <select id="budget" name="budget" defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option value="5-10k">$5k – $10k</option>
                  <option value="10-25k">$10k – $25k</option>
                  <option value="25-50k">$25k – $50k</option>
                  <option value="50k+">$50k+</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Project details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Share a short overview of your project."
                />
              </div>
              <button type="submit" className={styles.primaryButton}>
                Send message
              </button>
            </form>
          </div>
        </section>

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
      </main>
    </div>
  );
}
