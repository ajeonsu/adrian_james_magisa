import Image from "next/image";
import { site } from "@/data/portfolio";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-sm text-teal-200">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            Available for opportunities
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {site.name}
          </h1>
          <p className="mt-4 text-xl text-teal-300 md:text-2xl">{site.title}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            {site.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-[#0b1220] transition hover:bg-teal-400"
            >
              View projects
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-400/50 hover:text-teal-200"
            >
              Email me
            </a>
          </div>
          <dl className="mt-10 grid gap-4 text-sm text-slate-400 sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Location</dt>
              <dd className="text-slate-200">{site.location}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Phone</dt>
              <dd>
                <a href={`tel:${site.phone.replace(/-/g, "")}`} className="text-slate-200 hover:text-teal-300">
                  {site.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-teal-500/40 to-cyan-600/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              src="/images/profile.png"
              alt={`Portrait of ${site.name}`}
              width={600}
              height={750}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
