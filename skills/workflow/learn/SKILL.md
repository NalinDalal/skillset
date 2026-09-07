---
name: learn
version: 1.0.0
description: "Manage project learnings. Review, search, prune, and export patterns across sessions."
triggers:
  - show learnings
  - what have we learned
  - manage project learnings
  - learn
---

## When to use

Use when asked to "what have we learned", "show learnings", "prune stale learnings", or "export learnings".

Proactively suggest when the user asks about past patterns or wonders "didn't we fix this before?"

Do NOT implement code changes. This skill manages learnings only.

## Commands

- `/learn` shows recent learnings.
- `/learn search <query>` searches them.
- `/learn prune` checks for stale or contradictory entries.
- `/learn export` formats them as markdown.
- `/learn add` lets you add one manually.

## Show recent

Show the most recent 20 learnings:

```bash
LEARN_FILE=".opencode/learnings.jsonl"
if [ -f "$LEARN_FILE" ]; then
  tail -20 "$LEARN_FILE"
else
  echo "No learnings yet."
fi
```

Present in a readable format grouped by type: pattern, pitfall, preference, architecture.

## Search

```bash
grep -i "QUERY" .opencode/learnings.jsonl 2>/dev/null | tail -20
```

## Prune

Load all learnings and check for:
1. Stale references. If a learning references files that no longer exist.
2. Contradictions. Same key with different insights.

Present each flagged entry and ask: remove, keep, or update.

## Export

Format learnings as markdown:

```markdown
## Project Learnings

### Patterns
- **[key]**: [insight] (confidence: N/10)

### Pitfalls
- **[key]**: [insight] (confidence: N/10)

### Preferences
- **[key]**: [insight]

### Architecture
- **[key]**: [insight] (confidence: N/10)
```

## Manual add

Ask the user for: type (pattern, pitfall, preference, architecture, tool), a short key (2-5 words, kebab-case), the insight (one sentence), and confidence (1-10).

Then log it:

```bash
mkdir -p .opencode
echo '{"type":"TYPE","key":"KEY","insight":"INSIGHT","confidence":N,"source":"user-stated","ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}' >> .opencode/learnings.jsonl
```

## Automatic logging

After completing any skill, review the session for durable learnings and log each one. A durable learning is a project quirk, command fix, pitfall, or pattern that would save 5+ minutes in a future session. If none, say "No durable learnings this session."

```bash
mkdir -p .opencode
echo '{"type":"operational","key":"SHORT_KEY","insight":"DESCRIPTION","confidence":N,"source":"observed","ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}' >> .opencode/learnings.jsonl
```
