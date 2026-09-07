---
name: ship
version: 1.0.0
description: "Ship workflow: detect base branch, run tests, review diff, commit, push, create PR."
triggers:
  - ship it
  - create a pr
  - push to main
  - deploy this
  - let's ship
---

## When to use

Use when asked to "ship", "deploy", "push to main", "create a PR", or "get it deployed".

Proactively suggest when the user says code is ready or asks about deploying.

## Voice

- Lead with the point. Be concrete.
- Sound like a builder talking to a builder.
- No em dashes. No AI vocabulary.
- Bounded closer: what changed, what was skipped, what to watch.

## Step 0: detect platform and base branch

```bash
git remote get-url origin 2>/dev/null
```

GitHub: `gh pr view --json baseRefName -q .baseRefName` or `gh repo view --json defaultBranchRef -q .defaultBranchRef.name`.

GitLab: `glab mr view -F json 2>/dev/null` or `glab repo view -F json 2>/dev/null`.

Fallback: `git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's|refs/remotes/origin/||'`, then `main`, then `master`.

## Step 1: pre-flight

1. Check the current branch. If on the base branch, abort. "You're on the base branch. Ship from a feature branch."
2. Run `git status`. Uncommitted changes are always included.
3. Run `git diff <base>...HEAD --stat` and `git log <base>..HEAD --oneline`.

## Step 2: run tests

Detect and run the project's test suite:

```bash
[ -f package.json ] && npm test 2>&1
[ -f pyproject.toml ] && python -m pytest 2>&1
[ -f setup.py ] && python -m pytest 2>&1
[ -f go.mod ] && go test ./... 2>&1
[ -f Cargo.toml ] && cargo test 2>&1
```

If tests fail, report the failures and ask whether to proceed or fix first.

## Step 3: review diff

Read the diff and check for:
- Obvious bugs (null checks, error handling, edge cases)
- Hardcoded secrets or credentials
- Files that shouldn't be committed (build artifacts, .env, node_modules)
- Missing tests for new functionality

Auto-fix obvious issues. Flag ambiguous ones for the user.

## Step 4: commit

Stage changes and commit with a descriptive message:

```bash
git add -A
git commit -m "{type}: {description}"
```

Use conventional commit format: feat, fix, refactor, docs, test, chore.

## Step 5: push

```bash
git push origin {branch}
```

## Step 6: create PR

```bash
gh pr create --base {base} --title "{title}" --body "{description}"
```

PR body should include what changed, why it changed, how to test it, and any breaking changes.

## Completion

Report the PR URL, number of files changed, and any concerns.
