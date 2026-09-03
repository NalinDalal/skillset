# Floating action buttons

Rules for when a FAB earns its place, placement, and variants. For
mobile patterns and thumb-zone rules, see responsive.md.

## When a FAB earns its place

- FAB is for the primary action on a screen that's not in the header or
  content. Examples: compose new email, add new item, create post.
- If the primary action is already visible in the header or content,
  don't add a FAB. One primary action per screen, one place to find it.
- Don't use FAB for secondary actions. A FAB that says "Share" next to
  a primary "Create" button is the wrong pattern — the secondary action
  belongs in a menu or inline.
- Avoid on dense screens. FABs need whitespace to breathe. On a dense
  dashboard, a FAB is noise.

## Single vs speed-dial

- Single FAB: use when there's one primary action. The default.
- Speed-dial: use when there are 2-4 related actions that share the
  same context. Expands on tap, showing smaller FABs stacked.
- Don't use speed-dial for unrelated actions. If the actions are
  "Save", "Share", and "Delete", they don't belong in a speed-dial.
  Save and Share might; Delete is separate.
- Don't use speed-dial on mobile unless the parent FAB is clearly
  labeled. An unlabeled FAB that expands into more unlabeled FABs is
  unusable.

## Placement across breakpoints

- Desktop: bottom-right corner, 24px from edges. Matches the toast
  placement zone.
- Tablet: bottom-right corner, 16px from edges.
- Mobile: bottom-right corner, 16px from edges, above the bottom nav
  if present. If there's a bottom nav, the FAB floats above it, not
  behind it.
- Don't place FAB in the top-right. That's where secondary actions and
  menus live. FAB is primary, bottom-right.
- Don't cover content. The FAB should float above content, not push it
  down. Use fixed positioning, not margin.

## Conflict rules

- Bottom nav: FAB floats above the nav, not behind it. The FAB is
  closer to the content edge than the nav.
- Bottom sheet: FAB hides when a bottom sheet is open. Two floating
  elements compete for the same space.
- Scroll: FAB hides on scroll down, reappears on scroll up. Don't hide
  on scroll up — the user is moving toward the action.
- Don't show FAB on a screen with no primary action. If there's nothing
  to create, there's no FAB.

## Don'ts

- Don't use FAB for navigation. FAB is for creation or primary action,
  not for moving between screens.
- Don't use FAB as a "more" button. If you need more actions, use a
  menu or a bottom sheet.
- Don't animate FAB on every scroll event. Hide/show on scroll
  direction change, not on every pixel.
- Don't use FAB on landing pages. Landing pages have one CTA in the
  hero. A FAB implies the user is inside the product.
- Don't label FAB with text unless it's a speed-dial parent. FAB is
  icon-only. If the action needs a label, it's not a FAB.
