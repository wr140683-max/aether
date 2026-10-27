"use client";

import { create } from "zustand";

export interface HelixFile {
  path: string;
  content: string;
  action: "create" | "modify" | "delete";
  summary?: string;
}

interface HelixState {
  projectId: string;
  projectName: string;
  files: HelixFile[];
  selectedPath: string | null;
  sessionCost: number;
  setProject: (id: string, name: string) => void;
  setFiles: (files: HelixFile[]) => void;
  addFiles: (files: HelixFile[]) => void;
  selectFile: (path: string | null) => void;
  addCost: (n: number) => void;
  resetSession: () => void;
}

export const useHelixStore = create<HelixState>((set) => ({
  projectId: "demo",
  projectName: "My SaaS Starter",
  files: [],
  selectedPath: null,
  sessionCost: 0,
  setProject: (id, name) => set({ projectId: id, projectName: name }),
  setFiles: (files) => set({ files }),
  addFiles: (incoming) =>
    set((s) => {
      const map = new Map(s.files.map((f) => [f.path, f]));
      for (const f of incoming) map.set(f.path, f);
      return { files: Array.from(map.values()) };
    }),
  selectFile: (path) => set({ selectedPath: path }),
  addCost: (n) => set((s) => ({ sessionCost: s.sessionCost + n })),
  resetSession: () => set({ files: [], selectedPath: null, sessionCost: 0 }),
}));
