"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import Chatbot from "./components/Chatbot";
import Hero3DScene from "./components/Hero3DScene";
import ThreeDIcon from "./components/ThreeDIcon";
import ThreeDSpinningBadge from "./components/ThreeDSpinningBadge";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState("startup");

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const services = [
    {
      icon: "/images/icons/mobile-development.svg",
      title: "Mobile App Development",
      whoFor: "For startups & enterprises",
      businessResult: "Launch in 60–90 days",
      metric: "⏱ Avg. 35% faster go-to-market | 📈 42% higher user retention",
      description: "Monetization-ready apps with exceptional UX",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/web-development.svg",
      title: "Web Development",
      whoFor: "For businesses & agencies",
      businessResult: "Scalable platforms in 45–75 days",
      metric: "🚀 300% faster load times | 💰 40% cost reduction",
      description: "Modern web applications with cutting-edge tech",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/game-development.svg",
      title: "Game Development",
      whoFor: "For indie developers & studios",
      businessResult: "Viral games in 90–120 days",
      metric: "🎮 1M+ downloads | ⭐ 4.8 rating on app stores",
      description: "Engaging 2D/3D games across platforms",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/blockchain-development.svg",
      title: "Blockchain Development",
      whoFor: "For fintech & startups",
      businessResult: "Secure solutions in 60–90 days",
      metric: "🔒 Zero security breaches | 💰 $50M+ assets secured",
      description: "Web3 apps, smart contracts, and DeFi platforms",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/devops-services.svg",
      title: "DevOps Services",
      whoFor: "For tech teams & enterprises",
      businessResult: "50% faster deployments",
      metric: "⚡ 70% faster CI/CD | 📊 60% fewer downtime incidents",
      description: "CI/CD pipelines and cloud automation",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/metaverse-development.svg",
      title: "Metaverse Development",
      whoFor: "For brands & innovators",
      businessResult: "Immersive experiences in 90–120 days",
      metric: "🌐 200% engagement increase | 🎯 85% user satisfaction",
      description: "VR/AR worlds and virtual reality solutions",
      cta: "View Live Apps",
    },
    {
      icon: "/images/icons/quality-assurance.svg",
      title: "Quality Assurance",
      whoFor: "For all development projects",
      businessResult: "Bug-free launches guaranteed",
      metric: "✅ 99.9% bug-free releases | 🛡️ 100% compliance rate",
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
    { icon: "/images/icons/education.svg", name: "Education" },
    { icon: "/images/icons/travel.svg", name: "Travel" },
    { icon: "/images/icons/social-networking.svg", name: "Social Networking" },
    { icon: "/images/icons/fitness.svg", name: "Fitness" },
    { icon: "/images/icons/education.svg", name: "Business" }, // placeholder
    { icon: "/images/icons/travel.svg", name: "Logistics" }, // placeholder
    { icon: "/images/icons/social-networking.svg", name: "Dating" }, // placeholder
    { icon: "/images/icons/fitness.svg", name: "Healthcare" }, // placeholder
    { icon: "/images/icons/education.svg", name: "Real Estate" }, // placeholder
    { icon: "/images/icons/travel.svg", name: "On-Demand" }, // placeholder
    { icon: "/images/icons/fitness.svg", name: "Utility" }, // placeholder
    { icon: "/images/icons/social-networking.svg", name: "Entertainment" }, // placeholder
  ];

  const portfolio = [
    {
      category: "mobile",
      title: "HealthTrack Pro",
      clientGoal: "Increase user engagement in fitness apps",
      problem: "Low retention rates and lack of personalized insights",
      solution: "Built AI-powered fitness tracking with personalized recommendations",
      techStack: ["React Native", "Node.js", "TensorFlow"],
      result: "📈 Increased user retention by 42% | 💰 Generated ₹3.2 Cr revenue in 6 months",
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
      result: "🚀 300% faster load times | 👥 Served 100K+ students",
      beforeAfter: ["/images/portfolio/edulearn-before.jpg", "/images/portfolio/edulearn-after.jpg"],
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
      result: "🎮 1M+ downloads | ⭐ 4.8 rating on app stores",
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
      result: "🔒 Zero security breaches | 💰 $50M+ assets secured",
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
      result: "⚡ 70% faster responses | 💸 Saved ₹2 Cr annually",
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
      result: "📈 150% increase in brand recognition | 🎨 Won 3 design awards",
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
    frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Angular", "Vue", "Svelte", "Tailwind", "Bootstrap"],
    backend: ["Node.js", "Python", "Java", "Go", "Ruby", "PHP", ".NET"],
    mobile: ["React Native", "Flutter", "Swift", "Kotlin"],
    emerging: ["AI/ML", "Blockchain", "IoT", "Cloud", "DevOps", "Cybersecurity"],
  };

  const testimonials = [
    {
      quote: "TechNova rebuilt our SaaS backend and cut infra cost by 38%. Their DevOps expertise is unmatched.",
      author: "CTO, US-based HealthTech Startup",
      service: "DevOps Services",
      stars: 5,
      avatar: "/images/testimonials/healthtech-cto.jpg",
    },
    {
      quote: "From MVP to 100K users in 6 months. TechNova's mobile app development delivered exactly what we needed.",
      author: "Founder, EduTech Platform",
      service: "Mobile App Development",
      stars: 5,
      avatar: "/images/testimonials/edutech-founder.jpg",
    },
    {
      quote: "Their blockchain team secured $50M+ in assets. Zero breaches, full compliance. Highly professional.",
      author: "CEO, FinTech Company",
      service: "Blockchain Development",
      stars: 5,
      avatar: "/images/testimonials/fintech-ceo.jpg",
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
              TechNova
            </Link>
            <nav className={styles.nav}>
              <Link href="/" className={styles.navLink}>Home</Link>
              <div className={styles.navItem}>
                <button className={styles.navLink}>
                  Solutions <span>▼</span>
                </button>
                <div className={styles.navDropdown}>
                  {/* Product Development */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🚀 Product Development</div>
                    <Link href="/services" className={styles.dropdownSubLink}>MVP Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Startup Apps</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>SaaS Platforms</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Mobile Apps</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Web Applications</Link>
                  </div>
                  {/* Growth Engineering */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>📈 Growth Engineering</div>
                    <Link href="/services" className={styles.dropdownSubLink}>Performance Optimization</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Scalability Solutions</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>DevOps & Cloud</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>API Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>System Integration</Link>
                  </div>
                  {/* AI & Automation */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🤖 AI & Automation</div>
                    <Link href="/services" className={styles.dropdownSubLink}>Machine Learning</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>AI Chatbots</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Predictive Analytics</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Automation Solutions</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>NLP Services</Link>
                  </div>
                  {/* Blockchain & Web3 */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>⛓️ Blockchain & Web3</div>
                    <Link href="/services" className={styles.dropdownSubLink}>Smart Contracts</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>DeFi Platforms</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>NFT Marketplaces</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Web3 Apps</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Crypto Wallets</Link>
                  </div>
                  {/* Solutions by Industry */}
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🏭 Solutions by Industry</div>
                    <Link href="/industries" className={styles.dropdownSubLink}>Healthcare</Link>
                    <Link href="/industries" className={styles.dropdownSubLink}>Education</Link>
                    <Link href="/industries" className={styles.dropdownSubLink}>Finance</Link>
                    <Link href="/industries" className={styles.dropdownSubLink}>E-commerce</Link>
                    <Link href="/industries" className={styles.dropdownSubLink}>Real Estate</Link>
                  </div>
                </div>
              </div>
              <Link href="/pricing" className={styles.navLink}>Pricing</Link>
              <Link href="/blog" className={styles.navLink}>Blogs</Link>
              <Link href="/work" className={styles.navLink}>Portfolio</Link>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
              <Link href="/request-a-call" className="btn btn-secondary btn-sm">
                Schedule a Call
              </Link>
              <Link href="/clients" className="btn btn-primary btn-sm">
                For Clients
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuBtn}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuHeader}>
              <Link href="/" className={styles.mobileLogo} onClick={toggleMobileMenu}>
                <div className={styles.logoIcon}>T</div>
                TechNova
              </Link>
              <button
                className={styles.mobileMenuClose}
                onClick={toggleMobileMenu}
                aria-label="Close mobile menu"
              >
                ✕
              </button>
            </div>
            <nav className={styles.mobileNav}>
              <Link href="/" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                Home
              </Link>
              <div className={styles.mobileNavGroup}>
                <div className={styles.mobileNavTitle}>Services</div>
                <Link href="/services" className={styles.mobileNavSubLink} onClick={toggleMobileMenu}>
                  Mobile App Development
                </Link>
                <Link href="/services" className={styles.mobileNavSubLink} onClick={toggleMobileMenu}>
                  Web Development
                </Link>
                <Link href="/services" className={styles.mobileNavSubLink} onClick={toggleMobileMenu}>
                  Game Development
                </Link>
                <Link href="/services" className={styles.mobileNavSubLink} onClick={toggleMobileMenu}>
                  AI & Blockchain
                </Link>
                <Link href="/services" className={styles.mobileNavSubLink} onClick={toggleMobileMenu}>
                  Design Services
                </Link>
                <Link href="/services" className={styles.mobileNavSubLink} onClick={toggleMobileMenu}>
                  Other Services
                </Link>
              </div>
              <Link href="/blog" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                Blogs
              </Link>
              <Link href="/work" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                Portfolio
              </Link>
              <Link href="/about" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                Company
              </Link>
              <Link href="/contact" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                Contact
              </Link>
            </nav>
            <div className={styles.mobileMenuActions}>
              <Link href="/contact" className="btn btn-primary btn-water" onClick={toggleMobileMenu}>
                Share Your Requirement
              </Link>
              <Link href="/request-a-call" className="btn btn-secondary btn-water" onClick={toggleMobileMenu}>
                Schedule a Call
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <video autoPlay loop muted playsInline>
            <source src="/PixVerse_V5.5_Image_Text_540P_A_cinematic_shotonline-video-cutter.com-ezgif.com-video-to-gif-converter.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroOverlay}></div>
        </div>
        {/* 3D Scene */}
        <Hero3DScene />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={`${styles.heroBadge} heroBadgeAnimate`}>
              <span className={styles.heroBadgeDot}></span>
              Premium IT & Software Development Company
            </div>
            <div className={`${styles.industryToggle} heroSubtitleAnimate`}>
              {["startup", "enterprise", "agency", "founder"].map((industry) => (
                <button
                  key={industry}
                  className={`${styles.industryBtn} ${selectedIndustry === industry ? styles.active : ""}`}
                  onClick={() => setSelectedIndustry(industry)}
                >
                  {industry.charAt(0).toUpperCase() + industry.slice(1)}
                </button>
              ))}
            </div>
            <h1 
              style={{ display: 'block', whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%', overflow: 'visible', textAlign: 'center' }}
              className="heroTitleAnimate"
            >
              We Build Scalable Apps That <span>Generate Revenue</span> – Not Just Code.
            </h1>
            <div 
              style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginTop: '12px', textAlign: 'center' }}
              className="heroSubtitleAnimate"
            >
              🚀 Helping funded startups & digital-first enterprises scale faster with custom software
            </div>
            <p className={`${styles.heroSubtitle} heroTrustAnimate`}>
              {selectedIndustry === "startup" && "Launch your MVP in 60 days with our proven startup framework. From idea to market-ready app."}
              {selectedIndustry === "enterprise" && "Scale your business with enterprise-grade solutions. Secure, scalable, and compliant with industry standards."}
              {selectedIndustry === "agency" && "Partner with us for white-label development. Deliver exceptional results to your clients."}
              {selectedIndustry === "founder" && "Turn your vision into reality. Expert guidance from concept to launch and beyond."}
            </p>
            <div className={`${styles.heroTrust} heroActionsAnimate`}>
              ⭐ Trusted by 2,500+ clients in 32 countries
            </div>
            <div className={`${styles.heroActions} heroStatsAnimate`}>
              <Link href="/proposal" className="btn btn-primary btn-water">
                Get Free Project Audit
              </Link>
              <Link href="/work" className="btn btn-secondary btn-water">
                See Real Case Studies
              </Link>
            </div>
            <div className={`${styles.heroStats} heroStatsAnimate`}>
              <div className={`${styles.statCard} statCardAnimate`}>
                <div className={styles.statNumber}>2,500+</div>
                <div className={styles.statLabel}>Happy Clients</div>
              </div>
              <div className={`${styles.statCard} statCardAnimate`}>
                <div className={styles.statNumber}>2,000+</div>
                <div className={styles.statLabel}>Apps Developed</div>
              </div>
              <div className={`${styles.statCard} statCardAnimate`}>
                <div className={styles.statNumber}>1,000+</div>
                <div className={styles.statLabel}>Games Developed</div>
              </div>
              <div className={`${styles.statCard} statCardAnimate`}>
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
              <div key={index} className={`${styles.serviceCard} animate-on-scroll stagger-${(index % 4) + 1}`}>
                <div className={styles.serviceIcon}>
                  <ThreeDIcon 
                    color="#3b82f6" 
                    secondaryColor="#f97316"
                    size={80}
                  />
                </div>
                <h3>{service.title}</h3>
                <div className={styles.serviceWhoFor}>
                  <span>👥</span> {service.whoFor}
                </div>
                <div className={styles.serviceResult}>
                  <span>🚀</span> {service.businessResult}
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
                  <ThreeDSpinningBadge 
                    color={index === 0 ? "#14a3b8" : index === 1 ? "#ff6b35" : index === 2 ? "#f59e0b" : index === 3 ? "#2e5999" : index === 4 ? "#f47c22" : "#3b82f6"}
                    size={80}
                  >
                    <span style={{ fontSize: "12px", fontWeight: "bold", color: "#3b82f6" }}>{award.name}</span>
                  </ThreeDSpinningBadge>
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
                  <ThreeDIcon 
                    color={["#3b82f6", "#f97316", "#8b5cf6", "#06b6d4", "#10b981", "#ec4899"][index % 6]}
                    secondaryColor={["#f97316", "#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899", "#10b981"][index % 6]}
                    size={60}
                  />
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
                    />
                    <Image
                      src={item.beforeAfter[1]}
                      alt={`${item.title} after`}
                      width={300}
                      height={200}
                      className={styles.portfolioAfterImage}
                    />
                  </div>
                  <div className={styles.portfolioContent}>
                    <h3>{item.title}</h3>
                    <div className={styles.portfolioCaseStudy}>
                      <div className={styles.caseStudyItem}>
                        <strong>🎯 Client Goal:</strong> {item.clientGoal}
                      </div>
                      <div className={styles.caseStudyItem}>
                        <strong>⚠️ Problem:</strong> {item.problem}
                      </div>
                      <div className={styles.caseStudyItem}>
                        <strong>💡 Solution:</strong> {item.solution}
                      </div>
                      <div className={styles.caseStudyItem}>
                        <strong>🛠️ Tech Stack:</strong> {item.techStack.join(", ")}
                      </div>
                      <div className={styles.caseStudyResult}>
                        <strong>📈 Result:</strong> {item.result}
                      </div>
                    </div>
                    <div className={styles.portfolioTags}>
                      {item.tags.map((tag, i) => (
                        <span key={i} className={styles.portfolioTag}>{tag}</span>
                      ))}
                    </div>
                    <div className={styles.portfolioActions}>
                      <Link href={item.video} className="btn btn-secondary btn-sm">
                        ▶️ Watch Demo
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
                  <ThreeDIcon 
                    color={index % 2 === 0 ? "#3b82f6" : "#f97316"}
                    secondaryColor={index % 2 === 0 ? "#f97316" : "#3b82f6"}
                    size={70}
                  />
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
                <span>🎨</span> Frontend
              </h3>
              <div className={styles.techGrid}>
                {techStack.frontend.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={`${styles.techCategory} animate-on-scroll stagger-2`}>
              <h3>
                <span>⚙️</span> Backend & Database
              </h3>
              <div className={styles.techGrid}>
                {techStack.backend.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={`${styles.techCategory} animate-on-scroll stagger-3`}>
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
          <div className="animate-on-scroll">
            <h2>Ready to Create an Impact?</h2>
            <p>Let's discuss your project and turn your vision into reality</p>
            <Link href="/proposal" className="btn btn-accent btn-3d">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className={styles.whyChooseUs}>
        <div className="container">
          <div className={`${styles.sectionHeader} animate-on-scroll`}>
            <h2>Why Choose TechNova?</h2>
            <p>Partner with a team committed to your success</p>
          </div>
          <div className={styles.whyGrid}>
            {whyChooseUs.map((item, index) => (
              <div key={index} className={`${styles.whyCard} animate-on-scroll stagger-${(index % 4) + 1}`}>
                <div className={styles.whyIcon}>
                  <ThreeDIcon 
                    color={["#3b82f6", "#f97316", "#8b5cf6", "#06b6d4"][index % 4]}
                    secondaryColor={["#f97316", "#3b82f6", "#06b6d4", "#8b5cf6"][index % 4]}
                    size={70}
                  />
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
                  <h4>🇦🇪 Dubai, UAE</h4>
                  <p>Business Bay, Dubai</p>
                </div>
                <div className={styles.contactLocation}>
                  <h4>🇮🇳 India</h4>
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
              <h4>Blogs</h4>
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

      {/* ===== CHATBOT ===== */}
      <Chatbot />
    </div>
  );
}

