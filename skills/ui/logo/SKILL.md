---
name: logo
description: "Full-pipeline logo production. Concept to SVG authoring to variants to animation to components to tokens. Use when creating brand logos, logo systems, animated logos, favicon sets, or logo components for products. Loads after imagegen (brandkit mode) for concept direction, or standalone from a brief. Produces both light and dark mode variants as a non-negotiable deliverable. house-style is the law."
---

# Logo

One job, five phases. A logo is not a drawing. It is a system: a mark
that works at 16 pixels and on a billboard, in light and dark, static
and animated, as raw SVG and as a framework component. This skill builds
that system.

> **Skill family:** `house-style` = law. [`imagegen`](../imagegen/SKILL.md) = concept images (brandkit mode). [`motion`](../motion/SKILL.md) = animation rules. [`impeccable`](../impeccable/SKILL.md) = polish and audit. [`pick-ui-library`](../pick-ui-library/SKILL.md) = component framework. Load `house-style` + this skill for logo work. Add `imagegen` when generating concept images. Add `motion` when animating.

## The rules that never bend

These are non-negotiable. Every logo that ships passes every rule.

1. **Grid-first.** Every mark lives on a 24x24 or 48x48 grid. Paths
   snap to grid points or half-grid points. No freehand curves without
   a grid justification. The grid is the contract between variants.

2. **currentColor by default.** `fill="currentColor"` or
   `stroke="currentColor"`. Dark mode, theming, and hover states come
   free. Hardcoded colors only when the brand mark requires it (and
   even then, provide a currentColor variant).

3. **Stroke unity.** One stroke weight across the entire logo family.
   1.5 for 24px grids, 2 for 48px grids. Mismatched weights are the
   #1 tell of a logo that was not designed as a system.

4. **Optical over mathematical.** Circles overshoot the bounding box
   by 2-4% to appear the same size as squares. Triangles shift 1-2px
   off-center to feel centered. The eye is the judge, not the
   coordinate system.

5. **Minimal paths.** Round coordinates to 1 decimal place. Merge
   redundant paths. Remove hidden groups, unused defs, metadata. Run
   through SVGO with multipass before shipping. Every byte of a logo
   SVG is a byte the browser parses on every page load.

6. **Light and dark, both required.** Every logo ships with both a
   light-mode variant (dark mark on light) and a dark-mode variant
   (light mark on dark). Neither is an afterthought. Neither is a CSS
   filter inversion. Each is designed.

7. **Monochrome proof.** The logo must work in a single color at 16px.
   If it loses meaning in monochrome, it is too complex. Simplify
   until it reads.

8. **Accessible.** `<title>` with the brand name for meaning. Add
   `role="img"` on the `<svg>`. Purely decorative logos get
   `aria-hidden="true"`.

9. **No gradients in the mark.** Flat fills or two-tone only. Gradients
   in logos age poorly, reproduce inconsistently, and fail at small
   sizes. The Apple logo has no gradient. Neither should yours.

10. **File naming.** `{brand}-{variant}-{mode}.{ext}`. Example:
    `acme-icon-dark.svg`, `acme-horizontal-light.svg`. Consistent,
    sortable, grep-friendly.

## Workflow phases

Run in order. Each phase gates the next. Going back is allowed. Skipping
is not.

### Phase 1: Concept

**Input:** Brand brief, product name, or imagegen brandkit output.

**What happens:**

1. Infer brand strategy: category, audience, emotional promise, visual
   world, metaphor.
2. Pick one logo method (max two): monogram with meaning, product
   action, metaphor fusion, negative space, construction geometry.
3. Sketch 3-5 directions on the grid. Each direction is a different
   geometric approach, not a different color.
4. Generate concept image via imagegen brandkit mode if visual
   confirmation is needed.
5. Confirm: mark shape, color palette (2-3 colors max), typography
   pairing for wordmark.

**Output:** Confirmed mark direction, grid size, color palette.

### Phase 2: Author

**Input:** Confirmed direction from Phase 1.

**What happens:**

1. Set up the grid (24x24 or 48x48 depending on complexity).
2. Construct paths using cubic bezier curves. Anchor points at grid
   intersections. Control handles on grid lines or 45-degree diagonals.
3. Apply viewBox with appropriate padding (typically 10-15% around the
   mark for optical breathing room).
4. Build the base mark in `<svg>` with `currentColor` fills/strokes.
5. Optimize: merge paths, remove groups, strip metadata, round coords.
6. Run SVGO (multipass, precision 1).
7. Verify at 16px, 24px, 32px, 48px, 64px, 128px, 256px. If it fails
   at any size, adjust until it works.

**Output:** Base mark SVG, optimized, accessible.

### Phase 3: Variant

**Input:** Base mark from Phase 2.

**What happens:**

1. Generate all required variants (see [references/variants.md](references/variants.md)):
   - Horizontal (mark + wordmark side by side)
   - Stacked (mark above wordmark)
   - Icon-only (mark without text, used at small sizes)
   - Monochrome (single color, no fills, stroke only)
   - Light mode variant (dark mark for light backgrounds)
   - Dark mode variant (light mark for dark backgrounds)
2. Each variant preserves the base mark's grid proportions and stroke
   weight. Variants are crops and recompositions, not redraws.
3. Export each variant as a separate SVG file with consistent naming.

**Output:** Complete variant set, all SVGs optimized.

### Phase 4: Animate (optional)

**Input:** Base mark or variant from Phase 3.

**What happens:**

1. Decide if animation serves a purpose: loading state, entry reveal,
   hover feedback, state change. If no purpose exists, skip this phase.
2. Pick animation type from the crib sheet (see
   [references/animation.md](references/animation.md)).
3. Build the animation using CSS, SMIL, or GSAP depending on
   complexity.
4. Review against the motion skill's 8-point checklist.
5. Implement `prefers-reduced-motion` fallback.
6. Export animated SVG and/or CSS/JS animation code.

**Output:** Animated logo (if requested), with reduced-motion fallback.

### Phase 5: Ship

**Input:** Complete variant set from Phase 3, animation from Phase 4.

**What happens:**

1. Export SVG files (see [references/svg-authoring.md](references/svg-authoring.md)).
2. Generate framework components (see [references/components.md](references/components.md)):
   - React component (default)
   - Vue component (if project uses Vue)
   - Svelte component (if project uses Svelte)
3. Generate favicon set (see [references/favicon.md](references/favicon.md)):
   - favicon.ico (16x16, 32x32)
   - apple-touch-icon.png (180x180)
   - manifest icons (192x192, 512x512)
   - SVG favicon (for modern browsers)
4. Generate design tokens (see [references/tokens.md](references/tokens.md)):
   - CSS custom properties
   - JS/TS constants
5. Deliver: logo mark at all sizes, all variants, all formats, tokens.

**Output:** Complete logo system, ready for production.

## The $10k standard

A logo that costs $10k is not a drawing. It is a system that works
everywhere, forever. The difference between a $50 logo and a $10k logo
is not talent. It is the refusal to ship anything that does not meet
every rule, at every size, in every mode, without exception.

What that means in practice:

- The favicon was designed, not cropped from the hero mark.
- The dark mode variant was designed, not inverted.
- The monochrome version was tested, not assumed.
- The animation was choreographed, not appended.
- The component has proper TypeScript types, not `any`.
- The tokens follow the project's naming convention, not a generic
  prefix.
- Every file was optimized. Every byte was justified.

Ship nothing that does not pass every rule. The client is paying for
the system, not the drawing.

## Related skills

- `imagegen` for concept image generation (brandkit mode)
- `motion` for animation rules and spring curves
- `impeccable` for logo audit and polish
- `house-style` for aesthetic law
- `pick-ui-library` for component framework selection
- `taste-skill` for icon policy integration (this skill owns the logo
  policy that taste-skill's icon policy does not cover)
