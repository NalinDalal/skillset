# Dark mode

"Dark mode works" is not a spec. This is the spec.

## CSS variable architecture

- Semantic tokens, not raw colors, at every call site:
  `bg-canvas`, `bg-surface`, `text-primary`, `text-muted`, `border`,
  not `bg-white` / `bg-black` / `text-gray-900` anywhere in components.
- Two value sets behind the same token names, swapped by a `.dark`
  class or `data-theme` attribute on `<html>`. Never per-component
  `dark:` overrides scattered through the codebase for anything that's
  a reusable token (page-specific one-offs are the only exception).
- Define the tokens once, in one file (`globals.css` or the design
  system entry point). Components consume tokens; they don't define
  colors.

## Tailwind dark: strategy

- `darkMode: 'class'` (or `'selector'` in v4), not `'media'`. The
  toggle needs to be user-controlled, not OS-only.
- Prefer semantic utility classes (`bg-surface`) over `dark:` variants
  (`bg-white dark:bg-gray-900`) wherever the token system covers it.
  Use `dark:` only for the token definitions themselves or genuine
  one-offs.

## System preference detection

- Default to `prefers-color-scheme` on first load (no flash of wrong
  theme. Set the class before paint, for example inline script or SSR
  cookie, not after hydration).
- Persist an explicit user choice (localStorage or cookie) once they
  toggle it. That choice overrides the system preference until they
  clear it or pick "system" again.
- Offer three states where a toggle exists: light, dark, system. Not
  just a binary switch, unless the product genuinely has no system-sync
  need.

## Color adjustment rules

- Don't invert. Redesign each token. A light `canvas` (#fff) does not
  become dark `canvas` (#000). It becomes a tinted near-black
  (#0a0a0b to #121214 range), matching system.md's "no pure black"
  rule in both themes.
- Reduce saturation on accents in dark mode. The same saturated hue
  reads as glowing/neon against a dark background. Drop 10-20% and
  usually lighten slightly.
- Text: dark mode primary text is off-white (#e8e8ea range), not pure
  white. Pure white on dark surfaces creates halation/glare.
- Borders: light-mode borders are often a light gray. The dark-mode
  equivalent is usually a lighter value than you'd guess (a border
  needs contrast against a dark surface too), not just "the dark
  version of the same gray."

## Edge cases

- Shadows: box-shadows tuned for light mode disappear or look wrong on
  dark surfaces. Use a lighter border or a subtle inset highlight
  instead of a shadow for elevation in dark mode, or tint the shadow
  color to something other than black (system.md already says tint
  shadows to background hue. This applies doubly in dark mode).
- Images and logos: photos may need a slight brightness/contrast
  reduction on dark backgrounds. Logos with dark-only ink need a light
  variant swapped in, not just displayed as-is.
- Illustrations with transparent backgrounds: check they don't assume
  a white canvas behind them (visible white halos or boxes).
- Code blocks / syntax highlighting: needs its own light/dark theme
  pair, not the page's generic tokens.
- Charts: data-viz palettes need contrast-checked dark variants, not
  the same hues dimmed uniformly.

## Verify additions

Add to the Phase 5 gate: both themes hit AA contrast [dom], no
literal white/black utility classes in component code [code], theme
persists across reload and matches system on first load [dom].
