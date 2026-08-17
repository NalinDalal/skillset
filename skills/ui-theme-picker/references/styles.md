# Style Family Library

14 style families. Each has: what it's for, when it's a trap, and concrete tokens.
Hex values, font names, and Tailwind values are ready to paste — not placeholders.

---

## 1. Minimalist / Clean SaaS
**Best for:** SaaS products, dev tools, landing pages, B2B. The safe, high-conversion default.
**Trap if:** the user wants to stand out in a crowded, visually loud market — this style
blends in with every other Y Combinator startup site.
**Anchor:** Linear, Vercel, Stripe docs.

- Colors (light): bg `#FFFFFF`, surface `#F8F9FA`, border `#E5E7EB`, text `#111827`,
  muted text `#6B7280`, primary `#111827` or one accent e.g. `#4F46E5`
- Colors (dark): bg `#0A0A0B`, surface `#141416`, border `#27272A`, text `#FAFAFA`,
  muted `#A1A1AA`, accent same as light
- Type: Inter or Geist for UI, font-weight 500-600 for headings, tight tracking
- Spacing: generous, 4/8px base scale, lots of whitespace
- Radius: `8px`–`12px` (rounded-lg/xl)
- Shadow: very subtle, `0 1px 2px rgba(0,0,0,0.05)` — almost flat
- Motion: fast, subtle — 150-200ms ease-out, no bounce

---

## 2. Brutalist
**Best for:** developer tools, portfolios, indie/creative products, anything wanting to
signal "not another templated startup."
**Trap if:** the audience is enterprise buyers or non-technical consumers — reads as
unfinished or unprofessional to them.
**Anchor:** Gumroad (older era), brutalist portfolio sites, raw HTML aesthetic done intentionally.

- Colors: bg `#FFFFFF` or `#000000`, near-max contrast text, one loud accent
  e.g. `#FF3B00` or `#00FF00`, borders always solid black/white, no grays in between
- Type: monospace or a raw system serif for headers (e.g. `"JetBrains Mono"`, or a
  heavy grotesk like `Archivo Black`); body can be a plain sans
- Spacing: inconsistent-on-purpose is fine, but keep it a deliberate grid, not sloppy
- Radius: `0px` always — sharp corners are the whole point
- Shadow: hard offset shadows, no blur — `4px 4px 0px #000000`
- Border: thick, `2px`-`4px` solid black, visible everywhere
- Motion: abrupt, no easing, or none at all

---

## 3. Glassmorphism
**Best for:** consumer apps, music/media players, dashboards wanting a "premium/futuristic"
feel, marketing pages with a hero visual.
**Trap if:** used for dense data tables or text-heavy content — blur hurts legibility and
performance at scale.
**Anchor:** macOS Big Sur UI, iOS Control Center.

- Colors: needs a colorful/gradient background to sit on top of, e.g. gradient
  `#667EEA` → `#764BA2`; glass panels: `rgba(255,255,255,0.1)` with `backdrop-filter: blur(20px)`
- Border: `1px solid rgba(255,255,255,0.2)`
- Type: clean sans, Inter or SF Pro-like (system-ui)
- Radius: `16px`–`24px`, generous rounding
- Shadow: soft diffuse, `0 8px 32px rgba(0,0,0,0.1)`
- Motion: smooth, springy transitions, 300-400ms

---

## 4. Neumorphism (soft UI)
**Best for:** niche — settings panels, physical-feeling controls, wellness/lifestyle apps.
**Trap if:** almost anything else. Accessibility (low contrast) and general usability issues
are real; use sparingly and only where explicitly requested.
**Anchor:** early Dribbble neumorphism shots, some smart-home app UIs.

- Colors: monochrome base, e.g. bg `#E0E5EC`, everything same base tone
- Shadow: dual shadow, light `-6px -6px 12px #FFFFFF`, dark `6px 6px 12px #A3B1C6`
- Radius: `12px`–`20px`, soft everywhere
- Type: rounded sans, e.g. Poppins or Quicksand
- Motion: gentle press/depress on interaction

---

## 5. Dark Techy / Terminal
**Best for:** dev tools, CLI wrappers, infra/observability dashboards, AI/ML products,
crypto/quant tools.
**Trap if:** audience is non-technical — can feel cold or intimidating to consumers.
**Anchor:** Vercel dashboard, Raycast, Warp terminal, GitHub dark mode.

- Colors: bg `#0D1117`, surface `#161B22`, border `#30363D`, text `#C9D1D9`,
  muted `#8B949E`, accent green `#3FB950` or blue `#58A6FF` or purple `#A371F7`
- Type: monospace for code/data (`"JetBrains Mono"`, `"Fira Code"`), clean sans for UI chrome
- Spacing: tight-to-medium, information-dense is acceptable and often desired
- Radius: `6px`–`8px`, understated
- Shadow: minimal, rely on borders for separation not shadow
- Motion: fast and functional, 100-150ms

---

## 6. Editorial / Content-first
**Best for:** blogs, publications, documentation sites, content-heavy marketing pages,
personal writing sites.
**Trap if:** the product is interaction-heavy (dashboards, tools) — this style deprioritizes UI chrome.
**Anchor:** Stripe blog, Every.to, NYT reading pages.

- Colors: warm off-white bg `#FAF9F6`, near-black text `#1A1A1A`, one restrained accent
  for links, e.g. `#B45309` or `#1D4ED8`
- Type: a real serif for headlines/body (e.g. `"Source Serif 4"`, `"Lora"`, `"Charter"`),
  sans for UI labels/nav
- Spacing: wide line-height (1.6-1.8), narrow content column (max-w ~65ch)
- Radius: minimal, `4px` or none — content doesn't need rounded cards
- Shadow: none, rely on whitespace
- Motion: minimal, prioritize reading over animation

---

## 7. Retro / Vaporwave
**Best for:** creative portfolios, music/entertainment products, anything wanting
personality over "professional."
**Trap if:** B2B, enterprise, anything needing to look "trustworthy" in a conventional sense.
**Anchor:** 80s/90s revival aesthetics, synthwave visuals.

- Colors: gradient-heavy, hot pink `#FF6EC7`, cyan `#00F0FF`, deep purple `#1A0B2E` bg,
  high saturation
- Type: display font with retro character (e.g. `"Righteous"`, `"VT323"` for accents),
  clean sans for body
- Radius: mixed — sharp on some elements, pill-shaped (`9999px`) on buttons
- Shadow: neon glow effect, `0 0 20px rgba(255,110,199,0.5)`
- Motion: can lean playful/bouncy

---

## 8. Corporate / Enterprise Trust
**Best for:** enterprise SaaS, fintech, healthtech, anything selling to risk-averse buyers
or needing compliance/trust signaling.
**Trap if:** the audience is indie devs or consumers looking for personality — reads as
generic/boring to them, which is somewhat the point here.
**Anchor:** Salesforce, Workday, most enterprise B2B products.

- Colors: bg `#FFFFFF`, surface `#F5F7FA`, border `#D1D5DB`, text `#1F2937`,
  primary blue `#1D4ED8` or navy `#1E3A8A`, avoid saturated/loud accents
- Type: Inter, "Segoe UI"-adjacent, or IBM Plex Sans — safe, legible, no personality risk
- Spacing: structured, grid-based, predictable
- Radius: `4px`–`6px`, conservative
- Shadow: light, standard elevation system (sm/md/lg tiers)
- Motion: minimal, functional only

---

## 9. Playful / Maximalist
**Best for:** consumer products, kids/education, creative tools, anything wanting to feel
fun and approachable over polished.
**Trap if:** professional/enterprise or data-dense contexts — clashes with seriousness or
information density.
**Anchor:** Duolingo, Notion's playful illustrations, Figma community pages.

- Colors: multiple saturated colors used deliberately (not just one accent), e.g.
  `#FF5A5F`, `#FFB400`, `#00C2A8`, `#5B5FEF` — bg stays light/white to let colors pop
- Type: rounded, friendly sans, e.g. Nunito, Baloo 2
- Radius: large, `16px`–`24px`, pill buttons
- Shadow: soft but visible, playful offset shadows in color (not just black/gray)
- Motion: bouncy, springy easing, micro-interactions everywhere

---

## 10. Swiss / International Typographic
**Best for:** portfolios (especially design/architecture), agencies, anything wanting to
signal typographic confidence and precision.
**Trap if:** the team can't commit to strict grid discipline — half-executed Swiss design
looks like a mistake, not a style.
**Anchor:** classic print-design-inspired sites, high-end agency portfolios.

- Colors: near-monochrome, `#FFFFFF` bg, `#000000` text, one red accent `#E30613` used sparingly
- Type: Helvetica/Neue Haas Grotesk or Inter at heavy weight for headers, strict grid alignment
- Spacing: mathematically precise grid, generous margins
- Radius: `0px`, always sharp
- Shadow: none
- Motion: precise, no easing flourishes

---

## 11. Warm / Human SaaS
**Best for:** products wanting to feel less corporate-cold without going full playful —
common current trend for B2B tools targeting non-technical users (HR, ops, creator tools).
**Trap if:** highly technical audience — can read as style-over-substance to devs.
**Anchor:** Notion, Linear's warmer competitors, Cron/Arc browser.

- Colors: warm off-white bg `#FDFBF7`, soft surface `#F5F1EA`, text `#2D2A26`,
  warm accent e.g. terracotta `#D97757` or muted gold `#C9A15A`
- Type: Inter or a humanist sans like "General Sans", medium weight headers
- Spacing: generous, rounded groupings
- Radius: `10px`–`14px`
- Shadow: soft, warm-toned (not pure gray) — `0 2px 8px rgba(60,40,20,0.06)`
- Motion: smooth, unhurried, 250-300ms ease

---

## 12. E-commerce / Product-forward
**Best for:** online stores, product marketplaces — anything where the product photo/visual
is the actual content and UI should recede.
**Trap if:** used where there's no strong visual product asset to showcase — this style
needs great imagery to work.
**Anchor:** Shopify storefronts, Aesop, high-end DTC brand sites.

- Colors: near-neutral bg `#FFFFFF` or brand-specific single tone, minimal chrome color
  so product photography carries color
- Type: often a distinctive but restrained serif or sans for brand headers, plain sans for UI
- Spacing: large image-to-whitespace ratio, generous gutters between product cards
- Radius: `0px`–`4px`, let photography be the visual interest not the chrome
- Shadow: none to minimal
- Motion: smooth image transitions/zooms, otherwise minimal

---

## 13. Data-dense Dashboard / Internal Tool
**Best for:** admin panels, internal ops tools, analytics dashboards, anything prioritizing
information density and speed of scanning over visual flourish.
**Trap if:** it's a customer-facing/marketing surface — feels sterile for that use case.
**Anchor:** Retool, Metabase, Grafana, internal admin panels.

- Colors: bg `#FFFFFF` or `#F9FAFB`, borders doing most of the visual separation
  `#E5E7EB`, text `#111827`, status colors (success `#16A34A`, warning `#D97706`,
  error `#DC2626`) used functionally not decoratively
- Type: Inter or system-ui, tabular figures for numbers (`font-variant-numeric: tabular-nums`)
- Spacing: tight, compact rows, density over whitespace
- Radius: `4px`–`6px`, small
- Shadow: minimal, borders do the work
- Motion: instant/near-instant, no decorative animation

---

## 14. Indie Dev / Personal Portfolio Hacker Aesthetic
**Best for:** solo dev portfolios, side-project landing pages, "build in public" content —
signals technical credibility over polish.
**Trap if:** the goal is to look like a funded/serious company — can undersell scale.
**Anchor:** many indie hacker Twitter/X-linked landing pages, terminal-inspired portfolios.

- Colors: bg `#0F0F0F` or `#FAFAFA` (pick one, high contrast), one accent color tied to
  personal brand, often green `#00FF9C` or amber `#FFB86C`
- Type: monospace-forward even in body copy for a "coded by hand" feel, or mix mono
  headers with clean sans body
- Spacing: can be tighter/scrappier than corporate — signals speed/shipping over polish
- Radius: `4px`–`8px`, understated
- Shadow: minimal or hard-edge (borrow from brutalist if wanted)
- Motion: snappy, minimal

---

## Tailwind config template (fill with chosen family's values)

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: "#___",
        surface: "#___",
        border: "#___",
        foreground: "#___",
        muted: "#___",
        primary: "#___",
        accent: "#___",
      },
      fontFamily: {
        sans: ["___", "sans-serif"],
        mono: ["___", "monospace"],
      },
      borderRadius: {
        DEFAULT: "___px",
      },
      boxShadow: {
        DEFAULT: "___",
      },
    },
  },
};

export default config;
```

## CSS variables template (alternative to Tailwind config)

```css
:root {
  --background: #___;
  --surface: #___;
  --border: #___;
  --foreground: #___;
  --muted: #___;
  --primary: #___;
  --accent: #___;
  --radius: ___px;
  --shadow: ___;
}

[data-theme="dark"] {
  --background: #___;
  --surface: #___;
  --border: #___;
  --foreground: #___;
  --muted: #___;
}
```
