import { NextRequest, NextResponse } from "next/server";
import { HelixOrchestrator } from "../../../../../packages/core/orchestrator";
import type { LLMConfig } from "../../../../../packages/core/llm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, goal, provider = "xai", model = "grok-3-mini", apiKey } = body;

    const llm: LLMConfig = {
      provider,
      model,
      apiKey: apiKey || process.env.XAI_API_KEY || process.env.OPENAI_API_KEY,
    };

    const orch = new HelixOrchestrator({
      maxRetriesPerTask: 3,
      requireHumanApproval: true,
      llm,
    });

    if (action === "plan") {
      if (!goal || typeof goal !== "string") {
        return NextResponse.json({ error: "goal is required" }, { status: 400 });
      }
      const plan = await orch.plan(goal);
      return NextResponse.json({
        plan,
        sessionCost: orch.getSessionCost(),
        history: orch.getHistory(),
      });
    }

    if (action === "status") {
      return NextResponse.json({
        ok: true,
        message: "Helix agent API ready",
        providers: ["xai", "openai", "anthropic", "ollama", "google"],
      });
    }

    return NextResponse.json({ error: "unknown action" }, { status: 400 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
