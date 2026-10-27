/**
 * Helix Orchestrator
 * Coordinates Planner → Coder → Tester with human checkpoints.
 * No silent loops. Max retries then escalate to human.
 */

import type { Plan, Task, Diff, TestEvidence, AgentMessage, ProjectContext } from "./types";

export interface OrchestratorConfig {
  maxRetriesPerTask: number;   // default 3
  requireHumanApproval: boolean; // default true for non-trivial tasks
  byokProvider?: "xai" | "openai" | "anthropic" | "ollama";
}

export class HelixOrchestrator {
  private history: AgentMessage[] = [];
  private config: OrchestratorConfig;

  constructor(config: Partial<OrchestratorConfig> = {}) {
    this.config = {
      maxRetriesPerTask: 3,
      requireHumanApproval: true,
      ...config,
    };
  }

  async runGoal(userGoal: string, ctx: ProjectContext): Promise<{
    plan: Plan;
    status: "needs_approval" | "completed" | "blocked";
    messages: AgentMessage[];
  }> {
    // 1. Plan
    // 2. For each task: code → test → (approve?) → commit
    // 3. Escalate if retries exceeded
    // Implementation will call the agent runners
    throw new Error("Orchestrator wiring in progress — see agents/ and next commits.");
  }

  addMessage(msg: AgentMessage) {
    this.history.push(msg);
  }

  getHistory() {
    return this.history;
  }
}
