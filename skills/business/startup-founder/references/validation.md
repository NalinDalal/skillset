# Idea Validation

## The Mom Test (core method)
Talk to potential customers about their life/problem, not your idea. Rules:
- Ask about their past behavior and specific problems, not hypothetical future behavior ("would you use X" is a lie-generating question).
- Do not pitch. Do not mention your idea until the end, if at all.
- Good questions: "Walk me through the last time you dealt with [problem]." "What did you try to fix it?" "What does that cost you (time/money)?"
- Bad questions: "Would you pay for a tool that does X?" (people say yes to be nice)
- Do 10-15 of these conversations before writing a line of product code. Look for people who have already tried to solve the problem themselves (paid tools, spreadsheets, hacky workarounds). That is signal of real pain.

## Fast market sizing
- Top-down (market reports) is usually wrong for early-stage. Prefer bottom-up: how many potential customers exist, realistic price, realistic capture rate in year 1-2.
- A small market you can dominate beats a huge market you cannot crack. Paul Graham states the "a market of one" thesis: build for a specific, underserved user first. YC gives the same advice: start narrow, expand later.

## Red flags an idea isn't ready
- You cannot name 5 specific people or companies who have this problem today.
- The "customers" you are describing are hypothetical ("companies like X would want this").
- Nobody you talked to already spent money or serious time trying to solve it.
- The idea only works if a platform/regulation/behavior change happens first.

## Green flags
- People are already duct-taping a solution (Excel, Zapier chains, manual process). You can replace that.
- People ask "when can I use this" unprompted during discovery calls.
- The problem costs the person measurable time or money today.

## For technical/dev-tooling ideas specifically
- Check GitHub issues, Reddit (r/webdev, r/SaaS, r/startups), Hacker News "Who's Hiring"/"Show HN" threads, and Indie Hackers for existing pain points before building.
- Competitor exists ≠ bad sign. No competitor at all is often a red flag (nobody found a business there), not a green one.

---

## Build in Public + Cold Outreach Playbook (DriftLock Case Study)

### Core Philosophy
**Build in public + talk to potential users + talk to founders + build based on what you learn.**
Not "launch and hope people come."

**Goal for early weeks:** Problem validation + design partners, not "getting users."

---

### 1. Start Build in Public Now (Day 1)

Don't wait until polished. First post example:

> "I'm building DriftLock.
> The idea: APIs change, but the code using them doesn't magically update.
> I'm exploring a tool that detects API changes affecting your codebase and auto-generates migration PRs.
> Starting with Stripe.
> Still at design stage — building in public, sharing what I learn.
> If you've ever had an API migration unexpectedly break your code, I'd love to hear how you handled it."

**Key:** You're not pretending you have a product. You're asking people with the problem to talk to you.

---

### 2. Don't Ask "Would You Use This?"

**Biggest trap.** People say "yeah that's cool" to be nice. That's noise.

**Instead ask about actual experience:**
- "When was the last time an API change caused an issue for your team?"
- "How did you discover it?"
- "Who had to fix it?"
- "How long did it take?"
- "Do you have any automation around API migrations today?"
- "What happens when Stripe changes something?"

**You're discovering if you're solving a painful existing workflow**, not asking for idea validation.

---

### 3. Build a Spreadsheet of 100 Potential Users

Not 100 YC founders. **Potential DriftLock users.**

**Look for:**
- Engineers/founders who use Stripe
- Build SaaS
- Work at startups
- Maintain APIs/integrations
- Have public GitHub repos
- Write about engineering
- Have dealt with migrations

**Outreach template (highly personalized, small numbers):**

> "Hey! I'm building something around API migrations and noticed you work quite a bit with Stripe.
> I'm still in design stage, not trying to sell anything. Trying to understand how teams deal with breaking/API-version changes.
> Have you ever had a Stripe/API change require a bunch of code changes on your side?
> Would love to hear how you handled it."

**Why this works:** Easier for a stranger to answer than "can you try my product?" — because you don't have one yet.

---

### 4. DM YC/Experienced Founders Now (Not After Launch)

Don't approach as "please advise my startup." Approach as "you've crossed the bridge I'm approaching."

> "Hey Dany, congrats on getting into YC!
> I'm a full-stack developer building DriftLock, a dev tool around detecting API changes and generating migration PRs.
> Just started — figuring out product and first users.
> Reaching out to founders who've gone through early stage. Open to a quick 15-20 min chat? Mainly want to hear how you got first users and what you learned."

Low response rate is normal. Don't take it personally.

---

### 5. Turn Design Docs Into Content

Your thinking IS the content. You don't need manufactured achievements.

Examples:
> "I'm designing DriftLock. One question: should API migrations be detected from OpenAPI specs, runtime traffic, SDK versions, or some combination?"

> "I initially thought detecting API changes would be the hard part. While designing, I realized identifying which lines of application code are affected may actually be harder."

---

### 6. Milestones That Matter (Not Waitlist)

| Milestone | Signal Strength |
|-----------|-----------------|
| M0: Design validated | Weak |
| M1: First API change detected | Technical |
| M2: First affected code location identified | Technical |
| M3: First migration PR generated | Technical |
| M4: Stranger runs DriftLock | **Strong** |
| M5: Stranger gets useful result | **Stronger** |
| M6: 5 people use it | Strong |
| M7: Someone asks to keep using it | **Very Strong** |
| M8: Someone pays | **Strongest** |

**First meaningful external milestone = one stranger gets value without you explaining every step.** Waitlist is a weak signal.

---

### 7. Move Quickly = Reduce Time Between Assumption and Evidence

Not "build entire thing fast." **"Reduce time between assumption and evidence."**

**Loop every week:**
Build something → publish what you built → talk to 5–10 people → learn → update design → build again

**Example public journey:**
- Day 1 — Problem I'm investigating
- Day 3 — What I learned from 5 engineers
- Day 7 — Architecture I'm considering
- Day 10 — First prototype detects breaking change
- Day 14 — First generated migration PR
- Day 18 — Someone outside my network tried it
- Day 21 — Here's what broke

---

## Cold Outreach Mastery

### Install Your Fucking Software on Other People's Systems
You will network a lot and have something valuable.

### Ask People to Roast Your Product
Respond to your cold email.

### Volume
~20k outreach avg needed. Do 100 by hand, literally.

### Subject Lines & Preview Text
- **Avoid:** "inquiry," "exclusive," "seeking" → sounds like bot
- **Experiment** with creative lines
- **First 20-30 words** of body show in preview — make them count

### Message Structure (5-8 sentences email, 2-5 LinkedIn)
- Be informal
- Explain how you want to help them
- One-sentence value prop
- Social proof: other customers OR very relevant background
- **Specific CTA:** "Got 20 mins this week?" (not "does this sound interesting?")
- Include calendar link

### Targeting Beats Perfect Message
- Think: does this person actually have this pain point?
- Check last success → reach out to similar people
- Who in org has most to gain from buying?
- Company size matters
- Verify individually if they're right fit

### Start With Warm Network
Friends, family, literally everyone → ask for intros

### LinkedIn Optimization
- Profile pic
- Banner as an ad
- 1-line description for company
- Elevate anything buyer would care about
- Build mutual connections

### Reply Rate Benchmarks
**2-3 replies per 100** is normal. Improve by:
- Contact right person
- Contact right companies
- Good subject lines
- Good message
- Good materials
- Deliverability

### Follow-Up Cadence
4 follow-ups over ~10 days (5 total touches). Break up message — make things clear.

### Block Out Time
- How many msgs/day
- Time per msg
- When to send

### Use Customer Language
Ask existing customers: "What got your attention about my message?"
"How do you think about my product?"
Use their words in your outreach.

---

## Build in Public: Video & Multi-Platform

**Put up videos everywhere:** YouTube, X/Twitter, LinkedIn, TikTok, Reels, Shorts.

**Content types that work:**
- Day-in-the-life building
- "Here's what I learned today" (2-3 min)
- Live coding / architecture walkthroughs
- Problem deep-dives (not solution pitches)
- User conversation highlights (anonymized)
- Milestone updates (M1-M8 from above)
- Failures and what broke

**Frequency:** 3-5 posts/week minimum. Consistency > quality at start.

**Repurpose:** One recording → clip for X, LinkedIn, Shorts, TikTok. Long-form for YouTube.

---

## Warm Intro Networks (Exhaust Before Cold)

**Tier 1 — Direct:**
- Close friends
- Current/former coworkers
- School alumni (same cohort, same major, same clubs)
- Employer alumni network (ex-Google, ex-Stripe, ex-YC, etc.)

**Tier 2 — One Hop:**
- Friends of friends (ask: "Who do you know who deals with Stripe/API migrations?")
- Former coworkers' current networks
- Alumni one degree out

**Tier 3 — Community:**
- Indie Hackers / YC co-founder matching / OnDeck / Pioneer / HF0 alumni
- Discord/Slack communities you're active in
- Conference/meetup contacts

**How to ask:**
> "Hey [Name], I'm building DriftLock — a tool that detects API changes and auto-generates migration PRs. Starting with Stripe.
> I'm looking to talk to engineers who've felt this pain. Know anyone who:
> - Maintains Stripe integrations
> - Has dealt with breaking API changes
> - Builds SaaS with payment integrations
> Would appreciate an intro. Happy to share what I'm learning too."

**Track in your 100-person spreadsheet:** Source column (warm Tier 1/2/3 vs cold). Warm intros convert 10-50x better.