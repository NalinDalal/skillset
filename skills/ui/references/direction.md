# Direction

## Context questions (max 3 per round, one word each where possible)

1. What is it: landing, SaaS, dashboard, internal tool, portfolio,
   e-commerce, dev tool, CLI wrapper, blog, mobile-first app.
2. Who is it for: consumers, developers, enterprise, portfolio viewers.
3. The vibe in one word. If they cannot say it, infer it and state it
   back before proceeding.
4. Constraints: brand color, logo, light, dark, both, none.
5. The motion dial: 1 static, 5 a few signature moments, 10 cinematic.
   Ask explicitly, never assume.
6. The density dial only when not obvious: 1 airy, 5 normal app,
   10 cockpit.

## Style families

Shortlist 2-3, never one, never all. The default is always clean SaaS
(house-style).

| Family | Feel | Anchor |
|---|---|---|
| Clean SaaS | Apple/Google calm, bought not generated | Linear, Vercel, Stripe |
| Minimalist | warm monochrome, editorial quiet | recipes in styles.md |
| Brutalist | raw grids, military terminal | recipes in styles.md |

Match on project type, audience, and the vibe word. Enterprise
dashboards almost never get brutalism. Consumers and enterprise want
whitespace and polish.

## Present options

For each: name, one-line feel, why it fits this project, one concrete
visual anchor. Tight, a few lines.

## Token output

1. Palette hexes: background, surface, border, text, primary, accent.
   Light and dark.
2. Type pairing: real font names plus the scale.
3. Spacing and radius.
4. Shadows or the explicit line "no shadows".
5. Motion character in one line.
6. Ready to paste: Tailwind v4 @theme in globals.css, or v3
   theme.extend. Diff against existing tokens, never replace
   everything.
7. Semantics: bg-background text-foreground border-border. No raw hex
   in JSX.

## Refine-existing mode

- Audit first: list current primitives and duplicated one-offs.
- Extract principles, not pixels.
- Protect: brand colors, logo, layout, copy. State the user's non-goals
  as hard constraints.
- Output a token diff.

## Tailwind strictness

- Tailwind is the only styling output. No raw CSS leakage, no
  module.css, no style props except dynamic runtime values.
- Detect v4 vs v3 and wire it before coding.
- Existing tokens are the source of truth. Extend, do not duplicate.
- In monorepos, shared tokens live in packages/ui.
- Keyframes live in @theme for v4, not in separate CSS files.

## Signature interaction

Pick one product-native interaction and do it exceptionally well:
command palette for tools, direct manipulation for canvas, inline
editing for docs. Hand-buildable code by default; name a library only
when it is genuinely better (3D, particles).

## Productization pass (when the ask is a product, not a page)

1. Identity: one distinctive visual idea that comes from the product's
   purpose.
2. Information architecture: the most important thing is dominant and
   understood in seconds.
3. Interaction model: every action has an obvious model and a visible
   state.
4. Component language: one small grammar, same behavior everywhere.
5. Density: one intentional level.
6. Hierarchy before decoration: structure first, effects last.
7. Signature interaction: one memorable, product-appropriate moment.
8. Micro-polish: focus rings, pressed states, tooltips, cursors,
   truncation as one system.
9. Remove generic AI UI: cards everywhere, rounded containers, gradient
   backgrounds, oversized heroes, badges, decorative icons, default
   3-column grids.
10. Screenshot test: it must look like a shipped product with no
    context.

## Reference products (study the why, never copy the pixels)

Excalidraw: direct manipulation, forgiving. Linear: dense but calm.
Raycast: finished utility. Vercel: restrained system. Figma: complex
coherence. Notion: approachable scale. Stripe: typography and density.
Arc: intentional weirdness.