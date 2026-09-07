---
name: health
version: 1.0.0
description: "Code quality dashboard. Wraps type checker, linter, test runner, dead code detector. Computes a weighted composite score."
triggers:
  - code health check
  - quality dashboard
  - how healthy is codebase
  - health check
  - quality score
---

## When to use

Use when asked for a "health check", "code quality", "how healthy is the codebase", "run all checks", or "quality score".

Do NOT fix any issues. Produce the dashboard and recommendations only.

## Step 1: detect health stack

Auto-detect available tools:

```bash
[ -f tsconfig.json ] && echo "TYPECHECK: tsc --noEmit"
[ -f biome.json ] || [ -f biome.jsonc ] && echo "LINT: biome check ."
ls eslint.config.* .eslintrc.* 2>/dev/null | head -1 && echo "LINT: eslint ."
[ -f .pylintrc ] || [ -f pyproject.toml ] && echo "LINT: ruff check ."
[ -f package.json ] && grep -q '"test"' package.json && echo "TEST: npm test"
[ -f pyproject.toml ] && echo "TEST: pytest"
[ -f Cargo.toml ] && echo "TEST: cargo test"
[ -f go.mod ] && echo "TEST: go test ./..."
command -v knip >/dev/null 2>&1 && echo "DEADCODE: knip"
```

## Step 2: run tools

Run each detected tool sequentially. Record exit code, duration, and last 50 lines of output.

```bash
START=$(date +%s)
{command} 2>&1 | tail -50
EXIT_CODE=$?
END=$(date +%s)
echo "TOOL:{name} EXIT:$EXIT_CODE DURATION:$((END-START))s"
```

## Step 3: score each category

| Category | Weight | 10 | 7 | 4 | 0 |
|-----------|--------|------|-----------|------------|-----------|
| Type check | 22% | Clean (exit 0) | <10 errors | <50 errors | >=50 errors |
| Lint | 18% | Clean (exit 0) | <5 warnings | <20 warnings | >=20 warnings |
| Tests | 28% | All pass (exit 0) | >95% pass | >80% pass | <=80% pass |
| Dead code | 13% | Clean (exit 0) | <5 unused | <20 unused | >=20 unused |
| Shell lint | 9% | Clean (exit 0) | <5 issues | >=5 issues | N/A |

Composite score: `(typecheck * 0.22) + (lint * 0.18) + (test * 0.28) + (deadcode * 0.13) + (shell * 0.09)`

Redistribute weight proportionally for skipped categories.

## Step 4: present dashboard

```
CODE HEALTH DASHBOARD

Project: <project name>
Branch:  <current branch>
Date:    <today>

Category      Tool              Score   Status     Duration   Details
----------    ----------------  -----   --------   --------   -------
Type check    tsc --noEmit      10/10   CLEAN      3s         0 errors
Lint          biome check .      8/10   WARNING    2s         3 warnings
Tests         bun test          10/10   CLEAN      12s        47/47 passed
Dead code     knip               7/10   WARNING    5s         4 unused exports

COMPOSITE SCORE: 9.1 / 10
Duration: 23s total
```

Status labels: 10 = CLEAN, 7-9 = WARNING, 4-6 = NEEDS WORK, 0-3 = CRITICAL.

## Step 5: recommendations

Rank by impact (weight * score deficit). Only show categories below 10.

```
RECOMMENDATIONS (by impact)
1. [HIGH]  Fix 2 failing tests (Tests: 9/10, weight 30%)
2. [MED]   Address 12 lint warnings (Lint: 6/10, weight 20%)
3. [LOW]   Remove 4 unused exports (Dead code: 7/10, weight 15%)
```

## Important rules

1. Run the project's own tools. Don't substitute your own analysis.
2. Read-only. Never fix issues.
3. Skipped is not failed. Redistribute weight for unavailable tools.
4. Show raw output for failures so the user can act without re-running.
