# Helix Payments — No forced Stripe / Razorpay

You asked for options beyond Stripe/Razorpay. Here is the practical map (2026).

## Recommended for Helix (dev tool / SaaS)

### 1. Polar.sh (primary recommendation)
- **GitHub**: https://github.com/polarsource/polar (open source, Apache 2.0, ~10k stars)
- **What**: Merchant of Record for developers — subscriptions, one-time, usage, license keys, GitHub repo access
- **Fees**: ~4% + $0.40 (often cheaper than Lemon Squeezy / Paddle)
- **Why Helix**: Built for developer tools, open source, GitHub-native, handles VAT/GST as MoR
- **India note**: Check current payout countries; many Indian founders use MoR for global sales

### 2. Dodo Payments (India-friendly MoR)
- Good if most customers are India + global mix
- Handles tax, UPI + cards, Indian bank payouts
- Alternative when Polar payout geography is awkward

### 3. Open-source billing engines (self-host)
| Project | Stars | Role |
|---------|-------|------|
| [Lago](https://github.com/getlago/lago) | ~10k+ | Usage + subscription billing logic (needs a gateway under it) |
| [Kill Bill](https://github.com/killbill/killbill) | Mature | Full open-source billing platform |
| [Hyperswitch](https://github.com/juspay/hyperswitch) | High | Payment switch — route to Razorpay / Stripe / others via one API |
| [Recurso](https://github.com/recurso-dev/recurso) | New | SaaS billing with Stripe + Razorpay support, India GST |

These do **not** replace a payment processor by themselves — they calculate invoices and talk to a gateway.

### 4. When you still want Razorpay
- Best for **India domestic** UPI / cards / AutoPay
- Use alongside Polar for international, or alone if India-only
- Not required if Polar/Dodo covers your customers

## Helix policy

- **Free tier**: BYOK + self-host — zero payment integration needed
- **Paid tier**: Hosted sandboxes + managed keys
- **Default integration target**: **Polar** (checkout link + webhooks for entitlement)
- Optional: Razorpay only for India-heavy plans

## Implementation order

1. Ship Plan → Approve → Code (done in core)
2. Auth + project save
3. Polar product + checkout for “Pro” plan
4. Webhook → unlock hosted minutes / higher limits
5. Later: Lago if usage metering becomes complex

## Honest note

“No payment gateway at all” is only possible for pure self-host / BYOK.
If you want to charge for hosted Helix, **some** MoR or gateway is required.
Polar is the least painful developer-first option that lives on GitHub.
