
"use client";

import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Company" },
  ];

  const team = [
    { name: "John Smith", role: "CEO & Founder", initial: "J" },
    { name: "Sarah Johnson", role: "CTO", initial: "S" },
    { name: "Michael Chen", role: "VP of Engineering", initial: "M" },
    { name: "Emily Davis", role: "Head of Design", initial: "E" },
  ];

  const values = [
    { icon: "🎯", title: "Innovation", desc: "Pushing boundaries with cutting-edge solutions" },
    { icon: "🤝", title: "Integrity", desc: "Transparent and honest partnerships" },
    { icon: "💪", title: "Excellence", desc: "Delivering the highest quality in every project" },
    { icon: "🚀", title: "Growth", desc: "Focused on your long-term success" },
  ];

  const milestones = [
    { year: "2012", title: "Founded", desc: "Started with a team of 5 developers" },
    { year: "2015", title: "Global Expansion", desc: "Opened office in Dubai, UAE" },
    { year: "2018", title: "1000 Projects", desc: "Reached milestone of 1000 completed projects" },
    { year: "2020", title: "AI Division", desc: "Launched AI & Machine Learning services" },
    { year: "2022", title: "200+ Team", desc: "Grew to 200+ team members worldwide" },
    { year: "2024", title: "2500+ Clients", desc: "Served over 2500 happy clients globally" },
  ];

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <Header />

      <Breadcrumb items={breadcrumbItems} />

      {/* ===== ABOUT HERO ===== */}

      <section className={styles.aboutHero}>
        <div className="container">
          <div className={styles.aboutContent}>
            <h1>About NexaVibe</h1>
            <p>
              We&apos;re a team of passionate developers, designers, and strategists 
              committed to transforming businesses through innovative digital solutions.
            </p>
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <h3>12+</h3>
                <p>Years Experience</p>
              </div>
              <div className={styles.statItem}>
                <h3>2500+</h3>
                <p>Happy Clients</p>
              </div>
              <div className={styles.statItem}>
                <h3>200+</h3>
                <p>Team Members</p>
              </div>
              <div className={styles.statItem}>
                <h3>50+</h3>
                <p>Countries Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className={styles.services}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Mission</h2>
            <p>
              To empower businesses with innovative technology solutions that drive 
              growth, efficiency, and lasting success in the digital age.
            </p>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>💡</div>
              <h3>Innovation First</h3>
              <p>Leveraging the latest technologies to build future-ready solutions</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🤝</div>
              <h3>Client Partnership</h3>
              <p>Building long-term relationships through transparent communication</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>⚡</div>
              <h3>Agile Approach</h3>
              <p>Flexible development methodology for rapid delivery</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🏆</div>
              <h3>Quality Excellence</h3>
              <p>Rigorous testing and quality assurance in every project</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE SECTION ===== */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Journey</h2>
            <p>Key milestones in our growth story</p>
          </div>
          <div className={styles.processSteps}>
            {milestones.map((milestone, index) => (
              <div key={index} className={styles.processStep}>
                <div className={styles.processIcon}>{milestone.year}</div>
                <h4>{milestone.title}</h4>
                <p>{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES SECTION ===== */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Leadership Team</h2>
            <p>Meet the experts behind our success</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamAvatar}>{member.initial}</div>
                <div className={styles.teamInfo}>
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Ready to Work With Us?</h2>
          <p>Let&apos;s discuss how we can help transform your business</p>
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

