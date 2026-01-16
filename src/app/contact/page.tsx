
"use client";

import { useState } from "react";

import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you within 24 hours.");
  };

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
              <Link href="/industries" className={styles.navLink}>Industries</Link>
              <Link href="/work" className={styles.navLink}>Portfolio</Link>
              <Link href="/about" className={styles.navLink}>Company</Link>
              <Link href="/contact" className={`${styles.navLink} ${styles.active}`}>Contact</Link>
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
            <h1>Contact Us</h1>
            <p>Let's discuss your project and bring your ideas to life</p>
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
                Ready to start your next project? We'd love to hear from you. 
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className={styles.contactDetails}>
                <div className={styles.contactDetailItem}>
                  <div className={styles.contactDetailIcon}>📍</div>
                  <div>
                    <h4>Dubai, UAE</h4>
                    <p>Business Bay, Dubai</p>
                  </div>
                </div>
                <div className={styles.contactDetailItem}>
                  <div className={styles.contactDetailIcon}>📍</div>
                  <div>
                    <h4>India</h4>
                    <p>Mohali, Punjab</p>
                  </div>
                </div>
                <div className={styles.contactDetailItem}>
                  <div className={styles.contactDetailIcon}>📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>info@technova.com</p>
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
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                Send Message
              </button>
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
              <p>Project timelines vary based on complexity. Simple apps take 2-3 months, while enterprise solutions may take 6-12 months. We'll provide a detailed timeline after understanding your requirements.</p>
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
                <li><Link href="#">Mobile Development</Link></li>
                <li><Link href="#">Web Development</Link></li>
                <li><Link href="#">Game Development</Link></li>
                <li><Link href="#">AI Solutions</Link></li>
                <li><Link href="#">Blockchain</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Industries</h4>
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
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2024 TechNova Solutions. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

