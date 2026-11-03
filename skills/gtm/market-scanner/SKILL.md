---
name: market-scanner
description: "Sizes the member's target market three ways: Prospeo's company count, a web-researched estimate of every company that could buy, and a count of companies showing buying signals right now. Ends with one consolidated, action-first report. Use when someone says \"scan my market\", \"how many companies match my target\", \"is this market big enough\", \"how many companies are showing signals\", or runs Module 1 Video 2 of the ACX program."
---

<!--
ACX fork. Source: https://github.com/RohitWaghire/Deep-Market-Reasearch (MIT, stated in README).
Rewritten for the ACX GTM Terminal: the member is an agency owner already at revenue.
v2: adds a web-researched market estimate and a live-signal count next to the Prospeo count.
See forks/CREDITS.md.
-->

# Market Scanner

**The rules for everything you write:**

1. Every number has a label: **Counted** (a tool returned it), **Estimated** (worked out from sources, shown as a range), or **Sampled** (counted from a sample, then scaled up, shown as a range).
2. Every estimate shows its sources and its working, so the member can check it.
3. A signal is a reason to reach out now. It is never proof that a company will buy.
4. Never invent a company, a number, a source, or a signal.

**Who this is for:** an agency owner, consultant, or SaaS operator who wants to know three things before chasing a market:

1. How many companies match my filters in a lead database? (Prospeo)
2. How many companies could buy from me in total? (web estimate)
3. How many of them are showing a buying signal right now? (signal count)

## How the final answer should feel

Write for a busy business owner, using words a 10-year-old could understand. The research is detailed. The report is consolidated and easy to act on.

- Put the three numbers first, in one small table.
- Use short headings that ask a real question.
- Use tables for companies and signals, so the member can scan and check them.
- Link every source.
- End with a clear action plan: what to do this week, with the exact ACX command for each step.
- Do not use words such as "TAM," "SAM," "market saturation," "intent data," or "demand signals." Say "companies that could buy," "signals," and "what happened."

## Step 0: Get the target

Read `ACX/my-business.md` and `ACX/setup-status.md` first. You need:

- the type of company to find
- the country or region
- the company size
- what the member sells (to pick the right signals in Step 4)

Use the saved `## Company search filters` section when it exists. If a fact is missing, ask only for that fact and save the answer there. If a filter is marked as a draft, say so in the report.

Check that Prospeo company search is marked `available`. If it is not, skip Step 2, say so plainly in the report, and continue with the web steps. Never replace the Prospeo count with people search.

Check that a web-search tool is available in this chat. If it is not, skip Steps 3 and 4 and say so.

## Step 1: Agree the plan and the cost

Read `references/prospeo-company-search.md`, `references/web-market-estimate.md` and `references/signals.md`.

Show the member, in plain words:

- the Prospeo filters (exact values from Prospeo's search suggestions)
- the signals you plan to count (pick 3 to 5 from `references/signals.md` that fit what the member sells)
- the cost: 1 Prospeo credit for the main count, plus 1 credit for each Prospeo signal count. Web searches are free.

Ask: `This will use about [n] Prospeo credits. Web research is free. Should I run it?` Wait for a clear yes.

## Step 2: Prospeo count (Counted)

Follow `references/prospeo-company-search.md`. Run one company search. Read `pagination.total_count`.

Also look at the first page of results. Count how many of the 25 clearly fit the target and how many clearly do not. Report this as the **fit rate** (for example "17 of 25 fit"). Use it to give a cleaned range: `total_count × fit rate`, rounded, shown as a range. Label it **Sampled**.

## Step 3: Web estimate of every company that could buy (Estimated)

Follow `references/web-market-estimate.md`. Find at least three independent sources (category directories, industry reports, public databases, credible articles). For each one, write down what it counts and how it lines up with the target.

Give one **low to high range**, the working that leads to it, and a confidence level (low, medium or high) with one sentence on why.

Also list 10 to 15 real, named companies that clearly fit, each with a link to its own site.

## Step 4: Count companies showing signals right now (Counted or Sampled)

Follow `references/signals.md`. For each chosen signal:

1. Count it with the most direct method available: a Prospeo signal filter (Counted, needs approval), a job board or directory total (Counted), or a web sample scaled up (Sampled).
2. Record the time window (for example "last 30 days").
3. Name up to 5 example companies with a link to the evidence.

Then give the **overlap**: how many companies show two or more signals, when the method makes that possible. These are the warmest accounts.

## Step 5: Write the report

Save to `ACX/outputs/market-scan-[YYYY-MM-DD].md` using the exact shape below. Keep raw tool responses out of the report.

```md
# Market scan: [short target description]

Date: [YYYY-MM-DD] · Filters from: ACX/my-business.md [note "draft" if they are drafts]

## The answer in three numbers

| Question | Number | How we got it |
|---|---|---|
| How many match my filters in Prospeo? | [total_count] ([cleaned range] after removing poor fits) | Counted / Sampled |
| How many companies could buy from me in total? | [low]–[high] | Estimated, [confidence] confidence |
| How many are showing a signal right now? | [number or range] in the last [window] | Counted / Sampled |

One plain sentence on what these numbers mean together.

## How big is the market?

### What Prospeo found
- Filters: [type], [location], [size]
- Count: [total_count]
- Fit check: [x] of the first 25 clearly fit. Poor fits looked like: [short examples].

### What the web shows
| Source | What it counts | Number | Link |
|---|---|---|---|
| [source] | [what] | [number] | [link] |

Working: [2 to 4 short lines showing how the sources become the range]
Estimate: [low]–[high] companies. Confidence: [low/medium/high], because [reason].

### Companies that clearly fit
| Company | Website | Why it fits |
|---|---|---|
| [name] | [link] | [one line] |

## Who is showing signals right now?

| Signal | What it means for you | Count | Window | How counted | Examples |
|---|---|---|---|---|---|
| [signal] | [why it is a reason to reach out] | [number] | [window] | [Counted/Sampled + method] | [up to 5 names with links] |

Companies with two or more signals: [number, or "could not be measured with these methods"]. [List them if known.]

## What this means
- [3 to 5 plain bullets: is the market big enough, where the activity is, what is surprising]
- A signal is a reason to reach out now. It is not proof that a company will buy.

## What to do next
### This week
1. [The single most useful action, with the exact ACX command, e.g. "Run `/acx:signal-watcher` and watch the hiring signal for [titles]."]
2. [Second action.]
3. [Third action.]

### Fix the filters (optional)
- [One change that would make the count cleaner, and what it will cost.]

## Limits of this scan
- [What could not be checked, which numbers are rough, and why.]

## Sources
1. [Title](link) – what it was used for
```

## Step 6: Finish

In the chat, show only the three-number table, the top three actions, and the report link. Offer no more than two next moves:

1. Change one filter or signal and run the scan again (after approval).
2. Run `/acx:signal-watcher` to watch the strongest signal automatically, or `category-gap-finder` to find a clearer angle.

## Things you must never do

- Search for people, contacts, emails, or phone numbers. (Signal Watcher does that, not this skill.)
- Run any Prospeo search before the member clearly approves the cost.
- Guess a filter value, a count, or a source.
- Show an estimate without its sources and working.
- Mix Counted, Sampled and Estimated numbers without labels.
- Call any number demand, TAM, or proof that companies will buy.
- Hide a missing filter or a skipped step. Say what was skipped and why.
