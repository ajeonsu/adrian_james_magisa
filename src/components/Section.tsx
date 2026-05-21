import { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-400">
            {id.replace("-", " ")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
