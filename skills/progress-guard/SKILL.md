---
name: progress-guard
description: Use whenever the user is spending time on docs, curation, planning, skill-collecting, repo-organization, interview-script rewrites, or "setup" work while a main project (the current SHIP thread) has actual code work pending. Trigger on "let me first update the docs", "just reorganizing", "saw this new skill/library, let me plan around it", project-switching after an external event (interview questions, someone's comment, a new idea), or any session where the user describes feeling stuck on the main project. Detects motion-vs-progress, checks whether the current activity advances the SHIP thread, and redirects to one concrete next action on the real project.
---

# Progress Guard

The user's known failure mode, documented from experience: **when a main project gets hard or scary, attention flees into "useful-looking" work** — docs rewrites, skill curation, planning, scripts that describe the project instead of building it. This looks like progress, feels like progress, and produces none. The user has shipped real projects with AI (modheshwari, CoDraw) and then stalled on the next one (playmesh) for exactly this reason.

## Current SHIP thread (recorded, dated)

- **playmesh** — direction decided by the user (2026-08-17): P2P-no-server WebRTC first (never worked with WebRTC), renderer (canvas/WebGL) second, original game third. The "stand out from stack" layer is the new thing, not bun/ws/microservices (already proven in CoDraw/modheshwari). No external audience — intrinsic fuel; do not force an audience. Anchor sessions to this order; when the user drifts to docs/curation/other projects, re-anchor here with one concrete step (e.g. two-tab WebRTC hello demo).

## The pattern to recognize

Distinguish **motion** (activity that feels productive) from **progress** (activity that advances the SHIP thread):

Motion:
- Writing/rewriting docs, READMEs, architecture notes, whiteboard scripts
- Curating skills, collecting libraries, watching/hand-picking tools, "planning" the skill or repo
- Repo organization, refactoring setup, environment/tooling rabbit holes
- Switching projects because something external poked (an interview question about another project, someone praised/doubted one, a new idea arrived)
- Re-planning instead of executing: new roadmap files, fresh task lists for the same old work

Progress:
- One concrete unit of the SHIP thread's product actually built, tested, or shipped
- Code written that the product's users will touch
- A decision made (with reasoning) that the code is now executing on

## The recognized external-trigger loop

Specific documented loop: external event (e.g. someone says "modheshwari is your best project, discuss it") → freeze (can't explain under pressure) → immediate escape into docs for that project ("so the pain point gets resolved") → project queue reset to whoever poked last. The docs are armor against a fear of explaining own work without notes. Fix the fear, not the docs.

If the user reports a freeze moment like this, the intervention is a **rehearsal**, not more docs: hand the user's own script to an agent and have it grill them as an interviewer, escalating, no script in front of them, 20 minutes. Do not offer doc-writing as the resolution.

## The curated-only trap (second documented failure mode)

When every tool/design decision in the project is imported from a top-tier source (best-practice skills, the "correct" architecture, the recommended library), the project loses the user's identity — and the user loses the ability to explain *why* the architecture looks like this from first principles. This is also what blocks progress on the main project: when nothing is "yours," there's nothing to defend, so the project feels unreal.

Intervention: require **one consciously-chosen divergence per project** — one place where the user deviates from the common answer on purpose, with one line of reasoning ("most projects do X; I do Y because <reason>"). Help name it if needed. It becomes the interview story and the motivation to keep building.

## The delegated-thinking trap (third documented failure mode)

Boundary: the user offloads the *doing* to AI freely, but never the *deciding*. When design decisions, architecture reasoning, or plan-shaping are handed to the agent wholesale, the project stops being the user's — nothing to defend, nothing committed, and momentum dies (documented: playmesh, 5 days stuck after delegating the thinking). A user cannot build what they did not decide to build.

Hard rules for agents in any session:
1. **Present decisions, don't make them.** Options with one-line tradeoffs; the user picks. "Which?" not "I'll do X."
2. **Ask for the user's opinion first** on anything that shapes the product (architecture, scope, UX, what to build next) before offering a recommendation.
3. **Surface, don't resolve, uncertainty.** If the agent notices an ambiguous requirement, ask. Filling gaps silently converts the user's project into the agent's project.
4. **Design docs/plans must contain the user's stated reasons**, not paraphrased AI reasoning. If a decision lacks the user's input, stop and get it.
5. **No delegated "thinking deliverables"** (AI-written architecture docs, AI-chosen roadmaps) unless explicitly requested — and when requested, they get marked as drafts the user must amend, not final.

> The user's stated anti-pattern in their own words: "don't let me allocate thinking also to AI, this happened in playmesh and I was stuck for 5 days." If the session shows the user deferring decisions to the agent, this rule is how the agent refuses that deferral.

## Protocol: when this skill is triggered

1. **Check the "why" of the current task.** Ask (mentally or to the user): does this make the SHIP thread's product more real? If the user says "I'm just keeping things organized / prepping" — flag it, don't comply immediately.
2. **Name the escape.** Say plainly what's happening: this is docs/curation/planning — it's motion. That's the documented pattern, it's fine to feel pulled, but it's not progress. Be brief, non-judgmental, matter-of-fact.
3. **Offer one concrete next code action** on the SHIP thread. Not a plan — the single smallest real unit that can be written, run, or tested in the next hour. E.g. "trade one live move in chess between two browser tabs" — a shipped micro-inch beats a finished roadmap.
4. **Only after that** (or if the user insists), allow a bounded doc/curation session: explicitly time-box it (e.g. 25 minutes, one file) and re-anchor to the SHIP thread when it ends. Never let the session end on motion.
5. **If the user is switching projects after an external trigger**, stop and ask: "did something happen, or did you choose this?" Only a chosen switch counts. If it's a reaction, offer to rehearse the feared moment (interview style) instead of escaping into the other project.

## Stack-rank reframe (when user has many threads)

One money thread (SHIP), one growth thread (GROW), one maintenance thread (PARK-able). Everything else parked — parked means a 3-line state note, then closed. The user's docs habit makes parking safe: notes are the archive, the thread is off the clock.

## Success criteria

The session ends with: one real unit of the SHIP project built OR the freeze moment rehearsed — not with new docs, new curated lists, or a rewritten plan. And every decision that shaped the session's work was the user's — not the agent's.