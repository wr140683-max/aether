# Helix Mobile (Expo)

## Why mobile + Play Store?

Emergent is website-only. Helix aims for:

- **Website** — full agent workspace (plan, diffs, approve, preview)
- **Play Store (Android)** — companion + lightweight builder experience
  - Start projects on the go
  - Monitor agent runs
  - Approve / reject steps from phone
  - View live previews
  - Push notifications when a plan is ready for approval

This is a real differentiator for distribution and monetization.

## Stack

- Expo (React Native)
- Same Helix backend API (`/api/agent`, later auth + projects)
- Expo Router

## Status

Scaffold only. Next implementation steps:

1. Expo app with login (same account as web)
2. Project list + “New idea” prompt
3. Agent timeline (read-only + Approve/Reject buttons)
4. Deep link to web for heavy code review
5. Play Store listing (internal testing → production)

## Run later

```bash
cd apps/mobile
npx create-expo-app@latest . --template tabs
# then wire API base URL to your Helix backend
```

## Monetization on mobile

- Free tier with BYOK (user’s own keys)
- Pro subscription (managed keys + hosted sandboxes) via Play Billing
- Same account unlocks web + mobile
