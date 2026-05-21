"use client";

import { useEffect } from "react";

const CREDLY_BADGE_ID = "f2f3fb37-cb57-4b47-92bc-ca7adaaad588";
const CREDLY_EMBED_SRC =
  "https://cdn.credly.com/assets/utilities/embed.js";

export function CredlyBadgeEmbed() {
  useEffect(() => {
    const existing = document.querySelector(
      `script[src="${CREDLY_EMBED_SRC}"]`,
    );
    if (existing) {
      return;
    }
    const script = document.createElement("script");
    script.src = CREDLY_EMBED_SRC;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-w-0 max-w-full shrink-0">
      <div
        className="mx-auto max-w-[150px]"
        data-iframe-width="150"
        data-iframe-height="270"
        data-share-badge-id={CREDLY_BADGE_ID}
        data-share-badge-host="https://www.credly.com"
      />
    </div>
  );
}
