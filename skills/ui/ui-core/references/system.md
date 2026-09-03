# Design system

## Constraint budget

One accent, one gray family, one radius scale, one icon family, one
stroke weight, one motion curve family, one surface language. Every
addition needs a reason tied to the product.

## Color

- Max one accent, saturation under 80%.
- One gray family: warm or cool, not both.
- No pure black: use tinted near-blacks.
- Neutral roles: canvas, surface, text, muted text, border.
- Pastel accents with dark text for tags and badges.
- One palette per project. Accent identical across the page.
- No purple or blue AI gradients anywhere.
- Semantic colors: success, warning, danger, info. Each gets one hue,
  used only in that role. Warning never borrows from accent. Danger never
  borrows from warning.
- Dark mode: invert the neutral scale, keep the accent hue, reduce
  saturation by 10-20%. See Dark mode in build.md.

## Type

- Sans body candidates: Geist, Outfit, Cabinet Grotesk, Satoshi. Inter
  and Roboto are the AI default; banned unless the brand names one.
- Display: tight tracking, leading near 1.1, negative letter spacing.
- Body: 16px base, line-height 1.6, max width 65ch.
- Data: tabular figures (font-variant-numeric).
- One family. Italic or bold of the same family for emphasis.
- Serif only when the brand asks or the brief is editorial.
- Modular scale: major third (1.25), perfect fourth (1.333), or golden
  ratio (1.618). See Type scale in build.md.

## Scale

- Three levels: headline, sentence, hint. Never five sizes of bold.
- Headline under 8 words. Subtext under 25 words.
- Tighter tracking as size grows.
- text-wrap balance and pretty for headers.
- Weight ladder: 400 for body, 500 for emphasis, 600 for labels, 700
  for display. No 800 or 900 in UI text.
- Leading: display at 1.05 to 1.1, body at 1.5 to 1.6, caption at 1.4.
- Mono for data only: JetBrains Mono, IBM Plex Mono, or Geist Mono.
  Never mono for body copy.

## Spacing

- Macro whitespace first: py-24 to py-40 for sections.
- Section gaps: clamp(3rem, 8vw, 6rem).
- Content max width 1400px or max-w-7xl.
- Component padding: p-6 to p-8 for cards, p-4 for compact controls.
  Inconsistent padding is a visual error.
- Density ladder: hero is sparse, feature section is medium, data table
  is dense. One density per section.
- Minimum section padding: py-12 on mobile, py-16 on tablet, py-24 on
  desktop. Never drop below py-12 between distinct sections.

## Radius

- One radius language per page: sharp 0, all-soft 12-16px, or all-pill.
  Mixed only with a documented rule.
- The bought-not-generated band: 12 to 30px. Skip the 40px outliers.

## Shadows

- Tint shadows to the background hue.
- Diffuse, low opacity. shadow-md and above are banned as defaults.
- High density: 1px lines instead of cards.
- Dark mode: eliminate shadows or use very subtle diffused shadows.
  Borders replace shadows for separation.

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
- Icon system: stroke weight 1.5px for data-dense, 2px for marketing.
  16px inline, 20px section headers, 24px standalone, 32px+ feature.
  See Icon system in build.md.
- Form design: label above, validate on blur, error below input, submit
  button shows loading state. See Form design in build.md.
- Component state matrix: every interactive component defines Default,
  Hover, Focus, Active, Disabled, Loading, Error, Empty, Selected.
  See Component state matrix in build.md.

## Dark mode

- CSS variable architecture: all colors via CSS variables. Light and
  dark variants in :root and .dark.
- Tailwind strategy: use dark: prefix. Never hardcode colors in JSX.
- System preference: default to system. Allow manual override with
  localStorage. Respect prefers-color-scheme.
- Color adjustments: reduce saturation 10-20% in dark mode. Dark
  backgrounds need lighter text, not darker.
- Accent: keep same hue, increase lightness 5-10% in dark mode.
- Shadows: eliminate in dark mode. Borders replace shadows.
- Images: don't invert. Use opacity adjustments if needed. SVG icons
  with currentColor adapt automatically.
- Text: never pure white on pure black. Use gray-50 to gray-100 on
  gray-900 to gray-950. Minimum 4.5:1 contrast.
- Testing: verify every screen in both light and dark mode.

## Responsive

- Breakpoint scale: sm 640, md 768, lg 1024, xl 1280, 2xl 1536.
  Mobile first.
- Reflow before resize: at each breakpoint, ask if layout should reflow
  or resize. Reflow wins.
- Container queries: use when component width depends on parent, not
  viewport.
- Touch targets: 44x44px minimum on touch devices. 8px minimum gap
  between targets.
- Density shifts: mobile gets larger targets and less dense content.
  Desktop gets more columns and tighter spacing.
- Horizontal scroll banned: no element overflows container on any
  viewport.
- Typography: use clamp() for font sizes. Scale with viewport.
- Navigation: hamburger on mobile, full nav on desktop.
- Tables: horizontal scroll on mobile, full table on desktop.
- Modals: full-screen on mobile, centered on desktop.
- Forms: single column on mobile, multi-column on desktop.

## Accessibility

- Color contrast: 4.5:1 for body, 3:1 for large text and UI.
- Focus management: every interactive element keyboard reachable. Focus
  order follows visual order.
- Focus visible: 2px minimum, high contrast, visible on light and dark.
- ARIA: semantic HTML first. ARIA only when HTML falls short.
- Screen reader: decorative icons aria-hidden. Status messages
  aria-live="polite". Errors aria-live="assertive".
- Touch targets: 44x44px on mobile, 32x32px on desktop.
- Forms: every input has label. Error linked with aria-describedby.
  Required uses required attribute.
- Landmarks: header, main, nav, footer, aside. One main per page. Skip
  links for keyboard users.
- Error prevention: destructive actions have confirmation. Validation
  before submission.

## Motion

- Spring curves: cubic-bezier(0.16, 1, 0.3, 1). No ease-in-out.
- Durations: 200ms in, 150ms out. Micro means micro.
- Animate transform and opacity only. Layout animations stutter.
- One motion per event. Two springs competing reads as glitch.
- Exits exist. No one-frame vanishes.
- State lands first. Motion is polish on top.
- Interruptible: next event cancels current. Nobody waits.
- Reduced motion: all states instant. No springs, no entrances.
- Animation state machine: Idle, Entering, Entered, Active, Exiting,
  Exited, Disabled, Error, Loading, Updating. See Animation state
  machine in build.md.

## Iconography

- Families: Phosphor, Radix, Tabler, or Doton. One family per product.
- Stroke weight: 1.5px for data-dense, 2px for marketing.
- Sizing: 16px inline, 20px headers, 24px standalone, 32px+ feature.
- Filled vs outline: filled for active/selected, outline for default.
- Duo-tone: primary filled, secondary outline.
- Triple-tone: three opacity stops for illustrations, not navigation.
- Decoration limit: one decorative icon per component max.
- Accessibility: decorative icons aria-hidden. Meaningful icons have
  aria-label or title.

## DESIGN.md (when a design system doc is asked for)

Ten mandatory sections:

1. Visual theme and atmosphere: density, variance, motion bands.
2. Color palette and roles: descriptive name, hex, functional role,
   light/dark variants, semantic colors.
3. Typography: families, scale, usage rules, responsive behavior.
4. Component stylings: each component with its states, variants,
   composition patterns.
5. Layout principles: grid, containers, responsive behavior, breakpoints.
6. Motion and interaction: curves, durations, state machine, what
   animates.
7. Accessibility: contrast, focus, ARIA, keyboard, screen reader.
8. Dark mode: CSS variable architecture, color adjustments, testing.
9. Iconography: family, stroke weight, sizing, variants, usage rules.
10. Anti-patterns: the banned list for this project.
