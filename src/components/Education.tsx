import { certifications, education } from "@/data/portfolio";
import { Section } from "./Section";

export function Education() {
  return (
    <Section
      id="education"
      title="Education & certifications"
      subtitle="Academic foundation at CLSU plus cloud and data credentials."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Education</h3>
          <ul className="space-y-4">
            {education.map((entry) => (
              <li
                key={entry.school}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="font-medium text-white">{entry.school}</p>
                {"detail" in entry && entry.detail && (
                  <p className="mt-1 text-sm text-slate-400">{entry.detail}</p>
                )}
                <p className="mt-2 text-sm text-teal-300/90">{entry.period}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Certifications</h3>
          <ul className="space-y-4">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="font-medium text-white">
                  {cert.name}{" "}
                  <span className="text-slate-500">({cert.year})</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {cert.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
