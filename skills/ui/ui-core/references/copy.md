# Copy and UX writing

Banning em dashes and Lorem Ipsum isn't a copy standard, it's two
prohibitions. This is the standard.

## Voice and mood

- CTAs and instructions: imperative mood. "Save changes", "Add member"
  — not "You can save your changes" or "Saving changes".
- Sentence case for everything: buttons, headings, labels, menu items.
  Title Case only for proper nouns. No ALL CAPS except the eyebrow
  style already defined in system.md (11px uppercase tracking).
- One register for the whole product: pick plain-and-direct or
  warm-and-conversational, not both. A confirm dialog that says
  "Oops! Something went sideways" next to a button that says
  "Terminate session" is two products.

## CTAs and labels

- Verb + object, specific to the action: "Delete project", not
  "Delete" alone when ambiguous, not "Yes" for a destructive confirm.
- Never label a button with what it is ("Submit button") — label it
  with what happens ("Create account").
- Max ~3 words for standard actions, but never truncate to
  ambiguity — "Send" beats "Send inv." every time; fix the button width
  instead.

## Error messages

Structure: what happened + what to do. Both parts, every time.

- Bad: "Error." / "Something went wrong." / "Invalid input."
- Good: "Couldn't save — check your connection and try again."
  "Email already in use — sign in instead or use a different address."
- Name the field for form errors: "Password must be 8+ characters",
  not "Invalid field" pointing vaguely at the form.
- Never expose raw technical detail (stack traces, status codes) in
  user-facing copy. Log it; show the human version. A "Show details"
  disclosure is fine for power users, collapsed by default.
- Recovery action is a real next step (retry button, link to fix,
  contact support) — not just restating the problem.

## Label brevity

- Form labels: 1-3 words, no trailing colon, no "Please enter your...".
  "Email" not "Please enter your email address:".
- Nav items: single words or short noun phrases, consistent part of
  speech across the set (all nouns, not "Dashboard / Analyzing / Team").
- Tooltips and hints: one short sentence. If it needs two, it's not a
  tooltip, it's a help panel.

## Micro-copy tone

- Empty states: say what the user can do next (system.md already sets
  this), in one line, imperative — "Add your first project" not
  "No projects yet." alone.
- Success confirmations: quiet and brief. A saved indicator or a toast
  under ~6 words. Save the words for things that need them.
- Placeholders inside inputs show a format example, never the label
  itself (no placeholder-as-label, per system.md) — "you@company.com",
  not "Email".
- Loading copy, if any text is shown at all beyond a skeleton: describe
  what's happening, not a generic "Loading...". Prefer no text over a
  spinner-plus-vague-label when the skeleton already communicates it.

## Verify additions

Add to the Phase 5 gate: every error state has a what-happened and a
what-to-do [dom], one copy register audited across the full page
[code], no placeholder-as-label anywhere [dom].
