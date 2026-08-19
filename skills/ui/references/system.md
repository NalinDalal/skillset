# Design system

## Constraint budget

One accent, one gray family, one radius scale, one icon family, one
stroke weight, one motion curve family, one surface language. Every
addition needs a reason that traces back to the product's feel contract.

## Color

- Max one accent, saturation under 80%.
- One gray family: warm or cool, never both.
- No pure black: use tinted near-blacks.
- Neutral roles: canvas, surface, text, muted text, border.
- Pastel accents with dark text for tags and badges.
- One palette per project. Accent identical across the page.
- No purple or blue AI gradients anywhere.

## Type

- Sans body candidates: Geist, Outfit, Cabinet Grotesk, Satoshi. Inter
  and Roboto are the AI default; banned unless the brand names one.
- Display: tight tracking, leading near 1.1, negative letter spacing.
- Body: 16px base, line-height 1.6, max width 65ch.
- Data: tabular figures (font-variant-numeric).
- One family. Italic or bold of the same family for emphasis.
- Serif only when the brand asks or the brief is editorial.

## Scale

- Three levels: headline, sentence, hint. Never five sizes of bold.
- Headline under 8 words. Subtext under 25 words.
- Tighter tracking as size grows.
- text-wrap balance and pretty for headers.

## Spacing

- Macro whitespace first: py-24 to py-40 for sections.
- Section gaps: clamp(3rem, 8vw, 6rem).
- Content max width 1400px or max-w-7xl.

## Radius

- One radius language per page: sharp 0, all-soft 12-16px, or all-pill.
  Mixed only with a documented rule.
- The bought-not-generated band: 12 to 30px. Skip the 40px outliers.

## Shadows

- Tint shadows to the background hue.
- Diffuse, low opacity. shadow-md and above are banned as defaults.
- High density: 1px lines instead of cards.

## Components

- Buttons: flat or barely rounded, solid contrast, no glow, no gradient.
  Pressed state: scale 0.98. One CTA per intent, no duplicated labels.
- Cards: only when elevation is hierarchy. No cards in cards. High
  density: border-top instead.
- Inputs: label above, error below, accent focus ring. No
  placeholder-as-label, no floating labels.
- Badges: pastel, pill, tiny. Max one per metadata line.
- Skeleton loaders shaped like the content, not spinners.
- Empty states that say what the user can do next.

## DESIGN.md (when a design system doc is asked for)

Seven mandatory sections:

1. Visual theme and atmosphere: density, variance, motion bands.
2. Color palette and roles: descriptive name, hex, functional role.
3. Typography: families, scale, usage rules.
4. Component stylings: each component with its states.
5. Layout principles: grid, containers, responsive behavior.
6. Motion and interaction: curves, durations, what animates.
7. Anti-patterns: the banned list for this project.