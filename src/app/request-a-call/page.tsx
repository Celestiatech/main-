
"use client";


import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";

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
    alert("Thank you! We'll call you at your preferred time.");
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
            <h1>Request a Call</h1>
            <p>Leave your details and we'll call you back at your preferred time</p>
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
                placeholder="Any specific topics you'd like to discuss..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Request Call
            </button>
            
            <div className={styles.formNote}>
              📞 We'll call you within 24 business hours at your preferred time.
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
              <p>We'll understand your project requirements, goals, and challenges</p>
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

