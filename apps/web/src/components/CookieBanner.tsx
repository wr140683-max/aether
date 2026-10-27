"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "helix-consent";

type Consent = "accepted" | "rejected" | null;

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    if (!stored) setVisible(true);
    else setConsent(stored);
  }, []);

  function choose(value: "accepted" | "rejected") {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-2xl sm:left-auto sm:right-6"
    >
      <p className="text-sm text-zinc-300">
        We use only essential cookies by default. Analytics cookies are optional
        and never loaded without your consent.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => choose("accepted")}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Accept optional
        </button>
        <button
          onClick={() => choose("rejected")}
          className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
        >
          Reject optional
        </button>
        <a
          href="/docs/legal/COOKIES.md"
          className="rounded-lg px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200"
        >
          Cookie policy
        </a>
      </div>
    </div>
  );
}
