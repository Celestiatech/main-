
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
      quote: "Celestiatech delivered our mobile app ahead of schedule with exceptional quality. Their team understood our vision and executed it perfectly. The app has received outstanding reviews from our users.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      company: "TechStart Inc.",
      rating: 5,
      project: "Mobile App Development",
    },
    {
      quote: "Working with Celestiatech was a game-changer for our business. Their expertise in blockchain development helped us launch our DeFi platform successfully. Highly recommended!",
      author: "Michael Chen",
      role: "Founder",
      company: "CryptoVault",
      rating: 5,
      project: "Blockchain Development",
    },
    {
      quote: "The team at Celestiatech demonstrated exceptional professionalism and technical expertise. They became our trusted development partner for all our digital initiatives.",
      author: "Emily Davis",
      role: "Director of Technology",
      company: "EduCorp Global",
      rating: 5,
      project: "Web Platform Development",
    },
    {
      quote: "From concept to launch, Celestiatech provided outstanding support. Their UI/UX design transformed our vision into a beautiful, user-friendly application.",
      author: "James Wilson",
      role: "Product Manager",
      company: "HealthTech Solutions",
      rating: 5,
      project: "Healthcare App",
    },
    {
      quote: "We've worked with many development teams, but Celestiatech stands out for their communication, expertise, and commitment to quality. They truly care about our success.",
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
