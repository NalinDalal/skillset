---
name: tdd-workflow
category: engineering
source: ECC (adapted)
description: "Test-driven development with RED/GREEN/REFACTOR cycle, evidence capture, and mutation testing. Load when writing tests or implementing features test-first."
---

# TDD Workflow

**When to use:** Implementing new features, fixing bugs with regression tests, refactoring code with safety nets.

---

## The Cycle

```
RED    → Write a failing test that defines desired behavior
GREEN  → Write minimal code to make the test pass
REFACTOR → Improve code while keeping tests green
```

Repeat. Each cycle should be 5-15 minutes.

---

## Rules

1. **Write the test first.** Before any implementation code, write a test that describes what the code should do.
2. **Watch it fail.** Run the test and confirm it fails for the right reason.
3. **Make it pass.** Write the simplest code that makes the test pass. No extra features.
4. **Refactor.** Clean up the code while keeping all tests green.
5. **Commit.** One commit per green-refactor cycle.

---

## RED Phase

### What to Test
- Expected output for given input
- Edge cases (empty, null, boundary values)
- Error conditions
- Side effects (database writes, API calls, file operations)

### Test Structure
```typescript
// Use AAA pattern: Arrange, Act, Assert
describe('calculateDiscount', () => {
  it('applies percentage discount to subtotal', () => {
    // Arrange
    const subtotal = 100
    const discount = 0.15

    // Act
    const result = calculateDiscount(subtotal, discount)

    // Assert
    expect(result).toBe(85)
  })

  it('throws when discount is negative', () => {
    expect(() => calculateDiscount(100, -0.1)).toThrow('Discount cannot be negative')
  })
})
```

### Test Naming Convention
```
it('should [expected behavior] when [condition]')
```

Examples:
- `it('should return empty array when no items match filter')`
- `it('should throw NotFoundError when user does not exist')`
- `it('should retry 3 times when database connection fails')`

---

## GREEN Phase

### Rules
- Write **only** enough code to make the test pass
- No premature optimization
- No extra features (even if you know you'll need them)
- Hardcoded values are fine if they pass the test

### When Stuck
If the test is too complex to implement in one step:
1. Skip with `it.skip` or `xit`
2. Write a simpler test first
3. Come back to the complex test after simpler ones pass

---

## REFACTOR Phase

### Check Before Refactoring
- [ ] All tests pass
- [ ] No new tests needed for this cycle
- [ ] Code duplication exists to eliminate
- [ ] Function/method too long (> 30 lines)
- [ ] Magic numbers or strings to extract
- [ ] Naming unclear

### Refactoring Patterns
| Pattern | When to Use |
|---------|-------------|
| Extract Function | Function does too many things |
| Extract Variable | Complex expression repeated |
| Rename | Name doesn't reveal intent |
| Move Function | Function belongs elsewhere |
| Replace Temp with Query | Local variable can be a function |

### Refactoring Rules
- One refactoring at a time
- Run tests after each change
- If tests fail, revert immediately

---

## Evidence Capture

After each TDD cycle, capture evidence:

```markdown
## TDD Evidence: calculateDiscount

### RED
- Test: `should apply percentage discount to subtotal`
- File: `lib/pricing.test.ts:15`
- Status: FAIL (function not implemented)

### GREEN
- Implementation: `lib/pricing.ts:8`
- Code: `return subtotal * (1 - discount)`
- Status: PASS

### REFACTOR
- Extract: `validateDiscountRange(discount)` function
- File: `lib/pricing.ts:12`
- Status: PASS (all 14 tests)
```

---

## Git Checkpoints

Commit at each phase transition:

```bash
# After RED (test written, failing)
git add -A && git commit -m "test(pricing): add test for calculateDiscount"

# After GREEN (test passing)
git add -A && git commit -m "feat(pricing): implement calculateDiscount"

# After REFACTOR (code cleaned)
git add -A && git commit -m "refactor(pricing): extract validateDiscountRange"
```

---

## Mutation Testing

Verify your tests catch real bugs:

```bash
# Install Stryker
bun add -d @stryker-mutator/core @stryker-mutator/vitest-runner

# Run mutation testing
npx stryker run

# Good mutation score: > 80%
# Each surviving mutant = a test gap
```

### What Mutation Testing Does
1. Introduces small changes (mutations) to your code
2. Runs your tests against each mutation
3. If tests still pass = surviving mutant = test gap
4. If tests fail = killed mutant = good test coverage

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| Writing tests after code | Tests confirm existing behavior, not desired behavior | Write tests first |
| Testing implementation details | Tests break when refactoring | Test behavior, not implementation |
| Giant test functions | Hard to identify what failed | One assertion per concept |
| Skipping RED phase | No verification that test works | Always watch it fail first |
| Testing everything at once | Hard to isolate failures | One behavior per test |
| No git commits between phases | Can't revert to known-good state | Commit at each transition |

---

## Quick Commands

```bash
# Run tests in watch mode
bun test --watch

# Run specific test file
bun test calculateDiscount.test.ts

# Run with coverage
bun test --coverage

# Run mutation testing
npx stryker run
```

---

## Related Skills

- `devops/testing` - Test patterns and infrastructure
- `engineering/verification-loop` - Pre-PR quality gates
- `engineering/code-review` - Review test quality
