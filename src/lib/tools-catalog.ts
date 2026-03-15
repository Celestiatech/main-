export type ToolCategoryId =
  | "developer-tools"
  | "text-tools"
  | "image-tools"
  | "pdf-tools"
  | "seo-tools"
  | "generators"
  | "date-utility-tools";

export type ToolStatus = "live" | "coming-soon";

export interface ToolCategory {
  id: ToolCategoryId;
  title: string;
  description: string;
}

export interface ToolItem {
  slug: string;
  title: string;
  category: ToolCategoryId;
  description: string;
  status: ToolStatus;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "developer-tools",
    title: "Developer Tools",
    description: "High traffic utilities developers search daily.",
  },
  {
    id: "text-tools",
    title: "Text Tools",
    description: "Easy tools with broad user demand and high repeat use.",
  },
  {
    id: "image-tools",
    title: "Image Tools",
    description: "Popular media utilities with strong search demand.",
  },
  {
    id: "pdf-tools",
    title: "PDF Tools",
    description: "Always-popular conversion and document workflow tools.",
  },
  {
    id: "seo-tools",
    title: "SEO Tools",
    description: "Traffic-focused tools for marketers and site owners.",
  },
  {
    id: "generators",
    title: "Generators",
    description: "Viral utilities that perform well in organic traffic.",
  },
  {
    id: "date-utility-tools",
    title: "Date and Utility Tools",
    description: "Simple evergreen tools used by professionals every day.",
  },
];

export const TOOLS: ToolItem[] = [
  { slug: "json-formatter", title: "JSON Formatter", category: "developer-tools", description: "Format raw JSON into readable output.", status: "live" },
  { slug: "json-validator", title: "JSON Validator", category: "developer-tools", description: "Validate JSON and show parsing errors.", status: "live" },
  { slug: "base64-encoder-decoder", title: "Base64 Encoder / Decoder", category: "developer-tools", description: "Encode or decode Base64 text instantly.", status: "live" },
  { slug: "url-encoder-decoder", title: "URL Encoder / Decoder", category: "developer-tools", description: "Encode and decode URL strings safely.", status: "live" },
  { slug: "regex-tester", title: "Regex Tester", category: "developer-tools", description: "Test regular expressions against sample text.", status: "coming-soon" },
  { slug: "html-minifier", title: "HTML Minifier", category: "developer-tools", description: "Minify HTML by removing extra whitespace.", status: "coming-soon" },
  { slug: "css-minifier", title: "CSS Minifier", category: "developer-tools", description: "Compress CSS output for performance.", status: "coming-soon" },
  { slug: "javascript-minifier", title: "JavaScript Minifier", category: "developer-tools", description: "Minify JS snippets for smaller payloads.", status: "coming-soon" },
  { slug: "uuid-generator", title: "UUID Generator", category: "developer-tools", description: "Generate RFC-style random UUIDs.", status: "live" },
  { slug: "api-response-viewer", title: "API Response Viewer", category: "developer-tools", description: "Visualize JSON API responses quickly.", status: "coming-soon" },

  { slug: "word-counter", title: "Word Counter", category: "text-tools", description: "Count words, characters, and sentences.", status: "live" },
  { slug: "character-counter", title: "Character Counter", category: "text-tools", description: "Count every character in your text.", status: "live" },
  { slug: "case-converter", title: "Case Converter", category: "text-tools", description: "Convert text case instantly.", status: "live" },
  { slug: "text-diff-checker", title: "Text Diff Checker", category: "text-tools", description: "Compare two text blocks line by line.", status: "live" },
  { slug: "remove-duplicate-lines", title: "Remove Duplicate Lines", category: "text-tools", description: "Deduplicate repeated lines in text.", status: "live" },
  { slug: "text-sorter", title: "Text Sorter", category: "text-tools", description: "Sort lines alphabetically in one click.", status: "live" },
  { slug: "markdown-editor", title: "Markdown Editor", category: "text-tools", description: "Write and preview markdown content.", status: "coming-soon" },
  { slug: "random-text-generator", title: "Random Text Generator", category: "text-tools", description: "Generate random words and text blocks.", status: "coming-soon" },
  { slug: "lorem-ipsum-generator", title: "Lorem Ipsum Generator", category: "text-tools", description: "Generate placeholder lorem ipsum text.", status: "coming-soon" },
  { slug: "password-generator", title: "Password Generator", category: "text-tools", description: "Generate secure random passwords.", status: "live" },

  { slug: "image-compressor", title: "Image Compressor", category: "image-tools", description: "Reduce image file size with quality control.", status: "coming-soon" },
  { slug: "image-resizer", title: "Image Resizer", category: "image-tools", description: "Resize images to custom dimensions.", status: "coming-soon" },
  { slug: "image-converter", title: "Image Converter (PNG to JPG)", category: "image-tools", description: "Convert between popular image formats.", status: "coming-soon" },
  { slug: "image-crop-tool", title: "Image Crop Tool", category: "image-tools", description: "Crop images with quick presets.", status: "coming-soon" },
  { slug: "background-remover", title: "Background Remover", category: "image-tools", description: "Remove image backgrounds automatically.", status: "coming-soon" },
  { slug: "screenshot-to-image", title: "Screenshot to Image", category: "image-tools", description: "Convert screenshots into optimized images.", status: "coming-soon" },
  { slug: "blur-image-tool", title: "Blur Image Tool", category: "image-tools", description: "Apply blur effects to selected image areas.", status: "coming-soon" },
  { slug: "watermark-tool", title: "Watermark Tool", category: "image-tools", description: "Add text or logo watermark to images.", status: "coming-soon" },

  { slug: "pdf-to-word", title: "PDF to Word", category: "pdf-tools", description: "Convert PDF documents to editable Word files.", status: "coming-soon" },
  { slug: "word-to-pdf", title: "Word to PDF", category: "pdf-tools", description: "Convert Word docs into PDF format.", status: "coming-soon" },
  { slug: "merge-pdf", title: "Merge PDF", category: "pdf-tools", description: "Combine multiple PDFs into one file.", status: "coming-soon" },
  { slug: "split-pdf", title: "Split PDF", category: "pdf-tools", description: "Split PDF pages into separate files.", status: "coming-soon" },
  { slug: "compress-pdf", title: "Compress PDF", category: "pdf-tools", description: "Compress PDF size while preserving readability.", status: "coming-soon" },
  { slug: "pdf-page-extractor", title: "PDF Page Extractor", category: "pdf-tools", description: "Extract selected pages from a PDF.", status: "coming-soon" },
  { slug: "pdf-password-remover", title: "PDF Password Remover", category: "pdf-tools", description: "Remove password protection from authorized PDFs.", status: "coming-soon" },

  { slug: "meta-tag-generator", title: "Meta Tag Generator", category: "seo-tools", description: "Generate SEO meta tags for pages.", status: "coming-soon" },
  { slug: "robots-txt-generator", title: "Robots.txt Generator", category: "seo-tools", description: "Create robots.txt rules quickly.", status: "coming-soon" },
  { slug: "sitemap-generator", title: "Sitemap Generator", category: "seo-tools", description: "Generate XML sitemap for website pages.", status: "coming-soon" },
  { slug: "keyword-density-checker", title: "Keyword Density Checker", category: "seo-tools", description: "Analyze keyword frequency in text.", status: "coming-soon" },
  { slug: "website-screenshot-tool", title: "Website Screenshot Tool", category: "seo-tools", description: "Capture website previews for audits.", status: "coming-soon" },
  { slug: "open-graph-preview-tool", title: "Open Graph Preview Tool", category: "seo-tools", description: "Preview social share cards and OG tags.", status: "coming-soon" },

  { slug: "qr-code-generator", title: "QR Code Generator", category: "generators", description: "Generate scannable QR codes for URLs/text.", status: "coming-soon" },
  { slug: "color-palette-generator", title: "Color Palette Generator", category: "generators", description: "Create matching color palettes.", status: "coming-soon" },
  { slug: "gradient-generator", title: "Gradient Generator", category: "generators", description: "Build CSS gradient combinations.", status: "coming-soon" },
  { slug: "fake-user-generator", title: "Fake User Generator", category: "generators", description: "Generate mock user profile data.", status: "coming-soon" },
  { slug: "random-name-generator", title: "Random Name Generator", category: "generators", description: "Generate random personal names.", status: "coming-soon" },
  { slug: "invoice-generator", title: "Invoice Generator", category: "generators", description: "Create downloadable invoice drafts.", status: "coming-soon" },
  { slug: "password-strength-checker", title: "Password Strength Checker", category: "generators", description: "Estimate password strength and entropy.", status: "coming-soon" },

  { slug: "age-calculator", title: "Age Calculator", category: "date-utility-tools", description: "Calculate exact age from date of birth.", status: "coming-soon" },
  { slug: "timestamp-converter", title: "Timestamp Converter", category: "date-utility-tools", description: "Convert Unix timestamps to human dates.", status: "coming-soon" },
  { slug: "countdown-timer", title: "Countdown Timer", category: "date-utility-tools", description: "Set date-based countdown timers.", status: "coming-soon" },
  { slug: "time-zone-converter", title: "Time Zone Converter", category: "date-utility-tools", description: "Convert between global time zones.", status: "coming-soon" },
  { slug: "unit-converter", title: "Unit Converter", category: "date-utility-tools", description: "Convert common measurement units.", status: "coming-soon" },
];

export function getToolBySlug(slug: string) {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategoryId) {
  return TOOLS.filter((tool) => tool.category === category);
}
