/**
 * Planner Agent
 * Takes a user goal and produces a transparent, structured Plan.
 * Never writes code. Only decides what should be done and in what order.
 */

import type { Plan, Task } from "../core/types";

export interface PlannerInput {
  userGoal: string;
  existingFiles?: string[];
  previousFeedback?: string;
}

export function createPlannerPrompt(input: PlannerInput): string {
  return `
You are the Planner agent in Aether — an open-source vibe-coding system that values transparency and control.

User goal:
${input.userGoal}

${input.existingFiles ? `Existing files in the project:\n${input.existingFiles.join("\n")}` : "This is a new project."}

${input.previousFeedback ? `Previous feedback / corrections:\n${input.previousFeedback}` : ""}

Your job:
1. Choose a sensible, modern stack (prefer Next.js + TypeScript + SQLite or Postgres unless the user specified otherwise).
2. Break the goal into a small number of concrete, ordered tasks.
3. Each task must be small enough that a coder can implement it in one focused pass.
4. Do NOT write any code.
5. Be explicit about architecture decisions.

Return ONLY valid JSON matching this shape:
{
  "summary": "one paragraph summary of what we will build",
  "architectureNotes": "why this stack and structure",
  "stackChoices": {
    "frontend": "...",
    "backend": "...",
    "database": "...",
    "auth": "..."
  },
  "tasks": [
    {
      "id": "task-1",
      "title": "short title",
      "description": "detailed what to implement",
      "files": ["optional/list/of/files"]
    }
  ]
}
`.trim();
}

// Placeholder — real implementation will call the model with the prompt above
export async function runPlanner(input: PlannerInput): Promise<Plan> {
  // TODO: call model (BYOK) and parse structured output
  throw new Error("Planner not yet wired to a model. Coming in next commit.");
}
