import { site } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-500 sm:px-5 sm:text-sm">
        <p className="max-w-full break-words">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
