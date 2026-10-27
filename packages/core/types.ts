/**
 * Core types for Aether multi-agent system
 * Designed for transparency and evidence-based changes
 */

export type AgentRole = "planner" | "coder" | "tester" | "reviewer" | "deployer";

export interface Task {
  id: string;
  title: string;
  description: string;
  files?: string[];          // expected files to touch
  dependsOn?: string[];
  status: "pending" | "in_progress" | "done" | "failed" | "blocked";
}

export interface Plan {
  id: string;
  summary: string;
  architectureNotes: string;
  tasks: Task[];
  stackChoices: {
    frontend?: string;
    backend?: string;
    database?: string;
    auth?: string;
  };
  createdAt: string;
}

export interface Diff {
  path: string;
  oldContent?: string;
  newContent: string;
  explanation: string;
}

export interface TestEvidence {
  taskId: string;
  passed: boolean;
  logs: string;
  screenshots?: string[];    // base64 or urls
  exitCode: number;
  durationMs: number;
  command: string;
}

export interface AgentMessage {
  role: AgentRole;
  content: string;           // human-readable explanation
  structured?: Plan | Diff[] | TestEvidence | any;
  timestamp: string;
}

export interface ProjectContext {
  projectId: string;
  rootPath: string;
  gitBranch: string;
  currentPlan?: Plan;
  history: AgentMessage[];
}
