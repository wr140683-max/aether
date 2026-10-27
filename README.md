# Pulse

**Pulse** is an open-source, agentic vibe-coding platform that turns natural language into production-ready full-stack apps — without the credit traps, opaque agent loops, and vendor lock-in of tools like Emergent.

> Describe what you want. Watch transparent multi-agent planning, coding, testing, and deployment. Own every line of code. Run it locally or self-host it.

**Formerly known as Aether** (repo name will be updated).

## Why Pulse > Emergent

| Feature | Emergent | **Pulse** |
|---------|----------|-----------|
| Cost model | Opaque credits that burn on loops & failed attempts | **BYOK + local models**. Pay only what the model costs you. Zero platform tax. |
| Agent transparency | Black-box. Claims "done" while features are broken | Full plan → diffs → test evidence → human approve before apply |
| Code ownership | GitHub sync restricted on lower plans | Always full Git ownership. Every change is a real commit. |
| Stack freedom | Mostly MongoDB + fixed stack | Choose Postgres / SQLite / Mongo, Next.js / Remix / Svelte, real mobile options |
| Recovery & history | Data loss reports, weak versioning | Full Git history + easy rollback. Project never disappears. |
| Control | Agent often ignores instructions & breaks working features | Human-in-the-loop by default on non-trivial changes. Explicit approve/reject. |
| Hosting | Platform-hosted with lock-in feel | Local-first, Docker self-host, or any cloud you control |
| Trust & compliance | Mixed reviews on fees, loops, support | Built-in: no dark patterns, clear policies, accessibility, data deletion, cookie consent |

## Trust & Compliance (from day one)

We maintain:

- Privacy Policy, Terms, Refund Policy, Cookie Policy
- Data deletion / subject access process
- Cookie consent banner (open-source, GDPR-friendly)
- Accessibility targets (WCAG 2.1 AA): alt text, contrast, keyboard navigation
- No hidden fees, no fake reviews, no unsupported claims
- Minimal data collection + easy unsubscribe
- Third-party SDK audit process
- Business details & contact clearly available

See `docs/legal/` and `docs/COMPLIANCE_CHECKLIST.md`.

## Core Architecture

```
User Prompt
    ↓
Planner Agent          →  breaks into clear tasks + architecture decisions
    ↓
Coder Agent            →  writes real code (with live diffs)
    ↓
Tester Agent           →  runs tests, shows logs/screenshots as evidence
    ↓
Reviewer / Human       →  approve, reject, or request changes
    ↓
Git Commit + Deploy    →  clean history + optional one-click deploy
```

Everything is observable. No hidden loops that silently burn money.

## Features (Roadmap)

### Phase 1 (Current)
- [x] Project scaffold + vision + rebrand to Pulse
- [x] Legal & compliance foundation
- [ ] Multi-agent loop (Planner → Coder → Tester)
- [ ] Web UI: chat + Monaco editor + live preview
- [ ] Local sandbox execution (Docker)
- [ ] Git-first workflow
- [ ] BYOK for xAI / OpenAI / Anthropic / local Ollama
- [ ] Cookie consent + accessibility basics

### Phase 2
- Full-stack generation
- Auth, payments, file uploads
- Diff viewer with one-click apply/reject
- Mobile preview

### Phase 3
- Self-host Docker Compose
- Plugin system
- Team features
- Advanced security scanning

## Quick Start (coming soon)

```bash
git clone https://github.com/wr140683-max/aether.git
cd aether
pnpm install
pnpm dev
```

## Tech Stack (planned)

- Frontend: Next.js 15 + Tailwind + shadcn/ui + Monaco
- Agents: Structured multi-agent with evidence contracts
- Sandbox: Docker
- Models: Bring your own keys
- Consent: c15t or equivalent open-source CMP

## Contributing

Pulse is built in the open. Issues and PRs welcome.

---

**Built to fix what Emergent got wrong.**  
Transparent. Controllable. Trustworthy. Yours.
