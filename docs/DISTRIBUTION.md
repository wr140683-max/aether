# Helix Distribution & Monetization

## Goal
Make money while staying better than Emergent on trust and reach.

Emergent = website only.  
Helix = **Website + Play Store (Android)** (+ optional iOS later).

---

## 1. Website (primary)

**What users get**
- Full 3-panel agent workspace
- BYOK or managed keys
- Live preview, diffs, approve/reject
- Git ownership

**How it makes money**
| Tier | Price idea | Includes |
|------|------------|----------|
| Free | $0 | Local / self-host + BYOK |
| Starter | ~$15–25/mo | Hosted projects, limited sandbox minutes, 1–2 seats |
| Pro | ~$40–60/mo | More minutes, priority models, team features |
| Team / Business | custom | SSO, audit logs, shared workspaces |

**Principles (anti-Emergent)**
- Cost visible before heavy runs
- No opaque credit burn on failed loops
- Clear cancel + data export
- Failed platform errors not charged

---

## 2. Play Store (Android)

**App role**
- Companion + light builder
- Create idea → see plan → Approve/Reject from phone
- Notifications when agent needs you
- Not a full replacement for desktop code review (deep link to web)

**Why it helps revenue**
- Extra discovery channel (search “AI app builder” on Play Store)
- Subscription via Google Play Billing (same Pro plan)
- Higher retention (phone reminders → more usage → more conversions)

**Launch path**
1. Expo app (this repo `apps/mobile`)
2. Internal testing track
3. Closed testing → production
4. Same backend as website

---

## 3. What to build in order (money-focused)

1. **Web usable end-to-end**  
   Plan → Approve → simple code write → basic preview  
2. **Auth + projects** (Clerk / Auth.js)  
3. **Hosted sandbox minutes** (E2B) + usage meter  
4. **Stripe (web) + Play Billing (mobile)** for same Pro plan  
5. **Play Store listing** with clear screenshots of Approve flow  

---

## 4. Positioning vs Emergent

| | Emergent | Helix |
|--|----------|-------|
| Web | Yes | Yes |
| Play Store | No | **Yes (planned)** |
| Cost transparency | Weak | Strong (BYOK + live meter) |
| Human control | Weak | Strong (approve every non-trivial step) |
| Code ownership | Partial | Full Git |

---

## 5. Realistic timeline (solo / small team)

- Week 1–2: Web plan → approve → sandbox write working  
- Week 3–4: Auth + project save + basic billing  
- Week 5–6: Expo companion app + Play internal test  
- Week 7+: Public web + Play Store launch  

You can start charging on web as soon as hosted sandboxes + auth work. Mobile increases reach and retention after that.
