---
name: pre-ship-review
version: 1.0.0
description: "Run any marketing asset through 4 perspectives (Customer, Competitor, Skeptic, Conversion) before it ships. Identifies the exact 5 changes that will improve conversion most. Triggers on 'review before ship', 'pre-ship review', 'review like the 4 perspectives', 'review this before launching', 'asset review before shipping'.
---

# SOP: Pre-Ship Review Framework

## What This Skill Owns

Run any marketing asset through 4 specialized perspectives before it ships. The output is **exactly 5 changes** that would improve it most — not a full rewrite, but precise fixes with location and rationale.

**Triggers:** `'review before ship'`, `'pre-ship review'`, `'review like the 4 perspectives'`, `'review this before launching'`, `'asset review before shipping'`

## The 4-Perspective Review Process

### 1. CUSTOMER Perspective

**Read like the exact person we're trying to sell to.** Identify:

- **Where you get confused** — jargon, unclear references, leaps in logic
- **What feels irrelevant** — claims, features, or details that don't connect to their problem
- **Which claims you'd question** — unproven superlatives, vague benefits, "best-in-class" without proof
- **Which would make you leave** — friction points, missing price, confusing CTA, request-for-info fatigue

**Output format:**
```
CONFUSED at: [specific sentence/section]
IRRELEVANT: [what felt off-target]
QUESTION: [claim you doubt]
LEAVE: [what would make you exit the page]
```

---

### 2. COMPETITOR Perspective

**Pretend you work for our strongest competitor.** Identify:

- **Where we're weak** — gaps in our offering we don't address
- **What you'd attack** — our vulnerable positioning statements
- **Where our positioning is easy to copy** — generic claims any competitor could make
- **What sounds exactly like everyone else** — industry clichés, overused buzzwords, undifferentiated language

**Output format:**
```
WEAK: [our vulnerable claim]
ATTACK: [how a competitor would counter it]
COPYCAT: [generic phrasing any competitor uses]
CLICHÉ: [buzzword or phrase that's overused in our industry]
```

---

### 3. SKEPTIC Perspective

**Assume every claim needs proof.** Flag:

- **Anything vague** — "leading," "solutions," "platform," without specificity
- **Anything exaggerated** — superlatives without evidence ("world-class," "fastest," "#1")
- **Anything unsupported** — statistics, numbers, outcomes without source
- **Missing evidence someone would need to believe it** — no testimonials, case studies, data, third-party validation

**Output format:**
```
VAGUE: [claim that lacks specificity]
EXAGGERATED: [overstated claim]
UNSUPPORTED: [statistic or outcome without proof]
EVIDENCE_MISSING: [what would make this believable]
```

---

### 4. CONVERSION Perspective

**Read from top to bottom and find every point where someone has to stop, think, search for context, or figure out what they're supposed to do next.** Identify:

- **Stop points** — where reading pauses because something isn't clear
- **Think points** — where the reader mentally pauses to process
- **Search-for-context points** — where they'd need external info to continue
- **What-do-I-do-next points** — missing or unclear call-to-action

**Output format:**
```
STOP: [sentence or section where reading halts]
THINK: [where reader needs to process/reflect]
SEARCH: [where they'd need external context]
NEXT_ACTION: [unclear or missing CTA]
```

---

## Combining Into 5 Changes

After all 4 perspectives are complete, combine the findings into **exactly 5 changes** that would improve the asset the most. For each change specify:

1. **What** you'd change (the specific text, section, or element)
2. **Where** you'd change it (H2, first paragraph, CTA button, etc.)
3. **Why** this change matters (which perspective it addresses + expected impact)

**Changes must be ordered by impact** — the #1 change should address the most critical flaw, #5 the least of the five.

**Change format:**
```
CHANGE 1: [what] at [where] — [why: which perspectives + impact]
CHANGE 2: [what] at [where] — [why: which perspectives + impact]
CHANGE 3: [what] at [where] — [why: which perspectives + impact]
CHANGE 4: [what] at [where] — [why: which perspectives + impact]
CHANGE 5: [what] at [where] — [why: which perspectives + impact]
```

## Pre-Review Setup Checklist

Before running the review, gather:

- **[Asset type]** — landing page, pricing page, email, ad, sales deck, product announcement, onboarding flow, etc.
- **[Target audience]** — ICP, buyer persona, or customer segment
- **[Primary goal]** — what action do we want them to take?
- **[Key differentiator]** — what we actually own that competitors don't
- **[Proof assets]** — case studies, numbers, testimonials, data we can reference
- **[Competitor references]** — 1-2 actual competitors to compare against

## Post-Review Deliverables

The skill outputs **only** the 5 changes — no full rewrite, no copious commentary. The changes should:

1. Address the highest-impact friction from any perspective
2. Be implementable without rewriting the entire asset
3. Follow the format: `CHANGE N: action at location — rationale`
4. Total exactly 5 items — no more, no less

## Example Review

### Asset: Landing page for B2B SaaS product analytics tool
### Audience: VP of Analytics at mid-size enterprises

**CUSTOMER perspective:**
- CONFUSED at: "Our patented algorithm transforms raw data into actionable insights in real-time" — what does "patented algorithm" actually do?
- IRRELEVANT: The 3-column feature grid — I just need to know if it solves my backup problem
- QUESTION: How is this different from Tableau or Looker?
- LEAVE: If I can't tell in 10 seconds what problem it solves, I'm leaving

**COMPETITOR perspective:**
- WEAK: "We have the most complete analytics platform" — says every analytics company ever
- ATTACK: "Claiming to be 'most complete' when competitors have 10+ more integrations"
- COPYCAT: "Actionable insights," "real-time analytics," "single pane of glass"
- CLICHÉ: "Best-in-class," "world-class," "game-changing," "paradigm shift"

**SKEPTIC perspective:**
- VAGUE: "transform your analytics" — transform how? into what?
- EXAGGERATED: "fastest in its class" — according to whom?
- UNSUPPORTED: "enterprises see 3x faster decision-making" — where's the study?
- EVIDENCE_MISSING: Customer logos, ROI numbers, use case specifics

**CONVERSION perspective:**
- STOP: After the H2 "Features" — what exactly am I looking at?
- THINK: "Do I need all these features or just the dashboard?"
- SEARCH: "What's the pricing? Is there a free trial? Who uses this?"
- NEXT_ACTION: No clear CTA — is this a "book a demo" or "start free trial" page?

### Combined 5 Changes:

CHANGE 1: Replace "patented algorithm transforms raw data into actionable insights in real-time" with "automatically surface your top 3 analytics insights each morning" at H1 — removes jargon, states concrete outcome (Customer: CONFUSED/LEAVE; Skeptic: VAGUE)

CHANGE 2: Swap the 3-column feature grid for a single "How it solves [specific problem]" statement above the fold — removes irrelevant features (Customer: IRRELEVANT; Conversion: STOP/THINK)

CHANGE 3: Add "Trusted by [2-3 recognizable logos]" bar above the fold with one-sentence outcome per logo — provides social proof (Skeptic: EVIDENCE_MISSING; Customer: LEAVE trigger)

CHANGE 4: Replace "world-class analytics" with a specific claim like "Identify revenue-impacting anomalies 10x faster than manual review" with "customers report X% improvement" — eliminates exaggeration (Skeptic: EXAGGERATED/UNSUPPORTED)

CHANGE 5: Add "Start free trial — no credit card required" CTA above the fold with "Book a 15-min analysis" as secondary — clears conversion path (Conversion: NEXT_ACTION missing)