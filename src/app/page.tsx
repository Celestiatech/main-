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
      metric: "<img src='/images/icons/security.svg' alt='Security' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />Zero security breaches | <img src='/images/icons/chart-growth.svg' alt='Assets' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />$50M+ assets secured",
      description: "Web3 apps, smart contracts, and DeFi platforms",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/devops-services.svg",
      title: "DevOps Services",
      whoFor: "For tech teams & enterprises",
      businessResult: "50% faster deployments",
      metric: "<img src='/images/icons/launch.svg' alt='Speed' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />70% faster CI/CD | <img src='/images/icons/chart-growth.svg' alt='Analytics' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />60% fewer downtime incidents",
      description: "CI/CD pipelines and cloud automation",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/metaverse-development.svg",
      title: "Metaverse Development",
      whoFor: "For brands & innovators",
      businessResult: "Immersive experiences in 90–120 days",
      metric: "<img src='/images/icons/location-pin.svg' alt='Engagement' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />200% engagement increase | <img src='/images/icons/expertise.svg' alt='Satisfaction' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />85% user satisfaction",
      description: "VR/AR worlds and virtual reality solutions",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/quality-assurance.svg",
      title: "Quality Assurance",
      whoFor: "For all development projects",
      businessResult: "Bug-free launches guaranteed",
      metric: "<img src='/images/icons/quality-assurance.svg' alt='Quality' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />99.9% bug-free releases | <img src='/images/icons/security.svg' alt='Compliance' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />100% compliance rate",
      description: "Comprehensive testing and QA services",
      cta: "View Live Apps",
    },
  ];

  const awards = [
    { name: "Upwork", badge: "Top Rated Plus", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSIjMTRBM0JBIi8+CiAgPHRleHQgeD0iNjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCI+VXB3b3JrPC90ZXh0Pgo8L3N2Zz4=" },
    { name: "Clutch", badge: "B2B Leader 2024", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSIjRkY2QjM1Ii8+CiAgPHRleHQgeD0iNjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCI+Q2x1dGNoPC90ZXh0Pgo8L3N2Zz4=" },
    { name: "TechReviewer", badge: "Best Developer", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSIjRjU5RTBCLiIvPgogIDx0ZXh0IHg9IjYwIiB5PSIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9ImJvbGQiPlRlY2hSZXY8L3RleHQ+Cjwvc3ZnPg==" },
    { name: "GoodFirms", badge: "Excellence Award", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSIjMkU1OTlDIi8+CiAgPHRleHQgeD0iNjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+R29vZEZpcm1zPC90ZXh0Pgo8L3N2Zz4=" },
    { name: "AppFutura", badge: "Verified Partner", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSIjRjQ3QzIyIi8+CiAgPHRleHQgeD0iNjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+QXBwRnV0dXJhPC90ZXh0Pgo8L3N2Zz4=" },
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
      result: "<img src='/images/icons/chart-growth.svg' alt='Growth' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />Increased user retention by 42% | <img src='/images/icons/chart-growth.svg' alt='Revenue' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />Generated ₹3.2 Cr revenue in 6 months",
      beforeAfter: ["/images/portfolio/healthtrack-before.svg", "/images/portfolio/healthtrack-after.svg"],
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
      result: "<img src='/images/icons/launch.svg' alt='Speed' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />300% faster load times | <img src='/images/icons/tailored-solutions.svg' alt='Users' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />Served 100K+ students",
      beforeAfter: ["/images/portfolio/edulearn-before.svg", "/images/portfolio/edulearn-after.svg"],
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
      result: "<img src='/images/icons/mobile-development.svg' alt='Downloads' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />1M+ downloads | <img src='/images/icons/expertise.svg' alt='Rating' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />4.8 rating on app stores",
      beforeAfter: ["/images/portfolio/spacequest-before.svg", "/images/portfolio/spacequest-after.svg"],
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
      result: "<img src='/images/icons/security.svg' alt='Security' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />Zero security breaches | <img src='/images/icons/chart-growth.svg' alt='Assets' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />$50M+ assets secured",
      beforeAfter: ["/images/portfolio/cryptovault-before.svg", "/images/portfolio/cryptovault-after.svg"],
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
      result: "<img src='/images/icons/launch.svg' alt='Speed' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />70% faster responses | <img src='/images/icons/chart-growth.svg' alt='Savings' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />Saved ₹2 Cr annually",
      beforeAfter: ["/images/portfolio/smartassist-before.svg", "/images/portfolio/smartassist-after.svg"],
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
      result: "<img src='/images/icons/chart-growth.svg' alt='Growth' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />150% increase in brand recognition | <img src='/images/icons/concept.svg' alt='Awards' style={{ width: '14px', height: '14px', marginRight: '4px', display: 'inline' }} />Won 3 design awards",
      beforeAfter: ["/images/portfolio/brandrebrand-before.svg", "/images/portfolio/brandrebrand-after.svg"],
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
    frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Angular", "Vue", "Svelte", "Tailwind", "Bootstrap"],
    backend: ["Node.js", "Python", "Java", "Go", "Ruby", "PHP", ".NET"],
    mobile: ["React Native", "Flutter", "Swift", "Kotlin"],
    emerging: ["AI/ML", "Blockchain", "IoT", "Cloud", "DevOps", "Cybersecurity"],
  };

  const testimonials = [
    {
      quote: "NexaVibe rebuilt our SaaS backend and cut infra cost by 38%. Their DevOps expertise is unmatched.",
      author: "CTO, US-based HealthTech Startup",
      service: "DevOps Services",
      stars: 5,
      avatar: "/images/testimonials/healthtech-cto.svg",
    },
    {
      quote: "From MVP to 100K users in 6 months. NexaVibe's mobile app development delivered exactly what we needed.",
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
      icon: "/images/icons/tailored-solutions.svg",
      title: "Tailored Solutions",
      description: "Custom strategies aligned with your unique business goals",
    },
    {
      icon: "/images/icons/project-management.svg",
      title: "Project Management",
      description: "Agile methodology with transparent progress tracking",
    },
    {
      icon: "/images/icons/quality-assurance.svg",
      title: "Quality Assurance",
      description: "Rigorous testing ensuring bug-free, scalable solutions",
    },
    {
      icon: "/images/icons/expertise.svg",
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
      <section className={`${styles.hero} hero-enhanced`}>
        <div className={styles.heroBg}>
          <video autoPlay loop muted playsInline>
            <source src="/PixVerse_V5.5_Image_Text_540P_A_cinematic_shotonline-video-cutter.com-ezgif.com-video-to-gif-converter.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={`${styles.heroBadge} heroBadgeAnimate`}>
              <span className={styles.heroBadgeDot}></span>
              Premium IT & Software Development
            </div>
            <h1 
              style={{ display: 'block', whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%', overflow: 'visible', textAlign: 'center' }}
              className="heroTitleAnimate"
            >
              We Build <span>Revenue-Generating</span> Apps
            </h1>
            <p className={`${styles.heroSubtitle} heroSubtitleAnimate`}>
              Custom software solutions for startups and enterprises that scale
            </p>
            <div className={`${styles.heroActions} heroActionsAnimate`}>
              <Link 
                href="/proposal" 
                className="btn btn-primary btn-water btn-3d"
                onClick={() => trackCTAClick("Get Free Audit", "hero", pathname || "/")}
              >
                Get Free Audit
              </Link>
              <Link href="/work" className="btn btn-secondary btn-water btn-3d">
                View Case Studies
              </Link>
            </div>
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
                  <Image src={service.icon} alt={service.title} width={80} height={80} loading="lazy" />
                </div>
                <h3>{service.title}</h3>
                <div className={styles.serviceWhoFor}>
                  <Image src="/images/icons/tailored-solutions.svg" alt="Target audience" width={16} height={16} style={{ marginRight: '8px' }} loading="lazy" />
                  {service.whoFor}
                </div>
                <div className={styles.serviceResult}>
                  <Image src="/images/icons/chart-growth.svg" alt="Business result" width={16} height={16} style={{ marginRight: '8px' }} loading="lazy" />
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
                <div className={styles.trustLogo}>{partner}</div>
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
                      <Link href={item.video} className="btn btn-secondary btn-sm">
                        <Image src="/images/icons/launch.svg" alt="Play" width={14} height={14} style={{ marginRight: '6px', display: 'inline' }} loading="lazy" />Watch Demo
                      </Link>
                      <Link href="/work" className="btn btn-primary btn-sm">
                        View Live App
                      </Link>
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
                  <span key={index} className={styles.techTag}>{tech}</span>
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
                  <span key={index} className={styles.techTag}>{tech}</span>
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
            <h2>Why Choose NexaVibe?</h2>
            <p>Partner with a team committed to your success</p>
          </div>
          <div className={styles.whyGrid}>
            {whyChooseUs.map((item, index) => (
              <div key={index} className={`${styles.whyCard} animate-on-scroll stagger-${(index % 4) + 1}`}>
                <div className={styles.whyIcon}>
                  <Image src={`/images/icons/${item.icon || 'default.svg'}`} alt={item.title} width={70} height={70} loading="lazy" />
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

