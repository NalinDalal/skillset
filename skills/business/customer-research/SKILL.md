---
name: customer-research
version: 1.0.0
description: "Conduct, analyze, or synthesize customer research. Covers transcript analysis, online signal mining, interviews, surveys, persona generation, and JTBD frameworks."
triggers:
  - customer research
  - ICP research
  - talk to customers
  - analyze transcripts
  - customer interviews
  - survey analysis
  - voice of customer
  - VOC
  - build personas
  - jobs to be done
  - JTBD
  - review mining
  - Reddit mining
  - PMF survey
---

## When to use

Use when the user needs to conduct, analyze, or synthesize customer research. Trigger on mentions of customer research, ICP, interviews, transcripts, surveys, support ticket analysis, voice of customer, personas, jobs to be done, review mining, Reddit mining, community research, PMF survey, or Sales Safari.

## Three modes of research

### Mode 1: analyze existing assets

You have raw research material (transcripts, surveys, reviews, tickets). Your job is to extract signal.

### Mode 2: mine existing signal online

You gather intel from online sources (Reddit, G2, forums, communities, review sites) where customers speak without a filter.

### Mode 3: go ask (primary research)

No signal exists yet, or you need answers only the customer can give. You run interviews and surveys directly.

Most engagements combine modes. Mine what is already public (Mode 2) before you ask (Mode 3). It tells you what to ask and in whose words.

## Mode 1: analyzing existing research Assets

### Asset types

**Customer interview or sales call transcripts.** Extract pains, triggers, desired outcomes, language used, objections, alternatives considered. Look for the moment they decided to look for a solution, what they tried before, and what success looks like to them.

**Survey results.** Segment responses by customer tier, use case, or tenure before drawing conclusions. Flag what open-ended answers say vs. what multiple-choice answers say. They often conflict. Identify the 20% of responses that contain the most useful signal.

**Customer support conversations.** Mine for recurring complaints, confusion points, feature requests, and "I wish it could" language. Categorize tickets before analyzing. Separate bugs from confusion from missing features from expectation mismatches.

**Win/loss interviews and churned customer notes.** Wins: what tipped the decision? What almost made them choose a competitor? Losses and churn: was it price, features, fit, timing, or something else? Segment by reason. Do not average across different churn causes.

**NPS responses.** Passives and detractors are higher signal than promoters for improvement work. Pair scores with verbatims. A 9 with a specific complaint beats a 10 with no comment.

### Extraction framework

For each asset, extract:

1. **Jobs to be done.** What outcome is the customer trying to achieve? Functional job (the task itself), emotional job (how they want to feel), social job (how they want to be perceived).

2. **Pain points.** What is frustrating, broken, or inadequate about their current situation? Prioritize pains mentioned unprompted and with emotional language.

3. **Trigger events.** What changed that made them seek a solution? Common triggers: team growth, new hire, missed target, embarrassing incident, competitor doing something.

4. **Desired outcomes.** What does success look like in their words? Capture exact quotes, not paraphrases.

5. **Language and vocabulary.** Exact words and phrases customers use. This is gold for copy. "We were drowning in spreadsheets" beats "manual process inefficiency."

6. **Alternatives considered.** What else did they look at or try? Includes doing nothing, hiring someone, or building internally.

### Synthesis steps

After extracting from individual assets:

1. Cluster by theme. Group similar pains, outcomes, and triggers across assets.
2. Frequency and intensity scoring. How often does a theme appear, and how strongly is it felt?
3. Segment by customer profile. Do patterns differ by company size, role, use case, or tenure?
4. Identify the "money quotes." 5 to 10 verbatim quotes that best represent each theme.
5. Flag contradictions. Where do customers say one thing but do another?

### Confidence levels

Label every insight with a confidence level:

| Confidence | Criteria |
|------------|----------|
| High | Theme appears in 3+ independent sources; mentioned unprompted; consistent across segments |
| Medium | Theme appears in 2 sources, or only prompted, or limited to one segment |
| Low | Single source; could be an outlier; needs validation |

**Recency window.** Weight sources from the last 12 months more heavily. Markets shift. A 3-year-old transcript may reflect a different product and buyer.

**Sample bias checks.** Online reviewers skew toward power users and people with strong opinions. Support tickets skew toward problems, not value. Reddit skews technical and skeptical vs. mainstream buyers. Factor this in when drawing conclusions about all customers.

**Minimum viable sample.** Do not build personas or draw messaging conclusions from fewer than 5 independent data points per segment.

## Mode 2: digital watering hole research

Online communities are where customers speak without a filter. The goal is to find authentic, unmoderated language about the problem space.

### Where to look

| ICP type | Primary sources |
|----------|----------------|
| B2B SaaS / technical buyers | Reddit (role-specific subs), G2/Capterra, Hacker News, LinkedIn, Indie Hackers |
| SMB / founders | Reddit (r/entrepreneur, r/smallbusiness), Indie Hackers, Product Hunt, Facebook Groups |
| Developer / DevOps | r/devops, r/programming, Hacker News, Stack Overflow, Discord servers |
| B2C / consumer | App store reviews (1 to 3 star), Reddit hobby/lifestyle subs, YouTube comments |
| Enterprise | LinkedIn, industry analyst reports, G2 Enterprise filter, job postings |

**Quick decision guide.** Have a product category? Start with G2/Capterra reviews. Need raw language? Reddit and YouTube comments. Need trigger events? LinkedIn posts, job postings, Hacker News "Ask HN" threads.

### What to extract from each source

| Field | What to capture |
|-------|----------------|
| Source | Platform, thread URL, date |
| Verbatim quote | Exact words, do not paraphrase |
| Context | What prompted the comment? |
| Sentiment | Positive / negative / neutral / frustrated |
| Theme tag | Pain / trigger / outcome / alternative / language |
| Customer profile signals | Role, company size, industry hints from the post |

### Synthesis template

After gathering from multiple sources, synthesize into:

```
## Top Themes (ranked by frequency x intensity)

### Theme 1: [Name]
Summary: [1-2 sentences]
Frequency: Appeared in X of Y sources
Intensity: High / Medium / Low
Representative quotes:
- "[exact quote]" -- [source, date]
- "[exact quote]" -- [source, date]
Implications: What this means for messaging, product, or positioning

### Theme 2: ...
```

## Mode 3: interviews and surveys (primary research)

When there is no signal yet, or you need answers only the customer can give, go ask. This is the highest-signal, first-party research. Weight it above scraped sources when they conflict.

### First rule of customer research

You do not talk about customer research. Keep calls casual so customers give real answers, not performed ones.

### Prove yourself wrong, not right

Research is disconfirmation, not validation. The goal is to find out where your assumptions are wrong.

### Recruiting your best customers

Segment the CRM by deal size, short sales cycle, and low churn. Ask sales and CS for referrals. Always close with "who else should we talk to?"

### Outreach and incentives

Aim for 10 calls. Be happy with 5. Offer $50/call, $5/survey.

### 5-why laddering

Keep asking why to tunnel down from surface answers to root causes. Worked example: laddering a churn answer down to net revenue retention.

### The PMF survey (Sean Ellis / Superhuman)

Ask: "How would you feel if you could no longer use [product]?" The benchmark is 40% "very disappointed." Superhuman reached 58%.

## Persona generation

### When there are no reviews yet

Early-stage products lack first-party review data. Do not invent personas. Walk outward through proxy sources, in order:

1. Your own differentiator. What the product does differently defines who feels that difference most.
2. Direct competitors' reviews. Their customers describe the problem space in their words.
3. Comparable products on marketplaces. Amazon or app-store reviews for adjacent solutions.
4. Adjacent brands sharing the audience. What else this buyer buys.

Personas built this way are provisional. Tag each with its proxy source, and replace proxy evidence with first-party evidence as real reviews arrive.

Do not create a persona until you have at least 5 to 10 data points from a consistent segment.

### Persona structure

```
## [Persona Name] -- [Role/Title]

Profile
- Title range: [e.g., "Marketing Manager to VP of Marketing"]
- Company size: [e.g., "50-500 employees, Series A-C SaaS"]
- Industry: [if narrow]
- Reports to: [who]

Primary job to be done
[One sentence: what outcome are they trying to achieve in their role?]

Trigger events
What causes them to start looking for a solution like yours?
- [trigger 1]
- [trigger 2]

Top pains
1. [Pain, in their words if possible]
2. [Pain]
3. [Pain]

Desired outcomes
- [What success looks like to them]
- [How they measure it]

Objections and fears
- [What makes them hesitate to buy or switch]

Alternatives they consider
- [Competitor, DIY, do nothing, hire someone]

Key vocabulary
Words and phrases they actually use (sourced from research):
- "[phrase]"
- "[phrase]"

How to reach them
- Channels: [where they spend time]
- Content they consume: [formats, topics]
```

### Persona anti-patterns

- Do not name them cutely. It is often a distraction.
- Do not average across segments. A persona that represents everyone represents no one.
- Do not invent details. If you do not have data on something, leave it blank.
- Revisit quarterly. Personas decay as your market and product evolve.

## Deliverable formats

Depending on what the user needs, offer:

1. Research synthesis report: themes, quotes, patterns, and implications
2. VOC quote bank: organized verbatim quotes by theme, for use in copy
3. Persona document: 1 to 3 personas built from the research
4. Jobs-to-be-done map: functional, emotional, and social jobs by segment
5. Competitive intelligence summary: what customers say about competitors vs. you
6. Research gap analysis: what you still do not know and how to find it

Ask which deliverable(s) they need before generating output.

## Questions to ask

1. What is the goal? Improve messaging? Build personas? Find product gaps? Understand churn?
2. What do you already have? Transcripts, surveys, tickets, G2 reviews, or nothing?
3. Who is the target segment? All customers, a specific tier, churned users, prospects who did not buy?
4. What is your product? If not already known.
5. What do you want delivered? Synthesis report, persona, quote bank, competitive intel.

Lead with questions 1 and 2. Follow up as needed.
