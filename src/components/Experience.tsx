import { experience } from "@/data/portfolio";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Work experience"
      subtitle="From government programs to full stack production software at CyberConnect and large-scale e-commerce platforms."
    >
      <ol className="relative space-y-8 border-l border-white/10 pl-6 sm:space-y-10 sm:pl-8">
        {experience.map((job, index) => (
          <li key={`${job.company}-${index}`} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-teal-400 bg-[#0b1220] sm:-left-[2.35rem] sm:h-4 sm:w-4" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 md:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    {job.role}
                  </h3>
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
                <span className="w-fit shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 sm:text-sm">
                  {job.period}
                </span>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-slate-400 sm:mt-5 sm:pl-5 sm:text-base">
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
