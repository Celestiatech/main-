"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface QuickReply {
  label: string;
  response: string;
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
      id: 1,
      text: BOT_RESPONSES.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();

    // Check for specific keywords
    if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
      return BOT_RESPONSES.greeting;
    }
    if (lowerText.includes("service") || lowerText.includes("offer") || lowerText.includes("what do you do")) {
      return BOT_RESPONSES.services;
    }
    if (lowerText.includes("portfolio") || lowerText.includes("project") || lowerText.includes("work")) {
      return BOT_RESPONSES.portfolio;
    }
    if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("rate") || lowerText.includes("quote")) {
      return BOT_RESPONSES.pricing;
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
      id: Date.now(),
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
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickReply = (label: string, response: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: label,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(response);
      const botMessage: Message = {
        id: Date.now() + 1,
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
                  {message.text.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
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

