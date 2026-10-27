# Helix

**Transparent open-source agentic app builder.**

Plan → Approve → Code → Apply. You stay in control. Bring your own API keys. No credit roulette.

> **Status:** Alpha (v0.1). Core loop works for local / self-host use. Hosted SaaS polish is in progress.  
> This README only documents features that exist in the repo today.

---

## Why Helix

Many vibe-coding tools hide cost, loop agents without approval, and lock you into one stack.

Helix is built around the opposite:

| Principle | What you get |
|-----------|----------------|
| **Evidence first** | Plan and file diffs before anything is written |
| **Human in the loop** | Approve / reject at plan and apply steps |
| **BYOK** | xAI, OpenAI, Anthropic, Google — keys stay on your server |
| **Cost meter** | Session cost shown in the UI |
| **Own the code** | Files land in `.helix/projects` — export anytime |
| **Self-host** | Docker Compose included |

---

## What works today

| Area | Status |
|------|--------|
| 3-panel workspace (Files · Preview/Diff/Code · Agent) | Done |
| Planner → structured tasks | Done |
| Approve → Coder → generated files | Done |
| Apply to disk (`.helix/projects/<id>`) | Done |
| Live sidebar file list | Done |
| Session cost meter | Done |
| Projects API (create / list) | Done |
| Dev session cookies | Done |
| Polar checkout **scaffold** | Done (needs your Polar product) |
| Security hardening (path, rate limit, CSP) | Done |
| Legal docs (privacy, terms, cookies, refund, deletion) | Done |
| Docker Compose | Done |
| Tester API (`action: test`) | Done (sandbox evidence) |
| Optional git snapshot on apply | Done |

### Not done yet (honest)

- Live E2B preview URL (stub until `E2B_API_KEY` + real client)
- Production auth (Better Auth / Clerk) — cookie login is **dev only**
- Live Polar entitlements after payment
- Expo / Play Store companion app
- Full Tester agent execution UI
- Monaco editor polish

---

## Quick start

**Requirements:** Node 20+, pnpm 9+

```bash
git clone https://github.com/wr140683-max/aether.git
cd aether
pnpm install
cp .env.example apps/web/.env.local
```

Edit `apps/web/.env.local`:

```env
XAI_API_KEY=your_key_here
# optional: OPENAI_API_KEY, ANTHROPIC_API_KEY, …
```

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

1. Type a goal (e.g. “Build a simple todo API with Next.js”)
2. Review the plan → **Approve & Code**
3. Review files → **Apply to disk**
4. Inspect under **Code** / **Diff** tabs

---

## Architecture

```
apps/web          Next.js UI + API routes
packages/core     Orchestrator, LLM abstraction, security helpers
packages/agents   Planner / Coder / Tester prompts
packages/sandbox  E2B | Docker | local FS backends
docs/             Architecture, payments, security, legal
```

**Flow**

```
User goal
  → Planner (JSON plan + tasks)
  → Human approve
  → Coder (file payloads)
  → Human apply
  → localFs / sandbox write
```

See `docs/architecture.md` and `docs/SECURITY.md`.

---

## Self-host

```bash
docker compose up --build
```

Set secrets via environment (see `.env.example`).

---

## Payments (optional)

Helix is free to self-host with BYOK.

Hosted Pro path uses **[Polar](https://github.com/polarsource/polar)** (open-source merchant of record) — not forced Stripe.

```env
POLAR_ACCESS_TOKEN=
POLAR_PRODUCT_ID=
POLAR_WEBHOOK_SECRET=
```

Details: `docs/PAYMENTS.md` · UI: `/pricing`

---

## Security

- Path traversal blocked; sensitive filenames blocked
- Write size limits
- Rate limits on mutating APIs
- Client-supplied API keys **off** by default
- Production mutations require session or `x-helix-secret`
- CSP + security headers

```bash
pnpm test:security
```

Full notes: `docs/SECURITY.md`

---

## Docs

| Doc | Content |
|-----|---------|
| `docs/architecture.md` | System design |
| `docs/SECURITY.md` | Threat model + checklist |
| `docs/PAYMENTS.md` | Polar setup |
| `docs/MONETIZATION.md` | Pricing thinking |
| `docs/COMPLIANCE_CHECKLIST.md` | a11y, cookies, dark patterns |
| `docs/legal/*` | Privacy, Terms, Cookies, Refund, Data deletion |
| `docs/NEXT_STEPS.md` | Remaining polish |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Issues and PRs welcome.

---

## License

[MIT](./LICENSE)

---

## Disclaimer

Helix is alpha software. LLM output can be wrong or unsafe. Review every plan and diff before apply. Do not point it at production secrets or untrusted prompts without isolation.
