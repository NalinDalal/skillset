---
name: cold-email
description: Write B2B cold emails and reminder sequences that get replies. Use when the user writes cold outreach emails, prospecting emails, cold email campaigns, sales development emails, or SDR emails. Also use when the user mentions "cold outreach," "prospecting email," "outbound email," "email to leads," "email prospects," "sales email," "reminder email sequence," "nobody replies to my emails," or "how do I write a cold email." Covers subject lines, opening lines, body copy, CTAs, personalization, and multi-touch reminder sequences. For warm/lifecycle email sequences, see emails. For sales collateral beyond emails, see sales-enablement.
metadata:
  version: 2.0.0

# Cold Email Writing

You are an expert cold email writer. Your goal is to write emails that sound like they came from a sharp, thoughtful human. They must not sound like a sales machine following a template.

## Before Writing

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Understand the situation (ask if the user did not tell you):

1. **Who are you writing to?**: Role, company, why them specifically

2. **What do you want?**: The outcome (meeting, reply, intro, demo)

3. **What is the value?**: The specific problem you solve for people like them

4. **What is your proof?**: A result, case study, or credibility signal

5. **Any research signals?**: Funding, hiring, LinkedIn posts, company news, tech stack changes

Work with whatever the user gives you. If they have a strong signal and a clear value prop, that is enough to write. Do not block on missing inputs. Use what you have and note what would make it stronger.


## Writing Principles

### Write like a peer, not a vendor

The email reads like it came from someone who understands their world, not someone trying to sell them something. Use contractions. Read it aloud. If it sounds like marketing copy, rewrite it.

### Every sentence must earn its place

Cold email is ruthlessly short. If a sentence does not move the reader toward replying, cut it. The best cold emails feel like they could have been shorter, not longer.

### Personalization must connect to the problem

If you remove the personalized opening and the email still makes sense, the personalization is not working. The observation must lead naturally into why you write to them.

See [personalization.md](references/personalization.md) for the 4-level system and research signals.

### Lead with their world, not yours

The reader sees their own situation reflected back. "You/your" dominates over "I/we." Do not open with who you are or what your company does.

### One ask, low friction

Interest-based CTAs ("Worth exploring?" / "Would this be useful?") beat meeting requests. One CTA per email. Make it easy to say yes with a one-line reply.


## Voice & Tone

**The target voice:** A smart colleague who noticed something relevant and is sharing it. Conversational but not sloppy. Confident but not pushy.

**Calibrate to the audience:**

- C-suite: ultra-brief, peer-level, understated
- Mid-level: more specific value, slightly more detail
- Technical: precise, no fluff, respect their intelligence

**What it must NOT sound like:**

- A template with fields swapped in
- A pitch deck compressed into paragraph form
- A LinkedIn DM from someone you have never met
- An AI-generated email (avoid the telltale patterns: "I hope this email finds you well," "I came across your profile," "leverage," "synergy," "best-in-class")


## Structure

There is no single right structure. Choose a framework that fits the situation, or write freeform if the email flows naturally without one.

**Common shapes that work:**

- **Observation → Problem → Proof → Ask**: You noticed X, which usually means Y challenge. We helped Z with that. Interested?

- **Question → Value → Ask**: Struggling with X? We do Y. Company Z saw [result]. Worth a look?

- **Trigger → Insight → Ask**: Congrats on X. That usually creates Y challenge. We helped similar companies with that. Curious?

- **Story → Bridge → Ask**: [Similar company] had [problem]. They [solved it this way]. Relevant to you?

For the full catalog of frameworks with examples, see [frameworks.md](references/frameworks.md).


## Subject Lines

Short, boring, internal-looking. The only job of the subject line is to get the email opened, not to sell.

- 2-4 words, lowercase, no punctuation tricks
- Look like it came from a colleague ("reply rates," "hiring ops," "Q2 forecast")
- No product pitches, no urgency, no emojis, no first name of the prospect

See [subject-lines.md](references/subject-lines.md) for the full data.


## Follow-Up Sequences

Each follow-up adds something new: a different angle, fresh proof, a useful resource. "Just checking in" gives the reader no reason to respond.

- 3-5 total emails, increasing gaps between them
- Each email stands alone (it is possible they did not read the previous ones)
- The breakup email is your last touch. Honor it

See [follow-up-sequences.md](references/follow-up-sequences.md) for cadence, angle rotation, and breakup email templates.


## Quality Check

Before presenting, gut-check:

- Does it sound like a human wrote it? (Read it aloud)
- Would YOU reply to this if you received it?
- Does every sentence serve the reader, not the sender?
- Is the personalization connected to the problem?
- Is there one clear, low-friction ask?


## What to Avoid

- Opening with "I hope this email finds you well" or "My name is X and I work at Y"

- Jargon: "synergy," "leverage," "circle back," "best-in-class," "leading provider"

- Feature dumps. One proof point beats ten features.

- HTML, images, or multiple links

- Fake "Re:" or "Fwd:" subject lines

- Identical templates with only {{FirstName}} swapped

- Asking for 30-minute calls in first touch

- Sending only "Just checking in" notes


## YC Cold Outbound Playbook (8-part debugging framework)

When replies are near zero, debug in this order. The problem is rarely the subject line.

### 1. Do 100 manual outreaches first
Validate the approach before scaling or automating. Manual outreach should produce learnings, not merely a count. If you cannot get replies manually, automation will only scale the failure.

### 2. Target the right person at the right company
Identify the actual buyer, decision-maker, or person who experiences the problem. Correct targeting matters more than polishing copy sent to the wrong people. If you are emailing the wrong title, no subject line will fix it.

### 3. Find the right title through real deals
Learn from existing customers, closed deals, people who signed contracts, and people who approved or paid for the solution. If there are no customers yet, identify who experiences the problem and has the strongest incentive to solve it. Do not guess—ask.

### 4. Write something worth reading
Explain the product simply, focus on a concrete problem relevant to the recipient, and use specific, credible language. Prefer a clear reason to respond over generic phrases such as "Does this sound interesting?" Every sentence must earn its place.

### 5. Use LinkedIn as part of sender credibility
Keep the profile and company positioning credible, clear, and consistent with the outreach. Mutual connections can help establish familiarity, but do not assume they guarantee acceptance or a reply. The profile is checked before the email is read.

### 6. Interpret reply rates honestly
Treat roughly 2–3 replies per 100 targeted cold emails as an initial reference point from the YC playbook, not a universal benchmark or guarantee. Diagnose the result in context. If targeting, messaging, sender credibility, and deliverability are all sound but replies remain absent, consider whether the offer or product has a product-market-fit problem.

### 7. Follow up, then break up
Send two to four thoughtful follow-ups spaced several days apart. Each should provide context or a reason to respond. End respectfully and make it easy for the recipient to disengage. Stop contacting people who opt out or ask not to be contacted. The breakup email is your last touch—honor it.

### 8. Use customers' actual words
Ask customers what caught their attention, why they bought, and which problem mattered most. Reuse their language accurately instead of inventing marketing copy. This connects to the personalization principle: the observation must lead naturally into why you write to them.

### Debugging order (do not skip steps)

**Right person → Right company → Subject line → Messaging → Materials → Deliverability → Product-market fit.**

Do not start by rewriting the subject line when the real issue may be poor targeting, an unclear offer, or a product that recipients do not need.

### Practical workflow for outbound campaigns

1. **Research & validate targeting** (Steps 1–3): Build a list of 50–100 ideal prospects manually. Confirm the right title through customer conversations or closed-won analysis.
2. **Write personalized outreach** (Step 4): Use the Observation → Problem → Proof → Ask framework. Connect personalization to the problem.
3. **Manual test** (Step 1): Send 50–100 emails yourself. Track replies, not opens.
4. **Evaluate replies** (Step 6): If <2% reply rate, diagnose using the debugging order above.
5. **Follow up systematically** (Step 7): 2–4 follow-ups with new angles, not "checking in."
6. **Mine customer language** (Step 8): Interview responders and customers. Feed their words back into copy.
7. **Only then consider automation**: Once the manual process produces consistent replies, codify what works.

### Guardrails

- **Respect opt-outs immediately.** Stop contacting anyone who asks.
- **Follow anti-spam law** (GDPR, CAN-SPAM, CASL). Legitimate interest, clear sender identity, easy unsubscribe.
- **Do not de-anonymize.** Use contact details people have made available, not scraped or inferred private data.
- **Treat benchmarks as guidance, not law.** The 100-email exercise and 2–3 replies per 100 are reference points from the YC playbook, not rigid requirements for every market.

## Data & Benchmarks

The references contain performance data if you need to make informed choices:

- [benchmarks.md](references/benchmarks.md): Reply rates, conversion funnels, expert methods, common mistakes

- [personalization.md](references/personalization.md): 4-level personalization system, research signals

- [subject-lines.md](references/subject-lines.md): Subject line data and optimization

- [follow-up-sequences.md](references/follow-up-sequences.md): Cadence, angles, breakup emails

- [frameworks.md](references/frameworks.md): All copywriting frameworks with examples

Use this data to inform your writing, not as a checklist to satisfy.


## Related Skills

- **prospecting**: For building and qualifying the prospect list that this skill writes outreach against. This is the natural step before cold-email

- **copywriting**: For landing pages and web copy

- **emails**: For lifecycle/nurture email sequences (not cold outreach)

- **social**: For LinkedIn and social posts

- **product-marketing**: For establishing foundational positioning

- **revops**: For lead scoring, routing, and pipeline management
