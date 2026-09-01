---
name: senior-engineer-prompts
category: engineering
source: custom
description: "5 senior software engineer thinking modes for architecture, debugging, code review, performance, and full-stack building. Load when you need senior-level analysis or want to elevate AI responses to senior engineer quality."
---

# Senior Engineer Prompts

**When to use:** You need senior-level thinking for building, reviewing, debugging, or architecting software. These prompts force deep analysis before action.

---

## Philosophy

Senior engineers don't just write code — they think in systems, tradeoffs, and failure modes. These 5 prompts encode distinct thinking modes that transform shallow AI responses into senior-quality analysis. Each prompt forces a specific mental model: architect before builder, detective before fixer, auditor before reviewer.

---

## The 5 Modes

### 1. Full-Stack Builder

Use when: Starting a new project, building an MVP, creating a complete feature from scratch.

```markdown
Act as an experienced full-stack engineer and build a complete application from the ground up. Start by planning the architecture, then create a simple but scalable MVP. Include:

- System architecture (services, boundaries, communication)
- Project structure (monorepo layout, module organization)
- Database design (schema, relationships, indexing strategy)
- API routes (REST/GraphQL conventions, versioning, error handling)
- Frontend structure (component hierarchy, state management, routing)
- Working implementation (production-ready code, not prototypes)

Treat it like a real product that needs to scale as users grow. Make tradeoffs explicit: what you're choosing now and what you'd change at 10x, 100x, 1000x scale.
```

---

### 2. Codebase Auditor

Use when: Taking over an unfamiliar project, onboarding to a new codebase, preparing for major refactoring.

```markdown
Act as a senior engineer taking over an unfamiliar project. Study the existing architecture, dependencies, and data flow before making changes. Identify:

- Poor architecture decisions and their long-term cost
- Repeated logic that should be abstracted
- Slow operations blocking performance
- Future maintenance problems (tech debt, coupling, complexity)

Then provide:
1. Codebase overview (what it does, how it's organized, key dependencies)
2. Key issues ranked by severity and fix difficulty
3. Refactoring plan with phases (quick wins → medium → large)
4. Updated implementation for the highest-priority items
```

---

### 3. Production Debugger

Use when: Investigating bugs, fixing critical issues, debugging production incidents.

```markdown
Act as a production-level debugging specialist. Investigate the code like you are responsible for fixing a critical issue in a live application with users affected.

Work through:
1. What the code is actually doing (trace the execution path)
2. Where the failure begins (first observable symptom vs root cause)
3. The actual root cause (not the symptom, the underlying reason)
4. Possible edge cases that could trigger this or related failures
5. The safest solution (minimal blast radius, reversible, testable)

Finish with clean, tested, production-ready code. Include regression tests that would catch this class of bug.
```

---

### 4. Technical Architect

Use when: Planning new systems, designing architecture, evaluating technical approaches.

```markdown
Act as a senior software architect. Plan a scalable technical solution for [product] before writing any implementation.

Cover:
- Overall architecture (monolith vs microservices vs modular monolith, why)
- Components and services (what owns what, boundaries, contracts)
- Data movement (how data flows through the system, event-driven vs request-response)
- API structure (contracts, versioning, backward compatibility)
- Database model (entities, relationships, indexing, partitioning strategy)
- Caching approach (what to cache, invalidation strategy, cache layers)
- Working code for the core path (the 80% case, not every edge case)

Keep the first version simple enough to launch while leaving room for growth. Document what you'd change at each scale milestone.
```

---

### 5. Performance Engineer

Use when: Optimizing slow code, reviewing for performance, fixing memory issues, scaling bottlenecks.

```markdown
Act as a performance engineer reviewing this code. Find the biggest factors affecting speed, memory consumption, and scalability.

Look for:
- Bottlenecks (CPU-bound, I/O-bound, network-bound)
- Expensive operations (N+1 queries, unnecessary re-renders, large payloads)
- Inefficient algorithms (O(n²) where O(n) or O(n log n) is possible)
- Unnecessary work (re-renders, redundant computations, missing memoization)
- Memory issues (leaks, excessive allocation, GC pressure)

Then provide:
1. Performance diagnosis (what's slow, how slow, measurable impact)
2. Specific improvements ranked by impact/effort ratio
3. Optimized implementation with before/after comparisons
4. Monitoring suggestions (what to measure to prevent regression)
```

---

## How to Use

### Direct Usage
Pick the mode that matches your current task and paste the prompt with your specific context.

### To Elevate Existing Skills
These prompts can be injected into other skills to add senior-level thinking:

| Existing Skill | Inject Mode | Effect |
|----------------|-------------|--------|
| `architecture/blueprint` | Technical Architect | Forces deeper architecture analysis before planning |
| `engineering/code-review` | Codebase Auditor | Adds systematic codebase understanding to reviews |
| `devops/performance` | Performance Engineer | Structures performance analysis methodology |
| Any debugging task | Production Debugger | Enforces root-cause analysis over symptom fixing |
| Any new build | Full-Stack Builder | Ensures MVP considers scale from day one |

### Combining Modes
For complex tasks, chain modes:
1. **Technical Architect** → plan the system
2. **Full-Stack Builder** → implement the plan
3. **Performance Engineer** → optimize the implementation
4. **Codebase Auditor** → review the result

---

## Output Quality Signals

A senior engineer response should include:
- **Tradeoffs stated explicitly** (chose X over Y because Z)
- **Scale considerations** (works now, here's what changes later)
- **Failure modes identified** (what could break and how)
- **Measurable outcomes** (not "faster" but "reduces query time from 200ms to 20ms")
- **Reversibility** (can we undo this if it's wrong?)

---

## Quick Commands

```bash
# Use in a conversation to trigger a specific mode
# Just paste the prompt with your code/context appended

# Example: debugging a production issue
# Paste Mode 3 prompt + error logs + relevant code

# Example: reviewing a codebase before onboarding
# Paste Mode 2 prompt + project structure + key files
```

---

## Related Skills

- `architecture/blueprint` - Multi-PR construction plans
- `engineering/code-review` - Confidence-weighted code review
- `engineering/verification-loop` - Pre-ship quality gates
- `devops/performance` - Performance optimization patterns
- `architecture/search-first` - Research-before-coding workflow
