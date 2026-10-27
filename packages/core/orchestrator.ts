/**
 * Helix Orchestrator — plan-first, human-in-the-loop
 */

import type { Plan, AgentMessage, ProjectContext } from "./types";
import { generate, type LLMConfig, estimateCost } from "./llm";
import { createPlannerPrompt } from "../agents/planner";
import { createCoderPrompt } from "../agents/coder";
import { parsePlanFromText } from "./parsePlan";
import { parseCoderFromText } from "./parseCoder";

export interface OrchestratorConfig {
  maxRetriesPerTask: number;
  requireHumanApproval: boolean;
  llm: LLMConfig;
}

export class HelixOrchestrator {
  private history: AgentMessage[] = [];
  private config: OrchestratorConfig;
  private sessionCost = 0;
  private lastPlan: Plan | null = null;

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

  getLastPlan() {
    return this.lastPlan;
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

    const plan = parsePlanFromText(result.text, userGoal);
    this.lastPlan = plan;
    return plan;
  }

  async codeTask(opts: {
    userGoal: string;
    taskTitle: string;
    taskDescription: string;
    stack?: Plan["stackChoices"];
    existingFiles?: string[];
  }) {
    const prompt = createCoderPrompt({
      userGoal: opts.userGoal,
      taskTitle: opts.taskTitle,
      taskDescription: opts.taskDescription,
      stack: opts.stack || {
        frontend: "Next.js",
        backend: "Next.js API",
        database: "SQLite",
      },
      existingFiles: opts.existingFiles,
    });

    const result = await generate(
      this.config.llm,
      "You are the Coder agent in Helix. Return only valid JSON with files.",
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
      role: "coder",
      content: result.text,
      timestamp: new Date().toISOString(),
    });

    return parseCoderFromText(result.text);
  }

  async testTask(opts: {
    taskTitle: string;
    command?: string;
    projectId?: string;
  }) {
    const { createSandbox } = await import("../sandbox");
    const command =
      opts.command || 'echo "Helix tester: no command specified"';
    const sbx = await createSandbox({
      backend: "local",
      projectId: opts.projectId || "demo",
    });
    const started = Date.now();
    const result = await sbx.run(command);
    const durationMs = Date.now() - started;

    this.add({
      role: "tester",
      content: result.stdout || result.stderr || "no output",
      timestamp: new Date().toISOString(),
      structured: {
        taskId: opts.taskTitle,
        passed: result.exitCode === 0,
        logs: `${result.stdout || ""}${result.stderr || ""}`,
        exitCode: result.exitCode,
        durationMs,
        command,
      },
    });

    return {
      passed: result.exitCode === 0,
      logs: `${result.stdout || ""}${result.stderr || ""}`,
      exitCode: result.exitCode,
      command,
      durationMs,
    };
  }

  async runGoal(_userGoal: string, _ctx: ProjectContext) {
    throw new Error(
      "Use plan() + explicit approve + codeTask(). Full auto is disabled."
    );
  }
}
