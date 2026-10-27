"use client";

import { Zap, Settings, Key, CreditCard } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Helix</span>
        </div>
        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
          transparent agents
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs">
          <span className="text-zinc-400">Session</span>
          <span className="font-mono text-emerald-400">$0.00</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">BYOK</span>
        </div>

        <button
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          title="Bring Your Own Key"
        >
          <Key className="h-3.5 w-3.5" />
          API Keys
        </button>

        <button className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
          <CreditCard className="h-3.5 w-3.5" />
          Billing
        </button>

        <button className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
