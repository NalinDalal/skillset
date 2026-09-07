---
name: context-restore
version: 1.0.0
description: "Restore working context saved earlier by /context-save."
triggers:
  - resume where i left off
  - restore context
  - where was i
  - pick up where i left off
  - context restore
---

## When to use

Use when asked to "resume", "restore context", "where was I", or "pick up where I left off". Pair with /context-save.

Do NOT implement code changes. This skill reads saved context files only.

## Restore flow

### Step 1: find saved contexts

```bash
CONTEXT_DIR=".opencode/contexts"
if [ ! -d "$CONTEXT_DIR" ]; then
  echo "NO_CONTEXTS"
else
  find "$CONTEXT_DIR" -maxdepth 1 -name "*.md" -type f 2>/dev/null | sort -r | head -20
fi
```

### Step 2: load the right file

If the user specified a title fragment or number, find the matching file. Otherwise load the most recent one.

Read the file and present:

```
RESUMING CONTEXT
Title:       {title}
Branch:      {branch}
Saved:       {timestamp}
Status:      {status}

### Summary
{summary from saved file}

### Remaining Work
{remaining work items}

### Notes
{notes}
```

If the current branch differs from the saved context's branch, note it.

### Step 3: offer next steps

Ask: continue working, show full file, or just needed context.

## If no saved contexts exist

"No saved contexts yet. Run `/context-save` first to save your current working state."

## Important rules

- Never modify code. Read saved files and present them only.
- Prefer the current branch's checkpoint, but keep all branches as fallback.
- "Most recent" means filename prefix (YYYYMMDD-HHMMSS), not filesystem mtime.
