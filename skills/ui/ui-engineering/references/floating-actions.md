# Floating action buttons

Rules for when a FAB earns its place, placement, and variants. For
mobile patterns and thumb-zone rules, see responsive.md.

## When a FAB earns its place

- FAB is for the primary action on a screen that is not in the header
  or content. Examples: compose new email, add new item, create post.
- If the primary action is already visible in the header or content,
  do not add a FAB. One primary action per screen, one place to find it.
- Do not use FAB for secondary actions. A FAB that says "Share" next to
  a primary "Create" button is the wrong pattern. The secondary action
  belongs in a menu or inline.
- Avoid on dense screens. FABs need whitespace to breathe. On a dense
  dashboard, a FAB is noise.

## Single vs speed-dial

- Single FAB: use when there is one primary action. The default.
- Speed-dial: use when there are 2 to 4 related actions that share the
  same context. Expands on tap, showing smaller FABs stacked.
- Do not use speed-dial for unrelated actions. If the actions are
  "Save", "Share", and "Delete", they do not belong in a speed-dial.
  Save and Share might. Delete is separate.
- Do not use speed-dial on mobile unless the parent FAB is clearly
  labeled. An unlabeled FAB that expands into more unlabeled FABs is
  unusable.

## Placement across breakpoints

- Desktop: bottom-right corner, 24px from edges. Matches the toast
  placement zone.
- Tablet: bottom-right corner, 16px from edges.
- Mobile: bottom-right corner, 16px from edges, above the bottom nav
  if present. If there is a bottom nav, the FAB floats above it, not
  behind it.
- Do not place FAB in the top-right. That is where secondary actions and
  menus live. FAB is primary, bottom-right.
- Do not cover content. The FAB should float above content, not push it
  down. Use fixed positioning, not margin.

## Conflict rules

- Bottom nav: FAB floats above the nav, not behind it. The FAB is
  closer to the content edge than the nav.
- Bottom sheet: FAB hides when a bottom sheet is open. Two floating
  elements compete for the same space.
- Scroll: FAB hides on scroll down, reappears on scroll up. Do not hide
  on scroll up. The user is moving toward the action.
- Do not show FAB on a screen with no primary action. If there is nothing
  to create, there is no FAB.

## Avoid

- Do not use FAB for navigation. FAB is for creation or primary action,
  not for moving between screens.
- Do not use FAB as a "more" button. If you need more actions, use a
  menu or a bottom sheet.
- Do not animate FAB on every scroll event. Hide/show on scroll
  direction change, not on every pixel.
- Do not use FAB on landing pages. Landing pages have one CTA in the
  hero. A FAB implies the user is inside the product.
- Do not label FAB with text unless it is a speed-dial parent. FAB is
  icon-only. If the action needs a label, it is not a FAB.
