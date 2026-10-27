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
  Send,
} from "lucide-react";

type StepStatus = "pending" | "running" | "done" | "failed" | "needs_approval";

interface AgentStep {
  id: string;
  role: "planner" | "coder" | "tester" | "system" | "user";
  title: string;
  status: StepStatus;
  content?: string;
  diffs?: { path: string; summary: string }[];
}

export function AgentPanel() {
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionCost, setSessionCost] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);

    const userStep: AgentStep = {
      id: `user-${Date.now()}`,
      role: "user",
      title: "You",
      status: "done",
      content: prompt.trim(),
    };
    setSteps((prev) => [...prev, userStep]);

    const runningStep: AgentStep = {
      id: `planner-${Date.now()}`,
      role: "planner",
      title: "Planning…",
      status: "running",
    };
    setSteps((prev) => [...prev, runningStep]);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "plan",
          goal: prompt.trim(),
          provider: "xai",
          model: "grok-3-mini",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      setSessionCost((c) => c + (data.sessionCost || 0));

      setSteps((prev) =>
        prev.map((s) =>
          s.id === runningStep.id
            ? {
                ...s,
                title: "Plan ready",
                status: "done" as StepStatus,
                content:
                  data.plan?.summary ||
                  data.history?.[0]?.content ||
                  "Plan generated.",
              }
            : s
        )
      );

      if (data.plan?.tasks?.length) {
        setSteps((prev) => [
          ...prev,
          {
            id: `approve-${Date.now()}`,
            role: "coder",
            title: "Ready to implement",
            status: "needs_approval",
            content: `Next task: ${data.plan.tasks[0].title}`,
            diffs: [
              { path: "(pending)", summary: "Awaiting your approval" },
            ],
          },
        ]);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setSteps((prev) =>
        prev.map((s) =>
          s.id === runningStep.id
            ? { ...s, title: "Failed", status: "failed", content: err.message }
            : s
        )
      );
    } finally {
      setLoading(false);
      setPrompt("");
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Agent Timeline</h2>
            <p className="text-xs text-zinc-500">
              Every step visible. Nothing applies without approval.
            </p>
          </div>
          <div className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 font-mono text-xs text-emerald-400">
            ${sessionCost.toFixed(4)}
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {steps.length === 0 && (
          <div className="rounded-lg border border-dashed border-zinc-700 p-6 text-center text-sm text-zinc-500">
            Describe an app or change below. Helix will plan first — you stay in control.
          </div>
        )}
        {steps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
        {error && (
          <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-300">
            {error}
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800 p-4">
        <div className="flex gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe what to build or change…"
            rows={2}
            disabled={loading}
            className="flex-1 resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-1.5 self-end rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send
          </button>
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          Enter to send · Shift+Enter for new line · BYOK ready
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
            <p className="mt-1 whitespace-pre-wrap text-sm text-zinc-400">
              {step.content.slice(0, 600)}
              {step.content.length > 600 ? "…" : ""}
            </p>
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
            <div className="mt-3 flex flex-wrap gap-2">
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
