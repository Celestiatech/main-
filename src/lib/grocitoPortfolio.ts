export type GrocitoPortfolioItem = {
  title: string;
  url: string;
  image: string;
  category: "web" | "mobile" | "game" | "blockchain" | "ai" | "design";
};

export type CaseStudy = {
  title: string;
  subtitle: string;
  summary: string;
  category: "mobile" | "web" | "game" | "blockchain" | "ai" | "design" | "nocode";
  panelImage: string;
  categoryBadge: string;
  accent: string;
  url: string;
  ctaLabel: string;
};

export const GROCITO_PORTFOLIO_ITEMS: GrocitoPortfolioItem[] = [
  { title: "Troz Nutrition", url: "http://troznutrition.com/", image: "/images/portfolio/grocito/troz-nutrition.png", category: "web" },
  { title: "Urgent Bazaar", url: "https://urgentbazaar.com/", image: "/images/portfolio/grocito/urgent-bazaar.png", category: "web" },
  { title: "Avantika Bakers", url: "https://avantikabakers.com/", image: "/images/portfolio/grocito/avantika-bakers.png", category: "web" },
  { title: "Gulliver Travel", url: "http://gullivertravels.in/", image: "/images/portfolio/grocito/gulliver-travel.svg", category: "mobile" },
  { title: "Step to Renew", url: "https://steptorenew.com/", image: "/images/portfolio/grocito/step-to-renew.png", category: "mobile" },
  { title: "ATC Mines & Minerals", url: "https://atcminesandminerals.com/", image: "/images/portfolio/grocito/atc-mines-minerals.png", category: "web" },
  { title: "AI Studio & Craft", url: "https://aistudiocraft.grocito.in/", image: "/images/portfolio/grocito/ai-studio-craft.png", category: "ai" },
  { title: "Fresh Cake and Bake", url: "https://freshcakeandbake.in/", image: "/images/portfolio/grocito/fresh-cake-and-bake.png", category: "web" },
  { title: "Mahakashaya", url: "https://mahakashaya.com/", image: "/images/portfolio/grocito/mahakashaya.png", category: "web" },
  { title: "Bdot Printed Clothes", url: "https://bdotprintedcloths.in/", image: "/images/portfolio/grocito/bdot-printed-clothes.png", category: "web" },
  { title: "Vindrobe", url: "https://vindrobe.in/", image: "/images/portfolio/grocito/vindrobe.png", category: "web" },
  { title: "Innovation Energy", url: "https://innovationenergy.in/", image: "/images/portfolio/grocito/innovation-energy.png", category: "web" },
  { title: "Bank of Archery", url: "https://bankofarchery.com/", image: "/images/portfolio/grocito/bank-of-archery.png", category: "game" },
  { title: "Sparible", url: "https://sparible.com/", image: "/images/portfolio/grocito/sparible.png", category: "blockchain" },
  { title: "It's World of Stones", url: "https://itsworldofstones.com/", image: "/images/portfolio/grocito/it-s-world-of-stones.png", category: "web" },
  { title: "Gruha Lankar", url: "https://gruhalankar.in/", image: "/images/portfolio/grocito/gruha-lankar.png", category: "web" },
  { title: "Ship Martz", url: "https://shipmartz.in/", image: "/images/portfolio/grocito/ship-martz.png", category: "web" },
  { title: "Wealth Destine", url: "https://wealthdestine.com/", image: "/images/portfolio/grocito/wealth-destine.png", category: "blockchain" },
  { title: "Joy Journ", url: "https://joyjourn.com/", image: "/images/portfolio/grocito/joy-journ.png", category: "web" },
  { title: "Vaidik Hariyali", url: "https://vaidikhariyali.in/", image: "/images/portfolio/grocito/vaidik-hariyali.png", category: "ai" },
  { title: "Market Apna", url: "https://marketapna.in/", image: "/images/portfolio/grocito/market-apna.png", category: "web" },
  { title: "Agrika", url: "https://agrika.shop/", image: "/images/portfolio/grocito/agrika.png", category: "web" },
  { title: "Achhasa Gift", url: "https://achhasagift.in/", image: "/images/portfolio/grocito/achhasa-gift.png", category: "web" },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Mobile App Development",
    subtitle: "Native-feeling mobile products designed for speed, scale, and retention.",
    summary: "From product strategy to polished interfaces, we build mobile experiences that feel refined in hand and practical in business use.",
    category: "mobile",
    panelImage: "/images/portfolio/case-studies/chicmic/mobile-app-1.png",
    categoryBadge: "MOBILE",
    accent: "iOS • Android • Product UX",
    url: "https://www.chicmicstudios.in/app-portfolio/",
    ctaLabel: "Explore Mobile Work",
  },
  {
    title: "Web Development",
    subtitle: "High-performance websites and platforms built for modern brands.",
    summary: "We create polished web experiences with stronger storytelling, smoother user flow, and a structure that supports long-term growth.",
    category: "web",
    panelImage: "/images/portfolio/case-studies/chicmic/web-dev-1.png",
    categoryBadge: "WEB",
    accent: "React • Next.js • Commerce",
    url: "https://www.chicmicstudios.in/web-portfolio/",
    ctaLabel: "Explore Web Work",
  },
  {
    title: "Game Development",
    subtitle: "Immersive gameplay systems backed by robust production pipelines.",
    summary: "From concept design to multiplayer mechanics, we help teams ship game experiences that are visually strong and deeply engaging.",
    category: "game",
    panelImage: "/images/portfolio/case-studies/chicmic/game-dev-1.png",
    categoryBadge: "GAME",
    accent: "Unity • Unreal • Multiplayer",
    url: "https://www.chicmicstudios.in/game-portfolio/",
    ctaLabel: "Explore Game Work",
  },
  {
    title: "Design Services",
    subtitle: "Brand, product, and UI systems crafted for clarity and conversion.",
    summary: "We shape interfaces and visual systems that feel premium, improve comprehension, and give digital products a sharper market presence.",
    category: "design",
    panelImage: "/images/portfolio/case-studies/chicmic/design-ser-1.png",
    categoryBadge: "DESIGN",
    accent: "UI/UX • Branding • Product Design",
    url: "https://www.chicmicstudios.in/design-portfolio/",
    ctaLabel: "Explore Design Work",
  },
  {
    title: "Blockchain Development",
    subtitle: "Web3 products built around trust, clarity, and technical strength.",
    summary: "We turn complex blockchain workflows into cleaner user experiences for wallets, tokens, marketplaces, and DeFi-facing platforms.",
    category: "blockchain",
    panelImage: "/images/portfolio/case-studies/chicmic/blockchain-dev-1.png",
    categoryBadge: "BLOCKCHAIN",
    accent: "Solidity • Web3 • DApps",
    url: "https://www.chicmicstudios.in/blockchain/",
    ctaLabel: "Explore Blockchain Work",
  },
  {
    title: "AI Development",
    subtitle: "Applied AI experiences that feel useful, usable, and production-ready.",
    summary: "We design AI-powered interfaces and systems that help automate workflows, surface better insights, and improve business efficiency.",
    category: "ai",
    panelImage: "/images/portfolio/case-studies/chicmic/ai-dev-1.png",
    categoryBadge: "AI",
    accent: "LLMs • Automation • NLP",
    url: "https://www.chicmicstudios.in/ai-development/",
    ctaLabel: "Explore AI Work",
  },
  {
    title: "No-Code / Low-Code",
    subtitle: "Faster validation and launch paths without sacrificing product quality.",
    summary: "For the right product shape, we build low-code systems that reduce time to market while keeping the experience polished and scalable.",
    category: "nocode",
    panelImage: "/images/portfolio/case-studies/chicmic/no-code-low-code-03.png",
    categoryBadge: "NO-CODE",
    accent: "Rapid Launch • Automation • MVP",
    url: "/contact?project=no-code-low-code",
    ctaLabel: "Plan a Similar Build",
  },
];
