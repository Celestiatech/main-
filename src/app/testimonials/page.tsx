
"use client";


import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function TestimonialsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Testimonials" },
  ];

  const testimonials = [
    {
      quote: "NexaVibe delivered our mobile app ahead of schedule with exceptional quality. Their team understood our vision and executed it perfectly. The app has received outstanding reviews from our users.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      company: "TechStart Inc.",
      rating: 5,
      project: "Mobile App Development",
    },
    {
      quote: "Working with NexaVibe was a game-changer for our business. Their expertise in blockchain development helped us launch our DeFi platform successfully. Highly recommended!",
      author: "Michael Chen",
      role: "Founder",
      company: "CryptoVault",
      rating: 5,
      project: "Blockchain Development",
    },
    {
      quote: "The team at NexaVibe demonstrated exceptional professionalism and technical expertise. They became our trusted development partner for all our digital initiatives.",
      author: "Emily Davis",
      role: "Director of Technology",
      company: "EduCorp Global",
      rating: 5,
      project: "Web Platform Development",
    },
    {
      quote: "From concept to launch, NexaVibe provided outstanding support. Their UI/UX design transformed our vision into a beautiful, user-friendly application.",
      author: "James Wilson",
      role: "Product Manager",
      company: "HealthTech Solutions",
      rating: 5,
      project: "Healthcare App",
    },
    {
      quote: "We've worked with many development teams, but NexaVibe stands out for their communication, expertise, and commitment to quality. They truly care about our success.",
      author: "Lisa Anderson",
      role: "COO",
      company: "LogiTech Solutions",
      rating: 5,
      project: "Logistics Platform",
    },
    {
      quote: "The game they developed for us exceeded all expectations. Professional, creative, and technically excellent. Our players love it!",
      author: "David Park",
      role: "CEO",
      company: "GameSphere Studios",
      rating: 5,
      project: "Mobile Game Development",
    },
  ];

  const stats = [
    { number: "98%", label: "Client Satisfaction" },
    { number: "85%", label: "Repeat Clients" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <Header />
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
              NexaVibe
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

      <Breadcrumb items={breadcrumbItems} />

      {/* ===== PAGE HERO ===== */}

      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>What Our Clients Say</h1>
            <p>Trusted by businesses worldwide - read their success stories</p>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className={styles.upwork}>
        <div className="container">
          <div className={styles.upworkContent}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.upworkStat}>
                <div className={styles.upworkStatNumber}>{stat.number}</div>
                <div className={styles.upworkStatLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Client Success Stories</h2>
            <p>Hear from businesses who've transformed with our solutions</p>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {"★".repeat(testimonial.rating)}
                </div>
                <p>"{testimonial.quote}"</p>
                <div className={styles.testimonialMeta}>
                  <span className={styles.testimonialProject}>{testimonial.project}</span>
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className={styles.testimonialInfo}>
                    <h4>{testimonial.author}</h4>
                    <span>{testimonial.role}, {testimonial.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Ready to Become Our Next Success Story?</h2>
          <p>Let's discuss your project and create something amazing together</p>
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

