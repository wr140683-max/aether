/**
 * Helix Coder agent — produces file diffs for one approved task.
 */

export interface CoderInput {
  taskTitle: string;
  taskDescription: string;
  userGoal: string;
  stack: {
    frontend?: string;
    backend?: string;
    database?: string;
  };
  existingFiles?: string[];
}

export interface FileChange {
  path: string;
  action: "create" | "modify" | "delete";
  content?: string;
  summary: string;
}

export function createCoderPrompt(input: CoderInput): string {
  return `You are the Coder agent in Helix.

User goal: ${input.userGoal}
Approved task: ${input.taskTitle}
Task details: ${input.taskDescription}
Stack: ${JSON.stringify(input.stack)}
Existing files (if any): ${(input.existingFiles || []).join(", ") || "none"}

Rules:
1. Produce a SMALL, focused set of files for THIS task only (max 6 files).
2. Prefer TypeScript + Next.js App Router patterns when stack is Next.js.
3. Return ONLY valid JSON in this shape:

\`\`\`json
{
  "summary": "one sentence what you built",
  "files": [
    {
      "path": "apps/web/src/app/page.tsx",
      "action": "create",
      "summary": "Landing page",
      "content": "... full file content ..."
    }
  ]
}
\`\`\`

4. No markdown outside the JSON block.
5. Keep content production-ready but minimal — no fake features.
6. Do not invent secrets or API keys.`;
}
