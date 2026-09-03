---
name: ui
description: The whole UI job in one skill: pick the direction, design the system, build the screen, redesign or audit an existing one, verify it before ship. Use when starting a new page or project, choosing a theme or visual direction, building a screen, or upgrading an existing UI. Replaces taste-skill, taste-skill-v1, redesign-skill, soft-skill, gpt-tasteskill, minimalist-skill, brutalist-skill, stitch-skill, and ui-theme-picker as one owned skill. house-style is the law; impeccable has the commands; this file is the process.
---

# UI

One job, five phases. Run the phase the request matches: pick the
direction, design the system, build the screen, redesign or audit,
verify. house-style is the law and wins on conflict. impeccable has the
commands and detectors. This file is the process. If another synced
skill about visual design loads, this skill wins.

> **Skill family:** `house-style` = law (philosophy). This skill = process orchestrator. [`impeccable`](../impeccable/SKILL.md) = commands/detectors. [`motion`](../motion/SKILL.md) = motion job (name/decide/build/review). [`pick-ui-library`](../pick-ui-library/SKILL.md) = curated library picks. Load `house-style` + this skill for UI work; add `motion` for animation focus; invoke `pick-ui-library` when you need a library.

## The rules that never bend

- Bought, not generated. If the screen could pass for default AI output,
  it is wrong.
- One clear action per screen. Color in small doses. Whitespace does the
  separating, not borders and shadows.
- Clean typography: one family, a tight scale, real hierarchy.
- Tailwind strictly: component-based, tokens first. Raw CSS only when
  Tailwind cannot do it, with a reason.
- Feedback matches the action: a visual state for manipulation, a quiet
  status for done, confirmation only for destructive.
- No em dashes in any visible text. One em dash fails review.
- The finish gate is mandatory before anything ships.
  See references/verify.md.
- You decide what feels right. I ask before building, then again before
  shipping.

## Phase 1: Pick the direction

For new projects, pages, or components with no theme yet.
Details in references/direction.md.

1. Ask the context questions: what it is, who it is for, the vibe in one
   word, the constraints, the animation dial.
2. Ask the identity questions (see below). These turn generic UI into
   something that feels like *this* product, not any product.
3. Match to a style family. Shortlist 2-3 candidates with a one-line
   feel and a concrete anchor.
4. Output tokens: palette, type pairing, spacing, radius, shadow or no
   shadow, motion character in one line.
5. Refine mode: when a theme already exists, audit first, extract
   principles not pixels, output a token diff.

### Identity questions (ask before picking tokens)

These are the questions that separate "looks good" from "feels like us."
Skip them and you get a template. Ask them and you get a brand.

1. **What's the one word you want people to feel after using this?**
   (Trust? Speed? Calm? Power? Fun?) This drives everything: type
   weight, color saturation, motion curve, spacing.
2. **What's your signature color?**
   Not "what palette do you like." One color that's yours. Gumroad has
   pink. Stripe has purple. Linear has indigo. What's the one hex that
   shows up everywhere?
3. **What font feels like your voice?**
   If your product talked, what would it sound like? Technical and
   precise? Warm and friendly? Sharp and editorial? Match that to a
   typeface, not the other way around.
4. **What's the one thing competitors all do that you refuse to do?**
   This defines your visual contrast. If every competitor has gradient
   heroes, yours is flat. If they're all minimal, yours is dense. The
   refusal IS the identity.
5. **What's the one interaction you want people to remember?**
   Not 10 interactions. One. The button that feels like butter. The
   scroll that surprises. The transition that makes someone smile.
   Everything else should be invisible.
6. **Show me a site that feels like what you're going for.**
   Not "I like this site." Show me the one that, when you saw it, you
   thought "that's the energy." Then we extract the principles, not
   copy the pixels.

The families we keep: clean SaaS (the default, Apple and Google calm),
minimalist, brutalist. Recipes in references/styles.md, used only when
asked.

## Phase 2: Design the system

Tokens first, components second. Details in references/system.md.

- Constraint budget: one accent, one gray family, one radius scale, one
  icon family, one stroke weight, one motion curve family. To add
  somewhere, remove elsewhere.
- Type: display scale with tight tracking, body under 65ch. Tabular
  figures for data. Modular scale, weight ladder, tracking/leading
  rules. See Type scale system in build.md.
- Buttons: flat or barely rounded, solid contrast, no glow. Pressed
  state is tactile: scale 0.98.
- Cards only when elevation earns them. Never cards in cards.
- Icon system: stroke weight, sizing, filled vs outline, duo-tone,
  triple-tone. See Icon system in build.md.
- When a design system doc is asked for, emit DESIGN.md with the ten
  mandatory sections from references/system.md.
- Dark mode is designed, not inverted: CSS variable architecture, one
  token set per surface, saturation and shadow adjusted per theme.
  Details in references/dark-mode.md.
- Every layout decision is made at the breakpoint tiers, not just
  checked there after the fact. Details in references/responsive.md.

## Phase 3: Build the screen

The anti-slop discipline. Details in references/build.md.

- Kill the tells: purple gradients, glowing buttons, oversized rounded
  cards, three equal cards, the same five icons as everyone.
- Hero: fits the viewport, headline under 8 words and 2 lines, one
  primary CTA, no trust strips or badges.
- Layout: one family per section, max two consecutive image-text
  splits, grid over flex math, bento with as many cells as content.
- Eyebrows: max one per three sections.
- Content: real words, real numbers, real names. Lists over paragraphs.
- Accessibility is built in, not audited after: contrast, focus
  management, ARIA, and keyboard paths per references/accessibility.md.
- Copy follows references/copy.md: imperative CTAs, sentence case,
  error messages that say what happened and what to do.
- Motion follows the motion skill: restraint first, every animation
  answers "what happened".
- Verify at 7 viewports where hierarchy restructures, not shrinks.

## Phase 4: Redesign or audit

Never rewrite from scratch. Details in references/redesign.md.

1. Scan, diagnose, fix, in that order.
2. Write the feel contract first: temperament, beliefs, anti-goals,
   two reference products and why they feel good.
3. Audit by category: typography, color, layout, interactivity, content,
   components, icons, code.
4. Fix in order: P0 broken, P1 unfinished, P2 quality, P3 polish. Font
   first, then color, then states, then layout.
5. Preserve: IA, slugs, nav labels, copy voice, accessibility,
   analytics.

## Phase 5: Verify (the finish gate)

Nothing ships without it. Details in references/verify.md.

- Seven viewports: 1440, 1280, 1024, 768, 640, 390, 375. No overflow.
  Hierarchy changes per class.
- Every surface has empty, loading, and error states.
- Feedback matches the mechanism table.
- Keyboard: no traps, no mouse-only controls, Escape exits.
- Reduced motion respected.
- Accessibility gate: contrast AA at both themes, focus order matches
  visual order, every custom widget matches its ARIA pattern.
- Dark mode gate: both themes hit AA, no literal white/black classes,
  theme persists and matches system on first load.
- The 10-minute journey runs clean at every step.
- Lint and build pass.
- Evidence, not assertions: capture, dom, code. Never silently skip.

## Working with you

- One round of questions at a time. Build in the smallest real step.
- You own the taste. I propose, you decide.
- Never ship a screen that fails the gate. Say exactly what fails and
  why, with the fix.

## Origin

Merged from nine skills that were one job in nine voices: taste-skill,
taste-skill-v1, redesign-skill, soft-skill, gpt-tasteskill,
minimalist-skill, brutalist-skill, stitch-skill, and ui-theme-picker.
Their folders do not come back on sync. Their best content lives in the
references.
