"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./case-study.module.css";
import Breadcrumb from "../../components/Breadcrumb";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

// Mock data - in production this would come from CMS/API
const caseStudies = {
  "healthtrack-pro": {
    title: "HealthTrack Pro",
    subtitle: "AI-Powered Fitness Tracking App",
    heroImage: "/images/case-studies/healthtrack-hero.jpg",
    client: {
      name: "FitLife Inc.",
      industry: "Health & Fitness",
      size: "50-200 employees",
      location: "San Francisco, CA",
      website: "fitlife.com"
    },
    duration: "16 weeks",
    budget: "$45,000",
    challenge: "FitLife Inc. was struggling with user retention in their fitness app. Users would download the app but quickly abandon it due to lack of personalized insights and motivation. The existing app had basic tracking features but no AI-driven recommendations or gamification elements.",
    challengePoints: [
      "Low user retention (only 15% active after 30 days)",
      "Generic workout plans not tailored to user goals",
      "Lack of real-time progress tracking and motivation",
      "No social features or community engagement",
      "Outdated UI/UX causing poor user experience"
    ],
    solution: "We developed HealthTrack Pro, an AI-powered fitness companion that provides personalized workout plans, real-time progress tracking, and gamified motivation. The app uses machine learning to analyze user data and provide customized recommendations.",
    solutionPoints: [
      "AI-powered workout plan generation based on user goals and fitness level",
      "Real-time progress tracking with visual analytics",
      "Gamification system with achievements and challenges",
      "Social features for community engagement and friendly competition",
      "Modern UI/UX with intuitive navigation and engaging animations",
      "Integration with wearables for seamless data sync"
    ],
    techStack: [
      { name: "React Native", category: "Mobile Framework" },
      { name: "Node.js", category: "Backend" },
      { name: "TensorFlow", category: "AI/ML" },
      { name: "MongoDB", category: "Database" },
      { name: "AWS", category: "Cloud" },
      { name: "Socket.io", category: "Real-time" }
    ],
    timeline: [
      {
        phase: "Discovery & Planning",
        duration: "2 weeks",
        description: "User research, competitor analysis, and technical architecture planning"
      },
      {
        phase: "Design & Prototyping",
        duration: "3 weeks",
        description: "UI/UX design, user flow mapping, and interactive prototypes"
      },
      {
        phase: "AI Development",
        duration: "4 weeks",
        description: "Machine learning model development and recommendation engine"
      },
      {
        phase: "App Development",
        duration: "5 weeks",
        description: "Core app development, API integration, and feature implementation"
      },
      {
        phase: "Testing & Launch",
        duration: "2 weeks",
        description: "Quality assurance, performance testing, and app store deployment"
      }
    ],
    results: [
      {
        metric: "42%",
        description: "Increase in user retention after 30 days"
      },
      {
        metric: "₹3.2 Cr",
        description: "Revenue generated in first 6 months"
      },
      {
        metric: "4.8",
        description: "Average App Store rating"
      },
      {
        metric: "50K+",
        description: "Active users within 3 months"
      },
      {
        metric: "85%",
        description: "User goal achievement rate"
      }
    ],
    screenshots: [
      "/images/case-studies/healthtrack-1.jpg",
      "/images/case-studies/healthtrack-2.jpg",
      "/images/case-studies/healthtrack-3.jpg",
      "/images/case-studies/healthtrack-4.jpg"
    ],
    testimonial: {
      quote: "HealthTrack Pro transformed our business. The AI-powered personalization and gamification features increased our user retention by 42% and generated ₹3.2 Cr in revenue within 6 months. NexaVibe delivered exactly what we needed.",
      author: "Sarah Johnson",
      role: "CEO, FitLife Inc.",
      avatar: "/images/testimonials/sarah.jpg"
    },
    nextSteps: [
      "Scale AI algorithms for larger user base",
      "Add nutrition tracking and meal planning",
      "Expand to enterprise B2B solutions",
      "Partnership with wearable manufacturers"
    ]
  }
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const caseStudy = caseStudies[slug as keyof typeof caseStudies];
  const [activeTab, setActiveTab] = useState("overview");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/work" },
    { label: caseStudy?.title || "Case Study" },
  ];

  if (!caseStudy) {
    return (
      <div className={styles.page}>
        {/* Header */}
        <Header />

        <Breadcrumb items={breadcrumbItems} />

        <section className={styles.notFound}>
          <div className="container">
            <h1>Case Study Not Found</h1>
            <p>The case study you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/work" className="btn btn-primary">
              View All Case Studies
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const totalDuration = caseStudy.timeline.reduce((total, phase) => {
    const weeks = parseInt(phase.duration.split(' ')[0]);
    return total + weeks;
  }, 0);

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <Header />

      <Breadcrumb items={breadcrumbItems} />

      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot}></span>
              Success Story
            </div>
            <h1>{caseStudy.title}</h1>
            <p className={styles.heroSubtitle}>{caseStudy.subtitle}</p>
            <div className={styles.heroMeta}>
              <div className={styles.heroMetaItem}>
                <strong>Industry:</strong> {caseStudy.client.industry}
              </div>
              <div className={styles.heroMetaItem}>
                <strong>Duration:</strong> {caseStudy.duration}
              </div>
              <div className={styles.heroMetaItem}>
                <strong>Budget:</strong> {caseStudy.budget}
              </div>
              <div className={styles.heroMetaItem}>
                <strong>Result:</strong> {caseStudy.results[0].metric} {caseStudy.results[0].description}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NAVIGATION TABS ===== */}
      <div className={styles.tabs}>
        <div className="container">
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabButton} ${activeTab === "overview" ? styles.active : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "challenge" ? styles.active : ""}`}
              onClick={() => setActiveTab("challenge")}
            >
              The Challenge
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "solution" ? styles.active : ""}`}
              onClick={() => setActiveTab("solution")}
            >
              Our Solution
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "results" ? styles.active : ""}`}
              onClick={() => setActiveTab("results")}
            >
              Results
            </button>
          </div>
        </div>
      </div>

      {/* ===== CONTENT SECTIONS ===== */}
      <div className={styles.content}>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <section className={styles.overview}>
            <div className="container">
              <div className={styles.overviewGrid}>
                <div className={styles.overviewInfo}>
                  <h2>Project Overview</h2>

                  <div className={styles.clientCard}>
                    <h3>Client Information</h3>
                    <div className={styles.clientDetails}>
                      <div className={styles.clientDetail}>
                        <strong>Company:</strong> {caseStudy.client.name}
                      </div>
                      <div className={styles.clientDetail}>
                        <strong>Industry:</strong> {caseStudy.client.industry}
                      </div>
                      <div className={styles.clientDetail}>
                        <strong>Company Size:</strong> {caseStudy.client.size}
                      </div>
                      <div className={styles.clientDetail}>
                        <strong>Location:</strong> {caseStudy.client.location}
                      </div>
                    </div>
                  </div>

                  <div className={styles.techStack}>
                    <h3>Technology Stack</h3>
                    <div className={styles.techGrid}>
                      {caseStudy.techStack.map((tech, index) => (
                        <div key={index} className={styles.techItem}>
                          <div className={styles.techName}>{tech.name}</div>
                          <div className={styles.techCategory}>{tech.category}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.timeline}>
                  <h3>Project Timeline</h3>
                  <div className={styles.timelineSteps}>
                    {caseStudy.timeline.map((step, index) => (
                      <div key={index} className={styles.timelineStep}>
                        <div className={styles.timelineHeader}>
                          <h4>{step.phase}</h4>
                          <span className={styles.timelineDuration}>{step.duration}</span>
                        </div>
                        <p>{step.description}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "1rem", fontSize: "14px", color: "#718096" }}>
                    Total Duration: {totalDuration} weeks
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Challenge Tab */}
        {activeTab === "challenge" && (
          <section className={styles.challenge}>
            <div className="container">
              <div className={styles.challengeContent}>
                <h2>The Challenge</h2>
                <p className={styles.challengeDescription}>{caseStudy.challenge}</p>

                <div className={styles.challengePoints}>
                  {caseStudy.challengePoints.map((point, index) => (
                    <div key={index} className={styles.challengePoint}>
                      <span className={styles.challengeIcon}>⚠️</span>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Solution Tab */}
        {activeTab === "solution" && (
          <section className={styles.solution}>
            <div className="container">
              <div className={styles.solutionContent}>
                <h2>Our Solution</h2>
                <p className={styles.solutionDescription}>{caseStudy.solution}</p>

                <div className={styles.solutionPoints}>
                  {caseStudy.solutionPoints.map((point, index) => (
                    <div key={index} className={styles.solutionPoint}>
                      <span className={styles.solutionIcon}>💡</span>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.screenshots}>
                  <h3>App Screenshots</h3>
                  <div className={styles.screenshotGrid}>
                    {caseStudy.screenshots.map((screenshot, index) => (
                      <div key={index} className={styles.screenshot}>
                        <Image
                          src={screenshot}
                          alt={`${caseStudy.title} screenshot ${index + 1}`}
                          width={300}
                          height={200}
                          className={styles.screenshotImage}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results Tab */}
        {activeTab === "results" && (
          <section className={styles.results}>
            <div className="container">
              <div className={styles.resultsContent}>
                <h2>Measurable Results</h2>

                <div className={styles.resultsGrid}>
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className={styles.resultCard}>
                      <div className={styles.resultMetric}>{result.metric}</div>
                      <div className={styles.resultDescription}>{result.description}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.testimonial}>
                  <div className={styles.testimonialCard}>
                    <p className={styles.testimonialQuote}>&ldquo;{caseStudy.testimonial.quote}&rdquo;</p>
                    <div className={styles.testimonialAuthor}>
                      <div className={styles.testimonialAvatar}>
                        {caseStudy.testimonial.author.charAt(0)}
                      </div>
                      <div className={styles.testimonialInfo}>
                        <h4>{caseStudy.testimonial.author}</h4>
                        <p>{caseStudy.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.nextSteps}>
                  <h3>Next Steps & Future Plans</h3>
                  <div className={styles.nextStepsList}>
                    {caseStudy.nextSteps.map((step, index) => (
                      <div key={index} className={styles.nextStep}>
                        <span className={styles.nextStepIcon}>🚀</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Create Your Success Story?</h2>
            <p>Let&apos;s discuss how we can help transform your business with custom software solutions</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className="btn btn-accent btn-lg">
                Start Your Project
              </Link>
              <Link href="/work" className="btn btn-secondary btn-lg">
                View More Case Studies
              </Link>
            </div>
            <div className={styles.ctaTrust}>
              ⭐ 98% client satisfaction • 2,500+ projects delivered • 12+ years experience
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
