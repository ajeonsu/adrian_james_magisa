import { site } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-8 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-slate-500 sm:gap-4 sm:px-5 sm:text-sm md:flex-row md:text-left">
        <p className="max-w-full break-words">
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="text-slate-600">Built with Next.js · Static export for Vercel</p>
      </div>
    </footer>
  );
}
