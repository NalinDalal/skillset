# Buttons

The most-used component in any interface, and the one most often shipped
half-finished. A button has to answer two questions at a glance: what will
happen, and how important is it relative to everything else on screen.

Everything here is a default to start from, not a spec to copy. Values come
from the tokens in `system.md`, never from numbers typed into a component.

## The four dimensions

A button system varies along four independent axes. Treating them as one
list is how you end up with twelve unrelated button styles instead of a
component.

| Dimension | Values | Notes |
|---|---|---|
| Hierarchy | primary, secondary, tertiary | See below. One primary per screen or section. |
| Intent | neutral, warning, danger, success | Independent of hierarchy. A destructive button can be primary. |
| Content | label, icon+label, icon-only | Icon-only needs an accessible name. |
| Size | small, default, large | Padding-driven, not height-driven. |

Every button also needs its interaction states defined: default, hover,
focus-visible, active, disabled, loading. That matrix lives in `build.md`
and applies to every component, not just buttons.

The common failure is treating intent as part of hierarchy, so a
destructive action silently becomes the quietest thing on screen when it
should be the loudest.

## Hierarchy

**Primary** is the most important action on the screen. Solid fill, highest
contrast. Usually exactly one: `Save changes`, `Create project`, `Send`.

**Secondary** is a real action that must not compete with the primary.
Outline, border, or tinted fill: `Cancel`, `Back`, `View details`.

**Tertiary** is low-priority or repetitive. Text or ghost, no fill:
`Skip`, `Read more`, `View all`.

If a screen has two primary buttons, it has no primary action. That is a
layout problem, and the fix is to demote one, not to dilute both.

## Labels

**Label the action, not the response to the question.** A confirm dialog
asking "Delete this document?" gets `Delete`, not `Okay`. The user is
performing an action, not answering a question, and the button should say
which one.

Avoid `Okay`, `Yes`, `Click here`, and bare `Continue` when a specific verb
is available. `Continue` is acceptable only when it genuinely continues to a
next step the user can already see.

Follows the rules in `copy.md`: verb plus object, no articles, sentence
case. Uppercase buttons look strong and read worse, so reserve them for a
product whose visual language is built on small tracked caps (see
`typography-picker` for the tracking requirement that goes with it).

## Sizing: padding, never height

This is the highest-value rule in this file.

```css
/* Wrong: clips text at larger font sizes */
.button { height: 40px; }

/* Right: grows with the text */
.button { padding-block: 8px; padding-inline: 32px; }
```

A fixed height breaks the moment a user increases their browser font size or
a long label wraps. The text clips or the padding collapses. Padding adapts
to font size, line-height, borders, and icon dimensions for free.

Starting values for `padding-block`: large 16px, default 8px, small 4px.
These are starting points. Verify against the real font and line-height.

## Sizing: width grows with the label

```css
.button {
  padding-inline: 32px;
  min-width: 100px;   /* floor only, never a fixed width */
}
```

`min-width` stops a short label like "Edit" from producing a cramped target.
A fixed `width` does the opposite: it clips "Create project" and breaks under
localization, where German labels run roughly a third longer than English.

Never set a fixed width on a button. Let it grow.

## Icon buttons

An icon-only button is only acceptable when the icon has a well-established
meaning and space is genuinely tight. Search, close, and overflow are safe.
Anything that could be confused with another icon is not.

Every icon-only button needs an accessible name that describes the action:

```html
<button aria-label="Download">
  <DownloadIcon aria-hidden="true" />
</button>
```

The name describes the action, not the glyph: `aria-label="Download"`, never
`aria-label="Download icon"`. Icons are decorative here, so they get
`aria-hidden`.

If a visible label fits without harming the layout, prefer it. Icon-only
controls are where discoverability dies, because nothing on screen names the
action.

For icon+label buttons, the icon reinforces the label and never replaces it.
Keep icon size, the gap, and both alignments constant across the system.

## States

Defined in the full matrix in `build.md`. The button-specific points:

- **Hover** is never the only place information appears. Touch devices have
  no hover, so a hover-only tooltip or reveal is invisible to half your users.
  See `accessibility.md`.
- **Focus-visible** must be clearly visible. Use `:focus-visible` rather than
  `:focus` so a mouse click does not leave a ring on a button the user is
  not navigating through. Never remove it.
- **Active** reads as physical. The house default is `scale(0.98)`, which
  costs nothing and makes the control feel real. The mechanism table in
  `build.md` has the timings.
- **Disabled** means the action is genuinely unavailable right now, not
  merely rare. A "Delete" button greyed out because the user has not written
  anything yet is wrong: hide it, or leave it enabled and let the click
  explain why. A disabled button with no tooltip is a dead end, and it also
  skips the focus order, so keyboard users never find out why.

Never use disabled styling to signal importance or rarity. That is what
opacity and color are for.

## Intent colors

Neutral for ordinary actions, warning for caution, danger for destructive or
irreversible, success for a positive result. Keep the mapping consistent
across the product, and never let color carry the meaning alone: the label
and surrounding context must say it too, which is both an accessibility
requirement and what makes a screen readable at a glance.

Reserve success styling for genuinely completed actions. A green "Confirm"
button implies something good will happen, which is a promise most forms
cannot keep.

## Radius, shadow, weight

Radius sets personality: square reads structured and formal, slightly
rounded reads neutral, a full pill reads casual and modern. Pick one for the
system and hold it. `system.md` sets the house default at flat or barely
rounded.

Shadow, if used at all, is elevation feedback, not decoration:

```
default -> subtle elevation
hover   -> stronger elevation
active  -> reduced elevation, as if pressed in
focus   -> a visible ring, not a shadow
```

If removing the shadow makes the button invisible, the button needs a
border or a fill that is doing the work, not a heavier shadow.

Weight: 500 or 600 for a button label reads well at small sizes. Above 700
the label starts fighting the fill.

## Accessibility checklist

- Real `<button>` element. A `<div>` with a click handler is not a button:
  it is not focusable, not announced, and does not fire on Enter or Space.
- Visible `:focus-visible` ring, never removed.
- Accessible name on every icon-only button, describing the action.
- 4.5:1 contrast for the label against the fill, 3:1 for the component
  boundary. Check the disabled state separately; disabled text is
  exempt from WCAG but not from being legible.
- 44x44px minimum touch target, counting padding, per `system.md`.
- Survives a 200% browser font size without clipping.
- State is never communicated by color alone.

## Pre-ship checklist

- One primary action, and it is the right one.
- Every label names the action, sentence case, no articles.
- Five states defined and visually distinct, focus-visible included.
- Padding-based sizing, no fixed height or width.
- Grows with longer labels and larger fonts.
- Icon-only buttons have accessible names; icons are `aria-hidden`.
- Radius, shadow, and weight match the rest of the system.
- Disabled is used only for genuinely unavailable actions.
- Keyboard: reachable by Tab, activates on Enter and Space, and the focus
  ring is visible at every state.
