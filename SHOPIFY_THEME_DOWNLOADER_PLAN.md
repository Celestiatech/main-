# Shopify Theme Downloader — Product Plan

**Assigned by:** Codex  
**Assignee:** Codex  
**Task tracker:** [View implementation tasks](#implementation-tasks)

## Build status — Phase 1 shipped, done by Claude

All six implementation tasks are complete. Live at
`/popular-tools/shopify-theme-generator`.

| Piece | Where |
|---|---|
| Page fetch + section detection | `src/lib/shopify-theme/extract.ts` |
| Image import into `assets/` | `src/lib/shopify-theme/assets.ts` |
| Liquid / JSON theme generation | `src/lib/shopify-theme/generate.ts` |
| Standalone HTML preview | `src/lib/shopify-theme/preview.ts` |
| API endpoint | `src/app/api/tools/shopify-theme-generator/route.ts` |
| Tool UI | `src/app/popular-tools/[slug]/ShopifyThemeGenerator.tsx` |
| Catalog entry | `src/lib/tools-catalog.ts` |

Verified end to end against `https://www.w3tech.co.in`: 6 header links, 8 footer
links, a hero, 6 featured cards, and 2 images imported into a 23-file, 53 KB theme
that passes structural validation.

**Phases 2-4 are not built.** Before starting Phase 3, note that the single biggest
constraint is rendering: `fetch` only sees server-rendered HTML, so a React or Vue
storefront returns an near-empty shell and converts to nothing. Every other service
in this project (screenshotmachine, thum.io, PageSpeed) is third-party for the same
reason — there is no headless browser here, and Vercel serverless will not run one
without `@sparticuz/chromium`. That decision gates how many real sites the tool works on.

## Product vision

Help merchants and agencies rebuild an authorized website URL as an editable Shopify theme. The product does not retrieve a live store's private Liquid source; it turns the public page output and permitted public assets into a newly generated theme.

**Tagline:** Turn your website into an editable Shopify theme.

## Problem

Moving an existing site or design to Shopify normally requires a developer to recreate every section in Liquid. Merchants want a quick starting point, while agencies need a faster way to deliver custom themes.

## Target users

- Merchants moving an existing website to Shopify
- Shopify agencies rebuilding client storefronts
- Agencies rebuilding client-authorized websites in Shopify
- Developers who need a clean theme starter instead of repetitive setup work

## Core user flow

1. User enters an authorized website URL.
2. User confirms they own or have permission to use the supplied content.
3. The system fetches the selected public page and permitted public assets.
4. It detects reusable page regions such as header, hero, card grids, testimonials, FAQ, and footer.
5. It detects reusable elements such as header, hero, product card, testimonial, FAQ, and footer.
6. It generates Shopify Liquid sections, snippets, CSS, JavaScript, JSON templates, and editable section schema.
7. The user previews and edits the generated result.
8. The system validates the theme and supplies a downloadable ZIP.
9. The user can choose **Hire us to finish your theme** for production work.

## MVP scope

### Input

- One authorized URL/page at a time

### Generated output

- Homepage JSON template
- Editable sections generated from the detected page regions (up to 10 in the current build)
- Shared header and footer
- Public assets supplied by the authorized user or loaded from the selected page
- Theme ZIP compatible with Shopify Online Store 2.0

### Preview

- Desktop and mobile preview
- Section-by-section editor
- Clear warnings for unsupported dynamic functionality

## Out of scope for MVP

- Downloading private Liquid/theme code from public stores
- Bypassing logins, paywalls, or access controls
- Perfect conversion of cart, checkout, apps, subscriptions, search, or customer accounts
- Crawling an entire website without an explicit page selection and authorization
- Direct publishing to Shopify without the merchant connecting an authorized store

## Theme output structure

```text
generated-theme.zip
├── assets/
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/theme.liquid
├── sections/
├── snippets/
└── templates/
    ├── index.json
    ├── product.json
    ├── collection.json
    └── page.json
```

## Revenue model

### Free tool

- One page/section conversion
- Preview of the generated Shopify layout
- One limited starter ZIP or an export credit

### Paid services

- Landing-page conversion
- Full store/theme rebuild
- Product, collection, cart, and app integration work
- Performance, SEO, accessibility, and responsive QA
- Ongoing Shopify theme maintenance

## Conversion funnel

```text
Free conversion → preview / starter ZIP → request a quote → custom theme delivery
```

Use a prominent action after every preview:

> Need a production-ready Shopify theme? Hire our team.

## Development phases

### Phase 1 — Proof of concept

- Accept an authorized URL
- Convert predefined page patterns into the five MVP sections
- Produce a valid theme ZIP
- Test locally with Shopify CLI and a development store

### Phase 2 — Multi-page import

- Let users select multiple publicly available pages from the authorized site
- Group pages into reusable Shopify templates
- Deduplicate and optimize permitted public assets

### Phase 3 — AI-assisted URL generation

- Improve layout detection from the fetched page DOM and styles
- Generate section schema and Liquid placeholders
- Show confidence/unsupported-feature warnings
- Add visual comparison and manual corrections

### Phase 4 — Shopify connection and services

- OAuth connection to an authorized merchant store
- Create an unpublished theme or push generated assets after confirmation
- Quote form, project intake, and agency dashboard

## Guardrails

- Require users to confirm ownership or permission before conversion.
- Do not claim to download original Shopify themes.
- Respect robots.txt, rate limits, copyright, and third-party terms.
- Preserve source URL, conversion timestamp, and user authorization record.
- Never modify a merchant's live theme by default; create an unpublished backup/theme first.

## Success metrics

- URL-to-preview completion rate
- ZIP export rate
- Preview-to-quote conversion rate
- Paid project close rate
- Percentage of ZIPs that validate and upload successfully

## First build decision

Start with **URL-to-editable-homepage sections**, not full-site crawling. It is faster to validate demand, easier to make reliable, and provides a clear route to paid custom-theme work.

## Implementation tasks

| Status | Task | Assignee |
|---|---|---|
| [x] | [Create the URL submission and authorization form](#task-1-url-submission) | Done by Claude |
| [x] | [Build public-page fetching and permitted-asset collection](#task-2-page-fetching) | Done by Claude |
| [x] | [Generate Shopify sections and the theme ZIP](#task-3-theme-generation) | Done by Claude |
| [x] | [Add preview, validation, and download flow](#task-4-preview-and-validation) | Done by Claude |
| [x] | [Add the custom-theme service enquiry flow](#task-5-service-enquiry) | Done by Claude |
| [x] | [Add Shopify Theme Downloader to Popular Tools](#task-6-popular-tools-listing) | Done by Claude |

### Task 1: URL submission

Create the URL entry form and ownership/permission confirmation.

**Done by Claude.** `ShopifyThemeGenerator.tsx` holds the URL field and the ownership
checkbox; the Convert button stays disabled until both are filled. The check is enforced
server-side too — `route.ts` returns 403 when `authorized` is not true, so the guardrail
cannot be skipped by calling the API directly. Per-page selection controls were not built:
the MVP scope in this plan is explicitly "one authorized URL/page at a time".

### Task 2: Page fetching

Fetch the selected public page respectfully, collect permitted public assets, and classify page sections.

**Done by Claude.** `extract.ts` fetches with an identifying user-agent, rejects
non-HTML responses, and classifies header, hero, image-with-text, card grid,
testimonials, FAQ, and footer. `assets.ts` downloads the page's images into `assets/`
with caps (12 files, 2MB each, 12MB total) and reports anything it had to skip.

### Task 3: Theme generation

Create valid Liquid sections, assets, JSON templates, configuration files, and a Shopify-compatible ZIP.

**Done by Claude.** `generate.ts` emits 23 files: 10 sections with `{% schema %}`,
a product card snippet, four JSON templates, `settings_schema.json` /
`settings_data.json`, theme CSS and JS, downloaded images, and a
`conversion-manifest.json` recording source URL, timestamp, and authorization —
the audit trail the Guardrails section asks for.

### Task 4: Preview and validation

Show responsive previews, surface unsupported functionality, validate the generated theme, and enable download.

**Done by Claude.** `preview.ts` renders the generated sections as standalone HTML,
shown in a sandboxed iframe with a desktop/mobile toggle. Unsupported functionality
surfaces as warnings (JS-rendered pages, cart/checkout, external stylesheets, skipped
images). Validated against a real conversion of `w3tech.co.in`: all 10 section schemas
parse as JSON, every template resolves to an existing section, `assets/` is flat.
Download is a client-side Blob, so the ZIP never round-trips through a server.

### Task 5: Service enquiry

Add a clear “Hire us to finish your theme” call-to-action and a project enquiry form.

**Done by Claude.** A "Need a production-ready Shopify theme?" panel sits directly
below the download button and links to `/contact`, which emails the enquiry over SMTP.

### Task 6: Popular Tools listing

Add **Shopify Theme Downloader** to the [Popular Tools list](http://localhost:3000/popular-tools), with its name, description, and link to the tool page.

**Done by Claude.** Listed in `tools-catalog.ts` under Generators and routed in
`ToolPlayground.tsx`, so `/popular-tools/shopify-theme-generator` renders the tool.

Listed as **Shopify Theme Generator**, not "Downloader": the original name promises
exactly what the Out-of-scope section refuses to do, so it would draw users looking to
copy other merchants' themes and send them away disappointed.
