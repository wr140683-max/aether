import { promises as fs } from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function ensureGitSnapshot(
  projectRoot: string,
  message = "helix: apply"
): Promise<{ ok: boolean; log: string }> {
  try {
    await fs.access(projectRoot);
  } catch {
    return { ok: false, log: "project root missing" };
  }

  const gitDir = path.join(projectRoot, ".git");
  try {
    await fs.access(gitDir);
  } catch {
    try {
      await execFileAsync("git", ["init"], { cwd: projectRoot });
    } catch (e: any) {
      return { ok: false, log: e?.message || "git init failed" };
    }
  }

  try {
    await execFileAsync("git", ["add", "-A"], { cwd: projectRoot });
    await execFileAsync(
      "git",
      [
        "-c",
        "user.email=helix@local",
        "-c",
        "user.name=Helix",
        "commit",
        "-m",
        message,
        "--allow-empty",
      ],
      { cwd: projectRoot }
    );
    return { ok: true, log: `committed: ${message}` };
  } catch (e: any) {
    const msg = e?.stderr || e?.message || "commit skipped";
    return { ok: false, log: String(msg).slice(0, 300) };
  }
}
