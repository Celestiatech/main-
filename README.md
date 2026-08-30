# W3Tech — Premium IT & Software Development Company

Official website for [W3Tech](https://www.w3tech.co.in) — an elite IT solutions company specialising in web development, mobile apps, AI solutions, and blockchain technology.

Built with [Next.js](https://nextjs.org), TypeScript, and Tailwind CSS.

## Getting Started

Install dependencies:

```bash
npm install
```

Configure the environment:

```bash
cp .env.example .env
```

Fill in the SMTP values — the contact and career forms deliver by email and
this project keeps no database, so they need a working mailbox.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **3D / Animation**: Three.js, React Three Fiber, GSAP, Lenis
- **Storage**: none — the site is stateless
- **Email**: Nodemailer (form submissions are emailed, not stored)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/          # Next.js App Router pages and API routes
├── components/   # Shared React components
├── fonts/        # Self-hosted font files
├── hooks/        # Shared React hooks
└── lib/          # Utilities, metadata, structured data, types
docs/
├── getting-started/  # Setup and first-run guides
├── design/           # Brand guidelines and design summaries
├── styling/          # Tailwind and CSS references
├── images/           # Pixabay / image pipeline guides
├── planning/         # Roadmaps, TODOs, page inventory
├── status/           # Build verification and completion reports
└── archive/          # Docs for features no longer in the project
legacy/           # Standalone reference code, not part of the build
public/           # Static assets served at the site root
scripts/          # Python helpers for image downloads
```

## Deploy on Vercel

The recommended deployment platform is [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
