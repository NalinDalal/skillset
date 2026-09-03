---
name: verification-loop
category: engineering
source: ECC (adapted)
description: "6-phase verification system: Build, Type Check, Lint, Test, Security, Review. Load before PRs or after major changes."

# Verification Loop

When to use: before creating PRs, after major changes, before releases, when setting up CI pipelines.

## The 6 Phases

```
1. Build          -> Does it compile?
2. Type Check     -> Are types correct?
3. Lint           -> Does it follow conventions?
4. Test Suite     -> Do tests pass with adequate coverage?
5. Security Scan  -> Are there vulnerabilities?
6. Diff Review    -> Is the change scoped and intentional?
```

Each phase must PASS before proceeding. Any FAIL stops the loop.

## Phase 1: Build

```bash
bun run build
```

What it catches: syntax errors, missing imports, circular dependencies, configuration issues.

Pass criteria: exit code 0, no errors in output, all packages build successfully.

## Phase 2: Type Check

```bash
bun run check-types  # or tsc --noEmit
```

What it catches: type mismatches, missing type annotations, invalid generic usage, null/undefined errors.

Pass criteria: exit code 0, no type errors, strict mode enabled.

## Phase 3: Lint

```bash
bun run lint  # or eslint .
```

What it catches: code style violations, unused variables/imports, forbidden patterns (any, console.log in prod), complexity issues.

Pass criteria: exit code 0, no warnings (warnings = errors), all custom rules pass.

## Phase 4: Test Suite

```bash
bun test --coverage
```

What it catches: regression bugs, missing edge cases, broken contracts, performance regressions.

Pass criteria: all tests pass, coverage thresholds met (lines >= 80%, functions >= 80%, branches >= 70%, statements >= 80%), no flaky tests.

## Phase 5: Security Scan

```bash
# Dependency audit
bun audit --audit-level=high

# Secret detection
grep -r "password\|secret\|token\|key\|api_key" --include="*.ts" --include="*.js" --include="*.env*"

# Input validation check
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" | grep -v "validate\|sanitize\|parse"
```

What it catches: known vulnerabilities in dependencies, hardcoded secrets, missing input validation, dangerous patterns (eval, exec, innerHTML).

Pass criteria: no high/critical vulnerabilities, no hardcoded secrets, all user input validated.

## Phase 6: Diff Review

```bash
# Review changes
git diff main...HEAD --stat

# Check for large files
git diff main...HEAD | grep "^+" | wc -l

# Check for sensitive files
git diff main...HEAD --name-only | grep -E "\.env|secret|password|key"
```

What it catches: out-of-scope changes, large PRs that should be split, sensitive file modifications, missing documentation updates.

Pass criteria: changes match PR description, PR size < 400 lines (ideal), no sensitive files modified, documentation updated if needed.

## Verification Report

After running all phases, generate a report:

```markdown
## Verification Report

Date: 2026-08-13
Branch: feat/add-user-auth
Commit: abc1234

### Results

| Phase | Status | Duration |
|-------|--------|----------|
| Build | PASS | 12s |
| Type Check | PASS | 8s |
| Lint | PASS | 5s |
| Test Suite | PASS | 45s |
| Security Scan | PASS | 3s |
| Diff Review | PASS | 2s |

### Overall: READY TO MERGE

### Coverage Summary
- Lines: 84% (threshold: 80%)
- Functions: 87% (threshold: 80%)
- Branches: 72% (threshold: 70%)
- Statements: 85% (threshold: 80%)

### Notes
- All phases passed
- No security issues found
- PR size: 127 lines (ideal)
```

## Automation

GitHub Actions integration:

```yaml
# .github/workflows/verify.yml
name: Verification Loop

on:
  pull_request:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install --frozen-lockfile

      - name: Phase 1 - Build
        run: bun run build

      - name: Phase 2 - Type Check
        run: bun run check-types

      - name: Phase 3 - Lint
        run: bun run lint

      - name: Phase 4 - Test Suite
        run: bun test --coverage

      - name: Phase 5 - Security Scan
        run: bun audit --audit-level=high

      - name: Phase 6 - Diff Review
        run: |
          LINES=$(git diff main...HEAD --numstat | awk '{added+=$1} END {print added}')
          if [ "$LINES" -gt 800 ]; then
            echo "PR too large: $LINES lines added"
            exit 1
          fi
```

## Quick Commands

```bash
# Run full verification loop
bun run build && bun run check-types && bun run lint && bun test --coverage && bun audit --audit-level=high

# Run specific phase
bun run build
bun run check-types
bun run lint
bun test --coverage
bun audit --audit-level=high

# Generate coverage report
bun test --coverage --reporter=json
```

## Related Skills

- `engineering/tdd-workflow` for test-first development
- `engineering/code-review` for review process
- `devops/git-ci` for CI/CD pipeline setup
