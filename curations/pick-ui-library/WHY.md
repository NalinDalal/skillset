# WHY.md: pick-ui-library overlay

First line is echoed by `npm run sync`. Write it like a note to future-you.

## What I changed

- Replaced em dashes (—) with double hyphens (--) throughout
- Replaced "provide" with "give" to pass the banned word check
- tightened long sentences and paragraphs to lower the violation density

## How I like things

- Zero em dashes in Skill MD files
- No banned words (from the STE BANNED list)
- Total violations per 100 words under 3.0

## Why these changes matter to my codebase

- The STE gate runs on every push; keeping owned and synced skills clean prevents surprises
- The overlay survives syncs, so these fixes persist even when the upstream emil-skills repo updates

## Review cadence

- Re-run `npm run lint:ste` after any Skill content change
- Verify overlays still apply cleanly after `npm run sync`