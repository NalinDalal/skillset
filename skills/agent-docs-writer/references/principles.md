# Why README and AGENTS.md are different documents

**README.md** is a *decision* document, for humans and agents alike, at the "should I even engage with this" moment:
- What is this thing, in one paragraph, no marketing fluff
- Why does it exist / what problem does it solve
- Quick-start: how to run it locally in the fewest steps possible
- Where to look next (points at AGENTS.md for contributors/agents, points at docs site if one exists)

README is *not* the place for detailed conventions, glossary, or "how to change things" — that's AGENTS.md's job. A README bloated with contribution rules makes both documents worse: humans skim past the parts they need, agents burn context on things irrelevant to the "should I pull this in" decision.

**AGENTS.md** is an *operating manual* for an agent (or human) about to make changes:
- Assumes the reader already decided to work in this repo
- Front-loads a glossary if the project has non-obvious terminology — an agent that misreads a domain term will confidently make the wrong change
- States non-negotiables explicitly and early — agents (and new contributors) default to generic best practices unless told otherwise; the whole value of this file is the *delta* from generic
- Uses concrete good/bad examples over abstract rules — "write clean code" gives an agent nothing to pattern-match against; a paired example does
- Explains *where* things live and *how* the pieces talk to each other, at the level needed to know which files are safe to touch for a given kind of change
- Can carry a personal, informal "note from the author" section — this is where hard-won context lives that doesn't fit a structured checklist (past incidents, non-obvious tradeoffs, "we tried X, don't")

## Glossary discipline

Only include a glossary if the project actually has overloaded or ambiguous terms. Forcing a glossary onto a project that doesn't need one is noise. Signal that a glossary is needed: the same word is used differently inside this codebase than a newcomer would assume (T3 Code's example: "project" vs "thread" vs "turn" vs "environment" each have precise, non-obvious meanings). Keep each definition to one plain sentence — a glossary written in jargon defeats its own purpose.

## Non-negotiables discipline

Push back (gently) if the user's answer to "what should never be compromised" is generic ("write good code," "follow best practices"). Ask for the specific failure mode it prevents: what happened, or could happen, if this rule is broken? The best non-negotiables read like scar tissue, not aspirations. Aim for 2-5; more than that and nothing stands out as actually non-negotiable.

## Good/bad examples discipline

Every rule that's easy to violate by defaulting to "how you'd normally do it" deserves a paired example: the wrong-by-default approach, and the right one for this repo, with a one-line reason. This is the single highest-leverage section for actually changing agent behavior — agents are much better at pattern-matching against a concrete diff-shaped example than internalizing a prose rule.

## Magic keyword / trigger note

Some AGENTS.md files (and this skill itself) rely on being *discoverable*: a coding agent or a Claude Code session should find and read this file without being told to. If the user's tooling supports it (Claude Code, Cursor, etc. increasingly auto-load AGENTS.md/CLAUDE.md from repo root), no special keyword is needed — the filename convention itself is the trigger. Only add an explicit pointer (e.g. a line in README.md: "Read AGENTS.md before making changes") if the user's tooling doesn't auto-discover it.
