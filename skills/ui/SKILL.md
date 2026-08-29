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
2. Match to a style family. Shortlist 2-3 candidates with a one-line
   feel and a concrete anchor.
3. Output tokens: palette, type pairing, spacing, radius, shadow or no
   shadow, motion character in one line.
4. Refine mode: when a theme already exists, audit first, extract
   principles not pixels, output a token diff.

The families we keep: clean SaaS (the default, Apple and Google calm),
minimalist, brutalist. Recipes in references/styles.md, used only when
asked.

## Phase 2: Design the system

Tokens first, components second. Details in references/system.md.

- Constraint budget: one accent, one gray family, one radius scale, one
  icon family, one stroke weight, one motion curve family. To add
  somewhere, remove elsewhere.
- Type: display scale with tight tracking, body under 65ch. Tabular
  figures for data.
- Buttons: flat or barely rounded, solid contrast, no glow. Pressed
  state is tactile: scale 0.98.
- Cards only when elevation earns them. Never cards in cards.
- When a design system doc is asked for, emit DESIGN.md with the seven
  mandatory sections from references/system.md.

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