import { site } from "@/data/portfolio";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Open to full stack developer roles, freelance product work, and interesting collaborations."
    >
      <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-transparent p-8 md:p-10">
        <p className="max-w-2xl text-lg text-slate-300">
          The fastest way to reach me is email. I am based in Nueva Ecija and work
          remotely with teams in the Philippines and abroad.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-[#0b1220] transition hover:bg-teal-400"
          >
            {site.email}
          </a>
          <a
            href={`tel:${site.phone.replace(/-/g, "")}`}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-400/50"
          >
            {site.phone}
          </a>
          <a
            href={site.resumePath}
            download
            className="inline-flex items-center justify-center rounded-full border border-teal-500/40 px-6 py-3 text-sm font-semibold text-teal-200 transition hover:border-teal-400 hover:bg-teal-500/10"
          >
            Download resume (PDF)
          </a>
          <a
            href={site.coverLetterPath}
            download
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-400/50 hover:text-teal-200"
          >
            Download cover letter (PDF)
          </a>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Portfolio:{" "}
          <a
            href={site.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline"
          >
            {site.portfolioUrl}
          </a>
        </p>
      </div>
    </Section>
  );
}
