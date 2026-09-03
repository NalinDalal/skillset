# Pagination and load-more patterns

Rules for choosing between numbered pagination, "load more", and
infinite scroll. For infinite-scroll implementation details, see
ui-core/references/build.md.

## Decision criteria

- Numbered pagination: use when the user needs to jump to a specific
  page, compare pages, or the data is truly paginated (search results,
  table data). Shows page numbers, prev/next, and total count.
- "Load more" button: use when the user is browsing a feed or list and
  needs explicit control over pacing. Shows a button at the bottom of
  the list.
- Infinite scroll: use when the content is a continuous feed (social,
  notifications) and the user is consuming, not searching. See
  ui-core/references/build.md for implementation rules.
- Don't mix: choose one pattern per list. A list with both "load more"
  and infinite scroll is confusing.

## Cursor-based vs offset-based pagination

- Cursor-based: use for real-time or frequently changing data. The
  cursor points to the last item, not a page number. UI shows "Load
  more" or infinite scroll, not page numbers.
- Offset-based: use for static or rarely changing data (archived posts,
  reports). UI shows numbered pages.
- UI difference: cursor-based never shows page numbers. Offset-based
  can show page numbers, but doesn't have to.

## Page-size selection

- Show when the user is working with dense data (tables, lists) and
  the page size affects usability. Hide for content feeds.
- Placement: above the list, not below. Users look for controls before
  they start consuming.
- Options: 10, 25, 50, 100. Don't offer more than 4 options. Default
  to 25 unless the data is dense (then 50) or sparse (then 10).
- Persist: remember the user's choice per view. Don't reset on every
  navigation.

## Total counts

- Show total count when the user needs to know the scope ("Showing 1-25
  of 342 results"). Hide for infinite scroll feeds where the total is
  unknown or not meaningful.
- Format: "Showing 1-25 of 342" not "342 results". The first form
  tells the user where they are, not just how much there is.
- Don't show "Page 1 of 15" without also showing the range. Page
  numbers alone don't tell the user how much data they're missing.

## Scroll-position restoration

- Restore scroll position when navigating back to a paginated list.
  The user expects to return to where they were, not the top.
- Implementation: store scroll position in a ref or state keyed by the
  list identity. Restore on mount.
- Don't restore for infinite scroll feeds. In infinite scroll, the
  content is new every time. Restoring position would show stale data.

## Don'ts

- Don't show page numbers for cursor-based pagination. The cursor is
  opaque. Page numbers are meaningless.
- Don't use "load more" for search results. Search implies completion.
  "Load more" implies there's more to find.
- Don't hide the total count for paginated data. The user needs to know
  the scope to make decisions.
- Don't reset page size on every navigation. Persist per view.
- Don't use infinite scroll for task-oriented lists. Infinite scroll is
  for consumption, not completion.
