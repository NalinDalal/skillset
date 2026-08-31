# Why README and AGENTS.md are different documents

**README.md** is a *decision* document, for humans and agents alike, at
the "should I even engage with this" moment:
- What this thing is, in one paragraph, no marketing fluff
- Why it exists, and what problem it solves
- Quick start: how to run it locally in the fewest steps possible
- Where to look next (points at AGENTS.md for contributors and agents,
  points at the docs site if one exists)

README is *not* the place for detailed conventions, glossary, or "how
to change things". That is AGENTS.md's job. A README bloated with
contribution rules makes both documents worse. Humans skim past the
parts they need. Agents burn context on things irrelevant to the
"should I pull this in" decision.

**AGENTS.md** is an *operating manual* for an agent (or human) about
to make changes:
- Assumes the reader already decided to work in this repo
- Front-loads a glossary if the project has non-obvious terminology. An
  agent that misreads a domain term will confidently make the wrong
  change
- States non-negotiables explicitly and early. Agents and new
  contributors default to generic best practices unless told otherwise.
  The whole value of this file is the *delta* from generic
- Uses concrete good/bad examples over abstract rules. "Write clean
  code" gives an agent nothing to pattern-match against. A paired
  example does
- Explains *where* things live and *how* the pieces talk to each other,
  at the level needed to know which files are safe to touch for a given
  kind of change
- Can carry a personal, informal "note from the author" section. This
  is where hard-won context lives that does not fit a structured
  checklist (past incidents, non-obvious tradeoffs, "we tried X, don't")

## Glossary discipline

Only include a glossary if the project actually has overloaded or
ambiguous terms. Forcing a glossary onto a project that does not need
one is noise. Signal that a glossary is needed: one word carries
different meanings inside this codebase than a newcomer would assume (T3
Code's example: "project" vs "thread" vs "turn" vs "environment" each
have precise, non-obvious meanings). Keep each definition to one plain
sentence. A glossary written in jargon defeats its own purpose.

## Non-negotiables discipline

Push back (gently) if the user's answer to "what must never be
compromised" is generic ("write good code", "follow best practices").
Ask for the specific failure mode it prevents: what happened, or could
happen, when someone breaks this rule? The best non-negotiables read like scar
tissue, not aspirations. Aim for 2 to 5. More than that and nothing
stands out as actually non-negotiable.

## Good/bad examples discipline

Every rule that is easy to violate by defaulting to "how you would
normally do it" deserves a paired example. Show the wrong-by-default
approach and the right one for this repo, with a one-line reason. This
is the single highest-impact section for actually changing agent
behavior. Agents are much better at pattern-matching against a concrete
diff-shaped example than internalizing a prose rule.

## Magic keyword / trigger note

Some AGENTS.md files (and this skill itself) rely on being
*discoverable*: a coding agent or a Claude Code session must be able to
find and read this file without being told to. If the user's tooling
supports it (Claude Code, Cursor, etc. increasingly auto-load
AGENTS.md/CLAUDE.md from repo root), you need no special keyword. The
filename convention itself is the trigger. Only add an explicit pointer
(e.g. a line in README.md: "Read AGENTS.md before making changes") if
the user's tooling does not auto-discover it.