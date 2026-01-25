
"use client";


import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function WorkPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Portfolio" },
  ];

  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      category: "mobile",
      title: "HealthTrack Pro",
      description: "Fitness tracking app with AI-powered insights and personalized workout plans",
      tags: ["iOS", "Android", "Health"],
      icon: "📱",
    },
    {
      category: "web",
      title: "EduLearn Platform",
      description: "E-learning portal serving 100K+ students with live classes and assessments",
      tags: ["React", "Node.js", "AWS"],
      icon: "🌐",
    },
    {
      category: "game",
      title: "Space Quest",
      description: "Popular mobile game with 1M+ downloads and 4.5-star rating",
      tags: ["Unity", "3D", "Mobile"],
      icon: "🎮",
    },
    {
      category: "blockchain",
      title: "CryptoVault",
      description: "DeFi platform with secure wallet and smart contract integration",
      tags: ["Web3", "Solidity", "DeFi"],
      icon: "⛓️",
    },
    {
      category: "ai",
      title: "SmartAssist AI",
      description: "AI chatbot for customer support with NLP capabilities",
      tags: ["NLP", "Machine Learning"],
      icon: "🤖",
    },
    {
      category: "mobile",
      title: "Foodie Delivery",
      description: "On-demand food delivery app with real-time tracking",
      tags: ["Flutter", "Firebase"],
      icon: "🍔",
    },
    {
      category: "web",
      title: "ShopSmart E-commerce",
      description: "Full-featured online store with payment integration",
      tags: ["Next.js", "Stripe", "MongoDB"],
      icon: "🛒",
    },
    {
      category: "game",
      title: "Puzzle Master",
      description: "Brain-training puzzle game with multiplayer mode",
      tags: ["Unity", "Multiplayer"],
      icon: "🧩",
    },
    {
      category: "ai",
      title: "Vision AI",
      description: "Computer vision app for image recognition and analysis",
      tags: ["Python", "TensorFlow"],
      icon: "👁️",
    },
  ];

  const filters = ["all", "mobile", "web", "game", "blockchain", "ai"];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <Header />

      <Breadcrumb items={breadcrumbItems} />

      {/* ===== PAGE HERO ===== */}

      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Our Portfolio</h1>
            <p>Explore our success stories and delivered projects across industries</p>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section className={styles.portfolioPage}>
        <div className="container">
          <div className={styles.portfolioFilter}>
            {filters.map((filter) => (
              <button
                key={filter}
                className={`${styles.portfolioFilterBtn} ${activeFilter === filter ? styles.active : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          <div className={styles.portfolioGrid}>
            {filteredProjects.map((project, index) => (
              <div key={index} className={styles.portfolioCard}>
                <div className={styles.portfolioImage}>{project.icon}</div>
                <div className={styles.portfolioContent}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.portfolioTags}>
                    {project.tags.map((tag, i) => (
                      <span key={i} className={styles.portfolioTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className={styles.upwork}>
        <div className="container">
          <div className={styles.upworkContent}>
            <div>
              <h2 style={{ color: "white", fontSize: "28px", marginBottom: "12px" }}>
                Our Impact in Numbers
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
                Delivering excellence across every project
              </p>
            </div>
            <div className={styles.upworkStats}>
              <div className={styles.upworkStat}>
                <div className={styles.upworkStatNumber}>2,500+</div>
                <div className={styles.upworkStatLabel}>Projects Delivered</div>
              </div>
              <div className={styles.upworkStat}>
                <div className={styles.upworkStatNumber}>98%</div>
                <div className={styles.upworkStatLabel}>Client Satisfaction</div>
              </div>
              <div className={styles.upworkStat}>
                <div className={styles.upworkStatNumber}>150+</div>
                <div className={styles.upworkStatLabel}>Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Let&apos;s discuss your requirements and build something amazing together</p>
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

