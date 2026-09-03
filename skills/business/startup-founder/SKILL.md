---
name: startup-founder
description: Use this whenever the user wants to start their own startup or company. It covers idea validation, deciding what to build, legal setup, MVP building, funding, pricing, launch, first customers, hiring, and scaling. Trigger on phrases like "I want to start a startup", "is this idea worth building", "how do I register a company", "bootstrap vs raise funding", "how to get my first users or customers", "pitch deck", "co-founder", or any founder-journey question, even if the user only asks about one stage (for example, just registration or just pricing). The advice for that stage depends on where they are in the whole journey. Always use this instead of generic advice from memory.
---

# Startup Founder Playbook

A stage-aware guide for someone going from "I want to start a startup" to a running, growing company. It draws from curated founder resource lists (Y Combinator library, Paul Graham essays, awesome-ceo, founders-kit, Marketing-for-Founders). It is not generic platitudes.

## Step 0: Always calibrate first

Before giving advice, figure out the basics. Ask directly. Do not assume. Use 2-3 short questions max. Use ask_user_input_v0 if available:

1. **Stage**: no idea yet / have an idea, unvalidated / validated idea, no product / have MVP, no users / have users, pre-revenue / revenue, scaling
2. **Funding approach**: bootstrap (self-funded, slow, keep control) / raise money (VC/angel/YC, faster, gives up equity) / undecided, help me choose
3. **Geography**: for anything involving legal/registration/taxes/investors, confirm the country. Default to global-neutral advice. Add India-specific notes (see `references/legal-india.md`) if they are in India or do not specify. Nalin is Bhopal-based.

If the user already stated their stage or preference in this conversation, just confirm briefly and proceed. If you know it from memory, do the same. Do not re-ask.

Skip re-asking on every later question in the same conversation. Carry the context forward.

## The journey, stage by stage

Give advice for the relevant stage(s) only. Do not dump the whole journey unless the user asks for the full roadmap.

### 1. Idea & Validation
- Read `references/validation.md` for the interview-based validation method (Mom Test), red flags, and how to size a market fast.
- For a more structured/tactical interview and ICP process, `references/marketing/customer-research.md` goes deeper (interview scripts, ICP frameworks).
- Core rule: do not build until you talk to 10+ potential customers about their problem, not your solution.

### 2. Choosing co-founder / going solo
- Solo is fine for a dev-founder (ships product fast) but slower on sales/ops. Co-founder disagreements are the #1 startup killer. Decide the equity split and vesting in writing on day one, even between friends.
- If asked: default equal-ish split with 4-year vesting + 1-year cliff. Adjust for who came up with the idea, has funding, or works full-time.

### 3. Legal & registration
- Read `references/legal-india.md` if India-relevant. Otherwise give generic guidance. Cover the entity type (Pvt Ltd / LLC / sole proprietor). Explain why it matters (liability, ability to raise money, ability to hire). Say when to bother (usually once you have a paying customer or raise money, not before).

### 4. Building the MVP
- Nalin-specific default stack knowledge: Next.js/TypeScript/Tailwind, Bun, Node/Mongo/SQL. Lean on this when the user is Nalin or has a similar stack.
- MVP = smallest thing that tests the core value hypothesis, not a stripped-down version of the full product. Cut scope ruthlessly. Ship in days or weeks, not months.

### 5. Funding decision: bootstrap vs raise
- Read `references/funding.md` for the decision framework and pitch deck structure. It also covers where to find angels/VCs and Indian-specific funding sources (Startup India, Razorpay/MongoDB startup programs, angel networks).
- Rule of thumb: bootstrap if the business can reach profitability without heavy upfront capital. This fits most SaaS, dev-tooling, and service businesses. Raise only if the opportunity requires spending ahead of revenue to win. Examples: marketplaces, capital-intensive markets, and winner-take-most markets.

### 6. Launch & first customers (GTM)
- Read `references/gtm-tools.md` for launch channels. These include Product Hunt, Hacker News, Indie Hackers, cold outreach, and build-in-public. It also has the curated tool directory (payments, analytics, email, CRM, hosting, startup credit programs) pulled from founders-kit.
- For deeper, tactical marketing frameworks, check `references/marketing/README.md` first. This covers launch planning, cold email, pricing, positioning and competitors, free-tool growth, customer research, and full GTM plans. It indexes 8 bundled deep-dive skill files (sourced from the marketingskills pack on skills.sh). It tells you which file to open for the question at hand. Do not load all of them. Pick the one relevant file.
- First 10 customers come from outbound + network, not inbound marketing. Do not invest in SEO or ads until you have 5-10 paying customers validating the offer.

### 7. Pricing & monetization
- Price based on value delivered, not cost-plus. For India-based founders selling globally, price in USD by default unless the customer base is India-only.

### 8. Growth & hiring
- Do not hire until a task recurs. Do not hire until you do it enough yourself to know what good looks like. Do not hire until delegation is cheaper than doing it yourself. First hires are usually sales, support, or a generalist. They are not niche specialists.

### 9. Real founder example: $0 to $3.5M ARR bootstrapped (GojiberryAI)
This is a first-person account from a founder who built GojiberryAI to $4M+ ARR in one year, got into YC, and bootstrapped the whole thing. Use this as a concrete reference when advising founders — it validates the framework above with real execution.

1. **Sell it before you build it.** No code. Just a slide deck (6 ugly slides) explaining the problem, solution, outcome, and price. First $10k came before writing a single line.
2. **Pick a painfully specific customer.** Not "B2B SaaS." Something like "founders at 20-person SaaS companies about to hire their first SDR." So specific the right person reads it and thinks "that's me."
3. **Start outbound on day one, but only to people showing intent.** Not scraped lists. People engaging with competitors, changing roles, raising money, or publicly posting about the exact problem you solve. That's the gap between 1-2% reply rate and 25-40%.
4. **Lead with value, never a calendar link.** Send a blueprint, not "got 15 minutes?" Let the resource do the selling, and the trial becomes the obvious next step instead of a pitch.
5. **Pick ONE channel and go deep.** For them it was outbound first, then Reddit (10M+ organic views), then LinkedIn lead magnets. Don't touch a second channel until the first one is clearly working.
6. **Talk to customers every single day.** The product doesn't matter until you understand the problem better than they do. Spend 90% of every early call listening, not demoing.
7. **Only build once people are actually paying.** Then keep it dead simple and price it to sell itself. They landed on $99/mo with a free trial, so the funnel runs without dragging anyone onto a call.
8. **Do this relentlessly for about 12 months.** That's roughly how long $0 to $3.5M took. Bootstrapped. No outside funding.

**The takeaway most founders miss:** They don't lose because they can't build. They lose because they build too early, sell too late, and quit the channel before it compounds.

## Output style
- Match the directness of the user. If they ask a narrow question ("how do I register in India"), answer that narrowly. Do not force the whole framework on them.
- Prefer concrete next actions and templates (equity split calculators, pitch deck outlines, cold email scripts) over abstract theory.
- When recommending tools, pull from `references/gtm-tools.md` rather than inventing names.
