import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.cookies.get("helix_email")?.value;
  const plan = req.cookies.get("helix_plan")?.value || "free";
  if (!email) {
    return NextResponse.json({
      authenticated: false,
      plan: "free",
      message: "Anonymous BYOK mode.",
    });
  }
  return NextResponse.json({ authenticated: true, email, plan });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "valid email required" }, { status: 400 });
  }
  const res = NextResponse.json({
    authenticated: true,
    email,
    plan: "free",
    message: "Dev login — replace with Better Auth / Clerk later",
  });
  res.cookies.set("helix_email", email, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  res.cookies.set("helix_plan", "free", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ authenticated: false });
  res.cookies.set("helix_email", "", { maxAge: 0, path: "/" });
  res.cookies.set("helix_plan", "", { maxAge: 0, path: "/" });
  return res;
}
