# Helix

**Helix** is an open-source, agentic vibe-coding platform that turns natural language into production-ready full-stack apps — without the credit traps, opaque agent loops, and vendor lock-in of tools like Emergent.

> Describe what you want. Watch transparent multi-agent planning, coding, testing, and deployment. Own every line of code. Run it locally or self-host it.

**Previous temporary names:** Aether → Pulse → **Helix** (final for now).

## Why Helix > Emergent

| Feature | Emergent | **Helix** |
|---------|----------|-----------|
| Cost model | Opaque credits that burn on loops | **BYOK + local models**. Zero platform tax |
| Agent transparency | Black-box | Full plan → diffs → test **evidence** → human approve |
| Code ownership | Restricted on lower plans | Always full Git ownership |
| Stack freedom | Mostly fixed | Multi-stack choice |
| Recovery | Data loss reports | Full Git history + easy rollback |
| Control | Agent breaks features | Human-in-the-loop by default |
| Trust | Mixed reviews on fees & loops | No dark patterns, clear policies, a11y, data deletion |

## Trust & Compliance (day one)

- Privacy, Terms, Refund, Cookie policies
- Data deletion process
- Compliance checklist (dark patterns, a11y, SDKs, claims, fonts)
- Cookie consent (open-source CMP planned: c15t etc.)
- WCAG targets: alt text, contrast, keyboard navigation

See `docs/legal/` and `docs/COMPLIANCE_CHECKLIST.md`.

## Core Architecture

```
User Prompt
    ↓
Planner Agent
    ↓
Coder Agent          → real diffs
    ↓
Tester Agent         → evidence (logs, exit codes)
    ↓
Human Review         → approve / reject / feedback
    ↓
Git Commit + Deploy
```

No silent loops. Max retries then escalate.

## Current Status (Phase 1 progress)

- [x] Project scaffold + rebrand to Helix
- [x] Legal & compliance foundation
- [x] Core types (Plan, Task, Diff, TestEvidence)
- [x] Planner, Coder, Tester agent skeletons
- [x] Orchestrator skeleton (retry limits + human checkpoint design)
- [ ] Wire real model calls (BYOK)
- [ ] Docker sandbox execution
- [ ] Basic Next.js UI (chat + diffs + approve)
- [ ] Cookie consent component + a11y basics

## Tech Stack (planned)

- Next.js 15 + Tailwind + shadcn/ui + Monaco
- Structured multi-agent with evidence contracts
- Docker sandbox
- BYOK (xAI Grok, Claude, GPT, Ollama)
- Consent: c15t or equivalent

## Repo

https://github.com/wr140683-max/aether  
(Content is Helix. Repo rename can happen later.)

## Contributing

Built in the open. Issues & PRs welcome.

---

**Transparent. Controllable. Trustworthy.**
