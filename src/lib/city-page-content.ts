import type { CityTarget } from "./city-pages";

/**
 * Builds the copy for a city landing page.
 *
 * Every page is assembled from the same structure, but the wording, ordering
 * and emphasis are chosen from a seed derived from the city slug. That keeps
 * the pages deterministic (so static generation is stable) while stopping them
 * from being byte-identical, which is what makes a set of location pages read
 * as doorway pages rather than as a real service area.
 */

/** Small deterministic hash: same city always produces the same page. */
function seedFrom(slug: string): number {
  let hash = 2166136261;
  for (let i = 0; i < slug.length; i += 1) {
    hash ^= slug.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick<T>(options: T[], seed: number, offset = 0): T {
  return options[(seed + offset) % options.length];
}

/** Deterministic rotation, so each city leads with a different strength. */
function rotate<T>(items: T[], seed: number): T[] {
  const at = seed % items.length;
  return [...items.slice(at), ...items.slice(0, at)];
}

export interface ComparisonRow {
  name: string;
  highlight?: boolean;
  cells: string[];
}

export interface CityPageContent {
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSub: string;
  trustPoints: string[];
  intro: string[];
  whyHeading: string;
  why: { title: string; body: string }[];
  comparisonHeading: string;
  comparisonIntro: string;
  comparisonColumns: string[];
  comparison: ComparisonRow[];
  services: { title: string; body: string; href: string }[];
  process: { step: string; title: string; body: string }[];
  marketHeading: string;
  market: string[];
  faqHeading: string;
  faq: { question: string; answer: string }[];
  ctaHeading: string;
  ctaBody: string;
}

const WHY_POINTS = [
  {
    title: "Senior engineers, not a rotating bench",
    body: "The people who scope your project are the people who build it. No handover to a junior team once the contract is signed.",
  },
  {
    title: "Fixed scope, fixed price",
    body: "You approve a written scope and a number before work starts. Change requests are quoted separately, so the invoice never surprises you.",
  },
  {
    title: "Built to be handed over",
    body: "You get the repository, the deployment pipeline and the documentation. Nothing is locked to us, and leaving costs you nothing.",
  },
  {
    title: "Performance treated as a feature",
    body: "Core Web Vitals are part of the acceptance criteria, not an afterthought. Slow pages lose rankings and conversions in equal measure.",
  },
  {
    title: "SEO built in from the first commit",
    body: "Semantic markup, server rendering, structured data and internal linking are part of the build, not a retrofit six months later.",
  },
  {
    title: "Support that answers",
    body: "Post-launch retainers carry a stated response time. You are talking to the team that wrote the code, in your working hours.",
  },
];

const SERVICES = [
  {
    title: "Website development",
    body: "Marketing sites and web platforms built to convert, not just to look finished.",
    href: "/website-development-services",
  },
  {
    title: "Web application development",
    body: "Dashboards, portals and SaaS products with real architecture behind them.",
    href: "/services",
  },
  {
    title: "Startup MVP development",
    body: "A production-ready first version in 60–90 days, built to survive its own success.",
    href: "/startup-mvp-development",
  },
  {
    title: "AI development",
    body: "Assistants, automation and models wired into the systems you already run.",
    href: "/ai-development-company",
  },
  {
    title: "SEO services",
    body: "Technical SEO, content structure and internal linking that moves rankings.",
    href: "/seo-services",
  },
  {
    title: "Dedicated developers",
    body: "Engineers who join your team and your standup, not a ticket queue.",
    href: "/hire-dedicated-developers",
  },
];

const PROCESS = [
  {
    step: "Discovery",
    title: "We learn the business first",
    body: "Before any design, we map what the site or product has to achieve commercially and who it has to serve.",
  },
  {
    step: "Scope",
    title: "A written scope and a fixed number",
    body: "You get a deliverables list, a timeline and a price. Nothing starts until you have approved all three.",
  },
  {
    step: "Build",
    title: "Milestones you can see",
    body: "Work ships to a staging URL you can open at any time. You review real screens, not status reports.",
  },
  {
    step: "Launch",
    title: "Handover and support",
    body: "Deployment, analytics, search console and documentation. Then an optional retainer with a stated response time.",
  },
];

/**
 * One-line summary for listing cards.
 *
 * Kept separate from buildCityPageContent so the blog and index pages can show
 * a description without pulling the whole page's copy into the client bundle.
 * Seeded from the slug like everything else, so no two neighbouring cards read
 * identically — a grid of 59 cards with the same sentence is thin content.
 */
export function buildCityExcerpt(target: CityTarget): string {
  const seed = seedFrom(target.slug);

  return pick(
    [
      `Websites, web apps and AI products for ${target.city} businesses — fixed scope, senior engineers, and code you own outright.`,
      `How we work with companies in ${target.city}: a written scope, a fixed price, and a build documented for handover.`,
      `What a web project actually costs and runs like in ${target.city}, and an honest comparison against the alternatives.`,
      `Our approach for ${target.city} clients — performance and SEO treated as acceptance criteria, not an afterthought.`,
    ],
    seed,
    5
  );
}

export function buildCityPageContent(target: CityTarget): CityPageContent {
  const { city, region, regionType, country } = target;
  const seed = seedFrom(target.slug);

  const domestic = country === "India";
  const place = region === city ? country : `${region}, ${country}`;

  const heroSub = pick(
    [
      `We design, build and maintain websites and web applications for businesses in ${city} — with a written scope, a fixed price and senior engineers on the work.`,
      `Websites, web apps and AI products for ${city} businesses, built by the same senior team that scoped them.`,
      `A development partner for ${city} companies that want the build documented, handed over and genuinely theirs.`,
    ],
    seed
  );

  const intro = [
    pick(
      [
        `Choosing a development partner in ${city} usually comes down to one question: will the finished product still be maintainable a year from now? We build as if the answer has to be yes.`,
        `Most agencies in ${city} can produce something that looks right on launch day. The harder part is the twelve months afterwards, and that is what we optimise for.`,
        `Businesses in ${city} come to us after a build that went sideways at least as often as they come to us first. Both are fine. We start by reading what already exists.`,
      ],
      seed,
      1
    ),
    domestic
      ? `We work with clients across ${region} and the rest of India, from ${city}-based startups shipping a first product to established firms replatforming something that has outgrown its original build.`
      : `We work with clients in ${city} and across ${place} from our engineering teams in India and the UAE, with overlapping hours and a named point of contact rather than an anonymous ticket queue.`,
  ];

  const comparisonColumns = [
    "Who does the work",
    "Pricing",
    "Code ownership",
    "SEO & performance",
    "After launch",
  ];

  const comparison: ComparisonRow[] = [
    {
      name: "W3Tech",
      highlight: true,
      cells: [
        "The senior engineers who scoped it",
        "Fixed scope, fixed price, quoted changes",
        "Yours — repo, pipeline and docs handed over",
        "Part of the acceptance criteria",
        "Retainer with a stated response time",
      ],
    },
    {
      name: "Typical local studio",
      cells: [
        "Varies; often juniors after handover",
        "Fixed price, scope creep billed later",
        "Usually yours, documentation patchy",
        "Handled if asked for",
        "Ad-hoc, availability varies",
      ],
    },
    {
      name: "Offshore marketplace team",
      cells: [
        "Whoever is assigned that sprint",
        "Lowest hourly rate, hours expand",
        "Yours, but often undocumented",
        "Rarely in scope",
        "Ends with the contract",
      ],
    },
    {
      name: "Freelance developer",
      cells: [
        "One person, doing everything",
        "Hourly or per-project",
        "Yours, entirely in their head",
        "Depends on the individual",
        "Whatever their next client allows",
      ],
    },
    {
      name: "Large enterprise agency",
      cells: [
        "A team you meet after signing",
        "Retainer plus change orders",
        "Sometimes licensed, not owned",
        "Strong, at enterprise cost",
        "Formal SLA, enterprise pricing",
      ],
    },
  ];

  const faq = [
    {
      question: `Do you work with clients based in ${city}?`,
      answer: domestic
        ? `Yes. We work with businesses across ${region} and all of India, remotely by default and on site when a project genuinely needs it.`
        : `Yes. We work with ${city} clients remotely, with working hours that overlap ${country} and a named contact rather than a shared inbox.`,
    },
    {
      question: `What does a website cost for a business in ${city}?`,
      answer:
        "It depends on scope rather than location — a marketing site and a customer portal are different projects. We publish our approach on the pricing page and give you a fixed number in writing before work begins.",
    },
    {
      question: "How long does a project take?",
      answer:
        "A marketing site is typically 4–8 weeks, a custom web application 8–16 weeks, and an MVP 60–90 days. You get a milestone schedule with the scope, not a vague range.",
    },
    {
      question: "Do we own the code?",
      answer:
        "Yes, entirely. You receive the repository, the deployment pipeline and the documentation. There is no licence to renew and no cost to walk away.",
    },
    {
      question: `Can you take over a project another agency started in ${city}?`,
      answer:
        "Often, yes. We start with a paid audit of the existing codebase and tell you honestly whether continuing or rebuilding is the better value — including when the answer is that you should stay where you are.",
    },
  ];

  return {
    title: `Web Development Company in ${city}`,
    metaTitle: `Web Development Company in ${city} | W3Tech`,
    metaDescription: `W3Tech builds websites, web applications and AI products for businesses in ${city}. Fixed scope, senior engineers, and full code ownership. See how we compare.`,
    heroHeading: `Web Development Company in ${city}`,
    heroSub,
    trustPoints: ["Fixed scope and price", "Senior engineers only", "You own the code", "Support after launch"],
    intro,
    whyHeading: `Why ${city} businesses choose W3Tech`,
    why: rotate(WHY_POINTS, seed),
    comparisonHeading: `How we compare in ${city}`,
    comparisonIntro: `There is more than one way to get a website built in ${city}, and the cheapest option is not always the most expensive mistake. Here is an honest read on the alternatives, including where they beat us.`,
    comparisonColumns,
    comparison,
    services: rotate(SERVICES, seed),
    process: PROCESS,
    marketHeading: `Working with businesses in ${city}`,
    market: [
      domestic
        ? `${city} sits in ${region}, and the businesses we work with there range from funded startups to established firms running operations on software that was written years ago.`
        : `${city} is one of the markets we serve across ${place}, usually for companies that want senior engineering without an in-house team to manage it.`,
      `Whatever the sector, the brief tends to be the same: a site or product that loads quickly, ranks for the terms that matter, and can be changed next year without a rewrite.`,
    ],
    faqHeading: `Frequently asked questions — ${city}`,
    faq,
    ctaHeading: `Start a project in ${city}`,
    ctaBody: `Tell us what you are building and we will come back with a scope, a timeline and a fixed price — or an honest answer that we are not the right fit.`,
  };
}
