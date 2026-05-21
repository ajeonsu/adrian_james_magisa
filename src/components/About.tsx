import { site } from "@/data/portfolio";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="About me" subtitle={site.summary}>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Product engineering",
            body: "CyberConnect’s bilingual delivery platform, LLMO strategy analyzer, and EC ONE CRM backends—Next.js, Supabase, Firebase, and Gemini in production.",
          },
          {
            title: "Integrations & automation",
            body: "Marketplace and messaging integrations (LINE, Rakuten, Meta, email) plus Playwright scrapers and CSV pipelines for internal ops.",
          },
          {
            title: "Cloud operations",
            body: "AWS maintenance for Saga Keiba: backups, CloudWatch alarms, IAM coordination, and client-facing monthly ops reporting.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="mt-3 leading-relaxed text-slate-400">{card.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
