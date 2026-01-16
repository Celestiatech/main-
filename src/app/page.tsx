"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");

  const services = [
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Native & cross-platform apps for iOS and Android with exceptional UX",
    },
    {
      icon: "🌐",
      title: "Web Development",
      description: "Scalable web applications using modern frameworks and technologies",
    },
    {
      icon: "🎮",
      title: "Game Development",
      description: "Engaging 2D/3D games for mobile, web, and desktop platforms",
    },
    {
      icon: "⛓️",
      title: "Blockchain Development",
      description: "Web3 solutions, smart contracts, and decentralized applications",
    },
    {
      icon: "⚙️",
      title: "DevOps Services",
      description: "CI/CD pipelines, cloud infrastructure, and automation solutions",
    },
    {
      icon: "🥽",
      title: "Metaverse Development",
      description: "Immersive VR/AR experiences and virtual world construction",
    },
    {
      icon: "✅",
      title: "Quality Assurance",
      description: "Comprehensive testing services ensuring bug-free deliverables",
    },
  ];

  const awards = [
    { name: "Upwork", badge: "Top Rated Plus" },
    { name: "Clutch", badge: "B2B Leader 2024" },
    { name: "TechReviewer", badge: "Best Developer" },
    { name: "GoodFirms", badge: "Excellence Award" },
    { name: "AppFutura", badge: "Verified Partner" },
  ];

  const partners = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Netflix",
  ];

  const industries = [
    { icon: "📚", name: "Education" },
    { icon: "✈️", name: "Travel" },
    { icon: "👥", name: "Social Networking" },
    { icon: "💪", name: "Fitness" },
    { icon: "💼", name: "Business" },
    { icon: "🚚", name: "Logistics" },
    { icon: "❤️", name: "Dating" },
    { icon: "🏥", name: "Healthcare" },
    { icon: "🏠", name: "Real Estate" },
    { icon: "⚡", name: "On-Demand" },
    { icon: "🔧", name: "Utility" },
    { icon: "🎬", name: "Entertainment" },
  ];

  const portfolio = [
    {
      category: "mobile",
      title: "HealthTrack Pro",
      description: "Fitness tracking app with AI-powered insights",
      tags: ["iOS", "Android", "Health"],
    },
    {
      category: "web",
      title: "EduLearn Platform",
      description: "E-learning portal serving 100K+ students",
      tags: ["React", "Node.js", "AWS"],
    },
    {
      category: "game",
      title: "Space Quest",
      description: "Popular mobile game with 1M+ downloads",
      tags: ["Unity", "3D", "Mobile"],
    },
    {
      category: "blockchain",
      title: "CryptoVault",
      description: "DeFi platform with smart contracts",
      tags: ["Web3", "Solidity", "DeFi"],
    },
    {
      category: "ai",
      title: "SmartAssist AI",
      description: "AI chatbot for customer support",
      tags: ["NLP", "Machine Learning"],
    },
    {
      category: "design",
      title: "BrandRebrand",
      description: "Complete brand identity redesign",
      tags: ["UI/UX", "Branding"],
    },
  ];

  const processSteps = [
    { icon: "💡", title: "Idea", desc: "Concept & vision" },
    { icon: "📝", title: "Concept", desc: "Wireframes & design" },
    { icon: "📋", title: "Plan", desc: "Strategy & roadmap" },
    { icon: "⚡", title: "Develop", desc: "Agile development" },
    { icon: "🚀", title: "Launch", desc: "Deployment & release" },
    { icon: "🔄", title: "Iterate", desc: "Continuous improvement" },
  ];

  const techStack = {
    frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Angular", "Vue", "Svelte", "Tailwind", "Bootstrap"],
    backend: ["Node.js", "Python", "Java", "Go", "Ruby", "PHP", ".NET"],
    mobile: ["React Native", "Flutter", "Swift", "Kotlin"],
    emerging: ["AI/ML", "Blockchain", "IoT", "Cloud", "DevOps", "Cybersecurity"],
  };

  const testimonials = [
    {
      quote: "Exceptional work! Delivered our project ahead of schedule with outstanding quality.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      stars: 5,
    },
    {
      quote: "Professional team with deep expertise. They became our trusted development partner.",
      author: "Michael Chen",
      role: "Founder, HealthTech Solutions",
      stars: 5,
    },
    {
      quote: "Outstanding communication and technical skills. Highly recommended!",
      author: "Emily Davis",
      role: "Director, EduCorp",
      stars: 5,
    },
  ];

  const whyChooseUs = [
    {
      icon: "🎯",
      title: "Tailored Solutions",
      description: "Custom strategies aligned with your unique business goals",
    },
    {
      icon: "📊",
      title: "Project Management",
      description: "Agile methodology with transparent progress tracking",
    },
    {
      icon: "✅",
      title: "Quality Assurance",
      description: "Rigorous testing ensuring bug-free, scalable solutions",
    },
    {
      icon: "⭐",
      title: "Expertise & Experience",
      description: "12+ years delivering successful solutions across industries",
    },
  ];

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className="container">
            <div className={styles.headerTopContent}>
              <div className={styles.headerPhones}>
                <a href="tel:+971500000000">🇦🇪 +971 50 000 0000</a>
                <a href="tel:+919876543210">🇮🇳 +91 98765 43210</a>
              </div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
                Get a free consultation today!
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={styles.headerMain}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}>T</div>
              TechNova
            </Link>
            <nav className={styles.nav}>
              <Link href="/" className={styles.navLink}>Home</Link>
              <div className={styles.navItem}>
                <button className={styles.navLink}>
                  Services <span>▼</span>
                </button>
                <div className={styles.navDropdown}>
                  {/* Mobile Services */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>📱 Mobile App Development</div>
                    <Link href="/services" className={styles.dropdownSubLink}>iOS App Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Android Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>React Native Apps</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Flutter Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Cross-Platform Apps</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Mobile App Design</Link>
                  </div>
                  {/* Web Services */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🌐 Web Development</div>
                    <Link href="/services" className={styles.dropdownSubLink}>Frontend Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Backend Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>React.js Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Next.js Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>E-commerce Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>CMS Development</Link>
                  </div>
                  {/* Game Services */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🎮 Game Development</div>
                    <Link href="/services" className={styles.dropdownSubLink}>Unity Game Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Unreal Engine Games</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>2D Game Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>3D Game Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Multiplayer Games</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Game UI/UX Design</Link>
                  </div>
                  {/* AI & Blockchain */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🤖 AI & Blockchain</div>
                    <Link href="/services" className={styles.dropdownSubLink}>Machine Learning</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>AI Chatbots</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Blockchain Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Smart Contracts</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>NFT Marketplace</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Web3 Development</Link>
                  </div>
                  {/* Design Services */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🎨 Design Services</div>
                    <Link href="/services" className={styles.dropdownSubLink}>UI/UX Design</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Website Design</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Mobile App Design</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Brand Identity</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Logo Design</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Graphics Design</Link>
                  </div>
                  {/* Other Services */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>⚙️ Other Services</div>
                    <Link href="/services" className={styles.dropdownSubLink}>DevOps & Cloud</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Quality Assurance</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>API Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Cybersecurity</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Metaverse Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>AR/VR Solutions</Link>
                  </div>
                </div>
              </div>
              <Link href="/industries" className={styles.navLink}>Industries</Link>
              <Link href="/work" className={styles.navLink}>Portfolio</Link>
              <Link href="/about" className={styles.navLink}>Company</Link>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </nav>
            <div className={styles.headerActions}>
              <Link href="/contact" className="btn btn-primary">
                Share Your Requirement
              </Link>
              <Link href="/request-a-call" className="btn btn-secondary">
                Schedule a Call
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <video autoPlay loop muted playsInline>
            <source src="/PixVerse_V5.5_Image_Text_540P_A_cinematic_shotonline-video-cutter.com-ezgif.com-video-to-gif-converter.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot}></span>
              Premium IT & Software Development Company
            </div>
            <h1>
              Building <span>Innovative</span> Digital Solutions for Global Enterprises
            </h1>
            <p className={styles.heroSubtitle}>
              Transform your business with our end-to-end development services. From mobile apps 
              and web platforms to AI solutions and blockchain development — we deliver 
              scalable, secure, and cutting-edge technology.
            </p>
            <div className={styles.heroActions}>
              <Link href="/proposal" className="btn btn-primary">
                Share Your Requirement
              </Link>
              <Link href="/request-a-call" className="btn btn-secondary">
                Schedule a Call
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>2,500+</div>
                <div className={styles.statLabel}>Happy Clients</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>2,000+</div>
                <div className={styles.statLabel}>Apps Developed</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>1,000+</div>
                <div className={styles.statLabel}>Games Developed</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>12+</div>
                <div className={styles.statLabel}>Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className={styles.services} id="services">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Tap into Over a Decade of Expertise</h2>
            <p>
              With 12+ years of experience, we've helped startups and enterprises 
              transform their digital presence. Our team combines innovation, scalability, 
              and reliability to deliver solutions that drive real business growth.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AWARDS SECTION ===== */}
      <section className={styles.awards}>
        <div className="container">
          <div className={styles.awardsHeader}>
            <h3>Ranked Among the Top Web & App Development Companies</h3>
            <p>Recognized by leading industry platforms worldwide</p>
          </div>
          <div className={styles.awardsGrid}>
            {awards.map((award, index) => (
              <div key={index} className={styles.awardCard}>
                <div className={styles.awardLogo}>{award.name}</div>
                <span>{award.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST/PARTNERS SECTION ===== */}
      <section className={styles.trust}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h3>Our Esteemed Partners</h3>
          </div>
          <div className={styles.trustGrid}>
            {partners.map((partner, index) => (
              <div key={index} className={styles.trustItem}>
                <div className={styles.trustLogo}>{partner}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES SECTION ===== */}
      <section className={styles.industries}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Industries We Cater To</h2>
            <p>Delivering specialized solutions across diverse sectors</p>
          </div>
          <div className={styles.industriesGrid}>
            {industries.map((industry, index) => (
              <div key={index} className={styles.industryCard}>
                <div className={styles.industryIcon}>{industry.icon}</div>
                <h4>{industry.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section className={styles.portfolio}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Portfolio — Results That Speak</h2>
            <p>Explore our success stories and delivered projects</p>
          </div>
          <div className={styles.portfolioTabs}>
            {["all", "mobile", "web", "game", "blockchain", "ai"].map((tab) => (
              <button
                key={tab}
                className={`${styles.portfolioTab} ${activeTab === tab ? styles.active : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className={styles.portfolioGrid}>
            {portfolio
              .filter((item) => activeTab === "all" || item.category === activeTab)
              .slice(0, 6)
              .map((item, index) => (
                <div key={index} className={styles.portfolioCard}>
                  <div className={styles.portfolioImage}>📱</div>
                  <div className={styles.portfolioContent}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className={styles.portfolioTags}>
                      {item.tags.map((tag, i) => (
                        <span key={i} className={styles.portfolioTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className={styles.process}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>How It Works</h2>
            <p>Our streamlined development process ensures success</p>
          </div>
          <div className={styles.processSteps}>
            {processSteps.map((step, index) => (
              <div key={index} className={styles.processStep}>
                <div className={styles.processIcon}>{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UPWORK SECTION ===== */}
      <section className={styles.upwork}>
        <div className="container">
          <div className={styles.upworkContent}>
            <div>
              <h2 style={{ color: "white", fontSize: "32px", marginBottom: "12px" }}>
                Top-Rated Upwork Partner
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
                Join 1,800+ satisfied clients who trusted us with their projects
              </p>
            </div>
            <div className={styles.upworkStats}>
              <div className={styles.upworkStat}>
                <div className={styles.upworkStatNumber}>1,800+</div>
                <div className={styles.upworkStatLabel}>Jobs Completed</div>
              </div>
              <div className={styles.upworkStat}>
                <div className={styles.upworkStatNumber}>$9M+</div>
                <div className={styles.upworkStatLabel}>Earned</div>
              </div>
              <div className={styles.upworkStat}>
                <div className={styles.upworkStatNumber}>Top 3%</div>
                <div className={styles.upworkStatLabel}>Talent Worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECH STACK SECTION ===== */}
      <section className={styles.techStack}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Technology Stack</h2>
            <p>Modern tools and frameworks for powerful solutions</p>
          </div>
          <div className={styles.techCategories}>
            <div className={styles.techCategory}>
              <h3>
                <span>🎨</span> Frontend
              </h3>
              <div className={styles.techGrid}>
                {techStack.frontend.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={styles.techCategory}>
              <h3>
                <span>⚙️</span> Backend & Database
              </h3>
              <div className={styles.techGrid}>
                {techStack.backend.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={styles.techCategory}>
              <h3>
                <span>🚀</span> Mobile & Emerging
              </h3>
              <div className={styles.techGrid}>
                {techStack.mobile.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
                {techStack.emerging.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Ready to Create an Impact?</h2>
          <p>Let's discuss your project and turn your vision into reality</p>
          <Link href="/proposal" className="btn btn-accent">
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className={styles.whyChooseUs}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why Choose TechNova?</h2>
            <p>Partner with a team committed to your success</p>
          </div>
          <div className={styles.whyGrid}>
            {whyChooseUs.map((item, index) => (
              <div key={index} className={styles.whyCard}>
                <div className={styles.whyIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>What Our Clients Say</h2>
            <p>Trusted by businesses worldwide</p>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {"★".repeat(testimonial.stars)}
                </div>
                <p>"{testimonial.quote}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className={styles.testimonialInfo}>
                    <h4>{testimonial.author}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className={styles.contact}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Let's Work Together</h2>
              <p>
                Tell us about your project and we'll help bring your ideas to life.
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className={styles.contactLocations}>
                <div className={styles.contactLocation}>
                  <h4>🇦🇪 Dubai, UAE</h4>
                  <p>Business Bay, Dubai</p>
                </div>
                <div className={styles.contactLocation}>
                  <h4>🇮🇳 India</h4>
                  <p>Mohali, Punjab</p>
                </div>
              </div>
            </div>
            <form className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Name *</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input type="email" placeholder="you@company.com" required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 555 000 0000" />
              </div>
              <div className={styles.formGroup}>
                <label>Project Description *</label>
                <textarea rows={4} placeholder="Tell us about your project..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                Send Message
              </button>
              <div className={styles.formNote}>
                🔒 Your information is secure. We sign NDAs for all projects.
              </div>
            </form>
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
                <li><Link href="#">Mobile Development</Link></li>
                <li><Link href="#">Web Development</Link></li>
                <li><Link href="#">Game Development</Link></li>
                <li><Link href="#">AI Solutions</Link></li>
                <li><Link href="#">Blockchain</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Industries</h4>
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
                <li><Link href="#">Help Center</Link></li>
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Terms of Service</Link></li>
                <li><Link href="#">Sitemap</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2024 TechNova Solutions. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== CHATBOT ===== */}
      <div className={styles.chatbot}>
        <div className={styles.chatbotGreeting}>
          👋 Hi! How can we help you today?
        </div>
        <button className={styles.chatbotButton}>💬</button>
      </div>
    </div>
  );
}

