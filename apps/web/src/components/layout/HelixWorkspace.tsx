"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { PreviewPanel } from "../preview/PreviewPanel";
import { AgentPanel } from "../chat/AgentPanel";
import { TopBar } from "./TopBar";

export function HelixWorkspace() {
  const [activeProject, setActiveProject] = useState<string | null>("demo");
  const [mode, setMode] = useState<"preview" | "diff" | "code">("preview");

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 border-r border-zinc-800 bg-zinc-900/50">
          <Sidebar
            activeProject={activeProject}
            onSelectProject={setActiveProject}
          />
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
            <ModeTab active={mode === "preview"} onClick={() => setMode("preview")}>
              Preview
            </ModeTab>
            <ModeTab active={mode === "diff"} onClick={() => setMode("diff")}>
              Diffs
            </ModeTab>
            <ModeTab active={mode === "code"} onClick={() => setMode("code")}>
              Code
            </ModeTab>
          </div>
          <div className="flex-1 overflow-auto">
            <PreviewPanel mode={mode} />
          </div>
        </main>

        <aside className="w-[420px] shrink-0 border-l border-zinc-800 bg-zinc-900/30">
          <AgentPanel />
        </aside>
      </div>
    </div>
  );
}

function ModeTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-600 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
      }`}
    >
      {children}
    </button>
  );
}
