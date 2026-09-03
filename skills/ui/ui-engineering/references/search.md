# Search patterns

Rules for search input placement, behavior, and results. For keyboard
nav within results, see accessibility.md. For command-palette search,
see the cmdk skill.

## Input placement

- Inline search: use when search is the primary action on a page
  (inbox, docs, file browser). Full width on mobile, constrained on
  desktop.
- Command palette: use when search is a power-user shortcut across the
  whole product. Triggered by ⌘K, not always visible. See ask-command-menu.
- Inline + command palette: both can coexist. Inline is the visible
  entry point; command palette is the keyboard-accessible expansion.
- Don't bury inline search inside a dropdown. If search is primary, it
  should be visible.

## Autocomplete and suggestions

- Show suggestions after 2+ characters, not on focus alone. Focus
  alone is a convenience, not a search trigger.
- Debounce: 200-300ms for local data, 300-500ms for remote. Faster
  feels instant; slower feels laggy.
- Keyboard nav: arrow keys move through results, Enter selects, Esc
  closes. See accessibility.md for focus management.
- Highlight: bold the matching substring in results. Don't highlight
  the whole result — that defeats the purpose.
- Recent searches: show below the input when empty, above live results
  when typing. Max 5 recent items. Allow delete per item and clear all.

## Empty search state

- No query yet: show placeholder text with a format hint ("Search
  projects..."), not a label ("Search").
- No results: "No results for [query]" with a clear-filter action.
  Don't show "Try different keywords" — that's condescending.
- Error state: "Something went wrong" is never enough. Say what
  happened and offer retry.

## Result highlighting

- Highlight matching text in the result, not the surrounding context.
  Context is helpful, but the match is what the user is looking for.
- Don't highlight more than 2-3 segments per result. Too much
  highlighting looks like noise.
- Case-insensitive matching. Preserve original casing in results.

## Keyboard nav within results

- Arrow keys navigate results, Enter selects, Esc closes. See
  accessibility.md for focus-trap rules.
- Type-ahead: typing while results are open jumps to the next result
  starting with that character. Don't require reopening the list.
- Don't trap focus in the search input. Tab should move to the next
  interactive element, not cycle within results.

## Don'ts

- Don't search on focus. Search is an action, not a reveal.
- Don't show more than 8-10 results without a "Show all" link.
  Infinite scroll in search results is disorienting.
- Don't highlight every occurrence. One or two matches per result is
  enough.
- Don't use dropdowns for search results. Dropdowns imply a single
  selection; search results imply a list of options.
- Don't forget the empty state. An empty result is still a result.
