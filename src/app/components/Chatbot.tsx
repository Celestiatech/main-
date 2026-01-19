"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Chatbot.module.css";

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
  { label: "Contact", response: "How can I contact you?" },
];

const BOT_RESPONSES: Record<string, string> = {
  default: "Thanks for your message! A member of our team will get back to you shortly. In the meantime, feel free to explore our services or check out our portfolio.",
  
  greeting: "👋 Hello! Welcome to TechNova! We're a premium IT & Software Development Company specializing in mobile apps, web development, AI solutions, blockchain, and game development. How can I help you today?",
  
  services: "We offer a wide range of services:\n\n📱 Mobile Development - Native & cross-platform apps for iOS/Android\n🌐 Web Development - Scalable web applications\n🎮 Game Development - 2D/3D games for all platforms\n⛓️ Blockchain - Web3 solutions & smart contracts\n🤖 AI/ML - Machine learning solutions\n🎨 UI/UX Design - Modern, user-friendly designs\n⚙️ DevOps - Cloud infrastructure & automation\n\nWhich service interests you most?",
  
  portfolio: "Our portfolio includes 2,500+ successful projects across various industries:\n\n✅ 2,000+ Mobile Apps Developed\n✅ 1,000+ Games Delivered\n✅ 500+ Web Applications\n✅ 200+ Blockchain Solutions\n\nWould you like to see specific case studies?",
  
  pricing: "Our pricing varies based on project complexity, timeline, and requirements. We offer:\n\n💰 Fixed Price Projects\n💰 Time & Material Model\n💰 Dedicated Team Options\n\nWe provide a free initial consultation to understand your needs and provide a customized quote. Would you like to schedule a consultation?",
  
  contact: "📍 Our Locations:\n🇦🇪 Dubai, UAE - Business Bay\n🇮🇳 Mohali, India - Punjab\n\n📞 Phone:\n🇦🇪 +971 50 000 0000\n🇮🇳 +91 98765 43210\n\n✉️ Email: info@technova.com\n\nWould you like us to call you back?",
  
  timeline: "Project timelines depend on complexity:\n\n⏱️ Simple Apps: 2-3 months\n⏱️ Medium Projects: 3-6 months\n⏱️ Complex Solutions: 6-12 months\n\nWe follow agile methodology with regular updates. Want to discuss your timeline?",
  
  technology: "We use modern technologies:\n\nFrontend: React, Next.js, Vue, Angular\nBackend: Node.js, Python, Go, Java\nMobile: React Native, Flutter, Swift, Kotlin\nCloud: AWS, Azure, Google Cloud\nDatabase: PostgreSQL, MongoDB, Firebase\n\nAny specific tech stack you prefer?",
  
  company: "TechNova is a premium IT company with 12+ years of experience. We've helped 2,500+ clients worldwide deliver successful digital solutions. We're recognized as Top Rated Plus on Upwork and rated by Clutch, GoodFirms, and AppFutura.",
  
  blockchain: "Our blockchain services include:\n\n⛓️ Smart Contract Development\n🌐 Web3 Application Development\n🪙 DeFi Solutions\n🎨 NFT Marketplace Development\n🔐 Decentralized Applications\n\nWe work with Ethereum, Solana, Polygon, and other chains.",
  
  mobile: "Mobile app development services:\n\n📱 iOS Development (Swift)\n🤖 Android Development (Kotlin)\n🔄 Cross-Platform (React Native, Flutter)\n📐 App UI/UX Design\n🔧 App Maintenance & Support\n\nWe deliver apps that users love!",
  
  ai: "AI & Machine Learning solutions:\n\n🤖 AI Chatbots\n🧠 Machine Learning Models\n📊 Predictive Analytics\n🔍 NLP Applications\n🎯 Computer Vision\n\nLet's智能化 your business!",
  
  game: "Game development expertise:\n\n🎮 Unity Game Development\n🎯 Unreal Engine Games\n🕹️ 2D & 3D Games\n👥 Multiplayer Games\n🎨 Game Art & Animation\n\nReady to create your next game?",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  const getNextMessageId = useCallback(() => {
    messageIdRef.current += 1;
    return messageIdRef.current.toString();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Qualification flow functions
  const startQualification = () => {
    setQualificationData(prev => ({ ...prev, currentStep: 1 }));
    return "Great! I'd love to help you with your project. To provide the best recommendations, could you tell me about your budget range?\n\n💰 Under $10K\n💰 $10K - $50K\n💰 $50K - $100K\n💰 Over $100K\n💰 Not sure yet";
  };

  const handleQualificationResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    let newScore = qualificationData.leadScore;
    const nextStep = qualificationData.currentStep + 1;

    switch (qualificationData.currentStep) {
      case 1: // Budget
        if (lowerText.includes("$50k") || lowerText.includes("50k") || lowerText.includes("over") || lowerText.includes("100k")) {
          newScore += 30;
          setQualificationData(prev => ({ ...prev, budget: "high", leadScore: newScore, currentStep: nextStep }));
          return "Excellent! A substantial budget gives us flexibility to deliver premium solutions. What's your preferred timeline for the project?\n\n⏱️ ASAP (1-2 months)\n⏱️ 3-6 months\n⏱️ 6-12 months\n⏱️ Flexible";
        } else if (lowerText.includes("$10k") || lowerText.includes("10k")) {
          newScore += 20;
          setQualificationData(prev => ({ ...prev, budget: "medium", leadScore: newScore, currentStep: nextStep }));
          return "Good budget range! We can build something impactful. What's your timeline preference?\n\n⏱️ ASAP (1-2 months)\n⏱️ 3-6 months\n⏱️ 6-12 months\n⏱️ Flexible";
        } else {
          newScore += 10;
          setQualificationData(prev => ({ ...prev, budget: "low", leadScore: newScore, currentStep: nextStep }));
          return "No problem! We can start with an MVP approach. What's your timeline?\n\n⏱️ ASAP (1-2 months)\n⏱️ 3-6 months\n⏱️ 6-12 months\n⏱️ Flexible";
        }

      case 2: // Timeline
        if (lowerText.includes("asap") || lowerText.includes("1-2")) {
          newScore += 20;
          setQualificationData(prev => ({ ...prev, timeline: "urgent", leadScore: newScore, currentStep: nextStep }));
          return "Urgent timeline noted! We specialize in fast delivery. What type of project are you looking to build?\n\n📱 Mobile App\n🌐 Web Application\n🎮 Game Development\n🤖 AI Solution\n⛓️ Blockchain/Web3\n💻 Custom Software";
        } else {
          newScore += 10;
          setQualificationData(prev => ({ ...prev, timeline: "standard", leadScore: newScore, currentStep: nextStep }));
          return "Perfect! That gives us time for thorough development. What type of project interests you?\n\n📱 Mobile App\n🌐 Web Application\n🎮 Game Development\n🤖 AI Solution\n⛓️ Blockchain/Web3\n💻 Custom Software";
        }

      case 3: // Project Type
        newScore += 15;
        setQualificationData(prev => ({ ...prev, projectType: userText, leadScore: newScore, currentStep: nextStep }));
        return "Great choice! Last question: What's your company size?\n\n🏢 Startup (1-50 employees)\n🏢 Small Business (51-200 employees)\n🏢 Enterprise (200+ employees)\n👤 Individual/Founder";

      case 4: // Company Size
        if (lowerText.includes("enterprise") || lowerText.includes("200+")) {
          newScore += 25;
          setQualificationData(prev => ({ ...prev, companySize: "enterprise", leadScore: newScore, qualified: true }));
          return "Perfect! Based on your responses, you're an ideal candidate for our Dedicated Team model. We have extensive experience with enterprise clients.\n\n🎯 HIGH PRIORITY LEAD DETECTED\n\nWould you like me to:\n📅 Schedule a call with our Enterprise Solutions Director\n📋 Send you our enterprise case studies\n💼 Provide a custom proposal\n\nOr tell me more about your specific needs!";
        } else if (lowerText.includes("startup") || lowerText.includes("small")) {
          newScore += 20;
          setQualificationData(prev => ({ ...prev, companySize: "startup", leadScore: newScore, qualified: true }));
          return "Excellent! We love working with startups and have helped hundreds scale successfully.\n\n🚀 Based on your profile, our Fixed Price or Dedicated Team models would work perfectly.\n\nWould you like to:\n📅 Book a free consultation call\n📖 See relevant case studies\n💡 Get a project estimate\n\nWhat's your biggest challenge right now?";
        } else {
          newScore += 15;
          setQualificationData(prev => ({ ...prev, companySize: "individual", leadScore: newScore, qualified: true }));
          return "Awesome! We work with individual founders and entrepreneurs regularly.\n\n💡 Many successful apps started just like yours!\n\nWould you like to:\n📅 Schedule a free strategy call\n📚 Check our founder success stories\n💰 See pricing options\n\nWhat's your vision for this project?";
        }

      default:
        return BOT_RESPONSES.default;
    }
  };

  const getRoutingResponse = (): string => {
    const score = qualificationData.leadScore;

    if (score >= 70) {
      // High-intent: Direct to Calendly booking
      return "🎯 EXCELLENT FIT DETECTED!\n\nBased on your requirements, you're a perfect match for our premium services. Our team would love to discuss your project in detail.\n\n📅 **Let's schedule a call right now!**\n\n[Book a free 30-min consultation](https://calendly.com/technova-consultation)\n\nOr I can send you our detailed proposal first - which would you prefer?";
    } else if (score >= 40) {
      // Medium-intent: Show case studies
      return "📈 GOOD POTENTIAL!\n\nYour project aligns well with our expertise. Let me show you some relevant success stories that might inspire you.\n\n📖 **Check out these case studies:**\n• [Similar Project Case Study 1](/work/case-study-1)\n• [Similar Project Case Study 2](/work/case-study-2)\n\nWould you like to see more examples or schedule a consultation?";
    } else {
      // Low-intent: Educational content
      return "🤔 GETTING STARTED?\n\nThat's completely fine! Many great projects start with exploring options.\n\n📚 **Helpful resources:**\n• [How to Choose the Right Development Partner](/blog/choosing-developer)\n• [MVP Development Guide](/blog/mvp-guide)\n• [Startup Tech Stack Guide](/blog/tech-stack)\n\nWhen you're ready to move forward, I'm here to help!";
    }
  };

  const getBotResponse = (userText: string): string | React.ReactElement => {
    const lowerText = userText.toLowerCase();

    // Check if we're in qualification flow
    if (qualificationData.currentStep > 0 && qualificationData.currentStep < 5) {
      return handleQualificationResponse(userText);
    }

    // Check if qualification is complete and route accordingly
    if (qualificationData.qualified) {
      return getRoutingResponse();
    }

    // Start qualification for project-related queries
    if (lowerText.includes("build") || lowerText.includes("develop") || lowerText.includes("create") ||
        lowerText.includes("app") || lowerText.includes("website") || lowerText.includes("project") ||
        lowerText.includes("mvp") || lowerText.includes("startup")) {
      return startQualification();
    }

    // Standard responses
    if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
      return BOT_RESPONSES.greeting;
    }
    if (lowerText.includes("service") || lowerText.includes("offer") || lowerText.includes("what do you do")) {
      return BOT_RESPONSES.services;
    }
    if (lowerText.includes("portfolio") || lowerText.includes("work")) {
      return BOT_RESPONSES.portfolio;
    }
    if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("rate") || lowerText.includes("quote")) {
      return startQualification();
    }
    if (lowerText.includes("contact") || lowerText.includes("phone") || lowerText.includes("email") || lowerText.includes("location")) {
      return BOT_RESPONSES.contact;
    }
    if (lowerText.includes("timeline") || lowerText.includes("time") || lowerText.includes("long") || lowerText.includes("duration")) {
      return BOT_RESPONSES.timeline;
    }
    if (lowerText.includes("technology") || lowerText.includes("tech") || lowerText.includes("stack") || lowerText.includes("framework")) {
      return BOT_RESPONSES.technology;
    }
    if (lowerText.includes("about") || lowerText.includes("company") || lowerText.includes("who") || lowerText.includes("year")) {
      return BOT_RESPONSES.company;
    }
    if (lowerText.includes("blockchain") || lowerText.includes("crypto") || lowerText.includes("web3") || lowerText.includes("nft") || lowerText.includes("smart contract")) {
      return BOT_RESPONSES.blockchain;
    }
    if (lowerText.includes("mobile") || lowerText.includes("app") || lowerText.includes("ios") || lowerText.includes("android")) {
      return BOT_RESPONSES.mobile;
    }
    if (lowerText.includes("ai") || lowerText.includes("artificial") || lowerText.includes("machine learning") || lowerText.includes("ml")) {
      return BOT_RESPONSES.ai;
    }
    if (lowerText.includes("game") || lowerText.includes("gaming") || lowerText.includes("unity")) {
      return BOT_RESPONSES.game;
    }
    if (lowerText.includes("web") || lowerText.includes("website") || lowerText.includes("development")) {
      return BOT_RESPONSES.services;
    }
    if (lowerText.includes("thank") || lowerText.includes("thanks")) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    if (lowerText.includes("schedule") || lowerText.includes("call") || lowerText.includes("consultation")) {
      return "I'd be happy to help you schedule a consultation! Please fill out our contact form or request a call, and our team will get back to you within 24 hours.";
    }

    return BOT_RESPONSES.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: getNextMessageId(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: getNextMessageId(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickReply = (label: string, response: string) => {
    const userMessage: Message = {
      id: getNextMessageId(),
      text: label,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(response);
      const botMessage: Message = {
        id: getNextMessageId(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={styles.chatbotContainer}>
      {/* Chat Window */}
      <div className={`${styles.chatWindow} ${isOpen ? styles.open : ""}`}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.botAvatar}>
              <span>🤖</span>
            </div>
            <div className={styles.headerText}>
              <h3>TechNova Assistant</h3>
              <span className={styles.status}>
                <span className={styles.statusDot}></span>
                Online
              </span>
            </div>
          </div>
          <button 
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messagesContainer}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.botMessage}`}
            >
              <div className={styles.messageAvatar}>
                {message.sender === "user" ? "👤" : "🤖"}
              </div>
              <div className={styles.messageContent}>
                <div className={styles.messageBubble}>
                  {typeof message.text === 'string' ? message.text.split("\n").map((line: string, index: number) => (
                    <p key={index}>{line}</p>
                  )) : message.text}
                </div>
                <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className={styles.quickReplies}>
            {QUICK_REPLIES.map((reply, index) => (
              <button
                key={index}
                className={styles.quickReplyButton}
                onClick={() => handleQuickReply(reply.label, reply.response)}
              >
                {reply.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <textarea
              className={styles.input}
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
            />
            <button 
              className={styles.sendButton}
              onClick={handleSend}
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
          <p className={styles.disclaimer}>
            Powered by TechNova AI
          </p>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <span>✕</span>
        ) : (
          <span className={styles.chatIcon}>💬</span>
        )}
        {!isOpen && messages.length === 1 && (
          <span className={styles.notificationBadge}>1</span>
        )}
      </button>
    </div>
  );
}

