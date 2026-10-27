import { promises as fs } from "fs";
import path from "path";

const ROOT = process.env.HELIX_PROJECTS_ROOT || path.join(process.cwd(), ".helix", "projects");

export async function ensureProjectDir(projectId: string): Promise<string> {
  const dir = path.join(ROOT, sanitize(projectId));
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export async function writeProjectFiles(
  projectId: string,
  files: { path: string; content: string }[]
): Promise<{ written: string[]; root: string }> {
  const root = await ensureProjectDir(projectId);
  const written: string[] = [];
  for (const f of files) {
    if (!f.content && f.content !== "") continue;
    const safe = sanitizePath(f.path);
    const full = path.join(root, safe);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, f.content, "utf8");
    written.push(safe);
  }
  return { written, root };
}

export async function listProjectFiles(projectId: string): Promise<string[]> {
  const root = path.join(ROOT, sanitize(projectId));
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
  const full = path.join(ROOT, sanitize(projectId), sanitizePath(filePath));
  try {
    return await fs.readFile(full, "utf8");
  } catch {
    return null;
  }
}

function sanitize(id: string) {
  return id.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 64);
}

function sanitizePath(p: string) {
  return p.replace(/\.\./g, "").replace(/^\/+/, "");
}

async function walk(dir: string, base: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full, base)));
    else out.push(path.relative(base, full).replace(/\\/g, "/"));
  }
  return out;
}
