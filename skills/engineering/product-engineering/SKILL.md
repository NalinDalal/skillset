---
name: product-engineering
category: engineering
source: custom
description: "The discipline of making technical decisions that serve user goals. Bridges product thinking and engineering execution. Load when building features, making architecture choices, scoping work, or deciding what NOT to build."
triggers:
  - should we build this
  - is this worth building
  - how to scope this
  - what should we build next
  - technical decision
  - architecture decision
  - build vs buy
  - product engineering
---

# Product Engineering

The discipline of making technical decisions that serve user goals. Not just building things right (engineering), but building the right things (product) — and knowing the difference.

## When to use

- Deciding what to build next
- Scoping a feature or project
- Making build vs buy decisions
- Choosing architecture that matches the problem
- Saying no to features that don't serve users
- Evaluating if a technical decision serves product goals

## Core principle

**Every technical decision is a product decision.** Choosing Postgres over MongoDB isn't just an engineering choice — it affects what you can build, how fast you can iterate, and what your users experience.

## The Product-Engineering Loop

```
Observe → Decide → Build → Measure → Learn
  ↑                                      |
  └──────────────────────────────────────┘
```

### 1. Observe

Before building anything, understand:

- **Who** has the problem? (Not "users" — specific people)
- **What** are they doing today? (The status quo)
- **When** does the pain happen? (The moment)
- **Why** haven't they solved it? (The barrier)

Use `office-hours` skill for deep product diagnostic. Use `customer-research` for user interviews.

### 2. Decide

Make explicit decisions before code:

| Decision | Question | Default |
|----------|----------|---------|
| **Build vs Buy** | Does this differentiate us? | Buy undifferentiated, build what makes you unique |
| **Scope** | What's the smallest thing that tests the hypothesis? | Cut 50% more than you think |
| **Complexity** | Does the solution match the problem's actual complexity? | Simplest thing that works |
| **Timing** | Do we need this now or can we learn first? | Learn before building |

### 3. Build

Ship with intent:

- **One hypothesis per feature.** "We believe [this change] will [this outcome] for [these users]."
- **Instrument from day one.** If you can't measure it, you can't learn from it.
- **Ship to a subset.** Feature flags, staged rollouts, beta groups.

### 4. Measure

Measure outcomes, not output:

| Output (vanity) | Outcome (signal) |
|-----------------|------------------|
| Lines of code | Users completing the flow |
| Features shipped | Changes in user behavior |
| Sprint velocity | Time to answer "is this working?" |
| Code coverage | Bugs found before users hit them |

### 5. Learn

After shipping, answer:

- Did the hypothesis hold?
- What surprised us?
- What should we double down on? Kill? Iterate?

Feed learnings back to Observe.

## Decision Frameworks

### Build vs Buy

```
Does this differentiate us from competitors?
  ├─ YES → Build (it's your moat)
  └─ NO → Buy or use existing
           └─ Is there a mature, well-maintained solution?
                ├─ YES → Buy/adopt
                └─ NO → Build, but keep it minimal
```

**Examples:**
- Auth → Buy (Clerk, Auth0, Supabase Auth). Not your moat.
- Core algorithm → Build. Your differentiator.
- Admin dashboard → Buy or template. Not your moat.
- Unique UX interaction → Build. Your moat.

### Complexity Matching

| Problem complexity | Solution complexity | Anti-pattern |
|-------------------|-------------------|--------------|
| Simple CRUD | Single table, minimal abstractions | Over-engineered microservices |
| Real-time collaboration | WebSockets, operational transform | Polling every 5 seconds |
| Data pipeline | Queue + workers | Synchronous processing |
| Multi-tenant SaaS | Row-level security, schema separation | Separate databases per tenant |

**Rule:** The solution should be exactly as complex as the problem. Not simpler (it won't work), not more complex (it won't be maintained).

### Scope Control

Before adding a feature, ask:

1. **Does this move a metric we care about?** If no, don't build it.
2. **Can we solve this with copy/design instead of code?** Often cheaper.
3. **What happens if we don't build this?** If nothing meaningful, skip it.
4. **Is this a "must have" or a "nice to have"?** Nice to haves go to the backlog.
5. **Can we solve this for 80% of users with 20% of the work?** Ship that.

## Technical Decisions That Serve Product Goals

### Architecture serves iteration speed

Choose architecture that lets you **change your mind fast**:

- **Monolith first.** Microservices add coordination cost. Start with a well-structured monolith.
- **Feature flags over branches.** Deploy continuously, release selectively.
- **Convention over configuration.** Fewer decisions to make, faster to ship.
- **Simple hosting.** Vercel/Railway/Fly.io over custom Kubernetes. Your users don't care about your infrastructure.

### Database serves the access pattern

Choose database based on **how you read/write**, not how trendy it is:

| Access pattern | Right choice | Wrong choice |
|---------------|--------------|--------------|
| Structured data, joins, transactions | Postgres | MongoDB |
| Document store, flexible schema | MongoDB | Postgres (forced) |
| Key-value, caching | Redis | Postgres (overkill) |
| Time-series, analytics | ClickHouse, Timescale | Postgres (slow) |
| Full-text search | Elasticsearch, Meilisearch | Postgres LIKE (slow) |

### API serves the consumer

Design APIs for the **consumer's use case**, not your database schema:

- **REST for CRUD.** Simple, well-understood.
- **GraphQL for complex reads.** When clients need flexible queries.
- **WebSockets for real-time.** When latency matters.
- **Webhooks for integrations.** When other systems need to react.

## Anti-Patterns

### Premature abstraction
Building a "reusable framework" before you've built the thing twice. DRY matters, but YAGNI matters more.

### Resume-driven development
Choosing tech because it looks good on a resume, not because it solves the problem. "We need Kafka" when a simple queue would work.

### Cargo cult architecture
Copying Netflix's architecture when you have 100 users, not 100 million.

### Feature factory
Shipping features without measuring outcomes. "We shipped 12 features this sprint" means nothing if none moved a metric.

### Complexity as insurance
Adding abstractions "just in case" we need them later. You probably won't. Delete it when you do.

## Integration with other skills

| Skill | When to use with product-engineering |
|-------|-------------------------------------|
| `office-hours` | Before building — validate the problem |
| `startup-founder` | Early stage — what to build first |
| `customer-research` | Understanding users deeply |
| `ui-engineering` | Building the frontend with product decisions |
| `ship` | Shipping with measurement |
| `performance` | Optimizing what matters to users |
| `security` | Protecting what users trust you with |

## Pre-ship checklist

Before declaring any feature done:

- [ ] **Hypothesis stated.** "We believe [X] will [Y] for [Z]."
- [ ] **Measurement defined.** How will we know if it worked?
- [ ] **Scope matches hypothesis.** No extra features sneaking in.
- [ ] **Build vs buy justified.** Why this needed to be custom.
- [ ] **Complexity matches problem.** No over-engineering.
- [ ] **Rollout plan exists.** How do we deploy safely?
- [ ] **Rollback plan exists.** How do we undo if it breaks?
- [ ] **Success criteria defined.** What does "working" look like?
- [ ] **Failure criteria defined.** When do we kill this?

## One-liner

**Product engineering is knowing what NOT to build.**
