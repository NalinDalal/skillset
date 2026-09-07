---
name: context-save
version: 1.0.0
description: "Save working context so any future session can pick up without losing a beat."
triggers:
  - save progress
  - save state
  - save my work
  - context save
---

## When to use

Use when asked to "save progress", "save state", "context save", or "save my work". Pair with /context-restore to resume later.

Do NOT implement code changes. This skill captures state only.

## Save flow

### Step 1: gather state

```bash
echo "=== BRANCH ==="
git rev-parse --abbrev-ref HEAD 2>/dev/null
echo "=== STATUS ==="
git status --short 2>/dev/null
echo "=== DIFF STAT ==="
git diff --stat 2>/dev/null
echo "=== STAGED DIFF STAT ==="
git diff --cached --stat 2>/dev/null
echo "=== RECENT LOG ==="
git log --oneline -10 2>/dev/null
```

### Step 2: summarize context

Using the gathered state plus conversation history, write a summary covering:

1. What's being worked on.
2. Decisions made. Architectural choices, trade-offs, approaches chosen and why.
3. Remaining work. Concrete next steps, in priority order.
4. Notes. Gotchas, blocked items, open questions, things tried that didn't work.

### Step 3: write the file

```bash
CONTEXT_DIR=".opencode/contexts"
mkdir -p "$CONTEXT_DIR"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
FILE="$CONTEXT_DIR/${TIMESTAMP}-context.md"
```

File format:

```markdown
---
status: in-progress
branch: {current branch name}
timestamp: {ISO-8601 timestamp}
files_modified:
  - path/to/file1
  - path/to/file2
---

## Working on: {title}

### Summary
{1-3 sentences about the goal and current progress}

### Decisions Made
{Bulleted list of choices and reasoning}

### Remaining Work
{Numbered list of next steps}

### Notes
{Gotchas, blocked items, open questions}
```

After writing, confirm:

```
CONTEXT SAVED
Title:    {title}
Branch:   {branch}
File:     {path}
Modified: {N} files

Restore later with /context-restore.
```

## Important rules

- Never modify code. Read state and write the context file only.
- Always include the branch name. It matters for cross-branch restore.
- Saved files are append-only. Never overwrite existing files.
