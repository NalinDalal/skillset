---
name: verification-loop
category: engineering
source: ECC (adapted)
description: "6-phase verification system: Build → Type Check → Lint → Test → Security → Review. Load before PRs or after major changes."
---

# Verification Loop

**When to use:** Before creating PRs, after major changes, before releases, when setting up CI pipelines.

---

## The 6 Phases

```
1. Build          → Does it compile?
2. Type Check     → Are types correct?
3. Lint           → Does it follow conventions?
4. Test Suite     → Do tests pass with adequate coverage?
5. Security Scan  → Are there vulnerabilities?
6. Diff Review    → Is the change scoped and intentional?
```

Each phase must PASS before proceeding. Any FAIL stops the loop.

---

## Phase 1: Build

### Command
```bash
bun run build
```

### What It Catches
- Syntax errors
- Missing imports
- Circular dependencies
- Configuration issues

### Pass Criteria
- Exit code 0
- No errors in output
- All packages build successfully

---

## Phase 2: Type Check

### Command
```bash
bun run check-types  # or tsc --noEmit
```

### What It Catches
- Type mismatches
- Missing type annotations
- Invalid generic usage
- Null/undefined errors

### Pass Criteria
- Exit code 0
- No type errors
- Strict mode enabled

---

## Phase 3: Lint

### Command
```bash
bun run lint  # or eslint .
```

### What It Catches
- Code style violations
- Unused variables/imports
- Forbidden patterns (any, console.log in prod)
- Complexity issues

### Pass Criteria
- Exit code 0
- No warnings (warnings = errors)
- All custom rules pass

---

## Phase 4: Test Suite

### Command
```bash
bun test --coverage
```

### What It Catches
- Regression bugs
- Missing edge cases
- Broken contracts
- Performance regressions

### Pass Criteria
- All tests pass
- Coverage thresholds met:
  - Lines: ≥ 80%
  - Functions: ≥ 80%
  - Branches: ≥ 70%
  - Statements: ≥ 80%
- No flaky tests

---

## Phase 5: Security Scan

### Commands
```bash
# Dependency audit
bun audit --audit-level=high

# Secret detection
grep -r "password\|secret\|token\|key\|api_key" --include="*.ts" --include="*.js" --include="*.env*"

# Input validation check
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" | grep -v "validate\|sanitize\|parse"
```

### What It Catches
- Known vulnerabilities in dependencies
- Hardcoded secrets
- Missing input validation
- Dangerous patterns (eval, exec, innerHTML)

### Pass Criteria
- No high/critical vulnerabilities
- No hardcoded secrets
- All user input validated

---

## Phase 6: Diff Review

### Commands
```bash
# Review changes
git diff main...HEAD --stat

# Check for large files
git diff main...HEAD | grep "^+" | wc -l

# Check for sensitive files
git diff main...HEAD --name-only | grep -E "\.env|secret|password|key"
```

### What It Catches
- Out-of-scope changes
- Large PRs that should be split
- Sensitive file modifications
- Missing documentation updates

### Pass Criteria
- Changes match PR description
- PR size < 400 lines (ideal)
- No sensitive files modified
- Documentation updated if needed

---

## Verification Report

After running all phases, generate a report:

```markdown
## Verification Report

**Date:** 2026-08-13
**Branch:** feat/add-user-auth
**Commit:** abc1234

### Results

| Phase | Status | Duration |
|-------|--------|----------|
| Build | ✅ PASS | 12s |
| Type Check | ✅ PASS | 8s |
| Lint | ✅ PASS | 5s |
| Test Suite | ✅ PASS | 45s |
| Security Scan | ✅ PASS | 3s |
| Diff Review | ✅ PASS | 2s |

### Overall: ✅ READY TO MERGE

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

---

## Automation

### GitHub Actions Integration

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

---

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

---

## Related Skills

- `engineering/tdd-workflow` - Test-first development
- `engineering/code-review` - Review process
- `devops/git-ci` - CI/CD pipeline setup
