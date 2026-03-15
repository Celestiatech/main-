
"use client";

import { useState } from "react";

import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('Thank you for your message! We&apos;ll get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          message: '',
        });
      } else {
        setSubmitMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            <h1>Contact Us</h1>
            <p>Let&apos;s discuss your project and bring your ideas to life</p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Get In Touch</h2>
              <p>
                Ready to start your next project? We&apos;d love to hear from you. 
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className={styles.contactDetails}>
                <div className={styles.contactDetailItem}>
                  <div className={styles.contactDetailIcon}>📍</div>
                  <div>
                    <h4>Our UAE Office</h4>
                    <p>Business Bay, Dubai, UAE</p>
                  </div>
                </div>
                <div className={styles.contactDetailItem}>
                  <div className={styles.contactDetailIcon}>📍</div>
                  <div>
                    <h4>Our India Office</h4>
                    <p>Mohali, Punjab, India</p>
                  </div>
                </div>
                <div className={styles.contactDetailItem}>
                  <div className={styles.contactDetailIcon}>📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>hello@celestiatech.in</p>
                  </div>
                </div>
                <div className={styles.contactDetailItem}>
                  <div className={styles.contactDetailIcon}>📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>+971 50 000 0000</p>
                  </div>
                </div>
              </div>

              <div className={styles.contactSocial}>
                <h4>Follow Us</h4>
                <div className={styles.socialIcons}>
                  <a href="#" className={styles.socialIcon}>in</a>
                  <a href="#" className={styles.socialIcon}>tw</a>
                  <a href="#" className={styles.socialIcon}>fb</a>
                  <a href="#" className={styles.socialIcon}>ig</a>
                </div>
              </div>
            </div>

            <form className={styles.contactForm} onSubmit={handleSubmit}>
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
                  <label>Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+1 555 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Company</label>
                  <input 
                    type="text" 
                    placeholder="Your company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Project Type</label>
                  <select 
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  >
                    <option value="">Select project type</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="web">Web Development</option>
                    <option value="game">Game Development</option>
                    <option value="blockchain">Blockchain Development</option>
                    <option value="ai">AI/ML Solutions</option>
                    <option value="design">UI/UX Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Budget Range</label>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  >
                    <option value="">Select budget range</option>
                    <option value="5-10k">$5,000 - $10,000</option>
                    <option value="10-25k">$10,000 - $25,000</option>
                    <option value="25-50k">$25,000 - $50,000</option>
                    <option value="50-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Project Description *</label>
                <textarea 
                  rows={5} 
                  placeholder="Tell us about your project, goals, and timeline..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitMessage && (
                <div className={styles.formNote} style={{ marginTop: '16px', color: submitMessage.includes('Thank you') ? '#22c55e' : '#ef4444' }}>
                  {submitMessage}
                </div>
              )}
              <div className={styles.formNote}>
                🔒 Your information is secure. We sign NDAs for all projects.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>
          <div className={styles.faqGrid}>
            <div className={styles.faqCard}>
              <h4>What is your typical project timeline?</h4>
              <p>Project timelines vary based on complexity. Simple apps take 2-3 months, while enterprise solutions may take 6-12 months. We&apos;ll provide a detailed timeline after understanding your requirements.</p>
            </div>
            <div className={styles.faqCard}>
              <h4>Do you offer post-development support?</h4>
              <p>Yes! We offer comprehensive support and maintenance packages to ensure your solution continues to perform optimally after launch.</p>
            </div>
            <div className={styles.faqCard}>
              <h4>What is your payment structure?</h4>
              <p>We follow a milestone-based payment structure. Typically, we require 30% upfront, with the balance distributed across project milestones.</p>
            </div>
            <div className={styles.faqCard}>
              <h4>How do you ensure project quality?</h4>
              <p>Our QA team follows rigorous testing protocols including unit testing, integration testing, and user acceptance testing to deliver bug-free solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Prefer to talk?</h2>
          <p>Schedule a free 30-minute consultation call</p>
          <Link href="/request-a-call" className="btn btn-accent">
            Schedule a Call
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
