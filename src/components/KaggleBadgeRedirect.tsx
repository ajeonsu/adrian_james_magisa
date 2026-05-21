"use client";

import { useEffect } from "react";

type Props = {
  url: string;
  title: string;
};

export function KaggleBadgeRedirect({ url, title }: Props) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-slate-400">Redirecting to Kaggle…</p>
      <p className="mt-2 font-medium text-white">{title}</p>
      <a
        href={url}
        className="mt-6 text-sm text-teal-300 hover:text-teal-200"
      >
        Continue if you are not redirected
      </a>
    </main>
  );
}
