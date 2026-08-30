import type { ToolItem, ToolCategoryId } from "./tools-catalog";

export interface InsightStep {
  title: string;
  desc: string;
}

export interface InsightFeature {
  title: string;
  desc: string;
}

export interface InsightFaq {
  q: string;
  a: string;
}

export interface ToolInsights {
  whatIs: string[];
  howToUse: InsightStep[];
  results: string[];
  faqs: InsightFaq[];
}

interface CategoryBase {
  verified: InsightFeature[];
  features: InsightFeature[];
  speedScale: InsightFeature[];
  ranking: string[];
  beatCompetitors: InsightStep[];
  mission: string[];
}

const PER_TOOL: Record<string, ToolInsights> = {
  /* ===== Developer Tools ===== */
  "json-formatter": {
    whatIs: [
      "The JSON Formatter takes raw, minified JSON and prints it back with clean, consistent indentation. It runs entirely inside your browser, so sensitive API responses and config payloads never leave your machine.",
      "It is the fastest way to turn a wall of text into readable, shareable JSON before you debug it, review it in a merge request, or drop it into a configuration file.",
    ],
    howToUse: [
      { title: "Paste your JSON", desc: "Paste or type any JSON object into the input area, minified or already spaced out." },
      { title: "Check the status", desc: "The tool validates your input instantly and points out the exact line where an error appears." },
      { title: "Copy the output", desc: "Valid JSON is expanded into a clean, indented format and copied to your clipboard in one click." },
    ],
    results: [
      "Readable, correctly indented JSON every time",
      "Immediate validation with a useful error message",
      "One-click copy, ready to paste anywhere",
    ],
    faqs: [
      { q: "Does formatting change my JSON data?", a: "No. Formatting only changes whitespace and line breaks. The data structure, keys and values stay exactly the same." },
      { q: "Why does my JSON show an error even though it looks fine?", a: "JSON is strict — trailing commas, unquoted keys, single quotes and comments are not allowed. The error message highlights where the parser first gives up, so start there." },
    ],
  },
  "json-validator": {
    whatIs: [
      "The JSON Validator checks whether a string is valid JSON and explains exactly why not when it is. It is the first thing our team reaches for before debugging an API response or a config file.",
      "Validation is strict, standards-based and runs locally in your browser — nothing you paste is sent anywhere.",
    ],
    howToUse: [
      { title: "Paste your JSON", desc: "Drop in any JSON document, from a tiny object to a large API payload." },
      { title: "Read the verdict", desc: "You get an instant Valid JSON or Invalid JSON badge with the first problem highlighted." },
      { title: "Fix and re-check", desc: "Edit the input and watch the validator re-run on every keystroke until it passes." },
    ],
    results: [
      "Instant valid / invalid verdict",
      "Precise error location and message on invalid input",
      "Live validation while you type",
    ],
    faqs: [
      { q: "What counts as valid JSON?", a: "JSON must follow the RFC 8259 grammar: double-quoted keys and strings, and no trailing commas or comments. Anything else fails validation." },
      { q: "Can the validator handle large documents?", a: "Yes. Because validation runs in your browser, there is no upload limit, and performance stays fast even for big payloads." },
    ],
  },
  "base64-encoder-decoder": {
    whatIs: [
      "The Base64 Encoder / Decoder converts plain text into Base64 and back again. Base64 is the encoding used for data URIs, auth tokens, email attachments and countless API payloads.",
      "Both directions run in your browser instantly, with a single input box and two buttons — no setup and no uploads.",
    ],
    howToUse: [
      { title: "Paste your text", desc: "Enter plain text to encode, or a Base64 string to decode." },
      { title: "Choose a direction", desc: "Click Encode to transform text into Base64, or Decode to turn Base64 back into readable text." },
      { title: "Use the result", desc: "The output replaces the input immediately, ready to be copied or used in your code." },
    ],
    results: [
      "Rapid encode / decode in either direction",
      "Clean handling of Unicode text",
      "No file uploads — everything stays local",
    ],
    faqs: [
      { q: "Is Base64 the same as encryption?", a: "No. Base64 is an encoding, not encryption — anyone can decode it. Never use it to protect sensitive data." },
      { q: "Does decoding work for UTF-8 characters?", a: "Yes. The decoder handles multi-byte Unicode correctly instead of producing garbled characters." },
    ],
  },
  "url-encoder-decoder": {
    whatIs: [
      "The URL Encoder / Decoder converts special characters into the percent-encoded form URLs expect, and back again. It is essential when building query strings, parsing links or debugging unexpected request failures.",
      "Encoding runs instantly in your browser, so you can normalize URLs without opening a console or writing a one-liner.",
    ],
    howToUse: [
      { title: "Paste the string", desc: "Enter a URL, query parameter value or any text that needs encoding." },
      { title: "Encode or decode", desc: "Click Encode to replace unsafe characters with percent sequences, or Decode to restore the original text." },
      { title: "Verify the output", desc: "Check the result, then use it directly in your app, config or tests." },
    ],
    results: [
      "Correct percent-encoding for spaces and special characters",
      "Reliable decoding of encoded URLs",
      "Instant in-browser processing with no uploads",
    ],
    faqs: [
      { q: "Which characters get encoded?", a: "Anything outside the safe set — letters, digits and a few symbols — gets converted. Spaces become %20, and reserved characters like & and = are encoded where needed." },
      { q: "Why did my decoded URL look wrong?", a: "Decoding turns every percent sequence back into its character. If the original string was not properly encoded, the result can look odd — that is expected behaviour." },
    ],
  },
  "regex-tester": {
    whatIs: [
      "The Regex Tester lets you build and validate regular expressions against live sample text. You can watch every match as you type, which is far faster than guessing in a terminal.",
      "It supports common flags and handles multi-match testing, so you can verify patterns before they reach your application code.",
    ],
    howToUse: [
      { title: "Write the pattern", desc: "Enter your regular expression — with or without anchors, groups and quantifiers." },
      { title: "Set your flags", desc: "Add global (g), case-insensitive (i) and multiline (m) flags as needed." },
      { title: "Test against text", desc: "Paste sample input and see every match listed instantly, or read the error if the pattern does not compile." },
    ],
    results: [
      "Live list of all matches extracted from your text",
      "Instant syntax error reporting for invalid patterns",
      "A reliable sanity check before you ship a regex",
    ],
    faqs: [
      { q: "Which regex dialect does the tester use?", a: "It uses the JavaScript RegExp engine, the same one that powers Node.js and browser code, so results match what your application will actually run." },
      { q: "Why did zero matches appear?", a: "Check that your pattern is correct for the flags set — without the global flag only the first match is typically considered, and case differences may hide matches without the i flag." },
    ],
  },
  "html-minifier": {
    whatIs: [
      "The HTML Minifier strips unnecessary whitespace and flattens your markup so pages weigh less on the wire. Smaller HTML means faster downloads and a better Core Web Vitals story.",
      "It runs in your browser, making it a safe, quick pass to run before you deploy templates or build static sites.",
    ],
    howToUse: [
      { title: "Paste your markup", desc: "Drop in a page fragment or full HTML document." },
      { title: "Watch it compress", desc: "The minified output appears instantly, removing redundant whitespace between tags." },
      { title: "Copy and deploy", desc: "Use one click to copy the minified result into your build output or deployment." },
    ],
    results: [
      "Smaller HTML payloads with identical rendering",
      "Instant in-browser minification",
      "One-click copy of the compressed output",
    ],
    faqs: [
      { q: "Will minification change how my page renders?", a: "No. The minifier only removes whitespace between tags and collapses repeated spaces. Your structure, attributes and content are untouched." },
      { q: "Is minified HTML harder to debug later?", a: "Keep your original source as the source of truth and minify at build time. That keeps human-readable code in the repo and lean HTML in production." },
    ],
  },
  "css-minifier": {
    whatIs: [
      "The CSS Minifier compresses your stylesheets by stripping comments and redundant whitespace and tightening selectors. The result is the same CSS with a smaller file size.",
      "Leaner stylesheets load faster on every device — a quick win for performance budgets and ranking signals.",
    ],
    howToUse: [
      { title: "Paste your CSS", desc: "Enter a stylesheet fragment or a complete bundle." },
      { title: "Check the output", desc: "The minified CSS appears instantly — comments removed and spacing compacted." },
      { title: "Copy the result", desc: "Grab the compressed output and replace your source asset at build time." },
    ],
    results: [
      "Smaller CSS files with the same visual result",
      "Comments and surplus whitespace removed",
      "One-click copy for your build pipeline",
    ],
    faqs: [
      { q: "Will removing comments break anything?", a: "No. CSS comments are never executed — they exist only for humans. Removing them has zero effect on rendering." },
      { q: "Should I minify in development too?", a: "No. Keep readable CSS while you develop and minify as part of your build or deploy step so assets stay small in production." },
    ],
  },
  "javascript-minifier": {
    whatIs: [
      "The JavaScript Minifier strips comments and compresses whitespace from your scripts, cutting file size before they hit the network.",
      "Smaller JavaScript downloads faster, parses faster and helps you meet performance budgets — a real factor in both user experience and search rankings.",
    ],
    howToUse: [
      { title: "Paste your script", desc: "Add a function, snippet or full script into the input box." },
      { title: "Read the minified result", desc: "Comments and extra whitespace are removed and operators are compacted instantly." },
      { title: "Drop it into your bundle", desc: "Copy the output and use it in your production assembly or deployment." },
    ],
    results: [
      "Smaller script payloads with identical behaviour",
      "Comments and surplus space removed safely",
      "One-click copy for your build step",
    ],
    faqs: [
      { q: "Is the minified JavaScript behaviour-identical?", a: "Yes for this pass — it only removes comments and compresses whitespace around operators. It does not rename variables or perform deep tree-shaking." },
      { q: "Why keep my original readable version?", a: "Minified code is hard to read and debug. Keep the formatted source in version control and produce the minified version during the build." },
    ],
  },
  "uuid-generator": {
    whatIs: [
      "The UUID Generator creates random, standards-shaped UUIDs on demand. Whether you need an ID for a database row, a test fixture or an API response, one click is enough.",
      "Generation runs locally in your browser with the same randomness routines used across the platform.",
    ],
    howToUse: [
      { title: "Click Generate", desc: "Press the button and a fresh UUIDv4-style identifier is created." },
      { title: "Copy it", desc: "Use one click to copy the generated ID to your clipboard." },
      { title: "Generate again", desc: "Hit the button as many times as you need — there is no limit." },
    ],
    results: [
      "Freshly generated UUID with a proper version pattern",
      "One-click copy, ready for code and tests",
      "Unlimited generation with no wait",
    ],
    faqs: [
      { q: "Are randomly generated UUIDs unique enough?", a: "Version 4 UUIDs use 122 bits of randomness. The collision odds are astronomically small, which is why they are the default for millions of systems." },
      { q: "Can I use these IDs as database keys?", a: "Yes. UUIDs make excellent primary keys for distributed systems because they can be generated anywhere without coordination." },
    ],
  },
  "api-response-viewer": {
    whatIs: [
      "The API Response Viewer takes raw JSON responses and renders them in a readable, validated layout. It is the fastest way to inspect what an endpoint actually returned before you wire it into a UI.",
      "Because it works purely in the browser, you can inspect private responses without pasting them into a third-party service.",
    ],
    howToUse: [
      { title: "Copy the response", desc: "Copy the JSON body from your network tab, terminal or a curl request." },
      { title: "Paste it in", desc: "Paste the response into the viewer — validation runs automatically." },
      { title: "Inspect and share", desc: "Read the formatted result, then copy it to your clipboard or share with your team." },
    ],
    results: [
      "Readable, validated formatting of raw API responses",
      "Clear error message when an endpoint returns invalid JSON",
      "Confidential-safe local processing",
    ],
    faqs: [
      { q: "Can this view large response bodies?", a: "Yes. Because there are no server uploads, the only limit is what your browser can handle." },
      { q: "Is this the same as the JSON Formatter?", a: "Very close. The API Response Viewer is tuned for inspecting endpoint output, while the JSON Formatter is a general-purpose pretty-printer." },
    ],
  },

  /* ===== Text Tools ===== */
  "word-counter": {
    whatIs: [
      "The Word Counter counts words, characters and sentences in any text you paste. It is the tool our content team uses before publishing, submitting or guest-posting anything.",
      "Counts update live as you type, so there is no button-clicking and no guesswork about lengths.",
    ],
    howToUse: [
      { title: "Paste or type", desc: "Drop your paragraph, essay or article into the text area." },
      { title: "Read the counts", desc: "Words and characters update instantly as the content changes." },
      { title: "Adjust to target", desc: "Trim or expand wording until you land on your target length." },
    ],
    results: [
      "Live word and character totals",
      "Instant feedback while you edit",
      "Accurate figures for content briefs and submissions",
    ],
    faqs: [
      { q: "How are words counted?", a: "A word is any whitespace-separated token, which matches how most publishing platforms and submission guidelines count length." },
      { q: "Do spaces and punctuation count as characters?", a: "The character count includes everything in the box, including spaces. It reflects the raw length of your text." },
    ],
  },
  "character-counter": {
    whatIs: [
      "The Character Counter gives you the exact length of any text. If you have ever been cut off by a bio limit, a CSV import check or a form validation, this is the fix.",
      "The total updates on every keystroke, right at your fingertips.",
    ],
    howToUse: [
      { title: "Start typing", desc: "Type or paste the text you want measured." },
      { title: "Watch the total", desc: "The count updates live with every keystroke, including or excluding what you need." },
      { title: "Match the limit", desc: "Trim until you are inside the required length before you submit anywhere." },
    ],
    results: [
      "Exact character totals in real time",
      "Simple, focused interface",
      "Confidence before hitting submit",
    ],
    faqs: [
      { q: "What counts as a character?", a: "Every character in the text area, including spaces, new lines and punctuation, so you get the true length." },
      { q: "How is this different from the Word Counter?", a: "The Character Counter shows total length only. The Word Counter splits the same text into words and sentences too." },
    ],
  },
  "case-converter": {
    whatIs: [
      "The Case Converter rewrites text as uppercase, lowercase or title case in one click. It is perfect for headlines, file names, database fixes and any time consistency matters.",
      "It runs instantly in your browser with a single input box and three buttons.",
    ],
    howToUse: [
      { title: "Paste your text", desc: "Enter anything that needs a case change." },
      { title: "Pick a style", desc: "Choose UPPERCASE, lowercase or Title Case." },
      { title: "Use the result", desc: "The converted text replaces the input, ready to copy." },
    ],
    results: [
      "One-click conversion to three common cases",
      "Consistent formatting across your content",
      "No file uploads or sign-ups",
    ],
    faqs: [
      { q: "What does title case do?", a: "Title case capitalizes the first letter of each word, which suits headlines, buttons and labels." },
      { q: "Will the converter handle mixed-case input?", a: "Yes. Whatever casing you start with, each conversion normalizes the entire input into the style you chose." },
    ],
  },
  "text-diff-checker": {
    whatIs: [
      "The Text Diff Checker compares two blocks of text side by side and highlights what was added and removed. It is the fastest way to review a rewrite, a config change or a draft edit.",
      "The comparison happens locally, so you can diff sensitive copy and contracts without uploading them.",
    ],
    howToUse: [
      { title: "Paste the original", desc: "Put the first version in the left box." },
      { title: "Paste the revised", desc: "Put the edited version in the right box." },
      { title: "Review the changes", desc: "See added and removed lines grouped clearly in the diff output." },
    ],
    results: [
      "Line-by-line differences between two versions",
      "Instant, privacy-safe comparison",
      "One-click copy of the diff",
    ],
    faqs: [
      { q: "Does the diff compare word by word?", a: "The current pass works line by line, which is ideal for documents, configs and code. For fine-grained in-word diffs, split the text into single-line chunks first." },
      { q: "Are my documents uploaded anywhere?", a: "No. The comparison runs entirely in your browser, so private copy stays on your machine." },
    ],
  },
  "remove-duplicate-lines": {
    whatIs: [
      "The Remove Duplicate Lines tool de-duplicates repeated lines in any text block. It is a time-saver for cleaning lists, CSV exports, email threads and copied data.",
      "Deduplication runs locally in your browser with no uploads.",
    ],
    howToUse: [
      { title: "Paste the list", desc: "Paste text where duplicate lines are cluttering the output." },
      { title: "Read the cleaned output", desc: "Repeated lines collapse instantly to a single occurrence." },
      { title: "Copy the result", desc: "Grab the deduplicated list and use it anywhere you need." },
    ],
    results: [
      "Repeated lines removed in one pass",
      "Instant local processing",
      "One-click copy of the clean list",
    ],
    faqs: [
      { q: "Are duplicate lines that differ by spaces removed?", a: "Exact lines are collapsed as-is. If whitespace differs, lines are treated as unique — formatting differences will survive." },
      { q: "Is the order of my lines preserved?", a: "The order is preserved by default: the tool keeps the first occurrence of each line and removes later repeats." },
    ],
  },
  "text-sorter": {
    whatIs: [
      "The Text Sorter arranges lines alphabetically in one click. It is handy for lists, keyword sets, tag collections and any data that benefits from a clean order.",
      "Sorting runs locally, so your lists never leave the browser.",
    ],
    howToUse: [
      { title: "Paste your lines", desc: "Enter one item per line." },
      { title: "Let it sort", desc: "The list is reordered alphabetically instantly." },
      { title: "Copy the output", desc: "Export the sorted list with a single click." },
    ],
    results: [
      "Alphabetically ordered output in an instant",
      "Local, private processing",
      "One-click copy of the sorted list",
    ],
    faqs: [
      { q: "Is sorting case-sensitive?", a: "The sorter uses a natural locale-aware comparison, so mixed-case lists order sensibly rather than dumping every capital letter first." },
      { q: "Does the sorter handle empty lines?", a: "Empty lines are ignored, leaving you with a clean, compact list." },
    ],
  },
  "markdown-editor": {
    whatIs: [
      "The Markdown Editor splits your screen into a writing panel and a live HTML preview. It is everything needed to draft docs, READMEs and notes without leaving the page.",
      "Preview updates on every keystroke, so what you see mirrors what your final markdown will look like.",
    ],
    howToUse: [
      { title: "Write on the left", desc: "Type or paste markdown with headings, bold, links and code." },
      { title: "Watch the preview", desc: "The formatted output renders live on the right." },
      { title: "Copy what you need", desc: "Use the rendered view as your reference, and copy the markdown source for your project." },
    ],
    results: [
      "Live markdown-to-HTML preview",
      "Support for headings, bold, links, code and lists",
      "A distraction-free place to draft",
    ],
    faqs: [
      { q: "Which markdown features are supported?", a: "The editor handles the common set — headings, emphasis, links, inline code and line breaks — enough for most docs, notes and README drafts." },
      { q: "Is my draft saved anywhere?", a: "No. Everything stays in the browser, so refresh will not keep the draft. Copy your text before navigating away." },
    ],
  },
  "random-text-generator": {
    whatIs: [
      "The Random Text Generator produces believable throwaway word combinations for placeholders, mock interfaces and content scaffolding.",
      "It runs locally and generates as many words as you need in a single click.",
    ],
    howToUse: [
      { title: "Set the length", desc: "Choose how many words of placeholder text you want." },
      { title: "Generate", desc: "A fresh random block is created on demand." },
      { title: "Copy or regenerate", desc: "Copy the result or generate a new seed with another click." },
    ],
    results: [
      "Instant placeholder text at any length",
      "Fresh output every generation",
      "One-click copy for mockups",
    ],
    faqs: [
      { q: "Is the generated text meaningful?", a: "No — it is deliberately nonsense that looks like content. It is meant for layout testing and placeholders, not live copy." },
      { q: "Can I control the exact word count?", a: "Yes. Set the word count first and the generator produces exactly that many words." },
    ],
  },
  "lorem-ipsum-generator": {
    whatIs: [
      "The Lorem Ipsum Generator creates classic Latin placeholder text on demand, ready for design mockups, wireframes and print previews.",
      "Pick a paragraph count and the filler is generated instantly, locally in your browser.",
    ],
    howToUse: [
      { title: "Choose paragraph count", desc: "Set how many paragraphs of filler you need." },
      { title: "Generate", desc: "The Lorem Ipsum text appears immediately." },
      { title: "Copy it", desc: "Export the placeholder text straight into your mockup or template." },
    ],
    results: [
      "Instant classic Lorem Ipsum filler",
      "Configurable paragraph count",
      "One-click copy for mockups",
    ],
    faqs: [
      { q: "Is Lorem Ipsum meant for real content?", a: "No. It is a placeholder that lets designers judge layout and spacing without getting distracted by real words." },
      { q: "Does it match standard Unicode e-commerce text lengths?", a: "The generator produces standard-length paragraphs, so you can gauge how many lines real copy will occupy." },
    ],
  },
  "password-generator": {
    whatIs: [
      "The Password Generator creates strong, randomized passwords with the length and symbol policy you choose. It is what our developers use when a test account needs a real password.",
      "Generation happens locally, so the password never touches a server.",
    ],
    howToUse: [
      { title: "Set the length", desc: "Choose a length between 8 and 64 characters." },
      { title: "Generate", desc: "Click the button and a fresh random password appears." },
      { title: "Copy it", desc: "Copy the password straight into your sign-up or keychain." },
    ],
    results: [
      "High-entropy passwords on demand",
      "Adjustable length for any account policy",
      "Local generation with one-click copy",
    ],
    faqs: [
      { q: "Is a generated password guaranteed secure?", a: "The generator draws from a large character set at random. Longer passwords with symbols are exponentially harder to crack." },
      { q: "Can I reuse a generated password?", a: "You can, but you should not. Every account should have its own unique password, ideally stored in a password manager." },
    ],
  },

  /* ===== Image Tools ===== */
  "image-compressor": {
    whatIs: [
      "The Image Compressor reduces image file size and lets you control the quality trade-off. Smaller files mean faster pages — which is why image weight is one of the first things we fix on client sites.",
      "Everything runs locally in your browser via the canvas, so your images are never uploaded.",
    ],
    howToUse: [
      { title: "Upload the image", desc: "Choose a JPG, PNG or WebP from your device." },
      { title: "Set the quality", desc: "Adjust the quality slider or value between maximum quality and maximum compression." },
      { title: "Compress and download", desc: "Process the image, preview the result and download your optimized file." },
    ],
    results: [
      "A smaller file with a controlled quality setting",
      "Instant in-browser preview of the output",
      "Download-ready optimized image",
    ],
    faqs: [
      { q: "How much size can I expect to save?", a: "JPGs and photos typically compress by 40–70% at good quality. Flat graphics with large solid areas can shrink even more." },
      { q: "Is my image uploaded anywhere?", a: "No. Compression runs entirely in your browser and the original file stays on your device." },
    ],
  },
  "image-resizer": {
    whatIs: [
      "The Image Resizer scales an image to exact pixel dimensions in one pass. It is the fastest way to produce correctly-sized assets for blogs, product listings and social media.",
      "Resizing runs locally in your browser — your images never leave the device.",
    ],
    howToUse: [
      { title: "Upload the image", desc: "Pick the image you want to resize." },
      { title: "Enter dimensions", desc: "Set the target width and height in pixels." },
      { title: "Resize and download", desc: "Process the image and download the exact-size output." },
    ],
    results: [
      "Images at exactly the width and height you need",
      "Fast local processing with no uploads",
      "Download-ready resized file",
    ],
    faqs: [
      { q: "Does resizing preserve the aspect ratio?", a: "The tool scales to the exact dimensions you enter. If you keep the original ratio, the image will not stretch or distort." },
      { q: "Will resizing reduce quality?", a: "Shrinking produces a lower-resolution image that still looks sharp. These smaller files also load faster, which helps page performance." },
    ],
  },
  "image-converter": {
    whatIs: [
      "The Image Converter switches between JPG, PNG and WebP so you always have the right format for the job — a smaller WebP for the web, a lossless PNG for logos, a JPG for photos.",
      "Conversion runs locally in your browser, keeping your files private.",
    ],
    howToUse: [
      { title: "Upload the image", desc: "Choose the image you want to convert." },
      { title: "Pick the output format", desc: "Select JPG, PNG or WebP from the dropdown." },
      { title: "Convert and download", desc: "Process the file and download it in your chosen format." },
    ],
    results: [
      "Conversion between JPG, PNG and WebP",
      "Private, in-browser processing",
      "Download-ready output file",
    ],
    faqs: [
      { q: "Which format should I use?", a: "Use WebP for web photos to save bandwidth, PNG for logos and graphics with transparency, and JPG for photograph-heavy workflows." },
      { q: "Does converting reduce quality?", a: "Converting between lossy formats can cause generational loss. Converting once to WebP usually preserves visual quality while shrinking size." },
    ],
  },
  "image-crop-tool": {
    whatIs: [
      "The Image Crop Tool trims images to a custom region in seconds. It is perfect for removing distractions, reshaping banners and standardizing thumbnails.",
      "Cropping runs locally in your browser, so originals are never uploaded.",
    ],
    howToUse: [
      { title: "Upload the image", desc: "Pick the image you want to crop." },
      { title: "Enter the region", desc: "Set the X, Y position, width and height of the area to keep." },
      { title: "Crop and download", desc: "Process the selection and download the cropped result." },
    ],
    results: [
      "A precisely trimmed image region",
      "Exact pixel control over the crop",
      "Local processing with a downloadable result",
    ],
    faqs: [
      { q: "Can I crop to a specific aspect ratio?", a: "Yes — set the width and height to match your target ratio, such as 16:9 or 1:1, and the crop keeps exactly that shape." },
      { q: "Is cropping destructive to the original?", a: "No. Your original file is untouched; the tool produces a new cropped image you can download." },
    ],
  },
  "background-remover": {
    whatIs: [
      "The Background Remover removes a solid background color from an image, leaving transparent areas behind. It is the fast route to clean product shots and logo cut-outs.",
      "The process runs locally in your browser with a simple color picker and threshold control.",
    ],
    howToUse: [
      { title: "Upload the image", desc: "Choose an image with a solid background." },
      { title: "Pick the color", desc: "Select the background color to remove and tune the threshold." },
      { title: "Process and download", desc: "Generate a transparent-background PNG and download it." },
    ],
    results: [
      "Transparent backgrounds from solid-color images",
      "Threshold control for edge accuracy",
      "Local processing with a downloadable PNG",
    ],
    faqs: [
      { q: "Does it work with complex or gradient backgrounds?", a: "It is designed for solid, uniform backgrounds. Gradients and busy patterns need a more advanced matting tool." },
      { q: "What format is the output?", a: "The output is a PNG, which preserves transparency so the cut-out works on any page background." },
    ],
  },
  "screenshot-to-image": {
    whatIs: [
      "The Screenshot to Image tool converts screenshots into optimized JPG files. Screenshots are often oversized PNGs; converting them trims size without visibly hurting quality.",
      "Conversion happens locally in your browser.",
    ],
    howToUse: [
      { title: "Upload the screenshot", desc: "Pick a PNG or JPG screenshot from your device." },
      { title: "Convert", desc: "The tool re-encodes it as an optimized JPG instantly." },
      { title: "Download the output", desc: "Save the compressed image wherever you need it." },
    ],
    results: [
      "Optimized JPG output from any screenshot",
      "Smaller files that keep visual clarity",
      "Private, local conversion",
    ],
    faqs: [
      { q: "Why convert screenshots to JPG?", a: "Full-screen captures and UI clips are often saved as heavy PNGs. JPG encoding keeps the look but slashes the file size." },
      { q: "Is my screenshot uploaded?", a: "No. The entire conversion runs inside your browser." },
    ],
  },
  "blur-image-tool": {
    whatIs: [
      "The Blur Image Tool applies a soft Gaussian blur to an image, useful for hiding sensitive details, creating depth or producing placeholder backgrounds.",
      "The effect is applied locally in your browser with a simple strength control.",
    ],
    howToUse: [
      { title: "Upload the image", desc: "Choose the image you want to blur." },
      { title: "Set the strength", desc: "Adjust the blur amount between subtle and heavy." },
      { title: "Apply and download", desc: "Process the image and download the blurred result." },
    ],
    results: [
      "Adjustable blur applied to any image",
      "Privacy-friendly local processing",
      "Download-ready output",
    ],
    faqs: [
      { q: "Can I blur only part of an image?", a: "The current version blurs the whole image. For selective blur, crop the sensitive region first, blur it, then recombine." },
      { q: "Is the blur effect reversible?", a: "No — once blurred and saved, the original detail is gone. Keep a copy of the original file." },
    ],
  },
  "watermark-tool": {
    whatIs: [
      "The Watermark Tool stamps text onto your images, protecting your work and reinforcing your brand every time it is shared.",
      "Watermarking runs locally in your browser, so your files are never uploaded.",
    ],
    howToUse: [
      { title: "Upload the image", desc: "Choose the image you want to protect." },
      { title: "Enter your text", desc: "Type the brand name or text to stamp on the image." },
      { title: "Apply and download", desc: "Render the watermark, preview it and download the result." },
    ],
    results: [
      "A branded text watermark overlaid on your image",
      "Positioned safely away from the edge",
      "Local processing with a downloadable result",
    ],
    faqs: [
      { q: "Where is the watermark placed?", a: "By default the text sits in the bottom-right corner, a position that is visible but does not obscure the main subject." },
      { q: "Can I change the watermark size or position?", a: "The current version uses an automatic size that scales with the image. Resize the text by editing your source file first." },
    ],
  },
  "meta-video-downloader": {
    whatIs: [
      "The Meta Video Downloader saves public videos from Facebook, Instagram and Meta AI in MP4 format. It detects the platform from your URL and offers HD, SD and Standard quality options.",
      "It is designed for saving content you are allowed to download and are legally entitled to keep.",
    ],
    howToUse: [
      { title: "Copy the video URL", desc: "Open the public video and copy its link from the address bar or share button." },
      { title: "Paste it above", desc: "The tool detects whether it is a Facebook, Instagram or Meta AI video." },
      { title: "Choose quality and download", desc: "Pick HD, SD or Standard and download the MP4 to your device." },
    ],
    results: [
      "MP4 downloads of public Meta platform videos",
      "Automatic platform detection",
      "Quality selection between HD, SD and Standard",
    ],
    faqs: [
      { q: "Can I download private or friends-only videos?", a: "No. The tool only works with publicly accessible content. Respect the owner's privacy settings and copyright." },
      { q: "Which platforms are supported?", a: "Facebook feed videos, Reels and watch content, Instagram Reels and feed videos, plus videos shared on Meta AI." },
    ],
  },

  /* ===== PDF Tools ===== */
  "pdf-to-word": {
    whatIs: [
      "The PDF to Word tool extracts text and document metadata from a PDF so you can continue working with the contents. It bridges the gap when you receive an uneditable PDF but need the information inside.",
      "Processing starts locally in your browser using a client-side PDF library.",
    ],
    howToUse: [
      { title: "Select the PDF", desc: "Choose the PDF file you want to process." },
      { title: "Run the extraction", desc: "The tool reads the document and pulls out its metadata and text information." },
      { title: "Download the result", desc: "Save the extracted information as a plain text file." },
    ],
    results: [
      "Metadata and information extracted from the PDF",
      "A downloadable text summary of the document",
      "Local-first processing for your convenience",
    ],
    faqs: [
      { q: "Does this convert the PDF layout into Word formatting?", a: "The current pass extracts readable information and metadata. Full layout-perfect DOCX conversion requires a server-side engine such as LibreOffice." },
      { q: "Is my PDF uploaded anywhere?", a: "No. The process starts in your browser and your file stays on your device." },
    ],
  },
  "word-to-pdf": {
    whatIs: [
      "The Word to PDF tool turns plain text into a print-ready PDF document. It is the fastest way to export notes, drafts and legal-style text into a portable file.",
      "Conversion runs locally in your browser using a client-side PDF generator.",
    ],
    howToUse: [
      { title: "Paste your text", desc: "Type or paste the document content into the editor." },
      { title: "Convert", desc: "Click the button and the text is laid out into PDF pages." },
      { title: "Download", desc: "Save the generated PDF to your device." },
    ],
    results: [
      "A clean, paginated PDF from plain text",
      "Simple local conversion with no uploads",
      "Download-ready document",
    ],
    faqs: [
      { q: "Will formatting be preserved?", a: "The tool produces a readable text-based PDF. Rich formatting such as fonts and alignment is kept simple by design." },
      { q: "Can I include styled content?", a: "For fully formatted documents, prepare the layout in dedicated software first. This tool is for fast, clean text into PDF." },
    ],
  },
  "merge-pdf": {
    whatIs: [
      "The Merge PDF tool combines multiple PDF files into one document in the order you select them. It replaces the awkward process of printing and scanning when you need a single file.",
      "Merging runs entirely in your browser with a client-side PDF library.",
    ],
    howToUse: [
      { title: "Select the files", desc: "Choose two or more PDFs (multi-select is enabled)." },
      { title: "Merge", desc: "Click the button and every page is combined into one document." },
      { title: "Download", desc: "Save the merged PDF to your device." },
    ],
    results: [
      "Multiple PDFs combined into a single file",
      "Page order preserved from your selection",
      "Private, local merging",
    ],
    faqs: [
      { q: "Can I reorder pages during a merge?", a: "The tool combines files in the order you select them. To customize order, select files in the sequence you want them to appear." },
      { q: "Is there a file size limit?", a: "Merging runs in your browser, so the practical limit is what your device can handle rather than a server cap." },
    ],
  },
  "split-pdf": {
    whatIs: [
      "The Split PDF tool extracts pages from a PDF into a new file. Pull out a single chapter, a recent invoice or a signature page without touching the rest of the document.",
      "Splitting runs locally in your browser, keeping the original untouched for anything you need it for.",
    ],
    howToUse: [
      { title: "Select the PDF", desc: "Choose the PDF with pages you want to extract." },
      { title: "Set the page range", desc: "Enter ranges like 1-3,5 to pick the pages to keep." },
      { title: "Extract and download", desc: "Build the new document and download it as a fresh PDF." },
    ],
    results: [
      "A new PDF containing only the pages you selected",
      "Flexible comma and range syntax",
      "Local processing with a downloadable result",
    ],
    faqs: [
      { q: "Can I extract non-consecutive pages?", a: "Yes. Combine ranges and individual pages, e.g. 1-3,5 splits pages 1, 2, 3 and 5 into the new file." },
      { q: "Is my original PDF modified?", a: "No. The original stays untouched; a brand-new PDF is created from the selected pages." },
    ],
  },
  "compress-pdf": {
    whatIs: [
      "The Compress PDF tool shrinks PDF file size so documents transfer and email faster. It is the standard step we run before sending a large proposal or report to a client.",
      "Compression happens locally in your browser, so files stay private.",
    ],
    howToUse: [
      { title: "Select the PDF", desc: "Choose the PDF you want to shrink." },
      { title: "Compress", desc: "The document is re-saved with optimized object streams." },
      { title: "See the savings", desc: "The tool reports the before and after sizes and your percentage reduction." },
    ],
    results: [
      "A smaller PDF you can send faster",
      "Clear size comparison and reduction percentage",
      "Private, local compression",
    ],
    faqs: [
      { q: "How much can I shrink a PDF?", a: "Savings vary with content. Documents with redundant structures often compress 20–60% while staying visually identical." },
      { q: "Does compression reduce quality?", a: "This pass optimizes PDF internals without degrading text. For image-heavy files, re-export with lower image quality for larger savings." },
    ],
  },
  "pdf-page-extractor": {
    whatIs: [
      "The PDF Page Extractor pulls an exact set of pages out of a PDF and saves them as a new document. It is the reliable way to isolate a chapter, an attachment or a signature page.",
      "Extraction runs locally in your browser, leaving the original file intact.",
    ],
    howToUse: [
      { title: "Select the PDF", desc: "Choose the document that contains the pages you need." },
      { title: "Enter the pages", desc: "Specify pages with ranges and commas, for example 2-4,7." },
      { title: "Extract and download", desc: "Create the new PDF and download it." },
    ],
    results: [
      "A new PDF with exactly the pages you picked",
      "Flexible page selection syntax",
      "Originals preserved with local processing",
    ],
    faqs: [
      { q: "What if I enter a page outside the document?", a: "Out-of-range pages are ignored, and the tool tells you how many valid pages were extracted from the total." },
      { q: "Is the extraction reversible?", a: "Yes — the page is unchanged, just placed in a new file. You can always extract again with a different selection." },
    ],
  },
  "pdf-password-remover": {
    whatIs: [
      "The PDF Password Remover re-saves a PDF with standard encryption stripped, for documents you are authorized to unlock. If you own the file or the owner shared it with you, this removes the extra step at every open.",
      "Processing runs locally in your browser on documents with standard encryption.",
    ],
    howToUse: [
      { title: "Select the PDF", desc: "Choose your own authorized PDF file." },
      { title: "Run the unlock", desc: "The document is re-saved with encryption stripped." },
      { title: "Download", desc: "Save the unlocked copy to your device." },
    ],
    results: [
      "An unlocked copy of a file you are authorized to open",
      "Local processing with no uploads",
      "Simple one-button workflow",
    ],
    faqs: [
      { q: "Is this legal to use?", a: "Only on documents you own or are authorized to unlock. Removing protection from someone else's protected file is not permitted." },
      { q: "Does it work on all encryption types?", a: "It handles PDFs with standard encryption understood by the client library. Some proprietary or hardened schemes cannot be stripped in-browser." },
    ],
  },

  /* ===== SEO Tools ===== */
  "meta-tag-generator": {
    whatIs: [
      "The Meta Tag Generator creates the title, description, keywords and canonical tag markup for any page. This is the exact snippet our SEO team writes for every page we publish.",
      "Fill in the fields, copy the ready-to-paste HTML and drop it into your header — no hand-coding needed.",
    ],
    howToUse: [
      { title: "Fill in the details", desc: "Enter the page title, meta description, keywords and canonical URL." },
      { title: "Review the snippet", desc: "The generator compiles the full meta tag HTML instantly." },
      { title: "Copy into your site", desc: "Paste the generated tags into your page head section." },
    ],
    results: [
      "Ready-to-paste title, description and canonical tags",
      "Correct HTML escaping built in",
      "A fast start for every new page you ship",
    ],
    faqs: [
      { q: "What is a good meta description length?", a: "Aim for around 150–160 characters so full descriptions fit in most search results without being truncated." },
      { q: "Do meta keywords still matter?", a: "Google has ignored the meta keywords tag for years, but it remains harmless to include. Focus on title and description instead." },
    ],
  },
  "robots-txt-generator": {
    whatIs: [
      "The Robots.txt Generator builds a correct robots.txt file from a simple choice: allow or block indexing. It saves you from syntax errors and missing slashes that can break crawl control.",
      "It is the first file our SEO team checks when a site has crawl issues.",
    ],
    howToUse: [
      { title: "Choose your policy", desc: "Toggle Allow indexing or Disallow to set the crawl rule for all bots." },
      { title: "Review the file", desc: "The finished robots.txt content appears in a copyable block." },
      { title: "Copy and upload", desc: "Paste the file into your site root as /robots.txt." },
    ],
    results: [
      "A syntactically correct robots.txt file in seconds",
      "Clear allow/disallow control for all user-agents",
      "One-click copy, ready to upload",
    ],
    faqs: [
      { q: "Where does robots.txt live?", a: "It must be served from the root of your domain, for example example.com/robots.txt. Placed anywhere else it is ignored." },
      { q: "Can robots.txt block Google?", a: "Yes for crawling, but blocking a page here does not stop it appearing in search if it is still referenced. Use noindex for indexed-page control." },
    ],
  },
  "sitemap-generator": {
    whatIs: [
      "The Sitemap Generator turns a list of URLs into a valid XML sitemap. Sitemaps tell search engines which pages exist and help new content get discovered faster.",
      "Paste your URLs, copy the XML, and upload it — the whole loop takes under a minute.",
    ],
    howToUse: [
      { title: "Paste your URLs", desc: "Enter one page URL per line, all on the domain you control." },
      { title: "Review the XML", desc: "The generator builds a standards-compliant sitemap instantly." },
      { title: "Copy and submit", desc: "Upload it to your domain and submit it in Google Search Console." },
    ],
    results: [
      "A valid XML sitemap with all your URLs",
      "Correct XML encoding and escaping",
      "A clear submit-ready artifact for Search Console",
    ],
    faqs: [
      { q: "What should be in my sitemap?", a: "Include the canonical version of pages you want indexed — and not the filtered, paginated or duplicate versions of them." },
      { q: "Do sitemaps guarantee indexing?", a: "No. A sitemap only points search engines at your pages. Indexing still depends on quality, crawlability and internal linking." },
    ],
  },
  "keyword-density-checker": {
    whatIs: [
      "The Keyword Density Checker measures how often a target keyword appears in your content, as a count and a percentage. It is the quick signal our SEO team uses to spot over- or under-optimized copy.",
      "Analysis runs locally in your browser as you type, with no content uploaded.",
    ],
    howToUse: [
      { title: "Enter the target keyword", desc: "Type the phrase you want to measure." },
      { title: "Paste your content", desc: "Paste the page copy or article into the text area." },
      { title: "Read the metrics", desc: "See the occurrence count and density percentage updated live." },
    ],
    results: [
      "Exact occurrence count for your keyword",
      "A clear density percentage, updated live",
      "Privacy-safe local analysis",
    ],
    faqs: [
      { q: "What is a healthy keyword density?", a: "There is no universal rule, but most well-written pages sit around 0.5–3%. Natural writing beats chasing an exact number." },
      { q: "Does density alone affect rankings?", a: "No. Use density as a sanity check, not a ranking lever. Quality content and relevance matter far more than hitting a ratio." },
    ],
  },
  "da-pa-checker": {
    whatIs: [
      "The DA PA Checker evaluates domain authority, page authority and spam score for up to 10 URLs at once. It is the fast competitor research our agency uses before every link-building campaign.",
      "Run your domain, vet a prospect, or scan the top five competitors in a single pass.",
    ],
    howToUse: [
      { title: "Paste your URLs", desc: "Enter up to 10 URLs — one per line — in the checker." },
      { title: "Check authority", desc: "Run the check and the tool returns DA, PA and spam score for every URL." },
      { title: "Read the results", desc: "Compare scores side by side to size up a competitor or validate an outreach target." },
    ],
    results: [
      "DA, PA and spam scores for up to 10 URLs at once",
      "A clear, comparative view for competitor research",
      "Bulk checking that fits an entire campaign list",
    ],
    faqs: [
      { q: "What is a good DA score?", a: "It depends on your niche. What actually matters is being higher than the sites ranking above you for your target keyword." },
      { q: "How often should I check my authority?", a: "Monthly is a healthy cadence. Authority moves slowly, so a 30-day check tracks trend without drowning you in noise." },
    ],
  },
  "website-screenshot-tool": {
    whatIs: [
      "The Website Screenshot Tool captures a live preview of any public page, giving you a visual snapshot for audits, reports and design references.",
      "Enter a URL and a fresh capture is fetched and displayed in the tool.",
    ],
    howToUse: [
      { title: "Enter the URL", desc: "Type or paste the web address you want to capture." },
      { title: "View the preview", desc: "A live screenshot of the page is fetched and shown instantly." },
      { title: "Use it in your work", desc: "Reference the capture in audits, competitor reviews or design docs." },
    ],
    results: [
      "A live visual snapshot of any public page",
      "Fast URL-to-preview loop",
      "Useful context for audits and comparisons",
    ],
    faqs: [
      { q: "Why would a screenshot fail?", a: "Sites that block automated requests can refuse the capture. Public, crawlable pages generally work best." },
      { q: "Can this capture login-protected pages?", a: "No. Only publicly accessible pages can be screenshotted." },
    ],
  },
  "open-graph-preview-tool": {
    whatIs: [
      "The Open Graph Preview Tool shows exactly how your link will look when shared on social media. You tune the title, description and image until the card is perfect before publishing.",
      "It mirrors the rich card format used by major platforms when someone shares your URL.",
    ],
    howToUse: [
      { title: "Enter title and description", desc: "Fill in the OG title and description fields." },
      { title: "Add the image URL", desc: "Paste the URL of the image you want to appear on the card." },
      { title: "Check the card", desc: "Preview the rendered social card and refine until it looks right." },
    ],
    results: [
      "A rendered preview of your social share card",
      "Instant feedback on title, description and image",
      "Confidence before you publish or promote",
    ],
    faqs: [
      { q: "What makes a good OG image?", a: "Use roughly 1200x630 pixels with the subject centred — the safe area that most social feeds crop around." },
      { q: "Does the preview affect my live shares?", a: "No. Nothing is uploaded or published; the preview is only for your evaluation." },
    ],
  },

  "slug-generator": {
    whatIs: [
      "The Slug Generator converts any headline or page title into a clean, SEO-friendly URL slug. It strips accents, removes forbidden characters, and joins words with the separator you prefer.",
      "A tidy slug helps both readers and search engines understand what a page is about before they even open it.",
    ],
    howToUse: [
      { title: "Enter your headline", desc: "Type or paste a page title, such as a blog post heading." },
      { title: "Tune the options", desc: "Pick a separator, decide whether to strip stopwords, and cap the word count." },
      { title: "Copy the slug", desc: "Grab the generated slug and paste it into your CMS or URL structure." },
    ],
    results: [
      "An SEO-friendly, human-readable URL slug",
      "Multiple slug variants to compare",
      "Specials such as & symbols handled automatically",
    ],
    faqs: [
      { q: "Are dashes or underscores better for SEO?", a: "Dashes are the widely accepted standard. Underscores can merge words in some search engines, so most sites use hyphens." },
      { q: "How short should a slug be?", a: "Keep it under 60 characters and within 5-7 words. Short, descriptive slugs are easier to read and share." },
    ],
  },
  "seo-cost-calculator": {
    whatIs: [
      "The SEO Cost Calculator produces a realistic monthly budget range for your SEO project. It models hours of work, content writing, link building and local SEO against a competitiveness level.",
      "Use the figures as a planning anchor, not a quote — every agency prices deliverables differently.",
    ],
    howToUse: [
      { title: "Describe the project", desc: "Choose whether the site is new or existing, and how competitive the niche is." },
      { title: "Set the effort", desc: "Adjust how many hours of SEO work you expect per month and the contract length." },
      { title: "Add the extras", desc: "Tick content writing, link building or local SEO if those are in scope." },
    ],
    results: [
      "Estimated monthly and total SEO budget ranges",
      "A line-by-line cost breakdown",
      "A defensible starting point for proposals",
    ],
    faqs: [
      { q: "What factors move SEO pricing the most?", a: "Competitiveness, hours of work and whether you include ongoing content and link building all move the number noticeably." },
      { q: "Is this a quote from an agency?", a: "No. It is an indicative estimate. Always ask for a proposal that lists the specific deliverables." },
    ],
  },
  "alt-tag-checker": {
    whatIs: [
      "The Alt Tag Checker scans a page's HTML — live via URL or pasted directly — and lists every image with its alt text so you can spot missing attributes at a glance.",
      "Descriptive alt text improves accessibility for screen-reader users and gives image search context about each photo.",
    ],
    howToUse: [
      { title: "Enter a URL or HTML", desc: "Fetch a live page by URL, or paste the HTML of the section you want to check." },
      { title: "Review the report", desc: "Each image is listed with its status: OK, Empty (decorative) or Missing." },
      { title: "Fix and export", desc: "Add alt text where it is missing, then download the CSV if you want to track the work." },
    ],
    results: [
      "A full inventory of images and their alt attributes",
      "Missing vs. empty vs. present classification",
      "CSV export for tracking fixes",
    ],
    faqs: [
      { q: "Is an empty alt attribute a problem?", a: "Only for decorative images. In that case alt=\"\" is correct because it tells screen readers to skip the image entirely." },
      { q: "What does good alt text look like?", a: "A short, specific description that says what the image shows, including any key text, without keyword stuffing." },
    ],
  },
  "content-analysis": {
    whatIs: [
      "The Content Analysis tool measures readability, structure and keyword presence in any article — pasted as text/HTML or pulled from a live page URL.",
      "It is a quick pre-publish sanity check for word count, sentence length, reading level and keyword density.",
    ],
    howToUse: [
      { title: "Paste content or use a URL", desc: "Enter your draft text or fetch the page you want to evaluate." },
      { title: "Add target keywords", desc: "List the keywords the page should rank for, comma separated." },
      { title: "Read the suggestions", desc: "Review the metrics and the actionable list of improvements." },
    ],
    results: [
      "Word, sentence and reading-time stats",
      "Flesch readability score and grade level",
      "Keyword density plus a prioritized suggestion list",
    ],
    faqs: [
      { q: "What is a good Flesch score?", a: "For the web, 60-80 is comfortable for most readers. Below 50 starts to get heavy for a general audience." },
      { q: "What is the ideal keyword density?", a: "There is no hard rule. Write naturally and include the keyword and natural variations; forcing density past 1-2% rarely helps." },
    ],
  },
  "url-redirect-checker": {
    whatIs: [
      "The URL Redirect Checker follows the full redirect chain for any URL and reports the final status code, number of hops and whether a redirect loop exists.",
      "It is essential for validating 301 migrations, finding soft chains, and auditing links that redirect more than they need to.",
    ],
    howToUse: [
      { title: "Paste up to 10 URLs", desc: "Add one URL per line, or comma separated." },
      { title: "Run the check", desc: "Each URL is followed hop by hop with a per-request timeout." },
      { title: "Inspect the chain", desc: "Expand any URL to see every hop's status and the Location header used." },
    ],
    results: [
      "HTTP status and final URL for every input",
      "Redirect count and full hop chain",
      "Redirect loop and timeout detection",
    ],
    faqs: [
      { q: "How many redirects is too many?", a: "Any chain past two or three hops hurts. Google generally follows chains, but long chains waste crawl budget and slow the first load." },
      { q: "What does a redirect loop mean?", a: "The URL keeps pointing back at itself — usually a misconfigured rule. Search engines will refuse to index it." },
    ],
  },
  "ai-text-humanizer": {
    whatIs: [
      "The AI Text Humanizer rewrites stiff, robotic AI copy into natural prose with varied sentence lengths and rhythm.",
      "It is useful when you want AI-drafted material to read the way a person would write it — before you review and publish.",
    ],
    howToUse: [
      { title: "Paste AI-generated text", desc: "Paste up to 12,000 characters of text you want humanized." },
      { title: "Run the humanizer", desc: "The rewrite is produced by a cloud humanizer service in a few seconds." },
      { title: "Review the output", desc: "Check the rewritten version for tone, meaning and factual accuracy before using it." },
    ],
    results: [
      "A natural-sounding rewrite of your text",
      "Word, sentence, variety and readability stats",
      "Copy or download the humanized version",
    ],
    faqs: [
      { q: "Does it change the meaning?", a: "It is designed to keep meaning intact, but always read the output — automated rewrites can shift subtle facts or tone." },
      { q: "Is the text checked for AI after rewriting?", a: "Not automatically, but you can drop the result into our AI Content Detector to see how the signals changed." },
    ],
  },
  "ai-content-detector": {
    whatIs: [
      "The AI Content Detector estimates how likely a piece of text was written by an AI model, using local stylometric patterns like repetitive phrasing, low vocabulary variety and templated sentence structure.",
      "It runs entirely in the browser plus a small server-side heuristic — no text is sent to any third party.",
    ],
    howToUse: [
      { title: "Choose a mode", desc: "Balanced is the default; aggressive flags more, conservative flags less." },
      { title: "Paste your text", desc: "Paste up to 60,000 characters of text to analyze." },
      { title: "Review the breakdown", desc: "Check the AI/human score, detected patterns and sentence-by-sentence verdicts." },
    ],
    results: [
      "An AI vs. human percentage with a clear verdict",
      "A list of the specific patterns detected",
      "Sentences flagged individually so you can rewrite the worst ones",
    ],
    faqs: [
      { q: "Is the score a guarantee?", a: "No. It is a heuristic estimate — confident human writing can look templated, and edited AI text can pass. Use it as a signal, not a verdict." },
      { q: "Where does my text go?", a: "Analysis is computed locally with deterministic rules. Your text is not sent to external AI services." },
    ],
  },
  "pagespeed-insights": {
    whatIs: [
      "The PageSpeed Insights tool runs Google's Lighthouse audit against your URL and returns performance, accessibility, SEO and best-practices scores for mobile and desktop.",
      "It is a fast way to see a page's Core Web Vitals and the biggest performance risks before investing in optimization.",
    ],
    howToUse: [
      { title: "Enter your URL", desc: "Provide the full URL of the page you want to measure." },
      { title: "Pick the devices", desc: "Choose mobile, desktop, or both. Each runs a separate live audit." },
      { title: "Review the scores", desc: "Read the category scores and the Core Web Vitals fields, then fix the lowest ones." },
    ],
    results: [
      "0-100 scores for performance, accessibility, SEO and best practices",
      "Core Web Vitals: LCP, CLS, FCP, TBT, Speed Index and TTI",
      "Separate mobile and desktop runs",
    ],
    faqs: [
      { q: "How long does a check take?", a: "30-90 seconds per device, because Google runs a real Lighthouse audit in the cloud, not a cached report." },
      { q: "Is the score the same as my real users see?", a: "Lighthouse is lab data on a simulated device. Real field data from Chrome users can differ, so treat lab scores as a strong signal rather than the final truth." },
    ],
  },

  /* ===== Generators ===== */
  "shopify-theme-generator": {
    whatIs: [
      "The Shopify Theme Generator turns an existing website you own into an editable Shopify Online Store 2.0 theme. It detects your hero, featured sections, testimonials and FAQ, then packages them into a working theme archive.",
      "It is the fastest starting point we have for migrating a marketing site into a Shopify store while keeping its design.",
    ],
    howToUse: [
      { title: "Provide your URL", desc: "Enter the URL of the website you own and are authorized to convert." },
      { title: "Review what was detected", desc: "Check which sections — hero, features, testimonials, FAQ — were recognized from your site." },
      { title: "Download the theme", desc: "Download the generated Shopify 2.0 theme archive for one authorized URL." },
    ],
    results: [
      "A packaged Shopify Online Store 2.0 theme",
      "Detection of your existing hero and content sections",
      "A downloadable theme archive for your store",
    ],
    faqs: [
      { q: "Which sites can I convert?", a: "You can convert a site you own and have the rights to reproduce. The tool accepts one authorized URL per conversion." },
      { q: "What is inside the theme?", a: "The archive contains the storefront theme files with your detected sections, colors and structure mapped into Shopify's Liquid templates." },
    ],
  },
  "qr-code-generator": {
    whatIs: [
      "The QR Code Generator creates a scannable QR code from any URL or text in seconds. Print it on a flyer, add it to a product page or drop it into an email signature.",
      "The code is rendered on demand and ready to use immediately.",
    ],
    howToUse: [
      { title: "Enter your text or URL", desc: "Type the link or text the QR code should point to." },
      { title: "Preview the code", desc: "A scannable QR image is generated instantly." },
      { title: "Use it anywhere", desc: "Save or screen-capture the code for your print or digital use." },
    ],
    results: [
      "A working QR code for any URL or text",
      "Instant generation as you type",
      "Ready for print and screen use",
    ],
    faqs: [
      { q: "Will the QR code work offline?", a: "Once generated, the code itself needs no connection. Scanning it opens whatever URL you encoded." },
      { q: "Can a QR hold a lot of text?", a: "QR codes scale with content. Short URLs scan fastest and most reliably, so encode concise links where possible." },
    ],
  },
  "color-palette-generator": {
    whatIs: [
      "The Color Palette Generator builds matching color sets on demand, giving you a cohesive palette for designs, presentations and brand experiments.",
      "Choose a size and the generator returns a harmonious set of swatches with their values.",
    ],
    howToUse: [
      { title: "Choose the size", desc: "Set 2 to 12 colors for your palette." },
      { title: "Generate a palette", desc: "A new set of coordinated hues is produced instantly." },
      { title: "Copy the values", desc: "Grab the color codes and use them in your design tool." },
    ],
    results: [
      "A coordinated color palette on demand",
      "Adjustable palette size",
      "Swatches with ready-to-copy color values",
    ],
    faqs: [
      { q: "Are the palettes harmonious?", a: "The generator distributes hues evenly with a consistent saturation and lightness, producing sets that read as a family." },
      { q: "Can I regenerate until I find one I like?", a: "Yes. Every generation creates a fresh set, so keep generating until one matches your concept." },
    ],
  },
  "gradient-generator": {
    whatIs: [
      "The Gradient Generator builds CSS gradients from two colors and an angle, with the CSS output ready to paste. It turns one of the most common styling tasks into a two-click job.",
      "Pick colors, set the angle and copy the exact CSS declaration.",
    ],
    howToUse: [
      { title: "Pick two colors", desc: "Choose the start and end colors of the gradient." },
      { title: "Set the angle", desc: "Enter the direction the gradient should travel in degrees." },
      { title: "Copy the CSS", desc: "Preview the result and copy the ready-to-use CSS declaration." },
    ],
    results: [
      "A live CSS gradient preview",
      "The exact linear-gradient CSS to paste",
      "Full control over colors and angle",
    ],
    faqs: [
      { q: "Does the gradient render like standard CSS?", a: "Yes. The preview uses the same linear-gradient value you copy, so what you see is what your page will draw." },
      { q: "Can I add more than two colors?", a: "The current version pairs two stops. For multi-stop gradients, extend the copied CSS manually with additional color stops." },
    ],
  },
  "fake-user-generator": {
    whatIs: [
      "The Fake User Generator creates realistic mock user profiles — names, emails, cities and companies — for prototyping, demos and test data.",
      "Each run produces a set of consistent, believable records you can paste straight into a fixture.",
    ],
    howToUse: [
      { title: "Choose a count", desc: "Set how many mock users you need — up to 50." },
      { title: "Generate", desc: "A fresh set of user records is created instantly." },
      { title: "Copy the fixtures", desc: "Export the data as JSON for your prototype or test suite." },
    ],
    results: [
      "Realistic mock user records in seconds",
      "Configurable quantity up to 50",
      "JSON output ready for fixtures",
    ],
    faqs: [
      { q: "Are the generated users real?", a: "No — every name and email is fabricated for test and demo purposes, never derived from real people." },
      { q: "Can I get exactly the same user twice?", a: "No. Data is random per run, which is what you want for varied test coverage." },
    ],
  },
  "random-name-generator": {
    whatIs: [
      "The Random Name Generator produces believable personal names on demand for character lists, placeholders and test cases.",
      "Generate as many as you need in a click and copy them as a list.",
    ],
    howToUse: [
      { title: "Set the count", desc: "Choose how many names to generate, up to 100." },
      { title: "Generate", desc: "A list of random full names appears instantly." },
      { title: "Copy the list", desc: "Copy the names as plain text for your project." },
    ],
    results: [
      "Believable random names on demand",
      "Adjustable list length",
      "Plain-text output you can copy anywhere",
    ],
    faqs: [
      { q: "Are the names culturally varied?", a: "The generator draws from a mixed pool of first and last names, so lists feel natural rather than repetitive." },
      { q: "Can I use these names in production?", a: "They are fictional by construction, but always treat names like any placeholder data and swap in consent-backed real data for production profiles." },
    ],
  },
  "invoice-generator": {
    whatIs: [
      "The Invoice Generator drafts a clean, downloadable invoice from client, service and amount details. It gives freelancers a fast way to produce a presentable record without opening a spreadsheet.",
      "Fill three fields and get a formatted invoice text you can save or email.",
    ],
    howToUse: [
      { title: "Add the client", desc: "Enter the client name the invoice is for." },
      { title: "Describe the service", desc: "Add the service or product line and its amount." },
      { title: "Download", desc: "Review the formatted invoice and download it as a text file." },
    ],
    results: [
      "A clean, formatted invoice draft",
      "Auto-generated invoice number and date",
      "Downloadable text file for sending",
    ],
    faqs: [
      { q: "Is this invoice legally tax-compliant?", a: "It is a draft for record-keeping. Add your tax details, billing address and any regulatory fields required in your country." },
      { q: "Can I edit the amounts later?", a: "Yes — change the fields and the invoice preview re-renders before you download." },
    ],
  },
  "password-strength-checker": {
    whatIs: [
      "The Password Strength Checker scores any password for length, character variety and symbol use, giving you a Weak, Medium or Strong verdict with a visual bar.",
      "Everything is evaluated locally — the password never leaves your keyboard.",
    ],
    howToUse: [
      { title: "Type the password", desc: "Enter the password you want to evaluate." },
      { title: "Read the verdict", desc: "The strength label and progress bar update live." },
      { title: "Adjust accordingly", desc: "Add length and variety until the password reads Strong." },
    ],
    results: [
      "An immediate strength verdict",
      "A visual score matching password best practice",
      "Local evaluation with zero data leaving your device",
    ],
    faqs: [
      { q: "What makes a strong password?", a: "Length above all, combined with upper and lower case, digits and symbols. Every added character multiplies the search space." },
      { q: "Is this password checked anywhere?", a: "No. Scoring runs entirely in your browser, so nothing you type is transmitted." },
    ],
  },

  /* ===== Date & Utility Tools ===== */
  "age-calculator": {
    whatIs: [
      "The Age Calculator works out the exact age — in years, months and days — from any date of birth. It is precise enough for forms, plans and legal documents.",
      "Pick a date and the calculation runs instantly with day-level accuracy.",
    ],
    howToUse: [
      { title: "Pick the birth date", desc: "Select the date of birth using the date picker." },
      { title: "Read the result", desc: "The age is shown as years, months and days in an instant." },
      { title: "Copy if needed", desc: "Copy the computed age for the form or record you are filling in." },
    ],
    results: [
      "Exact age in years, months and days",
      "Calendar-accurate day counting",
      "Copy-ready output",
    ],
    faqs: [
      { q: "Is the age calculation accurate for leap years?", a: "Yes. The calculator accounts for calendar months and leap-day differences instead of using rough 365-day math." },
      { q: "Can it calculate future dates?", a: "It can, which is useful for eligibility dates. Simply pick the relevant date range rather than a past birth date." },
    ],
  },
  "timestamp-converter": {
    whatIs: [
      "The Timestamp Converter translates Unix timestamps into human-readable dates and back. It is the first tool our developers reach for when an API returns 1700000000.",
      "It works in both directions: seconds to a date, and a date to seconds.",
    ],
    howToUse: [
      { title: "Convert timestamp to date", desc: "Paste a Unix timestamp and read the corresponding human date." },
      { title: "Convert date to timestamp", desc: "Pick a date and time to get its seconds-since-epoch value." },
      { title: "Copy what you need", desc: "Copy either result for your code, query or log." },
    ],
    results: [
      "Bidirectional timestamp conversion",
      "Instant results in both directions",
      "Copy-ready values for your code",
    ],
    faqs: [
      { q: "Is this the same as JavaScript Date.now()?", a: "Date.now() returns milliseconds, so divide by 1000 for seconds-based Unix timestamps. Both are supported here — paste accordingly." },
      { q: "Why is my timestamp off by hours?", a: "The converter reads the timestamp in your local timezone. Times near midnight can shift a day when viewed across timezones." },
    ],
  },
  "countdown-timer": {
    whatIs: [
      "The Countdown Timer shows a live, ticking countdown to any date and time you set. Use it for launches, deadlines, events or desk side reinforcement.",
      "The remaining days, hours, minutes and seconds update every second, automatically.",
    ],
    howToUse: [
      { title: "Set the target", desc: "Pick the date and time your countdown should end." },
      { title: "Watch it count", desc: "The remaining time ticks down live, second by second." },
      { title: "Stay on schedule", desc: "Keep the timer visible while you work toward the deadline." },
    ],
    results: [
      "A precise live countdown to any target",
      "Automatic per-second updates",
      "Clear days/hours/minutes/seconds breakdown",
    ],
    faqs: [
      { q: "Does the timer continue after the target passes?", a: "No. Once the time is reached the countdown reads as completed, so you know the moment has arrived." },
      { q: "Is the countdown accurate to real time?", a: "Yes. It syncs to your device clock and recalculates every second." },
    ],
  },
  "time-zone-converter": {
    whatIs: [
      "The Time Zone Converter shows what a local date and time looks like in another time zone. It ends the mental math when scheduling calls, launches and deadlines across teams.",
      "Pick the time and target zone, and the converted reading appears instantly.",
    ],
    howToUse: [
      { title: "Set the local time", desc: "Enter the date and time you are scheduling." },
      { title: "Pick the target zone", desc: "Choose from major zones such as UTC, Asia/Kolkata, New York, London, Tokyo and Sydney." },
      { title: "Read the result", desc: "The exact equivalent in the target time zone is shown and ready to copy." },
    ],
    results: [
      "An exact time across major world zones",
      "Full date formatting with AM/PM clarity",
      "Copy-ready scheduling output",
    ],
    faqs: [
      { q: "Does it handle daylight saving?", a: "Yes. Conversion uses the platform's timezone database, which reflects DST rules for each selected zone." },
      { q: "Which zones are supported?", a: "The preset list covers the most common global hubs, and UTC is always available as the neutral reference." },
    ],
  },
  "unit-converter": {
    whatIs: [
      "The Unit Converter translates between length, weight and temperature units instantly. It is a one-stop conversion for estimates, recipes, specs and quick math.",
      "Choose a category, enter a value and pick from/to units — the answer appears immediately.",
    ],
    howToUse: [
      { title: "Pick a category", desc: "Choose length, weight or temperature from the dropdown." },
      { title: "Enter the value", desc: "Type the number you want to convert." },
      { title: "Select from and to", desc: "Choose the source and target units to get the result." },
    ],
    results: [
      "Instant conversions across three unit categories",
      "Common real-world units in each set",
      "Copy-ready numeric results",
    ],
    faqs: [
      { q: "Which units are included?", a: "Length covers meters, kilometers, centimeters, miles and feet; weight covers kilograms, grams, pounds and ounces; temperature covers Celsius, Fahrenheit and Kelvin." },
      { q: "Is the conversion accurate?", a: "Yes — the tool uses standard conversion factors, so results match authoritative references to normal precision." },
    ],
  },
};

/* ===== Category-level content (trust, speed & scale, factors, mission) ===== */

const CATEGORY_BASE: Record<ToolCategoryId, CategoryBase> = {
  "developer-tools": {
    verified: [
      { title: "Built by working developers", desc: "Every tool in this suite is exercised by the W3Tech engineering team that ships production software every week." },
      { title: "Deterministic and transparent", desc: "Outputs are produced by real code you can reason about — no black boxes, hidden sampling or stale caches." },
      { title: "Private by design", desc: "Processing happens locally in your browser. Your code, tokens and payloads are never uploaded." },
      { title: "Maintained like client work", desc: "Updates ship with the same discipline as W3Tech's production projects, not as an abandoned side experiment." },
    ],
    features: [
      { title: "Instant feedback", desc: "Results update as you type or click, keeping your flow unbroken." },
      { title: "Copy-friendly output", desc: "Every result can be copied to your clipboard or downloaded in one action." },
      { title: "No sign-up wall", desc: "Open, use, close. No accounts are required to use any tool." },
      { title: "Free forever", desc: "No trials, no premium tiers and no usage caps. Ever." },
    ],
    speedScale: [
      { title: "Sub-second results", desc: "Deterministic local processing returns output the moment you act." },
      { title: "Unlimited runs", desc: "There are no daily limits, quotas or reasoning about how many checks you have left." },
      { title: "Zero setup", desc: "No install, no compile step and no environment — it just works in the browser." },
    ],
    ranking: [
      "The sites that rank best on technical complexity are the ones that keep their codebase clean. Validated JSON, minified CSS and compressed JavaScript mean faster downloads, fewer broken builds and lower bounce rates — all of which search engines read as quality signals.",
      "Run code through these utilities as a daily habit and the slow accumulation of small wins — a few kilobytes here, a validated deploy there — keeps your engineering velocity ahead of competitors who skip them.",
    ],
    beatCompetitors: [
      { title: "Measure your baseline", desc: "Feed the same snippet through the formatter, minifier or validator to see exactly what a clean pass produces." },
      { title: "Build quality into the loop", desc: "Add the output to your dev workflow so every deploy ships lean, validated code — not just the days you remember." },
      { title: "Out-ship the field", desc: "Faster iterations and smaller assets compound into a release cadence most competitors cannot match." },
    ],
    mission: [
      "W3Tech ships production websites, platforms and stores for clients every day, and this tool suite is the internal utility belt for that work. We are publishing it free because the accelerators our team relies on should not cost hundreds of dollars a month.",
      "Small teams and independent developers lose the most to paywalled tooling. Our mission is to level the field with tools that are fast, trustworthy and genuinely free.",
    ],
  },
  "text-tools": {
    verified: [
      { title: "War-tested by content teams", desc: "These tools run in W3Tech's own editorial and SEO workflow before a single piece of client content ships." },
      { title: "Predictable and exact", desc: "Counts, conversions and diffs are computed deterministically — the same input always gives the same output." },
      { title: "Nothing leaves your browser", desc: "Your drafts, lists and documents are processed locally and never uploaded." },
      { title: "Standards that stay current", desc: "The tools follow the same formatting and counting rules publishers and platforms actually use." },
    ],
    features: [
      { title: "Live updates", desc: "Counts and previews recalculate on every keystroke." },
      { title: "Copy wherever you work", desc: "Every result is one click from your clipboard." },
      { title: "No accounts to juggle", desc: "Open the tab, paste your text, and move on." },
      { title: "Unlimited and free", desc: "No word caps, no premium tiers and no sign-up gates." },
    ],
    speedScale: [
      { title: "Instant as you type", desc: "Every tool reacts live, so there is nothing to wait on or submit." },
      { title: "Handles long documents", desc: "Local processing means even a full manuscript runs without slowing down." },
      { title: "Refresh-friendly", desc: "Close the tab and paste again anytime — the tools are always ready." },
    ],
    ranking: [
      "Content clarity is a ranking factor in disguise. Pages that are well-structured, correctly formatted and comfortably within length targets hold readers longer, reduce bounce rates and get shared more — signals Google rewards.",
      "Run a draft through the counter and case converters before publishing and you catch the small inconsistencies that make polished content look amateur. Consistency is what separates content that ranks from content that sinks.",
    ],
    beatCompetitors: [
      { title: "Audit their output", desc: "Run competing pages through the counter and diff tools to see what length and structure they are publishing." },
      { title: "Raise your bar", desc: "Produce cleaner, better-scoped and more consistent copy than the current top result." },
      { title: "Rinse and repeat every week", desc: "Publishing better-structured content on a cadence beats occasional half-efforts every time." },
    ],
    mission: [
      "W3Tech's editorials and client content are produced with these exact utilities. We built them free because the basics of writing well — counting, converting and comparing — should never live behind a subscription.",
      "Our mission is simple: give writers and marketers the same quality tooling our team uses, for free, with nothing uploaded and nothing tracked.",
    ],
  },
  "image-tools": {
    verified: [
      { title: "Tuned on real client sites", desc: "Every image utility is used in W3Tech projects, where image bloat is one of the first performance issues we eliminate." },
      { title: "Local, private processing", desc: "Images are handled by the browser canvas — your files are never uploaded to a server." },
      { title: "Transparent results", desc: "What you see on the preview is exactly the file you download." },
      { title: "Built on maintained APIs", desc: "The tools rely on mature browser standards, so they keep working as the platform evolves." },
    ],
    features: [
      { title: "Format flexibility", desc: "Compress, resize, convert, crop and more in one place." },
      { title: "Download-ready output", desc: "Every result is previewed and downloaded in one click." },
      { title: "No sign-up friction", desc: "Drop in a file, get a result. There is no account gate." },
      { title: "Free with no caps", desc: "Unlimited processing with no watermark and no premium tier." },
    ],
    speedScale: [
      { title: "Browser-fast", desc: "No upload round-trips — processing starts the instant your file is selected." },
      { title: "Batch-friendly", desc: "Run as many images as you like with no daily quota." },
      { title: "Zero install", desc: "Everything works in the tab you already have open." },
    ],
    ranking: [
      "Image weight is one of the most common reasons pages fail Core Web Vitals. Compressing, resizing and converting your images directly improves LCP and CLS — thresholds Google uses to evaluate rankings.",
      "Sites that ship lean, correctly-formatted images across every page consistently beat heavier competitors in performance scores. It is one of the cheapest ranking wins available.",
    ],
    beatCompetitors: [
      { title: "Audit every visual", desc: "Run the site's images through the compressor and converter to see the weight gap." },
      { title: "Ship optimized assets", desc: "Replace oversized originals with correctly sized WebP or compressed JPG files." },
      { title: "Reclaim the speed lead", desc: "A faster, lighter site flips bounce rates and Core Web Vitals in your favour." },
    ],
    mission: [
      "Almost every W3Tech project starts with an image-weight clean-up, so we built the tools we reach for daily — and are giving them away. Compressing photos should be free, local and instant.",
      "Our mission is to remove the most common performance excuse there is: images too heavy to fix. Do it here, in seconds, without uploading a single file.",
    ],
  },
  "pdf-tools": {
    verified: [
      { title: "Used in client delivery", desc: "These utilities power W3Tech's own document workflows, from proposals to signed contracts." },
      { title: "Handled locally", desc: "Document processing runs in your browser with a mature client-side PDF engine." },
      { title: "Originals preserved", desc: "Every operation creates a new file — your source document is never modified." },
      { title: "Clear, honest output", desc: "Results report exactly what happened, including size savings and page counts." },
    ],
    features: [
      { title: "Core document operations", desc: "Merge, split, extract, compress, convert and more in one toolset." },
      { title: "Flexible page selection", desc: "Ranges and comma syntax let you target exact pages." },
      { title: "Instant feedback", desc: "See file sizes, page counts and savings the moment you act." },
      { title: "No account required", desc: "Select a file, run an action, download. That is the entire flow." },
    ],
    speedScale: [
      { title: "Start-of-process speed", desc: "No upload past your local machine, so operations begin immediately." },
      { title: "Any document size your device handles", desc: "Because there is no server cap, the limit is your hardware rather than a quota." },
      { title: "Endless runs", desc: "Process as many documents as you need with no daily limits." },
    ],
    ranking: [
      "PDFs are how businesses publish proposals, reports and documents, but heavy unoptimized files slow down the pages that host them. Squeezing them with the compressor keeps downloadable assets fast — a small but real performance signal on resource pages.",
      "Fast, accessible document flows also reduce friction for users, and sites that make documents painless to access earn lower bounce rates and more repeat visits, both of which help visibility.",
    ],
    beatCompetitors: [
      { title: "Audit the paperwork", desc: "Pull the documents competitors publish and check their sizes and structure." },
      { title: "Deliver lean files", desc: "Compress, merge and split your documents so every asset your audience downloads is fast." },
      { title: "Win on experience", desc: "Smooth, instant document experiences quietly outperform clunky file deliveries." },
    ],
    mission: [
      "Every W3Tech proposal and contract passes through PDF tooling before it reaches a client. We built this suite free because document work should not require an expensive desktop license or janky upload-and-wait services.",
      "Our mission is to make professional document handling as simple as a browser tab — fast, private and free for anyone who deals with PDFs every day.",
    ],
  },
  "seo-tools": {
    verified: [
      { title: "Powering live campaigns", desc: "These tools run in real W3Tech SEO projects, where the numbers feed actual client rankings and link building." },
      { title: "Informed by practice", desc: "The recommendations mirror what our SEO team implements on live sites every week." },
      { title: "Fresh when you need it", desc: "Checks run against live inputs on demand rather than stale, pre-computed databases." },
      { title: "Built for professionals and beginners", desc: "The same data pros use, presented without the gatekeeping." },
    ],
    features: [
      { title: "Actionable output", desc: "Every result is something you can act on — markup to paste, files to upload, scores to compare." },
      { title: "Bulk where it counts", desc: "Run up to 10 URLs or a full sitemap list in a single pass." },
      { title: "No login wall", desc: "No accounts, no email capture, no trial countdown." },
      { title: "Genuinely free", desc: "No premium tiers holding the useful data hostage." },
    ],
    speedScale: [
      { title: "Answers in seconds", desc: "Most tools return results faster than you can refill a coffee." },
      { title: "Built for bulk work", desc: "Competitor lists, sitemaps and URL batches are handled in one go." },
      { title: "Unlimited sessions", desc: "Run as many checks as your audit demands — nothing is capped." },
    ],
    ranking: [
      "Ranking is decided by signals: technical health, content relevance, authority and speed. These tools target every one of them — markup you can validate, crawl files you can submit, authority you can compare and density you can sanity-check.",
      "The sites that outrank consistently are not the ones with a single clever win. They are the ones that stay disciplined across the whole checklist. That is precisely what this suite enforces.",
    ],
    beatCompetitors: [
      { title: "Map their strengths", desc: "Run competitor URLs through the checker and sitemap tools to understand their on-page setup." },
      { title: "Find the gaps", desc: "Compare authority, density and structure to spot where they are most beatable." },
      { title: "Execute the fix list", desc: "Turn what the tools reveal into a prioritized change plan and ship it faster than they react." },
    ],
    mission: [
      "Most professional SEO software costs hundreds of dollars a month — the same money small businesses should be spending on their product. W3Tech built these tools for its own client work and is releasing them free to level the playing field.",
      "Our mission is to give every business access to the same analysis the pros use, without the gatekeeping, sign-ups or premium pricing.",
    ],
  },
  generators: {
    verified: [
      { title: "Ships real output", desc: "Every generator produces actual artifacts — a theme archive, a QR code, a palette, an invoice — not placeholders that need rebuilding." },
      { title: "Created for real projects", desc: "Each generator fills a gap the W3Tech team hit while building client sites." },
      { title: "Private and local", desc: "Generation runs in your browser, so your inputs never leave your device." },
      { title: "Continuously improved", desc: "New formats and options are added from real production feedback." },
    ],
    features: [
      { title: "Instant artifacts", desc: "Q R codes, themes, palettes, and documents appear the moment you configure them." },
      { title: "Copy and download built in", desc: "Every output is designed to move into your workflow in one step." },
      { title: "Freedom to regenerate", desc: "Watch, tweak and re-run until the output matches your intent." },
      { title: "Free with no limits", desc: "No credits, no watermarks and no premium accounts." },
    ],
    speedScale: [
      { title: "Generate on demand", desc: "Every run produces fresh output instantly, as many times as you like." },
      { title: "Scales to your batch", desc: "Multiples — colors, users, names, codes — are configurable in one pass." },
      { title: "Zero setup", desc: "Nothing to install or configure before the first generation." },
    ],
    ranking: [
      "Fresh, useful and original assets keep a page sticky — visitors generate, download and return, and returning users are one of the strongest engagement signals for earned visibility.",
      "Shareable artifacts also spread naturally: a palette, a code or a generated asset used in someone's project links back to the tool, growing authority the way a good resource page should.",
    ],
    beatCompetitors: [
      { title: "Produce what they lack", desc: "Use the generators to create assets your competitors do not offer on their pages." },
      { title: "Make it embeddable", desc: "Every artifact is copy-and-download ready, so it slots into content or designs immediately." },
      { title: "Own the repeat visitors", desc: "A generator people return to earns engagement your competitors cannot rent." },
    ],
    mission: [
      "Every generator in this suite came from a real request the W3Tech team had while building sites — a theme to convert, a code to print, an invoice to send. We believe tools that create things should be free to use.",
      "Our mission is to put genuinely useful generators in front of everyone, free, so the small wins they provide are accessible to all — not gated behind a medium-sized logo account.",
    ],
  },
  "date-utility-tools": {
    verified: [
      { title: "Used in daily planning", desc: "From scheduling launches to converting timestamps in code, these utilities run in W3Tech's own workflows." },
      { title: "Calendar-accurate", desc: "Calculations handle months, leap days and time zones using real calendar rules, not rough math." },
      { title: "Instant local processing", desc: "Everything runs in your browser with nothing uploaded." },
      { title: "Simple to verify", desc: "Every result can be cross-checked by hand, because there is nothing hidden in the math." },
    ],
    features: [
      { title: "Two-way conversions", desc: "Timestamps and time zones convert in both directions with live output." },
      { title: "Precision you can copy", desc: "Results include full date context and copy buttons." },
      { title: "No account required", desc: "Open, calculate, close. There is no profile to create." },
      { title: "Free without limits", desc: "Run as many calculations as your day demands." },
    ],
    speedScale: [
      { title: "Instant math", desc: "Every conversion and count displays the moment the input changes." },
      { title: "Real-time countdowns", desc: "Timers tick down live, second by second." },
      { title: "No usage caps", desc: "Unlimited calculations on your own schedule." },
    ],
    ranking: [
      "Date-themed pages and content with accurate time information rank on their own merit — event pages, product launches and deadlines rely on correct, trustworthy dates, and accuracy builds the trust that drives clicks.",
      "Tools like these keep a site practically useful, and utility pages with genuine function attract links and return visits — the classic ingredients of a resource that ranks.",
    ],
    beatCompetitors: [
      { title: "Publish time-aware content", desc: "Use accurate converters and timers to publish schedulable, deadline-driven content readers actually rely on." },
      { title: "Make dates easy", desc: "Remove the friction of timezone math or counting ages where your competitors make users guess." },
      { title: "Keep it right", desc: "Accurate, well-maintained time tools quietly outlast sloppier competitor pages." },
    ],
    mission: [
      "Dates, timezones and deadlines trip up every team — including ours. W3Tech built these utilities to stop doing timezone math in our heads and to ship launch counts we could trust.",
      "Our mission is to keep the everyday numbers of running a business or a project accurate and free, in the open browser, with nothing required from you but the values.",
    ],
  },
};

function universalFaqs(tool: ToolItem): InsightFaq[] {
  return [
    { q: `Is the ${tool.title} really free?`, a: "Yes. Every W3Tech tool is 100% free — no trials, no premium tier and no hidden limits. It will stay that way." },
    { q: "Do I need an account or login?", a: "No. Tools run directly on this page with no sign-up, no email capture and no profile to create." },
    { q: "Is my data stored anywhere?", a: "No. Processing happens in your browser and nothing you enter is uploaded or saved to any server." },
    { q: "Does it work on any device?", a: "Yes. As long as you are in a modern browser, the tool works on desktop, tablet and mobile." },
  ];
}

function fallbackInsights(tool: ToolItem): ToolInsights {
  const title = tool.title;
  return {
    whatIs: [
      `The ${title} is a free W3Tech tool that helps you ${tool.description.toLowerCase()} It runs entirely in your browser — no account, no install and no charge for anything.`,
      `We built it because the workflow it solves comes up constantly in our own client work, and there was no reason it should cost money or time to solve.`,
    ],
    howToUse: [
      { title: `Open ${title}`, desc: "Use the playground above. Enter whatever input the tool needs — text, a URL or a file." },
      { title: "Run the action", desc: "Click the primary button and the tool processes your input instantly." },
      { title: "Grab your result", desc: "Copy or download the output. Nothing you ran is stored anywhere." },
    ],
    results: [
      `Accurate ${title} output in seconds`,
      "One-click copy or download of every result",
      "Private processing with nothing uploaded",
    ],
    faqs: [],
  };
}

export function getToolInsights(tool: ToolItem): { insights: ToolInsights; base: CategoryBase } {
  const custom = PER_TOOL[tool.slug] ?? fallbackInsights(tool);
  const customQuestions = new Set(custom.faqs.map((f) => f.q));
  const faqs = [...custom.faqs, ...universalFaqs(tool).filter((f) => !customQuestions.has(f.q))];
  return {
    insights: { ...custom, faqs },
    base: CATEGORY_BASE[tool.category],
  };
}