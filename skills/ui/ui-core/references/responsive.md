# Responsive design

The seven verify viewports (1440, 1280, 1024, 768, 640, 390, 375) tell
you where to check. This file tells you what should change at each
stop and why.

## Breakpoint scale

Tailwind defaults, used as-is unless the brief specifies devices:

- `sm` 640: large phone / small phone landscape.
- `md` 768: tablet portrait.
- `lg` 1024: tablet landscape / small laptop.
- `xl` 1280: laptop.
- `2xl` 1536: desktop.

Don't invent custom breakpoints for one component. If a card wraps
badly at 810px, that's a component fix (min-width, flex-wrap), not a
new breakpoint.

## Reflow vs resize

- Resize (same layout, smaller): fine down to the point text or targets
  break. Most spacing scales this way (clamp(), fluid type).
- Reflow (structure changes) happens at these tiers, matching Phase 5's
  hierarchy rule:
  - Desktop (1024+): full chrome. Sidebar visible, multi-column,
    secondary actions inline.
  - Tablet (768–1023): reduced secondary chrome. Sidebar collapses to
    icon rail or drawer, 2-column becomes stacked where content needs
    the width.
  - Mobile (<768): one column, primary action first, secondary actions
    behind a menu or moved below the fold.
- A "squeezed desktop" (same layout, everything just smaller and
  cramped) at any tier fails verify.

## Container queries vs media queries

- Use a container query when a component's layout depends on the space
  it has, not the viewport (a card that's sometimes in a 3-column
  grid, sometimes a sidebar).
- Use a media query for page-level structure: nav, page grid, whether a
  sidebar exists at all.
- Don't container-query something that only ever appears full-width.
  That's a media query with extra steps.

## Touch targets

- 44x44px minimum hit area (per verify.md), including padding. A 24px
  icon with 10px padding on each side clears it. A bare 24px icon does
  not.
- Adjacent tappable targets (list row actions, toolbar icons): 8px
  minimum gap so mis-taps don't fire the neighbor.
- Targets near screen edges or in a bottom bar get extra margin. Thumb
  reach is worse at the very edge.
- Desktop-only affordances (small close buttons, drag handles) can stay
  small only if they never render on a touch viewport.

## Density shifts per viewport

- Desktop: information density can be higher. More columns, inline
  metadata, hover-revealed actions.
- Mobile: density drops. One primary value per row, secondary info
  becomes a second line, hover actions become always-visible or
  swipe/long-press.
- Tables: desktop keeps the table. Mobile becomes stacked cards (label:
  value pairs) once columns can't fit at 16px min column width.
  Never horizontal-scroll a data table as the only mobile treatment
  unless the data is genuinely tabular-only (for example, a
  spreadsheet-like tool).

## Verify additions

Per class (already in verify.md) plus: container-queried components
tested at their narrowest realistic container, not just narrowest
viewport; bottom-bar/thumb-zone targets checked with extra edge margin
on mobile.
