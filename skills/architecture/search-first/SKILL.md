---
name: search-first
category: architecture
source: ECC (adapted)
description: "Research-before-coding workflow. Load before implementing new features to find existing solutions."

# Search First

Load before implementing any new feature, adding dependencies, or solving a problem that might already have a solution.

## Decision Matrix

| Option | When to use | Effort | Risk |
|--------|-------------|--------|------|
| Adopt | Existing library does exactly what you need | Low | Low |
| Extend | Existing library does 80% of what you need | Medium | Medium |
| Compose | Multiple small libraries can be combined | Medium | Low |
| Build | No existing solution fits, or you need full control | High | High |

## Search Process

### 1. Define Requirements

Before searching, clarify what you need, the constraints, and the acceptance criteria.

### 2. Search Existing Solutions

#### npm/PyPI

```bash
npm search [keyword]
npm info [package-name]
npm info [package-name] | grep "weekly"
npm info [package-name] | grep "modified"
```

#### MCP Servers

Check MCP registry or community lists.

#### GitHub

```bash
gh search repos [keyword] --sort stars --limit 10
gh api repos/[owner]/[repo] | jq '.pushed_at, .stargazers_count'
```

#### Existing Skills

```bash
ls skills/ | grep [keyword]
grep -r "description:" skills/*/SKILL.md | grep [keyword]
```

### 3. Evaluate Candidates

For each candidate, check:

| Criteria | How to check |
|----------|--------------|
| Maintenance | Last commit date, open issues, release frequency |
| Popularity | Weekly downloads, GitHub stars, community size |
| Quality | TypeScript support, test coverage, documentation |
| Bundle Size | Impact on your bundle |
| License | Compatible with your project |
| API Fit | Does the API match your needs? |

### 4. Make Decision

Document the options, the decision, and the trade-offs.

## Anti-Patterns

| Anti-pattern | Problem | Fix |
|--------------|---------|-----|
| Jumping to code | Building something that already exists | Search first, build last |
| Dependency bloat | Adding libraries for trivial things | Prefer native solutions when simple |
| Copy-paste | Importing code without understanding | Understand before adopting |
| NIH syndrome | "Not invented here" bias | Evaluate fairly, not emotionally |
| Premature abstraction | Building for hypothetical future needs | Solve today's problem first |

## Search Checklist

Before implementing:

- [ ] Searched npm/PyPI for existing libraries
- [ ] Searched GitHub for existing implementations
- [ ] Checked if skill already exists
- [ ] Evaluated top 3 candidates
- [ ] Documented decision with trade-offs
- [ ] Considered "build" option last, not first

## Related Skills

- `architecture/blueprint` - Planning implementation
- `nerdev/nerdev-docs` - Documenting decisions
- `engineering/coding-standards` - Code quality standards
