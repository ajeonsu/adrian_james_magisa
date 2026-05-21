import Image from "next/image";
import { projects } from "@/data/portfolio";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Documented work from the projects folder—production apps, integrations, automation, and cloud operations."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-teal-500/40"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-900 via-[#0f1729] to-teal-950/40">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
                  <span className="text-4xl font-bold text-teal-500/30">
                    {project.name.charAt(0)}
                  </span>
                  <p className="max-w-xs text-sm text-slate-500">
                    {project.tagline}
                  </p>
                </div>
              )}
            </div>
            <div className="p-6 md:p-8">
              {project.role && (
                <p className="text-xs font-medium tracking-wide text-slate-500">
                  {project.role}
                </p>
              )}
              <h3 className="mt-1 text-xl font-semibold text-white">
                {project.name}
              </h3>
              <p className="mt-1 text-sm text-teal-300">{project.tagline}</p>
              <p className="mt-4 leading-relaxed text-slate-400">
                {project.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
