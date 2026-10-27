import { promises as fs } from "fs";
import path from "path";

const ROOT =
  process.env.HELIX_PROJECTS_ROOT ||
  path.join(process.cwd(), ".helix", "projects");

const MAX_PATH_LEN = 240;
const MAX_FILE_BYTES = 512 * 1024;
const MAX_FILES_PER_WRITE = 40;
const MAX_TOTAL_BYTES = 2 * 1024 * 1024;

const BLOCKED_SEGMENTS = new Set([
  "..",
  ".",
  "",
  "node_modules",
  ".git",
  ".env",
  ".env.local",
  ".ssh",
  ".aws",
]);

const BLOCKED_BASENAMES = /^(id_rsa|id_ed25519|\.env|\.env\..+|credentials|\.npmrc|\.netrc)$/i;

export class SecurityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SecurityError";
  }
}

export function sanitizeProjectId(id: string): string {
  const s = String(id || "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 64);
  if (!s || s === "." || s === "..") {
    throw new SecurityError("Invalid project id");
  }
  return s;
}

export function sanitizePath(p: string): string {
  if (typeof p !== "string" || !p.trim()) {
    throw new SecurityError("Empty path");
  }
  if (p.includes("\0")) {
    throw new SecurityError("Null byte in path");
  }
  if (p.length > MAX_PATH_LEN) {
    throw new SecurityError("Path too long");
  }
  if (path.isAbsolute(p) || /^[a-zA-Z]:[\\/]/.test(p) || p.startsWith("\\\\")) {
    throw new SecurityError("Absolute paths not allowed");
  }

  const normalized = path.posix.normalize(p.replace(/\\/g, "/")).replace(/^\/+/, "");
  if (normalized.startsWith("..") || normalized.includes("/../") || normalized === "..") {
    throw new SecurityError("Path traversal rejected");
  }

  const segments = normalized.split("/").filter(Boolean);
  for (const seg of segments) {
    if (BLOCKED_SEGMENTS.has(seg) || seg === ".." || seg.includes("\0")) {
      throw new SecurityError(`Blocked path segment: ${seg}`);
    }
  }

  const base = segments[segments.length - 1] || "";
  if (BLOCKED_BASENAMES.test(base)) {
    throw new SecurityError(`Blocked filename: ${base}`);
  }

  return segments.join("/");
}

export async function assertInsideRoot(root: string, target: string): Promise<string> {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(target);
  if (
    resolvedTarget !== resolvedRoot &&
    !resolvedTarget.startsWith(resolvedRoot + path.sep)
  ) {
    throw new SecurityError("Path escapes project root");
  }
  return resolvedTarget;
}

export async function ensureProjectDir(projectId: string): Promise<string> {
  const dir = path.join(ROOT, sanitizeProjectId(projectId));
  await fs.mkdir(dir, { recursive: true });
  return path.resolve(dir);
}

export async function writeProjectFiles(
  projectId: string,
  files: { path: string; content: string }[]
): Promise<{ written: string[]; root: string }> {
  if (!Array.isArray(files) || files.length === 0) {
    throw new SecurityError("No files to write");
  }
  if (files.length > MAX_FILES_PER_WRITE) {
    throw new SecurityError(`Too many files (max ${MAX_FILES_PER_WRITE})`);
  }

  let total = 0;
  const root = await ensureProjectDir(projectId);
  const written: string[] = [];

  for (const f of files) {
    const content = f.content == null ? "" : String(f.content);
    const bytes = Buffer.byteLength(content, "utf8");
    if (bytes > MAX_FILE_BYTES) {
      throw new SecurityError(`File too large: ${f.path}`);
    }
    total += bytes;
    if (total > MAX_TOTAL_BYTES) {
      throw new SecurityError("Total write size exceeded");
    }

    const safe = sanitizePath(String(f.path));
    const full = path.join(root, safe);
    await assertInsideRoot(root, full);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, content, { encoding: "utf8", mode: 0o644 });
    written.push(safe);
  }

  return { written, root };
}

export async function listProjectFiles(projectId: string): Promise<string[]> {
  const root = path.join(ROOT, sanitizeProjectId(projectId));
  try {
    return await walk(root, root);
  } catch {
    return [];
  }
}

export async function readProjectFile(
  projectId: string,
  filePath: string
): Promise<string | null> {
  const root = path.join(ROOT, sanitizeProjectId(projectId));
  const safe = sanitizePath(filePath);
  const full = path.join(root, safe);
  await assertInsideRoot(path.resolve(root), full);
  try {
    const buf = await fs.readFile(full);
    if (buf.length > MAX_FILE_BYTES) {
      throw new SecurityError("File too large to read");
    }
    return buf.toString("utf8");
  } catch (e: any) {
    if (e instanceof SecurityError) throw e;
    return null;
  }
}

async function walk(dir: string, base: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === "node_modules" || e.name === ".git") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full, base)));
    else out.push(path.relative(base, full).replace(/\\/g, "/"));
  }
  return out;
}
