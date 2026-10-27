# Aether

**Aether** is an open-source, agentic vibe-coding platform that turns natural language into production-ready full-stack apps — without the credit traps, opaque agent loops, and vendor lock-in of tools like Emergent.

> Describe what you want. Watch transparent multi-agent planning, coding, testing, and deployment. Own every line of code. Run it locally or self-host it.

## Why Aether > Emergent

| Feature | Emergent | **Aether** |
|---------|----------|------------|
| Cost model | Opaque credits that burn on loops & failed attempts | **BYOK + local models**. Pay only what the model costs you. Zero platform tax. |
| Agent transparency | Black-box. Claims "done" while features are broken | Full plan → diffs → test evidence → human approve before apply |
| Code ownership | GitHub sync restricted on lower plans | Always full Git ownership. Every change is a real commit. |
| Stack freedom | Mostly MongoDB + fixed stack | Choose Postgres / SQLite / Mongo, Next.js / Remix / Svelte, real mobile options |
| Recovery & history | Data loss reports, weak versioning | Full Git history + easy rollback. Project never disappears. |
| Control | Agent often ignores instructions & breaks working features | Human-in-the-loop by default on non-trivial changes. Explicit approve/reject. |
| Hosting | Platform-hosted with lock-in feel | Local-first, Docker self-host, or any cloud you control |
| Open source | Closed | Fully open source. Fork it, extend it, make it yours. |

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

### Phase 1 (Current – MVP)
- [x] Project scaffold + vision
- [ ] Multi-agent loop (Planner → Coder → Tester)
- [ ] Web UI: chat + Monaco editor + live preview
- [ ] Local sandbox execution (Docker)
- [ ] Git-first workflow (commit every accepted change)
- [ ] BYOK for xAI / OpenAI / Anthropic / local Ollama

### Phase 2
- Full-stack generation (Next.js + FastAPI/Node + chosen DB)
- Auth, payments, file uploads out of the box
- Diff viewer with one-click apply/reject
- Mobile preview (Expo)

### Phase 3
- Self-host Docker Compose
- Plugin system for custom tools
- Team collaboration + shared workspaces
- Advanced security scanning before deploy

## Quick Start (coming very soon)

```bash
# Clone
git clone https://github.com/wr140683-max/aether.git
cd aether

# Install
pnpm install

# Run (local)
pnpm dev
```

## Tech Stack (planned)

- **Frontend**: Next.js 15 + Tailwind + shadcn/ui + Monaco
- **Agent Orchestration**: Custom multi-agent + LangGraph-style flow
- **Sandbox**: Docker / E2B-style isolated environments
- **Database options**: SQLite (default), Postgres, Mongo
- **Models**: Bring your own keys (xAI Grok, Claude, GPT, Gemini, Ollama)

## Contributing

Aether is built in the open. Issues, PRs, and ideas are welcome.

---

**Built to fix what Emergent got wrong.**  
Transparent. Controllable. Yours.
