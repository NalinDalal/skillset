# Card patterns

Rules for card subtypes, elevation, and layout. For card anti-patterns,
see ui-core/references/build.md.

## Card subtypes

- Media card: image or video on top, text below. Use for articles,
  products, portfolio items. Image aspect ratio is fixed per row.
- Text-only card: no media, just text content. Use for settings,
  notes, descriptions. Relies on typography and whitespace, not
  imagery.
- Action card: contains one or more actions. Use for tasks, tickets,
  requests. Action buttons are at the bottom, always visible.
- Stat/summary card: shows a single metric with optional context. Use
  for dashboards, analytics. Number is dominant, label is secondary.
- Don't mix subtypes in the same row. A media card next to a stat card
  is fine. A media card next to an action card in the same row needs a
  documented reason.

## Elevation and border rules

- Elevated card: shadow or border-top. Use when the card needs to float
  above the surface (draggable, clickable, in a grid).
- Flat card: border only, no shadow. Use when cards are in a dense
  list or table. Shadow on dense cards creates visual noise.
- No card: use when the content doesn't need grouping. A single text
  block doesn't need a card wrapper.
- Dark mode: eliminate shadow, use border. See ui-core/references/
  dark-mode.md.

## Clickable card hit area

- The whole card is clickable, but the hit area is the card bounds plus
  padding. Don't make the image clickable and the text unclickable, or
  vice versa.
- Focus state: the whole card gets a focus ring when focused via
  keyboard. Don't only focus the link inside.
- Hover state: subtle background tint or border shift. Don't lift the
  card on hover. That's a card flip, not a hover state.
- Don't put interactive elements inside a clickable card unless the
  whole card navigates. A card that navigates but contains a button is
  ambiguous. Does the button navigate or does the card?

## Card grid vs list layout

- Grid: use when cards have similar height and the user is browsing.
  Bento grid for mixed content, uniform grid for homogeneous content.
- List: use when cards are dense, have variable height, or the user is
  scanning. List is more compact than grid.
- Don't force grid for variable-height content. If cards have
  different heights, use a masonry layout or a list. A uniform grid
  with empty space is sloppy.

## Don'ts

- Don't put cards inside cards. If you need nested content, use a
  card with a header and body, not two cards.
- Don't use cards for single items. A single button doesn't need a card
  wrapper.
- Don't add shadow to every card. Shadow is for hierarchy, not
  decoration. Flat cards are valid.
- Don't make every card clickable. Some cards are containers, not
  links. A card with a "Delete" button is not a link.
- Don't use different card styles in the same row without a documented
  reason. Consistency within a section is a craft requirement.
