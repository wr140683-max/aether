/**
 * Helix Sandbox abstraction
 *
 * Two backends planned:
 * 1. E2B (cloud microVMs) — best for hosted / fast agent runs
 * 2. Local Docker — best for self-host and full control
 *
 * Agents only talk to this interface. Swap backend without changing agents.
 */

export interface SandboxResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  durationMs: number;
}

export interface SandboxFile {
  path: string;
  content: string;
}

export interface Sandbox {
  id: string;
  run(command: string, opts?: { timeoutMs?: number; cwd?: string }): Promise<SandboxResult>;
  writeFiles(files: SandboxFile[]): Promise<void>;
  readFile(path: string): Promise<string>;
  destroy(): Promise<void>;
}

export type SandboxBackend = "e2b" | "docker" | "mock";

export interface CreateSandboxOptions {
  backend?: SandboxBackend;
  template?: string;
  timeoutMs?: number;
  env?: Record<string, string>;
}

export async function createSandbox(
  opts: CreateSandboxOptions = {}
): Promise<Sandbox> {
  const backend = opts.backend ?? (process.env.E2B_API_KEY ? "e2b" : "mock");

  if (backend === "e2b") {
    return createE2BSandbox(opts);
  }
  if (backend === "docker") {
    return createDockerSandbox(opts);
  }
  return createMockSandbox(opts);
}

async function createE2BSandbox(opts: CreateSandboxOptions): Promise<Sandbox> {
  const id = `e2b-stub-${Date.now()}`;
  return {
    id,
    async run(command) {
      return {
        stdout: `[E2B stub] would run: ${command}`,
        stderr: "",
        exitCode: 0,
        durationMs: 10,
      };
    },
    async writeFiles() {},
    async readFile(path) {
      return `// stub content for ${path}`;
    },
    async destroy() {},
  };
}

async function createDockerSandbox(opts: CreateSandboxOptions): Promise<Sandbox> {
  const id = `docker-stub-${Date.now()}`;
  return {
    id,
    async run(command) {
      return {
        stdout: `[Docker stub] would run: ${command}`,
        stderr: "",
        exitCode: 0,
        durationMs: 10,
      };
    },
    async writeFiles() {},
    async readFile(path) {
      return `// stub content for ${path}`;
    },
    async destroy() {},
  };
}

async function createMockSandbox(opts: CreateSandboxOptions): Promise<Sandbox> {
  const id = `mock-${Date.now()}`;
  const files = new Map<string, string>();
  return {
    id,
    async run(command) {
      return {
        stdout: `[mock] ${command}`,
        stderr: "",
        exitCode: 0,
        durationMs: 1,
      };
    },
    async writeFiles(fs) {
      for (const f of fs) files.set(f.path, f.content);
    },
    async readFile(path) {
      return files.get(path) ?? "";
    },
    async destroy() {
      files.clear();
    },
  };
}
