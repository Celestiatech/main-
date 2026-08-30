export interface ExtractedLink {
  label: string;
  href: string;
}

export interface ExtractedImage {
  src: string;
  alt: string;
}

export interface ExtractedCard {
  title: string;
  body: string;
  image?: ExtractedImage;
  href?: string;
}

export interface HeroBlock {
  heading: string;
  subheading: string;
  image?: ExtractedImage;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ImageWithTextBlock {
  heading: string;
  body: string;
  image?: ExtractedImage;
}

export interface FeaturedBlock {
  heading: string;
  cards: ExtractedCard[];
}

export interface TestimonialsBlock {
  heading: string;
  items: { quote: string; author: string }[];
}

export interface FaqBlock {
  heading: string;
  items: { question: string; answer: string }[];
}

/** Everything the generator needs, distilled from one public page. */
export interface ExtractedSite {
  sourceUrl: string;
  extractedAt: string;
  brand: string;
  title: string;
  description: string;
  colors: {
    accent: string;
    background: string;
    text: string;
  };
  header: {
    logo?: ExtractedImage;
    links: ExtractedLink[];
  };
  hero: HeroBlock | null;
  imageWithText: ImageWithTextBlock | null;
  featured: FeaturedBlock | null;
  testimonials: TestimonialsBlock | null;
  faq: FaqBlock | null;
  footer: {
    links: ExtractedLink[];
    copyright: string;
  };
  /** Things the merchant needs to know before trusting the output. */
  warnings: string[];
}

export interface ThemeFile {
  path: string;
  /** Text for Liquid/JSON/CSS, Buffer for imported binary assets. */
  contents: string | Buffer;
}
