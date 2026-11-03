# Credits

These 13 skills are an owned port of the ACX GTM Terminal, from
riddhimaaan/acx-gtm-terminal at commit c873d14 (upstream main, 2026-10-13).
They run as a family: each reads the member's `ACX/my-business.md`, and
`start` routes to the rest.

Differences from the pinned upstream copy: five files reworded from Claude
chat-app connector instructions to OpenCode MCP wording (`start/SKILL.md`,
`onboarding/SKILL.md`, `onboarding/references/tools.md`,
`signal-watcher/SKILL.md`, `signal-watcher/references/google-sheet.md`).
The cold-email skill in `business/cold-email` is original to this repo, not
part of the upstream terminal.

Each folder carries its own MIT license where upstream shipped one. The wide
source set (market-gap-finder, kai-cmo-harness, LeadMagic gtm-skills, claude-
persona, zarif gtm-skills, wondelai skills, RohitWaghire Deep-Market-Reasearch)
is credited per skill in the fork notes at the top of each SKILL.md, and the
license texts live in the upstream repo at `_licences/`.

Runtime plumbing is machine-local and lives outside this repo: the business
record at `~/ACX/my-business.md`, plus the global
`~/.config/opencode/opencode.jsonc` file, which points `skills.paths` at
this folder, carries the `instructions` entry for the business record, and
defines the `/acx:*` command templates.
