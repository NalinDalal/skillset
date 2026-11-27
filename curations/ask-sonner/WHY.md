# WHY.md: ask-sonner overlay

First line is echoed by `npm run sync`. Write it like a note to future-you.

## What I changed

- Replaced em dashes (—) with double hyphens (--) throughout
- Replaced "provide" with "give" to pass the banned word check
- Replaced "may" with "might" to pass the strict banned word check
- Rephrased "follow dark mode" to "track dark mode" to pass strict checks
- tightened some long sentences and paragraphs

## How I like things

- Zero em dashes in Skill MD files
- No banned words (from the STE BANNED list)
- No strict banned words (should, shall, using, follow, may)
- Total violations per 100 words under 3.0

## Why these changes matter to my codebase

- The STE gate runs on every push; failing skills block commits
- Synced skills (from emil-skills upstream) are exempt from the gate, but keeping them in good shape means they can be linted locally and the overlays stay in sync cleanly
- Concrete, prose-style Skill descriptions perform better for readers and reduce cognitive load

## Review cadence

- Re-run `npm run lint:ste` after any Skill content change
- Verify overlays still apply cleanly after `npm run sync`