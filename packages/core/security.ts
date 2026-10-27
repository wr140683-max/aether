import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

const rateMap = new Map<string, { count: number; resetAt: number }>();

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const row = rateMap.get(key);
  if (!row || now > row.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (row.count >= limit) return { ok: false, remaining: 0 };
  row.count += 1;
  return { ok: true, remaining: limit - row.count };
}

export function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

export function resolveApiKey(bodyKey: unknown, envKeys: string[]): string | undefined {
  const allowClient = process.env.HELIX_ALLOW_CLIENT_KEYS === "1";
  if (allowClient && typeof bodyKey === "string" && bodyKey.length > 0) {
    return bodyKey.slice(0, 256);
  }
  for (const k of envKeys) {
    const v = process.env[k];
    if (v) return v;
  }
  return undefined;
}

export function allowedAppOrigins(): string[] {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const extra = (process.env.HELIX_ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return [base, ...extra];
}

export function safeSuccessUrl(candidate: unknown): string {
  const fallback =
    (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000") +
    "/pricing?success=1";
  if (typeof candidate !== "string") return fallback;
  if (!candidate.startsWith("https://") && !candidate.startsWith("http://")) {
    return fallback;
  }
  try {
    const u = new URL(candidate);
    const allowed = allowedAppOrigins().map((o) => new URL(o).origin);
    if (!allowed.includes(u.origin)) return fallback;
    return u.toString();
  } catch {
    return fallback;
  }
}

export function verifyHmacSha256(
  rawBody: string,
  signatureHeader: string | null,
  secret: string
): boolean {
  if (!signatureHeader || !secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const provided = signatureHeader.replace(/^sha256=/i, "").trim();
  try {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(provided, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function hasValidApiSecret(req: NextRequest): boolean {
  const secret = process.env.HELIX_API_SECRET;
  if (!secret) return false;
  const header = req.headers.get("x-helix-secret") || "";
  try {
    const a = Buffer.from(secret, "utf8");
    const b = Buffer.from(header, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function canMutate(req: NextRequest): boolean {
  if (!isProd()) return true;
  if (req.cookies.get("helix_email")?.value) return true;
  if (hasValidApiSecret(req)) return true;
  return false;
}
