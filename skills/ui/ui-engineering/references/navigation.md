# Navigation patterns

Rules for choosing and implementing navigation patterns. For
accessibility and responsive behavior, see accessibility.md and
responsive.md.

## Sidebar vs topbar

- Sidebar: use when the app has 5+ top-level destinations, persistent
  state per section, or dense tooling (dashboards, IDEs, mail clients).
  Left rail on desktop, drawer on mobile.
- Topbar: use when there are 3-5 destinations, the page is content-led,
  or the product is marketing/landing. Horizontal links or tabs.
- Mixed: sidebar for app chrome, topbar for page-level tabs within a
  section. Don't nest both at the same level — one owns the primary
  hierarchy.
- Collapse rule: sidebar collapses to icon rail at `md`, to drawer at
  `sm`. Icon rail labels appear on hover or on `lg+`.

## Breadcrumbs

- Show when the user is more than one level deep in a hierarchy.
  Suppress on the home/landing level.
- Truncate middle segments with an ellipsis when the path exceeds 4
  segments. Keep the first and last two segments visible.
- Clickable segments: every crumb except the current page is a link.
  Current page is plain text, aria-current="page".
- Separator: `/` or `›`. Pick one, stay consistent. Don't use chevrons
  for every level in deep hierarchies — it becomes visual noise.

## Tab bar vs segmented control

- Tab bar: use for top-level destinations within a page or section.
  Horizontal, always visible, under a section header.
- Segmented control: use for toggling between 2-4 views of the same
  data. Compact, inline, looks like a toggle group.
- Don't mix: if the user needs to navigate to a different page, use
  tabs or links. If the user needs to filter the same data, use a
  segmented control.

## Active-state indication

- Current page: filled tab, bottom border, or background tint. Pick one
  per product. Never underline + background + color change together.
- Visited state: optional. If used, keep it subtle (slightly darker
  text, not a color change). Don't treat visited like selected.
- Hover state: background tint or underline. Never color shift alone —
  color is for active, not hover.

## Mobile nav collapse patterns

- Hamburger: use when there are more than 4 top-level destinations, or
  when destinations are secondary. Icon-only button, aria-label
  "Menu".
- Bottom tab bar: use for 3-5 primary destinations in a mobile app.
  Fixed to viewport bottom, safe-area-inset padding.
- Tab bar in-page: use for 2-4 secondary destinations within a single
  mobile screen. Horizontal scroll if needed, not dropdown.
- Don't hide primary navigation behind a hamburger on mobile. If a
  destination is primary, it belongs in a tab bar or topbar.

## Nested nav: drawer vs flyout

- Drawer: use for navigation trees deeper than 2 levels, or when the
  secondary nav has its own structure. Swipe to dismiss on mobile.
- Flyout: use for 2-level nav where the second level is short (3-5
  items). Appears on hover/focus on desktop, tap on mobile.
- Avoid: flyouts deeper than 2 levels. If the tree is deep, use a
  drawer or a dedicated page.

## Don'ts

- Don't use breadcrumbs on a single-level page.
- Don't mix tab-bar and topbar for the same hierarchy level.
- Don't hide the active state. The user should never have to guess where
  they are.
- Don't use dropdowns for primary navigation. Dropdowns hide options;
  navigation should reveal them.
- Don't animate nav reflows with stagger. One motion: the new state
  appears, the old one leaves.
