import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import {
  certifications,
  education,
  experience,
  projects,
  site,
  skills,
} from "../src/data/portfolio";

const PORTFOLIO_URL = site.portfolioUrl;
const OUT_DIR = path.join(process.cwd(), "public");
const OUT_FILE = path.join(OUT_DIR, "Adrian_James_Magisa_Resume.pdf");

const NAVY = "#0b1220";
const TEAL = "#14b8a6";
const MUTED = "#64748b";
const PAGE_MARGIN = 48;
const CONTENT_WIDTH = 612 - PAGE_MARGIN * 2;
const PROFILE_IMAGE = path.join(process.cwd(), "public/images/profile.png");

function drawHeader(doc: PDFKit.PDFDocument) {
  const photoSize = 92;
  const gap = 16;
  const textWidth = CONTENT_WIDTH - photoSize - gap;
  const x = PAGE_MARGIN;
  const y = PAGE_MARGIN;
  const photoX = x + textWidth + gap;

  if (fs.existsSync(PROFILE_IMAGE)) {
    const radius = 10;
    doc.save();
    doc.roundedRect(photoX, y, photoSize, photoSize, radius).clip();
    doc.image(PROFILE_IMAGE, photoX, y, {
      width: photoSize,
      height: photoSize,
      cover: [photoSize, photoSize],
    });
    doc.restore();
    doc
      .roundedRect(photoX, y, photoSize, photoSize, radius)
      .lineWidth(1.5)
      .strokeColor(TEAL)
      .stroke();
  }

  doc.font("Helvetica-Bold").fontSize(22).fillColor(NAVY);
  doc.text(site.name, x, y, { width: textWidth, lineGap: 2 });

  let ty = doc.y;
  doc.font("Helvetica").fontSize(12).fillColor(TEAL);
  doc.text(site.title, x, ty, { width: textWidth });

  ty = doc.y + 8;
  doc.font("Helvetica").fontSize(9).fillColor("#334155");
  doc.text(`${site.location}\n${site.email}  |  ${site.phone}`, x, ty, {
    width: textWidth,
    lineGap: 2,
  });

  ty = doc.y + 2;
  doc
    .fillColor(TEAL)
    .text(`Portfolio: ${PORTFOLIO_URL}`, x, ty, {
      width: textWidth,
      link: PORTFOLIO_URL,
      underline: true,
    });

  const blockBottom = Math.max(doc.y, y + photoSize);
  doc.x = x;
  doc.y = blockBottom + 16;
}

function ensureSpace(doc: PDFKit.PDFDocument, needed: number) {
  if (doc.y + needed > doc.page.height - PAGE_MARGIN) {
    doc.addPage();
    doc.y = PAGE_MARGIN;
  }
}

function sectionTitle(doc: PDFKit.PDFDocument, title: string) {
  ensureSpace(doc, 36);
  doc
    .moveDown(0.6)
    .fontSize(11)
    .fillColor(TEAL)
    .font("Helvetica-Bold")
    .text(title.toUpperCase(), { continued: false });
  doc
    .moveDown(0.15)
    .strokeColor(TEAL)
    .lineWidth(1)
    .moveTo(PAGE_MARGIN, doc.y)
    .lineTo(PAGE_MARGIN + CONTENT_WIDTH, doc.y)
    .stroke();
  doc.moveDown(0.5);
  doc.fillColor("#111827");
}

function jobBlock(
  doc: PDFKit.PDFDocument,
  role: string,
  company: string,
  period: string,
  bullets: string[],
) {
  ensureSpace(doc, 60);
  doc.font("Helvetica-Bold").fontSize(10).fillColor(NAVY).text(role);
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(MUTED)
    .text(`${company}  |  ${period}`);
  doc.moveDown(0.25);
  bullets.forEach((b) => {
    ensureSpace(doc, 28);
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#1e293b")
      .text(`•  ${b}`, {
        width: CONTENT_WIDTH - 8,
        indent: 10,
        paragraphGap: 3,
      });
  });
  doc.moveDown(0.35);
}

function projectBlock(
  doc: PDFKit.PDFDocument,
  name: string,
  role: string | undefined,
  description: string,
  stack: string[],
) {
  ensureSpace(doc, 52);
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(NAVY).text(name);
  if (role) {
    doc.font("Helvetica-Oblique").fontSize(8).fillColor(MUTED).text(role);
  }
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor("#334155")
    .text(description, { width: CONTENT_WIDTH, paragraphGap: 2 });
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(MUTED)
    .text(stack.join(" · "), { width: CONTENT_WIDTH });
  doc.moveDown(0.3);
}

function generate() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: PAGE_MARGIN, bottom: PAGE_MARGIN, left: PAGE_MARGIN, right: PAGE_MARGIN },
    info: {
      Title: `${site.name} — Resume`,
      Author: site.name,
      Subject: "Full Stack Developer Resume",
    },
  });

  const stream = fs.createWriteStream(OUT_FILE);
  doc.pipe(stream);

  drawHeader(doc);

  sectionTitle(doc, "Professional Summary");
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor("#1e293b")
    .text(site.summary, { width: CONTENT_WIDTH, align: "justify", paragraphGap: 4 });

  sectionTitle(doc, "Work Experience");
  experience.forEach((job) =>
    jobBlock(doc, job.role, job.company, job.period, job.highlights),
  );

  sectionTitle(doc, "Selected Projects");
  projects.forEach((p) =>
    projectBlock(doc, p.name, p.role, p.description, p.stack),
  );

  sectionTitle(doc, "Technical Skills");
  const skillLines = [
    `Languages: ${skills.languages.join(", ")}`,
    `Frameworks: ${skills.frameworks.join(", ")}`,
    `Data: ${skills.data.join(", ")}`,
    `Cloud: ${skills.cloud.join(", ")}`,
    `Other: ${skills.other.join(", ")}`,
  ];
  skillLines.forEach((line) => {
    doc.font("Helvetica").fontSize(9).fillColor("#1e293b").text(line, {
      width: CONTENT_WIDTH,
      paragraphGap: 3,
    });
  });

  sectionTitle(doc, "Education");
  education.slice(0, 2).forEach((e) => {
    ensureSpace(doc, 28);
    const detail = "detail" in e && e.detail ? ` — ${e.detail}` : "";
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(NAVY)
      .text(`${e.school} (${e.period})`);
    if (detail) {
      doc.font("Helvetica").fontSize(8.5).fillColor(MUTED).text(detail.trim());
    }
    doc.moveDown(0.2);
  });
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(MUTED)
    .text(
      `Also: ${education
        .slice(2)
        .map((e) => `${e.school} (${e.period})`)
        .join("; ")}`,
      { width: CONTENT_WIDTH },
    );

  sectionTitle(doc, "Certifications");
  certifications.forEach((c) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(NAVY)
      .text(`${c.name} (${c.year})`);
    doc.font("Helvetica").fontSize(8.5).fillColor("#334155").text(c.detail);
    doc.moveDown(0.15);
  });

  doc.moveDown(0.5);
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(TEAL)
    .text("Online portfolio", { link: PORTFOLIO_URL, underline: true });
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(NAVY)
    .text(PORTFOLIO_URL, { link: PORTFOLIO_URL, underline: true });

  doc.end();

  return new Promise<string>((resolve, reject) => {
    stream.on("finish", () => resolve(OUT_FILE));
    stream.on("error", reject);
  });
}

generate()
  .then((file) => {
    console.log(`Resume written to ${file}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
