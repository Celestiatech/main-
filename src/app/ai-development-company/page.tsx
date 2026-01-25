import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { getFAQSchema } from "@/lib/structured-data";
import styles from "../page.module.css";

export const metadata: Metadata = genMeta({
  title: "AI Development Company - Custom AI Solutions",
  description: "Expert AI development services including machine learning, NLP, computer vision, and chatbots. Build intelligent solutions with our AI development team. 12+ years experience.",
  path: "/ai-development-company",
});

const faqs = [
  {
    question: "What AI services do you offer?",
    answer: "We offer machine learning model development, natural language processing (NLP), computer vision, AI chatbots, predictive analytics, recommendation engines, and custom AI solutions tailored to your business needs.",
  },
  {
    question: "How long does AI development take?",
    answer: "AI project timelines vary from 3-6 months for standard solutions to 6-12 months for complex custom AI systems. We provide detailed timelines after understanding your requirements.",
  },
  {
    question: "What technologies do you use for AI development?",
    answer: "We use TensorFlow, PyTorch, OpenAI APIs, LangChain, Hugging Face, scikit-learn, and cloud AI services (AWS SageMaker, Google Cloud AI, Azure ML) depending on project requirements.",
  },
  {
    question: "Do you provide AI consulting?",
    answer: "Yes, we offer AI strategy consulting to help identify AI opportunities, assess feasibility, plan implementation, and ensure ROI. Our experts guide you through the entire AI journey.",
  },
];

export default function AIDevelopmentCompanyPage() {
  return (
    <div className={styles.page}>
      <StructuredData data={getFAQSchema(faqs)} />
      <Header />

      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroContent}>
            <h1>AI Development Company</h1>
            <p>Build intelligent solutions with cutting-edge AI technology</p>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>The Challenge: Harnessing AI for Business Growth</h2>
            <p>Many businesses struggle to leverage AI effectively due to:</p>
          </div>
          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <h3>Lack of AI Expertise</h3>
              <p>Finding skilled AI developers and data scientists is challenging and expensive.</p>
            </div>
            <div className={styles.problemCard}>
              <h3>Complex Implementation</h3>
              <p>AI projects require specialized knowledge in machine learning, data engineering, and model deployment.</p>
            </div>
            <div className={styles.problemCard}>
              <h3>High Costs</h3>
              <p>Building in-house AI teams requires significant investment in talent and infrastructure.</p>
            </div>
            <div className={styles.problemCard}>
              <h3>Integration Challenges</h3>
              <p>Integrating AI solutions with existing systems and workflows can be complex.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION SECTION ===== */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our AI Development Approach</h2>
            <p>We deliver end-to-end AI solutions that drive real business value</p>
          </div>
          <div className={styles.solutionGrid}>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>🤖</div>
              <h3>Machine Learning Models</h3>
              <p>Custom ML models for prediction, classification, and pattern recognition tailored to your data and use cases.</p>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>💬</div>
              <h3>AI Chatbots & NLP</h3>
              <p>Intelligent chatbots with natural language understanding for customer support, lead generation, and automation.</p>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>👁️</div>
              <h3>Computer Vision</h3>
              <p>Image and video analysis solutions for quality control, object detection, facial recognition, and more.</p>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>📊</div>
              <h3>Predictive Analytics</h3>
              <p>Data-driven insights and forecasting to optimize operations, reduce costs, and improve decision-making.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our AI Development Process</h2>
          </div>
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <h3>Discovery & Strategy</h3>
              <p>Analyze your business needs, identify AI opportunities, and create a strategic roadmap.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <h3>Data Preparation</h3>
              <p>Collect, clean, and prepare data for training. Ensure data quality and compliance.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <h3>Model Development</h3>
              <p>Build, train, and optimize AI models using best practices and state-of-the-art techniques.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <h3>Testing & Validation</h3>
              <p>Rigorous testing to ensure accuracy, performance, and reliability before deployment.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>5</div>
              <h3>Deployment & Integration</h3>
              <p>Deploy AI solutions to production and integrate seamlessly with your existing systems.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>6</div>
              <h3>Monitoring & Optimization</h3>
              <p>Continuous monitoring, model retraining, and optimization to maintain peak performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>AI Development Pricing</h2>
            <p>Transparent pricing for AI solutions</p>
          </div>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3>Standard AI Solutions</h3>
              <div className={styles.pricingAmount}>$25,000 - $75,000</div>
              <ul>
                <li>Pre-built AI models</li>
                <li>Chatbot development</li>
                <li>Basic ML integration</li>
                <li>3-6 months timeline</li>
              </ul>
            </div>
            <div className={styles.pricingCard}>
              <h3>Custom AI Development</h3>
              <div className={styles.pricingAmount}>$75,000 - $200,000+</div>
              <ul>
                <li>Custom ML models</li>
                <li>Advanced NLP/CV solutions</li>
                <li>Full AI infrastructure</li>
                <li>6-12 months timeline</li>
              </ul>
            </div>
            <div className={styles.pricingCard}>
              <h3>Enterprise AI</h3>
              <div className={styles.pricingAmount}>Custom</div>
              <ul>
                <li>Multi-model AI systems</li>
                <li>Scalable AI platform</li>
                <li>Dedicated AI team</li>
                <li>Ongoing support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqCard}>
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Ready to Build Your AI Solution?</h2>
          <p>Let&apos;s discuss how AI can transform your business</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className="btn btn-primary">
              Get Free AI Consultation
            </Link>
            <Link href="/proposal" className="btn btn-secondary">
              Request Proposal
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
