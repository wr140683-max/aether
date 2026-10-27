# Helix

**Helix** — open-source agentic vibe-coding platform. Transparent multi-agent builds, BYOK, no credit traps, full code ownership.

Better than Emergent by design: plan → diffs → evidence → human approve. Live cost meter. E2B or local Docker sandbox.

## Quick Start

```bash
git clone https://github.com/wr140683-max/aether.git
cd aether
pnpm install
cp .env.example apps/web/.env.local
# Add XAI_API_KEY=... (or OPENAI_API_KEY) into apps/web/.env.local
pnpm dev
```

Open http://localhost:3000 → type a goal → Send. Planner runs. You stay in control.

## What is ready

| Area | Status |
|------|--------|
| 3-panel UI (Files + Preview + Agent Timeline) | Done |
| Agent Timeline connected to API | Done |
| BYOK LLM layer (xAI / OpenAI / Anthropic / Google / Ollama) | Done + real AI SDK ready |
| Cost estimation | Done |
| Sandbox abstraction (E2B / Docker / mock) | Done |
| Cookie consent (no dark patterns) | Done |
| Legal + compliance pack | Done |
| Monetization principles | Done |
| Plan-first orchestrator (no silent loops) | Done |

## Remaining (high value)

1. Parse structured Plan JSON into task list in UI
2. Coder step after Approve (write into sandbox)
3. Real E2B when key present
4. Monaco + live preview iframe
5. Auth + hosted billing

See `docs/NEXT_STEPS.md` and `docs/MONETIZATION.md`.

## Stack

- Next.js 15 + Tailwind
- Vercel AI SDK (BYOK)
- E2B preferred sandbox
- Human-in-the-loop by default

## Repo
https://github.com/wr140683-max/aether

---
**Transparent. Controllable. Powerful.**
