"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  FileDiff,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from "lucide-react";

type StepStatus = "pending" | "running" | "done" | "failed" | "needs_approval";

interface AgentStep {
  id: string;
  role: "planner" | "coder" | "tester" | "system";
  title: string;
  status: StepStatus;
  content?: string;
  evidence?: string;
  diffs?: { path: string; summary: string }[];
}

const DEMO_STEPS: AgentStep[] = [
  {
    id: "1",
    role: "planner",
    title: "Plan created",
    status: "done",
    content:
      "Build a simple SaaS landing page with pricing table and email signup. Stack: Next.js + Tailwind + SQLite.",
  },
  {
    id: "2",
    role: "coder",
    title: "Created landing page",
    status: "needs_approval",
    content: "Implemented hero, features, and pricing sections.",
    diffs: [
      { path: "app/page.tsx", summary: "+142 lines" },
      { path: "components/Pricing.tsx", summary: "new file" },
    ],
  },
  {
    id: "3",
    role: "tester",
    title: "Typecheck & build",
    status: "pending",
  },
];

export function AgentPanel() {
  const [steps] = useState(DEMO_STEPS);
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-zinc-800 px-4 py-3">
        <h2 className="text-sm font-semibold">Agent Timeline</h2>
        <p className="text-xs text-zinc-500">
          Every step is visible. Nothing applies without your approval.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {steps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>

      <div className="border-t border-zinc-800 p-4">
        <div className="flex gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what to build or change…"
            rows={2}
            className="flex-1 resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none"
          />
          <button className="self-end rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50">
            Send
          </button>
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          Tip: Be specific. Smaller tasks = better results + lower cost.
        </p>
      </div>
    </div>
  );
}

function StepCard({ step }: { step: AgentStep }) {
  const statusIcon = {
    pending: <div className="h-4 w-4 rounded-full border border-zinc-600" />,
    running: <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />,
    done: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
    failed: <XCircle className="h-4 w-4 text-red-400" />,
    needs_approval: <FileDiff className="h-4 w-4 text-amber-400" />,
  }[step.status];

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
      <div className="flex items-start gap-2">
        {statusIcon}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {step.role}
            </span>
            <span className="text-sm font-medium text-zinc-100">{step.title}</span>
          </div>
          {step.content && (
            <p className="mt-1 text-sm text-zinc-400">{step.content}</p>
          )}
          {step.diffs && step.diffs.length > 0 && (
            <ul className="mt-2 space-y-1">
              {step.diffs.map((d) => (
                <li
                  key={d.path}
                  className="flex items-center gap-2 rounded bg-zinc-800/80 px-2 py-1 font-mono text-xs text-zinc-300"
                >
                  <FileDiff className="h-3 w-3 text-amber-400" />
                  {d.path}
                  <span className="text-zinc-500">{d.summary}</span>
                </li>
              ))}
            </ul>
          )}
          {step.status === "needs_approval" && (
            <div className="mt-3 flex gap-2">
              <button className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500">
                <ThumbsUp className="h-3.5 w-3.5" />
                Approve & Commit
              </button>
              <button className="flex items-center gap-1.5 rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800">
                <ThumbsDown className="h-3.5 w-3.5" />
                Reject
              </button>
              <button className="flex items-center gap-1.5 rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800">
                <MessageSquare className="h-3.5 w-3.5" />
                Feedback
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
