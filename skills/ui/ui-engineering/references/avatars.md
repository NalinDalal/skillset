# Avatar patterns

Rules for sizing, fallbacks, groups, and presence indicators. For
accessibility, see accessibility.md.

## Sizing scale

- xs 24px: inline with body text, comment threads, compact lists.
- sm 32px: default for most UI, list rows, table cells.
- md 40px: expanded lists, cards, comments.
- lg 56px: profile headers, detail pages.
- xl 80px: account pages, hero sections.
- Don't invent sizes between these. If 48px feels right, you're
  solving a layout problem with a new size instead of using md or lg.

## Fallback hierarchy

- Level 1: user-uploaded image. Load with lazy loading, show skeleton
  or initials while loading.
- Level 2: initials. Generated from the user's name. One or two
  characters, centered, contrasting background.
- Level 3: generic icon. Use only when there's no name to generate
  initials from. Don't show a silhouette for every user without a photo.
  Initials are more personal.
- Fallback background: use the accent color or a muted neutral. Don't
  use a different color per user unless the color is derived from the
  user's name or id (deterministic, not random).

## Avatar groups / stacking

- Max 4 to 5 avatars visible before overflow. Show "+N" for the rest.
- Overlap: 25 to 33% overlap (avatar width minus gap). Gap should be
  2 to 4px.
- Overflow indicator: "+N" in a circle, same size as avatars, muted
  background. Don't use a square or a different shape.
- Order: primary user first, then by relevance or alphabetically.
  Don't reorder on every render.
- Click behavior: clicking the overflow indicator shows the full list.
  Clicking an avatar navigates to that user's profile.

## Presence / status dot

- Placement: bottom-right of the avatar, offset by 2 to 4px. Don't
  center it. It overlaps the avatar content.
- Size: 25% of avatar width. 6px for sm (32px), 8px for md (40px),
  10px for lg (56px).
- Colors: green (online), amber (away), red (busy), gray (offline).
  Don't use semantic colors for non-semantic states.
- Border: 2px solid background color to separate dot from avatar edge.
  Don't use a shadow. It bleeds.
- Don't show presence for groups. Presence is per user, not per group.

## Shape consistency

- Circle: default for user avatars. Use everywhere, no exceptions.
- Square: use for teams, projects, or organizations. Radius 4 to 8px,
  same as the product's radius language.
- Don't mix circles and squares in the same avatar group. Pick one
  shape per context.
- Rounded square: acceptable for teams, but don't use for users. User
  avatars are circles.

## Don'ts

- Don't show broken-image icons as fallbacks. Use initials or generic
  icon.
- Don't stack more than 5 avatars without an overflow indicator. Six
  overlapping circles is noise.
- Don't use presence dots for non-presence states. A dot is not a
  notification badge.
- Don't change avatar size within the same component. Size is per
  context, not per user.
- Don't use random colors for fallback backgrounds. Derive from name
  or id, or use a single accent.
