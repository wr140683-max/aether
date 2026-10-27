import { NextRequest, NextResponse } from "next/server";
import { createSandbox } from "../../../../../packages/sandbox";
import { writeProjectFiles, listProjectFiles } from "../../../../../packages/sandbox/localFs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const projectId = String(body.projectId || "demo");
    const files = Array.isArray(body.files) ? body.files : [];
    if (!files.length) {
      return NextResponse.json({ error: "files required" }, { status: 400 });
    }
    const normalized = files
      .filter((f: any) => f && f.path)
      .map((f: any) => ({
        path: String(f.path),
        content: String(f.content ?? ""),
      }));
    const { written, root } = await writeProjectFiles(projectId, normalized);
    const sbx = await createSandbox({ backend: "local", projectId });
    await sbx.writeFiles(normalized);
    const all = await listProjectFiles(projectId);
    return NextResponse.json({ ok: true, written, root, files: all, sandboxId: sbx.id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message || "Apply failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId") || "demo";
  try {
    const files = await listProjectFiles(projectId);
    return NextResponse.json({ projectId, files });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
