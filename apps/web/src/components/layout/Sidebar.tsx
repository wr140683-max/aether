"use client";

import { Folder, FileCode, Plus, History } from "lucide-react";

interface SidebarProps {
  activeProject: string | null;
  onSelectProject: (id: string) => void;
}

export function Sidebar({ activeProject, onSelectProject }: SidebarProps) {
  const projects = [
    { id: "demo", name: "My SaaS Starter", updated: "2 min ago" },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-zinc-800 p-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
          Projects
        </p>
        <ul className="space-y-1">
          {projects.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => onSelectProject(p.id)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm ${
                  activeProject === p.id
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                }`}
              >
                <Folder className="h-4 w-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="truncate">{p.name}</div>
                  <div className="text-xs text-zinc-500">{p.updated}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-wider text-zinc-500">
          Files
        </p>
        <ul className="space-y-0.5 text-sm text-zinc-400">
          <li className="flex items-center gap-2 rounded px-2 py-1 hover:bg-zinc-800/50">
            <FileCode className="h-3.5 w-3.5" />
            app/page.tsx
          </li>
          <li className="flex items-center gap-2 rounded px-2 py-1 hover:bg-zinc-800/50">
            <FileCode className="h-3.5 w-3.5" />
            components/ui/button.tsx
          </li>
        </ul>
      </div>

      <div className="border-t border-zinc-800 p-3">
        <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300">
          <History className="h-3.5 w-3.5" />
          Version History (Git)
        </button>
      </div>
    </div>
  );
}
