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
    <section
      id={id}
      className={`scroll-mt-20 py-14 sm:scroll-mt-24 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="mb-8 max-w-2xl sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-400 sm:text-sm">
            {id.replace("-", " ")}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-base leading-relaxed text-slate-400 sm:mt-4 sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
