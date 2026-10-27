/**
 * Parse Planner LLM output into a structured Plan.
 * Tries JSON first, then falls back to a safe minimal plan.
 */

import type { Plan, Task } from "./types";

export function parsePlanFromText(text: string, userGoal: string): Plan {
  const jsonMatch =
    text.match(/```json\s*([\s\S]*?)```/) ||
    text.match(/\{[\s\S]*"tasks"[\s\S]*\}/);

  if (jsonMatch) {
    try {
      const raw = jsonMatch[1] || jsonMatch[0];
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.tasks)) {
        const tasks: Task[] = data.tasks.map((t: any, i: number) => ({
          id: t.id || `task-${i + 1}`,
          title: String(t.title || `Task ${i + 1}`),
          description: String(t.description || t.title || ""),
          files: t.files,
          status: "pending" as const,
        }));
        return {
          id: `plan-${Date.now()}`,
          summary: String(data.summary || userGoal.slice(0, 120)),
          architectureNotes: String(data.architectureNotes || ""),
          tasks,
          stackChoices: data.stackChoices || {
            frontend: "Next.js",
            backend: "Next.js API",
            database: "SQLite",
          },
          createdAt: new Date().toISOString(),
        };
      }
    } catch {
      // fall through
    }
  }

  return {
    id: `plan-${Date.now()}`,
    summary: userGoal.slice(0, 160),
    architectureNotes: "Fallback plan — model did not return valid JSON.",
    tasks: [
      {
        id: "task-1",
        title: "Implement requested feature",
        description: userGoal,
        status: "pending",
      },
    ],
    stackChoices: {
      frontend: "Next.js",
      backend: "Next.js API routes",
      database: "SQLite",
    },
    createdAt: new Date().toISOString(),
  };
}
