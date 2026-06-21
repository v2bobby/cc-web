# XCurve AI — Investor & Product Platform

**Predictive Intelligence for the Next Market Frontier**

A complete rebrand and rebuild of the former ClearCurve AI site into **XCurve AI** — a multi-page, premium, investor-facing platform built as static HTML/CSS/JS, ready to deploy on Vercel.

## What changed from the previous build

- **Rebrand**: ClearCurve AI → **XCurve AI**, new founder (Onyeka Ofoegbu), new domain (`xcurve.co`)
- **Visual direction**: dark "Intelligence Noir" → light, editorial "Instrument" aesthetic — warm paper background, ink text, deepened teal + gold accents for legibility in light mode
- **Architecture**: single long-scrolling page → **6 dedicated pages** with full internal navigation
- **Audience shift**: general waitlist growth → **investor/accelerator-first**, fully open and self-serve (no gated content)
- **New page**: dedicated **Investors** page (market thesis, defensibility, business model snapshot)
- **New flow**: dedicated **Demo/Signup** page with a polished "Coming Soon" waitlist capture — no real signups are processed

## Site map

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Full-viewport hero, problem framing, How It Works, use-case teaser, business model teaser, final CTA |
| Product | `product.html` | Deep dive on all 4 product layers (Nodal Ingestion, Predictive Modeling, Opportunity Matrix, Strategic Briefs), user journeys by segment, technical differentiators |
| Company | `company.html` | Founder story + full business model breakdown (value creation, revenue streams, scalability, moat, tech leverage) |
| Investors | `investors.html` | Market thesis, why-now, defensibility, business model snapshot, direct founder contact — fully open, no gating |
| Demo | `demo.html` | "Coming Soon" waitlist capture with role selector — polished success state, no real account creation |
| Pricing | `pricing.html` | Three-tier pricing (Scout / Operator / Command), comparison table, FAQ |

## Design system

- **Typography**: Fraunces (display, editorial serif) + Inter (body) + JetBrains Mono (data/labels)
- **Palette**: warm paper (`#FBFAF7`), near-black ink (`#14181D`), deepened teal (`#0E8C7C`), muted gold (`#B8893B`)
- **Signature element**: the forecast-curve line motif, used consistently across hero, dividers, and data visualizations — it's literally the artifact the product produces
- All shared styles live in `css/xcurve.css`; all shared behavior in `js/shared.js`

## Files

```
index.html        Home
product.html       Product
company.html       Company (story + business model)
investors.html     Investors
demo.html          Demo / waitlist signup
pricing.html       Pricing
css/xcurve.css     Shared design system
js/shared.js       Shared nav, reveal animations, counters, waitlist form logic
vercel.json        Deployment config (multi-page static)
CNAME              xcurve.co
```

## Images

Two human-centric photographs are used (Product and Home pages), both verified under the free **Unsplash License** (no attribution required, free for commercial use):
- Photo by Vitaly Gariev — team collaboration
- Photo by Christina @ wocintechchat.com — team meeting

All other visuals (hero curve graphics, Opportunity Matrix preview, Curve-Fidelity Score gauge, signal-flow diagram) are original SVG, built specifically for XCurve's brand — zero licensing risk.

## Data & figures disclosure

All market-size and traction figures are explicitly labeled **illustrative** per the founder's direction. The Investors page carries a visible disclaimer stating figures are for demonstrating the model's structure, not validated research, with a commitment to publish sourced data as the company progresses.

## How to deploy

1. Push this folder to `v2bobby/cc-web` (or a new repo)
2. Connect to Vercel — `vercel.json` is already configured for static multi-page output
3. Point `xcurve.co` DNS at Vercel per their domain docs

## Founder

**Onyeka Ofoegbu** — Founder & CEO
Email: onyeka.ofoegbu@xcurve.co
LinkedIn: [onyeka-ofoegbu-446b8630a](https://www.linkedin.com/in/onyeka-ofoegbu-446b8630a/)

---
© 2026 XCurve AI. Proprietary & Confidential.
