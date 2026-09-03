# Accessibility

Built into Phase 3 (build), not just checked in Phase 5 (verify).
"Keyboard, ARIA, focus visible, contrast AA" is not a rule until it is
specific. This file is the specific version.

## Color contrast

- Body text vs background: 4.5:1 minimum (AA). Large text (24px+, or
  19px+ bold): 3:1 minimum.
- UI components and graphical objects (icons, input borders, focus
  rings): 3:1 minimum against adjacent colors.
- Never encode meaning in color alone: error states get an icon or
  text, not just a red border. Same for success, warning, required.
- Check contrast at both the accent's saturation cap (system.md: under
  80%) and in dark mode separately. The same hex pair often passes
  light and fails dark, or vice versa.
- Disabled-state text is exempt from AA, but if a "disabled" control is
  actually informative (for example, shows why it's disabled on hover),
  that hover content is not exempt.

## Focus management

- Every interactive element has a visible focus state. Never
  `outline: none` without a replacement ring or equivalent contrast
  shift.
- Focus ring: 2px minimum, offset from the element, uses the accent or
  a dedicated focus color. Never the same color as a hover state, or
  keyboard users can't tell the two apart.
- On route change or tab/panel switch, focus moves to the new content's
  heading or first interactive element. It never silently stays on a
  now-invisible trigger.
- On modal/drawer open: focus moves inside, is trapped inside (Tab
  cycles within), and returns to the trigger on close.
- On item delete (from a list, table, etc.): focus moves to the next
  logical item, not lost to `<body>`.
- Skip-to-content link for any page with a nav longer than about 5 items.

## ARIA and semantics

- Real elements first: `<button>` not `<div onClick>`, `<a>` for
  navigation not action. ARIA patches what HTML can't express, it is
  not a first resort.
- Icon-only controls get `aria-label`. Decorative icons get
  `aria-hidden="true"`.
- Custom widgets (combobox, tabs, accordion, menu) follow the WAI-ARIA
  APG pattern for that widget. Role, `aria-expanded`,
  `aria-controls`, `aria-selected` as specified, not invented ad hoc.
- Live regions (`aria-live="polite"`) for async status that is not
  focus-driven: toast confirmations, save indicators, search result
  counts. `assertive` only for errors that block progress.
- Form fields: label programmatically associated (`<label for>` or
  wrapping), not just visually adjacent. Error text linked via
  `aria-describedby`.

## Keyboard

- Every mouse action has a keyboard equivalent. No hover-only reveals
  for functionality. A hover-only "more info" that is never reachable by
  keyboard is a failure, not a nice-to-have.
- Tab order follows visual/reading order. `tabindex` values above 0 are
  banned. Use DOM order instead.
- Escape closes the topmost transient layer (modal, drawer, menu,
  tooltip) and nothing else.
- Arrow keys navigate within composite widgets (menus, tabs, radio
  groups, comboboxes) per the APG pattern for that widget.

## Screen reader considerations

- Page and route changes get an announced title change (`document.title`
  or a live region), since screen reader users don't see the visual nav.
- Truncated text (`text-overflow: ellipsis`) keeps the full string
  available to assistive tech via `title` or visually-hidden text, not
  silently cut.
- Images: meaningful images get real `alt`. Purely decorative images
  get `alt=""`, never omitted `alt`.
- Icon fonts are banned for meaningful content. Screen readers may read
  the glyph's private-use codepoint or nothing. Use SVG or an
  accessible icon component.

## Verify additions

Add to the Phase 5 gate: contrast checked at both themes [dom], focus
order matches visual order [dom], every custom widget matches its APG
pattern [code], skip link present on nav-heavy pages [dom].
