# Adrian James Magisa — Portfolio

Static portfolio site built with **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**. Configured for **static export** and deployment on **Vercel**.

## Develop locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build static site

```bash
npm run build
```

Output is written to the `out/` folder (`output: "export"` in `next.config.ts`).

## Deploy on Vercel

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (defaults are fine).
4. Build command: `npm run build` — Vercel serves the static export automatically for this config.

Alternatively, deploy from the CLI:

```bash
npx vercel
```

## Resume PDF

Generate a PDF resume from the same data as the site (includes your portfolio URL):

```bash
npm run resume
```

Output: `public/Adrian_James_Magisa_Resume.pdf` (served at `/Adrian_James_Magisa_Resume.pdf` after deploy).

## Cover letter PDF

```bash
npm run cover-letter
```

Output: `public/Adrian_James_Magisa_Cover_Letter.pdf`. Regenerate both with `npm run documents`.

Live site: [adrianjamesmagisa.vercel.app](https://adrianjamesmagisa.vercel.app/)

## Customize content

Edit `src/data/portfolio.ts` for bio, jobs, projects, skills, education, and certifications. Replace images under `public/images/`. Re-run `npm run resume` after content changes.
