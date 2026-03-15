export type ToolCategoryId =
  | "developer-tools"
  | "text-tools"
  | "image-tools"
  | "pdf-tools"
  | "seo-tools"
  | "generators"
  | "date-utility-tools";

export type ToolStatus = "live";

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
  { slug: "regex-tester", title: "Regex Tester", category: "developer-tools", description: "Test regular expressions against sample text.", status: "live" },
  { slug: "html-minifier", title: "HTML Minifier", category: "developer-tools", description: "Minify HTML by removing extra whitespace.", status: "live" },
  { slug: "css-minifier", title: "CSS Minifier", category: "developer-tools", description: "Compress CSS output for performance.", status: "live" },
  { slug: "javascript-minifier", title: "JavaScript Minifier", category: "developer-tools", description: "Minify JS snippets for smaller payloads.", status: "live" },
  { slug: "uuid-generator", title: "UUID Generator", category: "developer-tools", description: "Generate RFC-style random UUIDs.", status: "live" },
  { slug: "api-response-viewer", title: "API Response Viewer", category: "developer-tools", description: "Visualize JSON API responses quickly.", status: "live" },

  { slug: "word-counter", title: "Word Counter", category: "text-tools", description: "Count words, characters, and sentences.", status: "live" },
  { slug: "character-counter", title: "Character Counter", category: "text-tools", description: "Count every character in your text.", status: "live" },
  { slug: "case-converter", title: "Case Converter", category: "text-tools", description: "Convert text case instantly.", status: "live" },
  { slug: "text-diff-checker", title: "Text Diff Checker", category: "text-tools", description: "Compare two text blocks line by line.", status: "live" },
  { slug: "remove-duplicate-lines", title: "Remove Duplicate Lines", category: "text-tools", description: "Deduplicate repeated lines in text.", status: "live" },
  { slug: "text-sorter", title: "Text Sorter", category: "text-tools", description: "Sort lines alphabetically in one click.", status: "live" },
  { slug: "markdown-editor", title: "Markdown Editor", category: "text-tools", description: "Write and preview markdown content.", status: "live" },
  { slug: "random-text-generator", title: "Random Text Generator", category: "text-tools", description: "Generate random words and text blocks.", status: "live" },
  { slug: "lorem-ipsum-generator", title: "Lorem Ipsum Generator", category: "text-tools", description: "Generate placeholder lorem ipsum text.", status: "live" },
  { slug: "password-generator", title: "Password Generator", category: "text-tools", description: "Generate secure random passwords.", status: "live" },

  { slug: "image-compressor", title: "Image Compressor", category: "image-tools", description: "Reduce image file size with quality control.", status: "live" },
  { slug: "image-resizer", title: "Image Resizer", category: "image-tools", description: "Resize images to custom dimensions.", status: "live" },
  { slug: "image-converter", title: "Image Converter (PNG to JPG)", category: "image-tools", description: "Convert between popular image formats.", status: "live" },
  { slug: "image-crop-tool", title: "Image Crop Tool", category: "image-tools", description: "Crop images with quick presets.", status: "live" },
  { slug: "background-remover", title: "Background Remover", category: "image-tools", description: "Remove image backgrounds automatically.", status: "live" },
  { slug: "screenshot-to-image", title: "Screenshot to Image", category: "image-tools", description: "Convert screenshots into optimized images.", status: "live" },
  { slug: "blur-image-tool", title: "Blur Image Tool", category: "image-tools", description: "Apply blur effects to selected image areas.", status: "live" },
  { slug: "watermark-tool", title: "Watermark Tool", category: "image-tools", description: "Add text or logo watermark to images.", status: "live" },

  { slug: "pdf-to-word", title: "PDF to Word", category: "pdf-tools", description: "Convert PDF documents to editable Word files.", status: "live" },
  { slug: "word-to-pdf", title: "Word to PDF", category: "pdf-tools", description: "Convert Word docs into PDF format.", status: "live" },
  { slug: "merge-pdf", title: "Merge PDF", category: "pdf-tools", description: "Combine multiple PDFs into one file.", status: "live" },
  { slug: "split-pdf", title: "Split PDF", category: "pdf-tools", description: "Split PDF pages into separate files.", status: "live" },
  { slug: "compress-pdf", title: "Compress PDF", category: "pdf-tools", description: "Compress PDF size while preserving readability.", status: "live" },
  { slug: "pdf-page-extractor", title: "PDF Page Extractor", category: "pdf-tools", description: "Extract selected pages from a PDF.", status: "live" },
  { slug: "pdf-password-remover", title: "PDF Password Remover", category: "pdf-tools", description: "Remove password protection from authorized PDFs.", status: "live" },

  { slug: "meta-tag-generator", title: "Meta Tag Generator", category: "seo-tools", description: "Generate SEO meta tags for pages.", status: "live" },
  { slug: "robots-txt-generator", title: "Robots.txt Generator", category: "seo-tools", description: "Create robots.txt rules quickly.", status: "live" },
  { slug: "sitemap-generator", title: "Sitemap Generator", category: "seo-tools", description: "Generate XML sitemap for website pages.", status: "live" },
  { slug: "keyword-density-checker", title: "Keyword Density Checker", category: "seo-tools", description: "Analyze keyword frequency in text.", status: "live" },
  { slug: "website-screenshot-tool", title: "Website Screenshot Tool", category: "seo-tools", description: "Capture website previews for audits.", status: "live" },
  { slug: "open-graph-preview-tool", title: "Open Graph Preview Tool", category: "seo-tools", description: "Preview social share cards and OG tags.", status: "live" },

  { slug: "qr-code-generator", title: "QR Code Generator", category: "generators", description: "Generate scannable QR codes for URLs/text.", status: "live" },
  { slug: "color-palette-generator", title: "Color Palette Generator", category: "generators", description: "Create matching color palettes.", status: "live" },
  { slug: "gradient-generator", title: "Gradient Generator", category: "generators", description: "Build CSS gradient combinations.", status: "live" },
  { slug: "fake-user-generator", title: "Fake User Generator", category: "generators", description: "Generate mock user profile data.", status: "live" },
  { slug: "random-name-generator", title: "Random Name Generator", category: "generators", description: "Generate random personal names.", status: "live" },
  { slug: "invoice-generator", title: "Invoice Generator", category: "generators", description: "Create downloadable invoice drafts.", status: "live" },
  { slug: "password-strength-checker", title: "Password Strength Checker", category: "generators", description: "Estimate password strength and entropy.", status: "live" },

  { slug: "age-calculator", title: "Age Calculator", category: "date-utility-tools", description: "Calculate exact age from date of birth.", status: "live" },
  { slug: "timestamp-converter", title: "Timestamp Converter", category: "date-utility-tools", description: "Convert Unix timestamps to human dates.", status: "live" },
  { slug: "countdown-timer", title: "Countdown Timer", category: "date-utility-tools", description: "Set date-based countdown timers.", status: "live" },
  { slug: "time-zone-converter", title: "Time Zone Converter", category: "date-utility-tools", description: "Convert between global time zones.", status: "live" },
  { slug: "unit-converter", title: "Unit Converter", category: "date-utility-tools", description: "Convert common measurement units.", status: "live" },
];

export function getToolBySlug(slug: string) {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategoryId) {
  return TOOLS.filter((tool) => tool.category === category);
}
