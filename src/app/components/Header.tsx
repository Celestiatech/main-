"use client";

import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/metadata";
import { trackCTAClick } from "@/lib/analytics";
import styles from "./Header.module.css";

// Debug mode - set to false to disable all console logs
const DEBUG = false;

const debugLog = (message: string, data?: any) => {
  if (DEBUG) {
    if (data) {
      console.log(`[Header Debug] ${message}`, data);
    } else {
      console.log(`[Header Debug] ${message}`);
    }
  }
};

function HeaderInlineIcon({ children }: { children: ReactNode }) {
  return <span className={styles.headerInlineIcon} aria-hidden="true">{children}</span>;
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72l.33 2.57a2 2 0 0 1-.57 1.74l-1.2 1.2a16 16 0 0 0 7.2 7.2l1.2-1.2a2 2 0 0 1 1.74-.57l2.57.33A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [suppressHeaderMotion, setSuppressHeaderMotion] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState<string | null>(null);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [activeCompanyCategory, setActiveCompanyCategory] = useState<string | null>(null);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [hoveredServiceItem, setHoveredServiceItem] = useState<string | null>(null);
  const [hoveredCompanyItem, setHoveredCompanyItem] = useState<string | null>(null);
  const [mobileServiceCategory, setMobileServiceCategory] = useState<string | null>(null);
  const [mobileCompanyCategory, setMobileCompanyCategory] = useState<string | null>(null);
  const [navIndicatorStyle, setNavIndicatorStyle] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  
  // Refs to track when we just clicked back (to prevent immediate reopening)
  const justClickedBackServices = useRef(false);
  const justClickedBackCompany = useRef(false);
  const lastScrollYRef = useRef(0);
  const scrollTickingRef = useRef(false);

  const updateNavIndicator = (el: HTMLElement | null) => {
    if (!el || !navRef.current) {
      setNavIndicatorStyle(null);
      return;
    }
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setNavIndicatorStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  };

  const popularToolsButton = (
    <>
      <span className={styles.gooFilter} aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="header-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </span>
      <span className={styles.popularToolsWrap}>
        <Link href="/popular-tools" className={`btn btn-sm ${styles.popularToolsButton}`}>
          See Popular Tools
        </Link>
        <span className={styles.popularToolsEffect} aria-hidden="true">
          <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
          <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
          <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
          <span className={styles.popularToolsBlob}></span>
          <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
          <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
          <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
        </span>
      </span>
    </>
  );

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Debug state changes
  useEffect(() => {
    debugLog("State changed", {
      isMobileMenuOpen,
      isScrolled,
      activeServiceCategory,
      isServicesDropdownOpen,
      activeCompanyCategory,
      isCompanyDropdownOpen,
      hoveredServiceItem,
      hoveredCompanyItem,
      mobileServiceCategory,
      mobileCompanyCategory,
    });
  }, [
    isMobileMenuOpen,
    isScrolled,
    activeServiceCategory,
    isServicesDropdownOpen,
    activeCompanyCategory,
    isCompanyDropdownOpen,
    hoveredServiceItem,
    hoveredCompanyItem,
    mobileServiceCategory,
    mobileCompanyCategory,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTickingRef.current) return;
      scrollTickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrolled = currentScrollY > 20;
        if (scrolled !== isScrolled) {
          debugLog("Scroll state changed", { scrolled, scrollY: currentScrollY });
          setIsScrolled(scrolled);
        }

        lastScrollYRef.current = currentScrollY;
        scrollTickingRef.current = false;
      });
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      debugLog("Click outside detected", {
        target: target.tagName,
        className: target.className,
        closestNavItem: !!target.closest(`.${styles.navItem}`),
        closestDropdown: !!target.closest(`.${styles.navDropdown}`),
        closestBackButton: !!target.closest(`.${styles.backButton}`),
        closestDescriptionPanel: !!target.closest(`.${styles.descriptionPanel}`),
      });

      // Don't close if clicking on back button or inside dropdown
      if (target.closest(`.${styles.backButton}`) || target.closest(`.${styles.descriptionPanel}`)) {
        debugLog("Click on back button or description panel - ignoring");
        return;
      }
      if (!target.closest(`.${styles.navItem}`) && !target.closest(`.${styles.navDropdown}`)) {
        debugLog("Click outside dropdown - closing all dropdowns");
        setIsServicesDropdownOpen(false);
        setIsCompanyDropdownOpen(false);
        setIsMoreMenuOpen(false);
        setActiveServiceCategory(null);
        setActiveCompanyCategory(null);
        setHoveredServiceItem(null);
      }
    };

    if (isServicesDropdownOpen || isCompanyDropdownOpen || isMoreMenuOpen) {
      debugLog("Adding click outside listener");
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      debugLog("Removing click outside listener");
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesDropdownOpen, isCompanyDropdownOpen, isMoreMenuOpen]);

  useEffect(() => {
    // When the header switches between states, avoid showing intermediate transitions.
    setSuppressHeaderMotion(true);
    const t = window.setTimeout(() => setSuppressHeaderMotion(false), 220);
    return () => window.clearTimeout(t);
  }, [isScrolled]);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    debugLog("Toggle mobile menu", { newState });
    setIsMobileMenuOpen(newState);
  };

  const closeMobileMenu = () => {
    debugLog("Close mobile menu");
    setIsMobileMenuOpen(false);
    setMobileServiceCategory(null);
    setMobileCompanyCategory(null);
  };

  const companyCategories = [
    {
      id: "about",
      title: "About Us",
      items: [
        { 
          label: "Company Overview", 
          href: "/about",
          description: "Learn about Celestiatech's mission, vision, and values. Discover how we've grown from a startup to a trusted partner for 2,500+ clients worldwide over 12+ years."
        },
        { 
          label: "Our Team", 
          href: "/about",
          description: "Meet our talented team of 200+ developers, designers, and strategists. We bring together expertise from diverse backgrounds to deliver exceptional solutions."
        },
        { 
          label: "Our Story", 
          href: "/about",
          description: "From our founding in 2012 to becoming a leading IT solutions provider. Explore our journey, milestones, and commitment to innovation and excellence."
        },
        { 
          label: "Company Culture", 
          href: "/about",
          description: "Our culture of collaboration, continuous learning, and client-first approach. We foster an environment where creativity and technical excellence thrive."
        },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      items: [
        { 
          label: "Blog & Articles", 
          href: "/blog",
          description: "Insights, tutorials, and industry trends from our expert team. Stay updated with the latest in technology, development practices, and business strategies."
        },
        { 
          label: "Case Studies", 
          href: "/portfolio",
          description: "Detailed case studies showcasing our successful projects. See how we've helped clients achieve their goals with real-world examples and metrics."
        },
        { 
          label: "Testimonials", 
          href: "/testimonials",
          description: "Hear from our satisfied clients about their experience working with Celestiatech. Real feedback from startups, enterprises, and industry leaders."
        },
        { 
          label: "Careers", 
          href: "/career",
          description: "Join our growing team of innovators. Explore career opportunities, our work culture, benefits, and how you can grow your career with Celestiatech."
        },
      ],
    },
    {
      id: "legal",
      title: "Legal",
      items: [
        { 
          label: "Privacy Policy", 
          href: "/privacy-policy",
          description: "How we collect, use, and protect your personal information. Our commitment to data privacy and GDPR compliance in all our operations."
        },
        { 
          label: "Terms of Service", 
          href: "/terms-of-service",
          description: "Terms and conditions governing the use of our services. Understand your rights and responsibilities when working with Celestiatech."
        },
        { 
          label: "Cookie Policy", 
          href: "/cookie-policy",
          description: "Information about how we use cookies and similar technologies on our website. Learn how to manage your cookie preferences."
        },
      ],
    },
  ];

  const servicesCategories = [
    {
      id: "custom-development",
      title: "Custom Development",
      items: [
        { 
          label: "Web Applications", 
          href: "/services",
          description: "Build scalable, high-performance web applications using modern frameworks. From enterprise solutions to startup MVPs, we deliver robust applications that drive business growth."
        },
        { 
          label: "Mobile App Dev", 
          href: "/services",
          description: "Native and cross-platform mobile app development for iOS and Android. Create engaging user experiences with React Native, Flutter, or native technologies."
        },
        { 
          label: "SaaS Platforms", 
          href: "/services",
          description: "End-to-end SaaS platform development with subscription management, multi-tenancy, and scalable architecture. Launch your SaaS product faster with our proven frameworks."
        },
        { 
          label: "MVP Development", 
          href: "/services",
          description: "Rapid MVP development to validate your idea quickly. Get to market in 60-90 days with a production-ready minimum viable product that attracts investors and early adopters."
        },
        { 
          label: "Startup Solutions", 
          href: "/services",
          description: "Complete tech solutions for startups - from ideation to launch. We help funded startups build scalable products that can handle rapid growth and user acquisition."
        },
      ],
    },
    {
      id: "growth-scale",
      title: "Growth & Scale",
      items: [
        { 
          label: "Performance Optimization", 
          href: "/services",
          description: "Optimize your application's speed and efficiency. We improve load times by up to 300%, reduce server costs, and enhance user experience through performance tuning."
        },
        { 
          label: "Cloud & DevOps", 
          href: "/services",
          description: "Cloud infrastructure setup and DevOps automation. Deploy scalable, secure applications on AWS, Azure, or GCP with CI/CD pipelines and monitoring."
        },
        { 
          label: "System Integration", 
          href: "/services",
          description: "Integrate your systems with third-party APIs, payment gateways, and enterprise tools. Seamless data flow and automation across your tech stack."
        },
        { 
          label: "API Development", 
          href: "/services",
          description: "RESTful and GraphQL API development with comprehensive documentation. Build secure, scalable APIs that power your applications and enable integrations."
        },
        { 
          label: "Database Design", 
          href: "/services",
          description: "Optimized database architecture and design. From schema design to query optimization, we ensure your data layer is performant and scalable."
        },
      ],
    },
    {
      id: "ai-innovation",
      title: "AI & Innovation",
      items: [
        { 
          label: "Machine Learning", 
          href: "/services",
          description: "Custom ML models and algorithms to solve business problems. From predictive analytics to recommendation engines, we build AI solutions that drive insights."
        },
        { 
          label: "AI Chatbots", 
          href: "/services",
          description: "Intelligent chatbots and virtual assistants powered by NLP and AI. Enhance customer support, automate responses, and improve user engagement."
        },
        { 
          label: "Predictive Analytics", 
          href: "/services",
          description: "Data-driven predictions and forecasting models. Turn your data into actionable insights with advanced analytics and machine learning."
        },
        { 
          label: "Automation", 
          href: "/services",
          description: "Business process automation using AI and RPA. Streamline workflows, reduce manual work, and increase operational efficiency."
        },
        { 
          label: "NLP Services", 
          href: "/services",
          description: "Natural Language Processing solutions for text analysis, sentiment analysis, and language understanding. Extract insights from unstructured data."
        },
      ],
    },
    {
      id: "web3",
      title: "Web3 Solutions",
      items: [
        { 
          label: "Smart Contracts", 
          href: "/services",
          description: "Secure smart contract development and auditing on Ethereum, Solana, and other blockchains. Deploy reliable, gas-optimized contracts for your DeFi or NFT project."
        },
        { 
          label: "DeFi Platforms", 
          href: "/services",
          description: "Decentralized finance platform development. Build DEXs, lending protocols, yield farming platforms, and other DeFi applications with security-first approach."
        },
        { 
          label: "NFT Marketplaces", 
          href: "/services",
          description: "Complete NFT marketplace development with minting, trading, and auction features. Create your own NFT platform with custom features and integrations."
        },
        { 
          label: "Blockchain Apps", 
          href: "/services",
          description: "Full-stack blockchain applications (dApps) with Web3 integration. Build decentralized applications that leverage blockchain technology for transparency and security."
        },
        { 
          label: "Crypto Solutions", 
          href: "/services",
          description: "Cryptocurrency exchange platforms, wallets, and trading solutions. Secure, scalable crypto infrastructure for your business needs."
        },
      ],
    },
    {
      id: "design-ux",
      title: "Design & UX",
      items: [
        { 
          label: "UI/UX Design", 
          href: "/services",
          description: "User-centered design that converts. We create intuitive, beautiful interfaces that enhance user experience and drive engagement and conversions."
        },
        { 
          label: "Product Design", 
          href: "/services",
          description: "End-to-end product design from concept to launch. User research, wireframing, prototyping, and design systems for digital products."
        },
        { 
          label: "Branding", 
          href: "/services",
          description: "Complete brand identity design including logos, color schemes, typography, and brand guidelines. Create a memorable brand that resonates with your audience."
        },
        { 
          label: "Animation", 
          href: "/services",
          description: "Engaging animations and micro-interactions that bring your interface to life. Enhance user experience with smooth, purposeful animations."
        },
        { 
          label: "Design Systems", 
          href: "/services",
          description: "Comprehensive design systems and component libraries. Maintain consistency across your products with scalable design tokens and reusable components."
        },
      ],
    },
    {
      id: "support",
      title: "Support Services",
      items: [
        { 
          label: "Quality Assurance", 
          href: "/services",
          description: "Comprehensive QA and testing services. Manual and automated testing to ensure bug-free, high-quality software releases."
        },
        { 
          label: "Maintenance & Support", 
          href: "/services",
          description: "Ongoing maintenance and technical support for your applications. Keep your software updated, secure, and performing optimally."
        },
        { 
          label: "Performance Monitoring", 
          href: "/services",
          description: "24/7 monitoring and alerting for your applications. Proactive issue detection and performance tracking to ensure uptime and reliability."
        },
        { 
          label: "Security Audit", 
          href: "/services",
          description: "Comprehensive security audits and penetration testing. Identify vulnerabilities and ensure your application meets security best practices."
        },
        { 
          label: "Code Review", 
          href: "/services",
          description: "Expert code reviews to improve code quality, maintainability, and performance. Get actionable feedback from senior developers."
        },
      ],
    },
  ];

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${suppressHeaderMotion ? styles.motionOff : ""}`}
      >
        {/* Top Bar */}
        <div className={styles.headerTop}>
          <div className={styles.headerTopInner}>
            <div className={styles.headerTopContent}>
              <div className={styles.headerTopBadge}>
                🏆 Digital Agency of the Year 2024, 25
                <span className={styles.headerTopBadgeSep}>|</span>
                Free Website &amp; SEO Audit
              </div>
              <div className={styles.headerTopContact}>
                <a href={`mailto:${siteConfig.contact.email.general}`}>
                  <HeaderInlineIcon><MailIcon /></HeaderInlineIcon>
                  {siteConfig.contact.email.general}
                </a>
                <span className={styles.headerTopSep}>|</span>
                <a href={`tel:${siteConfig.contact.phone.india.replace(/\s/g, "")}`}>
                  <HeaderInlineIcon><SmartphoneIcon /></HeaderInlineIcon>
                  {siteConfig.contact.phone.india}
                </a>
                <a href={`https://wa.me/${siteConfig.contact.phone.uae.replace(/[\s+]/g, "")}`} target="_blank" rel="noopener noreferrer" className={styles.headerTopWhatsapp}>
                  <HeaderInlineIcon><WhatsAppIcon /></HeaderInlineIcon>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={styles.headerInner}>
          <div className={styles.headerMain}>
            <Link href="/" className={styles.logo} aria-label={`${siteConfig.name} Home`}>
              <span className={styles.logoIcon} aria-hidden="true">
                  <Image
                  src="/logos/w3tech.png"
                  alt=""
                  width={112}
                  height={112}
                  className={styles.logoImage}
                  sizes="(max-width: 768px) 56px, 102px"
                  priority
                />
              </span>
              <span className={styles.logoText}>
                <span className={styles.logoName}>W3TECH</span>
                <span className={styles.logoSub}>
                  <GoogleIcon />
                  Google Partner
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.nav} ref={navRef} role="navigation" aria-label="Main navigation"
              onMouseLeave={() => {
                const activeEl = navRef.current?.querySelector(`.${styles.navLink}.${styles.active}`) as HTMLElement | null;
                updateNavIndicator(activeEl || null);
              }}
            >
              {navIndicatorStyle && (
                <span className={styles.navIndicator} style={{ left: navIndicatorStyle.left, width: navIndicatorStyle.width }} aria-hidden="true" />
              )}

              <Link href="/" className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`} onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}>
                Home
              </Link>

              <Link href="/portfolio" className={`${styles.navLink} ${isActive("/portfolio") ? styles.active : ""}`} onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}>
                Case Studies
              </Link>

              <Link href="/about" className={`${styles.navLink} ${isActive("/about") ? styles.active : ""}`} onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}>
                Who We Are
              </Link>

              {/* Services Dropdown */}
              <div className={styles.navItem}
                onMouseEnter={() => {
                  setIsServicesDropdownOpen(true);
                  const btn = (document.querySelector(`.${styles.navItem} .${styles.navLink}`) as HTMLElement) || null;
                  if (btn) updateNavIndicator(btn);
                }}
                onMouseLeave={(e) => {
                  const relatedTarget = e.relatedTarget as HTMLElement | null;
                  const isHTMLElement = relatedTarget && typeof relatedTarget.closest === 'function';
                  if (!isHTMLElement || (!relatedTarget.closest(`.${styles.navItem}`) && !relatedTarget.closest(`.${styles.navDropdown}`))) {
                    setTimeout(() => {
                      if (!document.querySelector(`.${styles.navItem}:hover`) && !document.querySelector(`.${styles.navDropdown}:hover`)) {
                        setIsServicesDropdownOpen(false);
                        setActiveServiceCategory(null);
                        setHoveredServiceItem(null);
                      }
                    }, 100);
                  }
                }}
              >
                <button
                  className={`${styles.navLink} ${isActive("/services") || isActive("/work") ? styles.active : ""}`}
                  onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
                  aria-expanded={isServicesDropdownOpen}
                  onClick={() => {
                    const newState = !isServicesDropdownOpen;
                    setIsServicesDropdownOpen(newState);
                  }}
                >
                  Services <span aria-hidden="true">▼</span>
                </button>
                {isServicesDropdownOpen && (
                  <div className={styles.navDropdown} role="menu"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => {
                      setIsServicesDropdownOpen(false);
                      setActiveServiceCategory(null);
                      setHoveredServiceItem(null);
                    }}
                  >
                    {activeServiceCategory ? (
                      <div className={styles.dropdownContent}>
                        <button type="button" className={styles.backButton}
                          onClick={(e) => {
                            e.preventDefault(); e.stopPropagation();
                            setActiveServiceCategory(null);
                            setHoveredServiceItem(null);
                            justClickedBackServices.current = true;
                            setTimeout(() => { justClickedBackServices.current = false; }, 300);
                          }}
                          aria-label="Back to categories"
                        >← Back to Categories</button>
                        <div className={styles.dropdownWithDescription}>
                          <div className={styles.dropdownGroup}>
                            <div className={styles.dropdownTitle}>
                              {servicesCategories.find(c => c.id === activeServiceCategory)?.title}
                            </div>
                            {servicesCategories.find(c => c.id === activeServiceCategory)?.items.map((item, index) => {
                              const itemKey = `${activeServiceCategory}::${index}`;
                              return (
                                <Link key={index} href={item.href}
                                  className={`${styles.dropdownSubLink} ${hoveredServiceItem === itemKey ? styles.hovered : ""}`}
                                  onMouseEnter={() => setHoveredServiceItem(itemKey)}
                                  onMouseLeave={() => {
                                    setTimeout(() => {
                                      if (!document.querySelector(`.${styles.descriptionPanel}:hover`)) setHoveredServiceItem(null);
                                    }, 300);
                                  }}
                                  onClick={() => { setIsServicesDropdownOpen(false); setActiveServiceCategory(null); setHoveredServiceItem(null); }}
                                >{item.label}</Link>
                              );
                            })}
                          </div>
                          {hoveredServiceItem && (() => {
                            const parts = hoveredServiceItem.split('::');
                            const category = servicesCategories.find(c => c.id === parts[0]);
                            const item = category?.items[parseInt(parts[1] || '0')];
                            return item?.description ? (
                              <div className={styles.descriptionPanel}
                                onMouseEnter={() => { if ((window as any).hoverTimeout) clearTimeout((window as any).hoverTimeout); setHoveredServiceItem(hoveredServiceItem); }}
                                onMouseLeave={() => setHoveredServiceItem(null)}
                              >
                                <div className={styles.descriptionContent}>
                                  <p className={styles.descriptionText}>{item.description}</p>
                                </div>
                              </div>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.dropdownContent}>
                        <div className={styles.categoriesGrid}>
                          {servicesCategories.map((category) => (
                            <button key={category.id}
                              className={`${styles.categoryButton} ${activeServiceCategory === category.id ? styles.active : ""}`}
                              onClick={() => { if (justClickedBackServices.current) return; setActiveServiceCategory(category.id); }}
                            >
                              <div className={styles.categoryTitle}>{category.title}</div>
                              <div className={styles.categoryCount}>{category.items.length} Services</div>
                              <div className={styles.categoryArrow}>→</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link href="/blog" className={`${styles.navLink} ${isActive("/blog") ? styles.active : ""}`} onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}>
                Blog
              </Link>

              <Link href="/contact" className={`${styles.navLink} ${isActive("/contact") ? styles.active : ""}`} onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}>
                Contact Us
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className={styles.headerActions}>
              <span className={`${styles.popularToolsWrap} ${isScrolled ? styles.hideQuote : ""}`}>
                <Link href="/contact" className={`btn btn-sm ${styles.popularToolsButton}`}>
                  Get a Quote
                </Link>
                <span className={styles.popularToolsEffect} aria-hidden="true">
                  <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
                  <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
                  <span className={`${styles.bubbleCircle} ${styles.bubbleTopLeft}`}></span>
                  <span className={styles.popularToolsBlob}></span>
                  <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
                  <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
                  <span className={`${styles.bubbleCircle} ${styles.bubbleBottomRight}`}></span>
                </span>
              </span>
              {popularToolsButton}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuBtn}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu} aria-hidden="true">
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileMenuHeader}>
              <Link href="/" className={styles.mobileLogo} onClick={closeMobileMenu}>
                <span className={styles.logoIcon} aria-hidden="true">
	                  <Image
	                    src="/logos/w3tech.png"
	                    alt=""
	                    width={112}
	                    height={112}
	                    className={styles.logoImage}
	                    sizes="56px"
	                  />
                </span>
                <span>{siteConfig.shortName}</span>
              </Link>
              <button
                className={styles.mobileMenuClose}
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                ✕
              </button>
            </div>
            <nav className={styles.mobileNav}>
              <Link href="/" className={`${styles.mobileNavLink} ${isActive("/") ? styles.active : ""}`} onClick={closeMobileMenu}>
                Home
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div className={styles.mobileNavItem}>
                <button
                  className={`${styles.mobileNavLink} ${isActive("/services") || isActive("/portfolio") || isActive("/work") ? styles.active : ""}`}
                  onClick={() => {
                    const newState = mobileServiceCategory ? null : "categories";
                    if (newState) {
                      setMobileCompanyCategory(null);
                    }
                    setMobileServiceCategory(newState);
                  }}
                >
                  Services {mobileServiceCategory ? "▲" : "▼"}
                </button>
                {mobileServiceCategory && (
                  <div className={styles.mobileDropdown}>
                    {mobileServiceCategory === "categories" ? (
                      <div className={styles.mobileCategoriesList}>
                        {servicesCategories.map((category) => (
                          <button
                            key={category.id}
                            className={styles.mobileCategoryButton}
                            onClick={() => setMobileServiceCategory(category.id)}
                          >
                            {category.title} →
                          </button>
                        ))}
                        <button
                          className={styles.mobileBackButton}
                          onClick={() => setMobileServiceCategory(null)}
                        >
                          ← Close
                        </button>
                      </div>
                    ) : (
                      <div className={styles.mobileServicesList}>
                        <button
                          className={styles.mobileBackButton}
                          onClick={() => setMobileServiceCategory("categories")}
                        >
                          ← Back
                        </button>
                        {servicesCategories
                          .find(c => c.id === mobileServiceCategory)
                          ?.items.map((item, index) => (
                            <Link
                              key={index}
                              href={item.href}
                              className={styles.mobileServiceLink}
                              onClick={closeMobileMenu}
                            >
                              {item.label}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link href="/portfolio" className={`${styles.mobileNavLink} ${isActive("/portfolio") ? styles.active : ""}`} onClick={closeMobileMenu}>
                Case Studies
              </Link>
              <Link href="/about" className={`${styles.mobileNavLink} ${isActive("/about") ? styles.active : ""}`} onClick={closeMobileMenu}>
                Who We Are
              </Link>
              <Link href="/blog" className={`${styles.mobileNavLink} ${isActive("/blog") ? styles.active : ""}`} onClick={closeMobileMenu}>
                Blog
              </Link>
              <Link href="/contact" className={`${styles.mobileNavLink} ${isActive("/contact") ? styles.active : ""}`} onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </nav>
            <div className={styles.mobileMenuActions}>
              <Link 
                href="/contact" 
                className="btn" 
                style={{ background: '#ff8c00', color: '#fff', border: 'none', borderRadius: '999px', fontWeight: 600, padding: '10px 24px' }}
                onClick={(e) => {
                  trackCTAClick("Get a Quote", "mobile_menu", pathname);
                  closeMobileMenu();
                }}
              >
                Get a Quote
              </Link>
            </div>
            <div className={styles.mobileMenuFooter}>
              <div className={styles.mobileContactInfo}>
                <p>
                  <HeaderInlineIcon><PhoneIcon /></HeaderInlineIcon>
                  {siteConfig.contact.phone.uae}
                </p>
                <p>
                  <HeaderInlineIcon><SmartphoneIcon /></HeaderInlineIcon>
                  {siteConfig.contact.phone.india}
                </p>
                <p>
                  <HeaderInlineIcon><MailIcon /></HeaderInlineIcon>
                  <span aria-label={siteConfig.contact.email.general}>Email us</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
