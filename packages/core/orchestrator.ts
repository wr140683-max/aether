/**
 * Helix Orchestrator — plan-first, human-in-the-loop
 */

import type { Plan, AgentMessage, ProjectContext } from "./types";
import { generate, type LLMConfig, estimateCost } from "./llm";
import { createPlannerPrompt } from "../agents/planner";
import { parsePlanFromText } from "./parsePlan";

export interface OrchestratorConfig {
  maxRetriesPerTask: number;
  requireHumanApproval: boolean;
  llm: LLMConfig;
}

export class HelixOrchestrator {
  private history: AgentMessage[] = [];
  private config: OrchestratorConfig;
  private sessionCost = 0;

  constructor(config: OrchestratorConfig) {
    this.config = {
      maxRetriesPerTask: 3,
      requireHumanApproval: true,
      ...config,
    };
  }

  getSessionCost() {
    return this.sessionCost;
  }

  getHistory() {
    return this.history;
  }

  private add(msg: AgentMessage) {
    this.history.push(msg);
  }

  async plan(userGoal: string, existingFiles: string[] = []): Promise<Plan> {
    const prompt = createPlannerPrompt({ userGoal, existingFiles });
    const result = await generate(
      this.config.llm,
      "You are the Planner agent in Helix. Always return valid JSON as specified.",
      prompt
    );

    if (result.usage) {
      this.sessionCost += estimateCost(
        this.config.llm.provider,
        result.usage.promptTokens,
        result.usage.completionTokens
      );
    }

    this.add({
      role: "planner",
      content: result.text,
      timestamp: new Date().toISOString(),
    });

    return parsePlanFromText(result.text, userGoal);
  }

  async runGoal(_userGoal: string, _ctx: ProjectContext) {
    throw new Error(
      "Use plan() + explicit approve steps. Full auto is disabled to prevent credit-burn loops."
    );
  }
}
