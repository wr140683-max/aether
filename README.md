# Helix

**Helix** is an open-source, agentic vibe-coding platform that turns natural language into production-ready full-stack apps — without the credit traps, opaque agent loops, and vendor lock-in of tools like Emergent.

> Describe what you want. Watch transparent multi-agent planning, coding, testing, and deployment. Own every line of code. Run it locally or self-host it.

## Why Helix > Emergent

| Feature | Emergent | **Helix** |
|---------|----------|-----------|
| Cost | Opaque credits that burn on loops | **BYOK + live cost meter**. Zero platform tax |
| Transparency | Black box | Full Agent Timeline: Plan → Diffs → Evidence → Approve |
| Control | Agent often ignores instructions | Human approval required for non-trivial changes |
| UI | Average polish | 3-panel workspace (Files + Preview + Agent Timeline) |
| Sandbox | Closed | E2B or local Docker (your choice) |
| Trust | Many fee/refund complaints | Compliance pack + no dark patterns |

## Architecture highlights (this commit)

- **BYOK LLM layer** (`packages/core/llm.ts`) — xAI, OpenAI, Anthropic, Google, Ollama + cost estimation
- **Sandbox abstraction** (`packages/sandbox`) — E2B (cloud) or local Docker or mock
- **Orchestrator** — plan-first, no silent full auto loops
- **Agent API** — `POST /api/agent` with action `plan`
- **Cookie banner** — equal Accept/Reject, no dark patterns (c15t ready later)
- **3-panel UI** — already scaffolded

## Current Status

### Phase 1 — nearly complete
- [x] Scaffold + Helix branding
- [x] Legal & compliance foundation
- [x] Core types + Planner / Coder / Tester
- [x] Orchestrator with plan-first design
- [x] Next.js 3-panel UI
- [x] BYOK LLM abstraction + cost meter foundation
- [x] Sandbox abstraction (E2B / Docker / mock)
- [x] Agent API route
- [x] Lightweight cookie consent
- [ ] Real AI SDK generateText wiring (deps ready)
- [ ] Full E2B / Docker implementation
- [ ] Monaco real editor + live preview iframe

### Phase 2+
Auth, payments, full-stack generation, teams, self-host Docker Compose…

## Monetization
See `docs/MONETIZATION.md`. Free local + BYOK. Hosted SaaS with transparent usage.

## Quick Start

```bash
git clone https://github.com/wr140683-max/aether.git
cd aether
pnpm install
pnpm dev
```

Set keys in `.env.local` for real models:
```
XAI_API_KEY=...
# or OPENAI_API_KEY / ANTHROPIC_API_KEY
```

## Tech choices (researched)

- Vercel AI SDK for multi-provider BYOK
- E2B as preferred cloud sandbox (open source, widely used)
- c15t for production cookie consent later
- Inspired by OpenHands canvas, assistant-ui, Sandpack patterns

## Repo
https://github.com/wr140683-max/aether

---

**Transparent. Controllable. Powerful. Monetizable.**
