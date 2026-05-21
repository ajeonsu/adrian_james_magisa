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

## Customize content

Edit `src/data/portfolio.ts` for bio, jobs, projects, skills, education, and certifications. Replace images under `public/images/`.
