# Helix Security

## Threat model (alpha)

Helix runs LLM-generated code paths and writes files. Main risks:

1. **Path traversal** on apply/write
2. **Unauthenticated mutation** of projects
3. **API key abuse** if client can send provider keys
4. **Open redirect** via Polar success_url
5. **Webhook forgery** without signature verification
6. **Prompt / payload size** DoS

## Mitigations implemented

| Control | Implementation |
|---------|----------------|
| Path traversal | `sanitizePath` + `assertInsideRoot` in `localFs.ts` |
| Sensitive filenames | Block `.env`, `id_rsa`, `node_modules`, `.git` |
| Write limits | Max 40 files, 512KB/file, 2MB total |
| Rate limits | In-memory per IP on agent/apply/projects/auth/polar |
| Client API keys | Disabled unless `HELIX_ALLOW_CLIENT_KEYS=1` |
| Apply / project create | Prod requires session cookie or `x-helix-secret` |
| Polar success_url | Origin allowlist via `safeSuccessUrl` |
| Polar webhook | HMAC when secret set; mandatory in production |
| Cookies | `httpOnly`, `sameSite=lax`, `secure` in production |
| Headers | CSP, X-Frame-Options DENY, nosniff, referrer policy |
| Error leakage | Generic 500 messages; no Polar raw dumps |

## Run security tests

```bash
node packages/core/__tests__/security.test.mjs
```

## Production checklist

- [ ] `NODE_ENV=production`
- [ ] Set `HELIX_API_SECRET` and/or real auth
- [ ] Set `POLAR_WEBHOOK_SECRET`
- [ ] Set `NEXT_PUBLIC_APP_URL` + `HELIX_ALLOWED_ORIGINS`
- [ ] Do **not** set `HELIX_ALLOW_CLIENT_KEYS=1` publicly
- [ ] Redis rate limits when multi-instance
- [ ] Replace cookie dev-login with Better Auth / Clerk
