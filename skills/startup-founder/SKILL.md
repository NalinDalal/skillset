---
name: startup-founder
description: Use this whenever the user wants to start their own startup/company — idea validation, deciding what to build, registration/legal setup, MVP building, choosing bootstrapping vs raising money, pricing, launch/GTM, first customers, hiring, or scaling. Trigger on phrases like "I want to start a startup", "should I build this idea", "how do I register a company", "bootstrap vs raise funding", "how to get my first users/customers", "pitch deck", "co-founder", or any founder-journey question — even if the user only asks about one stage (e.g. just registration, or just pricing), since that stage's advice depends on knowing where they are in the whole journey. Always use this instead of generic advice from memory.
---

# Startup Founder Playbook

A stage-aware guide for someone going from "I want to start a startup" to a running, growing company. Sourced and adapted from curated founder resource lists (Y Combinator library, Paul Graham essays, awesome-ceo, founders-kit, Marketing-for-Founders) — not generic platitudes.

## Step 0 — Always calibrate first

Before giving advice, figure out (ask directly, don't assume — 2-3 short questions max, use ask_user_input_v0 if available):

1. **Stage**: no idea yet / have an idea, unvalidated / validated idea, no product / have MVP, no users / have users, pre-revenue / revenue, scaling
2. **Funding approach**: bootstrap (self-funded, slow, keep control) / raise money (VC/angel/YC, faster, gives up equity) / undecided — help me choose
3. **Geography**: for anything involving legal/registration/taxes/investors, confirm country. Default to global-neutral advice; add India-specific notes (see `references/legal-india.md`) if they're in India or don't specify (Nalin is Bhopal-based).

If the user already stated their stage/preference in this conversation or you know it from memory, don't re-ask — just confirm briefly and proceed.

Skip re-asking on every follow-up in the same conversation — carry the context forward.

## The journey, stage by stage

Give advice for the relevant stage(s) only — don't dump the whole journey unless asked for the full roadmap.

### 1. Idea & Validation
- Read `references/validation.md` for the interview-based validation method (Mom Test), red flags, and how to size a market fast.
- For a more structured/tactical interview and ICP process, `references/marketing/customer-research.md` goes deeper (interview scripts, ICP frameworks).
- Core rule: don't build until you've talked to 10+ potential customers about their problem (not your solution).

### 2. Choosing co-founder / going solo
- Solo is fine for a dev-founder (ships product fast) but slower on sales/ops. Co-founder disagreements are the #1 startup killer — equity split and vesting must be decided in writing on day one, even between friends.
- If asked: default equal-ish split with 4-year vesting + 1-year cliff, adjusted for who came up with idea / has funding / works full-time.

### 3. Legal & registration
- Read `references/legal-india.md` if India-relevant, otherwise give generic guidance: entity type (Pvt Ltd / LLC / sole proprietor), why it matters (liability, ability to raise money, ability to hire), and when to bother (usually: once you have a paying customer or are raising money — not before).

### 4. Building the MVP
- Nalin-specific default stack knowledge: Next.js/TypeScript/Tailwind, Bun, Node/Mongo/SQL — lean on this when the user is Nalin or has a similar stack.
- MVP = smallest thing that tests the core value hypothesis, not a stripped-down version of the full product. Cut scope ruthlessly; ship in days/weeks not months.

### 5. Funding decision: bootstrap vs raise
- Read `references/funding.md` for the decision framework, pitch deck structure, where to find angels/VCs, and Indian-specific funding sources (Startup India, Razorpay/MongoDB startup programs, angel networks).
- Rule of thumb: bootstrap if the business can reach profitability without heavy upfront capital (most SaaS/dev-tooling/service businesses can); raise only if the opportunity requires spending ahead of revenue to win (marketplaces, capital-intensive, winner-take-most markets).

### 6. Launch & first customers (GTM)
- Read `references/gtm-tools.md` for launch channels (Product Hunt, Hacker News, Indie Hackers, cold outreach, build-in-public), and the curated tool directory (payments, analytics, email, CRM, hosting, startup credit programs) pulled from founders-kit.
- For deeper, tactical marketing frameworks (launch planning, cold email, pricing, positioning/competitors, free-tool growth, customer research, full GTM plans), check `references/marketing/README.md` first — it indexes 8 bundled deep-dive skill files (sourced from the marketingskills pack on skills.sh) and tells you which one to open for the question at hand. Don't load all of them; pick the one relevant file.
- First 10 customers come from outbound + network, not inbound marketing. Don't invest in SEO/ads until you have 5-10 paying customers validating the offer.

### 7. Pricing & monetization
- Price based on value delivered, not cost-plus. For India-based founders selling globally, price in USD by default unless the customer base is India-only.

### 8. Growth & hiring
- Don't hire until a task is (a) recurring, (b) you've done it yourself enough to know what "good" looks like, (c) it's cheaper to delegate than do yourself. First hires are usually sales/support or a generalist, not niche specialists.

## Output style
- Match the user's directness. If they ask a narrow question ("how do I register in India"), answer that narrowly — don't force the whole framework on them.
- Prefer concrete next actions and templates (equity split calculators, pitch deck outlines, cold email scripts) over abstract theory.
- When recommending tools, pull from `references/gtm-tools.md` rather than inventing names.
