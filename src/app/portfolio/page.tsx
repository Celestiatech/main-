import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GROCITO_PORTFOLIO_ITEMS } from "@/lib/grocitoPortfolio";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";

export default function PortfolioPage() {
  const showcaseMedia = [
    {
      title: "Custom Store Layouts",
      image: "/images/portfolio/portfolio_website_design_0.jpg",
    },
    {
      title: "Optimized Product Screens",
      image: "/images/portfolio/portfolio_website_design_1.jpg",
    },
    {
      title: "Conversion-Ready Mobile Views",
      image: "/images/portfolio/portfolio_mobile_app_0.jpg",
    },
  ];

  const recentWorks = GROCITO_PORTFOLIO_ITEMS.slice(0, 3);

  const featureList = [
    "Dedicated Branch Panel",
    "Dashboard with Reporting",
    "Cash on Delivery",
    "Bulk Import & Export",
    "Built-in POS System",
    "Ratings & Reviews",
    "Push Notifications",
    "Promotional Banners",
    "Product Management",
    "OTP & Login",
  ];

  const reasons = [
    "Customizable & Mobile Optimized",
    "Multi-Language & Currency Support",
    "SEO Friendly",
    "Integrated E-Commerce Features",
    "Conversion Optimized",
    "24/7 Support & Regular Updates",
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

        <section className={styles.recentSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <h2>Our Most Recent Works</h2>
              <p>A quick spotlight on a few featured projects before you browse the full collection.</p>
            </div>
            <div className={styles.recentGrid}>
              {recentWorks.map((item) => (
                <article key={item.title} className={styles.recentCard}>
                  <div className={styles.recentImageWrap}>
                    <Image src={item.image} alt={item.title} fill className={styles.recentImage} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className={styles.recentBody}>
                    <h3>{item.title}</h3>
                    <Link href={item.url} target="_blank" rel="noreferrer" className={styles.portfolioButton}>
                      Click to View
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.centerAction}>
              <Link href="/work" className={styles.secondaryAction}>
                Our Works
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.mediaSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <h2>Customize Everything. Everywhere. Anytime.</h2>
              <p>We build flexible ecommerce and business websites with strong visuals, mobile clarity, and conversion-first structure.</p>
            </div>
            <div className={styles.mediaGrid}>
              {showcaseMedia.map((item) => (
                <article key={item.title} className={styles.mediaCard}>
                  <div className={styles.mediaFrame}>
                    <Image src={item.image} alt={item.title} fill className={styles.mediaImage} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>
            <div className={styles.centerAction}>
              <Link href="/contact" className={styles.primaryAction}>
                Book Free Consultation
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <PortfolioShowcase />
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <h2>Key Features We Build In</h2>
              <p>Essential building blocks for stores and business websites, adapted to your exact workflow.</p>
            </div>
            <div className={styles.featureGrid}>
              {featureList.map((feature) => (
                <div key={feature} className={styles.featureCard}>
                  <span className={styles.featureDot} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.reasonsSection}>
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
            <div className={styles.reasonGrid}>
              {reasons.map((reason) => (
                <div key={reason} className={styles.reasonCard}>
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers for teams deciding whether this style of website build is right for them.</p>
            </div>
            <div className={styles.faqGrid}>
              {faqs.map((item) => (
                <article key={item.question} className={styles.faqCard}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.bottomCta}>
          <div className="container">
            <div className={styles.bottomCtaInner}>
              <div>
                <h2>Want a portfolio like this for your brand?</h2>
                <p>We design high-conversion websites, landing pages, ecommerce stores, and growth-focused digital products.</p>
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
