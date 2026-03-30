"use client";

import { useState, useEffect, useRef, lazy, Suspense, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackCTAClick, useScrollTracking } from "@/lib/analytics";
import { CASE_STUDIES } from "@/lib/grocitoPortfolio";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
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
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 });
  const [revenueCount, setRevenueCount] = useState(0);

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

  useEffect(() => {
    let frameId = 0;
    const duration = 1800;
    const target = 148;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setRevenueCount(Math.round(target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const services = [
    {
      icon: "/images/icons/mobile-development.svg",
      title: "Mobile App Development",
      whoFor: "For startups & enterprise teams",
      businessResult: "Launch in 60–90 days",
      metric: "35% faster go-to-market | 42% higher retention",
      description: "iOS & Android apps built for scale, analytics, and monetization.",
      cta: "View Case Studies",
    },
    {
      icon: "/images/icons/web-development.svg",
      title: "Web Development",
      whoFor: "For businesses & agencies",
      businessResult: "Scalable platforms in 45–75 days",
      metric: "300% faster load times | 40% lower infra cost",
      description: "Modern web apps optimized for speed, security, and conversion.",
      cta: "View Case Studies",
    },
    {
      icon: "/images/icons/game-development.svg",
      title: "Game Development",
      whoFor: "For indie developers & studios",
      businessResult: "Viral games in 90–120 days",
      metric: "1M+ downloads | 4.8 rating on app stores",
      description: "Engaging 2D/3D experiences built for retention and revenue.",
      cta: "View Case Studies",
    },
    {
      icon: "/images/icons/blockchain-development.svg",
      title: "Blockchain Development",
      whoFor: "For fintech & startups",
      businessResult: "Secure solutions in 60–90 days",
      metric: "Zero security breaches | $50M+ assets secured",
      description: "Web3 apps, audited smart contracts, and DeFi platforms.",
      cta: "View Case Studies",
    },
    {
      icon: "/images/icons/devops-services.svg",
      title: "DevOps Services",
      whoFor: "For tech teams & enterprises",
      businessResult: "50% faster deployments",
      metric: "70% faster CI/CD | 60% fewer downtime incidents",
      description: "CI/CD pipelines, infra automation, and reliability engineering.",
      cta: "View Case Studies",
    },
    {
      icon: "/images/icons/metaverse-development.svg",
      title: "Metaverse Development",
      whoFor: "For brands & innovators",
      businessResult: "Immersive experiences in 90–120 days",
      metric: "200% engagement increase | 85% user satisfaction",
      description: "VR/AR worlds, 3D experiences, and immersive brand activations.",
      cta: "View Case Studies",
    },
    {
      icon: "/images/icons/quality-assurance.svg",
      title: "Quality Assurance",
      whoFor: "For all development projects",
      businessResult: "Bug-free launches guaranteed",
      metric: "99.9% bug-free releases | 100% compliance rate",
      description: "Automation, regression, and performance testing across devices.",
      cta: "View Case Studies",
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

  const industryHighlights = [
    {
      name: "Healthcare & Wellness",
      image: "/images/industry-showcase/healthcare_n_wellness.png",
      tint: "rgba(72, 219, 251, 0.08)",
      points: ["Trust-Centered Design", "Booking Systems", "Mobile-Optimized"],
    },
    {
      name: "Food & Restaurant",
      image: "/images/industry-showcase/food_n_restourant.png",
      tint: "rgba(255, 159, 67, 0.08)",
      points: ["Visuals & Engaging UX", "Ordering Systems", "Local SEO & Reviews"],
    },
    {
      name: "Education & E-Learning",
      image: "/images/industry-showcase/eduction_n_elearning.png",
      tint: "rgba(46, 213, 115, 0.08)",
      points: ["Interactive Interfaces", "LMS & User Management", "Scalable & Accessible"],
    },
    {
      name: "Startups & SMEs",
      image: "/images/industry-showcase/startup_n_smes.png",
      tint: "rgba(255, 71, 167, 0.08)",
      points: ["Growth & Scalable Design", "Conversion Friendly", "Fast Ongoing Support"],
    },
    {
      name: "Real Estate",
      image: "/images/industry-showcase/realstate.png",
      tint: "rgba(78, 45, 218, 0.08)",
      points: ["Industry-Specific Design", "SEO & Local Optimization", "Mobile-First & Performance"],
    },
    {
      name: "E-commerce & Retail",
      image: "/images/industry-showcase/ecommerce_n_retail.png",
      tint: "rgba(255, 107, 107, 0.08)",
      points: ["Conversion-Focused Design", "Seamless Experience", "Scalable Custom Features"],
    },
  ];

  const industryCarouselItems = [...industryHighlights, ...industryHighlights];

  // Transform CASE_STUDIES for homepage display
  const portfolio = CASE_STUDIES.map((study) => {
    // Format impacts as HTML result string
    const resultHtml = study.impacts
      .map((impact) => {
        const iconMap: Record<string, string> = {
          "Increased user retention by": "/images/icons/chart-growth.svg",
          "Generated revenue in 6 months": "/images/icons/chart-growth.svg",
          "300% faster load times": "/images/icons/launch.svg",
          "Served students": "/images/icons/tailored-solutions.svg",
          Downloads: "/images/icons/mobile-development.svg",
          "Rating on app stores": "/images/icons/expertise.svg",
          "Zero security breaches": "/images/icons/security.svg",
          "Assets secured": "/images/icons/chart-growth.svg",
          "70% faster responses": "/images/icons/launch.svg",
          "Saved annually": "/images/icons/chart-growth.svg",
          "Increase in brand recognition": "/images/icons/chart-growth.svg",
          "Design awards won": "/images/icons/concept.svg",
        };
        const icon = iconMap[impact.label] || "/images/icons/chart-growth.svg";
        return `<img src='${icon}' alt='${impact.label}' style='width:14px;height:14px;margin-right:4px;display:inline-block;vertical-align:middle;' />${impact.label} ${impact.value}`;
      })
      .join(" | ");

    return {
      category: study.category,
      title: study.title,
      clientGoal: study.subtitle,
      problem: study.problem,
      solution: study.solution,
      techStack: study.techStack,
      result: resultHtml,
      beforeAfter: [study.beforeImage, study.afterImage],
      tags: study.techStack.slice(0, 3),
    };
  });

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

  const heroFloatingBadges = [
    {
      key: "whatsapp",
      className: styles.heroFloatBadge1,
      iconClass: "fa-brands fa-whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/919876543210",
      offsetX: 18,
      offsetY: 14,
      rotate: 5,
      originX: -0.82,
      originY: -0.45,
    },
    {
      key: "call",
      className: styles.heroFloatBadge2,
      iconClass: "fa-solid fa-phone-volume",
      label: "Call Now",
      href: "tel:+919876543210",
      offsetX: -16,
      offsetY: 12,
      rotate: -4,
      originX: 0.82,
      originY: -0.18,
    },
    {
      key: "revenue",
      className: styles.heroFloatBadge3,
      iconClass: "fa-solid fa-indian-rupee-sign",
      label: "Revenue",
      href: "/proposal",
      offsetX: 14,
      offsetY: -16,
      rotate: 6,
      originX: -0.78,
      originY: 0.68,
    },
    {
      key: "seo",
      className: styles.heroFloatBadge4,
      iconClass: "fa-solid fa-chart-line",
      label: "SEO Growth",
      href: "/services",
      offsetX: -20,
      offsetY: -14,
      rotate: -5,
      originX: 0.7,
      originY: 0.56,
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

  const testimonialCarouselItems = [...testimonials, ...testimonials];
  const testimonialRows = [
    [...testimonialCarouselItems, ...testimonialCarouselItems],
    [...testimonialCarouselItems].reverse().concat([...testimonialCarouselItems].reverse()),
    [...testimonialCarouselItems, ...testimonialCarouselItems],
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
      <section
        className={`${styles.hero} ${styles.heroRedesign}`}
        data-debug="hero-section"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
          setHeroPointer({ x, y });
        }}
        onMouseLeave={() => setHeroPointer({ x: 0, y: 0 })}
      >
        {heroFloatingBadges.map((badge) => (
          (() => {
            const distanceX = heroPointer.x - badge.originX;
            const distanceY = heroPointer.y - badge.originY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const influence = Math.max(0, 1 - distance / 1.1);
            const badgeStyle = {
              "--badge-shift-x": `${heroPointer.x * badge.offsetX * influence}px`,
              "--badge-shift-y": `${heroPointer.y * badge.offsetY * influence}px`,
              "--badge-rotate": `${heroPointer.x * badge.rotate * influence}deg`,
            } as CSSProperties;

            return (
              <Link
                key={badge.key}
                href={badge.href}
                className={`${styles.heroFloatBadge} ${badge.className}`}
                aria-label={badge.label}
                style={badgeStyle}
              >
                <span className={styles.heroFloatBadgeInner}>
                  <i className={badge.iconClass}></i>
                  <span>{badge.label}</span>
                </span>
              </Link>
            );
          })()
        ))}
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
              {/* Line 1: "Scale Your Brand ✦" */}
              <span className={styles.heroLine1}>
                Scale Your Brand
                <span className={styles.heroSparkleSmall} aria-hidden="true">✦</span>
              </span>
              {/* Line 2: "Web & App [orange pill ✦] with Our" */}
              <span className={styles.heroLine2}>
                Web & App{" "}
                <span className={styles.heroOrangePill} aria-hidden="true">
                  <span className={styles.heroOrangePillStar}>✦</span>
                </span>
                {" "}with Our
              </span>
              {/* Line 3: "[purple swirl] ✦ Specialist Studio ✦" */}
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
                {" "}Specialist Studio
                <span className={styles.heroSparkleSmall} aria-hidden="true">✦</span>
              </span>
            </h1>
          </div>

          {/* ── Stats (left) + Join us button (right) ── */}
          <div className={styles.heroStatsRow}>
            <div className={styles.heroStatItem}>
              <span className={styles.heroStatLabel}>Full-Stack Specialists</span>
              <span className={styles.heroStatValue}>Web • App • UI/UX</span>
              <span className={styles.heroStatValue}>SEO • Performance • Growth</span>
            </div>
            <div className={styles.heroMiniChart} aria-label="Growth snapshot">
              <div className={styles.heroMiniChartHeader}>
                <span className={styles.heroMiniChartLabel}>Revenue Growth</span>
                <span className={styles.heroMiniChartValue}>${revenueCount}K</span>
              </div>
              <svg
                className={styles.heroMiniChartSvg}
                viewBox="0 0 180 72"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 56 C30 54, 42 44, 58 46 C75 48, 82 34, 96 32 C112 30, 122 16, 144 18 C156 19, 165 12, 172 10"
                  className={styles.heroMiniChartArea}
                />
                <path
                  d="M8 56 C30 54, 42 44, 58 46 C75 48, 82 34, 96 32 C112 30, 122 16, 144 18 C156 19, 165 12, 172 10"
                  className={styles.heroMiniChartLine}
                />
                <circle cx="172" cy="10" r="4" className={styles.heroMiniChartDot} />
              </svg>
              <div className={styles.heroMiniChartFooter}>
                <span>Revenue</span>
                <span>Sales</span>
                <span>Clients</span>
                <span>Leads</span>
              </div>
            </div>
            <div className={styles.heroButtonGroup}>
              <Link
                href="/proposal"
                className={styles.heroJoinBtn}
                onClick={() => trackCTAClick("Get Started Today", "hero", pathname || "/")}
              >
                <span>Get Started Today!</span>
                <span className={styles.heroJoinBtnBox} aria-hidden="true">↗</span>
              </Link>
              <Link
                href="/contact"
                className={styles.heroContactBtn}
                onClick={() => trackCTAClick("Contact Now", "hero", pathname || "/")}
              >
                <span>Contact Now</span>
                <span className={styles.heroContactBtnBox} aria-hidden="true">→</span>
              </Link>
            </div>
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
                {
                  bg: "#F9A8D4",
                  image: "/images/hero-specialist/web-dev.jpg",
                  label: "Web Design Specialist",
                },
                {
                  bg: "#C4B5FD",
                  image: "/images/hero-specialist/app-dev.jpg",
                  label: "App Development Specialist",
                },
                {
                  bg: "#67E8F9",
                  image: "/images/hero-specialist/ui-ux.jpg",
                  label: "UI/UX Specialist",
                },
                {
                  bg: "#FCD34D",
                  image: "/images/hero-specialist/seo.jpg",
                  label: "SEO Specialist",
                },
              ].map((card, i) => (
                <div key={i} className={styles.heroServiceCard} style={{ background: card.bg }}>
                  <img
                    className={styles.heroServiceCardImage}
                    src={card.image}
                    alt={card.label}
                    width={160}
                    height={160}
                    loading="lazy"
                  />
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

      {/* ===== INDUSTRY SHOWCASE SECTION ===== */}
      <section className={styles.services} id="services">
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Industries We Serve</h2>
            <p>
              At CelestiaTech, we shape each solution around the way your industry actually works,
              so the product feels relevant, conversion-ready, and built for growth.
            </p>
          </div>
          <div className={styles.industryCarouselWrapper}>
            <div id="industryShowcaseCarousel" className={styles.industryCarouselTrack}>
              {industryCarouselItems.map((industry, index) => (
                <article
                  key={`${industry.name}-${index}`}
                  className={`${styles.industryShowcaseCard} animate-on-scroll stagger-${(index % 6) + 1}`}
                  style={{ background: industry.tint }}
                >
                  <div className={styles.industryShowcaseImage}>
                    <Image
                      src={industry.image}
                      alt={industry.name}
                      width={360}
                      height={240}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.industryShowcaseContent}>
                    <h3>{industry.name}</h3>
                    <ul className={styles.industryShowcaseList}>
                      {industry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
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
        <PortfolioShowcase />
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
              <h2 style={{ fontSize: "32px", marginBottom: "12px" }}>
                Top-Rated Upwork Partner
              </h2>
              <p style={{ fontSize: "16px" }}>
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
          <div className={styles.testimonialRatingRow}>
            <div className={styles.testimonialGoogleBadge}>
              <Image
                src="/logos/google-logo-vector-format-white-background-illustration-407571048.webp"
                alt="Google"
                width={32}
                height={32}
                className={styles.googleLogoImage}
                loading="lazy"
              />
              <div className={styles.testimonialGoogleMeta}>
                <strong>4.5</strong>
                <span>Google Reviews</span>
              </div>
            </div>
          </div>
          <div className={styles.testimonialRows}>
            {testimonialRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`${styles.testimonialsMarquee} ${rowIndex % 2 === 1 ? styles.testimonialsMarqueeReverse : ""}`}
              >
                <div className={styles.testimonialsTrack}>
                  {row.map((testimonial, index) => (
                    <div key={`${rowIndex}-${index}-${testimonial.author}`} className={styles.testimonialCard}>
                      <div className={styles.testimonialStars}>
                        <span className={styles.testimonialScore}>4.5</span>
                        {"★".repeat(testimonial.stars)}
                      </div>
                      <p>"{testimonial.quote}"</p>
                      <div className={styles.testimonialAuthor}>
                        <div className={styles.testimonialAvatar}>
                          <Image
                            src="/logos/google-logo-vector-format-white-background-illustration-407571048.webp"
                            alt="Google"
                            width={28}
                            height={28}
                            className={styles.googleLogoImage}
                            loading="lazy"
                          />
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
