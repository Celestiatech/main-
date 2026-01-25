
"use client";

import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services" },
  ];

  const services = [
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Native & cross-platform apps for iOS and Android with exceptional UX",
      features: ["iOS Development", "Android Development", "React Native", "Flutter"],
    },
    {
      icon: "🌐",
      title: "Web Development",
      description: "Scalable web applications using modern frameworks and technologies",
      features: ["Frontend Development", "Backend Development", "CMS Solutions", "E-commerce"],
    },
    {
      icon: "🎮",
      title: "Game Development",
      description: "Engaging 2D/3D games for mobile, web, and desktop platforms",
      features: ["Unity Development", "Unreal Engine", "2D/3D Games", "Multiplayer Games"],
    },
    {
      icon: "⛓️",
      title: "Blockchain Development",
      description: "Web3 solutions, smart contracts, and decentralized applications",
      features: ["Smart Contracts", "DApps Development", "DeFi Solutions", "NFT Marketplaces"],
    },
    {
      icon: "🤖",
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by cutting-edge AI technology",
      features: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Chatbots"],
    },
    {
      icon: "⚙️",
      title: "DevOps Services",
      description: "CI/CD pipelines, cloud infrastructure, and automation solutions",
      features: ["Cloud Deployment", "CI/CD Pipelines", "Infrastructure as Code", "Monitoring"],
    },
    {
      icon: "🥽",
      title: "Metaverse Development",
      description: "Immersive VR/AR experiences and virtual world construction",
      features: ["VR/AR Development", "Virtual Worlds", "3D Modeling", "Interactive Experiences"],
    },
    {
      icon: "✅",
      title: "Quality Assurance",
      description: "Comprehensive testing services ensuring bug-free deliverables",
      features: ["Manual Testing", "Automated Testing", "Performance Testing", "Security Testing"],
    },
  ];

  const technologies = {
    mobile: ["Swift", "Kotlin", "React Native", "Flutter", "Xamarin"],
    web: ["React", "Next.js", "Vue.js", "Angular", "Node.js", "Python", "PHP"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"],
    cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
  };

  const process = [
    { icon: "💡", title: "Discovery", desc: "Understanding your vision and requirements" },
    { icon: "📋", title: "Planning", desc: "Creating detailed project roadmap" },
    { icon: "🎨", title: "Design", desc: "UI/UX design and prototyping" },
    { icon: "⚡", title: "Development", desc: "Agile development process" },
    { icon: "🔍", title: "Testing", desc: "Rigorous quality assurance" },
    { icon: "🚀", title: "Launch", desc: "Deployment and go-live support" },
  ];

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <Header />

      <Breadcrumb items={breadcrumbItems} />

      {/* ===== PAGE HERO ===== */}

      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Our Services</h1>
            <p>End-to-end development solutions for your digital transformation journey</p>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>What We Offer</h2>
            <p>Comprehensive digital solutions tailored to your business needs</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGIES SECTION ===== */}
      <section className={styles.techSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Technologies We Use</h2>
            <p>Modern tools and frameworks for powerful solutions</p>
          </div>
          <div className={styles.techCategories}>
            <div className={styles.techCategory}>
              <h3>📱 Mobile</h3>
              <div className={styles.techTags}>
                {technologies.mobile.map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={styles.techCategory}>
              <h3>🌐 Web</h3>
              <div className={styles.techTags}>
                {technologies.web.map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={styles.techCategory}>
              <h3>🗄️ Databases</h3>
              <div className={styles.techTags}>
                {technologies.databases.map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={styles.techCategory}>
              <h3>☁️ Cloud & DevOps</h3>
              <div className={styles.techTags}>
                {technologies.cloud.map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Development Process</h2>
            <p>A streamlined approach to deliver exceptional results</p>
          </div>
          <div className={styles.processSteps}>
            {process.map((step, index) => (
              <div key={index} className={styles.processStep}>
                <div className={styles.processIcon}>{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className={styles.whyChooseUs}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why Choose NexaVibe?</h2>
            <p>Partner with a team committed to your success</p>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🎯</div>
              <h3>Tailored Solutions</h3>
              <p>Custom strategies aligned with your unique business goals</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>⚡</div>
              <h3>Agile Development</h3>
              <p>Fast iterations with regular updates and transparent progress</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🛡️</div>
              <h3>Quality Assurance</h3>
              <p>Rigorous testing ensuring bug-free, scalable solutions</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>💰</div>
              <h3>Competitive Pricing</h3>
              <p>Enterprise-grade solutions at startup-friendly prices</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Let&apos;s discuss your requirements and find the perfect solution</p>
          <Link href="/contact" className="btn btn-accent">
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}

