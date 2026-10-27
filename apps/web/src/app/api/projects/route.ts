import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const ROOT =
  process.env.HELIX_PROJECTS_ROOT ||
  path.join(process.cwd(), ".helix", "projects");

export async function GET() {
  try {
    await fs.mkdir(ROOT, { recursive: true });
    const entries = await fs.readdir(ROOT, { withFileTypes: true });
    const projects = entries
      .filter((e) => e.isDirectory())
      .map((e) => ({
        id: e.name,
        name: e.name.replace(/_/g, " "),
        updated: "recent",
      }));
    if (projects.length === 0) {
      projects.push({ id: "demo", name: "My SaaS Starter", updated: "new" });
    }
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({
      projects: [{ id: "demo", name: "My SaaS Starter", updated: "new" }],
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = String(body.id || body.name || `project-${Date.now()}`)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 64);
    const dir = path.join(ROOT, id);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      path.join(dir, "helix.json"),
      JSON.stringify({ id, name: body.name || id, createdAt: new Date().toISOString() }, null, 2)
    );
    return NextResponse.json({ ok: true, id, name: body.name || id });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
