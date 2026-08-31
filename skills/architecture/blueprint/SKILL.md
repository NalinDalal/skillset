---
name: blueprint
category: architecture
source: ECC (adapted)
description: "Multi-PR construction plans with adversarial review. Load when planning complex features or breaking work into steps."
---

# Blueprint

**When to use:** Planning complex features, breaking work into PRs, creating implementation plans with review gates.

---

## What It Does

Turns a one-line objective into a multi-PR construction plan with self-contained step briefs so any agent can execute any step cold.

---

## Process

```
1. Define objective (one line)
2. Research codebase (understand current state)
3. Break into steps (each step = one PR)
4. Adversarial review (strongest model reviews plan)
5. Generate step briefs (self-contained instructions)
6. Execute with checkpoints
```

---

## Step Brief Format

Each step gets a self-contained brief:

```markdown
## Step 3: Add User Authentication

### Objective
Implement JWT-based authentication with refresh tokens.

### Files to Create/Modify
- `packages/core/auth/jwt.ts` (create)
- `packages/core/auth/middleware.ts` (create)
- `apps/http-backend/src/routes/auth.ts` (modify)
- `apps/http-backend/src/middleware/auth.ts` (create)

### Dependencies
- Step 1 (database schema) must be complete
- Step 2 (user model) must be complete

### Implementation Details
1. Create JWT utilities in `packages/core/auth/jwt.ts`
2. Add auth middleware to `apps/http-backend/src/middleware/auth.ts`
3. Create auth routes in `apps/http-backend/src/routes/auth.ts`
4. Protect existing routes with auth middleware

### Verification
- [ ] Unit tests for JWT utilities
- [ ] Integration tests for auth routes
- [ ] Protected routes return 401 without token
- [ ] Refresh token rotation works

### Rollback Plan
- Revert auth middleware changes
- Remove auth routes
- Database schema unchanged (Step 1)
```

---

## Adversarial Review

Before executing, have a stronger model review the plan:

### Review Checklist
- [ ] Are steps in correct order?
- [ ] Are dependencies clear?
- [ ] Are verification criteria specific?
- [ ] Are rollback plans realistic?
- [ ] Is scope appropriate per step?
- [ ] Are there hidden complexity bombs?

### Review Output
```markdown
## Plan Review

### Issues Found
1. Step 3 depends on Step 5 (circular dependency)
   - Fix: Move Step 5 before Step 3

2. Step 4 scope too large (300+ lines)
   - Fix: Split into Step 4a and Step 4b

### Recommendations
- Add performance testing to Step 6
- Consider database migration rollback in Step 1

### Verdict: NEEDS REVISION
```

---

## Plan Mutation Protocol

Plans change. When they do:

### Split
When a step is too large:
```markdown
## Step 4a: User Registration
[original step content]

## Step 4b: User Login
[new step content]
```

### Insert
When new work is discovered:
```markdown
## Step 3.5: Add Email Validation
[inserted step with clear dependency on Step 3]
```

### Skip
When work is no longer needed:
```markdown
## Step 6: ~~Add CSV Export~~ (SKIPPED)
Reason: Feature deprioritized in favor of API access
```

### Reorder
When dependencies change:
```markdown
## Step 5: ~~Add Caching~~ (MOVED to Step 3)
Reason: Performance critical, should be implemented earlier
```

Each mutation gets an audit trail entry.

---

## Branch/PR Workflow

Each step becomes a PR:

```bash
# Step 1
git checkout -b feat/user-schema
# ... implement ...
git commit -m "feat(db): add user schema"
git push -u origin feat/user-schema
gh pr create --base main --title "Step 1: User Schema"

# Step 2
git checkout -b feat/user-model
# ... implement ...
git commit -m "feat(core): add user model"
git push -u origin feat/user-model
gh pr create --base main --title "Step 2: User Model"
```

### PR Naming Convention
```
Step N: [Brief description]
```

Examples:
- `Step 1: User Schema`
- `Step 2: User Model`
- `Step 3: JWT Authentication`
- `Step 4a: User Registration`
- `Step 4b: User Login`

---

## Quick Commands

```bash
# Create new blueprint
echo "## Objective: [one line description]" > blueprint.md

# Review plan
# (use strongest available model)

# Create branch for step
git checkout -b feat/step-N-description

# Create PR
gh pr create --base main --title "Step N: Description"
```

---

## Related Skills

- `nerdev/nerdev-docs` - Design docs and ADRs
- `devops/git-ci` - PR workflow and CI
- `architecture/search-first` - Research before planning
