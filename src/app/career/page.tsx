
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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
      description: "We&apos;re looking for an experienced React developer to join our team and build cutting-edge web applications.",
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
      description: "We&apos;re seeking a talented designer to create beautiful and intuitive user experiences.",
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
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Join Our Team</h1>
            <p>Build the future of technology with Celestiatech. We&apos;re always looking for talented individuals.</p>
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
          <h2>Don&apos;t See Your Role?</h2>
          <p>We&apos;re always interested in hearing from talented individuals. Send us your resume!</p>
          <Link href="/contact" className="btn btn-accent">
            Get In Touch
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
