export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  intro: string;
  keyTakeaways: string[];
  sections: BlogSection[];
  /**
   * Rendered as an FAQ block and emitted as FAQPage structured data. This is
   * what answer engines and AI overviews quote from, so the answers are
   * written to stand on their own out of context.
   */
  faq?: BlogFaq[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "complete-guide-to-react-19-new-features-and-improvements",
    title: "Complete Guide to React 19: New Features and Improvements",
    excerpt: "Explore the exciting new features in React 19 including the use hook, improved concurrency, and better TypeScript support.",
    image: "/images/services/services_web_design_1.jpg",
    imageAlt: "React development workspace with modern interface elements",
    category: "Web Development",
    author: "John Smith",
    date: "Jan 15, 2024",
    readTime: "8 min read",
    featured: true,
    intro: "React 19 continues the framework's move toward simpler data loading, smoother server rendering, and less boilerplate around async UI. For teams building modern product interfaces, the biggest win is not one headline feature but a set of quality-of-life improvements that reduce friction across the stack.",
    keyTakeaways: [
      "Async rendering workflows are easier to reason about with the new primitives.",
      "Server and client boundaries are cleaner, especially in app-router style architectures.",
      "TypeScript support and ergonomics are better for large production teams."
    ],
    sections: [
      {
        heading: "What React 19 changes in practice",
        paragraphs: [
          "The release focuses on practical developer experience. Instead of forcing teams into entirely new patterns, it smooths out existing workflows around forms, async rendering, and server interactions.",
          "That means fewer custom wrappers, fewer temporary loading hacks, and less code dedicated to keeping UI state in sync with network state."
        ],
        bullets: [
          "Better async UX patterns",
          "Cleaner form handling",
          "Improved compatibility with modern server-rendered apps"
        ]
      },
      {
        heading: "Why product teams should care",
        paragraphs: [
          "For product teams, the benefit is speed. Features become easier to implement without accumulating as much maintenance overhead.",
          "For engineering teams, React 19 lowers the cost of consistency. Shared UI patterns become easier to codify and easier to scale."
        ]
      },
      {
        heading: "Best way to adopt it",
        paragraphs: [
          "Adopt React 19 incrementally. Start with lower-risk surfaces, validate your framework compatibility, and update shared component patterns before touching critical user flows.",
          "That approach lets you capture the DX gains without turning a framework upgrade into a risky rewrite."
        ]
      }
    ]
  },
  {
    id: 2,
    slug: "building-scalable-apis-with-nodejs-and-typescript",
    title: "Building Scalable APIs with Node.js and TypeScript",
    excerpt: "Learn best practices for creating high-performance, type-safe APIs using Node.js, Express, and TypeScript.",
    image: "/images/services/services_software_development_0.jpg",
    imageAlt: "Backend API development dashboard for Node.js and TypeScript",
    category: "Web Development",
    author: "Sarah Johnson",
    date: "Jan 12, 2024",
    readTime: "10 min read",
    intro: "Scalable APIs are less about picking the perfect framework and more about building strong conventions around contracts, validation, error handling, and observability. TypeScript helps because it reduces ambiguity between what your API says and what it actually does.",
    keyTakeaways: [
      "Shared types and validation reduce integration bugs.",
      "Well-structured service layers make APIs easier to extend.",
      "Observability is required if you want to scale safely."
    ],
    sections: [
      {
        heading: "Start with the contract",
        paragraphs: [
          "Many APIs fail to scale because their contracts drift over time. Route handlers expand, payloads become inconsistent, and assumptions spread across the codebase.",
          "A strong TypeScript-first approach keeps request and response models explicit. That clarity improves testing, client integration, and long-term maintenance."
        ]
      },
      {
        heading: "Separate transport from business logic",
        paragraphs: [
          "Keep routing, validation, and response formatting thin. Move business logic into service modules and persistence into repositories or data access layers.",
          "That separation makes endpoints easier to test and easier to evolve as your domain grows."
        ],
        bullets: [
          "Controllers for HTTP concerns",
          "Services for domain logic",
          "Repositories for database access"
        ]
      },
      {
        heading: "Plan for growth early",
        paragraphs: [
          "Even if your API is small, add logging, structured errors, and request metrics from the beginning. These habits pay off long before you feel 'large'.",
          "Scalability is rarely a single migration. It is the result of many small engineering decisions made early."
        ]
      }
    ]
  },
  {
    id: 3,
    slug: "flutter-vs-react-native-which-framework-to-choose-in-2024",
    title: "Flutter vs React Native: Which Framework to Choose in 2024?",
    excerpt: "A comprehensive comparison of the two leading cross-platform mobile development frameworks.",
    image: "/images/portfolio/portfolio_mobile_app_0.jpg",
    imageAlt: "Mobile app interface preview representing Flutter and React Native development",
    category: "Mobile Development",
    author: "Michael Chen",
    date: "Jan 10, 2024",
    readTime: "12 min read",
    intro: "Flutter and React Native can both ship strong mobile products. The better choice depends less on internet debates and more on your team’s skills, expected product complexity, and long-term hiring plan.",
    keyTakeaways: [
      "React Native is often a strong fit for JavaScript-heavy teams.",
      "Flutter offers strong UI control and consistency.",
      "The best choice depends on your product roadmap, not just launch speed."
    ],
    sections: [
      {
        heading: "When React Native makes sense",
        paragraphs: [
          "If your team already works deeply in React, React Native offers a faster mental model and smoother talent overlap between web and mobile work.",
          "It is especially useful when product velocity and shared frontend thinking matter more than pixel-level rendering control."
        ]
      },
      {
        heading: "When Flutter stands out",
        paragraphs: [
          "Flutter shines when you need a highly controlled visual system across platforms. Its rendering model gives teams more design consistency and fewer platform-specific surprises.",
          "That can be valuable for branded consumer apps or products with unusual interface demands."
        ]
      },
      {
        heading: "How to decide",
        paragraphs: [
          "Evaluate team familiarity, plugin ecosystem needs, maintenance expectations, and how much native customization you expect over time.",
          "A framework decision should reduce delivery risk, not just look good in a technical comparison chart."
        ]
      }
    ]
  },
  {
    id: 4,
    slug: "introduction-to-large-language-models-and-gpt4",
    title: "Introduction to Large Language Models and GPT-4",
    excerpt: "Understanding how LLMs work and how to integrate them into your applications.",
    image: "/images/portfolio/grocito/ai-studio-craft.png",
    imageAlt: "AI product dashboard representing large language model applications",
    category: "AI & Machine Learning",
    author: "Emily Davis",
    date: "Jan 8, 2024",
    readTime: "15 min read",
    featured: true,
    intro: "Large language models have changed what teams can automate inside products, operations, and support workflows. The real opportunity is not adding AI for novelty, but using it where speed, summarization, reasoning, and language generation create measurable business value.",
    keyTakeaways: [
      "LLMs are most useful when paired with clear workflow design.",
      "Context quality matters as much as model capability.",
      "Successful AI products focus on narrow value before broad expansion."
    ],
    sections: [
      {
        heading: "What LLMs are actually doing",
        paragraphs: [
          "At a practical level, LLMs predict useful next tokens based on patterns learned from large datasets. In product terms, that enables summarization, drafting, classification, extraction, and conversational assistance.",
          "The output can feel intelligent, but results depend heavily on prompt quality, system design, and the data you attach at runtime."
        ]
      },
      {
        heading: "Where teams get value first",
        paragraphs: [
          "Most companies should start with internal productivity or high-volume support use cases. These are easier to scope, easier to measure, and less risky than broad customer-facing autonomy.",
          "Examples include knowledge retrieval, call summaries, document analysis, and response drafting."
        ],
        bullets: [
          "Support copilots",
          "Document extraction",
          "Internal search and knowledge assistants"
        ]
      },
      {
        heading: "Integration principles",
        paragraphs: [
          "Treat the model as one layer in a system. Add retrieval, guardrails, feedback loops, and observability around it.",
          "The companies that win with AI usually design the whole workflow well, not just the prompt."
        ]
      }
    ]
  },
  {
    id: 5,
    slug: "smart-contract-development-with-solidity",
    title: "Smart Contract Development with Solidity: A Practical Guide",
    excerpt: "Learn how to build secure and efficient smart contracts for Ethereum and other EVM chains.",
    image: "/images/portfolio/case-studies/cryptovault-after.jpg",
    imageAlt: "Blockchain platform interface for smart contract development",
    category: "Blockchain",
    author: "David Wilson",
    date: "Jan 5, 2024",
    readTime: "14 min read",
    intro: "Smart contracts are unforgiving. Once deployed, mistakes are expensive and sometimes irreversible. That is why strong Solidity development is as much about discipline and review as it is about writing code.",
    keyTakeaways: [
      "Security should shape architecture from day one.",
      "Gas efficiency matters, but not more than correctness.",
      "Testing and audits are part of development, not a final step."
    ],
    sections: [
      {
        heading: "Design for safety first",
        paragraphs: [
          "The most common contract failures come from unchecked assumptions, permission mistakes, and state transitions that were not fully modeled.",
          "Before optimizing, define roles, invariants, and failure scenarios clearly."
        ]
      },
      {
        heading: "Testing strategy",
        paragraphs: [
          "Contract tests should cover happy paths, access control, failure cases, and edge-condition economics. Property-based tests and simulation can catch bugs example-driven tests miss.",
          "You should also test integrations against realistic token behavior and external contract responses."
        ]
      },
      {
        heading: "What mature teams do differently",
        paragraphs: [
          "Mature blockchain teams document assumptions, review every privileged action, and budget time for external audit feedback.",
          "In web3, shipping slower but safer is usually the better business decision."
        ]
      }
    ]
  },
  {
    id: 6,
    slug: "docker-and-kubernetes-container-orchestration-explained",
    title: "Docker and Kubernetes: Container Orchestration Explained",
    excerpt: "Master containerization and orchestration for deploying scalable applications.",
    image: "/images/portfolio/portfolio_innovation_0.jpg",
    imageAlt: "Cloud infrastructure dashboard representing Docker and Kubernetes orchestration",
    category: "DevOps",
    author: "Alex Turner",
    date: "Jan 3, 2024",
    readTime: "11 min read",
    intro: "Containers simplify packaging, but orchestration is what makes them operationally useful at scale. Kubernetes can be powerful, but teams get the most value when they adopt it for real platform needs, not because it is the default modern answer.",
    keyTakeaways: [
      "Docker solves packaging; Kubernetes solves coordination.",
      "Operational maturity matters more than tool popularity.",
      "Smaller teams should keep their platform simple until complexity demands more."
    ],
    sections: [
      {
        heading: "What Docker gives you",
        paragraphs: [
          "Docker standardizes how applications are packaged and run. That reduces environment mismatch and improves repeatability between local, staging, and production systems.",
          "For many products, this alone is a major improvement in developer workflow."
        ]
      },
      {
        heading: "What Kubernetes adds",
        paragraphs: [
          "Kubernetes coordinates deployment, networking, scaling, and recovery across clusters of services. It becomes useful when your application architecture and team size create operational complexity that manual processes cannot handle reliably.",
          "Used too early, it can also become an unnecessary maintenance burden."
        ]
      },
      {
        heading: "A practical adoption path",
        paragraphs: [
          "Start with containerized builds, reliable CI/CD, and observability. Then introduce orchestration when deployment frequency, service count, or traffic patterns justify it.",
          "A strong platform evolves in stages."
        ]
      }
    ]
  },
  {
    id: 7,
    slug: "ui-ux-design-principles-for-developers",
    title: "UI/UX Design Principles Every Developer Should Know",
    excerpt: "Essential design principles every developer should know to create beautiful user interfaces.",
    image: "/images/portfolio/portfolio_website_design_2.jpg",
    imageAlt: "Modern UI and UX design layout for product interfaces",
    category: "Design",
    author: "Lisa Anderson",
    date: "Jan 1, 2024",
    readTime: "9 min read",
    intro: "Developers do not need to become full-time designers to ship better interfaces. But understanding a few core UI and UX principles dramatically improves the quality, clarity, and trustworthiness of the products you build.",
    keyTakeaways: [
      "Spacing and hierarchy influence clarity more than decoration.",
      "Consistency creates trust.",
      "Good UX is often about removing friction, not adding flair."
    ],
    sections: [
      {
        heading: "Start with hierarchy",
        paragraphs: [
          "Users scan before they read. Clear headings, visual grouping, and predictable spacing help people understand a screen quickly.",
          "If every element shouts, nothing is easy to use."
        ]
      },
      {
        heading: "Design for tasks, not screenshots",
        paragraphs: [
          "A polished UI still fails if users cannot complete their goal. Focus on navigation clarity, form friction, feedback states, and mobile usability.",
          "Strong UX is measured in confidence and flow, not just aesthetics."
        ],
        bullets: [
          "Keep primary actions obvious",
          "Reduce unnecessary choices",
          "Make system feedback immediate"
        ]
      },
      {
        heading: "Why developers benefit from design thinking",
        paragraphs: [
          "When developers understand design intent, collaboration improves. Hand-offs get smoother, implementation gets more accurate, and product decisions become less reactive.",
          "Design literacy shortens the path between concept and quality."
        ]
      }
    ]
  },
  {
    id: 8,
    slug: "nextjs-14-server-actions-and-app-router-deep-dive",
    title: "Next.js 14: Server Actions and App Router Deep Dive",
    excerpt: "Master the new features in Next.js 14 including server actions and improved data fetching.",
    image: "/images/services/services_web_design_2.jpg",
    imageAlt: "Next.js web application layout with modern dashboard visuals",
    category: "Web Development",
    author: "John Smith",
    date: "Dec 28, 2023",
    readTime: "10 min read",
    intro: "Next.js 14 pushed server-first application architecture further into the mainstream. Server actions and the App Router model simplify some patterns dramatically, but they also require teams to think more intentionally about boundaries, caching, and mutation flows.",
    keyTakeaways: [
      "Server actions can replace custom API boilerplate in many cases.",
      "App Router architecture rewards clear data ownership.",
      "Caching behavior must be understood, not guessed."
    ],
    sections: [
      {
        heading: "Why server actions matter",
        paragraphs: [
          "Server actions let you move common mutations closer to the component tree without building a separate endpoint for every interaction.",
          "That can make forms and admin flows simpler, especially in internal tools and content-heavy products."
        ]
      },
      {
        heading: "What teams need to watch",
        paragraphs: [
          "With more happening server-side, teams need a clear mental model for revalidation, cache invalidation, and the places where client state still matters.",
          "Confusion here leads to stale UI and brittle flows."
        ]
      },
      {
        heading: "Best fit projects",
        paragraphs: [
          "Next.js 14 works especially well for content-rich websites, SaaS dashboards, and apps where SEO, server rendering, and integrated backend workflows matter.",
          "It is strongest when the product benefits from full-stack cohesion."
        ]
      }
    ]
  },
  {
    id: 9,
    slug: "building-real-time-applications-with-websockets",
    title: "Building Real-time Applications with WebSockets",
    excerpt: "Create interactive real-time features using WebSockets and Socket.io.",
    image: "/images/portfolio/portfolio_innovation_1.jpg",
    imageAlt: "Live data interface representing real-time WebSocket applications",
    category: "Web Development",
    author: "Sarah Johnson",
    date: "Dec 25, 2023",
    readTime: "8 min read",
    intro: "Real-time features can make a product feel dramatically more useful, but they also change your backend and frontend architecture in meaningful ways. Presence, messaging, live dashboards, and collaborative editing all demand careful state design.",
    keyTakeaways: [
      "Real-time UX should be purposeful, not just flashy.",
      "State synchronization needs explicit rules.",
      "Fallbacks and resilience matter as much as speed."
    ],
    sections: [
      {
        heading: "Where real-time matters",
        paragraphs: [
          "Real-time is worth the complexity when delays reduce product value. Chat, alerts, multiplayer behavior, and operational dashboards are common examples.",
          "If users do not benefit from immediate updates, polling may still be the simpler choice."
        ]
      },
      {
        heading: "Architecture considerations",
        paragraphs: [
          "The hard part is not opening a socket connection. It is managing room membership, reconnection, event ordering, and server-side fan-out in a reliable way.",
          "You also need clear ownership of truth between optimistic UI and confirmed server state."
        ]
      },
      {
        heading: "Delivering a stable experience",
        paragraphs: [
          "Users forgive slight delays more easily than confusing state. Build for reliability first, then optimize latency and interaction richness.",
          "A trustworthy real-time product feels calm, not chaotic."
        ]
      }
    ]
  },
  {
    id: 10,
    slug: "ios-development-with-swiftui-a-beginners-guide",
    title: "iOS Development with SwiftUI: A Beginner's Guide",
    excerpt: "Start building beautiful iOS applications with SwiftUI and modern Swift programming.",
    image: "/images/portfolio/portfolio_mobile_app_1.jpg",
    imageAlt: "iOS mobile application interface built with SwiftUI",
    category: "Mobile Development",
    author: "Michael Chen",
    date: "Dec 22, 2023",
    readTime: "12 min read",
    intro: "SwiftUI changed the way modern iOS apps are built by making UI composition faster and more declarative. It lowers the barrier to getting a clean interface on screen, but good app architecture still matters just as much as it did with UIKit.",
    keyTakeaways: [
      "SwiftUI speeds up interface development significantly.",
      "State management decisions shape long-term maintainability.",
      "Native iOS products still benefit from careful architecture planning."
    ],
    sections: [
      {
        heading: "Why SwiftUI is attractive",
        paragraphs: [
          "SwiftUI reduces boilerplate and makes iterative UI development much more approachable. Previews, reusable views, and data-driven rendering help teams move quickly.",
          "That speed is especially useful in MVPs and consumer product experiments."
        ]
      },
      {
        heading: "Where beginners struggle",
        paragraphs: [
          "Most early issues come from state management and navigation structure, not from drawing views. Teams need to think carefully about where state lives and how data flows through the app.",
          "Clean architecture becomes more important as the product grows."
        ]
      },
      {
        heading: "Good first steps",
        paragraphs: [
          "Start with a clear design system, shared view components, and an intentional data layer. Even small apps become easier to extend when these foundations are in place.",
          "SwiftUI feels best when simplicity is preserved."
        ]
      }
    ]
  },
  {
    id: 11,
    slug: "introduction-to-machine-learning-with-python",
    title: "Introduction to Machine Learning with Python",
    excerpt: "Get started with ML using scikit-learn, TensorFlow, and practical examples.",
    image: "/images/portfolio/grocito/ai-studio-craft.png",
    imageAlt: "Machine learning product interface with charts and AI workflows",
    category: "AI & Machine Learning",
    author: "Emily Davis",
    date: "Dec 20, 2023",
    readTime: "16 min read",
    intro: "Machine learning can feel intimidating because the field is broad, but most real-world projects start with modest goals: predicting a useful outcome, classifying inputs, or discovering patterns in historical data. Python remains the easiest path for most teams entering the space.",
    keyTakeaways: [
      "Problem framing matters more than model complexity at the start.",
      "Clean data pipelines drive better results than flashy models.",
      "You learn faster by shipping small experiments."
    ],
    sections: [
      {
        heading: "Start with a narrow business question",
        paragraphs: [
          "Good ML projects begin with a clear question and a measurable outcome. If the objective is vague, model selection and evaluation become vague too.",
          "Examples include churn prediction, lead scoring, and document classification."
        ]
      },
      {
        heading: "Why Python dominates",
        paragraphs: [
          "Python makes experimentation easy thanks to its library ecosystem and readable syntax. Teams can move from data exploration to model training quickly.",
          "That is why it remains the default choice for education and production prototyping alike."
        ]
      },
      {
        heading: "Build with iteration in mind",
        paragraphs: [
          "Start with baseline models, learn from errors, and improve the data pipeline before chasing model sophistication.",
          "Practical ML maturity comes from repeated feedback, not one big leap."
        ]
      }
    ]
  },
  {
    id: 12,
    slug: "blockchain-beyond-crypto-enterprise-use-cases",
    title: "Blockchain Beyond Crypto: Enterprise Use Cases",
    excerpt: "Explore how blockchain technology is transforming supply chain, healthcare, and finance.",
    image: "/images/portfolio/case-studies/cryptovault-before.jpg",
    imageAlt: "Enterprise blockchain platform screen for real-world business use cases",
    category: "Blockchain",
    author: "David Wilson",
    date: "Dec 18, 2023",
    readTime: "10 min read",
    intro: "Enterprise blockchain discussions are often derailed by hype, but there are still legitimate use cases where distributed trust, transparency, and auditability create value. The key is matching blockchain to the right operational problem.",
    keyTakeaways: [
      "Not every shared system needs blockchain.",
      "Auditability and multi-party coordination are the strongest use cases.",
      "Enterprise adoption works best when business incentives are aligned."
    ],
    sections: [
      {
        heading: "Where blockchain can help",
        paragraphs: [
          "Blockchain is most relevant in workflows involving multiple parties who do not fully trust one another but still need a shared record of activity.",
          "Supply chain visibility, asset provenance, and compliance tracking are common examples."
        ]
      },
      {
        heading: "What gets overestimated",
        paragraphs: [
          "Teams often overestimate the value of decentralization where a well-designed central system would be cheaper, faster, and simpler to govern.",
          "The question should always be whether distributed trust solves a real business problem."
        ]
      },
      {
        heading: "How enterprises should evaluate fit",
        paragraphs: [
          "Start with stakeholder alignment, process friction, and audit needs. Then evaluate whether blockchain improves the economics or confidence of the system enough to justify the complexity.",
          "Good enterprise architecture follows business reality, not trend momentum."
        ]
      }
    ]
  },
  {
    id: 13,
    slug: "how-much-does-a-website-cost",
    title: "How Much Does a Website Cost? A Straight Answer",
    excerpt: "Real price bands for brochure sites, marketing sites, web applications and ecommerce builds — and the five things that actually move the number.",
    image: "/images/services/services_web_design_2.jpg",
    imageAlt: "Designer reviewing website layouts and pricing on a desk",
    category: "Web Development",
    author: "Sarah Johnson",
    date: "Feb 04, 2026",
    readTime: "9 min read",
    featured: true,
    intro: "A website costs between roughly $1,500 and $150,000, and that range is so wide it is almost useless without context. What follows is the honest version: what each band actually buys, what pushes a project from one band to the next, and the questions to ask before you accept any quote.",
    keyTakeaways: [
      "Scope, not page count, drives price — one page with a booking engine costs more than twenty static pages.",
      "The cheapest quote is usually the one with the least discovery behind it, which is why it changes later.",
      "Ongoing cost is typically 15-20% of build cost per year, and it is rarely quoted upfront."
    ],
    sections: [
      {
        heading: "The four price bands, and what each one buys",
        paragraphs: [
          "Most work falls into four bands. A template-based brochure site runs roughly $1,500-$6,000 and buys you a professional presence with limited customisation. A custom marketing site sits around $8,000-$30,000 and buys original design, a content model your team can edit, and performance work.",
          "A custom web application starts near $30,000 and climbs from there, because you are paying for logic, data and state rather than pages. Ecommerce sits across both, depending on whether you are configuring a platform or building on top of one."
        ],
        bullets: [
          "Template brochure site: $1,500-$6,000",
          "Custom marketing site: $8,000-$30,000",
          "Custom web application: $30,000-$150,000+",
          "Ecommerce: $10,000-$100,000+ depending on platform and integrations"
        ]
      },
      {
        heading: "What actually moves the number",
        paragraphs: [
          "Page count is the weakest predictor of cost, and it is the one most quotes are built around. What genuinely drives price is the amount of custom logic, the number of third-party systems you have to integrate with, and how much content has to be migrated from an existing site.",
          "Design originality matters too. Adapting a proven layout is a fraction of the cost of a bespoke design system, and for many businesses the proven layout converts better anyway."
        ],
        bullets: [
          "Custom logic and workflows, not page count",
          "Integrations: payments, CRM, ERP, booking, auth",
          "Content migration volume and quality",
          "Design originality and how many unique templates you need",
          "Performance, accessibility and SEO requirements"
        ]
      },
      {
        heading: "The costs that appear after launch",
        paragraphs: [
          "Budget 15-20% of the build cost per year for hosting, maintenance, dependency updates and small changes. A site is software, and software that is never updated becomes a security liability within about eighteen months.",
          "Ask any agency for this number before you sign. If they cannot give you one, they have not thought about what happens after the invoice clears."
        ]
      },
      {
        heading: "How to compare quotes fairly",
        paragraphs: [
          "Two quotes are only comparable if they cover the same scope, and they rarely do. Put every quote against the same written list of deliverables, and treat any large gap as a scope difference until proven otherwise.",
          "Then ask who does the work, whether the price is fixed, and who owns the code at the end. Those three answers explain most of the variance between a cheap quote and an expensive one."
        ],
        bullets: [
          "Who writes the code — the people you met, or someone else?",
          "Is the price fixed, and what triggers a change order?",
          "Do you receive the repository and deployment pipeline?",
          "What is the response time for problems after launch?"
        ]
      }
    ],
    faq: [
      {
        question: "How much does a small business website cost?",
        answer: "A small business website typically costs between $1,500 and $6,000 for a template-based build, or $8,000 to $30,000 for a custom design with original layouts, an editable content model and performance work. The difference is customisation and content, not the number of pages."
      },
      {
        question: "Why do website quotes vary so much for the same project?",
        answer: "Because the quotes are rarely for the same project. Differences usually come from scope assumptions, who performs the work, whether the price is fixed or hourly, and whether performance, SEO and post-launch support are included. Comparing quotes against one written deliverables list removes most of the variance."
      },
      {
        question: "What is the ongoing cost of a website?",
        answer: "Expect 15 to 20 percent of the build cost per year, covering hosting, dependency and security updates, backups, monitoring and small content changes. Sites left unmaintained typically become a security risk within about eighteen months."
      },
      {
        question: "Is a cheaper website worth it?",
        answer: "Sometimes. A template site is the right answer for a business that needs credibility and contact details rather than a custom workflow. It becomes expensive only when it is bought for a job it cannot do, and has to be rebuilt within a year."
      }
    ]
  },
  {
    id: 14,
    slug: "how-to-choose-a-web-development-agency",
    title: "How to Choose a Web Development Agency: 9 Questions",
    excerpt: "The questions that separate an agency that will finish your project from one that will not — and the answers you should expect to hear.",
    image: "/images/portfolio/portfolio_website_design_2.jpg",
    imageAlt: "Team reviewing project plans and wireframes together",
    category: "Web Development",
    author: "David Wilson",
    date: "Feb 11, 2026",
    readTime: "8 min read",
    intro: "Most agency selection processes compare portfolios and prices, which are the two least predictive signals available. Portfolios show the best work an agency has ever done, and price only tells you what they think the project is worth. These nine questions surface how a team actually operates.",
    keyTakeaways: [
      "Ask who writes the code — a bench swap after signing is the single most common failure mode.",
      "Code ownership and documented handover matter more than any portfolio piece.",
      "An agency willing to tell you what they are not good at is usually telling the truth about the rest."
    ],
    sections: [
      {
        heading: "Questions about the people",
        paragraphs: [
          "The person who scopes your project is often not the person who builds it. That handover is where quality and context are lost, and it is rarely disclosed unless you ask directly.",
          "Ask for the names and seniority of the people who will do the work, and whether they are on other projects during your build."
        ],
        bullets: [
          "Who specifically will write this code?",
          "Will the people in this meeting be on the project?",
          "How many other projects will they run at the same time?"
        ]
      },
      {
        heading: "Questions about the commercials",
        paragraphs: [
          "Fixed price protects you from scope creep but only if the scope is written down. Time and materials is honest for genuinely uncertain work, and dangerous for work that should have been scoped properly.",
          "Either way, ask what triggers a change order, and what a typical change order costs on a project like yours."
        ],
        bullets: [
          "Is this fixed price, and what is explicitly out of scope?",
          "What triggers a change order?",
          "What does support cost after launch, and what response time comes with it?"
        ]
      },
      {
        heading: "Questions about what you are left with",
        paragraphs: [
          "The end of a project is where the difference between agencies becomes concrete. You should receive the repository, the deployment pipeline and enough documentation that another team could pick it up.",
          "If any of that is withheld, or the site is locked to a proprietary platform only that agency can edit, you are not buying a website. You are renting one."
        ],
        bullets: [
          "Do we own the code outright?",
          "Do we get the repository and deployment pipeline?",
          "Could another developer take this over without a rewrite?"
        ]
      },
      {
        heading: "The question that tells you the most",
        paragraphs: [
          "Ask what kind of project they are not the right fit for. An agency that answers honestly has a clear view of its own capability, and is unlikely to sell you something it cannot deliver.",
          "An agency that claims to be excellent at everything is describing a sales position, not an engineering team."
        ]
      }
    ],
    faq: [
      {
        question: "What should I ask a web development agency before hiring?",
        answer: "Ask who specifically will write the code, whether the price is fixed and what triggers a change order, whether you receive the repository and deployment pipeline, what support costs after launch, and what kind of project they are not a good fit for. The last question is the most revealing."
      },
      {
        question: "Should I hire a local agency or work remotely?",
        answer: "Location matters less than overlapping working hours and a named point of contact. Remote teams work well when there is a scheduled weekly call and a staging URL you can open at any time. Local matters most for projects requiring frequent in-person workshops."
      },
      {
        question: "How do I know if an agency's portfolio is real?",
        answer: "Ask which parts of each project they built, whether the site is still live, and whether you can speak to that client. Portfolios often include work where the agency contributed only design, or where the build has since been replaced."
      },
      {
        question: "Is a bigger agency safer than a small one?",
        answer: "Not necessarily. Larger agencies offer process and continuity but often assign junior staff to smaller accounts. Smaller teams give you senior attention but carry key-person risk. Ask about both directly rather than inferring from headcount."
      }
    ]
  },
  {
    id: 15,
    slug: "core-web-vitals-explained-and-how-to-fix-them",
    title: "Core Web Vitals Explained, and How to Actually Fix Them",
    excerpt: "What LCP, INP and CLS measure, the thresholds Google uses, and the specific fixes that move each metric.",
    image: "/images/portfolio/portfolio_innovation_1.jpg",
    imageAlt: "Performance metrics dashboard showing load time measurements",
    category: "Web Development",
    author: "Michael Chen",
    date: "Feb 18, 2026",
    readTime: "10 min read",
    intro: "Core Web Vitals are three metrics Google uses to measure real user experience: Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift. They are part of ranking, but the stronger argument for fixing them is that each one maps directly to something users find annoying.",
    keyTakeaways: [
      "LCP under 2.5s, INP under 200ms, CLS under 0.1 — those are the thresholds that count as good.",
      "Most LCP problems are image and font problems, not JavaScript problems.",
      "CLS is almost always missing dimensions on images, ads or injected banners."
    ],
    sections: [
      {
        heading: "Largest Contentful Paint: how fast the main thing appears",
        paragraphs: [
          "LCP measures when the largest element in the viewport finishes rendering — usually a hero image, a video poster or a large heading. Google considers under 2.5 seconds good and over 4 seconds poor.",
          "The common causes are predictable: an unoptimised hero image, a render-blocking stylesheet, a font that delays text painting, or a slow server response before anything can start."
        ],
        bullets: [
          "Serve the hero image in AVIF or WebP at the size it is displayed",
          "Preload the LCP image and mark it priority rather than lazy",
          "Use font-display: swap so text paints before the font arrives",
          "Cut server response time — LCP cannot beat time to first byte"
        ]
      },
      {
        heading: "Interaction to Next Paint: how fast the page responds",
        paragraphs: [
          "INP replaced First Input Delay in 2024. It measures the delay between a user interacting and the page visually responding, across the whole visit rather than just the first interaction. Under 200 milliseconds is good.",
          "Poor INP is almost always long JavaScript tasks blocking the main thread — oversized bundles, expensive re-renders, or third-party scripts doing work during interaction."
        ],
        bullets: [
          "Break long tasks up and yield to the main thread",
          "Ship less JavaScript: audit the bundle before optimising it",
          "Defer third-party scripts that are not needed for interaction",
          "Memoise expensive component work in React"
        ]
      },
      {
        heading: "Cumulative Layout Shift: how much the page moves",
        paragraphs: [
          "CLS measures unexpected movement of visible content. Under 0.1 is good. It is the easiest of the three to fix and the most often ignored.",
          "Almost every CLS problem is an element that arrives without reserved space: an image without width and height, a cookie banner injected at the top, a web font that changes text metrics, or an ad slot that expands."
        ],
        bullets: [
          "Always set width and height, or an aspect-ratio, on images and video",
          "Reserve space for banners and ad slots before they load",
          "Match fallback font metrics to the web font to avoid reflow",
          "Never insert content above existing content after first paint"
        ]
      },
      {
        heading: "Measure real users, not just your laptop",
        paragraphs: [
          "Lighthouse runs a simulated load on your machine. Core Web Vitals as Google uses them come from the Chrome User Experience Report — real visits, on real devices, mostly on worse connections than yours.",
          "Use lab tools to debug and field data to decide. A site can score well in Lighthouse and still fail Core Web Vitals for actual users."
        ]
      }
    ],
    faq: [
      {
        question: "What are Core Web Vitals?",
        answer: "Core Web Vitals are three metrics Google uses to measure user experience: Largest Contentful Paint (loading, good under 2.5 seconds), Interaction to Next Paint (responsiveness, good under 200 milliseconds), and Cumulative Layout Shift (visual stability, good under 0.1)."
      },
      {
        question: "Do Core Web Vitals affect SEO rankings?",
        answer: "Yes, they are a confirmed ranking signal, but a comparatively weak one. Relevance and content quality matter more. Core Web Vitals act as a tiebreaker between pages of similar quality, and they affect conversion regardless of ranking."
      },
      {
        question: "What is a good LCP score?",
        answer: "Under 2.5 seconds is good, 2.5 to 4 seconds needs improvement, and over 4 seconds is poor. The measurement is taken at the 75th percentile of real page loads, so it must be fast for most visitors, not just fast on average."
      },
      {
        question: "Why does my site pass Lighthouse but fail Core Web Vitals?",
        answer: "Lighthouse is a simulated lab test on your machine and connection. Google ranks using field data from the Chrome User Experience Report, collected from real visits on real devices and slower networks. Lab tools are for debugging; field data decides."
      }
    ]
  },
  {
    id: 16,
    slug: "nextjs-vs-react-which-should-you-choose",
    title: "Next.js vs React: Which Should You Choose?",
    excerpt: "They are not competitors — one is a library, the other a framework built on it. Here is when the framework earns its overhead.",
    image: "/images/services/services_software_development_0.jpg",
    imageAlt: "Developer comparing framework architecture on two screens",
    category: "Web Development",
    author: "John Smith",
    date: "Feb 25, 2026",
    readTime: "7 min read",
    intro: "The question is slightly wrong, which is why it is asked so often. React is a library for building user interfaces. Next.js is a framework built on React that adds routing, rendering strategies, and a build pipeline. The real question is whether you need those things, and for most public-facing products the answer is yes.",
    keyTakeaways: [
      "Choose Next.js when the pages need to be found by search engines or shared as links.",
      "Choose plain React when the product lives behind a login and SEO is irrelevant.",
      "The cost of adding a framework later is far higher than the cost of starting with one."
    ],
    sections: [
      {
        heading: "What Next.js adds to React",
        paragraphs: [
          "React on its own gives you components and state. Everything else — how a URL maps to a screen, how HTML gets to the browser, how images and fonts are optimised — is left to you or to a collection of libraries you assemble yourself.",
          "Next.js makes those decisions. Its main contribution is server rendering: the browser receives finished HTML rather than an empty shell that JavaScript has to fill in."
        ],
        bullets: [
          "File-based routing instead of a routing library",
          "Server rendering and static generation out of the box",
          "Image, font and script optimisation built in",
          "API routes so a small backend does not need a separate service"
        ]
      },
      {
        heading: "When plain React is the right answer",
        paragraphs: [
          "If the product sits entirely behind authentication — an internal dashboard, an admin tool, a data console — server rendering buys you very little. Nobody is sharing those URLs and no crawler will ever see them.",
          "In that case a React single-page app with Vite is simpler, faster to build, and easier to deploy as static files."
        ]
      },
      {
        heading: "When Next.js earns its keep",
        paragraphs: [
          "For anything public — marketing sites, ecommerce, blogs, documentation, SaaS landing pages — server rendering is close to mandatory. A crawler that receives an empty shell indexes an empty page, and link previews on social platforms will be blank.",
          "This is not theoretical. It is the single most common reason we are asked to rebuild a site that was launched as a client-side app and never ranked."
        ]
      },
      {
        heading: "The migration question",
        paragraphs: [
          "Moving a mature React app to Next.js is possible but rarely cheap: routing, data fetching and any browser-only assumptions all have to be revisited. Starting on Next.js and never needing the server rendering costs you very little.",
          "That asymmetry is the practical argument. The cost of being wrong in one direction is a slightly heavier toolchain; in the other, it is a rewrite."
        ]
      }
    ],
    faq: [
      {
        question: "Is Next.js better than React?",
        answer: "They are not alternatives. Next.js is a framework built on React that adds routing, server rendering and build optimisation. The question is whether you need those features — for public, SEO-dependent sites you almost always do; for apps behind a login, often not."
      },
      {
        question: "Do I need Next.js for SEO?",
        answer: "You need server-rendered HTML for reliable SEO, and Next.js is the most common way to get it with React. A client-rendered React app serves crawlers an empty shell, which is the most frequent cause of a well-built site failing to rank."
      },
      {
        question: "Can I migrate an existing React app to Next.js?",
        answer: "Yes, but budget properly for it. Routing, data fetching and any code assuming a browser environment all need revisiting. Migration is usually worth it when SEO or first-load performance has become a business problem, and rarely worth it otherwise."
      },
      {
        question: "Is Next.js harder to learn than React?",
        answer: "There is more to learn, because it makes decisions React leaves open — rendering strategies, server and client components, caching. Developers already comfortable with React are typically productive in Next.js within a week or two."
      }
    ]
  },
  {
    id: 17,
    slug: "how-much-does-an-ai-chatbot-cost-to-build",
    title: "How Much Does an AI Chatbot Cost to Build?",
    excerpt: "Build costs, running costs and the hidden expense nobody quotes for — evaluation. With real token maths.",
    image: "/images/portfolio/grocito/ai-studio-craft.png",
    imageAlt: "AI assistant interface responding to a customer question",
    category: "AI & Machine Learning",
    author: "Emily Davis",
    date: "Mar 04, 2026",
    readTime: "9 min read",
    intro: "An AI chatbot costs between roughly $5,000 and $80,000 to build, and between a few dollars and several thousand a month to run. The build number depends almost entirely on whether it answers from your own content, and the running number on how many people use it and how much context each answer needs.",
    keyTakeaways: [
      "Retrieval over your own documents is the feature that separates a $5,000 bot from a $40,000 one.",
      "Running cost scales with tokens, and context length drives tokens more than message count.",
      "Budget for evaluation — an assistant nobody measures will confidently give wrong answers."
    ],
    sections: [
      {
        heading: "The three tiers of chatbot",
        paragraphs: [
          "A scripted assistant follows decision trees you define. It never invents an answer, costs $3,000-$8,000, and is genuinely the right choice for narrow tasks like booking or order status.",
          "A retrieval-augmented assistant answers from your own documents. This is what most businesses actually want, and it costs $15,000-$50,000 because the work is in the data pipeline, not the prompt.",
          "A fully custom agent that takes actions in your systems starts around $50,000, because every action needs permissions, auditing and a failure path."
        ],
        bullets: [
          "Scripted flows: $3,000-$8,000",
          "Retrieval over your content: $15,000-$50,000",
          "Agent with tool access: $50,000+"
        ]
      },
      {
        heading: "What running it actually costs",
        paragraphs: [
          "Model providers charge per token, roughly four characters each, for both input and output. A support answer that retrieves three document chunks might use 2,000 input tokens and 300 output tokens.",
          "At current mid-tier pricing that is a fraction of a cent per answer. Ten thousand conversations a month lands in the tens of dollars, not the thousands — until you add long context windows or an expensive reasoning model to every request."
        ],
        bullets: [
          "Retrieval keeps prompts short, which keeps cost down",
          "Vector database hosting: $0-$100/month at small scale",
          "Use a cheaper model for routing and an expensive one only when needed"
        ]
      },
      {
        heading: "The cost nobody quotes: evaluation",
        paragraphs: [
          "The difference between a chatbot that helps and one that quietly damages trust is measurement. You need a test set of real questions with known-good answers, run against every prompt or model change.",
          "Teams that skip this find out about hallucinated answers from customers. Budget 10-15% of the build for evaluation and expect it to be ongoing, not a one-off."
        ]
      },
      {
        heading: "How to keep the number down",
        paragraphs: [
          "Narrow the scope. A bot that answers questions about one product line, well, is more useful and dramatically cheaper than one that attempts everything and is unreliable at all of it.",
          "Start with retrieval over your existing documentation before considering fine-tuning. Fine-tuning is expensive, slow to iterate on, and rarely the right first answer to a knowledge problem."
        ]
      }
    ],
    faq: [
      {
        question: "How much does it cost to build an AI chatbot?",
        answer: "A scripted chatbot costs roughly $3,000 to $8,000, a retrieval-augmented assistant that answers from your own documents costs $15,000 to $50,000, and an agent that takes actions in your systems starts around $50,000. The main cost driver is whether it must answer from your content."
      },
      {
        question: "What are the monthly running costs of an AI chatbot?",
        answer: "Running costs are driven by token usage. A typical retrieval-based answer uses around 2,000 input and 300 output tokens, costing a fraction of a cent. Ten thousand conversations a month typically costs tens of dollars in model usage, plus hosting for the vector database."
      },
      {
        question: "Should I fine-tune a model or use retrieval?",
        answer: "Use retrieval first. Fine-tuning teaches a model style and format, not facts, and it is expensive and slow to update. If the goal is answering questions from your documentation, retrieval-augmented generation is cheaper, more accurate and far easier to keep current."
      },
      {
        question: "How do I stop an AI chatbot giving wrong answers?",
        answer: "Ground it in your own content through retrieval, instruct it to say it does not know rather than guess, cite the source document in the answer, and maintain an evaluation set of real questions with known-good answers that you re-run on every change."
      }
    ]
  },
  {
    id: 18,
    slug: "answer-engine-optimization-for-ai-search",
    title: "Answer Engine Optimization: Getting Cited by AI Search",
    excerpt: "AI overviews and assistants answer without sending a click. Here is how to be the source they quote.",
    image: "/images/portfolio/portfolio_innovation_0.jpg",
    imageAlt: "Search results page showing an AI-generated answer summary",
    category: "AI & Machine Learning",
    author: "Lisa Anderson",
    date: "Mar 11, 2026",
    readTime: "8 min read",
    featured: true,
    intro: "A growing share of searches now end without a click, because an AI overview or assistant answered the question directly. Answer Engine Optimization is the practice of structuring content so that when an answer is assembled, your page is the source it draws from and names.",
    keyTakeaways: [
      "Answer the question in the first two sentences — extraction rewards directness, not build-up.",
      "Structured data is how a machine confirms what your page claims to be.",
      "Specific, checkable facts get quoted; marketing adjectives do not."
    ],
    sections: [
      {
        heading: "Why this is different from classic SEO",
        paragraphs: [
          "Traditional SEO competes for a position in a list of links. Answer engines do something else: they read several sources, synthesise one answer, and cite a few of them. You are competing to be quoted, not to be ranked.",
          "That changes what good content looks like. A page that buries its answer under six paragraphs of context ranks fine and gets extracted badly."
        ]
      },
      {
        heading: "Write the answer first",
        paragraphs: [
          "Lead every section with a complete, self-contained answer, then explain. If a paragraph were lifted out of the page entirely, it should still make sense and still be correct.",
          "Use the question as the heading, in the words people actually use. 'How much does a website cost?' outperforms 'Understanding our pricing philosophy' by a wide margin, because the first matches a query and the second matches nothing."
        ],
        bullets: [
          "Question-shaped headings that match real queries",
          "A direct answer in the first one or two sentences",
          "Self-contained paragraphs that survive being quoted alone",
          "Specific numbers, ranges and dates rather than vague claims"
        ]
      },
      {
        heading: "Give machines something to verify",
        paragraphs: [
          "Structured data does not make content better, but it removes ambiguity about what the content is. FAQPage markup on a genuine question-and-answer block, Article markup with a real author and date, and Organization markup that matches your other listings all help a machine trust the page.",
          "Keep the markup honest. Schema that describes content the page does not contain is a manual action waiting to happen."
        ],
        bullets: [
          "FAQPage for real question-and-answer sections",
          "Article with author, publish date and update date",
          "Organization and LocalBusiness, consistent across the web",
          "Breadcrumbs so the page's place in the site is explicit"
        ]
      },
      {
        heading: "Be quotable and be current",
        paragraphs: [
          "Answer engines favour sources that are specific and checkable. 'Under 2.5 seconds' is quotable. 'Fast loading times' is not. Original data from your own work is the strongest material you have, because nobody else can supply it.",
          "Freshness also carries real weight for anything with a year in the query. A page updated this quarter beats an identical page from three years ago, so keep a visible updated date and make it true."
        ]
      }
    ],
    faq: [
      {
        question: "What is Answer Engine Optimization?",
        answer: "Answer Engine Optimization is the practice of structuring content so AI systems — such as Google's AI overviews, ChatGPT and Perplexity — can extract and cite it when generating an answer. It emphasises direct answers, question-shaped headings, structured data and specific verifiable facts."
      },
      {
        question: "How is AEO different from SEO?",
        answer: "SEO competes for a position in a list of links. AEO competes to be the source quoted inside a generated answer. Traditional ranking factors still apply, but extraction favours pages that answer directly, in self-contained passages, with specific facts rather than general claims."
      },
      {
        question: "Does structured data help with AI search?",
        answer: "Yes. Structured data removes ambiguity about what a page contains and who published it. FAQPage, Article and Organization markup all help answer engines identify quotable content and assess whether the source is trustworthy. The markup must accurately describe the visible content."
      },
      {
        question: "Will AI search reduce my website traffic?",
        answer: "For simple informational queries, yes — those answers are increasingly given without a click. Traffic that remains tends to convert better, because it comes from people who wanted more than a fact. The response is to be the cited source and to invest in content answering questions a summary cannot resolve."
      }
    ]
  },
  {
    id: 19,
    slug: "how-much-does-a-mobile-app-cost-to-build",
    title: "How Much Does a Mobile App Cost to Build?",
    excerpt: "Price bands for MVPs through to complex apps, plus the native versus cross-platform decision and what it really saves.",
    image: "/images/portfolio/portfolio_mobile_app_1.jpg",
    imageAlt: "Mobile app screens laid out during a design review",
    category: "Mobile Development",
    author: "Alex Turner",
    date: "Mar 18, 2026",
    readTime: "9 min read",
    intro: "A mobile app costs roughly $20,000 for a focused MVP, $60,000 to $150,000 for a full product, and beyond that for anything with heavy real-time or hardware requirements. The largest single decision affecting that number is native versus cross-platform, and it saves less than most people expect.",
    keyTakeaways: [
      "Cross-platform saves around 30-40% versus two native builds, not the 50% often claimed.",
      "The backend is frequently half the cost and is routinely left out of app quotes.",
      "App store review, device testing and post-launch fixes are real line items, not rounding errors."
    ],
    sections: [
      {
        heading: "What each band buys",
        paragraphs: [
          "An MVP at $20,000-$40,000 covers a focused feature set, standard authentication, and a simple backend — enough to put in front of real users and learn something.",
          "A full product at $60,000-$150,000 adds payments, notifications, offline behaviour, analytics, admin tooling and the polish users expect from an app they pay for."
        ],
        bullets: [
          "MVP with core flows: $20,000-$40,000",
          "Full consumer or B2B product: $60,000-$150,000",
          "Real-time, streaming or hardware integration: $150,000+"
        ]
      },
      {
        heading: "Native or cross-platform",
        paragraphs: [
          "React Native and Flutter let one team ship both platforms from largely shared code. The saving is real but usually 30-40%, not half, because platform-specific work, testing and store submission do not disappear.",
          "Native is worth the premium when you depend heavily on platform capabilities — sustained background processing, complex camera or sensor work, or the last few percent of interface fidelity."
        ]
      },
      {
        heading: "The backend nobody quotes",
        paragraphs: [
          "An app is a client. Unless it is a calculator, it needs an API, a database, authentication, file storage and push infrastructure behind it, and that can be half the total cost.",
          "When an app quote looks surprisingly low, this is almost always what is missing. Ask explicitly whether the backend is included."
        ],
        bullets: [
          "API and database design",
          "Authentication and account management",
          "Push notification infrastructure",
          "Admin tooling for your own team"
        ]
      },
      {
        heading: "Costs after launch",
        paragraphs: [
          "Apps decay faster than websites. iOS and Android ship annual releases that deprecate APIs, and stores enforce target SDK requirements, so an app left untouched for two years often will not build, let alone run.",
          "Budget 20% of build cost per year just to stand still, before any new features."
        ]
      }
    ],
    faq: [
      {
        question: "How much does it cost to build a mobile app?",
        answer: "A focused MVP costs roughly $20,000 to $40,000, a full consumer or B2B product $60,000 to $150,000, and apps with real-time, streaming or hardware requirements more than that. The backend is frequently half the total and is often excluded from quotes."
      },
      {
        question: "Is React Native cheaper than native development?",
        answer: "Yes, typically 30 to 40 percent cheaper than building separate iOS and Android apps — less than the 50 percent often claimed, because platform-specific work, device testing and store submission still happen twice. Native remains worth the premium for heavy sensor, background or graphics work."
      },
      {
        question: "How long does it take to build a mobile app?",
        answer: "An MVP typically takes 10 to 18 weeks including design, development, testing and store submission. A full product usually runs 5 to 9 months. App Store review adds days rather than weeks, but rejections can add a cycle."
      },
      {
        question: "What are the ongoing costs of a mobile app?",
        answer: "Budget around 20 percent of the build cost per year. This covers OS updates that deprecate APIs, store target-SDK requirements, dependency and security updates, backend hosting, and crash fixing — before any new feature work."
      }
    ]
  },
  {
    id: 20,
    slug: "technical-seo-checklist-for-modern-websites",
    title: "Technical SEO Checklist for Modern Websites",
    excerpt: "The technical work that decides whether good content ever gets seen — crawlability, rendering, structure and speed.",
    image: "/images/services/services_web_design_1.jpg",
    imageAlt: "Search console data and site structure diagram on screen",
    category: "Web Development",
    author: "Sarah Johnson",
    date: "Mar 25, 2026",
    readTime: "10 min read",
    intro: "Technical SEO does not make content rank. It makes content eligible to rank. Every item below is something that, when broken, stops otherwise good pages from performing — and most of them are invisible in a browser, which is why they survive for years unnoticed.",
    keyTakeaways: [
      "If a page's content only appears after JavaScript runs, treat it as at risk.",
      "One canonical URL per piece of content — trailing slashes and parameters quietly split ranking signals.",
      "Internal links are the strongest lever most sites never pull."
    ],
    sections: [
      {
        heading: "Crawlability and indexing",
        paragraphs: [
          "Start by confirming search engines can reach and are allowed to index your pages. A single stray disallow rule or a leftover noindex from a staging deploy can remove a section of the site from search entirely.",
          "Check the rendered HTML rather than the source you wrote. What matters is what a crawler receives."
        ],
        bullets: [
          "robots.txt allows the pages you want indexed",
          "No stray noindex tags left from staging",
          "XML sitemap lists live, canonical, indexable URLs only",
          "Important content is present in server-rendered HTML"
        ]
      },
      {
        heading: "One URL per piece of content",
        paragraphs: [
          "Duplicate URLs split ranking signals between copies of the same page. The usual culprits are trailing slash variants, http and https, www and non-www, and query parameters from campaigns and filters.",
          "Pick one canonical form, redirect the rest with 301s, and declare it with a canonical tag on every page."
        ],
        bullets: [
          "301 redirect http to https and pick one of www or non-www",
          "Self-referencing canonical tags on every indexable page",
          "Consistent trailing-slash handling",
          "Parameter handling for filters, sorting and tracking"
        ]
      },
      {
        heading: "Structure and internal linking",
        paragraphs: [
          "Internal links tell search engines which pages matter and how they relate. A page reachable only from the sitemap is a page you have told nobody to care about.",
          "Keep important pages within three clicks of the homepage, use descriptive anchor text instead of 'click here', and make sure the navigation is real links in the HTML rather than JavaScript-driven menus that mount only on interaction."
        ],
        bullets: [
          "Important pages within three clicks of the homepage",
          "Descriptive anchor text",
          "Navigation links present in server-rendered HTML",
          "Breadcrumbs, marked up with structured data"
        ]
      },
      {
        heading: "Metadata, structured data and speed",
        paragraphs: [
          "Every indexable page needs a unique title and meta description, one h1, and a heading hierarchy that reflects the content rather than the styling. Structured data should describe what is actually on the page.",
          "Then Core Web Vitals: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1, measured against real users rather than a lab test on your machine."
        ],
        bullets: [
          "Unique titles and descriptions, no duplicates across the site",
          "One h1 per page, headings in a logical order",
          "Structured data that matches visible content",
          "Core Web Vitals passing on field data"
        ]
      }
    ],
    faq: [
      {
        question: "What is technical SEO?",
        answer: "Technical SEO is the work that lets search engines crawl, render, understand and index a site: robots and sitemap configuration, canonical URLs, server-rendered content, site structure, internal linking, structured data and page performance. It makes content eligible to rank rather than making it rank."
      },
      {
        question: "How often should I run a technical SEO audit?",
        answer: "Quarterly for most sites, and after any redesign, replatform or major release. Technical problems are usually introduced by deployments rather than appearing gradually, so auditing after change is more valuable than auditing on a fixed calendar."
      },
      {
        question: "Does JavaScript hurt SEO?",
        answer: "JavaScript itself is fine; depending on it to render primary content is the risk. Google can execute JavaScript but does so in a second pass that may be delayed, and other crawlers often do not. Serve important content in the initial HTML through server rendering or static generation."
      },
      {
        question: "What is the most common technical SEO mistake?",
        answer: "Duplicate URLs serving the same content — trailing slash variants, http and https, www and non-www, and parameter versions — which split ranking signals between copies. The fix is one canonical form, 301 redirects for everything else, and self-referencing canonical tags."
      }
    ]
  },
];

export const BLOG_CATEGORIES = ["All", ...Array.from(new Set(BLOG_POSTS.map((post) => post.category)))];

export function getBlogBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
