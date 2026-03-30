export type ImpactMetric = {
  label: string;
  value: string;
};

export type GrocitoPortfolioItem = {
  title: string;
  url: string;
  image: string;
  category: "web" | "mobile" | "game" | "blockchain" | "ai" | "design";
};

export type CaseStudy = {
  title: string;
  subtitle: string;
  category: "mobile" | "web" | "game" | "blockchain" | "ai" | "design";
  beforeImage: string;
  afterImage: string;
  categoryBadge: string;
  mainTech: string;
  problem: string;
  solution: string;
  impacts: ImpactMetric[];
  techStack: string[];
  url: string;
};

export const GROCITO_PORTFOLIO_ITEMS: GrocitoPortfolioItem[] = [
  { title: "Troz Nutrition", url: "http://troznutrition.com/", image: "/images/portfolio/grocito/troz-nutrition.png", category: "web" },
  { title: "Mittal Garments", url: "https://mittalgarments.com", image: "/images/portfolio/grocito/mittal-garments.png", category: "web" },
  { title: "A Bun in The Oven", url: "https://mohinigrandmothersrecipe.in/", image: "/images/portfolio/grocito/a-bun-in-the-oven.png", category: "web" },
  { title: "The Cloud Creamery", url: "https://thecloudcreamery.com", image: "/images/portfolio/grocito/the-cloud-creamery.png", category: "web" },
  { title: "Minakshia Ayurveda", url: "https://minakshiaayurveda.com/", image: "/images/portfolio/grocito/minakshia-ayurveda.png", category: "web" },
  { title: "Shyam Decoration", url: "https://shyamdecoration.in/", image: "/images/portfolio/grocito/shyam-decoration.png", category: "web" },
  { title: "Student Book House", url: "https://studentbookhouse.com/", image: "/images/portfolio/grocito/student-book-house.png", category: "web" },
  { title: "Urgent Bazaar", url: "https://urgentbazaar.com/", image: "/images/portfolio/grocito/urgent-bazaar.png", category: "web" },
  { title: "Avantika Bakers", url: "https://avantikabakers.com/", image: "/images/portfolio/grocito/avantika-bakers.png", category: "web" },
  { title: "Gulliver Travel", url: "http://gullivertravels.in/", image: "/images/portfolio/grocito/gulliver-travel.svg", category: "mobile" },
  { title: "Step to Renew", url: "https://steptorenew.com/", image: "/images/portfolio/grocito/step-to-renew.png", category: "mobile" },
  { title: "Ayush Mobiles", url: "https://ayushmobiles.com", image: "/images/portfolio/grocito/ayush-mobiles.png", category: "mobile" },
  { title: "ATC Mines & Minerals", url: "https://atcminesandminerals.com/", image: "/images/portfolio/grocito/atc-mines-minerals.png", category: "web" },
  { title: "AI Studio & Craft", url: "https://aistudiocraft.grocito.in/", image: "/images/portfolio/grocito/ai-studio-craft.png", category: "ai" },
  { title: "Fresh Cake and Bake", url: "https://freshcakeandbake.in/", image: "/images/portfolio/grocito/fresh-cake-and-bake.png", category: "web" },
  { title: "Mahakashaya", url: "https://mahakashaya.com/", image: "/images/portfolio/grocito/mahakashaya.png", category: "web" },
  { title: "Bdot Printed Clothes", url: "https://bdotprintedcloths.in/", image: "/images/portfolio/grocito/bdot-printed-clothes.png", category: "web" },
  { title: "Vindrobe", url: "https://vindrobe.in/", image: "/images/portfolio/grocito/vindrobe.png", category: "web" },
  { title: "Blumbz", url: "https://blumbz.com/", image: "/images/portfolio/grocito/blumbz.png", category: "game" },
  { title: "Innovation Energy", url: "https://innovationenergy.in/", image: "/images/portfolio/grocito/innovation-energy.png", category: "web" },
  { title: "Krishi Kanan", url: "https://krishikananindia.in/", image: "/images/portfolio/grocito/krishi-kanan.png", category: "web" },
  { title: "Bank of Archery", url: "https://bankofarchery.com/", image: "/images/portfolio/grocito/bank-of-archery.png", category: "game" },
  { title: "Sparible", url: "https://sparible.com/", image: "/images/portfolio/grocito/sparible.png", category: "blockchain" },
  { title: "It's World of Stones", url: "https://itsworldofstones.com/", image: "/images/portfolio/grocito/it-s-world-of-stones.png", category: "web" },
  { title: "Gruha Lankar", url: "https://gruhalankar.in/", image: "/images/portfolio/grocito/gruha-lankar.png", category: "web" },
  { title: "Athlivia", url: "https://athlivia.com/", image: "/images/portfolio/grocito/athlivia.png", category: "mobile" },
  { title: "Ship Martz", url: "https://shipmartz.in/", image: "/images/portfolio/grocito/ship-martz.png", category: "web" },
  { title: "Wealth Destine", url: "https://wealthdestine.com/", image: "/images/portfolio/grocito/wealth-destine.png", category: "blockchain" },
  { title: "Gargi Arya", url: "https://gargiarya.com/", image: "/images/portfolio/grocito/gargi-arya.png", category: "web" },
  { title: "Joy Journ", url: "https://joyjourn.com/", image: "/images/portfolio/grocito/joy-journ.png", category: "web" },
  { title: "Kartoon", url: "https://kartoon.in/", image: "/images/portfolio/grocito/kartoon.png", category: "game" },
  { title: "Vaidik Hariyali", url: "https://vaidikhariyali.in/", image: "/images/portfolio/grocito/vaidik-hariyali.png", category: "ai" },
  { title: "Market Apna", url: "https://marketapna.in/", image: "/images/portfolio/grocito/market-apna.png", category: "web" },
  { title: "Agrika", url: "https://agrika.shop/", image: "/images/portfolio/grocito/agrika.png", category: "web" },
  { title: "Achhasa Gift", url: "https://achhasagift.in/", image: "/images/portfolio/grocito/achhasa-gift.png", category: "web" },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "HealthTrack Pro",
    subtitle: "Increase user engagement in fitness apps",
    category: "mobile",
    beforeImage: "/images/portfolio/case-studies/healthtrack-before.jpg",
    afterImage: "/images/portfolio/case-studies/healthtrack-after.jpg",
    categoryBadge: "MOBILE",
    mainTech: "iOS",
    problem: "Low retention rates and lack of personalized insights",
    solution: "Built AI-powered fitness tracking with personalized recommendations",
    impacts: [
      { label: "Increased user retention by", value: "42%" },
      { label: "Generated revenue in 6 months", value: "₹3.2 Cr" },
    ],
    techStack: ["React Native", "Node.js", "TensorFlow", "iOS", "Android", "Health"],
    url: "/contact?project=healthtrack",
  },
  {
    title: "EduLearn Platform",
    subtitle: "Scale e-learning platform to 100K+ users",
    category: "web",
    beforeImage: "/images/portfolio/case-studies/edulearn-before.jpg",
    afterImage: "/images/portfolio/case-studies/edulearn-after.jpg",
    categoryBadge: "WEB",
    mainTech: "React",
    problem: "Outdated tech stack causing performance issues",
    solution: "Migrated to modern React/Node.js with AWS scaling",
    impacts: [
      { label: "300% faster load times", value: "Speed" },
      { label: "Served students", value: "100K+" },
    ],
    techStack: ["React", "Node.js", "AWS", "MongoDB"],
    url: "/contact?project=edulearn",
  },
  {
    title: "Space Quest",
    subtitle: "Launch viral mobile game",
    category: "game",
    beforeImage: "/images/portfolio/case-studies/spacequest-before.jpg",
    afterImage: "/images/portfolio/case-studies/spacequest-after.jpg",
    categoryBadge: "GAME",
    mainTech: "Unity",
    problem: "Generic gameplay leading to quick abandonment",
    solution: "Developed immersive 3D space adventure with multiplayer",
    impacts: [
      { label: "Downloads", value: "1M+" },
      { label: "Rating on app stores", value: "4.8" },
    ],
    techStack: ["Unity", "C#", "Photon", "3D", "Mobile"],
    url: "/contact?project=spacequest",
  },
  {
    title: "CryptoVault",
    subtitle: "Build secure DeFi platform",
    category: "blockchain",
    beforeImage: "/images/portfolio/case-studies/cryptovault-before.jpg",
    afterImage: "/images/portfolio/case-studies/cryptovault-after.jpg",
    categoryBadge: "BLOCKCHAIN",
    mainTech: "Web3",
    problem: "Complex smart contracts with security vulnerabilities",
    solution: "Developed audited smart contracts with user-friendly interface",
    impacts: [
      { label: "Zero security breaches", value: "Security" },
      { label: "Assets secured", value: "$50M+" },
    ],
    techStack: ["Solidity", "Web3.js", "React", "DeFi"],
    url: "/contact?project=cryptovault",
  },
  {
    title: "SmartAssist AI",
    subtitle: "Automate customer support",
    category: "ai",
    beforeImage: "/images/portfolio/case-studies/smartassist-before.jpg",
    afterImage: "/images/portfolio/case-studies/smartassist-after.jpg",
    categoryBadge: "AI",
    mainTech: "NLP",
    problem: "High support costs and slow response times",
    solution: "Built NLP-powered chatbot with 24/7 availability",
    impacts: [
      { label: "70% faster responses", value: "Speed" },
      { label: "Saved annually", value: "₹2 Cr" },
    ],
    techStack: ["Python", "TensorFlow", "Dialogflow", "NLP", "Machine Learning"],
    url: "/contact?project=smartassist",
  },
  {
    title: "BrandRebrand",
    subtitle: "Modernize brand identity",
    category: "design",
    beforeImage: "/images/portfolio/case-studies/brandrebrand-before.jpg",
    afterImage: "/images/portfolio/case-studies/brandrebrand-after.jpg",
    categoryBadge: "DESIGN",
    mainTech: "UI/UX",
    problem: "Outdated design hurting market perception",
    solution: "Complete brand redesign with modern UI/UX",
    impacts: [
      { label: "Increase in brand recognition", value: "150%" },
      { label: "Design awards won", value: "3" },
    ],
    techStack: ["Figma", "Adobe Creative Suite", "React", "UI/UX", "Branding"],
    url: "/contact?project=brandrebrand",
  },
];
