---
name: search-first
category: architecture
source: ECC (adapted)
description: "Research-before-coding workflow. Load before implementing new features to find existing solutions."
---

# Search First

**When to use:** Before implementing any new feature, before adding dependencies, when solving a problem that might already have a solution.

---

## Why Search First

- Existing solutions are battle-tested
- Avoid reinventing the wheel
- Discover better approaches
- Save time and reduce bugs

---

## Decision Matrix

| Option | When to Use | Effort | Risk |
|--------|-------------|--------|------|
| **Adopt** | Existing library does exactly what you need | Low | Low |
| **Extend** | Existing library does 80% of what you need | Medium | Medium |
| **Compose** | Multiple small libraries can be combined | Medium | Low |
| **Build** | No existing solution fits, or you need full control | High | High |

---

## Search Process

### 1. Define Requirements
Before searching, clarify:
- What exactly do you need?
- What are the constraints?
- What's the acceptance criteria?

### 2. Search Existing Solutions

#### npm/PyPI
```bash
# Search npm
npm search [keyword]
npm info [package-name]

# Check weekly downloads
npm info [package-name] | grep "weekly"

# Check last publish date
npm info [package-name] | grep "modified"
```

#### MCP Servers
```bash
# Check if MCP server exists
# Search MCP registry or community lists
```

#### GitHub
```bash
# Search GitHub
gh search repos [keyword] --sort stars --limit 10

# Check activity
gh api repos/[owner]/[repo] | jq '.pushed_at, .stargazers_count'
```

#### Existing Skills
```bash
# Check if skill already exists
ls skills/ | grep [keyword]

# Check skill descriptions
grep -r "description:" skills/*/SKILL.md | grep [keyword]
```

### 3. Evaluate Candidates

For each candidate, check:

| Criteria | How to Check |
|----------|--------------|
| **Maintenance** | Last commit date, open issues, release frequency |
| **Popularity** | Weekly downloads, GitHub stars, community size |
| **Quality** | TypeScript support, test coverage, documentation |
| **Bundle Size** | Impact on your bundle |
| **License** | Compatible with your project |
| **API Fit** | Does the API match your needs? |

### 4. Make Decision

Document your decision:

```markdown
## Decision: [Feature Name]

### Options Considered
1. **[Library A]** - [brief description]
   - Pros: [list]
   - Cons: [list]
   - Verdict: [Adopt/Reject] - [reason]

2. **[Library B]** - [brief description]
   - Pros: [list]
   - Cons: [list]
   - Verdict: [Adopt/Reject] - [reason]

3. **Build Custom** - [brief description]
   - Pros: [list]
   - Cons: [list]
   - Verdict: [Adopt/Reject] - [reason]

### Decision
**[Chosen Option]** because [reason].

### Trade-offs
- [What you gain]
- [What you sacrifice]
```

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Jumping to code** | Building something that already exists | Search first, build last |
| **Dependency bloat** | Adding libraries for trivial things | Prefer native solutions when simple |
| **Copy-paste** | Importing code without understanding | Understand before adopting |
| **NIH syndrome** | "Not invented here" bias | Evaluate fairly, not emotionally |
| **Premature abstraction** | Building for hypothetical future needs | Solve today's problem first |

---

## Search Checklist

Before implementing:

- [ ] Searched npm/PyPI for existing libraries
- [ ] Searched GitHub for existing implementations
- [ ] Checked if skill already exists
- [ ] Evaluated top 3 candidates
- [ ] Documented decision with trade-offs
- [ ] Considered "build" option last, not first

---

## Quick Commands

```bash
# Search npm
npm search [keyword]

# Search GitHub
gh search repos [keyword]

# Check package info
npm info [package-name]

# Check bundle size
npx bundlephobia [package-name]
```

---

## Related Skills

- `architecture/blueprint` - Planning implementation
- `nerdev/nerdev-docs` - Documenting decisions
- `engineering/coding-standards` - Code quality standards
