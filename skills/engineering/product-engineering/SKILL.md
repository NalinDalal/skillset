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

Thinking in product outcomes, not just technical systems. Checking how the product is doing, identifying where to improve, deciding what to improve — and building it.

## When to use

- Reviewing product metrics and identifying improvement opportunities
- Deciding what to build next based on data, not guesses
- Scoping features to move specific metrics
- Making technical decisions that serve product goals
- Saying no to features that don't move the needle
- Continuously improving an existing product

## Core principle

**Engineers who think in product, not just systems.** Not "how do I build this?" but "should this exist? will users care? how will we know if it worked?"

## The Product-Engineering Loop

```
Measure → Identify → Prioritize → Build → Measure
   ↑                                        |
   └────────────────────────────────────────┘
```

### 1. Measure

Know how the product is doing:

- **What's working?** Features with high adoption, good retention, positive feedback.
- **What's not working?** Drop-offs, low adoption, support tickets, churn.
- **What's missing?** User requests, competitive gaps, unmet needs.

Track outcomes, not output:

| Output (vanity) | Outcome (signal) |
|-----------------|------------------|
| Features shipped | Changes in user behavior |
| Lines of code | Users completing key flows |
| Sprint velocity | Time to answer "is this working?" |
| Code coverage | Bugs found before users hit them |

### 2. Identify

Find improvement opportunities:

- **Where are users dropping off?** Funnel analysis, session recordings.
- **What are users asking for?** Support tickets, feature requests, forum posts.
- **What are competitors doing that we're not?** Competitive analysis.
- **What's broken that users tolerate?** Workarounds, manual processes.

### 3. Prioritize

Decide what to work on:

| Factor | Question | Weight |
|--------|----------|--------|
| **Impact** | How many users does this affect? | High |
| **Intensity** | How much pain does this solve? | High |
| **Confidence** | How sure are we this will work? | Medium |
| **Effort** | How long will this take? | Medium |
| **Strategic fit** | Does this align with our direction? | Low |

**Rule:** Work on the highest impact + highest intensity problems first. Not the easiest, not the most interesting.

### 4. Build

Ship with intent:

- **One hypothesis per feature.** "We believe [this change] will [this outcome] for [these users]."
- **Instrument from day one.** If you can't measure it, you can't learn from it.
- **Ship to a subset.** Feature flags, staged rollouts, beta groups.

### 5. Measure (again)

After shipping, answer:

- Did the hypothesis hold?
- What surprised us?
- What should we double down on? Kill? Iterate?

Feed findings back to step 1.

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
| `office-hours` | Validating a new product idea |
| `startup-founder` | Early stage — what to build first |
| `customer-research` | Understanding users deeply |
| `ui-engineering` | Building the frontend |
| `motion` | Adding micro-interactions, icon morphs, transitions — load when a product decision involves UI feel |
| `ship` | Shipping with measurement |
| `performance` | Optimizing what matters to users |
| `security` | Protecting what users trust you with |
| `learn` | Tracking product learnings across sessions |

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

**Product engineering is checking how the product is doing and knowing what to improve next.**
