import { skills } from "@/data/portfolio";
import { Section } from "./Section";

const groups = [
  { label: "Languages", items: skills.languages },
  { label: "Frameworks & mobile", items: skills.frameworks },
  { label: "Databases & data", items: skills.data },
  { label: "Cloud & deploy", items: skills.cloud },
  { label: "Also", items: skills.other },
];

export function Skills() {
  return (
    <Section
      id="skills"
      title="Tech stack"
      subtitle="Proficient across modern web, mobile, Python full stack apps, relational databases, and AWS."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-400">
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-[#0f1729] px-3 py-1.5 text-sm text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
