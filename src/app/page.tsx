"use client";

import { useState, useEffect, useRef, lazy, Suspense, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { trackCTAClick } from "@/lib/analytics";
import styles from "./page.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Lazy load Chatbot component
const Chatbot = lazy(() => import("./components/Chatbot"));
const PortfolioShowcase = dynamic(
  () => import("@/components/PortfolioShowcase").then((module) => module.PortfolioShowcase),
  {
    ssr: false,
    loading: () => <div className={styles.portfolioPlaceholder} aria-hidden="true" />,
  }
);

function HeroBadgeIcon({ kind }: { kind: "whatsapp" | "call" | "revenue" | "seo" }) {
  const icons: Record<typeof kind, ReactNode> = {
    whatsapp: (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
        <path d="M20.52 3.48A11.78 11.78 0 0 0 12.04 0C5.52 0 .2 5.28.2 11.8c0 2.08.54 4.1 1.57 5.88L0 24l6.5-1.7a11.8 11.8 0 0 0 5.54 1.4h.01c6.52 0 11.85-5.28 11.85-11.8 0-3.15-1.23-6.11-3.38-8.42ZM12.05 21.7h-.01a9.8 9.8 0 0 1-4.99-1.36l-.36-.21-3.86 1.01 1.03-3.76-.24-.39a9.77 9.77 0 0 1-1.5-5.18c0-5.42 4.43-9.84 9.88-9.84 2.63 0 5.1 1.02 6.97 2.88a9.77 9.77 0 0 1 2.9 6.95c0 5.42-4.43 9.84-9.88 9.84Zm5.4-7.37c-.29-.14-1.72-.85-1.99-.95-.27-.1-.47-.14-.67.14-.19.29-.77.95-.94 1.15-.17.19-.34.22-.63.07-.29-.14-1.2-.44-2.29-1.41-.85-.75-1.42-1.68-1.59-1.97-.17-.29-.02-.44.13-.58.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.19 0-.51.07-.77.36-.27.29-1.02.99-1.02 2.42 0 1.42 1.05 2.8 1.19 2.99.14.19 2.06 3.16 5 4.43.7.3 1.24.47 1.67.6.7.22 1.33.19 1.82.12.55-.08 1.72-.7 1.97-1.37.24-.67.24-1.25.17-1.37-.07-.12-.27-.19-.56-.34Z" />
      </svg>
    ),
    call: (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72l.33 2.57a2 2 0 0 1-.57 1.74l-1.2 1.2a16 16 0 0 0 7.2 7.2l1.2-1.2a2 2 0 0 1 1.74-.57l2.57.33A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    revenue: (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12" />
        <path d="M6 8h12" />
        <path d="m8 8 7 13" />
        <path d="M8 21h8" />
      </svg>
    ),
    seo: (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17 9 11l4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  };

  return <span className={styles.heroFloatBadgeIcon} aria-hidden="true">{icons[kind]}</span>;
}

export default function Home() {
  const [revenueCount, setRevenueCount] = useState(0);
  const [shouldRenderChatbot, setShouldRenderChatbot] = useState(false);
  const industryCarouselRef = useRef<HTMLDivElement | null>(null);
  const heroBadgeRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const heroPointerFrame = useRef<number | null>(null);

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

  useEffect(() => {
    return () => {
      if (heroPointerFrame.current !== null) {
        window.cancelAnimationFrame(heroPointerFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    let idleCallbackId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(() => setShouldRenderChatbot(true), { timeout: 2500 });
    } else {
      timeoutId = setTimeout(() => setShouldRenderChatbot(true), 1800);
    }

    return () => {
      if ("cancelIdleCallback" in window && idleCallbackId !== null) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const carousel = industryCarouselRef.current;
    if (!carousel) {
      return;
    }

    let autoDirection = 1;
    let animationFrame: number | null = null;
    let lastTimestamp = 0;

    const tickAutoScroll = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

      if (maxScrollLeft > 0) {
        carousel.scrollLeft += autoDirection * elapsed * 0.05;

        if (carousel.scrollLeft >= maxScrollLeft - 2) {
          autoDirection = -1;
        } else if (carousel.scrollLeft <= 2) {
          autoDirection = 1;
        }
      }

      animationFrame = window.requestAnimationFrame(tickAutoScroll);
    };

    animationFrame = window.requestAnimationFrame(tickAutoScroll);

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

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

  const platforms = [
    {
      name: "Shopify",
      icon: "/images/platforms/shopify.svg",
      color: "#95BF47",
      description: "Store setup, theme customization, apps, and performance improvements.",
      tags: ["Ecommerce", "Payments", "Storefront"],
    },
    {
      name: "Mailchimp",
      icon: "/images/platforms/mailchimp.svg",
      color: "#FFE01B",
      description: "Email automation, audience segmentation, and campaign-ready landing pages.",
      tags: ["CRM", "Email", "Automation"],
    },
    {
      name: "Shipday",
      icon: "/images/platforms/delivery.svg",
      color: "#2563eb",
      description: "Delivery management integration for tracking, dispatching, and order updates.",
      tags: ["Logistics", "Tracking", "Ops"],
    },
    {
      name: "WordPress",
      icon: "/images/platforms/wordpress.svg",
      color: "#21759B",
      description: "Custom themes, speed optimization, and SEO-ready content structure.",
      tags: ["CMS", "SEO", "Content"],
    },
    {
      name: "Joomla",
      icon: "/images/platforms/joomla.svg",
      color: "#0B63CE",
      description: "Template customization, extensions, and secure content management setups.",
      tags: ["CMS", "Security", "Extensions"],
    },
    {
      name: "CRM Integrations",
      icon: "/images/platforms/crm.svg",
      color: "#cc5500",
      description: "Connect forms, leads, and pipelines with your preferred CRM tools.",
      tags: ["Leads", "Pipelines", "Reporting"],
    },
    {
      name: "HubSpot",
      icon: "/images/platforms/hubspot.svg",
      color: "#FF7A59",
      description: "CRM setup, tracking, forms, pipelines, and marketing automation touchpoints.",
      tags: ["CRM", "Leads", "Automation"],
    },
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
      tint: "rgba(255, 255, 255, 0.95)",
      points: ["Trust-Centered Design", "Booking Systems", "Mobile-Optimized"],
    },
    {
      name: "Food & Restaurant",
      image: "/images/industry-showcase/food_n_restourant.png",
      tint: "rgba(255, 255, 255, 0.95)",
      points: ["Visuals & Engaging UX", "Ordering Systems", "Local SEO & Reviews"],
    },
    {
      name: "Education & E-Learning",
      image: "/images/industry-showcase/eduction_n_elearning.png",
      tint: "rgba(255, 255, 255, 0.95)",
      points: ["Interactive Interfaces", "LMS & User Management", "Scalable & Accessible"],
    },
    {
      name: "Startups & SMEs",
      image: "/images/industry-showcase/startup_n_smes.png",
      tint: "rgba(255, 255, 255, 0.95)",
      points: ["Growth & Scalable Design", "Conversion Friendly", "Fast Ongoing Support"],
    },
    {
      name: "Real Estate",
      image: "/images/industry-showcase/realstate.png",
      tint: "rgba(255, 255, 255, 0.95)",
      points: ["Industry-Specific Design", "SEO & Local Optimization", "Mobile-First & Performance"],
    },
    {
      name: "E-commerce & Retail",
      image: "/images/industry-showcase/ecommerce_n_retail.png",
      tint: "rgba(255, 255, 255, 0.95)",
      points: ["Conversion-Focused Design", "Seamless Experience", "Scalable Custom Features"],
    },
  ];

  const industryCarouselItems = [...industryHighlights, ...industryHighlights];

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
      label: "SEO Growth",
      href: "/services",
      offsetX: -20,
      offsetY: -14,
      rotate: -5,
      originX: 0.7,
      originY: 0.56,
    },
  ];

  const updateHeroBadges = (pointerX: number, pointerY: number) => {
    heroFloatingBadges.forEach((badge) => {
      const badgeNode = heroBadgeRefs.current[badge.key];
      if (!badgeNode) {
        return;
      }

      const distanceX = pointerX - badge.originX;
      const distanceY = pointerY - badge.originY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const influence = Math.max(0, 1 - distance / 1.1);

      badgeNode.style.setProperty("--badge-shift-x", `${pointerX * badge.offsetX * influence}px`);
      badgeNode.style.setProperty("--badge-shift-y", `${pointerY * badge.offsetY * influence}px`);
      badgeNode.style.setProperty("--badge-rotate", `${pointerX * badge.rotate * influence}deg`);
    });
  };

  const handleHeroPointerMove = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    if (heroPointerFrame.current !== null) {
      window.cancelAnimationFrame(heroPointerFrame.current);
    }

    heroPointerFrame.current = window.requestAnimationFrame(() => {
      updateHeroBadges(x, y);
      heroPointerFrame.current = null;
    });
  };

  const resetHeroPointer = () => {
    if (heroPointerFrame.current !== null) {
      window.cancelAnimationFrame(heroPointerFrame.current);
      heroPointerFrame.current = null;
    }

    updateHeroBadges(0, 0);
  };

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
    },
    {
      quote: "From MVP to 100K users in 6 months. Celestiatech's mobile app development delivered exactly what we needed.",
      author: "Founder, EduTech Platform",
      service: "Mobile App Development",
      stars: 5,
    },
    {
      quote: "Their blockchain team secured $50M+ in assets. Zero breaches, full compliance. Highly professional.",
      author: "CEO, FinTech Company",
      service: "Blockchain Development",
      stars: 5,
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
        data-section="hero"
        onMouseMove={handleHeroPointerMove}
        onMouseLeave={resetHeroPointer}
      >
        {heroFloatingBadges.map((badge) => (
          <Link
            key={badge.key}
            href={badge.href}
            ref={(node) => {
              heroBadgeRefs.current[badge.key] = node;
            }}
            className={`${styles.heroFloatBadge} ${badge.className} ${badge.key === "whatsapp" ? styles.heroFloatBadgeWhatsapp : ""}`}
            aria-label={badge.label}
          >
            <span className={styles.heroFloatBadgeInner}>
              <HeroBadgeIcon kind={badge.key as "whatsapp" | "call" | "revenue" | "seo"} />
              <span>{badge.label}</span>
            </span>
          </Link>
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
                onClick={() => trackCTAClick("Get Started Today", "hero")}
              >
                <span>Get Started Today!</span>
                <span className={styles.heroJoinBtnBox} aria-hidden="true">↗</span>
              </Link>
              <Link
                href="/contact"
                className={styles.heroContactBtn}
                onClick={() => trackCTAClick("Contact Now", "hero")}
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
                if (el) el.scrollBy({ left: -208, behavior: "smooth" });
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
                  <Image
                    className={styles.heroServiceCardImage}
                    src={card.image}
                    alt={card.label}
                    width={180}
                    height={180}
                    loading="lazy"
                    sizes="(max-width: 768px) 150px, 180px"
                    quality={68}
                  />
                </div>
              ))}
            </div>
            <button
              className={styles.heroCarouselArrow}
              aria-label="Next"
              onClick={() => {
                const el = document.getElementById("heroCarousel");
                if (el) el.scrollBy({ left: 208, behavior: "smooth" });
              }}
            >
              →
            </button>
          </div>

        </div>
      </section>

      {/* ===== INDUSTRY SHOWCASE SECTION ===== */}
      <section className={styles.services} id="services" data-section="services">
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Industries We Serve</h2>
            <p>
              At CelestiaTech, we shape each solution around the way your industry actually works,
              so the product feels relevant, conversion-ready, and built for growth.
            </p>
          </div>
        </div>
        <div className={styles.industryCarouselFullBleed}>
          <div ref={industryCarouselRef} className={styles.industryCarouselWrapper}>
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
                      sizes="(max-width: 640px) 76vw, (max-width: 1024px) 38vw, (max-width: 1440px) 28vw, 300px"
                      quality={70}
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
      <section className={styles.awards} data-section="awards">
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
      <section className={styles.trust} data-section="partners">
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
      <section className={styles.industries} data-section="industries">
        <div className={`${styles.industriesGlowOrb} ${styles.industriesGlowOrb1}`} aria-hidden="true" />
        <div className={`${styles.industriesGlowOrb} ${styles.industriesGlowOrb2}`} aria-hidden="true" />
        <div className={`${styles.industriesGlowOrb} ${styles.industriesGlowOrb3}`} aria-hidden="true" />
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Blogs We Cater To</h2>
            <p>Delivering specialized solutions across diverse sectors</p>
          </div>
          <div className={styles.industriesGrid}>
            {industries.map((industry, index) => (
              <div key={index} className={`${styles.industryCard} animate-on-scroll stagger-${(index % 6) + 1}`}>
                <div className={styles.industryCardBorder} aria-hidden="true" />
                <div className={styles.industryIcon}>
                  <Image src={`/images/icons/${industry.icon || 'default.svg'}`} alt={industry.name} width={60} height={60} className={styles.iconImage} loading="lazy" />
                </div>
                <h3>{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <PortfolioShowcase />

      {/* ===== PLATFORMS / CRM SECTION ===== */}
      <section className={styles.platforms} data-section="platforms">
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Platforms We Work With</h2>
            <p>Shopify, CRM tools, CMS platforms, and integrations that keep your workflow connected.</p>
          </div>

          <div className={styles.platformsGrid}>
            {platforms.map((platform, index) => (
              <article key={platform.name} className={`${styles.platformCard} animate-on-scroll stagger-${(index % 6) + 1}`}>
                <div className={styles.platformCardTop}>
                  <div
                    className={styles.platformIcon}
                    aria-hidden="true"
                    style={
                      {
                        ["--platform-color" as any]: platform.color,
                        ["--platform-icon" as any]: `url(${platform.icon})`,
                      } as React.CSSProperties
                    }
                  >
                    <span className={styles.platformLogoMask} />
                  </div>
                  <h3 className={styles.platformTitle}>{platform.name}</h3>
                </div>
                <p className={styles.platformDesc}>{platform.description}</p>
                <div className={styles.platformTags} aria-label={`${platform.name} tags`}>
                  {platform.tags.map((tag) => (
                    <span key={tag} className={styles.platformTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.platformActions}>
                  <Link
                    href="/contact"
                    className={styles.platformCta}
                    onClick={() => {
                      trackCTAClick("Talk to Us", "platforms");
                    }}
                  >
                    Talk to Us
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className={styles.process} data-section="process">
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
              >
                <div className={styles.processIcon}>
                  <Image src={step.icon} alt={step.title} width={70} height={70} loading="lazy" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className={styles.processDetails}>
                  <p>{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UPWORK SECTION ===== */}
      <section className={styles.upwork} data-section="upwork">
        <div className="container">
          <div className={`${styles.upworkContent} animate-on-scroll`}>
            <div>
              <h2 className={styles.upworkHeading}>
                Top-Rated Upwork Partner
              </h2>
              <p className={styles.upworkIntro}>
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
      <section className={styles.techStack} data-section="technology">
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Technology Stack</h2>
            <p>Modern tools and frameworks for powerful solutions</p>
          </div>
          <div className={styles.techCategories}>
            <div className={`${styles.techCategory} animate-on-scroll stagger-1`}>
              <h3>
                <Image src="/images/icons/develop.svg" alt="" width={20} height={20} className={styles.inlineHeadingIcon} loading="lazy" />
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
                <Image src="/images/icons/expertise.svg" alt="" width={20} height={20} className={styles.inlineHeadingIcon} loading="lazy" />
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
                <Image src="/images/icons/mobile-development.svg" alt="" width={20} height={20} className={styles.inlineHeadingIcon} loading="lazy" />
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
      <section className={styles.cta} data-section="cta">

        <div className="container">
          <div className="animate-on-scroll">
            <h2>Ready to Create an Impact?</h2>
            <p>Let&apos;s discuss your project and turn your vision into reality</p>
            <Link 
              href="/proposal" 
              className="btn btn-accent btn-3d btn-bubble"
              onClick={() => trackCTAClick("Get Free Consultation", "cta_section")}
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className={styles.whyChooseUs} data-section="whychoose">
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
      <section className={styles.testimonials} data-section="testimonials">

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
                      <p>&ldquo;{testimonial.quote}&rdquo;</p>
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
                          <h3>{testimonial.author}</h3>
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

      {/* ===== CLIENT TESTIMONIAL VIDEOS ===== */}
      <section className={styles.clientVideos} data-section="client-videos">
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Client Testimonials</h2>
            <p>Hear from our clients about their experience working with us</p>
          </div>
          <div className={styles.clientVideosGrid}>
            {[
              { name: "Aisha", file: "Aisha 0607.mp4" },
              { name: "Anastasia", file: "Anastasia 0607.mp4" },
              { name: "Camila", file: "Camila 0607.mp4" },
              { name: "Henri", file: "Henri Study 0607.mp4" },
              { name: "Poly", file: "Poly In Car 0607.mp4" },
            ].map((video, index) => (
              <div
                key={index}
                className={`${styles.clientVideoCard} animate-on-scroll stagger-${(index % 5) + 1}`}
                data-playing="false"
              >
                <div className={styles.clientVideoWrapper}>
                  <Image src="/logos/w3tech.png" alt="W3Tech" width={28} height={28} className={styles.clientVideoOverlayLogo} loading="lazy" />
                  <span className={styles.clientVideoOverlayText}>w3tech.co.in</span>
                  <video
                    src={`/clientvideos/${encodeURIComponent(video.file)}`}
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => { e.currentTarget.play(); e.currentTarget.closest(`.${styles.clientVideoCard}`)?.classList.add(styles.isPlaying); }}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; e.currentTarget.closest(`.${styles.clientVideoCard}`)?.classList.remove(styles.isPlaying); }}
                  />
                  <button
                    className={styles.clientVideoPlayBtn}
                    onClick={(e) => {
                      const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                      if (video.paused) { video.play(); video.closest(`.${styles.clientVideoCard}`)?.classList.add(styles.isPlaying); }
                      else { video.pause(); video.closest(`.${styles.clientVideoCard}`)?.classList.remove(styles.isPlaying); }
                    }}
                    aria-label={`Play ${video.name}'s testimonial`}
                  >
                    ▶
                  </button>
                </div>
                <div className={styles.clientVideoName}>{video.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className={styles.contact} data-section="contact">
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={`${styles.contactInfo} animate-slide-left`}>
              <h2>Let&apos;s Work Together</h2>
              <p>
                Tell us about your project and we&apos;ll help bring your ideas to life.
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className={styles.contactLocations}>
                <div className={styles.contactLocation}>
                  <h3><Image src="/images/icons/location-pin.svg" alt="" width={16} height={16} className={styles.inlineLocationIcon} loading="lazy" />Dubai, UAE</h3>
                  <p>Business Bay, Dubai</p>
                </div>
                <div className={styles.contactLocation}>
                  <h3><Image src="/images/icons/location-pin.svg" alt="" width={16} height={16} className={styles.inlineLocationIcon} loading="lazy" />India</h3>
                  <p>Mohali, Punjab</p>
                </div>
              </div>
              <div className={styles.contactChecklist}>
                <h3>Why contact us</h3>
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
              <button type="submit" className={`btn btn-primary btn-ripple btn-bubble ${styles.fullWidthButton}`}>
                Send Message
              </button>
              <div className={styles.formNote}>
                <Image src="/images/icons/security.svg" alt="" width={14} height={14} className={styles.inlineSecurityIcon} loading="lazy" />Your information is secure. We sign NDAs for all projects.
              </div>
            </form>
          </div>
        </div>
      </section>

      </main>
      {/* ===== FOOTER ===== */}
      <Footer />

      {/* ===== CHATBOT ===== */}
      {shouldRenderChatbot ? (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      ) : null}
    </div>
  );
}
