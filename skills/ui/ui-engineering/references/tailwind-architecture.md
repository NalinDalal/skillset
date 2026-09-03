# Tailwind architecture

Rules for Tailwind v3 vs v4 strategy, token architecture, and
implementation conventions. For dark-mode token wiring, see
ui-core/references/dark-mode.md.

## v3 vs v4 strategy

- Use v4 if the project is new and the team can adopt it. v4's `@theme`
  is simpler and keeps tokens in CSS, not JS config.
- Use v3 if the project is existing with a mature config, or if the
  team needs plugin stability. Don't upgrade mid-project unless the
  pain of v3 is acute.
- Don't mix: pick one version per project. v3 and v4 configs are not
  compatible.

## @theme vs theme.extend

- v4: `@theme` in globals.css. Tokens are CSS custom properties by
  default. Extend with `@theme` blocks, not JS config.
- v3: `theme.extend` in tailwind.config.js. Tokens are JS objects.
  Extend with nested objects.
- Rule: tokens live in one file. globals.css for v4, tailwind.config.js
  for v3. Don't scatter tokens across components.

## Design token naming

- Semantic tokens: `bg-canvas`, `text-primary`, `border-muted`. Use
  function, not appearance.
- Component tokens: `btn-bg-primary`, `input-border`. Derived from
  semantic tokens, not standalone.
- Arbitrary values: use sparingly. `bg-[#ff0000]` is a one-off, not a
  token. If you use it twice, make a token.
- Arbitrary values for layout: `w-[calc(100%-2rem)]` is acceptable for
  one-off layouts. Don't make it a token unless it's reused.

## When to extend vs arbitrary

- Extend the theme when the value is reused 2 or more times. Two
  buttons with the same padding = a token.
- Use arbitrary values for one-off layouts, experimental designs, or
  when the value is tied to content (image width, text length).
- Don't extend the theme for every variant. Button variants (primary,
  secondary, ghost) are component variants, not theme tokens.

## Dark-mode token wiring

- All colors via CSS variables or semantic tokens. Never hardcode
  `bg-white` or `bg-gray-900` in components.
- v4: `@theme` supports `--color-*` tokens. Define light and dark
  values in `:root` and `.dark`.
- v3: `darkMode: 'class'` with `dark:` variants on token utilities, or
  CSS variables with `@apply`.
- See ui-core/references/dark-mode.md for color adjustment rules.

## Implementation conventions

- Component classes: `class="btn btn-primary"` not `class="bg-blue-500
  text-white px-4 py-2 rounded"`. Tokens in components, utilities in
  tokens.
- Variant composition: use `group` and `peer` for hover/focus states
  that depend on parent or sibling. Don't duplicate state logic.
- Responsive: mobile-first. `md:`, `lg:`, `xl:` for breakpoints. See
  ui-core/references/responsive.md.
- State: `hover:`, `focus:`, `active:`, `disabled:`, `data-*:` for
  component states. Don't use arbitrary state selectors.
- Plugins: use `@tailwindcss/forms`, `@tailwindcss/typography` only
  when the project needs them. Don't install plugins for one use case.

## Don'ts

- Don't use `!important` or `!` utility. If you need it, the cascade
  is wrong.
- Don't use `@apply` in component files. `@apply` belongs in the theme
  or utilities, not in JSX.
- Don't create utility classes that duplicate token utilities. If you
  need `text-primary` often, make it a token.
- Don't extend the theme for every shade of gray. One gray family, one
  scale.
- Don't use arbitrary values for colors. If you use `#ff0000` twice,
  make a token.
