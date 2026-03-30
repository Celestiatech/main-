"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { trackFormStep, trackFormSubmit } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import styles from "./MultiStepForm.module.css";

interface FormData {
  projectType: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface MultiStepFormProps {
  onSubmit?: (data: FormData) => void;
  showTrustReinforcements?: boolean;
}

export function MultiStepForm({ onSubmit, showTrustReinforcements = true }: MultiStepFormProps) {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      // Track step completion
      trackFormStep("proposal_form", currentStep, totalSteps);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Track form submission
    trackFormSubmit("proposal_form");
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Default behavior
      alert("Thank you! We&apos;ll send your proposal within 24 hours.");
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType && formData.budget && formData.timeline;
      case 2:
        return formData.name && formData.email;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className={styles.multiStepForm}>
      {/* Progress Indicator */}
      <div className={styles.progressBar}>
        <div className={styles.progressSteps}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`${styles.progressStep} ${currentStep >= step ? styles.active : ""} ${currentStep > step ? styles.completed : ""}`}
            >
              <div className={styles.stepNumber}>{currentStep > step ? "✓" : step}</div>
              <div className={styles.stepLabel}>
                {step === 1 ? "Project Details" : step === 2 ? "Contact Info" : "Review"}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.progressLine}>
          <div
            className={styles.progressFill}
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Step 1: Project Type, Budget, Timeline */}
        {currentStep === 1 && (
          <div className={styles.formStep}>
            <h3>Tell us about your project</h3>
            <div className={styles.formGroup}>
              <label htmlFor="projectType">Project Type *</label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={(e) => updateFormData("projectType", e.target.value)}
                required
                aria-label="Project type"
              >
                <option value="">Select project type</option>
                <option value="website">Website Development</option>
                <option value="web-app">Web Application</option>
                <option value="mobile-app">Mobile App</option>
                <option value="ai-solution">AI Solution</option>
                <option value="blockchain">Blockchain Development</option>
                <option value="ecommerce">E-commerce Platform</option>
                <option value="saas">SaaS Platform</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="budget">Budget Range *</label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => updateFormData("budget", e.target.value)}
                required
                aria-label="Budget range"
              >
                <option value="">Select budget range</option>
                <option value="under-25k">Under $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-250k">$100,000 - $250,000</option>
                <option value="250k-plus">$250,000+</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="timeline">Timeline *</label>
              <select
                id="timeline"
                value={formData.timeline}
                onChange={(e) => updateFormData("timeline", e.target.value)}
                required
                aria-label="Project timeline"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP / Urgent</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-12-months">6-12 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div className={styles.formActions}>
              <button type="button" onClick={handleNext} className="btn btn-primary" disabled={!isStepValid()}>
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {currentStep === 2 && (
          <div className={styles.formStep}>
            <h3>Your contact information</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  required
                  aria-label="Your full name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                  aria-label="Email address"
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  aria-label="Phone number"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={(e) => updateFormData("company", e.target.value)}
                  aria-label="Company name"
                />
              </div>
            </div>
            <div className={styles.formActions}>
              <button type="button" onClick={handleBack} className="btn btn-secondary">
                Back
              </button>
              <button type="button" onClick={handleNext} className="btn btn-primary" disabled={!isStepValid()}>
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {currentStep === 3 && (
          <div className={styles.formStep}>
            <h3>Review your information</h3>
            <div className={styles.reviewSection}>
              <div className={styles.reviewItem}>
                <strong>Project Type:</strong> {formData.projectType || "Not specified"}
              </div>
              <div className={styles.reviewItem}>
                <strong>Budget Range:</strong> {formData.budget || "Not specified"}
              </div>
              <div className={styles.reviewItem}>
                <strong>Timeline:</strong> {formData.timeline || "Not specified"}
              </div>
              <div className={styles.reviewItem}>
                <strong>Name:</strong> {formData.name}
              </div>
              <div className={styles.reviewItem}>
                <strong>Email:</strong> {formData.email}
              </div>
              {formData.phone && (
                <div className={styles.reviewItem}>
                  <strong>Phone:</strong> {formData.phone}
                </div>
              )}
              {formData.company && (
                <div className={styles.reviewItem}>
                  <strong>Company:</strong> {formData.company}
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Additional Message (Optional)</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us more about your project requirements..."
                value={formData.message}
                onChange={(e) => updateFormData("message", e.target.value)}
                aria-label="Additional project details"
              />
            </div>
            <div className={styles.formActions}>
              <button type="button" onClick={handleBack} className="btn btn-secondary">
                Back
              </button>
              <button type="submit" className="btn btn-primary btn-lg">
                Submit Request
              </button>
            </div>
          </div>
        )}

        {/* Trust Reinforcements */}
        {showTrustReinforcements && (
          <div className={styles.trustReinforcements}>
            <div className={styles.trustItem}>
              <Image src="/images/icons/security.svg" alt="Security" width={20} height={20} loading="lazy" />
              <span>NDA & IP Protection guaranteed</span>
            </div>
            <div className={styles.trustItem}>
              <Image src="/images/icons/security.svg" alt="Security" width={20} height={20} loading="lazy" />
              <span>Your information is secure</span>
            </div>
            <div className={styles.trustItem}>
              <span>🔒</span>
              <span>Free consultation • No obligation</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
