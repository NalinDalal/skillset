---
name: git-ci
description: Git workflow conventions, conventional commits, branching strategy, PR workflow, GitHub Actions CI/CD, release automation, semantic versioning. Load when setting up repo, configuring CI, or automating releases.
---
# Git & CI , Conventions, Workflow, Automation

**When to use:** New repo setup, CI configuration, release automation, PR workflow, commit standards.

---

## Git Conventions

### Branching Strategy (Trunk-Based)
```
main (protected)
  │
  ├── feature/short-description    # Short-lived, < 2 days
  ├── fix/short-description        # Bug fixes
  ├── chore/short-description      # Maintenance, deps, config
  └── release/v1.2.0               # Release preparation (rare)
```
- **Main is always deployable**
- **No long-lived feature branches** , merge daily
- **Feature flags** for incomplete work
- **Delete branches after merge**

### Commit Messages (Conventional Commits)
```
<type>(<scope>): <subject>

<body>

<footer>
```
| Type | Use For |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change, no behavior change |
| `perf` | Performance improvement |
| `test` | Adding/updating tests |
| `chore` | Maintenance, deps, config |
| `ci` | CI/CD changes |
| `build` | Build system, deps |
| `revert` | Reverts previous commit |

**Examples:**
```
feat(auth): add OAuth2 Google provider

fix(api): handle null user in getCurrentUser

chore(deps): update typescript to 5.4

ci: add playwright e2e workflow

BREAKING CHANGE: remove deprecated /api/v1 endpoints
```
### Scope Guidelines
- Use package/app name: `feat(frontend):`, `fix(api):`, `chore(db):`
- For monorepo: `feat(ui):`, `feat(common):`, `feat(http-backend):`

---

## PR Workflow

### Branch Protection (Required)
```yaml
# .github/branch-protection.yml (via settings or API)
protection_rules:
  - pattern: main
    required_reviews: 1
    dismiss_stale_reviews: true
    require_code_owner_reviews: true
    required_status_checks:
      - typecheck
      - lint
      - test
      - build
    enforce_admins: true
    allow_force_pushes: false
    allow_deletions: false
```
### PR Template
```markdown
<!-- .github/pull_request_template.md -->
## Summary
Brief description of changes.

## Type
- [ ] feat
- [ ] fix
- [ ] chore
- [ ] docs
- [ ] refactor
- [ ] test

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing done (describe)

## Checklist
- [ ] Self-reviewed
- [ ] No console.log/debugger
- [ ] Types strict (no `any`)
- [ ] Dark mode works
- [ ] Reduced motion works
- [ ] Accessibility checked
- [ ] Updated docs if needed

## Screenshots (UI changes)
| Before | After |
|--------|-------|
|        |       |
```
### PR Size Guidelines
- **< 400 lines changed** , Ideal
- **400-800** , Needs strong justification
- **> 800** , Split into multiple PRs

---

## GitHub Actions CI

### Standard Workflow
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'
  BUN_VERSION: '1.1'

jobs:
  typecheck:
    name: Typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: ${{ env.BUN_VERSION }}
      - run: bun install --frozen-lockfile
      - run: bun run check-types

  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: ${{ env.BUN_VERSION }}
      - run: bun install --frozen-lockfile
      - run: bun run lint

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: ${{ env.BUN_VERSION }}
      - run: bun install --frozen-lockfile
      - run: bun run test
      - run: bun run test:coverage

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [typecheck, lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: ${{ env.BUN_VERSION }}
      - run: bun install --frozen-lockfile
      - run: bun run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: |
            apps/frontend/dist
            apps/http-backend/dist
            apps/ws-backend/dist
          retention-days: 1
```
### Monorepo Turbo Pipeline
```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"],
      "cache": true
    },
    "lint": {
      "outputs": [],
      "cache": true
    },
    "check-types": {
      "outputs": [],
      "cache": true
    },
    "test": {
      "outputs": ["coverage/**"],
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "db:generate": {
      "outputs": ["node_modules/.prisma/client/**"],
      "cache": true
    },
    "db:migrate": {
      "cache": false
    },
    "db:seed": {
      "cache": false
    }
  },
  "globalEnv": ["DATABASE_URL", "NODE_ENV"]
}
```
---

## Release Automation

### Semantic Release
```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

permissions:
  contents: write
  issues: write
  pull-requests: write

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: oven-sh/setup-bun@v1
      - run: bun install --frozen-lockfile
      - run: bun run build
      - uses: google-github-actions/release-please-action@v4
        with:
          release-type: node
          package-name: my-package
          changelog-types: '[{"type":"feat","section":"Features"},{"type":"fix","section":"Bug Fixes"},{"type":"perf","section":"Performance"},{"type":"refactor","section":"Refactors"},{"type":"docs","section":"Documentation"},{"type":"chore","section":"Chores"}]'
```
### Version Bump Script
```json
// package.json
{
  "scripts": {
    "version:patch": "npm version patch --no-git-tag-version && git add package.json && git commit -m \"chore: version bump\"",
    "version:minor": "npm version minor --no-git-tag-version && git add package.json && git commit -m \"chore: version bump\"",
    "version:major": "npm version major --no-git-tag-version && git add package.json && git commit -m \"chore: version bump\"",
    "release": "bun run build && git push && git push --tags"
  }
}
```
---

## Git Hooks (Husky + lint-staged)
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css,html}": ["prettier --write"]
  }
}
```

```bash
# Commitlint config
# commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', 'camelCase'],
    'subject-case': [2, 'always', 'sentence-case'],
    'header-max-length': [2, 'always', 100],
  },
}
```
---

## Dependabot / Renovate
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    groups:
      dev-deps:
        patterns: ["*"]
        dependency-type: "development"
      prod-deps:
        patterns: ["*"]
        dependency-type: "production"
    labels: ["dependencies"]
    reviewers: ["team-leads"]
    assignees: ["bot-maintainer"]
```
---

## Required Checks Summary

| Check | Tool | Required |
|-------|------|----------|
| TypeScript | `tsc --noEmit` | ✅ |
| ESLint | `eslint .` | ✅ |
| Prettier | `prettier --check .` | ✅ |
| Unit Tests | `bun test` | ✅ |
| Coverage | `bun test --coverage` | ≥80% |
| Build | `bun run build` | ✅ |
| Bundle Size | `bundlesize` | Optional |

---

## Quick Commands
```bash
# New feature
git checkout -b feat/short-description

# Commit
git add -A && git commit -m "feat(scope): description"

# PR
gh pr create --fill --base main

# Release (after merge to main)
git pull origin main && npm version patch && git push && git push --tags

# Hotfix
git checkout -b fix/urgent-bug main
# ... fix ...
git commit -m "fix(scope): urgent fix"
gh pr create --base main --title "fix: urgent fix"
```
---

## Related Skills
- `nerdev-monorepo` , Turborepo structure
- `deployments` , Production deployment
- `testing` , Test patterns