import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { site } from "../src/data/portfolio";

const PORTFOLIO_URL = site.portfolioUrl;
const OUT_DIR = path.join(process.cwd(), "public");
const OUT_FILE = path.join(OUT_DIR, "Adrian_James_Magisa_Cover_Letter.pdf");

const NAVY = "#0b1220";
const TEAL = "#14b8a6";
const MUTED = "#64748b";
const PAGE_MARGIN = 54;
const CONTENT_WIDTH = 612 - PAGE_MARGIN * 2;

function paragraph(doc: PDFKit.PDFDocument, text: string) {
  doc
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor("#1e293b")
    .text(text, {
      width: CONTENT_WIDTH,
      align: "justify",
      lineGap: 4,
      paragraphGap: 10,
    });
}

function generate() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const doc = new PDFDocument({
    size: "LETTER",
    margins: {
      top: PAGE_MARGIN,
      bottom: PAGE_MARGIN,
      left: PAGE_MARGIN,
      right: PAGE_MARGIN,
    },
    info: {
      Title: `${site.name} — Cover Letter`,
      Author: site.name,
      Subject: "Cover Letter",
    },
  });

  const stream = fs.createWriteStream(OUT_FILE);
  doc.pipe(stream);

  const dateStr = new Date().toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  doc.font("Helvetica-Bold").fontSize(20).fillColor(NAVY).text(site.name);
  doc.font("Helvetica").fontSize(11).fillColor(TEAL).text(site.title);
  doc.moveDown(0.25);
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor("#334155")
    .text(
      `${site.location}  |  ${site.email}  |  ${site.phone}\nPortfolio: ${PORTFOLIO_URL}`,
      { link: PORTFOLIO_URL, underline: true },
    );

  doc.moveDown(1.2);
  doc.font("Helvetica").fontSize(10).fillColor(MUTED).text(dateStr);
  doc.moveDown(1);

  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(NAVY).text("Dear Hiring Manager,");
  doc.moveDown(0.6);

  paragraph(
    doc,
    "I am writing to apply for a Software Engineer / Full Stack Developer role with your organization. I build production web applications end to end—from responsive interfaces and APIs to database design, third-party integrations, and deployment. I am motivated by clear requirements, reliable delivery, and software that helps teams and users work better.",
  );

  paragraph(
    doc,
    `Since December 2024, I have worked as a Software Engineer / Full Stack Developer at CyberConnect Co., Ltd., where I help maintain a bilingual (English/Japanese) project workspace for requirements, tasks, tests, and schedules using Next.js, TypeScript, Tailwind, and Supabase with PostgreSQL and row-level security. I also contributed to the AIO/LLMO Strategy OSINT Analyzer (Firebase Auth, Next.js API, Google Gemini, Firestore) and internal automation such as a CrowdWorks job scraper with Playwright and Google Drive export.`,
  );

  paragraph(
    doc,
    "Beyond CyberConnect, I have shipped full stack work on EC ONE, a multi-channel e-commerce platform, including CRM features and integrations with Email, LINE, Rakuten, and Meta across Supabase Edge Functions and tenant dashboards. I am completing a capstone system, GROWTHetect, for DepEd nutrition and BMI monitoring with Next.js, Supabase, and IoT hardware integration. I also support AWS operations and maintenance for the Saga Keiba production website, including backups, CloudWatch alarms, and client reporting.",
  );

  paragraph(
    doc,
    "I hold AWS Academy Graduate – Cloud Foundations (Credly, 2025), Kaggle Data Visualization and other Kaggle badges (2025), and am completing my undergraduate studies at Central Luzon State University (2022–2026). My portfolio, including project screenshots and detailed experience, is available at the link above. My resume is attached for your review.",
  );

  paragraph(
    doc,
    "Thank you for considering my application. I would welcome the opportunity to discuss how my skills in Next.js, React, Python, PostgreSQL, cloud platforms, and integrations can support your team. I am available for interviews at your convenience.",
  );

  doc.moveDown(0.8);
  doc.font("Helvetica").fontSize(10.5).fillColor(NAVY).text("Sincerely,");
  doc.moveDown(0.35);
  doc.font("Helvetica-Bold").fontSize(11).text(site.name);
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEAL)
    .text(PORTFOLIO_URL, { link: PORTFOLIO_URL, underline: true });

  doc.end();

  return new Promise<string>((resolve, reject) => {
    stream.on("finish", () => resolve(OUT_FILE));
    stream.on("error", reject);
  });
}

generate()
  .then((file) => console.log(`Cover letter written to ${file}`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
