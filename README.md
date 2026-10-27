# Helix

**Helix** — open-source agentic app builder. Transparent agents, BYOK, no credit traps, full code ownership.

**Website + Play Store path** (Emergent is website-only).

## Quick Start

```bash
git clone https://github.com/wr140683-max/aether.git
cd aether
pnpm install
cp .env.example apps/web/.env.local
# Add XAI_API_KEY=... 
pnpm dev
```

Flow: describe app → **Plan** → **Approve & Code** → see generated files.

## Status

| Feature | Status |
|---------|--------|
| 3-panel UI | Done |
| Plan-first agent | Done |
| Structured tasks | Done |
| **Approve → Coder (file generation)** | **Done** |
| Live cost meter | Done |
| BYOK (multi-provider) | Done |
| Sandbox abstraction | Done (apply-to-disk next) |
| Cookie + legal pack | Done |
| Payments plan (Polar primary) | Done |
| Auth / billing live | Not yet |
| Play Store app | Documented |

## Payments (no forced Stripe)

Primary: **Polar** (open source on GitHub)  
See `docs/PAYMENTS.md`

## Repo
https://github.com/wr140683-max/aether
