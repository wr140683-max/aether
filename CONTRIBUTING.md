# Contributing to Helix

Thanks for helping. Keep changes small, honest, and tested.

## Setup

```bash
pnpm install
cp .env.example apps/web/.env.local
# add at least one LLM key
pnpm dev
```

## Rules

1. **No fake claims** in README or docs — only document what runs.
2. Prefer fixing security / transparency bugs over new UI chrome.
3. Mutating APIs must stay behind rate limits + `canMutate` checks.
4. Do not commit `.env`, `.helix/`, or real API keys.
5. Run security tests when touching paths or auth:

```bash
node packages/core/__tests__/security.test.mjs
```

## Project layout

- `apps/web` — UI + route handlers
- `packages/core` — orchestrator, LLM, security
- `packages/agents` — planner / coder / tester prompts
- `packages/sandbox` — execution backends

## PR checklist

- [ ] Feature works locally with BYOK
- [ ] No secrets in the diff
- [ ] README / docs updated only if behaviour changed
- [ ] Security tests pass if FS/auth touched
