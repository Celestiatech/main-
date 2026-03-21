"use client";

import { useState, useEffect, useRef, lazy, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackCTAClick, useScrollTracking } from "@/lib/analytics";
import styles from "./page.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Lazy load Chatbot component
const Chatbot = lazy(() => import("./components/Chatbot"));

export default function Home() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState("startup");

  // Track scroll depth
  useScrollTracking(pathname || "/");

  // Scroll animation observer
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(".animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-in");
    animatedElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const services = [
    {
      icon: "/images/icons/mobile-development.svg",
      title: "Mobile App Development",
      whoFor: "For startups & enterprises",
      businessResult: "Launch in 60–90 days",
      metric: "Avg. 35% faster go-to-market | 42% higher user retention",
      description: "Monetization-ready apps with exceptional UX",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/web-development.svg",
      title: "Web Development",
      whoFor: "For businesses & agencies",
      businessResult: "Scalable platforms in 45–75 days",
      metric: "300% faster load times | 40% cost reduction",
      description: "Modern web applications with cutting-edge tech",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/game-development.svg",
      title: "Game Development",
      whoFor: "For indie developers & studios",
      businessResult: "Viral games in 90–120 days",
      metric: "1M+ downloads | 4.8 rating on app stores",
      description: "Engaging 2D/3D games across platforms",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/blockchain-development.svg",
      title: "Blockchain Development",
      whoFor: "For fintech & startups",
      businessResult: "Secure solutions in 60–90 days",
      metric: "Zero security breaches | $50M+ assets secured",
      description: "Web3 apps, smart contracts, and DeFi platforms",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/devops-services.svg",
      title: "DevOps Services",
      whoFor: "For tech teams & enterprises",
      businessResult: "50% faster deployments",
      metric: "70% faster CI/CD | 60% fewer downtime incidents",
      description: "CI/CD pipelines and cloud automation",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/metaverse-development.svg",
      title: "Metaverse Development",
      whoFor: "For brands & innovators",
      businessResult: "Immersive experiences in 90–120 days",
      metric: "200% engagement increase | 85% user satisfaction",
      description: "VR/AR worlds and virtual reality solutions",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/quality-assurance.svg",
      title: "Quality Assurance",
      whoFor: "For all development projects",
      businessResult: "Bug-free launches guaranteed",
      metric: "99.9% bug-free releases | 100% compliance rate",
      description: "Comprehensive testing and QA services",
      cta: "View Live Apps",
    },
  ];

  const awards = [
    { name: "Upwork", badge: "Top Rated Plus", logo: "/images/awards/upwork.png" },
    { name: "Clutch", badge: "B2B Leader 2024", logo: "/images/awards/clutch.png" },
    { name: "TechReviewer", badge: "Best Developer", logo: "/images/awards/software-developers.png" },
    { name: "GoodFirms", badge: "Excellence Award", logo: "/images/awards/goodfirms.png" },
    { name: "AppFutura", badge: "Verified Partner", logo: "/images/awards/top-company.png" },
  ];

  const partners = [
    { name: "Google", logo: "/images/partners/google.svg" },
    { name: "Microsoft", logo: "/images/partners/microsoft.svg" },
    { name: "Amazon", logo: "/images/partners/amazon.svg" },
    { name: "Meta", logo: "/images/partners/meta.svg" },
    { name: "Apple", logo: "/images/partners/apple.svg" },
    { name: "Netflix", logo: "/images/partners/netflix.svg" },
  ];

  const industries = [
    { icon: "education.svg", name: "Education" },
    { icon: "travel.svg", name: "Travel" },
    { icon: "social-networking.svg", name: "Social Networking" },
    { icon: "fitness.svg", name: "Fitness" },
    { icon: "education.svg", name: "Business" },
    { icon: "travel.svg", name: "Logistics" },
    { icon: "social-networking.svg", name: "Dating" },
    { icon: "fitness.svg", name: "Healthcare" },
    { icon: "education.svg", name: "Real Estate" },
    { icon: "travel.svg", name: "On-Demand" },
    { icon: "fitness.svg", name: "Utility" },
    { icon: "social-networking.svg", name: "Entertainment" },
  ];

  const portfolio = [
    {
      category: "mobile",
      title: "HealthTrack Pro",
      clientGoal: "Increase user engagement in fitness apps",
      problem: "Low retention rates and lack of personalized insights",
      solution: "Built AI-powered fitness tracking with personalized recommendations",
      techStack: ["React Native", "Node.js", "TensorFlow"],
      result: "<img src='/images/icons/chart-growth.svg' alt='Growth' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />Increased user retention by 42% | <img src='/images/icons/chart-growth.svg' alt='Revenue' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />Generated ₹3.2 Cr revenue in 6 months",
      beforeAfter: ["/images/portfolio/healthtrack-before.jpg", "/images/portfolio/healthtrack-after.jpg"],
      video: "/videos/healthtrack-demo.mp4",
      tags: ["iOS", "Android", "Health"],
    },
    {
      category: "web",
      title: "EduLearn Platform",
      clientGoal: "Scale e-learning platform to 100K+ users",
      problem: "Outdated tech stack causing performance issues",
      solution: "Migrated to modern React/Node.js with AWS scaling",
      techStack: ["React", "Node.js", "AWS", "MongoDB"],
      result: "<img src='/images/icons/launch.svg' alt='Speed' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />300% faster load times | <img src='/images/icons/tailored-solutions.svg' alt='Users' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />Served 100K+ students",
      beforeAfter: ["/images/portfolio/edulearn-before.jpg", "/images/portfolio/edulearn-after.png"],
      video: "/videos/edulearn-demo.mp4",
      tags: ["React", "Node.js", "AWS"],
    },
    {
      category: "game",
      title: "Space Quest",
      clientGoal: "Launch viral mobile game",
      problem: "Generic gameplay leading to quick abandonment",
      solution: "Developed immersive 3D space adventure with multiplayer",
      techStack: ["Unity", "C#", "Photon"],
      result: "<img src='/images/icons/mobile-development.svg' alt='Downloads' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />1M+ downloads | <img src='/images/icons/expertise.svg' alt='Rating' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />4.8 rating on app stores",
      beforeAfter: ["/images/portfolio/spacequest-before.jpg", "/images/portfolio/spacequest-after.jpg"],
      video: "/videos/spacequest-demo.mp4",
      tags: ["Unity", "3D", "Mobile"],
    },
    {
      category: "blockchain",
      title: "CryptoVault",
      clientGoal: "Build secure DeFi platform",
      problem: "Complex smart contracts with security vulnerabilities",
      solution: "Developed audited smart contracts with user-friendly interface",
      techStack: ["Solidity", "Web3.js", "React"],
      result: "<img src='/images/icons/security.svg' alt='Security' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />Zero security breaches | <img src='/images/icons/chart-growth.svg' alt='Assets' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />$50M+ assets secured",
      beforeAfter: ["/images/portfolio/cryptovault-before.jpg", "/images/portfolio/cryptovault-after.jpg"],
      video: "/videos/cryptovault-demo.mp4",
      tags: ["Web3", "Solidity", "DeFi"],
    },
    {
      category: "ai",
      title: "SmartAssist AI",
      clientGoal: "Automate customer support",
      problem: "High support costs and slow response times",
      solution: "Built NLP-powered chatbot with 24/7 availability",
      techStack: ["Python", "TensorFlow", "Dialogflow"],
      result: "<img src='/images/icons/launch.svg' alt='Speed' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />70% faster responses | <img src='/images/icons/chart-growth.svg' alt='Savings' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />Saved ₹2 Cr annually",
      beforeAfter: ["/images/portfolio/smartassist-before.jpg", "/images/portfolio/smartassist-after.jpg"],
      video: "/videos/smartassist-demo.mp4",
      tags: ["NLP", "Machine Learning"],
    },
    {
      category: "design",
      title: "BrandRebrand",
      clientGoal: "Modernize brand identity",
      problem: "Outdated design hurting market perception",
      solution: "Complete brand redesign with modern UI/UX",
      techStack: ["Figma", "Adobe Creative Suite", "React"],
      result: "<img src='/images/icons/chart-growth.svg' alt='Growth' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />150% increase in brand recognition | <img src='/images/icons/concept.svg' alt='Awards' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />Won 3 design awards",
      beforeAfter: ["/images/portfolio/brandrebrand-before.jpg", "/images/portfolio/brandrebrand-after.jpg"],
      video: "/videos/brandrebrand-demo.mp4",
      tags: ["UI/UX", "Branding"],
    },
  ];

  const processSteps = [
    {
      icon: "/images/icons/idea.svg",
      title: "Idea",
      desc: "Concept & vision",
      details: "We start by understanding your vision, goals, and requirements. Our team conducts thorough research, market analysis, and feasibility studies to transform your idea into a solid foundation for development."
    },
    {
      icon: "/images/icons/concept.svg",
      title: "Concept",
      desc: "Wireframes & design",
      details: "We create detailed wireframes, user flows, and interactive prototypes. Our design team develops the visual identity, user experience, and interface that will make your product intuitive and engaging."
    },
    {
      icon: "/images/icons/plan.svg",
      title: "Plan",
      desc: "Strategy & roadmap",
      details: "We develop a comprehensive project roadmap with timelines, milestones, and resource allocation. Our technical architects design the system architecture and select the best technologies for your project."
    },
    {
      icon: "/images/icons/develop.svg",
      title: "Develop",
      desc: "Agile development",
      details: "Our development team uses agile methodologies to build your solution iteratively. We maintain regular communication, conduct code reviews, and ensure quality at every stage of development."
    },
    {
      icon: "/images/icons/launch.svg",
      title: "Launch",
      desc: "Deployment & release",
      details: "We handle the complete deployment process, including testing, optimization, and launch. Our team ensures smooth transition to production with monitoring and support for the initial launch phase."
    },
    {
      icon: "/images/icons/iterate.svg",
      title: "Iterate",
      desc: "Continuous improvement",
      details: "Post-launch, we monitor performance, gather user feedback, and continuously improve the product. Our team provides ongoing maintenance, updates, and feature enhancements based on user needs."
    },
  ];

  const techStack = {
    frontend: [
      { name: "HTML5", icon: "/images/tech/html5.svg" },
      { name: "CSS3", icon: "/images/tech/css3.svg" },
      { name: "JavaScript", icon: "/images/tech/javascript.svg" },
      { name: "TypeScript", icon: "/images/tech/typescript.svg" },
      { name: "React", icon: "/images/tech/react.svg" },
      { name: "Angular", icon: "/images/tech/angular.svg" },
      { name: "Vue", icon: "/images/tech/vuedotjs.svg" },
      { name: "Svelte", icon: "/images/tech/svelte.svg" },
      { name: "Tailwind", icon: "/images/tech/tailwindcss.svg" },
      { name: "Bootstrap", icon: "/images/tech/bootstrap.svg" },
    ],
    backend: [
      { name: "Node.js", icon: "/images/tech/nodejs.svg" },
      { name: "Python", icon: "/images/tech/python.svg" },
      { name: "Java", icon: "/images/tech/java.svg" },
      { name: "Go", icon: "/images/tech/go.svg" },
      { name: "Ruby", icon: "/images/tech/ruby.svg" },
      { name: "PHP", icon: "/images/tech/php.svg" },
      { name: ".NET", icon: "/images/tech/dotnet.svg" },
    ],
    mobile: [
      { name: "React Native", icon: "/images/tech/reactnative.svg" },
      { name: "Flutter", icon: "/images/tech/flutter.svg" },
      { name: "Swift", icon: "/images/tech/swift.svg" },
      { name: "Kotlin", icon: "/images/tech/kotlin.svg" },
    ],
    emerging: [
      { name: "AI/ML", icon: "/images/tech/tensorflow.svg" },
      { name: "Blockchain", icon: "/images/tech/ethereum.svg" },
      { name: "IoT", icon: "/images/tech/iot.svg" },
      { name: "Cloud", icon: "/images/tech/googlecloud.svg" },
      { name: "DevOps", icon: "/images/tech/docker.svg" },
      { name: "Cybersecurity", icon: "/images/tech/cybersecurity.svg" },
    ],
  };

  const testimonials = [
    {
      quote: "Celestiatech rebuilt our SaaS backend and cut infra cost by 38%. Their DevOps expertise is unmatched.",
      author: "CTO, US-based HealthTech Startup",
      service: "DevOps Services",
      stars: 5,
      avatar: "/images/testimonials/healthtech-cto.svg",
    },
    {
      quote: "From MVP to 100K users in 6 months. Celestiatech's mobile app development delivered exactly what we needed.",
      author: "Founder, EduTech Platform",
      service: "Mobile App Development",
      stars: 5,
      avatar: "/images/testimonials/edutech-founder.svg",
    },
    {
      quote: "Their blockchain team secured $50M+ in assets. Zero breaches, full compliance. Highly professional.",
      author: "CEO, FinTech Company",
      service: "Blockchain Development",
      stars: 5,
      avatar: "/images/testimonials/fintech-ceo.svg",
    },
  ];

  const whyChooseUs = [
    {
      icon: "/images/whychoose/tailored-solutions.jpg",
      title: "Tailored Solutions",
      description: "Custom strategies aligned with your unique business goals",
    },
    {
      icon: "/images/whychoose/project-management.png",
      title: "Project Management",
      description: "Agile methodology with transparent progress tracking",
    },
    {
      icon: "/images/whychoose/quality-assurance.png",
      title: "Quality Assurance",
      description: "Rigorous testing ensuring bug-free, scalable solutions",
    },
    {
      icon: "/images/whychoose/expertise-experience.png",
      title: "Expertise & Experience",
      description: "12+ years delivering successful solutions across industries",
    },
  ];

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <Header />
      <main id="main-content" className={styles.main} tabIndex={-1}>

      {/* ===== HERO SECTION ===== */}
      <section className={`${styles.hero} ${styles.heroRedesign}`} data-debug="hero-section">
        {/* Ambient sparkle decorations — matching reference image positions */}
        <span className={`${styles.sparkle} ${styles.sparkle1}`} aria-hidden="true">✦</span>
        <span className={`${styles.sparkle} ${styles.sparkle2}`} aria-hidden="true">✦</span>
        <span className={`${styles.sparkle} ${styles.sparkle3}`} aria-hidden="true">✦</span>
        <span className={`${styles.sparkle} ${styles.sparkle4}`} aria-hidden="true">✦</span>
        <span className={`${styles.sparkle} ${styles.sparkle5}`} aria-hidden="true">✦</span>

        <div className={`${styles.heroRedesignInner} container`}>

          {/* ── Two stacked pill badges, top-right (RE Production / 2024.09) ── */}
          <div className={styles.heroBadgeStack}>
            <span className={styles.heroBadgeTop}>RE Production</span>
            <span className={styles.heroBadgeBottom}>2024.09</span>
          </div>

          {/* ── Three-line headline matching reference exactly ── */}
          <div className={styles.heroHeadlineWrap}>
            <h1 className={styles.heroRedesignTitle}>
              {/* Line 1: "Level Up Your ✦" */}
              <span className={styles.heroLine1}>
                Level Up Your
                <span className={styles.heroSparkleSmall} aria-hidden="true">✦</span>
              </span>
              {/* Line 2: "Design [orange pill ✦] with Our" */}
              <span className={styles.heroLine2}>
                Design{" "}
                <span className={styles.heroOrangePill} aria-hidden="true">
                  <span className={styles.heroOrangePillStar}>✦</span>
                </span>
                {" "}with Our
              </span>
              {/* Line 3: "[purple swirl] ✦ Design Class ✦" */}
              <span className={styles.heroLine3}>
                <svg
                  className={styles.heroArc}
                  viewBox="0 0 90 56"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Purple decorative swirl/arc matching reference */}
                  <path
                    d="M80 12 C60 4, 20 20, 8 44"
                    stroke="#7C3AED"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M8 44 C10 36, 18 32, 24 28"
                    stroke="#7C3AED"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <span className={styles.heroSparkleSmall} aria-hidden="true">✦</span>
                {" "}Design Class
                <span className={styles.heroSparkleSmall} aria-hidden="true">✦</span>
              </span>
            </h1>
          </div>

          {/* ── Stats (left) + Join us button (right) ── */}
          <div className={styles.heroStatsRow}>
            <div className={styles.heroStatItem}>
              <span className={styles.heroStatLabel}>With more than</span>
              <span className={styles.heroStatValue}>2K + MEMBERS</span>
              <span className={styles.heroStatValue}>500 + TUTORIALS</span>
            </div>
            <Link
              href="/proposal"
              className={styles.heroJoinBtn}
              onClick={() => trackCTAClick("Join Us", "hero", pathname || "/")}
            >
              <span>Join us</span>
              <span className={styles.heroJoinBtnBox} aria-hidden="true">↗</span>
            </Link>
          </div>

          {/* ── Scrollable 3D-style icon cards with purple circle arrow buttons ── */}
          <div className={styles.heroCarouselWrap}>
            <button
              className={styles.heroCarouselArrow}
              aria-label="Previous"
              onClick={() => {
                const el = document.getElementById("heroCarousel");
                if (el) el.scrollBy({ left: -178, behavior: "smooth" });
              }}
            >
              ←
            </button>
            <div id="heroCarousel" className={styles.heroCarousel}>
              {[
                { bg: "#F9A8D4", emoji: "💡", label: "Creative Ideas" },
                { bg: "#C4B5FD", emoji: "✏️", label: "UI Design" },
                { bg: "#67E8F9", emoji: "🖼️", label: "Visual Design" },
                { bg: "#FCD34D", emoji: "🖊️", label: "Illustration" },
                { bg: "#86EFAC", emoji: "🎯", label: "Strategy" },
                { bg: "#FCA5A5", emoji: "🎬", label: "Motion" },
              ].map((card, i) => (
                <div key={i} className={styles.heroServiceCard} style={{ background: card.bg }}>
                  <span className={styles.heroServiceCardEmoji} role="img" aria-label={card.label}>{card.emoji}</span>
                </div>
              ))}
            </div>
            <button
              className={styles.heroCarouselArrow}
              aria-label="Next"
              onClick={() => {
                const el = document.getElementById("heroCarousel");
                if (el) el.scrollBy({ left: 178, behavior: "smooth" });
              }}
            >
              →
            </button>
          </div>

        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className={styles.services} id="services">
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Tap into Over a Decade of Expertise</h2>
            <p>
              With 12+ years of experience, we've helped startups and enterprises 
              transform their digital presence. Our team combines innovation, scalability, 
              and reliability to deliver solutions that drive real business growth.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={`${styles.serviceCard} service-card-enhanced animate-on-scroll stagger-${(index % 4) + 1}`}>
                <div className={styles.serviceIcon}>
                  <img src={service.icon} alt={service.title} width={80} height={80} loading="lazy" />
                </div>
                <h3>{service.title}</h3>
                <div className={styles.serviceWhoFor}>
                  <img src="/images/icons/tailored-solutions.svg" alt="Target audience" width={16} height={16} style={{ marginRight: '8px' }} loading="lazy" />
                  {service.whoFor}
                </div>
                <div className={styles.serviceResult}>
                  <img src="/images/icons/chart-growth.svg" alt="Business result" width={16} height={16} style={{ marginRight: '8px' }} loading="lazy" />
                  {service.businessResult}
                </div>
                <div className={styles.serviceMetric}>
                  <span>{service.metric.split('|')[0].trim()}</span>
                  <span>{service.metric.split('|')[1].trim()}</span>
                </div>
                <p className={styles.serviceDescription}>{service.description}</p>
                <Link href="/work" className="btn btn-primary btn-sm">{service.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AWARDS SECTION ===== */}
      <section className={styles.awards}>
        <div className="container">
          <div className={`${styles.awardsHeader} animate-on-scroll`}>
            <h3>Ranked Among the Top Web & App Development Companies</h3>
            <p>Recognized by leading industry platforms worldwide</p>
          </div>
          <div className={styles.awardsGrid}>
            {awards.map((award, index) => (
              <div key={index} className={`${styles.awardCard} animate-scale-in stagger-${(index % 5) + 1}`}>
                <div className={styles.awardLogo}>
                  <Image src={award.logo} alt={award.name} width={80} height={80} loading="lazy" />
                </div>
                <span className={styles.awardBadge}>{award.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST/PARTNERS SECTION ===== */}
      <section className={styles.trust}>
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h3>Our Esteemed Partners</h3>
          </div>
          <div className={styles.trustGrid}>
            {partners.map((partner, index) => (
              <div key={index} className={`${styles.trustItem} animate-on-scroll stagger-${(index % 6) + 1}`}>
                <div className={styles.trustLogo}>
                  <Image src={partner.logo} alt={partner.name} width={120} height={40} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES SECTION ===== */}
      <section className={styles.industries}>
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Blogs We Cater To</h2>
            <p>Delivering specialized solutions across diverse sectors</p>
          </div>
          <div className={styles.industriesGrid}>
            {industries.map((industry, index) => (
              <div key={index} className={`${styles.industryCard} animate-on-scroll stagger-${(index % 6) + 1}`}>
                <div className={styles.industryIcon}>
                  <Image src={`/images/icons/${industry.icon || 'default.svg'}`} alt={industry.name} width={60} height={60} loading="lazy" />
                </div>
                <h4>{industry.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section className={styles.portfolio}>
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Our Portfolio — Results That Speak</h2>
            <p>Explore our success stories and delivered projects</p>
          </div>
          <div className={`${styles.portfolioTabs} animate-on-scroll`}>
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
                <div key={index} className={`${styles.portfolioCard} animate-on-scroll stagger-${(index % 3) + 1}`}>
                  <div className={styles.portfolioImage}>
                    <Image
                      src={item.beforeAfter[0]}
                      alt={`${item.title} before`}
                      width={300}
                      height={200}
                      className={styles.portfolioBeforeImage}
                      loading="lazy"
                    />
                    <Image
                      src={item.beforeAfter[1]}
                      alt={`${item.title} after`}
                      width={300}
                      height={200}
                      className={styles.portfolioAfterImage}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.portfolioContent}>
                    <h3>{item.title}</h3>
                    <div className={styles.portfolioCaseStudy}>
                      <div className={styles.caseStudyItem}>
                        <strong><Image src="/images/icons/idea.svg" alt="Goal" width={16} height={16} style={{ marginRight: '8px', display: 'inline' }} loading="lazy" />Client Goal:</strong> {item.clientGoal}
                      </div>
                      <div className={styles.caseStudyItem}>
                        <strong><Image src="/images/icons/expertise.svg" alt="Problem" width={16} height={16} style={{ marginRight: '8px', display: 'inline' }} loading="lazy" />Problem:</strong> {item.problem}
                      </div>
                      <div className={styles.caseStudyItem}>
                        <strong><Image src="/images/icons/concept.svg" alt="Solution" width={16} height={16} style={{ marginRight: '8px', display: 'inline' }} loading="lazy" />Solution:</strong> {item.solution}
                      </div>
                      <div className={styles.caseStudyItem}>
                        <strong><Image src="/images/icons/develop.svg" alt="Tech Stack" width={16} height={16} style={{ marginRight: '8px', display: 'inline' }} loading="lazy" />Tech Stack:</strong> {item.techStack.join(", ")}
                      </div>
                      <div className={styles.caseStudyResult}>
                        <strong><Image src="/images/icons/chart-growth.svg" alt="Result" width={16} height={16} style={{ marginRight: '8px', display: 'inline' }} loading="lazy" />Result:</strong> <span dangerouslySetInnerHTML={{ __html: item.result }} />
                      </div>
                    </div>
                    <div className={styles.portfolioTags}>
                      {item.tags.map((tag, i) => (
                        <span key={i} className={styles.portfolioTag}>{tag}</span>
                      ))}
                    </div>
                    <div className={styles.portfolioActions}>
                      <p className={styles.portfolioContact}>
                        Contact us for a brief walkthrough of this project.
                      </p>
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
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>How It Works</h2>
            <p>Our streamlined development process ensures success</p>
          </div>
          <div className={styles.processSteps}>
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`${styles.processStep} animate-on-scroll stagger-${(index % 6) + 1}`}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className={styles.processIcon}>
                  <Image src={step.icon} alt={step.title} width={70} height={70} loading="lazy" />
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
                {hoveredStep === index && (
                  <div className={`${styles.processDetails} ${styles.visible}`}>
                    <p>{step.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UPWORK SECTION ===== */}
      <section className={styles.upwork}>
        <div className="container">
          <div className={`${styles.upworkContent} animate-on-scroll`}>
            <div>
              <h2 style={{ color: "white", fontSize: "32px", marginBottom: "12px" }}>
                Top-Rated Upwork Partner
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
                Join 1,800+ satisfied clients who trusted us with their projects
              </p>
            </div>
            <div className={styles.upworkStats}>
              <div className={`${styles.upworkStat} statCardAnimate`}>
                <div className={styles.upworkStatNumber}>1,800+</div>
                <div className={styles.upworkStatLabel}>Jobs Completed</div>
              </div>
              <div className={`${styles.upworkStat} statCardAnimate`}>
                <div className={styles.upworkStatNumber}>$9M+</div>
                <div className={styles.upworkStatLabel}>Earned</div>
              </div>
              <div className={`${styles.upworkStat} statCardAnimate`}>
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
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Technology Stack</h2>
            <p>Modern tools and frameworks for powerful solutions</p>
          </div>
          <div className={styles.techCategories}>
            <div className={`${styles.techCategory} animate-on-scroll stagger-1`}>
              <h3>
                <Image src="/images/icons/develop.svg" alt="Frontend" width={20} height={20} style={{ marginRight: '8px', display: 'inline' }} loading="lazy" />
                Frontend
              </h3>
              <div className={styles.techGrid}>
                {techStack.frontend.map((tech, index) => (
                  <span key={index} className={`${styles.techTag} ${styles.techTagWithIcon}`}>
                    <Image src={tech.icon} alt={tech.name} width={18} height={18} className={styles.techTagIcon} loading="lazy" />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
            <div className={`${styles.techCategory} animate-on-scroll stagger-2`}>
              <h3>
                <Image src="/images/icons/expertise.svg" alt="Backend" width={20} height={20} style={{ marginRight: '8px', display: 'inline' }} loading="lazy" />
                Backend & Database
              </h3>
              <div className={styles.techGrid}>
                {techStack.backend.map((tech, index) => (
                  <span key={index} className={`${styles.techTag} ${styles.techTagWithIcon}`}>
                    <Image src={tech.icon} alt={tech.name} width={18} height={18} className={styles.techTagIcon} loading="lazy" />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
            <div className={`${styles.techCategory} animate-on-scroll stagger-3`}>
              <h3>
                <Image src="/images/icons/mobile-development.svg" alt="Mobile" width={20} height={20} style={{ marginRight: '8px', display: 'inline' }} loading="lazy" />
                Mobile & Emerging
              </h3>
              <div className={styles.techGrid}>
                {techStack.mobile.map((tech, index) => (
                  <span key={index} className={`${styles.techTag} ${styles.techTagWithIcon}`}>
                    <Image src={tech.icon} alt={tech.name} width={18} height={18} className={styles.techTagIcon} loading="lazy" />
                    {tech.name}
                  </span>
                ))}
                {techStack.emerging.map((tech, index) => (
                  <span key={index} className={`${styles.techTag} ${styles.techTagWithIcon}`}>
                    <Image src={tech.icon} alt={tech.name} width={18} height={18} className={styles.techTagIcon} loading="lazy" />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>

        <div className="container">
          <div className="animate-on-scroll">
            <h2>Ready to Create an Impact?</h2>
            <p>Let&apos;s discuss your project and turn your vision into reality</p>
            <Link 
              href="/proposal" 
              className="btn btn-accent btn-3d"
              onClick={() => trackCTAClick("Get Free Consultation", "cta_section")}
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className={styles.whyChooseUs}>
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Why Choose Celestiatech?</h2>
            <p>Partner with a team committed to your success</p>
          </div>
          <div className={styles.whyGrid}>
            {whyChooseUs.map((item, index) => (
              <div key={index} className={`${styles.whyCard} animate-on-scroll stagger-${(index % 4) + 1}`}>
                <div className={styles.whyIcon}>
                  <Image src={item.icon} alt={item.title} width={70} height={70} className={styles.iconImage} loading="lazy" />
                </div>
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
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>What Our Clients Say</h2>
            <p>Trusted by businesses worldwide</p>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`${styles.testimonialCard} animate-on-scroll stagger-${(index % 3) + 1}`}>
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
                    <span>{testimonial.service}</span>
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
            <div className={`${styles.contactInfo} animate-slide-left`}>
              <h2>Let's Work Together</h2>
              <p>
                Tell us about your project and we'll help bring your ideas to life.
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className={styles.contactLocations}>
                <div className={styles.contactLocation}>
                  <h4><Image src="/images/icons/location-pin.svg" alt="Location" width={16} height={16} style={{ marginRight: '8px', display: 'inline' }} loading="lazy" />Dubai, UAE</h4>
                  <p>Business Bay, Dubai</p>
                </div>
                <div className={styles.contactLocation}>
                  <h4><Image src="/images/icons/location-pin.svg" alt="Location" width={16} height={16} style={{ marginRight: '8px', display: 'inline' }} loading="lazy" />India</h4>
                  <p>Mohali, Punjab</p>
                </div>
              </div>
              <div className={styles.contactChecklist}>
                <h4>Why contact us</h4>
                <ul>
                  <li className={styles.highlightItem}>Free 30-minute strategy call with senior consultants</li>
                  <li>Clear project timeline, scope, and delivery milestones</li>
                  <li>Transparent cost estimates and tech recommendations</li>
                  <li>Dedicated team options for fast execution</li>
                </ul>
              </div>
            </div>
            <form className={`${styles.contactForm} animate-slide-right`}>
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
              <button type="submit" className="btn btn-primary btn-ripple" style={{ width: "100%" }}>
                Send Message
              </button>
              <div className={styles.formNote}>
                <Image src="/images/icons/security.svg" alt="Security" width={14} height={14} style={{ marginRight: '6px', display: 'inline' }} loading="lazy" />Your information is secure. We sign NDAs for all projects.
              </div>
            </form>
          </div>
        </div>
      </section>

      </main>
      {/* ===== FOOTER ===== */}
      <Footer />

      {/* ===== CHATBOT ===== */}
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}

