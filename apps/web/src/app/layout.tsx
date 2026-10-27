import type { Metadata } from "next";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Helix — Transparent Agentic App Builder",
  description:
    "Build full-stack apps with multi-agent transparency. No credit traps. Full code ownership. BYOK.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
