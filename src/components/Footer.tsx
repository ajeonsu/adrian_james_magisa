import { site } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-slate-500 md:flex-row">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>Built with Next.js · Static export for Vercel</p>
      </div>
    </footer>
  );
}
