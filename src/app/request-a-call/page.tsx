
"use client";


import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function RequestCallPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Request a Call" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    preferredTime: "",
    projectType: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We&apos;ll call you at your preferred time.");
  };

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <Header />

      <Breadcrumb items={breadcrumbItems} />

      {/* ===== PAGE HERO ===== */}

      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>Request a Call</h1>
            <p>Leave your details and we&apos;ll call you back at your preferred time</p>
          </div>
        </div>
      </section>

      {/* ===== REQUEST CALL SECTION ===== */}
      <section className={styles.requestCallSection}>
        <div className="container">
          <form className={styles.requestCallForm} onSubmit={handleSubmit}>
            <h2>Schedule a Free Consultation</h2>
            <p>30-minute discovery call to discuss your project</p>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Name *</label>
                <input 
                  type="text" 
                  placeholder="Your name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email *</label>
                <input 
                  type="email" 
                  placeholder="you@company.com" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  placeholder="+1 555 000 0000" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Country</label>
                <select 
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                >
                  <option value="">Select country</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="India">India</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Preferred Time *</label>
                <select 
                  required
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                >
                  <option value="">Select preferred time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Project Type</label>
                <select 
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                >
                  <option value="">Select project type</option>
                  <option value="mobile">Mobile App</option>
                  <option value="web">Web Development</option>
                  <option value="game">Game Development</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="ai">AI/ML</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Additional Notes</label>
              <textarea 
                rows={3} 
                placeholder="Any specific topics you&apos;d like to discuss..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Request Call
            </button>
            
            <div className={styles.formNote}>
              📞 We&apos;ll call you within 24 business hours at your preferred time.
            </div>
          </form>
        </div>
      </section>

      {/* ===== INFO SECTION ===== */}
      <section className={styles.services}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>What to Expect</h2>
            <p>Our consultation process is simple and effective</p>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🎯</div>
              <h3>Needs Analysis</h3>
              <p>We&apos;ll understand your project requirements, goals, and challenges</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>💡</div>
              <h3>Solution Proposal</h3>
              <p>Get initial recommendations and approach for your project</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>📋</div>
              <h3>Timeline & Cost</h3>
              <p>Receive a rough estimate for timeline and investment</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🤝</div>
              <h3>Next Steps</h3>
              <p>Outline the path forward and how to get started</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}

