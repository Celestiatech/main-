
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";

export default function CareerPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Careers" },
  ];

  const openPositions = [
    {
      title: "Senior React Developer",
      department: "Engineering",
      location: "Dubai, UAE",
      type: "Full-time",
      description: "WeWe'reapos;re looking for an experienced React developer to join our team and build cutting-edge web applications.",
      requirements: [
        "5+ years of experience with React and TypeScript",
        "Strong knowledge of Next.js and modern frontend practices",
        "Experience with state management (Redux, Zustand, or similar)",
        "Familiarity with testing frameworks (Jest, React Testing Library)",
      ],
    },
    {
      title: "Mobile App Developer",
      department: "Engineering",
      location: "Mohali, India",
      type: "Full-time",
      description: "Join our mobile development team to create innovative iOS and Android applications.",
      requirements: [
        "3+ years of experience in mobile development",
        "Proficiency in Swift, Kotlin, or Flutter",
        "Experience with React Native is a plus",
        "Strong understanding of mobile UI/UX principles",
      ],
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "WeWe'reapos;re seeking a talented designer to create beautiful and intuitive user experiences.",
      requirements: [
        "4+ years of UI/UX design experience",
        "Proficiency in Figma, Sketch, or Adobe XD",
        "Strong portfolio showcasing web and mobile designs",
        "Experience with design systems and prototyping",
      ],
    },
    {
      title: "DevOps Engineer",
      department: "Operations",
      location: "Dubai, UAE",
      type: "Full-time",
      description: "Help us build and maintain scalable cloud infrastructure for our clients.",
      requirements: [
        "4+ years of DevOps experience",
        "Strong knowledge of AWS, Azure, or GCP",
        "Experience with Docker, Kubernetes, and CI/CD pipelines",
        "Familiarity with Infrastructure as Code tools",
      ],
    },
    {
      title: "Blockchain Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Join our blockchain team to build Web3 solutions and smart contracts.",
      requirements: [
        "3+ years of blockchain development experience",
        "Strong knowledge of Solidity and Ethereum",
        "Experience with Web3.js or Ethers.js",
        "Understanding of DeFi protocols and NFT standards",
      ],
    },
    {
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Mohali, India",
      type: "Full-time",
      description: "Work on cutting-edge AI solutions for our clients across various industries.",
      requirements: [
        "3+ years of machine learning experience",
        "Strong knowledge of Python, TensorFlow, or PyTorch",
        "Experience with NLP, computer vision, or recommendation systems",
        "Published research or open-source contributions are a plus",
      ],
    },
  ];

  const benefits = [
    { icon: "💰", title: "Competitive Salary", desc: "Industry-leading compensation packages" },
    { icon: "🏠", title: "Remote Work", desc: "Flexible work from anywhere" },
    { icon: "🏥", title: "Health Insurance", desc: "Comprehensive medical coverage" },
    { icon: "🎓", title: "Learning Budget", desc: "Annual budget for courses and conferences" },
    { icon: "🏖️", title: "Unlimited PTO", desc: "Take time off when you need it" },
    { icon: "👶", title: "Parental Leave", desc: "Generous leave for new parents" },
    { icon: "🎮", title: "Team Events", desc: "Regular team building activities" },
    { icon: "💻", title: "Latest Tech", desc: "Top-of-the-line equipment" },
  ];

  const [selectedJob, setSelectedJob] = useState<number | null>(null);

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
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>📱 Mobile App Development</div>
                    <Link href="/services" className={styles.dropdownSubLink}>iOS App Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Android Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>React Native Apps</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Flutter Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Cross-Platform Apps</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Mobile App Design</Link>
                  </div>
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🌐 Web Development</div>
                    <Link href="/services" className={styles.dropdownSubLink}>Frontend Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Backend Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>React.js Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Next.js Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>E-commerce Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>CMS Development</Link>
                  </div>
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🎮 Game Development</div>
                    <Link href="/services" className={styles.dropdownSubLink}>Unity Game Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Unreal Engine Games</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>2D Game Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>3D Game Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Multiplayer Games</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Game UI/UX Design</Link>
                  </div>
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🤖 AI & Blockchain</div>
                    <Link href="/services" className={styles.dropdownSubLink}>Machine Learning</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>AI Chatbots</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Blockchain Development</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Smart Contracts</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>NFT Marketplace</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Web3 Development</Link>
                  </div>
                  <div className={styles.dropdownGroup}>
                    <div className={styles.dropdownTitle}>🎨 Design Services</div>
                    <Link href="/services" className={styles.dropdownSubLink}>UI/UX Design</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Website Design</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Mobile App Design</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Brand Identity</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Logo Design</Link>
                    <Link href="/services" className={styles.dropdownSubLink}>Graphics Design</Link>
                  </div>
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
              <Link href="/blog" className={styles.navLink}>Blogs</Link>
              <Link href="/work" className={styles.navLink}>Portfolio</Link>
              <Link href="/about" className={styles.navLink}>Company</Link>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </nav>
            <div className={styles.headerActions}>
              <Link href="/proposal" className="btn btn-primary">
                Share Your Requirement
              </Link>
              <Link href="/request-a-call" className="btn btn-secondary">
                Schedule a Call
              </Link>
            </div>
          </div>
        </div>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Join Our Team</h1>
            <p>Build the future of technology with TechNova. WeWe'reapos;re always looking for talented individuals.</p>
          </div>
        </div>
      </section>

      {/* ===== WHY JOIN US ===== */}
      <section className={styles.services}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why Work With Us?</h2>
            <p>Join a team that values innovation, growth, and work-life balance</p>
          </div>
          <div className={styles.whyGrid}>
            {benefits.map((benefit, index) => (
              <div key={index} className={styles.whyCard}>
                <div className={styles.whyIcon}>{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OPEN POSITIONS ===== */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Open Positions</h2>
            <p>Find your next role and make an impact</p>
          </div>
          <div className={styles.faqGrid}>
            {openPositions.map((job, index) => (
              <div key={index} className={styles.faqCard}>
                <h4>{job.title}</h4>
                <p style={{ marginBottom: "12px", color: "var(--primary)", fontWeight: 500 }}>
                  {job.department} • {job.location} • {job.type}
                </p>
                <p style={{ marginBottom: "16px", fontSize: "14px", color: "var(--text-secondary)" }}>
                  {job.description}
                </p>
                <button 
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "10px 20px", fontSize: "14px" }}
                  onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                >
                  {selectedJob === index ? "Hide Details" : "View Details"}
                </button>
                {selectedJob === index && (
                  <div style={{ marginTop: "16px", padding: "16px", background: "var(--bg-primary)", borderRadius: "var(--radius-md)" }}>
                    <h5 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>Requirements:</h5>
                    <ul style={{ listStyle: "disc", paddingLeft: "20px", fontSize: "14px", color: "var(--text-secondary)" }}>
                      {job.requirements.map((req, i) => (
                        <li key={i} style={{ marginBottom: "8px" }}>{req}</li>
                      ))}
                    </ul>
                    <Link 
                      href="/contact" 
                      className="btn btn-accent"
                      style={{ width: "100%", marginTop: "16px", padding: "10px 20px", fontSize: "14px", display: "inline-flex" }}
                    >
                      Apply Now
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Don't See Your Role?</h2>
          <p>WeWe'reapos;re always interested in hearing from talented individuals. Send us your resume!</p>
          <Link href="/contact" className="btn btn-accent">
            Get In Touch
          </Link>
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
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Support</h4>
              <ul>
                <li><Link href="#">Help Center</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service">Terms of Service</Link></li>
                <li><Link href="/cookie-policy">Cookie Policy</Link></li>
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

