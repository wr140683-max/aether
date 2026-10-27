import { createHmac } from "crypto";
import assert from "assert";
import path from "path";

function sanitizePath(p) {
  if (typeof p !== "string" || !p.trim()) throw new Error("Empty path");
  if (p.includes("\0")) throw new Error("Null byte in path");
  if (p.length > 240) throw new Error("Path too long");
  if (path.isAbsolute(p) || /^[a-zA-Z]:[\\/]/.test(p) || p.startsWith("\\\\")) {
    throw new Error("Absolute paths not allowed");
  }
  const normalized = path.posix.normalize(p.replace(/\\/g, "/")).replace(/^\/+/, "");
  if (normalized.startsWith("..") || normalized.includes("/../") || normalized === "..") {
    throw new Error("Path traversal rejected");
  }
  const segments = normalized.split("/").filter(Boolean);
  for (const seg of segments) {
    if (seg === ".." || seg === "node_modules" || seg === ".git") {
      throw new Error(`Blocked path segment: ${seg}`);
    }
  }
  const base = segments[segments.length - 1] || "";
  if (/^(id_rsa|\.env|\.env\..+)$/i.test(base)) {
    throw new Error(`Blocked filename: ${base}`);
  }
  return segments.join("/");
}

function safeSuccessUrl(candidate, allowedOrigins) {
  const fallback = "http://localhost:3000/pricing?success=1";
  if (typeof candidate !== "string") return fallback;
  if (!candidate.startsWith("http://") && !candidate.startsWith("https://")) return fallback;
  try {
    const u = new URL(candidate);
    if (!allowedOrigins.includes(u.origin)) return fallback;
    return u.toString();
  } catch {
    return fallback;
  }
}

function verifyHmac(raw, sig, secret) {
  if (!sig || !secret) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const provided = sig.replace(/^sha256=/i, "").trim();
  return expected === provided;
}

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    console.log("  \u2713", name);
    passed++;
  } catch (e) {
    console.error("  \u2717", name, "\u2014", e.message);
    failed++;
  }
}

console.log("\nHelix security tests\n");
test("rejects path traversal", () => assert.throws(() => sanitizePath("../../../etc/passwd")));
test("rejects absolute path", () => assert.throws(() => sanitizePath("/etc/passwd")));
test("rejects null byte", () => assert.throws(() => sanitizePath("foo\0bar.ts")));
test("rejects .env", () => assert.throws(() => sanitizePath("src/.env")));
test("allows normal path", () => assert.equal(sanitizePath("apps/web/page.tsx"), "apps/web/page.tsx"));
test("blocks open redirect", () => {
  const url = safeSuccessUrl("https://evil.com/x", ["http://localhost:3000"]);
  assert.ok(url.includes("localhost"));
});
test("hmac ok", () => {
  const body = "{}";
  const secret = "s";
  const sig = createHmac("sha256", secret).update(body).digest("hex");
  assert.equal(verifyHmac(body, sig, secret), true);
});
console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
