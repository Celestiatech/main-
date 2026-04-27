"use client";

import type { FormEvent, MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type PopupStep = 1 | 2 | 3 | 4;

type LeadFormState = {
  service: string;
  budget: string;
  goal: string;
  name: string;
  email: string;
  phone: string;
};

type BehaviorKey = "default" | "recent-work" | "features" | "trust-signals" | "faq" | "manual";

type QuestionConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  stepOneQuestion: string;
  serviceOptions: string[];
};

type CurrencyConfig = {
  code: string;
  symbol: string;
  labels: string[];
};

const STORAGE_KEY = "portfolio-lead-popup-seen";
const SECTION_THRESHOLD = 3;
const OPEN_EVENT = "portfolio-lead-popup:open";

const goalOptions = [
  "Get more leads",
  "Increase online sales",
  "Launch faster",
  "Improve branding",
  "Automate workflows",
];

const initialState: LeadFormState = {
  service: "",
  budget: "",
  goal: "",
  name: "",
  email: "",
  phone: "",
};

const questionConfigs: Record<BehaviorKey, QuestionConfig> = {
  default: {
    eyebrow: "Project survey",
    title: "Seen a few sections? Let's match you with the right build.",
    intro: "This takes about 30 seconds and helps us respond with the right solution.",
    stepOneQuestion: "What do you want to build?",
    serviceOptions: [
      "Business Website",
      "Ecommerce Store",
      "Mobile App",
      "AI Tool",
      "Landing Page",
      "Website Redesign",
    ],
  },
  "recent-work": {
    eyebrow: "Project survey",
    title: "Looks like the work examples caught your attention.",
    intro: "Tell us what kind of project you want so we can show the best-fit direction.",
    stepOneQuestion: "Which project is closest to your need?",
    serviceOptions: [
      "Business Website",
      "Ecommerce Store",
      "Mobile App",
      "Custom Platform",
      "Landing Page",
      "Portfolio Website",
    ],
  },
  features: {
    eyebrow: "Project survey",
    title: "You were exploring features, so let's narrow the right setup.",
    intro: "Choose the type of build you need and we'll respond with a practical suggestion.",
    stepOneQuestion: "What kind of solution do you need most?",
    serviceOptions: [
      "Online Store",
      "Multi-vendor Platform",
      "POS + Inventory System",
      "Mobile App",
      "Business Website",
      "Custom Dashboard",
    ],
  },
  "trust-signals": {
    eyebrow: "Project survey",
    title: "You checked our credibility first. Smart move.",
    intro: "Tell us what you are planning and we'll send a matching approach with relevant proof points.",
    stepOneQuestion: "What are you planning to launch?",
    serviceOptions: [
      "Brand Website",
      "Ecommerce Store",
      "Lead Generation Funnel",
      "Mobile App",
      "AI Tool",
      "Website Revamp",
    ],
  },
  faq: {
    eyebrow: "Project survey",
    title: "The FAQ section usually means you're actively comparing options.",
    intro: "Pick the closest need so we can answer with the right proposal direction.",
    stepOneQuestion: "What do you need help with right now?",
    serviceOptions: [
      "Website Quote",
      "Feature Planning",
      "Timeline Estimate",
      "Redesign",
      "Ecommerce Setup",
      "Technical Consultation",
    ],
  },
  manual: {
    eyebrow: "Project survey",
    title: "Tell us what you need and we'll point you in the right direction.",
    intro: "A few quick answers help us respond faster and more accurately.",
    stepOneQuestion: "What would you like to discuss?",
    serviceOptions: [
      "New Website",
      "Ecommerce Store",
      "Mobile App",
      "AI Tool",
      "Website Redesign",
      "Project Consultation",
    ],
  },
};

const currencyConfigs: Record<string, CurrencyConfig> = {
  IN: {
    code: "INR",
    symbol: "Rs",
    labels: ["Under Rs 50K", "Rs 50K - 1L", "Rs 1L - 3L", "Rs 3L+", "Not sure yet"],
  },
  US: {
    code: "USD",
    symbol: "$",
    labels: ["Under $1K", "$1K - $5K", "$5K - $15K", "$15K+", "Not sure yet"],
  },
  GB: {
    code: "GBP",
    symbol: "GBP",
    labels: ["Under GBP 1K", "GBP 1K - 5K", "GBP 5K - 12K", "GBP 12K+", "Not sure yet"],
  },
  AE: {
    code: "AED",
    symbol: "AED",
    labels: ["Under AED 5K", "AED 5K - 20K", "AED 20K - 60K", "AED 60K+", "Not sure yet"],
  },
  CA: {
    code: "CAD",
    symbol: "CAD",
    labels: ["Under CAD 1.5K", "CAD 1.5K - 7K", "CAD 7K - 20K", "CAD 20K+", "Not sure yet"],
  },
  AU: {
    code: "AUD",
    symbol: "AUD",
    labels: ["Under AUD 1.5K", "AUD 1.5K - 7K", "AUD 7K - 20K", "AUD 20K+", "Not sure yet"],
  },
  EU: {
    code: "EUR",
    symbol: "EUR",
    labels: ["Under EUR 1K", "EUR 1K - 5K", "EUR 5K - 15K", "EUR 15K+", "Not sure yet"],
  },
};

function getRegionFromBrowser(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];

  for (const language of languages) {
    const region = language?.split("-")[1]?.toUpperCase();
    if (region) {
      return region;
    }
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timezone.includes("Kolkata")) return "IN";
  if (timezone.includes("Dubai")) return "AE";
  if (timezone.includes("London")) return "GB";
  if (timezone.includes("New_York") || timezone.includes("Chicago") || timezone.includes("Denver") || timezone.includes("Los_Angeles")) return "US";
  if (timezone.includes("Toronto") || timezone.includes("Vancouver")) return "CA";
  if (timezone.includes("Sydney") || timezone.includes("Melbourne") || timezone.includes("Perth")) return "AU";

  return null;
}

function getCurrencyConfig(region: string | null): CurrencyConfig {
  if (!region) {
    return currencyConfigs.IN;
  }

  if (currencyConfigs[region]) {
    return currencyConfigs[region];
  }

  const euroRegions = new Set(["DE", "FR", "ES", "IT", "NL", "BE", "PT", "IE", "AT", "FI", "GR", "LU"]);
  if (euroRegions.has(region)) {
    return currencyConfigs.EU;
  }

  return currencyConfigs.IN;
}

export function PortfolioLeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLauncher, setShowLauncher] = useState(true);
  const [currentStep, setCurrentStep] = useState<PopupStep>(1);
  const [formData, setFormData] = useState<LeadFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [behaviorKey, setBehaviorKey] = useState<BehaviorKey>("default");
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>(currencyConfigs.IN);

  useEffect(() => {
    setCurrencyConfig(getCurrencyConfig(getRegionFromBrowser()));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.sessionStorage.getItem(STORAGE_KEY) === "closed") {
      return;
    }

    const trackedSections = new Set<string>();
    const sectionOrder: string[] = [];
    const sections = document.querySelectorAll<HTMLElement>("[data-portfolio-engagement]");

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionKey = entry.target.getAttribute("data-portfolio-engagement");
          if (!sectionKey || trackedSections.has(sectionKey)) {
            return;
          }

          trackedSections.add(sectionKey);
          sectionOrder.push(sectionKey);

          if (trackedSections.size >= SECTION_THRESHOLD) {
            const lastMeaningfulSection = sectionOrder[sectionOrder.length - 1] as BehaviorKey | undefined;
            setBehaviorKey(lastMeaningfulSection || "default");
            window.sessionStorage.setItem(STORAGE_KEY, "opened");
            setShowLauncher(true);
            setIsOpen(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.45,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleOpenRequest = () => {
      setBehaviorKey("manual");
      window.sessionStorage.setItem(STORAGE_KEY, "opened");
      setShowLauncher(true);
      setIsOpen(true);
    };

    window.addEventListener(OPEN_EVENT, handleOpenRequest);

    return () => window.removeEventListener(OPEN_EVENT, handleOpenRequest);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const progressLabel = useMemo(() => `Step ${currentStep} of 4`, [currentStep]);
  const content = questionConfigs[behaviorKey] || questionConfigs.default;

  const updateField = (field: keyof LeadFormState, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleClose = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "closed");
    }
    setIsOpen(false);
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setFormData(initialState);
    setIsSuccess(false);
    setErrorMessage("");
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const goBack = () => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as PopupStep) : prev));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please add your name and email so we can contact you.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const message = [
      "Portfolio popup lead",
      `Behavior trigger: ${behaviorKey}`,
      `Service needed: ${formData.service || "Not selected"}`,
      `Budget range: ${formData.budget || "Not selected"} (${currencyConfig.code})`,
      `Main goal: ${formData.goal || "Not selected"}`,
      `Source: ${behaviorKey === "manual" ? "Manual popup icon" : "Portfolio auto popup after section engagement"}`,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          projectType: formData.service,
          budget: formData.budget,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit lead");
      }

      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return showLauncher ? (
      <button
        type="button"
        className={styles.popupLauncher}
        onClick={() => {
          setBehaviorKey("manual");
          setIsOpen(true);
        }}
        aria-label="Open survey"
        title="Open survey"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 3h6"></path>
          <path d="M10 17l2 2 4-4"></path>
          <path d="M12 3a2 2 0 0 0-2 2v1H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2V5a2 2 0 0 0-2-2Z"></path>
        </svg>
      </button>
    ) : null;
  }

  return (
    <div className={styles.popupOverlay} onClick={handleOverlayClick} role="presentation">
      <div className={styles.popupCard} role="dialog" aria-modal="true" aria-labelledby="portfolio-popup-title">
        <button type="button" onClick={handleClose} className={styles.popupClose} aria-label="Close lead form">
          ×
        </button>

        {isSuccess ? (
          <div className={styles.popupSuccess}>
            <span className={styles.popupEyebrow}>Request received</span>
            <h2 id="portfolio-popup-title">Thanks, we have your details.</h2>
            <p>Our team will review your requirements and reach out within 24 hours.</p>
            <div className={styles.popupSummary}>
              <span>{formData.service || "Custom project"}</span>
              <span>{formData.budget || "Budget flexible"}</span>
              <span>{formData.goal || "Growth-focused"}</span>
            </div>
            <div className={styles.popupFooter}>
              <button
                type="button"
                className={styles.popupGhostButton}
                onClick={() => {
                  resetFlow();
                  handleClose();
                }}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.popupHeader}>
              <span className={styles.popupEyebrow}>{content.eyebrow}</span>
              <p className={styles.popupProgress}>{progressLabel}</p>
              <h2 id="portfolio-popup-title">{content.title}</h2>
              <p className={styles.popupIntro}>{content.intro}</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.popupForm}>
              {currentStep === 1 && (
                <div className={styles.popupStep}>
                  <h3>{content.stepOneQuestion}</h3>
                  <div className={styles.optionGrid}>
                    {content.serviceOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`${styles.optionButton} ${formData.service === option ? styles.optionButtonActive : ""}`}
                        onClick={() => {
                          updateField("service", option);
                          setCurrentStep(2);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className={styles.popupStep}>
                  <h3>What budget range feels right?</h3>
                  <div className={styles.optionGrid}>
                    {currencyConfig.labels.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`${styles.optionButton} ${formData.budget === option ? styles.optionButtonActive : ""}`}
                        onClick={() => {
                          updateField("budget", option);
                          setCurrentStep(3);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className={styles.popupStep}>
                  <h3>What matters most right now?</h3>
                  <div className={styles.optionGrid}>
                    {goalOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`${styles.optionButton} ${formData.goal === option ? styles.optionButtonActive : ""}`}
                        onClick={() => {
                          updateField("goal", option);
                          setCurrentStep(4);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className={styles.popupStep}>
                  <h3>Where should we send the response?</h3>
                  <div className={styles.popupFieldGrid}>
                    <label className={styles.popupField}>
                      <span>Name *</span>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </label>
                    <label className={styles.popupField}>
                      <span>Email *</span>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        placeholder="you@company.com"
                        required
                      />
                    </label>
                    <label className={styles.popupField}>
                      <span>Phone</span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        placeholder="+91 98765 43210"
                      />
                    </label>
                  </div>
                </div>
              )}

              {errorMessage && <p className={styles.popupError}>{errorMessage}</p>}

              <div className={styles.popupFooter}>
                <button type="button" className={styles.popupGhostButton} onClick={currentStep === 1 ? handleClose : goBack}>
                  {currentStep === 1 ? "Maybe later" : "Back"}
                </button>
                {currentStep === 4 && (
                  <button type="submit" className={styles.popupPrimaryButton} disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
