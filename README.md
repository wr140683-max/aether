# Helix

**Helix** is an open-source, agentic vibe-coding platform that turns natural language into production-ready full-stack apps — without the credit traps, opaque agent loops, and vendor lock-in of tools like Emergent.

> Describe what you want. Watch transparent multi-agent planning, coding, testing, and deployment. Own every line of code. Run it locally or self-host it.

## Why Helix is better than Emergent

| Feature | Emergent | **Helix** |
|---------|----------|-----------|
| Cost | Opaque credits that burn on loops | **BYOK + live cost meter**. Zero platform tax on model spend |
| Transparency | Black box | Full **Agent Timeline**: Plan → Diffs → Test Evidence → Approve |
| Control | Agent often ignores instructions | Human approval required for non-trivial changes |
| UI | Functional but average polish | 3-panel workspace (Files + Live Preview + Agent Timeline) |
| Ownership | Sometimes restricted | Always full Git ownership |
| Trust | Many complaints about fees & refunds | Built-in compliance, no dark patterns, clear refund policy |

## UI (designed better than Emergent)

```
┌──────────────┐─────────────────────────┐─────────────────────┐
│  Projects    │   Live Preview / Diffs  │  Agent Timeline      │
│  + Files     │   (updates after        │  Plan → Code →       │
│  + History   │    each approval)       │  Evidence → Approve  │
└──────────────┴──────────────────────────┴──────────────────────┘
```

- Every agent step is visible
- Diffs shown before apply
- Big clear **Approve / Reject / Feedback** buttons
- Live session cost (BYOK)
- Keyboard accessible, good contrast

## Current Status

### Phase 1
- [x] Scaffold + rebrand to Helix
- [x] Legal & compliance foundation
- [x] Core types + Planner / Coder / Tester / Orchestrator skeletons
- [x] **Next.js 3-panel UI** (TopBar, Sidebar, Preview, Agent Timeline)
- [x] Monetization principles documented
- [ ] Wire real model calls (BYOK)
- [ ] Docker sandbox
- [ ] Cookie consent + full a11y pass

### Phase 2–3
Full-stack generation, auth, payments, self-host, teams…

## Monetization
See `docs/MONETIZATION.md`.  
Core idea: free/local + BYOK stays free of platform tax. Hosted version earns money with transparent pricing.

## Quick Start (UI)

```bash
git clone https://github.com/wr140683-max/aether.git
cd aether
pnpm install
pnpm dev
```

## Tech

- Next.js 15 + Tailwind + Monaco
- Structured multi-agent with evidence contracts
- BYOK (xAI, Claude, GPT, Ollama)
- Inspired by best of: assistant-ui, OpenHands canvas, Vercel AI chatbot, Sandpack-style previews

## Repo
https://github.com/wr140683-max/aether

---

**Transparent. Controllable. Monetizable. Yours.**
