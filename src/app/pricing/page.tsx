"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Pricing() {
  const [selectedModel, setSelectedModel] = useState("fixed-price");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const pricingModels = [
    {
      id: "fixed-price",
      name: "Fixed Price Projects",
      subtitle: "Perfect for startups & defined scope projects",
      icon: "💰",
      whoFor: "Startups, small businesses, and projects with clear requirements",
      startingPrice: "$5,000",
      timeline: "2-12 weeks",
      inclusions: [
        "Complete project delivery",
        "Source code ownership",
        "30-day post-launch support",
        "UI/UX design included",
        "Quality assurance testing",
        "Project management",
        "Technical documentation"
      ],
      pros: [
        "Predictable costs",
        "Clear timeline",
        "No hidden fees",
        "Full project ownership"
      ],
      cons: [
        "Less flexible for changes",
        "Scope must be defined upfront",
        "May require additional budget for changes"
      ],
      cta: "Get Fixed Quote",
      popular: false
    },
    {
      id: "dedicated-team",
      name: "Dedicated Development Team",
      subtitle: "Scalable team for ongoing development",
      icon: "👥",
      whoFor: "Growing startups, enterprises, and long-term partnerships",
      startingPrice: "$8,000/month",
      timeline: "1-12+ months",
      inclusions: [
        "Dedicated developers (2-10 members)",
        "Project manager included",
        "Daily standups & reporting",
        "Agile development process",
        "Code reviews & quality assurance",
        "Unlimited revisions",
        "24/7 support",
        "Scalability on demand"
      ],
      pros: [
        "Flexible scaling",
        "Ongoing development",
        "Integrated team culture",
        "Faster delivery cycles"
      ],
      cons: [
        "Higher monthly cost",
        "Requires longer commitment",
        "Team ramp-up time"
      ],
      cta: "Build Your Team",
      popular: true
    },
    {
      id: "monthly-retainer",
      name: "Monthly Retainer",
      subtitle: "Ongoing maintenance & feature development",
      icon: "🔄",
      whoFor: "Established businesses needing continuous development",
      startingPrice: "$3,000/month",
      timeline: "Ongoing",
      inclusions: [
        "Monthly development hours (40-160)",
        "Priority support",
        "Bug fixes & maintenance",
        "Feature enhancements",
        "Performance monitoring",
        "Security updates",
        "Monthly reporting",
        "Flexible hour allocation"
      ],
      pros: [
        "Predictable monthly costs",
        "Ongoing support",
        "Quick response times",
        "Continuous improvement"
      ],
      cons: [
        "Unused hours don't roll over",
        "May not suit large projects",
        "Requires monthly commitment"
      ],
      cta: "Start Retainer",
      popular: false
    }
  ];

  const testimonials = [
    {
      quote: "TechNova's fixed-price model helped us launch our MVP in 8 weeks within budget. Highly recommend for startups!",
      author: "Sarah Chen",
      role: "CEO, HealthTech Startup",
      avatar: "/images/testimonials/sarah.jpg",
      model: "Fixed Price"
    },
    {
      quote: "Our dedicated team has been instrumental in scaling our platform. They feel like an extension of our company.",
      author: "Michael Rodriguez",
      role: "CTO, E-commerce Platform",
      avatar: "/images/testimonials/michael.jpg",
      model: "Dedicated Team"
    },
    {
      quote: "The monthly retainer gives us peace of mind. Bugs are fixed quickly, and new features are delivered consistently.",
      author: "Emma Thompson",
      role: "Product Manager, SaaS Company",
      avatar: "/images/testimonials/emma.jpg",
      model: "Monthly Retainer"
    }
  ];

  const faqs = [
    {
      question: "How do you determine project pricing?",
      answer: "We assess project complexity, timeline, technology stack, and team requirements. Each quote is customized based on your specific needs and goals."
    },
    {
      question: "What payment terms do you offer?",
      answer: "We offer flexible payment terms: 50% upfront for fixed-price projects, monthly billing for retainers, and milestone-based payments for longer projects."
    },
    {
      question: "Do you provide post-launch support?",
      answer: "Yes! All projects include 30 days of free support. Extended support packages are available for ongoing maintenance and feature development."
    },
    {
      question: "Can I change my plan later?",
      answer: "Absolutely. We offer flexible scaling options. You can upgrade from fixed-price to dedicated team, or adjust retainer hours as your needs evolve."
    },
    {
      question: "What if my project scope changes?",
      answer: "We handle scope changes professionally. For fixed-price projects, we discuss change orders. Dedicated teams and retainers are more flexible for evolving requirements."
    },
    {
      question: "Do you sign NDAs?",
      answer: "Yes, we sign NDAs for all projects to protect your intellectual property and confidential information."
    }
  ];

  const selectedPricing = pricingModels.find(model => model.id === selectedModel);

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              TechNova
            </Link>
            <nav className={styles.nav}>
              <Link href="/" className={styles.navLink}>Home</Link>
              <Link href="/services" className={styles.navLink}>Services</Link>
              <Link href="/pricing" className={`${styles.navLink} ${styles.active}`}>Pricing</Link>
              <Link href="/work" className={styles.navLink}>Portfolio</Link>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
              <Link href="/request-a-call" className="btn btn-secondary btn-sm">
                Schedule a Call
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot}></span>
              Transparent Pricing, Exceptional Results
            </div>
            <h1>Choose the Right Development Model for Your Business</h1>
            <p className={styles.heroSubtitle}>
              From MVPs to enterprise solutions, we offer flexible pricing models designed to scale with your business needs.
              No hidden fees, no surprises – just transparent pricing and guaranteed results.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNumber}>2,500+</div>
                <div className={styles.heroStatLabel}>Projects Delivered</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNumber}>98%</div>
                <div className={styles.heroStatLabel}>Client Satisfaction</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNumber}>24/7</div>
                <div className={styles.heroStatLabel}>Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING MODELS ===== */}
      <section className={styles.pricing}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Development Models</h2>
            <p>Select the model that best fits your project requirements and timeline</p>
          </div>

          <div className={styles.pricingGrid}>
            {pricingModels.map((model) => (
              <div
                key={model.id}
                className={`${styles.pricingCard} ${model.popular ? styles.popular : ""} ${selectedModel === model.id ? styles.selected : ""}`}
                onClick={() => setSelectedModel(model.id)}
              >
                {model.popular && <div className={styles.popularBadge}>Most Popular</div>}
                <div className={styles.pricingHeader}>
                  <div className={styles.pricingIcon}>{model.icon}</div>
                  <h3>{model.name}</h3>
                  <p className={styles.pricingSubtitle}>{model.subtitle}</p>
                </div>

                <div className={styles.pricingPrice}>
                  <div className={styles.priceAmount}>Starting at {model.startingPrice}</div>
                  <div className={styles.priceTimeline}>{model.timeline}</div>
                </div>

                <div className={styles.pricingWhoFor}>
                  <strong>Perfect for:</strong> {model.whoFor}
                </div>

                <div className={styles.pricingFeatures}>
                  <h4>What's Included:</h4>
                  <ul>
                    {model.inclusions.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.pricingProsCons}>
                  <div className={styles.pricingPros}>
                    <h5>✅ Pros:</h5>
                    <ul>
                      {model.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.pricingCons}>
                    <h5>⚠️ Considerations:</h5>
                    <ul>
                      {model.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href="/contact" className={`btn ${model.popular ? 'btn-accent' : 'btn-primary'} btn-block`}>
                  {model.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DETAILED BREAKDOWN ===== */}
      <section className={styles.breakdown}>
        <div className="container">
          <div className={styles.breakdownContent}>
            <div className={styles.breakdownInfo}>
              <h2>Detailed Pricing Breakdown</h2>
              <p>Understanding costs for {selectedPricing?.name}</p>

              <div className={styles.breakdownDetails}>
                <div className={styles.detailItem}>
                  <h4>Development Costs</h4>
                  <p>Core development work including coding, testing, and deployment</p>
                  <div className={styles.detailRange}>
                    {selectedModel === 'fixed-price' && '$3,000 - $50,000+'}
                    {selectedModel === 'dedicated-team' && '$6,000 - $25,000/month'}
                    {selectedModel === 'monthly-retainer' && '$2,000 - $12,000/month'}
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <h4>Design & UX</h4>
                  <p>UI/UX design, prototyping, and user research</p>
                  <div className={styles.detailRange}>
                    {selectedModel === 'fixed-price' && 'Included'}
                    {selectedModel === 'dedicated-team' && 'Included'}
                    {selectedModel === 'monthly-retainer' && '$500 - $2,000/month'}
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <h4>Project Management</h4>
                  <p>Dedicated project manager and agile process</p>
                  <div className={styles.detailRange}>
                    {selectedModel === 'fixed-price' && 'Included'}
                    {selectedModel === 'dedicated-team' && 'Included'}
                    {selectedModel === 'monthly-retainer' && 'Included'}
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <h4>Support & Maintenance</h4>
                  <p>Post-launch support and ongoing maintenance</p>
                  <div className={styles.detailRange}>
                    {selectedModel === 'fixed-price' && '30 days free'}
                    {selectedModel === 'dedicated-team' && 'Included'}
                    {selectedModel === 'monthly-retainer' && 'Included'}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.breakdownCta}>
              <h3>Ready to Get Started?</h3>
              <p>Get a personalized quote based on your specific requirements</p>
              <div className={styles.ctaButtons}>
                <Link href="/proposal" className="btn btn-primary btn-lg">
                  Get Free Consultation
                </Link>
                <Link href="/request-a-call" className="btn btn-secondary btn-lg">
                  Schedule a Call
                </Link>
              </div>
              <div className={styles.ctaGuarantee}>
                <span>🔒</span> Free consultation • No obligation • NDA signed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Client Success Stories</h2>
            <p>See how our pricing models have helped businesses achieve their goals</p>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialQuote}>"{testimonial.quote}"</div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className={styles.testimonialInfo}>
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.role}</p>
                    <span className={styles.testimonialModel}>{testimonial.model}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className={styles.faq}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about our pricing and process</p>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className={styles.finalCta}>
        <div className="container">
          <div className={styles.finalCtaContent}>
            <h2>Transform Your Ideas Into Reality</h2>
            <p>Join 2,500+ satisfied clients who chose TechNova for their development needs</p>
            <div className={styles.finalCtaButtons}>
              <Link href="/contact" className="btn btn-accent btn-3d">
                Start Your Project Today
              </Link>
              <Link href="/work" className="btn btn-secondary btn-3d">
                View Our Portfolio
              </Link>
            </div>
            <div className={styles.finalCtaTrust}>
              ⭐ 4.9/5 average rating • 98% project success rate • 24/7 support
            </div>
          </div>
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
              <h4>Support</h4>
              <ul>
                <li><Link href="#">Help Center</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service">Terms of Service</Link></li>
                <li><Link href="#">Sitemap</Link></li>
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
