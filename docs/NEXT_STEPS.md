# Helix — Immediate Next Steps

## What works now
1. 3-panel UI loads
2. Type a goal → Send → calls `/api/agent` → Planner runs
3. Cost meter updates (session)
4. Cookie banner appears
5. BYOK layer tries real AI SDK, falls back cleanly if no key/packages

## To get real AI plans today
```bash
cd aether
pnpm install
# add real keys
cp .env.example apps/web/.env.local
# edit apps/web/.env.local and put XAI_API_KEY=...
pnpm dev
```

Then open http://localhost:3000 and send a prompt.

## Recommended order of remaining work
1. Parse Planner JSON properly into structured Plan (tasks list in UI)
2. Implement Coder step after Approve (write files into sandbox)
3. Wire real E2B when E2B_API_KEY is present
4. Monaco editor for Diff / Code tabs
5. Auth (Clerk or NextAuth) + simple billing for hosted mode
6. Docker Compose for full self-host

## Design rules to keep
- Never auto-apply non-trivial changes
- Always show estimated / actual cost
- Evidence over claims
- BYOK remains first-class
