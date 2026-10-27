/**
 * Tester Agent — Helix
 * Runs checks and returns evidence. Never claims "fixed" without proof.
 */

import type { TestEvidence, Task } from "../core/types";

export interface TesterInput {
  task: Task;
  workspacePath: string;
  commands?: string[];   // e.g. ["pnpm test", "pnpm typecheck"]
}

export function createTesterPrompt(input: TesterInput): string {
  return `
You are the Tester agent in Helix.

Task under test:
${input.task.title}
${input.task.description}

Your job:
- Decide the minimal set of verification commands (typecheck, unit tests, build, etc.).
- Report ONLY facts: what ran, exit codes, key log lines.
- Never say "it works" without evidence.
- If something fails, describe the failure clearly so the Coder can fix it.

Return structured JSON:
{
  "passed": boolean,
  "logs": "key output",
  "exitCode": number,
  "command": "the main command run",
  "durationMs": number
}
`.trim();
}

export async function runTester(input: TesterInput): Promise<TestEvidence> {
  // Placeholder: real implementation will execute in sandbox and collect evidence
  throw new Error("Tester not yet wired to sandbox. Coming next.");
}
