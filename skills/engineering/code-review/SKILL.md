---
name: code-review
category: engineering
source: ECC (adapted)
description: "Confidence-weighted code review with false-positive suppression. Load when reviewing code or setting up review processes."

# Code Review

When to use: reviewing PRs, setting up review processes, establishing quality standards.

## Review Checklist

### CRITICAL (Block merge)

| Check | What to Look For |
|-------|------------------|
| Security vulnerabilities | SQL injection, XSS, CSRF, secrets in code |
| Data loss risks | Missing error handling, unbounded operations |
| Race conditions | Shared state without synchronization |
| Authentication/Authorization bypass | Missing auth checks, broken access control |

### HIGH (Request changes)

| Check | What to Look For |
|-------|------------------|
| Breaking changes | API contract violations, schema changes |
| Performance regression | O(n²) loops, N+1 queries, missing indexes |
| Missing tests | New features without tests, bug fixes without regression tests |
| Error handling | Swallowed errors, unclear error messages |

### MEDIUM (Suggest improvements)

| Check | What to Look For |
|-------|------------------|
| Code duplication | Same logic in 3+ places |
| Long functions | > 50 lines, multiple responsibilities |
| Complex conditionals | Nested if/else, unclear logic |
| Missing documentation | Public APIs without JSDoc |

### LOW (Optional, don't block)

| Check | What to Look For |
|-------|------------------|
| Naming improvements | Unclear variable/function names |
| Minor refactoring | Small optimizations |
| Style consistency | Inconsistent patterns |

## Confidence Weighting

Each issue gets a confidence score (0.0 - 1.0):

| Score | Meaning | Action |
|-------|---------|--------|
| 0.9 - 1.0 | Definite bug or violation | Block merge |
| 0.7 - 0.8 | Likely problem | Request changes |
| 0.5 - 0.6 | Possible issue | Suggest improvement |
| 0.3 - 0.4 | Uncertain | Comment, don't block |
| 0.0 - 0.2 | Probably fine | Skip |

Confidence rules:
- Never report issues below 0.5 confidence unless you can cite exact line and failure mode.
- Suppress common LLM review noise: "consider adding error handling" on already-handled paths, "might be slow" without benchmarks, "could be more readable" without specific suggestions.
- Require concrete evidence: line numbers, error messages, test cases that would fail.

## Pre-Report Gate

Before reporting any issue, verify you can cite the exact line number, describe the concrete failure mode, explain why it would cause a problem in production, and confirm it is a real issue rather than a style preference. If any answer is "no", don't report it.

## Verdict System

| Verdict | Meaning | When to Use |
|---------|---------|-------------|
| APPROVE | Ready to merge | No critical/high issues, medium/low are optional |
| WARNING | Merge with caution | Medium issues exist but no blockers |
| BLOCK | Cannot merge | Critical or high issues present |

## Review Template

```markdown
## Code Review: [PR Title]

### Summary
[1-2 sentence overview of changes]

### Verdict: [APPROVE/WARNING/BLOCK]

### Issues Found

#### CRITICAL
[None or list with line citations]

#### HIGH
[None or list with line citations]

#### MEDIUM
[None or list with suggestions]

#### LOW
[None or list with optional improvements]

### Positives
[What was done well - always include at least one]

### Testing
- [ ] Tests pass
- [ ] Coverage maintained/improved
- [ ] Edge cases covered
```

## False-Positive Suppression

Skip these common noise patterns:
- "Consider adding error handling" on already-handled paths
- "This might be slow" without benchmarks
- "Could be more readable" without specific suggestion
- "Consider using X library" when current solution works
- "This is a code smell" without concrete impact
- "Should use const" when let is intentional

Focus on: concrete bugs with reproduction steps, performance issues with measurements, security issues with attack vectors, maintainability issues with specific refactoring suggestions.

## Review Scope

Review: logic correctness, error handling, security implications, performance impact, test coverage, API contract changes, breaking changes.

Don't review: personal style preferences, trivial formatting (let the linter handle it), library choices (unless there's a security/performance concern), variable naming (unless truly confusing).

## Quick Commands

```bash
gh pr diff <pr-number>
gh pr checkout <pr-number>
bun test
grep -r "password\|secret\|token\|key" --include="*.ts" --include="*.js"
```

## Related Skills

- `engineering/tdd-workflow` for test quality standards
- `engineering/verification-loop` for pre-PR quality gates
- `backend/security` for security review patterns
