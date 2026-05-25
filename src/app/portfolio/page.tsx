import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GROCITO_PORTFOLIO_ITEMS, getPortfolioItemSlug } from "@/lib/grocitoPortfolio";

export default function PortfolioPage() {
  const hiddenRecentTitles = new Set([
    "Mittal Garments",
    "A Bun in The Oven",
  ]);

  const recentWorks = GROCITO_PORTFOLIO_ITEMS.filter(
    (item) => !hiddenRecentTitles.has(item.title)
  ).slice(0, 3);

  const featureList = [
    { title: "Dedicated Branch Panel", detail: "Manage branches, staff access, stock flow, and daily operations from one place." },
    { title: "Dashboard with Reporting", detail: "Track orders, performance, revenue, and growth signals in real time." },
    { title: "Cash on Delivery", detail: "Support flexible payment behavior that matches how your customers actually buy." },
    { title: "Bulk Import & Export", detail: "Upload products, pricing, and catalog data fast without repetitive manual work." },
    { title: "Built-in POS System", detail: "Keep offline and online selling connected through one consistent workflow." },
    { title: "Ratings & Reviews", detail: "Build trust with social proof that helps users compare and convert faster." },
    { title: "Push Notifications", detail: "Bring users back with reminders, promotions, updates, and engagement prompts." },
    { title: "Promotional Banners", detail: "Launch seasonal offers and campaigns without rebuilding the whole experience." },
    { title: "Product Management", detail: "Control inventory, visibility, categories, and merchandising with less friction." },
    { title: "OTP & Login", detail: "Offer quick secure sign-in flows built for mobile-first shoppers and teams." },
  ];

  const reasons = [
    {
      title: "Customizable & Mobile Optimized",
      detail: "Every layout is tailored to your business model and tuned for strong performance across phones, tablets, and desktops.",
    },
    {
      title: "Multi-Language & Currency Support",
      detail: "We help brands sell to broader markets with flexible localization, currency options, and region-aware experiences.",
    },
    {
      title: "SEO Friendly",
      detail: "Clean structure, search-ready content flow, and technical best practices support stronger discoverability from launch.",
    },
    {
      title: "Integrated E-Commerce Features",
      detail: "From catalogs to checkout logic, we connect the business tools that make the site useful after design is finished.",
    },
    {
      title: "Conversion Optimized",
      detail: "We shape each page around clarity, trust, and action so traffic has a better chance of turning into real inquiries or sales.",
    },
    {
      title: "24/7 Support & Regular Updates",
      detail: "Ongoing support, fixes, and practical improvements help your platform keep pace as the business evolves.",
    },
  ];

  const faqs = [
    {
      question: "What kind of websites can CelestiaTech build?",
      answer: "We build ecommerce stores, company websites, landing pages, service websites, and custom digital platforms designed for performance and growth.",
    },
    {
      question: "Can you customize everything for my business model?",
      answer: "Yes. We tailor layout, content structure, commerce flow, brand styling, and feature modules around the way your business actually sells.",
    },
    {
      question: "Do you support mobile optimization and SEO setup?",
      answer: "Yes. We focus on mobile-first layouts, speed, technical SEO basics, and a cleaner conversion journey across devices.",
    },
  ];

  const trustedLogos = [
    "/images/awards/clutch.png",
    "/images/awards/goodfirms.png",
    "/images/awards/techreviewer.png",
    "/images/awards/top-company.png",
  ];

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.heroEyebrow}>CelestiaTech Portfolio</div>
            </div>
          </div>
        </section>

        <section className={styles.fullVideoSection}>
          <div className="container">
            <div className={styles.fullVideoFrame}>
              <video
                className={styles.fullVideo}
                src="https://portfolio.grocito.com/wp-content/uploads/2025/03/website-design-and-development-agency-near-me.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </section>

        <section className={styles.recentSection} data-portfolio-engagement="recent-work">
          <div className="container">
            <div className={styles.sectionIntro}>
              <h2>Our Most Recent Works</h2>
              <p>A quick spotlight on a few featured projects before you browse the full collection.</p>
              <div className={styles.centerAction}>
                <Link href="/work" className={styles.secondaryAction}>
                  More Works
                </Link>
              </div>
            </div>
            <div className={styles.recentGrid}>
              {recentWorks.map((item) => (
                <article key={item.title} className={styles.recentCard}>
                  <Link href={`/portfolio/${getPortfolioItemSlug(item)}`} className={styles.recentCardLink}>
                    <div className={styles.recentImageWrap}>
                      <Image src={item.image} alt={item.title} fill className={styles.recentImage} sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.recentBody}>
                      <h3>{item.title}</h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.featuresSection} data-portfolio-engagement="features">
          <div className="container">
            <div className={styles.sectionIntro}>
              <h2>Key Features We Build In</h2>
              <p>Essential building blocks for stores and business websites, adapted to your exact workflow.</p>
            </div>
            <div className={styles.featureShowcase}>
              <div className={styles.featureHighlight}>
                <span className={styles.featureHighlightEyebrow}>Built for real operations</span>
                <h3>Store-ready systems, not just a nice homepage</h3>
                <p>
                  We combine conversion-focused design with operational tools, admin controls, and commerce features so
                  the website is useful after launch, not just during presentation.
                </p>
                <div className={styles.featureHighlightStats}>
                  <div className={styles.featureStat}>
                    <strong>10+</strong>
                    <span>practical modules included</span>
                  </div>
                  <div className={styles.featureStat}>
                    <strong>Business-ready</strong>
                    <span>built for daily usage and scale</span>
                  </div>
                </div>
              </div>

              <div className={styles.featureGrid}>
                {featureList.map((feature, index) => (
                  <article key={feature.title} className={styles.featureCard}>
                    <div className={styles.featureCardTop}>
                      <span className={styles.featureIndex}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={styles.featureDot} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.reasonsSection} data-portfolio-engagement="trust-signals">
          <div className="container">
            <div className={styles.sectionIntro}>
              <h2>Trusted by Top Companies</h2>
              <p>Recognition and trust signals that support the quality of our delivery and execution.</p>
            </div>
            <div className={styles.logoGrid}>
              {trustedLogos.map((logo) => (
                <div key={logo} className={styles.logoCard}>
                  <Image src={logo} alt="Trusted company logo" width={180} height={72} className={styles.logoImage} />
                </div>
              ))}
            </div>

            <div className={styles.sectionIntro}>
              <h2>Why Should You Consider Choosing CelestiaTech?</h2>
              <p>We focus on speed, usability, customization, and practical growth features instead of generic theme-only output.</p>
            </div>
            <div className={styles.reasonShowcase}>
              <div className={styles.reasonLead}>
                <span className={styles.reasonLeadEyebrow}>Why teams choose us</span>
                <h3>Built for growth, not just launch day</h3>
                <p>
                  We balance design quality, business logic, SEO readiness, and long-term maintainability so your site
                  can keep performing after it goes live.
                </p>
              </div>

              <div className={styles.reasonGrid}>
                {reasons.map((reason, index) => (
                  <article key={reason.title} className={styles.reasonCard}>
                    <div className={styles.reasonCardTop}>
                      <span className={styles.reasonIndex}>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3>{reason.title}</h3>
                    <p>{reason.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} data-portfolio-engagement="faq">
          <div className="container">
            <div className={styles.sectionIntro}>
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers for teams deciding whether this style of website build is right for them.</p>
            </div>
            <div className={styles.faqShowcase}>
              <div className={styles.faqLead}>
                <span className={styles.faqLeadEyebrow}>Decision support</span>
                <h3>Answers that keep the process practical and transparent</h3>
                <p>
                  We keep the build process focused on business fit, performance, and scalability, so you know what
                  the site can do before we start shaping it around your goals.
                </p>
              </div>

              <div className={styles.faqGrid}>
                {faqs.map((item, index) => (
                  <article key={item.question} className={styles.faqCard}>
                    <div className={styles.faqCardTop}>
                      <span className={styles.faqIndex}>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.bottomCta}>
          <div className="container">
            <div className={styles.bottomCtaInner}>
              <div className={styles.bottomCtaContent}>
                <span className={styles.bottomCtaEyebrow}>Start your project</span>
                <h2>Want a portfolio like this for your brand?</h2>
                <p>We design high-conversion websites, landing pages, ecommerce stores, and growth-focused digital products.</p>
                <div className={styles.bottomCtaMeta}>
                  <span>Strategy-led design</span>
                  <span>Custom development</span>
                  <span>Built for growth</span>
                </div>
              </div>
              <div className={styles.bottomActions}>
                <Link href="/contact" className={styles.primaryAction}>
                  Get Consultation
                </Link>
                <Link href="/services" className={styles.secondaryAction}>
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
