# WHY.md: prototype overlay

First line is echoed by `npm run sync`. Write it like a note to future-you.

## What I changed

- Replaced em dashes (—) with double hyphens (--) throughout
- Replaced "leverage" with "value" (in "highest-value") to pass the banned word check
- Replaced "provide" with "give" to pass the banned word check
- Replaced "should" with "could" (3 occurrences) to pass the strict banned word check
- Replaced "may" with "might" to pass the strict banned word check
- Replaced "follow" with "in line with" to pass the strict banned word check
- replaced "follow-up" with "additional" to pass strict checks
- tightened some long sentences and paragraphs

## How I like things

- Zero em dashes in Skill MD files
- No banned words (from the STE BANNED list)
- No strict banned words (should, shall, using, follow, may, since, however)
- Total violations per 100 words under 3.5

## Why these changes matter to my codebase

- The STE gate runs on every push; keeping synced skills in good shape means they lint cleanly even though they're exempt from the CI gate
- The overlay survives syncs, so these fixes persist even when the upstream emil-skills repo updates at its nightly cadence

## Review cadence

- Re-run `npm run lint:ste` after any Skill content change
- Verify overlays still apply cleanly after `npm run sync`