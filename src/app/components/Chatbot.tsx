"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./Chatbot.module.css";
import { PortfolioLeadPopup } from "../portfolio/PortfolioLeadPopup";

interface Message {
  id: string;
  text: string | React.ReactNode;
  sender: "user" | "bot";
  timestamp: Date;
}

interface QuickReply {
  label: string;
  response: string;
}

interface QualificationData {
  budget?: string;
  timeline?: string;
  projectType?: string;
  companySize?: string;
  currentStep: number;
  leadScore: number;
  qualified: boolean;
}

const QUICK_REPLIES: QuickReply[] = [
  { label: "Services", response: "What services do you offer?" },
  { label: "Portfolio", response: "Show me your portfolio" },
  { label: "Pricing", response: "What are your rates?" },
  { label: "Timeline", response: "How long will my project take?" },
  { label: "Contact", response: "How can I contact you?" },
];

const STARTER_SUGGESTIONS: QuickReply[] = [
  { label: "What can W3Tech do?", response: "What services do you offer?" },
  { label: "Help me with SEO strategy", response: "How can you help with SEO?" },
  { label: "Explain your services", response: "Explain your different services" },
];

const BOT_RESPONSES: Record<string, string> = {
  default: "Thanks for your message! A member of our team will get back to you shortly. In the meantime, feel free to explore our services or check out our portfolio.",
  greeting: "Hello! Welcome to W3Tech. We build websites, mobile apps, AI solutions, redesigns, SEO systems, and growth-focused digital products. How can I help you today?",
  services: "We offer a wide range of services:\n\nMobile development\nWeb development\nUI/UX design\nAI solutions\nSEO and performance optimization\nEcommerce development\nMaintenance and support\n\nTell me what you want to build and I can guide you.",
  portfolio: "Our portfolio includes product launches, redesigns, custom business websites, mobile apps, AI features, and SEO-focused builds. If you want, I can point you toward the type of work most relevant to your project.",
  pricing: "Our pricing depends on scope, timeline, and complexity. We work on fixed-price projects, time and material, and dedicated team models. If you share your goal and budget range, I can guide you to the right starting point.",
  contact: "You can reach us by email at hello@w3tech.in, or start a conversation here and our team can follow up. If you want, I can help you prepare the details to send.",
  timeline: "Typical timelines depend on complexity:\n\nLanding page or brochure site: 2-4 weeks\nBusiness website: 4-8 weeks\nCustom web app: 8-16 weeks\nMobile app MVP: 10-18 weeks\n\nIf you tell me what you need, I can narrow it down.",
  technology: "We work with modern stacks including Next.js, React, Node.js, TypeScript, Python, React Native, Flutter, PostgreSQL, Firebase, cloud infrastructure, and AI/API integrations.",
  company: "W3Tech is a digital product and development company focused on websites, apps, AI, and growth-ready digital experiences. We help clients go from idea to launch with design, development, SEO, and support.",
  blockchain: "We can help with blockchain and Web3 products including smart contracts, wallets, NFT experiences, token-connected platforms, and custom Web3 integrations.",
  mobile: "We build iOS, Android, and cross-platform mobile apps with product strategy, UX, development, QA, launch, and post-launch support.",
  ai: "We build AI-powered features such as chat assistants, workflow automation, intelligent search, content systems, and custom integrations with modern AI APIs.",
  game: "We can support game-focused product work too, including frontends, landing pages, support systems, and game-adjacent web/mobile experiences.",
  ecommerce: "We build ecommerce stores and custom commerce platforms with product pages, checkout flows, payments, operations integrations, and conversion-focused UX.",
  redesign: "Yes, we handle redesigns. That includes UX review, visual refresh, content structure improvement, performance fixes, SEO cleanup, and full rebuilds when needed.",
  seo: "We help with technical SEO, content structure, metadata, schema, performance, internal linking, landing pages, and conversion-focused search growth.",
  maintenance: "We provide maintenance, support, bug fixing, optimization, and ongoing feature work after launch as well.",
  process: "Our process usually looks like this:\n\nDiscovery\nScope and estimate\nUX/UI planning\nDevelopment in milestones\nQA and review\nLaunch and support\n\nWe keep communication clear and structured throughout.",
  hiring: "We offer fixed-price delivery, part-time support, and dedicated team models. If you tell me your timeline and level of involvement, I can suggest the best fit.",
  support: "If something is already live and needs help, we can support bug fixes, UI improvements, performance work, API issues, and ongoing releases.",
  nda: "Yes, we can work under NDA and handle confidential product discussions in a structured way.",
  industries: "We work across SaaS, healthcare, real estate, education, ecommerce, fintech, startup products, and service businesses.",
  integrations: "We can integrate payment gateways, CRMs, analytics tools, email systems, automation platforms, internal dashboards, and AI APIs.",
  launch: "We can help with launch planning, QA, deployment, tracking setup, and post-launch support so the release goes smoothly.",
};

const matchesAny = (text: string, keywords: string[]) => keywords.some((keyword) => text.includes(keyword));

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatbotOpen');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const [isSupportOpen, setIsSupportOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "1",
      text: BOT_RESPONSES.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [qualificationData, setQualificationData] = useState<QualificationData>({
    currentStep: 0,
    leadScore: 0,
    qualified: false,
  });
  const [typingText, setTypingText] = useState("Hi there, how may I help?");
  const [displayedText, setDisplayedText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageIdRef = useRef(0);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef(0);

  const sectionMessages: Record<string, string> = {
    hero: "Typing: Hi there, how may I help?",
    services: "Typing: Tell me about services",
    portfolio: "Typing: Show me your work",
    pricing: "Typing: What's your pricing?",
    testimonials: "Typing: What do clients say?",
    faq: "Typing: Common questions answered",
    contact: "Typing: Let's get in touch",
    default: "Typing: How can I assist?"
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      let currentSection = 'hero';
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          currentSection = section.getAttribute('data-section') || 'hero';
        }
      });

      const newMessage = sectionMessages[currentSection] || sectionMessages.default;
      if (newMessage !== typingText) {
        setTypingText(newMessage);
        charIndexRef.current = 0;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [typingText]);

  useEffect(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    if (charIndexRef.current < typingText.length) {
      typingIntervalRef.current = setInterval(() => {
        setDisplayedText(prev => {
          const nextIndex = charIndexRef.current + 1;
          charIndexRef.current = nextIndex;
          return typingText.substring(0, nextIndex);
        });
      }, 30);
    }

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [typingText]);

  const getNextMessageId = useCallback(() => {
    messageIdRef.current += 1;
    return messageIdRef.current.toString();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  useEffect(() => {
    if (isChatOpen) {
      inputRef.current?.focus();
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatbotOpen', JSON.stringify(isChatOpen));
    }
  }, [isChatOpen]);

  const startQualification = () => {
    setQualificationData((prev) => ({ ...prev, currentStep: 1 }));
    return "Great. To guide you properly, what is your approximate budget range?\n\nUnder $10K\n$10K - $50K\n$50K - $100K\nOver $100K\nNot sure yet";
  };

  const handleQualificationResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    let newScore = qualificationData.leadScore;
    const nextStep = qualificationData.currentStep + 1;

    switch (qualificationData.currentStep) {
      case 1:
        if (matchesAny(lowerText, ["50k", "100k", "over"])) {
          newScore += 30;
          setQualificationData((prev) => ({ ...prev, budget: "high", leadScore: newScore, currentStep: nextStep }));
          return "That gives us good flexibility. What is your preferred timeline?\n\nASAP\n3-6 months\n6-12 months\nFlexible";
        }
        if (matchesAny(lowerText, ["10k"])) {
          newScore += 20;
          setQualificationData((prev) => ({ ...prev, budget: "medium", leadScore: newScore, currentStep: nextStep }));
          return "Good starting range. What timeline are you targeting?\n\nASAP\n3-6 months\n6-12 months\nFlexible";
        }
        newScore += 10;
        setQualificationData((prev) => ({ ...prev, budget: "early", leadScore: newScore, currentStep: nextStep }));
        return "No problem, we can still shape the right approach. What timeline are you targeting?\n\nASAP\n3-6 months\n6-12 months\nFlexible";

      case 2:
        if (matchesAny(lowerText, ["asap", "urgent", "1-2"])) {
          newScore += 20;
          setQualificationData((prev) => ({ ...prev, timeline: "urgent", leadScore: newScore, currentStep: nextStep }));
          return "Understood. What are you trying to build?\n\nWebsite\nWeb app\nMobile app\nAI feature\nSEO growth project\nRedesign";
        }
        newScore += 10;
        setQualificationData((prev) => ({ ...prev, timeline: "standard", leadScore: newScore, currentStep: nextStep }));
        return "That gives us room for planning properly. What are you trying to build?\n\nWebsite\nWeb app\nMobile app\nAI feature\nSEO growth project\nRedesign";

      case 3:
        newScore += 15;
        setQualificationData((prev) => ({ ...prev, projectType: userText, leadScore: newScore, currentStep: nextStep }));
        return "Last question: what type of company are you?\n\nStartup\nSmall business\nEnterprise\nIndividual founder";

      case 4:
        if (matchesAny(lowerText, ["enterprise"])) {
          newScore += 25;
          setQualificationData((prev) => ({ ...prev, companySize: "enterprise", leadScore: newScore, qualified: true }));
          return "You look like a strong fit for a high-touch delivery model. If you want, send me your core requirements and I’ll help shape the next step.";
        }
        newScore += 20;
        setQualificationData((prev) => ({ ...prev, companySize: "growth", leadScore: newScore, qualified: true }));
        return "That sounds like a good fit. If you share your goal, target audience, and timeline, I can help you frame the best project path.";

      default:
        return BOT_RESPONSES.default;
    }
  };

  const getRoutingResponse = (): string => {
    const score = qualificationData.leadScore;

    if (score >= 70) {
      return "You look like a strong fit for a premium build. The best next step is to share your key goals, features, and deadline so we can suggest the right execution path.";
    }

    if (score >= 40) {
      return "Your project sounds promising. If you tell me the type of product, audience, and target outcome, I can guide you toward the right structure and scope.";
    }

    return "You are still in the discovery stage, which is totally fine. Tell me what you want to build and what result you want, and I’ll help you shape the idea.";
  };

  const getBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();

    if (qualificationData.currentStep > 0 && qualificationData.currentStep < 5) {
      return handleQualificationResponse(userText);
    }

    if (qualificationData.qualified) {
      return getRoutingResponse();
    }

    if (matchesAny(lowerText, ["build", "develop", "create", "project", "website", "app", "mvp", "startup"])) {
      return startQualification();
    }
    if (matchesAny(lowerText, ["hello", "hi", "hey"])) return BOT_RESPONSES.greeting;
    if (matchesAny(lowerText, ["service", "offer", "what do you do"])) return BOT_RESPONSES.services;
    if (matchesAny(lowerText, ["portfolio", "case study", "work"])) return BOT_RESPONSES.portfolio;
    if (matchesAny(lowerText, ["price", "cost", "rate", "quote", "budget"])) return startQualification();
    if (matchesAny(lowerText, ["contact", "email", "phone", "whatsapp"])) return BOT_RESPONSES.contact;
    if (matchesAny(lowerText, ["timeline", "how long", "duration", "delivery"])) return BOT_RESPONSES.timeline;
    if (matchesAny(lowerText, ["technology", "tech", "stack", "framework"])) return BOT_RESPONSES.technology;
    if (matchesAny(lowerText, ["about", "company", "experience"])) return BOT_RESPONSES.company;
    if (matchesAny(lowerText, ["blockchain", "crypto", "web3", "nft"])) return BOT_RESPONSES.blockchain;
    if (matchesAny(lowerText, ["mobile", "ios", "android", "react native", "flutter"])) return BOT_RESPONSES.mobile;
    if (matchesAny(lowerText, ["ai", "chatbot", "automation", "machine learning"])) return BOT_RESPONSES.ai;
    if (matchesAny(lowerText, ["game", "gaming", "unity", "unreal"])) return BOT_RESPONSES.game;
    if (matchesAny(lowerText, ["ecommerce", "shopify", "store", "checkout"])) return BOT_RESPONSES.ecommerce;
    if (matchesAny(lowerText, ["redesign", "revamp", "refresh"])) return BOT_RESPONSES.redesign;
    if (matchesAny(lowerText, ["seo", "ranking", "organic traffic"])) return BOT_RESPONSES.seo;
    if (matchesAny(lowerText, ["maintenance", "retainer", "support plan"])) return BOT_RESPONSES.maintenance;
    if (matchesAny(lowerText, ["process", "workflow", "steps", "milestone"])) return BOT_RESPONSES.process;
    if (matchesAny(lowerText, ["dedicated developer", "dedicated team", "hire developers"])) return BOT_RESPONSES.hiring;
    if (matchesAny(lowerText, ["bug", "fix", "issue", "problem"])) return BOT_RESPONSES.support;
    if (matchesAny(lowerText, ["nda", "confidential", "security", "privacy"])) return BOT_RESPONSES.nda;
    if (matchesAny(lowerText, ["industry", "healthcare", "real estate", "education", "saas", "fintech"])) return BOT_RESPONSES.industries;
    if (matchesAny(lowerText, ["integration", "api", "crm", "payment gateway", "webhook"])) return BOT_RESPONSES.integrations;
    if (matchesAny(lowerText, ["launch", "deploy", "go live", "release"])) return BOT_RESPONSES.launch;
    if (matchesAny(lowerText, ["thank", "thanks"])) return "You’re welcome. If you want, ask me about scope, pricing, redesigns, or launch planning.";
    if (matchesAny(lowerText, ["schedule", "call", "consultation", "meeting"])) return "If you want to move forward, send your project summary here or email hello@w3tech.in and our team can follow up.";

    return BOT_RESPONSES.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const currentInput = inputValue;
    const userMessage: Message = {
      id: getNextMessageId(),
      text: currentInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    window.setTimeout(() => {
      const botMessage: Message = {
        id: getNextMessageId(),
        text: getBotResponse(currentInput),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 700);
  };

  const handleQuickReply = (label: string, response: string) => {
    const userMessage: Message = {
      id: getNextMessageId(),
      text: label,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    window.setTimeout(() => {
      const botMessage: Message = {
        id: getNextMessageId(),
        text: getBotResponse(response),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 700);
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const openLeadPopup = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("portfolio-lead-popup:open"));
    }
  };

  const hasConversationStarted = messages.some((message) => message.sender === "user");

  return (
    <div className={styles.chatbotContainer}>
      <PortfolioLeadPopup />

      {isSupportOpen && (
        <aside className={styles.supportWindow}>
        <div className={styles.supportHeader}>
          <div className={styles.supportHeaderTop}>
            <Image
              src="/logos/w3tech.png"
              alt="W3Tech"
              width={44}
              height={44}
              className={styles.supportLogo}
            />
            <button
              type="button"
              className={styles.supportCloseButton}
              onClick={() => setIsSupportOpen(false)}
              aria-label="Minimize conversation widget"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <h3>Hi 👋</h3>
          <p>Ask us anything, or share your feedback</p>
        </div>

        <div className={styles.supportBody}>
          <div className={styles.supportCard}>
            <span className={styles.supportCardTitle}>Start a new conversation</span>
            <span className={styles.supportCardText}>Our agents typically reply in a few minutes.</span>
            <div className={styles.supportAgents}>
              <span className={styles.supportAgent}>A</span>
              <span className={styles.supportAgent}>C</span>
            </div>
            <button
              type="button"
              className={styles.supportPrimaryButton}
              onClick={() => setIsChatOpen(true)}
            >
              <span className={styles.supportPrimaryIcon}>➤</span>
              Send us a message
            </button>
          </div>

          <div className={styles.supportCard}>
            <span className={styles.supportCardTitle}>Send us an email</span>
            <span className={styles.supportCardText}>If you're in a hurry, send us a message and we will get back to you asap.</span>
            <a href="mailto:hello@w3tech.in" className={styles.supportSecondaryButton}>
              Send email
            </a>
          </div>

          <button type="button" className={styles.supportGhostButton} onClick={openLeadPopup}>
            Open project survey
          </button>
        </div>
        </aside>
      )}

      {isChatOpen ? (
        <section className={`${styles.chatWindow} ${styles.open}`}>
          <header className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.headerIcon}
                aria-hidden="true"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
              <div className={styles.headerText}>
                <h3>W3Tech Assistant</h3>
                <p>AI-powered project guide</p>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.headerActionButton} disabled title="Email conversation summary" aria-label="Email conversation summary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
              <button className={styles.headerActionButton} onClick={() => setIsChatOpen(false)} aria-label="Minimize AI chat">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </header>

          <div className={styles.messagesContainer}>
            {!hasConversationStarted ? (
              <div className={styles.starterContainer}>
                <div className={styles.welcomeHeader}>
                  <div className={styles.welcomeIconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.welcomeIcon} aria-hidden="true">
                      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                      <path d="M20 3v4" />
                      <path d="M22 5h-4" />
                      <path d="M4 17v2" />
                      <path d="M5 18H3" />
                    </svg>
                  </div>
                  <h2 className={styles.welcomeTitle}>How can I help you?</h2>
                  <p className={styles.welcomeDescription}>
                    I can help with websites, apps, SEO, redesigns, pricing, timelines, and the best way to start your project.
                  </p>
                </div>

                <div className={styles.suggestionsGrid}>
                  {STARTER_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion.label}
                      className={styles.suggestionCard}
                      onClick={() => handleQuickReply(suggestion.label, suggestion.response)}
                    >
                      <span className={styles.suggestionIcon}>✦</span>
                      <span className={styles.suggestionText}>{suggestion.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.botMessage}`}
                  >
                    <div className={styles.messageAvatar}>
                      {message.sender === "user" ? "👤" : "✦"}
                    </div>
                    <div className={styles.messageContent}>
                      <div className={styles.messageBubble}>
                        {typeof message.text === "string"
                          ? message.text.split("\n").map((line, index) => <p key={index}>{line}</p>)
                          : message.text}
                      </div>
                      <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {hasConversationStarted && messages.length <= 3 && (
            <div className={styles.quickReplies}>
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply.label}
                  className={styles.quickReplyButton}
                  onClick={() => handleQuickReply(reply.label, reply.response)}
                >
                  {reply.label}
                </button>
              ))}
            </div>
          )}

          <div className={styles.inputContainer}>
            <form
              className={styles.inputWrapper}
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
            >
              <input
                ref={inputRef}
                className={styles.input}
                placeholder="Ask me anything about your project..."
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <button type="submit" className={styles.sendButton} disabled={!inputValue.trim()} aria-label="Send message">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
              </button>
            </form>
            <p className={styles.disclaimer}>Powered by W3Tech AI</p>
          </div>
        </section>
      ) : null}

      {!isSupportOpen ? (
        <button
          type="button"
          className={styles.reopenSupport}
          onClick={() => setIsSupportOpen(true)}
          aria-label="Open conversation"
          title="Open conversation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
        </button>
      ) : null}

      {!isChatOpen ? (
        <div className={styles.assistantIconWrapper}>
          <button
            type="button"
            className={styles.reopenAssistant}
            onClick={() => setIsChatOpen(true)}
            aria-label="Open AI assistant"
            title="Open AI assistant"
          >
            <Image
              src="/logos/cropped_circle_image.png"
              alt="Chat Assistant"
              width={48}
              height={48}
              priority
              className={styles.assistantIcon}
            />
          </button>
          <div className={styles.typingBubble}>
            <p>{displayedText}<span className={styles.cursor}>|</span></p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
