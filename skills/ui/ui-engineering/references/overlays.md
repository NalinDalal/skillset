# Overlay patterns

Rules for dropdowns, selects, menus, tooltips, and popovers. For
focus-trap and ARIA requirements, see accessibility.md.

## Dropdown / select / menu

- Positioning: below the trigger by default, above if not enough space
  below. Right-align if near the right edge. Collision handling is
  required, not optional.
- Width: match the trigger width, or min 200px. Don't let the dropdown
  shrink below the widest item.
- Scroll: show scrollbar when items exceed viewport height minus 2x
  item height. Max height 320px.
- Selection: single-select uses a checkmark or highlight. Multi-select
  uses checkboxes. Don't use checkmarks for multi-select.
- Empty state: "No options" or "No results". Don't show an empty list
  with no message.
- Keyboard: arrow keys navigate, Enter selects, Esc closes. See
  accessibility.md.

## Tooltip

- Placement: top by default, bottom if not enough space above.
  Left/right for long text. Don't use tooltips for critical
  information — tooltips are discoverable, not guaranteed.
- Trigger: hover for desktop, focus for keyboard. Don't show on click
  alone.
- Delay: 300-500ms show delay on hover. No delay on focus. Don't make
  the user wait for a tooltip they triggered with keyboard.
- Duration: stay visible while hovered. Don't auto-hide after a
  timeout — the user controls dismissal.
- Rich vs plain: plain tooltip is text only, max 1-2 lines. Rich
  tooltip includes an icon or link, max 200px wide. Don't use rich
  tooltips for simple descriptions.
- Accessibility: tooltips are supplementary. The trigger must work
  without the tooltip. Don't put critical instructions only in a
  tooltip.

## Popover vs tooltip vs dropdown

- Popover: use when the overlay contains interactive content (forms,
  buttons, links). Stays open on interaction. Focus moves inside.
- Tooltip: use when the overlay is non-interactive text. Dismisses on
  hover/focus loss. Focus doesn't move inside.
- Dropdown: use when the overlay is a list of options. Selection is
  explicit. Dismisses on selection or Esc.
- Don't use a tooltip for a form field hint. Use help text or a
  placeholder. Tooltips are for supplementary info, not required
  reading.

## Positioning and collision handling

- Default position: below trigger, left-aligned. Above if overflow.
- Flip: flip to the opposite side before clipping. Flip before
  shifting.
- Shift: shift along the axis if still clipping after flip. Don't
  shift more than 50% of the overlay width.
- Arrow: show arrow pointing to trigger when there's room. Hide when
  close to edge. Arrow is decorative, not interactive.
- Safe areas: don't position overlays under notches, home indicators,
  or system UI. Use env(safe-area-inset-*) on mobile.

## Don'ts

- Don't show tooltips on touch devices by default. Touch doesn't have
  hover. Use long-press or a dedicated info button instead.
- Don't nest overlays. A dropdown inside a dropdown inside a popover is
  a navigation dead end.
- Don't use dropdowns for single actions. If there's only one option,
  show the action directly.
- Don't let overlays cover the trigger. The trigger must remain visible
  or be clearly replaceable by the overlay.
- Don't use tooltips for error messages. Errors belong inline, near the
  field.
