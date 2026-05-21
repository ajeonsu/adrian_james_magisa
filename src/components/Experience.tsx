import { experience } from "@/data/portfolio";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Work experience"
      subtitle="From government programs to production software at CyberConnect and large-scale e-commerce backends."
    >
      <ol className="relative space-y-10 border-l border-white/10 pl-8">
        {experience.map((job, index) => (
          <li key={`${job.company}-${index}`} className="relative">
            <span className="absolute -left-[2.35rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-teal-400 bg-[#0b1220]" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                  <p className="mt-1 text-teal-300">
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                  {job.period}
                </span>
              </div>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-400">
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
