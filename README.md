# Helix

Open-source agentic app builder. Transparent multi-agent flow, BYOK, no credit traps.

**Flow:** Plan → Approve & Code → Apply to disk → inspect in Code/Diff tabs.

## Quick start

```bash
git clone https://github.com/wr140683-max/aether.git
cd aether
pnpm install
cp .env.example apps/web/.env.local
# add XAI_API_KEY=...
pnpm dev
```

Open http://localhost:3000

## What works

| Feature | Status |
|---------|--------|
| 3-panel UI | Done |
| Plan → tasks | Done |
| Approve → Coder | Done |
| **Apply files to `.helix/projects`** | **Done** |
| Sidebar live file list | Done |
| Code / Diff / Preview tabs | Done |
| BYOK + cost meter | Done |
| Projects API | Done |
| Dev auth (cookie session) | Done |
| Polar checkout scaffold | Done |
| Docker Compose | Done |
| Legal + compliance | Done |
| Play Store path | Documented |

## Payments

**Polar** (GitHub open source) — not forced Stripe/Razorpay.  
`docs/PAYMENTS.md`

## Self-host

```bash
docker compose up --build
```

## Still later (hosted SaaS polish)

- Real E2B live preview URL
- Better Auth / Clerk production auth
- Polar product live + webhook entitlements
- Expo Play Store companion app
- Monaco polish + Tester evidence UI

## Repo

https://github.com/wr140683-max/aether
