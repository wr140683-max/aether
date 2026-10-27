"use client";

interface PreviewPanelProps {
  mode: "preview" | "diff" | "code";
}

export function PreviewPanel({ mode }: PreviewPanelProps) {
  if (mode === "preview") {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-zinc-950 p-8">
        <div className="w-full max-w-3xl rounded-xl border border-zinc-800 bg-white shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1 text-xs text-zinc-500">
              localhost:3000
            </div>
          </div>
          <div className="bg-gradient-to-b from-indigo-50 to-white p-12 text-center">
            <h1 className="text-3xl font-bold text-zinc-900">
              Build your next idea with Helix
            </h1>
            <p className="mt-3 text-zinc-600">
              Transparent multi-agent app builder. You stay in control.
            </p>
            <button className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white">
              Get Started
            </button>
          </div>
        </div>
        <p className="mt-6 text-xs text-zinc-500">
          Live preview · Updates after each approved change
        </p>
      </div>
    );
  }

  if (mode === "diff") {
    return (
      <div className="h-full overflow-auto bg-zinc-950 p-6 font-mono text-sm">
        <div className="mb-4 text-zinc-400">app/page.tsx</div>
        <pre className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-zinc-300">
          <span className="text-emerald-400">+ export default function Home() {"{"}</span>
          {"\n"}
          <span className="text-emerald-400">+   return (</span>
          {"\n"}
          <span className="text-emerald-400">+     &lt;main&gt;...</span>
          {"\n"}
          <span className="text-emerald-400">+   )</span>
          {"\n"}
          <span className="text-emerald-400">+ {"}"}</span>
        </pre>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center text-zinc-500">
      Monaco editor will load here for full code view
    </div>
  );
}
