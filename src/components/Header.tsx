"use client";

import { useState } from "react";
import { navLinks, site } from "@/data/portfolio";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b1220]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" className="font-semibold tracking-tight text-white">
          {site.name.split(" ")[0]}
          <span className="text-teal-400">.</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-teal-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-[#0b1220] transition hover:bg-teal-400 md:inline-block"
        >
          Get in touch
        </a>
        <button
          type="button"
          className="rounded-md border border-white/15 px-3 py-2 text-sm text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-[#0b1220] px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-slate-200"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="inline-block rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-[#0b1220]"
                onClick={() => setOpen(false)}
              >
                Get in touch
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
