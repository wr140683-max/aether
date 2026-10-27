/**
 * Coder Agent
 * Receives one Task from the Plan and produces real file diffs.
 * Must never claim success without producing actual Diff objects.
 */

import type { Diff, Task } from "../core/types";

export interface CoderInput {
  task: Task;
  projectFiles: Record<string, string>;   // path → content
  planSummary: string;
}

export function createCoderPrompt(input: CoderInput): string {
  return `
You are the Coder agent in Aether.

Current task:
Title: ${input.task.title}
Description: ${input.task.description}
${input.task.files ? `Expected files: ${input.task.files.join(", ")}` : ""}

Plan context:
${input.planSummary}

Your job:
- Implement ONLY this task.
- Produce clean, production-quality code.
- Prefer small, focused changes.
- Return a list of Diff objects (path + newContent + short explanation).
- Do not invent files that are not needed for this task.

Return ONLY valid JSON:
{
  "diffs": [
    {
      "path": "relative/path/to/file",
      "newContent": "full new file content",
      "explanation": "what this change does"
    }
  ]
}
`.trim();
}

export async function runCoder(input: CoderInput): Promise<Diff[]> {
  // TODO: call model + apply safety checks
  throw new Error("Coder not yet wired. Coming next.");
}
