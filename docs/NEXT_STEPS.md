# Helix status — remaining polish only

## Done end-to-end (local)

1. User prompt → Planner → structured tasks
2. Approve → Coder → file JSON
3. Apply → writes under `.helix/projects/<id>/`
4. Sidebar + Code/Diff tabs show files
5. Polar checkout + webhook scaffolds
6. Dev session auth cookies
7. Docker Compose + Dockerfile

## Optional next (production)

1. Wire real E2B `Sandbox.create` when `E2B_API_KEY` set + expose preview URL
2. Replace dev email cookie with Better Auth or Clerk
3. Create Polar product + set env → live Upgrade button
4. Expo app (`apps/mobile`) → Play internal testing
5. Git commit from Apply (simple `git init` in project dir)

Core agent loop is complete for local/BYOK use.
