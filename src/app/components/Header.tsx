"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/metadata";
import { trackCTAClick } from "@/lib/analytics";
import styles from "./Header.module.css";

// Debug mode - set to false to disable all console logs
const DEBUG = true;

const debugLog = (message: string, data?: any) => {
  if (DEBUG) {
    if (data) {
      console.log(`[Header Debug] ${message}`, data);
    } else {
      console.log(`[Header Debug] ${message}`);
    }
  }
};

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState<string | null>(null);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [activeCompanyCategory, setActiveCompanyCategory] = useState<string | null>(null);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [hoveredServiceItem, setHoveredServiceItem] = useState<string | null>(null);
  const [hoveredCompanyItem, setHoveredCompanyItem] = useState<string | null>(null);
  const [mobileServiceCategory, setMobileServiceCategory] = useState<string | null>(null);
  const [mobileCompanyCategory, setMobileCompanyCategory] = useState<string | null>(null);
  
  // Refs to track when we just clicked back (to prevent immediate reopening)
  const justClickedBackServices = useRef(false);
  const justClickedBackCompany = useRef(false);

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
      const scrolled = window.scrollY > 20;
      if (scrolled !== isScrolled) {
        debugLog("Scroll state changed", { scrolled, scrollY: window.scrollY });
        setIsScrolled(scrolled);
      }
    };

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
        setActiveServiceCategory(null);
        setActiveCompanyCategory(null);
        setHoveredServiceItem(null);
      }
    };

    if (isServicesDropdownOpen || isCompanyDropdownOpen) {
      debugLog("Adding click outside listener");
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      debugLog("Removing click outside listener");
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesDropdownOpen, isCompanyDropdownOpen]);

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
          description: "Learn about NexaVibe's mission, vision, and values. Discover how we've grown from a startup to a trusted partner for 2,500+ clients worldwide over 12+ years."
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
          description: "Hear from our satisfied clients about their experience working with NexaVibe. Real feedback from startups, enterprises, and industry leaders."
        },
        { 
          label: "Career", 
          href: "/career",
          description: "Join our growing team of innovators. Explore career opportunities, our work culture, benefits, and how you can grow your career with NexaVibe."
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
          description: "Terms and conditions governing the use of our services. Understand your rights and responsibilities when working with NexaVibe."
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
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        {/* Top Bar */}
        <div className={styles.headerTop}>
          <div className="container">
            <div className={styles.headerTopContent}>
              <div className={styles.headerPhones}>
                <a href={`tel:${siteConfig.contact.phone.uae.replace(/\s/g, "")}`}>
                  <i className="fas fa-phone" aria-hidden="true"></i> {siteConfig.contact.phone.uae}
                </a>
                <a href={`tel:${siteConfig.contact.phone.india.replace(/\s/g, "")}`}>
                  <i className="fas fa-mobile-alt" aria-hidden="true"></i> {siteConfig.contact.phone.india}
                </a>
                <a href={`mailto:${siteConfig.contact.email.general}`}>
                  <i className="fas fa-envelope" aria-hidden="true"></i> {siteConfig.contact.email.general}
                </a>
              </div>
              <div className={styles.headerTopMessage}>
                ⚡ Get a free consultation today!
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container">
          <div className={styles.headerMain}>
            <Link href="/" className={styles.logo} aria-label={`${siteConfig.name} Home`}>
              <div className={styles.logoIcon}>N</div>
              {siteConfig.shortName}
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.nav} role="navigation" aria-label="Main navigation">
              <Link href="/" className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}>
                Home
              </Link>

              {/* Services Dropdown - Two Level System */}
              <div 
                className={styles.navItem}
                onMouseEnter={() => {
                  debugLog("Mouse enter Services navItem");
                  // Close Company dropdown when opening Services
                  setIsCompanyDropdownOpen(false);
                  setActiveCompanyCategory(null);
                  setHoveredCompanyItem(null);
                  setIsServicesDropdownOpen(true);
                }}
                onMouseLeave={(e) => {
                  // Only close if we're actually leaving the navItem area
                  const relatedTarget = e.relatedTarget as HTMLElement | null;
                  const isHTMLElement = relatedTarget && typeof relatedTarget.closest === 'function';
                  debugLog("Mouse leave Services navItem", {
                    relatedTarget: relatedTarget?.tagName || 'null',
                    isHTMLElement,
                    stillInNavItem: isHTMLElement ? !!relatedTarget.closest(`.${styles.navItem}`) : false,
                    stillInDropdown: isHTMLElement ? !!relatedTarget.closest(`.${styles.navDropdown}`) : false,
                  });
                  if (!isHTMLElement || (!relatedTarget.closest(`.${styles.navItem}`) && !relatedTarget.closest(`.${styles.navDropdown}`))) {
                    // Add small delay to prevent accidental closes
                    setTimeout(() => {
                      if (!document.querySelector(`.${styles.navItem}:hover`) && !document.querySelector(`.${styles.navDropdown}:hover`)) {
                        debugLog("Actually leaving Services area - closing dropdown");
                        setIsServicesDropdownOpen(false);
                        setActiveServiceCategory(null);
                        setHoveredServiceItem(null);
                      }
                    }, 100);
                  }
                }}
              >
                <button 
                  className={`${styles.navLink} ${isActive("/services") || isActive("/portfolio") || isActive("/work") ? styles.active : ""}`}
                  aria-label="Services and solutions" 
                  aria-expanded={isServicesDropdownOpen}
                  onClick={() => {
                    const newState = !isServicesDropdownOpen;
                    debugLog("Click Solutions button", { newState });
                    // Close Company when opening Services
                    if (newState) {
                      setIsCompanyDropdownOpen(false);
                      setActiveCompanyCategory(null);
                      setHoveredCompanyItem(null);
                    }
                    setIsServicesDropdownOpen(newState);
                  }}
                >
                  Solutions <span aria-hidden="true">▼</span>
                </button>
                {isServicesDropdownOpen && (
                  <div 
                    className={styles.navDropdown} 
                    role="menu"
                    onMouseEnter={() => {
                      debugLog("Mouse enter Services dropdown");
                      setIsServicesDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      debugLog("Mouse leave Services dropdown - closing");
                      setIsServicesDropdownOpen(false);
                      setActiveServiceCategory(null);
                      setHoveredServiceItem(null);
                    }}
                  >
                    {activeServiceCategory ? (
                      /* Show selected category items */
                      <div className={styles.dropdownContent}>
                        <button 
                          type="button"
                          className={styles.backButton}
                          onClick={(e) => {
                            debugLog("Click Back to Categories button", {
                              currentCategory: activeServiceCategory,
                              hoveredItem: hoveredServiceItem,
                            });
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveServiceCategory(null);
                            setHoveredServiceItem(null);
                            // Set flag to prevent immediate reopening
                            justClickedBackServices.current = true;
                            setTimeout(() => {
                              justClickedBackServices.current = false;
                              debugLog("Back button cooldown expired");
                            }, 300);
                            debugLog("Back button clicked - reset category and hover");
                          }}
                          aria-label="Back to categories"
                        >
                          ← Back to Categories
                        </button>
                        <div className={styles.dropdownWithDescription}>
                          <div className={styles.dropdownGroup}>
                            <div className={styles.dropdownTitle}>
                              {servicesCategories.find(c => c.id === activeServiceCategory)?.title}
                            </div>
                            {servicesCategories
                              .find(c => c.id === activeServiceCategory)
                              ?.items.map((item, index) => {
                                // Use :: separator to avoid issues with category IDs containing hyphens
                                const itemKey = `${activeServiceCategory}::${index}`;
                                const isHovered = hoveredServiceItem === itemKey;
                                return (
                                  <Link 
                                    key={index}
                                    href={item.href} 
                                    className={`${styles.dropdownSubLink} ${isHovered ? styles.hovered : ""}`}
                                    onMouseEnter={() => {
                                      debugLog("Mouse enter service item", { itemKey, label: item.label });
                                      // Clear any pending timeout
                                      if ((window as any).hoverTimeout) {
                                        clearTimeout((window as any).hoverTimeout);
                                        (window as any).hoverTimeout = null;
                                      }
                                      setHoveredServiceItem(itemKey);
                                    }}
                                    onMouseLeave={() => {
                                      debugLog("Mouse leave service item", { itemKey, label: item.label });
                                      // Only clear if not moving to description panel - give more time to move to panel
                                      const timeout = setTimeout(() => {
                                        // Double check if mouse is still not on description panel
                                        if (!document.querySelector(`.${styles.descriptionPanel}:hover`)) {
                                          debugLog("Timeout: clearing hovered item", { itemKey });
                                          setHoveredServiceItem(null);
                                        }
                                      }, 300);
                                      // Store timeout to clear if needed
                                      (window as any).hoverTimeout = timeout;
                                    }}
                                    onClick={() => {
                                      debugLog("Click service item", { itemKey, label: item.label });
                                      setIsServicesDropdownOpen(false);
                                      setActiveServiceCategory(null);
                                      setHoveredServiceItem(null);
                                    }}
                                  >
                                    {item.label}
                                  </Link>
                                );
                              })}
                          </div>
                          {/* Description Panel */}
                          {hoveredServiceItem && (() => {
                            // Use :: separator to properly parse category IDs with hyphens
                            const parts = hoveredServiceItem.split('::');
                            const categoryId = parts[0];
                            const itemIndex = parseInt(parts[1] || '0');
                            const category = servicesCategories.find(c => c.id === categoryId);
                            const item = category?.items[itemIndex];
                            debugLog("Rendering description panel", {
                              hoveredServiceItem,
                              parts,
                              categoryId,
                              itemIndex,
                              hasCategory: !!category,
                              categoryTitle: category?.title,
                              hasItem: !!item,
                              itemLabel: item?.label,
                              hasDescription: !!item?.description,
                            });
                            return item?.description ? (
                              <div 
                                className={styles.descriptionPanel}
                                onMouseEnter={() => {
                                  debugLog("Mouse enter description panel", { hoveredServiceItem });
                                  // Clear any pending timeout to keep description open
                                  if ((window as any).hoverTimeout) {
                                    clearTimeout((window as any).hoverTimeout);
                                    (window as any).hoverTimeout = null;
                                    debugLog("Cleared hover timeout - keeping description open");
                                  }
                                  // Ensure the hovered item stays set
                                  if (hoveredServiceItem) {
                                    setHoveredServiceItem(hoveredServiceItem);
                                  }
                                }}
                                onMouseLeave={() => {
                                  debugLog("Mouse leave description panel");
                                  // Clear any pending timeout
                                  if ((window as any).hoverTimeout) {
                                    clearTimeout((window as any).hoverTimeout);
                                    (window as any).hoverTimeout = null;
                                  }
                                  setHoveredServiceItem(null);
                                }}
                              >
                                <div className={styles.descriptionContent}>
                                  <p className={styles.descriptionText}>
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div style={{ padding: '20px', color: 'red', background: '#fee', borderRadius: '8px' }}>
                                <strong>DEBUG:</strong> No description found<br/>
                                hoveredServiceItem: {hoveredServiceItem}<br/>
                                categoryId: {categoryId}<br/>
                                itemIndex: {itemIndex}<br/>
                                found category: {category ? 'yes' : 'no'}<br/>
                                found item: {item ? 'yes' : 'no'}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    ) : (
                      /* Show all categories */
                      <div className={styles.dropdownContent}>
                        <div className={styles.categoriesGrid}>
                          {servicesCategories.map((category) => (
                            <button
                              key={category.id}
                              className={`${styles.categoryButton} ${
                                activeServiceCategory === category.id ? styles.active : ""
                              }`}
                              aria-label={`${category.title} category`}
                              onClick={() => {
                                // Ignore click if we just clicked back
                                if (justClickedBackServices.current) {
                                  debugLog("Ignoring category click - just clicked back", { categoryId: category.id });
                                  return;
                                }
                                debugLog("Click service category", { categoryId: category.id, title: category.title });
                                setActiveServiceCategory(category.id);
                              }}
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

              {/* Company Dropdown - Two Level System */}
              <div 
                className={styles.navItem}
                onMouseEnter={() => {
                  debugLog("Mouse enter Company navItem");
                  // Close Services dropdown when opening Company
                  setIsServicesDropdownOpen(false);
                  setActiveServiceCategory(null);
                  setHoveredServiceItem(null);
                  setIsCompanyDropdownOpen(true);
                }}
                onMouseLeave={(e) => {
                  const relatedTarget = e.relatedTarget as HTMLElement | null;
                  const isHTMLElement = relatedTarget && typeof relatedTarget.closest === 'function';
                  debugLog("Mouse leave Company navItem", {
                    relatedTarget: relatedTarget?.tagName || 'null',
                    isHTMLElement,
                    stillInNavItem: isHTMLElement ? !!relatedTarget.closest(`.${styles.navItem}`) : false,
                    stillInDropdown: isHTMLElement ? !!relatedTarget.closest(`.${styles.navDropdown}`) : false,
                  });
                  if (!isHTMLElement || (!relatedTarget.closest(`.${styles.navItem}`) && !relatedTarget.closest(`.${styles.navDropdown}`))) {
                    setTimeout(() => {
                      if (!document.querySelector(`.${styles.navItem}:hover`) && !document.querySelector(`.${styles.navDropdown}:hover`)) {
                        debugLog("Actually leaving Company area - closing dropdown");
                        setIsCompanyDropdownOpen(false);
                        setActiveCompanyCategory(null);
                        setHoveredCompanyItem(null);
                      }
                    }, 100);
                  }
                }}
              >
                <button 
                  className={`${styles.navLink} ${isActive("/about") || isActive("/career") || isActive("/testimonials") || isActive("/blog") || isActive("/privacy-policy") || isActive("/terms-of-service") || isActive("/cookie-policy") ? styles.active : ""}`}
                  aria-label="Company information" 
                  aria-expanded={isCompanyDropdownOpen}
                  aria-haspopup="true"
                  onClick={() => {
                    const newState = !isCompanyDropdownOpen;
                    debugLog("Click Company button", { newState });
                    // Close Services when opening Company
                    if (newState) {
                      setIsServicesDropdownOpen(false);
                      setActiveServiceCategory(null);
                      setHoveredServiceItem(null);
                    }
                    setIsCompanyDropdownOpen(newState);
                  }}
                >
                  Company <span aria-hidden="true">▼</span>
                </button>
                {isCompanyDropdownOpen && (
                  <div 
                    className={styles.navDropdown} 
                    style={{ width: "400px" }} 
                    role="menu"
                    onMouseEnter={() => setIsCompanyDropdownOpen(true)}
                    onMouseLeave={(e) => {
                      const relatedTarget = e.relatedTarget as HTMLElement | null;
                      const isHTMLElement = relatedTarget && typeof relatedTarget.closest === 'function';
                      debugLog("Mouse leave Company dropdown", {
                        relatedTarget: relatedTarget?.tagName || 'null',
                        isHTMLElement,
                      });
                      setTimeout(() => {
                        if (!document.querySelector(`.${styles.navItem}:hover`) && !document.querySelector(`.${styles.navDropdown}:hover`)) {
                          debugLog("Mouse leave Company dropdown - closing");
                        setIsCompanyDropdownOpen(false);
                        setActiveCompanyCategory(null);
                        setHoveredCompanyItem(null);
                      }
                      }, 150);
                    }}
                  >
                    {activeCompanyCategory ? (
                      /* Show selected category items */
                      <div className={styles.dropdownContent}>
                        <button 
                          type="button"
                          className={styles.backButton}
                          onClick={(e) => {
                            debugLog("Click Company Back to Categories button", {
                              currentCategory: activeCompanyCategory,
                            });
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveCompanyCategory(null);
                            setHoveredCompanyItem(null);
                            // Set flag to prevent immediate reopening
                            justClickedBackCompany.current = true;
                            setTimeout(() => {
                              justClickedBackCompany.current = false;
                              debugLog("Company back button cooldown expired");
                            }, 300);
                            debugLog("Company back button clicked - reset category and hover");
                          }}
                          aria-label="Back to categories"
                        >
                          ← Back to Categories
                        </button>
                        <div className={styles.dropdownWithDescription}>
                          <div className={styles.dropdownGroup}>
                            <div className={styles.dropdownTitle}>
                              {companyCategories.find(c => c.id === activeCompanyCategory)?.title}
                            </div>
                            {companyCategories
                              .find(c => c.id === activeCompanyCategory)
                              ?.items.map((item, index) => {
                                // Use :: separator to avoid issues with category IDs containing hyphens
                                const itemKey = `${activeCompanyCategory}::${index}`;
                                const isHovered = hoveredCompanyItem === itemKey;
                                return (
                                  <Link 
                                    key={index}
                                    href={item.href} 
                                    className={`${styles.dropdownSubLink} ${isHovered ? styles.hovered : ""}`}
                                    aria-label={item.label}
                                    onMouseEnter={() => {
                                      debugLog("Mouse enter company item", { itemKey, label: item.label });
                                      // Clear any pending timeout
                                      if ((window as any).companyHoverTimeout) {
                                        clearTimeout((window as any).companyHoverTimeout);
                                        (window as any).companyHoverTimeout = null;
                                      }
                                      setHoveredCompanyItem(itemKey);
                                    }}
                                    onMouseLeave={() => {
                                      debugLog("Mouse leave company item", { itemKey, label: item.label });
                                      // Only clear if not moving to description panel - give more time to move to panel
                                      const timeout = setTimeout(() => {
                                        // Double check if mouse is still not on description panel
                                        if (!document.querySelector(`.${styles.descriptionPanel}:hover`)) {
                                          debugLog("Timeout: clearing hovered company item", { itemKey });
                                          setHoveredCompanyItem(null);
                                        }
                                      }, 300);
                                      // Store timeout to clear if needed
                                      (window as any).companyHoverTimeout = timeout;
                                    }}
                                    onClick={() => {
                                      debugLog("Click company item", { itemKey, label: item.label });
                                      setIsCompanyDropdownOpen(false);
                                      setActiveCompanyCategory(null);
                                      setHoveredCompanyItem(null);
                                    }}
                                  >
                                    {item.label}
                                  </Link>
                                );
                              })}
                          </div>
                          {/* Description Panel */}
                          {hoveredCompanyItem && (() => {
                            // Use :: separator to properly parse category IDs with hyphens
                            const parts = hoveredCompanyItem.split('::');
                            const categoryId = parts[0];
                            const itemIndex = parseInt(parts[1] || '0');
                            const category = companyCategories.find(c => c.id === categoryId);
                            const item = category?.items[itemIndex];
                            debugLog("Rendering company description panel", {
                              hoveredCompanyItem,
                              parts,
                              categoryId,
                              itemIndex,
                              hasCategory: !!category,
                              categoryTitle: category?.title,
                              hasItem: !!item,
                              itemLabel: item?.label,
                              hasDescription: !!item?.description,
                            });
                            return item?.description ? (
                              <div 
                                className={styles.descriptionPanel}
                                onMouseEnter={() => {
                                  debugLog("Mouse enter company description panel", { hoveredCompanyItem });
                                  // Clear any pending timeout to keep description open
                                  if ((window as any).companyHoverTimeout) {
                                    clearTimeout((window as any).companyHoverTimeout);
                                    (window as any).companyHoverTimeout = null;
                                    debugLog("Cleared company hover timeout - keeping description open");
                                  }
                                  // Ensure the hovered item stays set
                                  if (hoveredCompanyItem) {
                                    setHoveredCompanyItem(hoveredCompanyItem);
                                  }
                                }}
                                onMouseLeave={() => {
                                  debugLog("Mouse leave company description panel");
                                  // Clear any pending timeout
                                  if ((window as any).companyHoverTimeout) {
                                    clearTimeout((window as any).companyHoverTimeout);
                                    (window as any).companyHoverTimeout = null;
                                  }
                                  setHoveredCompanyItem(null);
                                }}
                              >
                                <div className={styles.descriptionContent}>
                                  <p className={styles.descriptionText}>
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    ) : (
                      /* Show all categories */
                      <div className={styles.dropdownContent}>
                        <div className={styles.categoriesGrid}>
                          {companyCategories.map((category) => (
                            <button
                              key={category.id}
                              className={`${styles.categoryButton} ${
                                activeCompanyCategory === category.id ? styles.active : ""
                              }`}
                              aria-label={`${category.title} category`}
                              onClick={() => {
                                // Ignore click if we just clicked back
                                if (justClickedBackCompany.current) {
                                  debugLog("Ignoring Company category click - just clicked back", { categoryId: category.id });
                                  return;
                                }
                                setActiveCompanyCategory(category.id);
                              }}
                            >
                              <div className={styles.categoryTitle}>{category.title}</div>
                              <div className={styles.categoryCount}>{category.items.length} Items</div>
                              <div className={styles.categoryArrow}>→</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link href="/pricing" className={`${styles.navLink} ${isActive("/pricing") ? styles.active : ""}`}>
                Pricing
              </Link>
              <Link href="/portfolio" className={`${styles.navLink} ${isActive("/portfolio") ? styles.active : ""}`}>
                Portfolio
              </Link>
              <Link href="/blog" className={`${styles.navLink} ${isActive("/blog") ? styles.active : ""}`}>
                Blog
              </Link>
              <Link href="/contact" className={`${styles.navLink} ${isActive("/contact") ? styles.active : ""}`}>
                Contact
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className={styles.headerActions}>
              <Link href="/proposal" className="btn btn-primary btn-sm">
                Get Free Audit
              </Link>
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
                <div className={styles.logoIcon}>N</div>
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
              
              {/* Mobile Solutions Dropdown */}
              <div className={styles.mobileNavItem}>
                <button
                  className={`${styles.mobileNavLink} ${isActive("/services") || isActive("/portfolio") || isActive("/work") ? styles.active : ""}`}
                  onClick={() => {
                    const newState = mobileServiceCategory ? null : "categories";
                    debugLog("Click mobile Solutions button", { newState, currentState: mobileServiceCategory });
                    // Close mobile Company when opening Services
                    if (newState) {
                      setMobileCompanyCategory(null);
                    }
                    setMobileServiceCategory(newState);
                  }}
                >
                  Solutions {mobileServiceCategory ? "▲" : "▼"}
                </button>
                {mobileServiceCategory && (
                  <div className={styles.mobileDropdown}>
                    {mobileServiceCategory === "categories" ? (
                      <div className={styles.mobileCategoriesList}>
                        {servicesCategories.map((category) => (
                          <button
                            key={category.id}
                            className={styles.mobileCategoryButton}
                            onClick={() => {
                              debugLog("Click mobile service category", { categoryId: category.id, title: category.title });
                              setMobileServiceCategory(category.id);
                            }}
                          >
                            {category.title} →
                          </button>
                        ))}
                        <button
                          className={styles.mobileBackButton}
                          onClick={() => {
                            debugLog("Click mobile Close button");
                            setMobileServiceCategory(null);
                          }}
                        >
                          ← Close
                        </button>
                      </div>
                    ) : (
                      <div className={styles.mobileServicesList}>
                        <button
                          className={styles.mobileBackButton}
                          onClick={() => {
                            debugLog("Click mobile Back button", { currentCategory: mobileServiceCategory });
                            setMobileServiceCategory("categories");
                          }}
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
                Portfolio
              </Link>
              <Link href="/pricing" className={`${styles.mobileNavLink} ${isActive("/pricing") ? styles.active : ""}`} onClick={closeMobileMenu}>
                Pricing
              </Link>
              
              {/* Mobile Company Dropdown */}
              <div className={styles.mobileNavItem}>
                <button
                  className={`${styles.mobileNavLink} ${isActive("/about") || isActive("/career") || isActive("/testimonials") || isActive("/blog") || isActive("/privacy-policy") || isActive("/terms-of-service") || isActive("/cookie-policy") ? styles.active : ""}`}
                  onClick={() => {
                    const newState = mobileCompanyCategory ? null : "categories";
                    debugLog("Click mobile Company button", { newState, currentState: mobileCompanyCategory });
                    // Close mobile Services when opening Company
                    if (newState) {
                      setMobileServiceCategory(null);
                    }
                    setMobileCompanyCategory(newState);
                  }}
                >
                  Company {mobileCompanyCategory ? "▲" : "▼"}
                </button>
                {mobileCompanyCategory && (
                  <div className={styles.mobileDropdown}>
                    {mobileCompanyCategory === "categories" ? (
                      <div className={styles.mobileCategoriesList}>
                        {companyCategories.map((category) => (
                          <button
                            key={category.id}
                            className={styles.mobileCategoryButton}
                            aria-label={`${category.title} category`}
                            onClick={() => setMobileCompanyCategory(category.id)}
                          >
                            {category.title} →
                          </button>
                        ))}
                        <button
                          className={styles.mobileBackButton}
                          onClick={() => setMobileCompanyCategory(null)}
                        >
                          ← Close
                        </button>
                      </div>
                    ) : (
                      <div className={styles.mobileServicesList}>
                        <button
                          className={styles.mobileBackButton}
                          onClick={() => setMobileCompanyCategory("categories")}
                        >
                          ← Back
                        </button>
                        {companyCategories
                          .find(c => c.id === mobileCompanyCategory)
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

              <Link href="/blog" className={`${styles.mobileNavLink} ${isActive("/blog") ? styles.active : ""}`} onClick={closeMobileMenu}>
                Blog
              </Link>
              <Link href="/contact" className={`${styles.mobileNavLink} ${isActive("/contact") ? styles.active : ""}`} onClick={closeMobileMenu}>
                Contact
              </Link>
            </nav>
            <div className={styles.mobileMenuActions}>
              <Link 
                href="/proposal" 
                className="btn btn-primary" 
                onClick={(e) => {
                  trackCTAClick("Get Free Audit", "mobile_menu", pathname);
                  closeMobileMenu();
                }}
              >
                Get Free Audit
              </Link>
              <Link 
                href="/request-a-call" 
                className="btn btn-secondary" 
                onClick={(e) => {
                  trackCTAClick("Schedule a Call", "mobile_menu", pathname);
                  closeMobileMenu();
                }}
              >
                Schedule a Call
              </Link>
            </div>
            <div className={styles.mobileMenuFooter}>
              <div className={styles.mobileContactInfo}>
                <p>
                  <i className="fas fa-phone" aria-hidden="true"></i> {siteConfig.contact.phone.uae}
                </p>
                <p>
                  <i className="fas fa-mobile-alt" aria-hidden="true"></i> {siteConfig.contact.phone.india}
                </p>
                <p>
                  <i className="fas fa-envelope" aria-hidden="true"></i> {siteConfig.contact.email.general}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
