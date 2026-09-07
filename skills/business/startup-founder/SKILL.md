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

## YC Application Tips

When helping users prepare YC applications, use these principles:

### General Writing Rules
- **Show, don't tell.** Don't say "I have Django experience" — say how many projects, users, scale. Paint a picture of expertise with specifics: years, hours/day, people talked to, revenue moved.
- **Be concise and simple.** No buzzwords or fancy language. Your product description should be the clearest part. Cut fluff.
- **The personal section matters.** Teams get accepted based on who they are, not just the idea. YC bets on people who will succeed eventually — make strong personal statements.
- **Ask: why are they asking this?** Every YC question has a risk-mitigation motive. Answer what they actually want to know, not just the literal question.
- **Most tips apply to B2B SaaS**, but frameworks generalize to other areas.
- **Get a recommendation** if you know someone — many applicants don't realize this system exists.
- **Always apply.** ~40% of accepted startups are just ideas. Don't self-select out.
- **Reference the official FAQ**: https://www.ycombinator.com/faq and YC's Request for Startups: https://www.ycombinator.com/rfs

### Key Question Strategies

**"How long have you known your cofounder?"**
- Real motive: cofounder conflict risk. Show you've resolved disagreements together. Mention living together, shared activities, past projects, or a conflict-resolution anecdote. The goal is proving you can fight and recover. Example: a team just split over a scheduling disagreement — you'll always think it won't happen to you, so explain why if that's the case.

**"Who writes code / does technical work?"**
- Real motive: product risk — can you build this? They need to see the right team for the idea. Both cofounders should ideally be technical. If solo, you must be technical. Outsourcing technical work (beyond cofounders) weakens the application.

**"Describe your company in 50 characters or less"**
- Be specific, not vague. Great companies summarize in a few words:
  - Rippling: "One place to run all your HR, IT, and Finance."
  - Instacart: "Marketplace for grocery delivery and pickup"
  - Zepto: "10-Minute Grocery Delivery in India"

**"Where would the company be based after YC?"**
- SF Bay Area has the highest startup success rate. If not in SF, you need a strong reason. NYC is fun — that's why you shouldn't be there (distractions). Data: 80%+ of surviving W17 batch companies are in SF.

**"How far along are you?"**
- They care about product velocity — how fast you build, ship, and get feedback. Faster iteration = more hypotheses tested = better odds. With AI tools, there's no excuse to build slowly. Show your iteration loop speed. Example: if your loop is 1 month and another team's is 1 week, in 3 months they test 12 hypotheses while you test 3. Make your loop fast.

**"Do you have users? Are they paying?"**
- Paying users are the strongest signal. If not paying, show usage depth (hours/day, frequency). 5 power users who love it > 30 who bought and forgot. You don't even need users — ~40% of accepted startups are pre-user.

**"What does your product do?"**
- Be clear in the first sentence. No "this product will revolutionize social media" — say what it actually does.
  - Before: "we revolutionize building apps using AI to make developing them faster."
  - After: "we're a devtool that turns Figma designs into React + Tailwind code."

## What YC Actually Looks For (from Paul Graham)

Core philosophy: YC's motto is "Make something people want." A startup can't force products on customers — it must sing for its supper. Everything below flows from this.

### The Larval Market
- Most huge companies start in small but growable markets ("larval markets"). Apple in 1976: not many people wanted a personal computer, but the market grew until every kid wants one (on their phone).
- The ideal: founders "living in the future" — at the leading edge of some change — building something they themselves want. Wozniak wanted a computer. Zuckerberg wanted to connect with college friends. Larry & Sergey wanted to find things on the web.
- The crucial feature: the initial market must exist right now. Some people must want it urgently enough to use it, bugs and all, from a small company they've never heard of. No initial seed group = dead.

### How to Think About the Interview

**The single most important question**: "How do you know people want this?"
- Best answer: "Because we and our friends want it" + prototype spreading by word of mouth. If you can say this truthfully, partners switch from default no to default yes.
- Airbnb didn't even hit this gold standard (wasn't spreading yet). But they had deep first-hand knowledge of hosts and guests — they could answer any question about user motivations. That was enough.

**Teach the partners about your users.** This is the best thing you can do in a YC interview. The best prep is talking to your users and finding out exactly what they're thinking. Partners want to use founders as domain experts — they need to believe you (a) know what you're talking about and (b) aren't lying.

**Interviews are not pitches.** 10 minutes, random access questions. The worst advice: "take control of the interview and deliver your message." Partners find this infuriating — it eats up 10 minutes fast. Answer the questions they ask. They dig into whatever they need to know most. Sometimes it's all about the founders, sometimes the idea, sometimes a narrow aspect.

**Be candid, don't bullshit.** Partners are professional bullshit detectors; you're an amateur bullshitter. If you don't know, say so and explain how you'd find out. If you try to bullshit and fail, they may not even tell you.

**"What could go wrong?"** — Never say "nothing." That convinces them you're a fool or a liar. Go into gruesome detail. That's what experts do. They know your idea is risky — that's what a good bet looks like at this stage: tiny probability of a huge outcome.

**Competitors** — Know who they are. Be candid about relative strengths and weaknesses. Competitors rarely kill startups (poor execution does), so they won't hold them against you too much. But they will hold it against you if you seem unaware of competitors or minimize the threat.

### What They Look for in Founders

After market potential, the next question is: will you be able to find it? This depends on:
1. **General qualities**: determination, building ability, resilience when things go wrong
2. **Specific domain expertise**: do you know this space deeply?
3. **Relationship between founders**: how strong is the friendship?

**The Airbnb example**: Their Obama- and McCain-themed cereal story was the single most important factor in getting funded. It showed resourcefulness, determination, and ability to work together. They didn't realize it — what seemed irrelevant was fabulously good evidence of founder qualities.

**Authenticity is the defining quality.** Founders who become billionaires keep working not for money but because there's nothing else they'd rather do. Mixed motives are ok (money + cool + genuine interest + unwillingness to work for someone else), but doing it *just* for money or coolness won't work at scale. Money-motivated founders take the first acquisition offer. Coolness-motivated founders find less painful ways to seem cool.

**Exploitative founders get rejected.** Bad people make bad founders — they take shortcuts, exploit cofounders first (destroying the company's foundation), then users. The early adopters a startup needs are the hardest to fool.

## Startup Evaluation Frameworks

Use these when advising founders on ideas, features, strategy, or pitch decisions.

### Pressure Test
1. What is the core assumption? Is it testable before writing code?
2. What are the three most likely ways this fails? (Be specific, not generic)
3. Does this solve a real pain people pay to solve, or is it a nice-to-have?
4. Does this strengthen founder-market fit?
5. Verdict: Strong / Weak / Pivot Required

### Customer Discovery
1. Who has this problem most acutely? (Specific person, not demographic)
2. Is the pain daily/weekly (painkiller) or occasional (vitamin)?
3. Are people currently cobbling together a solution?
4. Would they pay? How much? How do we know?
5. Design 5 open-ended discovery questions (never yes/no, never leading)

### Competitive Intelligence
1. What do customers currently do instead?
2. Who are the direct and indirect competitors?
3. What is the REAL enemy? (Usually inertia or "good enough" current behavior)
4. What is the genuine differentiation? ("We're better" is banned — be specific)
5. Would target customers actually switch from what they do today?

### First Customers
1. Where are the first 10 (or next 100) customers right now?
2. What is the manual outreach approach? (No automation, no ads)
3. What does success look like? (Behavioral criteria, not "they seem interested")
4. What is the weekly milestone plan?
5. Would these users be genuinely upset if the product disappeared?

## Decision Rules

### When proposing a NEW FEATURE:
1. Does it get us closer to the next 100 paying customers? If no → defer.
2. Does it strengthen the core differentiator? If no → question it.
3. Can it ship in under 2 weeks? If no → break it down or defer.
4. Will users notice if we DON'T build it? If no → don't build it.
5. Are we building this because users asked for it, or because we think it's cool? If the latter → stop.

### When evaluating STRATEGY changes:
1. Does this make the pitch stronger or weaker?
2. Does this accelerate or delay getting to first revenue?
3. Does this focus the product or fragment it?
4. What would PG say in YC office hours about this?

### When reviewing PITCH MATERIALS:
1. Is every claim specific and backed by data?
2. Is the financial model internally consistent? (Flag if projections vary across documents)
3. Does it answer: market real? product built? timing right? team right? competition?
4. Would this survive a 10-minute PG grilling?
5. Is the "why now?" answered convincingly?

### When assessing a STARTUP IDEA:
1. Is this a real problem the founder personally experiences?
2. Is this a painkiller or a vitamin?
3. What's the wedge — the narrow initial market that can be dominated?
4. Is there a regulatory, technological, or cultural tailwind?
5. Why hasn't someone built this already? (If "no one thought of it" → suspicious. If "it's hard" → good.)

## Anti-Patterns (PG Hates These)

- **"We have no competitors"** — Always wrong. Current behavior IS the competitor. Inertia IS the competitor.
- **"Our TAM is $XB"** — Meaningless without SAM and realistic capture rate. "We need 0.1% of a $100B market" is a red flag, not a selling point.
- **"We just need to add X feature"** — Feature addition is a crutch. Focus on making existing features loved.
- **Inconsistent financials** — If the pitch says $40M ARR and the business plan says $5M, you've lost all credibility.
- **Building for hypothetical users** — Build for the users you have, not the millions you imagine.
- **"It's like X but for Y"** — Lazy positioning. Define yourself by what you do, not by analogy.
- **Solving problems that don't exist yet** — Don't build enterprise features before you have enterprise customers.
- **Celebrating vanity metrics** — Downloads, sign-ups, page views mean nothing without retention and engagement.
- **"We're stealth"** — Nobody cares about your idea. Execution is everything. Stealth is usually an excuse for not having users.
- **Premature scaling** — Hiring 15 people before finding product-market fit is how startups die.
- **"We need more features to launch"** — You don't. Launch now.
- **Confusing effort with progress** — Working 80 hours/week on the wrong thing is worse than working 40 on the right thing.

## More PG Principles (From His Essays)

### "Do Things That Don't Scale"
- Recruit users manually. Personal acquisition is essential, not shameful.
- Provide exceptional service that big companies can't match.
- Start with a deliberately narrow market — "contained fire" strategy.

### "How to Get Startup Ideas"
- "The way to get startup ideas is not to try to think of startup ideas. It's to look for problems, preferably problems you have yourself."
- Build something a small number of people urgently need, not something many mildly want.
- "Live in the future, then build what's missing."
- Overcome "schlep blindness" — the unconscious filtering of ideas that involve hard, tedious work.

### "Startup = Growth"
- "The only essential thing is growth. Everything else we associate with startups follows from growth."
- Measure weekly growth rate. YC targets: 5-7% solid, 10%+ exceptional, 1% trouble.
- Revenue is the best metric; active users work as proxy for early-stage.

### "Founder Mode"
- Don't limit yourself to communicating through direct reports. Stay involved in details.
- Trust your instincts when everyone disagrees — that's often the rare exception where gut is right.

### "How to Convince Investors"
- "Convince yourself that your startup is worth investing in, and then when you explain this to investors they'll believe you."
- "Make the truth good, then just tell it."
- Answer "why now?" — what external trend creates this opportunity.

### "How to Raise Money"
- Treat investors as saying no till they unequivocally say yes.
- The less you need investment, the easier it is to get.
- Never sell more than 25% in any round.

### "What We Look for in Founders"
- Determination > intelligence. "You're going to hit a lot of obstacles."
- Flexibility: "The best metaphor is a running back" — determined but adjusts path.
- Strong co-founder relationships: "Startups do to the relationship between founders what a dog does to a sock."

### "The 18 Mistakes That Kill Startups"
1. Single founder
2. Bad location
3. Marginal niche — "You can only avoid competition by avoiding good ideas"
4. Derivative idea
5. Obstinacy — "Most successful startups end up doing something different than originally intended"
6. Hiring bad programmers
7. Wrong platform
8. Slowness in launching
9. Launching too early
10. No specific user in mind
11. Raising too little
12. Spending too much
13. Raising too much
14. Poor investor management
15. Sacrificing users for profit
16. Not getting hands dirty
17. Founder fights
18. Half-hearted effort

### "Startups in 13 Sentences"
1. Pick good cofounders
2. Launch fast
3. Let your idea evolve
4. Understand your users
5. Better to make a few users love you than many feel ambivalent
6. Offer surprisingly good customer service
7. You make what you measure
8. Spend little
9. Get ramen profitable
10. Avoid distractions
11. Don't get demoralized
12. Don't give up
13. Deals fall through — don't depend on pending deals

### "Default Alive or Default Dead?"
- Know which one you are. "Half the founders I talk to don't know."
- Hiring too fast is by far the biggest killer of startups that raise money.
- Develop Plan B (lean operations) alongside Plan A (fundraising).

### "The Fatal Pinch"
- High burn + mediocre growth + assumption that funding will come = death.
- If you're in trouble, redirect ALL effort toward revenue.

### "Frighteningly Ambitious Startup Ideas"
- Start small deceptively: "Don't say you're going to replace email. Just say you're building todo-list software."
- "The popular image of the visionary is someone with a clear view of the future, but empirically it may be better to have a blurry one."

## Early-Stage Growth Playbook

Practical principles for getting from 0 to first 100 users.

### The Cold Start Problem
- Start with an invite-only alpha. Let density build in one niche first — don't go global day 1.
- Target: OSS contributors, hackathon folks, Twitter/X devs. Find where your niche already gathers.
- One tightly concentrated community > spread thin across many.

### User Acquisition (Search Problem, Not Persuasion)
- Reach out to people, market as much as you can, do personal onboards.
- It's more of a search problem than a persuasion problem — find the people who already have the pain.
- Use targeted personal outreach. Not scraped lists, not cold blasts.
- Early users not only give feedback but they also shape how your growth takes place.

### Monetization Timing
- Charge real money early. Feedback over revenue initially, but don't give it away forever.
- Don't monetize too early — trust dies. Get the product right first, then layer in revenue.
- Possible early revenue levers: boost visibility, events/meetups, premium insights.

### Build Philosophy
- First version shouldn't be min viable product; it should be **min evolvable product**.
- Launch early. Study early users closely. Experiment and fail fast, talk to users.

## Output style
- Match the directness of the user. If they ask a narrow question ("how do I register in India"), answer that narrowly. Do not force the whole framework on them.
- Prefer concrete next actions and templates (equity split calculators, pitch deck outlines, cold email scripts) over abstract theory.
- When recommending tools, pull from `references/gtm-tools.md` rather than inventing names.
