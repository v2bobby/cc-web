# XCurve AI — Investor & Product Platform

**Predictive Intelligence for the Next Market Frontier**

A premium, multi-page investor-facing platform for XCurve AI. Static HTML/CSS/JS, deploy-ready for Vercel.

## v2 changelog — critical fix + premium pass

**Fixed: site-wide invisible text bug.** The previous build's scroll-reveal animation (`.reveal`) defaulted to `opacity: 0` in CSS and depended entirely on JavaScript to make content visible. If the script failed to load, loaded out of order, or ran into any edge case, every `.reveal` element — which was used on nearly 100 elements across the site — stayed permanently invisible. This is now fixed at the architecture level:
- `.reveal` is **visible by default** in CSS. No JS dependency for content to render.
- JS only *arms* the animation (adds a `.js-armed` class to `<html>`) once it confirms it's actually running.
- A 2.5-second fail-safe forces any unrevealed element visible regardless of what happens with the IntersectionObserver.
- Result: content cannot be hidden by a script failure, slow connection, or blocked request, full stop.

**Fixed: stylesheet path.** `css/xcurve.css` is correct as a relative path (the CSS genuinely lives in a `css/` subfolder next to the HTML files) — but to remove any ambiguity, every page now links it explicitly as `./css/xcurve.css` and the script as `./js/shared.js`.

**Typography rebuilt.** Gopher is a paid commercial typeface with no legitimate free CDN, so it was swapped for a pairing in the same premium register, sourced from Fontshare (Indian Type Foundry's official free font service — not a third-party reseller):
- **Clash Display** — headlines, a sharp, distinctive grotesk with real character, replacing the more generic Fraunces serif
- **Satoshi** — body text, clean Swiss-style grotesk
- **JetBrains Mono** — retained for data labels, scores, and the mono "instrument" feel
- Both Fontshare fonts are 100% free for commercial use. `display=swap` is set on both imports so text is never invisible while fonts load (a separate, smaller issue from the reveal bug above), and the fallback stack degrades to real system fonts (San Francisco / Segoe UI) rather than a missing font reference.

**Animation & motion pass.** The site now has layered, purposeful motion instead of a single fade-up:
- Hero sections have a staggered entrance choreography (badge → headline → copy → actions → stats) that always plays, independent of scroll
- The signature curve motif now actually *draws itself* on load (stroke-dashoffset animation) on the homepage, product, and demo pages
- The Curve-Fidelity Score gauge fills from 0% to 87% when scrolled into view
- The Opportunity Matrix preview bubbles pop in with a staggered spring easing and scale up on hover
- Signal-flow diagram nodes fade/scale in with a stagger
- Cards lift and gain a soft shadow on hover; the featured pricing tier has a slow ambient glow pulse
- Images in use-case sections zoom subtly on hover
- Buttons have a spring-eased lift plus a magnetic cursor-follow effect on desktop (auto-disabled on touch)
- All motion respects `prefers-reduced-motion`

**Responsive design hardened.** The previous build had ~30 inline `grid-template-columns` declarations with no mobile fallback — invisible to media queries since they were inline styles. These are now utility classes (`.g-2`, `.g-3`, `.g-4`, `.g-2-uneven`, `.g-founder`, etc.) with real breakpoints at 1180px, 1024px, 860px, 768px, and 480px — covering tablet, small laptop, and phone widths distinctly rather than jumping straight from desktop to mobile.

## Site map

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Full-viewport hero, problem framing, How It Works, use-case teaser, business model teaser, final CTA |
| Product | `product.html` | All 4 product layers, user journeys by segment, technical differentiators |
| Company | `company.html` | Founder story + business model breakdown (ledger-style numbered sections) |
| Investors | `investors.html` | Market thesis, why-now, defensibility, business model snapshot — fully open, no gating |
| Demo | `demo.html` | "Coming Soon" waitlist capture with role selector — no real signups |
| Pricing | `pricing.html` | Three-tier pricing, comparison table, FAQ |

## Design system

- **Typography**: Clash Display (headlines) + Satoshi (body) + JetBrains Mono (data), via Fontshare + Google Fonts CDN
- **Palette**: warm paper (`#FBFAF7`), near-black ink (`#14181D`), deepened teal (`#0E8C7C`), muted gold (`#B8893B`)
- **Signature element**: the forecast-curve line motif, now animated (self-draws on load) across hero, dividers, and diagrams
- All shared styles in `css/xcurve.css`; all shared behavior in `js/shared.js`

## Files

```
index.html        Home
product.html       Product
company.html       Company (story + business model)
investors.html     Investors
demo.html          Demo / waitlist signup
pricing.html       Pricing
css/xcurve.css     Shared design system (497 lines)
js/shared.js       Shared nav, reveal-arming, counters, waitlist form, magnetic buttons (166 lines)
vercel.json        Deployment config (multi-page static)
CNAME              xcurve.co
```

## Images

Two human-centric photographs (Product and Home pages), both verified under the free **Unsplash License**:
- Photo by Vitaly Gariev — team collaboration
- Photo by Christina @ wocintechchat.com — team meeting

All diagrams, charts, and the signature curve motif are original SVG — zero licensing risk, fully on-brand.

## Data & figures disclosure

All market-size and traction figures are explicitly labeled **illustrative**, per the founder's direction. The Investors page carries a visible disclaimer.

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
