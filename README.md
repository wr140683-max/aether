# Helix

**Helix** — open-source agentic app builder. Transparent agents, BYOK, no credit traps, full code ownership.

**Website + Play Store** (Emergent is website-only — this is our distribution edge).

## Quick Start (Web)

```bash
git clone https://github.com/wr140683-max/aether.git
cd aether
pnpm install
cp .env.example apps/web/.env.local
# Put XAI_API_KEY=... in apps/web/.env.local
pnpm dev
```

Open http://localhost:3000 → describe an app → Send → see Plan + tasks → Approve when ready.

## What works today

| Feature | Status |
|---------|--------|
| 3-panel UI | Done |
| Plan-first agent (no silent loops) | Done |
| Structured plan parser (tasks list) | Done |
| Live session cost meter | Done |
| BYOK (xAI / OpenAI / Anthropic / Google / Ollama) | Done |
| Sandbox abstraction (E2B / Docker) | Done |
| Cookie consent (no dark patterns) | Done |
| Legal + compliance pack | Done |
| Monetization + distribution plan | Done |
| Mobile (Expo) scaffold + Play Store path | Documented |

## Money path

See `docs/DISTRIBUTION.md` and `docs/MONETIZATION.md`.

**Short version:**
1. **Web free** — local + BYOK (builds trust)
2. **Web paid** — hosted sandboxes + managed keys (Starter / Pro)
3. **Play Store app** — companion (approve from phone, notifications) → same Pro subscription via Play Billing
4. Emergent has no Play Store presence → extra discovery channel for Helix

## Remaining to ship & earn

1. Coder step after Approve (write files in sandbox)
2. Auth + save projects
3. Hosted E2B minutes + Stripe
4. Expo companion app → Play Store internal testing

## Repo
https://github.com/wr140683-max/aether

---
**Web + Mobile. Transparent. Controllable. Monetizable.**
