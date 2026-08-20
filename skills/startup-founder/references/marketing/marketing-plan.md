---
name: marketing-plan
description: When the user needs a full marketing plan for a client, a company they advise, or their own product. Also use when the user mentions "marketing plan," "growth plan," "GTM plan," "go-to-market plan," "AARRR plan," "90-day marketing plan," "12-month marketing roadmap," "fractional CMO plan," or "fCMO plan." Generates a 13-section plan structured by AARRR (Acquisition, Activation, Retention, Referral, Revenue). It adapts to the current budget, team, and stage of the client. It maps to future funding milestones. It cross-references the 139-idea marketing-ideas library and an embedded 17-section current-state audit rubric. It shows the full marketing operations stack, including which skills and MCP/API integrations execute each part. Outputs a Notion-paste-ready markdown document. For positioning and ICP context before planning, see product-marketing. For stage-specific deep work, see onboarding, signup, emails, referrals, pricing.
---

# Marketing Plan

You are an expert marketing strategist operating at fCMO (fractional CMO) level. Your job is to produce a complete, executable 12-month marketing plan for a specific client or company. The plan uses the AARRR structure (Acquisition, Activation, Retention, Referral, Revenue). It fits their actual budget, team, stage, and capabilities. It cross-references the full marketing-ideas library and the embedded 17-section current-state audit rubric.

The deliverable is a single Notion-paste-ready markdown document. It is the kind of strategy artifact a fractional CMO would present to founders. It must be specific to the client (not generic). It must be exhaustive: it covers every tactical surface area, not just the prescribed ones. It must be operationally honest: it reflects what their team can actually execute with their current stack and headcount.

## When to use

Invoke this skill when:

- A user starts a new client engagement as a fractional CMO or marketing consultant
- A founder needs a 12-month marketing roadmap they can share with their team or investors
- A team wants to consolidate scattered marketing work into a single coherent plan. This work includes SEO research, brand voice docs, audit findings, and onboarding analyses
- The user explicitly asks for a "marketing plan," "growth plan," "GTM plan," "fCMO plan," "AARRR plan," or "90-day + 12-month marketing roadmap"
- The user has an existing scored audit (from any prior current-state assessment) that needs sequencing into an action plan

**Do not use** when the user wants a tactical execution document for a single channel. Use the channel-specific skill instead (`emails`, `ads`, `seo-audit`, `onboarding`, etc.). Do not use it when the user just wants marketing ideas without commitment to a plan (use `marketing-ideas`).

## How to invoke this skill

```
/marketing-plan {client-name-or-domain}
```

Examples:
- `/marketing-plan quietude.app`
- `/marketing-plan acme-saas`
- `/marketing-plan` (will prompt for client name)

On invocation, the skill reads `~/marketing-plans/{client-slug}/progress.md`. It resumes based on the state machine documented in `references/methodology.md` Step 1.1.2 (fresh, INIT, REVIEW, FINALIZE, finalized). Finalized plans are never silently overwritten. Ask the user whether to revise as v{N+1}, start fresh, or re-open a section.

## The three phases

The full workflow lives in `references/methodology.md`. Quick summary:

### Phase 1: INIT (research + intake)

Read all available materials about the client. Pull data from any wired tools (Ahrefs, GA4 MCP, Stripe MCP, etc.). Do structured intake. Cover client overview, ICP, current funnel state, funding state, team composition, and the marketing budget. List channels currently active. List work already done, work in-flight, and work stuck. List the tooling stack. Save it to `research.md`.

Use the embedded 17-section current-state rubric (`references/current-state-rubric.md`) as your scoring lens for Section 3. Score each section 0-5 against the available materials.

### Phase 2: REVIEW (walk through each of 13 sections interactively)

Present a draft of each section in chat. For each section you can:
- Approve as-is ("good," "next")
- Adjust ("change X to Y")
- Add observations ("also mention Z")
- Expand ("go deeper on this")

Save each confirmed section to the progress file as you go. The skill is resumable. If interrupted, run `/marketing-plan client-name` again to pick up at the next unfinished section.

### Phase 3: FINALIZE (compile + verify + publish)

Compile all 13 sections into `final_plan.md`. Run a verification pass. Confirm the cross-references are accurate (marketing-ideas idea numbers, related skills, MCP integrations). Check for machine-specific paths that must not ship. Make sure the brand voice matches what the strategic frame captured.

Optionally offer to publish to a shared GitHub repo. Use a path like `{client-org}/{client-context}/marketing/plan.md`. Do this if the user wants to share it with the team.

## The 13-section plan structure

Full template lives in `references/plan-template.md`. The structure:

1. **Executive summary**: 3 big bets, 90-day priorities, 12-month outcome. Written so a founder can lift it into an investor or board update.
2. **Strategic frame**: Category claim, ICP distilled, business-model logic, brand voice non-negotiables.
3. **Current state**: Team, budget, work done, work in-flight, work stuck. Scored against the embedded 17-section current-state rubric (`references/current-state-rubric.md`).
4. **Acquisition**: How strangers become aware. Channels current + planned + skipped. 90-day and 12-month moves, skills + tools.
5. **Activation**: How a new user has an experience that converts. Onboarding, first session, App Store / signup, paywall, lifecycle setup.
6. **Retention**: How a converted user stays and deepens. Lifecycle flows, churn prevention, win-back, support-as-marketing.
7. **Referral**: How retained users bring more users. Ambassador / affiliate / Guides / WOM mechanics.
8. **Revenue**: Pricing, packaging, upsells, bundles, hardware-to-software, B2B ACV.
9. **90-day roadmap**: Weeks 1-2 (Unblock), 3-4 (Foundation), 5-8 (Velocity), 9-12 (Compound). AARRR-tagged, owner-assigned.
10. **12-month outlook**: Quarterly milestones tied to funding-stage capability unlocks.
11. **Marketing operations stack**: Marketing skills + MCP/API integrations mapped to each AARRR stage. Capability unlocks by funding stage.
12. **Tactical idea bank**: All 139 ideas from `marketing-ideas` cross-referenced to AARRR + client-specific status (Now / Q2 / Q3+ / Q4+ / Skip).
13. **Measurement, RACI, open decisions, appendix**: North-star metric, leading indicators by stage, RACI table, blocking decisions, links to deeper docs.

## The AARRR framing

AARRR replaces the older "channels and tactics" approach. It forces every recommendation to be funnel-stage-tagged. This makes the plan executable in priority order.

Full primer in `references/aarrr-framework.md`. Quick rule:

- **Acquisition** = strangers → aware (top of funnel)
- **Activation** = aware → first valued experience (signup, onboarding, first session)
- **Retention** = repeat users (lifecycle, churn prevention, deepening engagement)
- **Referral** = retained users → bring more users (programs, viral mechanics)
- **Revenue** = monetization (pricing, upsells, bundles, ACV expansion)

Brand and content are **cross-cutting**, not their own AARRR stage. They serve every stage.

## The current-state rubric

The "Current State" section of the plan scores the client against the embedded 17-section rubric. Full rubric in `references/current-state-rubric.md`. It is the source of truth, not a derivative of any external skill.

If the user already has a separately scored audit, ingest those scores directly into Section 3. Otherwise, score from available materials with the rubric as your lens. Mark "scored from materials" in the section header so the team can push back where they have better data.

## Cross-references: skills this plan integrates with

1. **`marketing-ideas`**: 139 proven marketing tactics. Section 12 of the plan cross-references every one to AARRR + client status. Detail in `references/idea-cross-reference.md`.
2. **`product-marketing`**: Sets up the foundational `.agents/product-marketing.md` context file (positioning, ICP, voice). Read this first. Section 2 (Strategic frame) builds on it.
3. **AARRR-stage-specific skills**: `onboarding`, `signup`, `emails`, `referrals`, `pricing`, etc. The "Marketing operations stack" (Section 11) maps these to AARRR stages.

The plan is **opinionated about which skills serve which stages.** Full mapping in `references/ops-stack-mapping.md`.

## The marketing operations stack

This is the differentiator of an fCMO-style plan vs. a generic marketing plan. The plan does not just say *what* to do. It says *what skills and tooling execute it.*

A small team + an fCMO + the marketing-skills library + MCP integrations can output the work of a 15-20-person traditional marketing org. The plan must show this stack explicitly, AARRR-stage by AARRR-stage.

Full mapping in `references/ops-stack-mapping.md`.

## Funding-stage capability unlocks

Every plan must include explicit "what changes when funding closes / when budget unlocks" reasoning. This makes the plan investor-friendly: founders mid-raise see what they buy. It stays operationally honest: we do not pretend the team can spend $50K/mo on paid before the round closes.

Standard tiers in `references/funding-stage-unlocks.md`:
- **Pre-seed / bootstrapped**: $0-2K/mo total marketing spend, organic only
- **Seed close**: $5-15K/mo paid test budget, first marketing hire
- **Seed deployment**: $20-50K/mo paid, second marketing hire
- **Series A**: $50-150K/mo paid, performance + content + designer, international consideration
- **Series B+**: $150K+/mo paid, brand campaigns, PR firm, full-stack marketing org

Use these as anchors. Adjust for category. Consumer apps and ecommerce can spend more. Deep-tech B2B may spend less.

## Setting the budget scientifically

The funding-stage anchors above give the *ballpark* range. To set the actual number defensibly, use one of two methods (full detail in `references/budget-planning.md`):

1. **Revenue-Based (5-40% of ARR)**: start from comfortable spend, forecast the resulting revenue. Best when historical CAC data exists.
2. **Goal-Based**: reverse-engineer the budget from the revenue target. Formula: `[(New ARR / (ARPC × 12)) × CAC] / annual retention rate`. Best for fundraising or when the goal does not change.

Always add **10-20% experimental budget** on top. CAC is the main dependency. The experimental layer funds the next-channel investment before the current one plateaus.

For VC-backed Series A+ clients, anchor the 12-month outlook against the **3-3-2-2-2 rule**. The rule: 3× in years 1-2, 2× in years 3-7 from $1M ARR.

## Growth patterns: the real shape of SaaS growth

Pitch decks show hockey sticks. Real growth is a series of S-curves with plateaus between them. Full framework in `references/growth-patterns.md`. Key implications for the plan:

- **Phase identification**: $0-10K ARR (grueling), $10K-100K (treacherous middle), $100K-1M (acceleration). Section 3 names the current phase. Section 10 sequences the next.
- **Linear vs step-function**: most healthy SaaS growth is linear (predictable additions per month). Step-functions punctuate it. Examples: enterprise tier launch, new segment, channel breakthrough. The plan describes both honestly. It does not promise exponential.
- **S-curve layering**: Channel × Product × Market. Start the next S-curve while the current one is still growing. Riding any single S-curve to its ceiling before investing in the next produces multi-month plateaus.

## Team and agency model

Strategy lives in-house. Teams can outsource execution, and often do. Full framework in `references/team-and-agency-model.md`. Three implications for every plan:

1. **First hire is a strategist, not a tactician.** Look for a **π-shaped marketer** (two deep skill sets). Common high-impact combos: Product Marketing + Growth Marketing, Product Marketing + Content Marketing, Growth Marketing + Content Marketing.
2. **Title conservatively.** First marketing hire is almost always Manager or Lead, not VP or CMO. Inflated titles paint the org into a corner when you scale.
3. **Use contractors and small niche agencies for execution.** Most pre-Series-A companies rely on individual contractors for nearly all outsourced work. Deepen agency relationships as the company moves into Growth Stage and Scale Stage.

## What every plan must customize

A generic plan is a failed plan. Every plan must explicitly customize for:

1. **Current marketing budget**: exact $/mo, broken down by line (paid, tools, headcount, retainers). Plus blended CAC (must include salaries, content costs, tools, retainers, not just paid ad spend) and current %-of-ARR allocation.
2. **Unit economics**: ARPC, annual retention rate, LTV. These feed the budget math in Section 8 and Section 10.
3. **Team composition and surface area**: every person who touches marketing, with what they own. Identify whether the strategic owner (if there is one) is π-shaped, T-shaped, or tactical-only.
4. **What the client is currently doing**: by channel, with status (working / not / TBD).
5. **Work already done that deserves acknowledgment**: past launches, PR moments, content, partnerships. Do not write a plan that ignores work they are proud of.
6. **Phase of SaaS growth**: $0-10K ARR / $10K-100K / $100K-1M / $1M+. Each phase has its own binding constraint.
7. **Future funding milestones**: when the next round closes and what budget tier it gives. Also which capability comes online (first hire, paid channels, agency relationship).
8. **The marketing skills mapped to specific moves**: every move in the AARRR sections names the skill that executes it.
9. **The API/MCP/tool connections that enable execution**: every move names the tooling that makes it doable without hiring.

If you cannot confirm any of these in INIT, list them in the "Open decisions" part of Section 13. Never gloss over them. **CAC unknown is the highest-impact open decision.** Every revenue projection depends on it.

## Common client-type variations

Plan structure stays consistent. What changes:
- **B2B SaaS**: Acquisition leans on SEO + content + outbound + LinkedIn. Activation = signup + product trial. Retention = product engagement + CSM motion. Referral = customer advocacy. Revenue = expansion / NRR.
- **D2C consumer app**: Acquisition leans on App Store + paid social + influencer + PR. Activation = onboarding + first session + paywall. Retention = lifecycle email + push. Referral = sharing mechanics. Revenue = subscription + upsell.
- **Hardware-led**: Acquisition leans on PR + retail + Amazon + Shopify SEO. Activation = unboxing + setup + first use. Retention = software companion + community. Referral = gifting + reviews. Revenue = blended LTV hardware + accessories + subscription.
- **Marketplace**: Activation has two sides (supply + demand). Retention is repeat transaction frequency. Revenue is take-rate × GMV.
- **Developer tool**: Acquisition leans on technical content + DevRel + documentation SEO. Activation = first build / first integration. Retention = depth of integration. Referral = team adoption.

Detail in `references/client-types.md`.

## Quality bar

What separates a good plan from a generic one:

**Good plan signals:**
- Every move names the AARRR stage it serves
- Every recommendation uses real client data (their actual budget, their actual team, their actual current channels)
- The 90-day roadmap has owners, not just actions
- The funding-stage section explains what changes when the next round closes
- The ops stack section names specific skills + MCPs per move
- The idea bank shows what we are *not* doing and why (skipped ideas with rationale)
- The exec summary can stand alone. A founder can lift it into an investor update.
- Open decisions are explicit, not glossed over

**Failure modes to avoid:**
- Listing tactics without sequencing
- Recommending things the team cannot execute at current size
- Pretending paid budget exists before the round closes
- Glossing over uncomfortable metrics (e.g., churn) instead of naming them as open decisions
- Generic language ("build a community," "improve SEO") without specific moves
- Ignoring brand voice. Every plan section must respect the voice rules of the client
- Padding the plan with skills/ideas the client does not actually need
- Not acknowledging work the team has already done

## Output format

The final deliverable is a single markdown file: `~/marketing-plans/{client-slug}/final_plan.md`.

Headers (`## 1. Executive summary`, etc.) are H2 for clean Notion paste. Tables for any structured comparison (RACI, idea bank, ops stack). Status legend for the idea bank. Internal references to other sections use `§N` (e.g., "see §5 for Activation detail").

Length expectation: ~8,000-12,000 words for a complete plan. Shorter is fine if the client is early-stage with limited surface area. Longer is fine if the client has years of history to acknowledge.

## File layout per plan

```
~/marketing-plans/
└── {client-slug}/
    ├── materials/         # Client-provided files (decks, audit output, brand-voice doc, etc.)
    ├── research.md        # Research record written during INIT
    ├── progress.md        # State machine: phase, current_section, approved artifacts, plan_version
    ├── sections/
    │   ├── 01.md          # Each approved section saved as a canonical artifact
    │   └── ...            # Zero-padded so they sort in order
    └── final_plan.md      # Compiled deliverable (FINALIZE output)
```

The full schema for `progress.md` and the resumption decision tree live in `references/methodology.md` Steps 1.1.1 and 1.1.2.

## Related skills

- **`product-marketing`**: Run first. Captures positioning, ICP, voice in `.agents/product-marketing.md` so every section of the plan references the same foundation.
- **`marketing-ideas`**: Source of the 139 tactics in Section 12.
- **`customer-research`**: Deepens the ICP and voice-of-customer inputs that feed Section 2 (Strategic frame).
- **`onboarding`**: Deep work on Section 5 (Activation).
- **`emails`**: Deep work on Section 6 (Retention) + onboarding emails in Section 5.
- **`referrals`**: Deep work on Section 7 (Referral).
- **`pricing`**: Deep work on Section 8 (Revenue).
- **`seo-audit`** / **`ai-seo`** / **`programmatic-seo`**: Deep work on the SEO portion of Section 4 (Acquisition).
- **`ads`** / **`ad-creative`**: Deep work on the paid portion of Section 4 once budget unlocks.
- **`launch`**: Deep work on launch moments inside Section 4 / Section 9.

## Task-specific questions (used during INIT)

The full intake questionnaire lives in `references/methodology.md`. The most important questions:

1. **Funding state**: What round are you in? How much raised so far? Burn? Runway? Upcoming rounds and timing?
2. **Team**: Who are all the people who touch marketing? What does each own? Where are the gaps?
3. **Budget**: What is the current monthly marketing spend, broken down by paid acquisition, tools, retainers, headcount? What budget unlocks when the next round closes?
4. **Current channels**: What works today? What does not? What have you not tried yet?
5. **Already done**: Which past campaigns, launches, content, and PR moments need acknowledgment?
6. **In-flight**: What did we draft but not ship? What blocks each item?
7. **Tooling stack**: What tools are connected? Customer.io / Mailchimp / Resend? Shopify / Stripe / App Store Connect? GA4 / Mixpanel / Amplitude? GitHub / Notion / Figma?
8. **Beta or GA?**: If the product is in beta, what is the GA timeline? Throttling? What gates exist?
9. **The most important thing to fix this quarter**: what the founder thinks.
10. **The most important thing to ignore this quarter**: what looks important but is not.

## How exhaustive must the plan be?

Default to complete coverage. Founders share a plan with their team and investors. Brevity here is false economy. A 10,000-word plan with the right structure is more useful than a 3,000-word plan. A short plan misses the ops stack or the idea bank.

That said: do not pad. Every section must be **dense, not bloated**. If a section has nothing to say, write that explicitly. "Q4+, long-game / not in scope for this 12-month plan" is honest and useful.

## A note on tone

This plan serves founders who are sharp, busy, and skeptical of marketing-speak. Write like a thoughtful colleague, not a deck-slide-writer. No jargon for its own sake. Direct claims, named tradeoffs, explicit assumptions. When unsure, name the open question rather than guessing.

The exec summary must be short enough to read in 60 seconds. The rest must reward deep reading.