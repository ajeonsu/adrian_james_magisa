export const site = {
  name: "Adrian James Magisa",
  title: "Software Engineer",
  location: "Science City of Muñoz, Nueva Ecija, Philippines",
  email: "ajeonicpsycho@gmail.com",
  phone: "0955-402-7884",
  summary:
    "Software engineer building production web apps, backend integrations, and cloud operations. Experience spans CyberConnect’s bilingual delivery platform, EC ONE’s multi-channel CRM, AI strategy tooling with Gemini, IoT capstone work, automation scrapers, and AWS maintenance for Saga Keiba.",
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  companyUrl?: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "CyberConnect Co., Ltd.",
    companyUrl: "https://cyberconnect.co.ltd",
    period: "Dec 2024 – Present",
    highlights: [
      "Build and maintain CyberConnect: a multi-tenant, bilingual (EN/JA) workspace for requirements, screens, functions, tasks, tests, APIs, and schedules.",
      "Next.js App Router, TypeScript, Tailwind, Supabase (PostgreSQL, Auth, RLS), sheet import/export, and role-based dashboards.",
      "Delivered AIO/LLMO Strategy OSINT Analyzer (Firebase Auth, Next.js API, Gemini, Firestore) for AI-search brand strategy reports.",
      "Internal tooling: CrowdWorks job scraper (Playwright) with CSV merge and Google Drive upload for team lead gen.",
    ],
  },
  {
    role: "Software Developer (Backend)",
    company: "EC ONE — Multi-channel E-commerce Platform",
    period: "Professional project",
    highlights: [
      "Backend CRM: customer segments, email and LINE campaigns, behavior analytics, and delivery workflows.",
      "Integrations across Email, LINE, Rakuten, Meta, and marketplace/ad platforms via Supabase Edge Functions (~97 functions).",
      "PostgreSQL schema, RLS, cron automation, and tenant dashboards—one of my strongest shipped systems.",
    ],
  },
  {
    role: "Software Engineer (AWS Operations & Maintenance)",
    company: "Saga Keiba (佐賀競馬) — sagakeiba.net",
    companyUrl: "https://www.sagakeiba.net/",
    period: "Ongoing engagement",
    highlights: [
      "Cloud/ops engineer for production WordPress/CMS on AWS (Tokyo): EC2, EBS, ALB, CloudWatch, AWS Backup, SNS.",
      "Monthly server-side backups, alarm investigation (CPU, unhealthy targets), and client-ready maintenance reporting.",
      "IAM coordination for least-privilege viewer access; cost and architecture documentation for stakeholders.",
    ],
  },
  {
    role: "Special Program for the Employment of Students (SPES)",
    company: "Department of Agriculture — Science City of Muñoz",
    period: "Recent",
    highlights: [
      "Supported government agricultural programs with data encoding and admin operations.",
      "Coordinated with stakeholders and maintained organized, efficient task delivery.",
    ],
  },
];

export type ProjectItem = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  image?: string;
  role?: string;
};

export const projects: ProjectItem[] = [
  {
    name: "CyberConnect Platform",
    tagline: "Bilingual requirements & task management",
    role: "Software Engineer @ CyberConnect",
    image: "/images/cyberconnect-platform.png",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "PostgreSQL RLS",
      "SheetJS",
    ],
    description:
      "Multi-tenant project workspace for delivery teams: bilingual spreadsheet-style sheets for purpose, screens, functions, tasks, test cases, APIs, backlog, and schedule views. Team/personal workspaces, invite codes, Excel/CSV import with conflict resolution, and PM/dev/client RBAC enforced in Postgres.",
  },
  {
    name: "AIO/LLMO Strategy OSINT Analyzer",
    tagline: "AI search & LLM optimization strategy reports",
    role: "Software Engineer @ CyberConnect",
    image: "/images/ai-strategy-studio.png",
    stack: [
      "Next.js API",
      "Vite",
      "React",
      "Firebase Auth",
      "Firestore",
      "Gemini",
      "Cheerio",
    ],
    description:
      "Full-stack OSINT-style analyzer for how brands should optimize for AI-mediated search (AIO/LLMO). Users sign in with Firebase (email or Google); the API validates tokens, scrapes official URLs, calls Gemini with a fixed consultant prompt, returns Markdown reports, and persists runs to Firestore when configured.",
  },
  {
    name: "EC ONE",
    tagline: "マルチチャネルEC統合 — orders, CRM, ads, P&L",
    role: "Software Developer (Backend)",
    image: "/images/ec-one.png",
    stack: [
      "Next.js 14",
      "Supabase",
      "PostgreSQL",
      "Edge Functions (Deno)",
      "CRM",
      "LINE",
      "Rakuten",
      "Meta",
      "SendGrid",
    ],
    description:
      "B2B SaaS for Japanese and multi-channel e-commerce: unified dashboard for orders, inventory, advertising, CRM, and profit & loss. I contributed backend CRM work and channel integrations (email, LINE, Rakuten, Meta) across a large Edge Function surface and tenant RBAC.",
  },
  {
    name: "GROWTHetect",
    tagline: "DepEd student growth & BMI monitoring",
    role: "Backend & database (capstone)",
    image: "/images/growthetect.png",
    stack: [
      "Next.js 14",
      "Supabase",
      "JWT",
      "Arduino bridge",
      "IoT sensors",
      "jsPDF",
    ],
    description:
      "Capstone conversion from legacy PHP: nutritionist and administrator portals for BMI tracking, feeding programs, CSV/PDF reports, and optional IoT capture (ultrasonic height, load cell, RFID) via a local Node serial bridge posting to `/api/arduino-bridge`. Deployed example: capstone-growthetect.vercel.app.",
  },
  {
    name: "CrowdWorks Job Scraper",
    tagline: "Automated freelance listing intelligence",
    role: "Software Engineer @ CyberConnect (internal tooling)",
    image: "/images/crowdworks.png",
    stack: ["Node.js", "Playwright", "Google Drive API", "OAuth 2.0", "CSV"],
    description:
      "Playwright-based scraper for CrowdWorks development categories: extracts title, client, budget, and URL; filters by minimum fixed/hourly thresholds; deduplicates into a master CSV; writes daily snapshots; optionally uploads dated files to Google Drive for sales/recruiting workflows.",
  },
  {
    name: "Saga Keiba Web Platform (AWS Ops)",
    tagline: "Production CMS infrastructure on AWS Tokyo",
    role: "Software Engineer — operations & maintenance",
    image: "/images/saga-keiba.png",
    stack: [
      "AWS EC2",
      "EBS",
      "ALB",
      "CloudWatch",
      "AWS Backup",
      "SNS",
      "IAM",
    ],
    description:
      "Operations engagement for the official Saga Keiba site: environment assessment, monthly EBS/AWS Backup jobs, CloudWatch alarm triage, cost explanations for stakeholders, and SNS alert routing—working under constrained IAM with client admin for policy updates.",
  },
];

export const skills = {
  languages: ["Python", "PHP", "TypeScript", "JavaScript"],
  frameworks: [
    "Next.js",
    "React",
    "Django",
    "Laravel",
    "React Native",
    "Vite",
    "Tailwind CSS",
  ],
  data: [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Firebase",
    "Firestore",
    "Supabase",
    "SQL",
  ],
  cloud: [
    "AWS (EC2, S3, IAM, Backup, CloudWatch, ALB)",
    "Vercel",
    "Supabase Edge Functions",
  ],
  other: [
    "Playwright",
    "Gemini API",
    "REST APIs",
    "CRM & marketplace integrations",
    "UML",
  ],
};

export const education = [
  {
    school: "Central Luzon State University",
    detail: "Undergraduate — Information Technology / related program",
    period: "Aug 2022 – Present",
  },
  {
    school: "Caanawan National Senior High School",
    period: "2020 – 2022",
  },
  {
    school: "Muñoz National High School",
    period: "2015 – 2019",
  },
  {
    school: "Licaong Elementary School",
    period: "2009 – 2015",
  },
];

export const certifications = [
  {
    name: "AWS Cloud Foundations",
    year: "2025",
    detail: "EC2, S3, IAM, serverless, and cloud security fundamentals.",
  },
  {
    name: "Kaggle Data Visualization",
    year: "2025",
    detail: "Python visualizations and insight-driven analysis.",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];
