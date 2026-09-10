---
name: ui
description: The whole UI job in one skill: pick the direction, design the system, build the screen, redesign or audit an existing one, verify it before ship. Use when starting a new page or project, choosing a theme or visual direction, building a screen, or upgrading an existing UI. This skill owns the quality of the interface. It makes design decisions autonomously and ships product-ready UI. house-style is the law; impeccable has the commands; this file is the process.
---

# UI

One job, five phases. Run the phase the request matches: pick the
direction, design the system, build the screen, redesign or audit,
verify. house-style is the law and wins on conflict. impeccable has the
commands and detectors. This file is the process. If another synced
skill about visual design loads, this skill wins.

> **Skill family:** `house-style` = law (philosophy). This skill = process orchestrator. [`impeccable`](../impeccable/SKILL.md) = commands/detectors. [`motion`](../motion/SKILL.md) = motion job (name/decide/build/review). [`pick-ui-library`](../pick-ui-library/SKILL.md) = curated library picks. Load `house-style` + this skill for UI work; add `motion` for animation focus; invoke `pick-ui-library` when you need a library.

## Product-Ready UI Standard

This is the default quality bar for every frontend/UI task. It sits
above every phase. It is the operating principle, not a checklist item.

The agent's default posture: make the reasonable design decisions
yourself. Only ask the user when the decision materially changes
product requirements or depends on missing business information.

Do not ask about: colors, spacing, typography, border radius, card
layout, button styles, empty states, loading states, responsive
behavior, interaction patterns, animation, component structure. Make
those decisions.

The quality ladder:

Level 1, functional: the feature works.

Level 2, usable: the workflow is understandable.

Level 3, product-ready: states, errors, responsiveness, accessibility,
and content are handled.

Level 4, polished: typography, spacing, hierarchy, motion, and visual
consistency are intentional.

Level 5, distinctive: the interface has a coherent visual identity and
feels like a real product rather than generated UI.

Default target: Level 4. Level 5 emerges when the product's brand or
design system warrants it.

### Own the interface

Treat yourself as both the implementer and the product designer.

Do not interpret "build a dashboard" as "create some cards that
resemble a dashboard." Instead determine:

- What is the user's primary goal?
- What is the primary action?
- What information matters most?
- What should be visible immediately?
- What can be secondary or progressively disclosed?
- What happens when there is no data?
- What happens while loading?
- What happens when something fails?
- What happens after success?
- How does the workflow work on mobile?
- Which interactions should feel especially good?

Make those decisions yourself unless the project requirements require
user input.

### Product-ready means more than visually polished

A UI is not complete simply because it has good colors, typography,
and spacing. A product-ready interface has:

1. Clear product identity
2. Clear information hierarchy
3. A coherent interaction model
4. Consistent component behavior
5. Complete UI states
6. Realistic content
7. Responsive behavior
8. Accessible interaction states
9. Intentional motion
10. A coherent visual language

Do not stop at "the page looks good." The finished result should feel
like someone deliberately designed the product.

### Complete the states

Never design only the happy path. For every meaningful interactive
surface, consider:

- initial
- loading
- populated
- empty
- error
- disabled
- hover
- focus
- active
- selected
- success
- partial or limited
- permission denied
- offline where relevant

Empty states should explain what happened and what the user can do
next. Errors should be actionable. Loading states should preserve
layout where practical.

### Use realistic content

Avoid lorem ipsum and obviously fake placeholder content unless the
task specifically requires placeholder data. Use realistic names,
titles, labels, descriptions, dates, statuses, numbers, file names,
and notifications. Copy is part of the interface. A polished layout
with obviously artificial content still looks unfinished.

### Establish interaction consistency

The same interaction should behave the same way throughout the
product. Dropdowns open consistently. Menus have consistent spacing
and positioning. Destructive actions follow the same confirmation
pattern. Buttons have consistent height and feedback. Inputs have
consistent focus treatment.

### Do not make everything a card

Cards are not a default layout primitive. Use cards when grouping
content benefits from a distinct surface. Otherwise prefer whitespace,
typography, dividers, lists, tables, inline controls, sections, and
grouped controls. If every element is boxed, nothing has hierarchy.

### Responsive design is not an afterthought

Do not simply stack desktop elements vertically. Design mobile
intentionally. Determine what remains visible, what becomes a drawer,
what becomes sticky, what becomes horizontally scrollable, what
disappears, what changes priority, how navigation changes, and how
dense information is transformed.

### Motion should communicate something

Animation is optional. Poor animation makes a product feel cheaper,
not better. Use motion when it explains hierarchy, communicates state,
guides attention, confirms an action, establishes spatial
relationships, makes an interaction feel natural, or reinforces product
identity. Respect prefers-reduced-motion. Do not add animation merely
because an animation library is available.

### Visual restraint

Avoid decoration without purpose. Do not automatically use gradients,
glows, glassmorphism, excessive shadows, giant rounded cards, floating
blobs, particles, excessive borders, or excessive animation. These
techniques can be excellent when they belong to the product. They
should never be the default definition of "modern." A simple interface
with excellent hierarchy is better than a visually busy interface
trying to appear sophisticated.

### Autonomous productization pass

Before declaring the UI complete, stop and review it as a product
designer. Ask:

- Does this feel like a specific product or a generic AI-generated
  interface?
- Can a new user understand what matters within a few seconds?
- Is the primary action obvious?
- Is information organized without becoming cluttered?
- Do similar controls behave and look the same?
- Are loading, empty, error, disabled, hover, focus, selected, and
  success states handled?
- Does the copy feel real?
- Does mobile feel intentionally designed?
- Can keyboard users understand and operate the interface?
- Does animation improve comprehension or interaction?
- Can anything be removed without reducing usability?
- Could this screenshot be mistaken for a generic template?

If the answer to the last question is yes, continue refining. Do not
merely report the problems. Fix them.

### The final quality rule

Do not finish when "the requested components exist." Finish when "the
requested workflow works and the interface feels like a coherent
product."

The user should not have to provide a second round of instructions
saying "make it look more polished," "add empty states," "make mobile
better," "fix the spacing," "add hover states," or "make it feel less
generic." Anticipate these requirements and handle them during the
initial implementation.

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
- You decide what feels right. Do not ask permission for design
  decisions. Make them.

## Phase 1: Pick the direction

For new projects, pages, or components with no theme yet.
Details in references/direction.md.

1. Determine the context: what it is, who it is for, the vibe, the
   constraints, the animation dial. If the user provided these, use
   them. If not, infer from the project and make a call.
2. Determine the identity. These turn generic UI into something that
   feels like this product, not any product. Ask only what the user
   has not already told you.
3. Match to a style family. Shortlist 2-3 candidates with a one-line
   feel and a concrete anchor.
4. Output tokens: palette, type pairing, spacing, radius, shadow or no
   shadow, motion character in one line.
5. Refine mode: when a theme already exists, audit first, extract
   principles not pixels, output a token diff.

### Identity questions (ask only what is missing)

Skip questions the user already answered. Ask only what genuinely
requires product input. These separate "looks good" from "feels like
us."

1. What is the one word you want people to feel after using this?
   Trust, speed, calm, power, fun. If you can infer it, infer it.
2. What is your signature color? One color that is yours. If the user
   has one, use it. If not, make a decision based on the product.
3. What font feels like your voice? Technical and precise, warm and
   friendly, sharp and editorial. Match that to a typeface.
4. What is the one thing competitors all do that you refuse to do?
   This defines visual contrast.
5. What is the one interaction you want people to remember? One. Not
   ten. Everything else should be invisible.
6. Show me a site that feels like what you are going for. If the user
   provides one, extract principles. If not, pick references yourself.

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
- You own the taste. I propose, you decide. But I make most design
  decisions myself. I ask only when it matters.
- Never ship a screen that fails the gate. Say exactly what fails and
  why, with the fix.

## Origin

Merged from nine skills that were one job in nine voices: taste-skill,
taste-skill-v1, redesign-skill, soft-skill, gpt-tasteskill,
minimalist-skill, brutalist-skill, stitch-skill, and ui-theme-picker.
Their folders do not come back on sync. Their best content lives in the
references.
