# Curation layer: skills are owned, not copied

Upstream SKILL.md files are a **base**, never the final word. A skill you run
every day should sound like *you*: it should encode how you like this codebase,
how you want things done, and why, not whatever the upstream author happened
to write.

This directory is where that ownership lives. It never gets deleted,
re-cloned, or overwritten by `scripts/sync.mjs`. Upstream can move, and your
voice survives verbatim.

## Layout

```
curations/
  <skill>/
    overlay/          # files copied ON TOP of skills/<skill>/ after every sync
    WHY.md            # your rationale, read by sync output, never shipped
```

- `overlay/` files replace the same-named files in `skills/<skill>/` after each
  re-vendor. Upstream updated the skill's scripts? They still land. Upstream
  rewrote the SKILL.md with someone else's taste? Your `overlay/SKILL.md` wins.
- `WHY.md` is the record of intent: what you changed and why. The first line is
  echoed in sync output so you can see the reason at a glance.
- Files you don't put in `overlay/` track upstream freely. Own what matters,
  let the rest ride.

## How ownership works

1. Make a copy: `mkdir -p curations/<skill>/overlay`
2. Write your version of the files you own into `overlay/` (usually just
   `SKILL.md`).
3. Write `WHY.md` with the real reasons: how you like things, why. This is
   the part that makes it yours; future-you (and future agents) will ask.
4. Run `npm run sync` (or let CI) and the overlay is re-applied after every
   upstream update. `git diff` shows upstream changes and your layer cleanly
   separated.

## How to NOT use it

- Don't hand-edit `skills/<skill>/SKILL.md` directly. The next sync deletes
  the folder and you lose it. That's the sloppiness this layer exists to kill.
- Don't copy a curation wholesale from someone else. The point is your
  judgment about your codebase, not a secondhand opinion.

## Template

See `curations/TEMPLATE/` for a ready-to-fill skeleton:

```
cp -R curations/TEMPLATE curations/<skill>
```