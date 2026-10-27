# Helix Monetization

## Model
- **Free**: Local / self-host + BYOK (builds trust, no credit traps)
- **Starter / Pro**: Hosted projects + sandbox minutes + optional managed keys
- **Play Store**: Same Pro plan via Google Play Billing (later)

## Payment stack (chosen)
- **Primary**: [Polar](https://github.com/polarsource/polar) — open source MoR, developer-first
- **India option**: Dodo Payments or Razorpay (only if needed)
- **Billing logic later**: Lago if usage metering grows

See `docs/PAYMENTS.md` for full comparison.

## Anti-Emergent rules
- Cost visible before runs
- No charging for platform failures
- Clear cancel + data export
- No dark patterns / fake scarcity
