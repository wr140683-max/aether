# Aether Architecture

## High-level Flow

1. **User** describes the app or change in natural language.
2. **Planner Agent** produces:
   - High-level architecture decisions
   - Ordered list of concrete tasks
   - File-level plan
3. **Coder Agent** implements one task at a time, producing real diffs.
4. **Tester Agent** runs automated checks (unit, typecheck, e2e if possible) and returns evidence (logs, screenshots, exit codes).
5. **Human / Reviewer** sees the plan + diffs + evidence and can:
   - Approve → commit to Git
   - Reject → feedback goes back to Coder
   - Request changes
6. Optional **Deployer** pushes to a target (Vercel, Fly, Docker, etc.)

## Design Principles (fixes Emergent problems)

- **Observable by default**: every agent step is logged and shown in the UI.
- **No silent loops**: if Tester fails more than N times, the system stops and asks the human.
- **Git is the source of truth**: every accepted change becomes a real commit with a clear message.
- **BYOK first**: platform never holds or meters your model spend.
- **Human-in-the-loop for non-trivial work**: small pure refactors can be auto-applied; feature work requires approval.
- **Evidence over claims**: "I fixed it" is not accepted. Tester must produce passing evidence.

## Package Layout

```
aether/
├── apps/
│   └── web/                 # Next.js UI (chat + editor + preview)
├── packages/
│   ├── agents/              # Planner, Coder, Tester, Reviewer agents
│   ├── core/                # Shared types, prompts, orchestration
│   └── sandbox/             # Isolated code execution (Docker)
└── docs/
```

## Agent Contracts

Each agent receives a structured context and must return structured output (JSON + optional markdown explanation). This prevents free-form hallucination of "done".

## Next Implementation Steps

1. Define shared types (`Task`, `Diff`, `TestEvidence`, `Plan`)
2. Implement Planner prompt + structured output
3. Implement Coder that can edit files in a workspace
4. Wire a minimal Docker sandbox
5. Build the chat UI that streams agent steps
