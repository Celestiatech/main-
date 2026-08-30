/**
 * Single source of truth for the public site structure.
 *
 * The header renders every entry here, so each page is internally linked from
 * every other page — which is the point: internal links are how crawlers
 * discover and weight pages. `sitemap.ts` reads the same list, so the header
 * and the sitemap cannot drift apart.
 *
 * Deliberately excluded (public routes that should not be advertised):
 *  - /clients            "Client Portal" — an account area, not a marketing page.
 *  - /reference-designs  A mirror of third-party DexignZone templates. Linking
 *                        it invites duplicate-content problems on pages that
 *                        are not ours to rank for.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Shown under the label in the mega panel. Keep to one line. */
  description?: string;
}

export interface NavGroup {
  id: string;
  title: string;
  items: NavItem[];
}

export interface NavMenu {
  id: string;
  label: string;
  /** The menu's own landing page, linked from the panel's intro column. */
  href: string;
  /** One line describing the section, shown in the intro column. */
  blurb: string;
  /**
   * Stays in the bar once the header shrinks on scroll. The compact header is
   * much narrower, so only the highest-value menus keep their slot; the rest
   * are hidden with CSS and remain in the DOM, so their links stay crawlable.
   */
  keepWhenCompact?: boolean;
  groups: NavGroup[];
}

export const NAV_MENUS: NavMenu[] = [
  {
    id: "services",
    label: "Services",
    href: "/services",
    blurb: "Everything we build, and the teams we build it with.",
    keepWhenCompact: true,
    groups: [
      {
        id: "build",
        title: "Build",
        items: [
          {
            label: "All Services",
            href: "/services",
            description: "The full range of what we design, build and maintain.",
          },
          {
            label: "Website Development",
            href: "/website-development-services",
            description: "Marketing sites and web platforms built to convert.",
          },
          {
            label: "Startup MVP Development",
            href: "/startup-mvp-development",
            description: "A production-ready MVP in 60–90 days.",
          },
          {
            label: "Web App Cost Guide",
            href: "/web-app-development-cost",
            description: "What a web application actually costs to build.",
          },
        ],
      },
      {
        id: "grow",
        title: "Grow",
        items: [
          {
            label: "AI Development",
            href: "/ai-development-company",
            description: "Models, assistants and automation shipped to production.",
          },
          {
            label: "SEO Services",
            href: "/seo-services",
            description: "Technical and content SEO that moves rankings.",
          },
          {
            label: "Hire Developers",
            href: "/hire-dedicated-developers",
            description: "Dedicated engineers who join your team, not a queue.",
          },
        ],
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    href: "/portfolio",
    blurb: "Projects we have shipped, and what clients said afterwards.",
    groups: [
      {
        id: "proof",
        title: "Proof",
        items: [
          {
            label: "Portfolio",
            href: "/portfolio",
            description: "Selected work with the problem and the outcome.",
          },
          {
            label: "Project Directory",
            href: "/work",
            description: "Every project we have delivered, in one list.",
          },
          {
            label: "Testimonials",
            href: "/testimonials",
            description: "What clients say once the work is live.",
          },
          {
            label: "Design Directions",
            href: "/populardesigns",
            description: "Premium theme directions to explore before we build.",
          },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/popular-tools",
    blurb: "Free tools and writing you can use before you hire anyone.",
    groups: [
      {
        id: "use",
        title: "Use",
        items: [
          {
            label: "Free Tools",
            href: "/popular-tools",
            description: "SEO audits, converters and generators — no sign-up.",
          },
          {
            label: "Blog",
            href: "/blog",
            description: "Notes on building and shipping software.",
          },
        ],
      },
      {
        id: "plan",
        title: "Plan",
        items: [
          {
            label: "Pricing",
            href: "/pricing",
            description: "How our engagements are priced.",
          },
          {
            label: "Free Proposal",
            href: "/proposal",
            description: "Tell us the project and get a scoped proposal.",
          },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    href: "/about",
    blurb: "Who we are, how to reach us, and the small print.",
    keepWhenCompact: true,
    groups: [
      {
        id: "about",
        title: "About",
        items: [
          {
            label: "About Us",
            href: "/about",
            description: "The team and how we work.",
          },
          {
            label: "Careers",
            href: "/career",
            description: "Open roles and how we hire.",
          },
          {
            label: "Contact",
            href: "/contact",
            description: "Start a conversation about your project.",
          },
          {
            label: "Request a Call",
            href: "/request-a-call",
            description: "Book a time that suits you.",
          },
        ],
      },
      {
        id: "legal",
        title: "Legal",
        items: [
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms of Service", href: "/terms-of-service" },
          { label: "Cookie Policy", href: "/cookie-policy" },
          { label: "Accessibility", href: "/accessibility" },
        ],
      },
    ],
  },
];

/** Every static route the site wants indexed, home first. Used by sitemap.ts. */
export const PUBLIC_ROUTES: string[] = [
  "",
  ...Array.from(
    new Set(NAV_MENUS.flatMap((menu) => menu.groups.flatMap((group) => group.items.map((item) => item.href))))
  ),
];
