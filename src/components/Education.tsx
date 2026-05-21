import { CredlyBadgeEmbed } from "@/components/CredlyBadgeEmbed";
import { certifications, education } from "@/data/portfolio";
import { Section } from "./Section";

export function Education() {
  return (
    <Section
      id="education"
      title="Education & certifications"
      subtitle="Academic foundation at CLSU plus cloud and data credentials."
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Education</h3>
          <ul className="space-y-4">
            {education.map((entry) => (
              <li
                key={entry.school}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
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
          <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <p className="mb-4 text-base font-medium leading-snug text-white">
              AWS Academy Graduate – Cloud Foundations{" "}
              <span className="text-slate-500">(2025)</span>
            </p>
            <div className="-mx-1 flex min-w-0 justify-center overflow-x-auto sm:mx-0">
              <CredlyBadgeEmbed />
            </div>
          </div>
          <ul className="space-y-4">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
              >
                <p className="break-words font-medium text-white">
                  {cert.credentialUrl || cert.redirectPath ? (
                    <a
                      href={cert.credentialUrl ?? cert.redirectPath}
                      target={cert.credentialUrl ? "_blank" : undefined}
                      rel={
                        cert.credentialUrl ? "noopener noreferrer" : undefined
                      }
                      className="text-teal-300 hover:text-teal-200"
                    >
                      {cert.name}
                    </a>
                  ) : (
                    cert.name
                  )}{" "}
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
