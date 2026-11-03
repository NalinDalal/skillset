---
name: full-market-outbound
description: "Playbook for cold outbound at scale: mapping a whole market, scoring timing, splitting Google and Microsoft inboxes, writing cold email, adding the phone, and running a reply layer that turns answers into meetings. Use when the user asks about cold email, cold outreach, outbound, lead lists, ICP scoring, ABM vs volume, deliverability, warmup, reply rates, booking meetings, SDR playbooks, or 'why does outbound stall by month three'. Also use for list building with Apollo, Google Maps, directories or lookalikes, for cold email frameworks, for domain and inbox setup, and for a 90-day outbound plan. Source: Christian Plascencia, Pipeline.tech."
---

# Full-Market Outbound

10M+ cold emails, $70M+ in pipeline, 100+ B2B companies. Every engagement runs the same 7 layers in the same order: strategy, offer, list, infrastructure, copy, testing, replies. Each layer sets a ceiling on the next one, so a broken layer above cannot be fixed below it.

| Layer | The number that governs it |
|---|---|
| Strategy | 1 shared pain per segment |
| Offer | 25 to 10,000 contacts per lead |
| List | 50 to 60% fit, cut under 80, land at 90 to 95% |
| Infrastructure | 15 cold sends per Google inbox per day |
| Copy | Under 65 words |
| Testing | 1,000 sends before anyone has an opinion |
| Replies | 5 minutes to a human |

When a campaign underperforms, diagnose in this order: infrastructure, subject line, copy, offer, market size. Most problems live in the first two.

## 1. Strategy

Three inputs, before anyone buys a domain:

- The last 20 recorded sales calls.
- The last 10 closed-won accounts.
- The last 10 closed-lost accounts, with the reason.

The calls give the pain that repeats, in the buyer's own words. "Pipeline problems" tells you nothing. The exact phrase a buyer used on a call goes into the copy later. For each won account, write down what was observably true before the deal: a role they were hiring for, a tool they had just added, a complaint pattern in their reviews. That list becomes the scoring rubric for the whole market.

The output is an ICP, a TAM estimate, 4 offers to test, and the first angles. A model can draft all of it in about 30 seconds. Then check it against the transcripts and the won accounts, and align it with the client in a workshop.

Write personas as situations, not titles. "VP Sales" is everyone with the title. "VP who inherited 8 reps on a 2019 stack" is 400 people with the same problem this quarter. Write the disqualifiers with the same care, because a model with no disqualifiers invents reasons for companies to qualify.

Build every segment around 1 pain the whole segment shares. That is what lets one message fit thousands of people without reading as generic. The list is the message.

Market size decides the motion, before any copy exists:

| Contacts in the market | Motion |
|---|---|
| Under 10k | ABM. Top 100 to 1,000 accounts, deep research, a custom angle per account. |
| 10k to 100k | Automated outbound at 10k to 100k emails a month. |
| 100k+ | High volume. 90% of effort on deliverability, offer, and replies. |

Do not run a volume play on a 4,000-contact market. Do not hand-research accounts when the market holds 400k.

## 2. Offer

The offer moves the number more than any other variable. Contacts per lead:

| Offer | Contacts per lead |
|---|---|
| Blue ocean, one of a kind | 25 to 200 |
| Good, with real product-market fit | 200 to 500 |
| Decent or crowded | 500 to 1,000 |
| Difficult: SEO, cybersecurity, recruiting | 1,000 to 10,000 |

That is a 400x swing on one variable, with the same scripts and the same infrastructure. Fix the offer first.

A stranger will not book a call off a cold email. So the email offers something a stranger can accept with nothing at stake. Three kinds work:

- A sales asset: a case study deck, a playbook, a demo video.
- A front-end service: a small piece of the work, done up front.
- A free sample: a handful of contacts already in the market for them.

The test: does the prospect lose anything by saying yes? If the answer is time, trust, or a meeting, it is a pitch.

One of the strongest offers we have run hands the prospect a map of their own market. "We mapped every dealer and contractor in your territory you are not reaching yet. Want a look?" Build the map once, point every email at it. Sell the outcome the owner wants, not the mechanism: more customers, more jobs booked, more reviews. "We build AI agents for your business" converts near the bottom of everything we see.

Before you rewrite copy, run the test in `references/offer-testing.md`. Fill `references/offer-worksheet.md` while you do it.

## 3. List

A list is 2,000 contacts someone hand-picked. A market is every account that could ever buy, scored. Every database you can buy is the same crawl sold to everyone in your category, so build the market yourself.

| Source | Use |
|---|---|
| Google Maps, one zip at a time | Anything local. 32,000+ US zips, so every query returns something. |
| Trade directories, certification bodies | Niche verticals. |
| Apollo, scraped | The general B2B core. |
| Ocean, AI Ark | Funded companies and lookalikes off closed-won domains. |
| SEC EDGAR, USAspending, ATS feeds, ad libraries | Specific timing signals. |

Eden Studio sells landscape design software. Their market came off Google Maps: 69,204 businesses, each enriched across 19 points. 41,150 emails produced 47 interested leads and 20 meetings on email alone.

Qualify before you enrich. A raw scrape lands at 50 to 60% ICP fit. Give every company an AI research column and an ICP column that spells out what the ICP is and what it is not, cut anything under 80%, and fit reaches 90 to 95% before you spend an enrichment credit.

Then run the waterfall: 3 to 5 email finders in a row, verify every address, re-check catch-alls. One source covers 50 to 60% of contacts; the waterfall takes it past 85%. About 70% of a raw pull survives.

Aim for 3 to 5 contacts per account. Decision makers come off the people search, gaps get backfilled, and the public emails on the company's own site go on top.

Those public emails earn their place. In one local market, the paid route gave 3,621 contacts. The businesses' own sites gave 4,553 more, and those took 54.97 contacts per positive reply against 94.94 for the paid ones. They run from a separate instance on Google inboxes, with the first-name variable dropped when there is no name.

Score every account on timing:

| Signal | Points |
|---|---|
| Hiring for the role you replace | 10 |
| Raised in the last 12 months | 10 |
| New exec in the seat you sell to | 10 |
| A complaint pattern in their reviews | 10 |
| Running paid ads | 6 |
| Tech on their stack that pairs with yours | 5 |

Three signals on one account earns it several times the attention of an account with none. Re-score every 90 days, because a funding round from 14 months ago says nothing about this quarter's budget.

Before launch, delete the dead weight: anyone who bounced once, unverified catch-alls, anything pulled more than 6 months ago, duplicates, anyone who already said no, and anyone behind Barracuda or Proofpoint. A typical list is 30% dead weight. Google and Microsoft judge a domain by its worst sends.

Re-enrich monthly. Within 6 months, 30 to 50% of contacts change jobs or details. Contact the whole market every 90 days.

## 4. Infrastructure

Secondary domains only, .com, no hyphens or numbers, and the client's main domain stays out of it.

| | Google | Microsoft |
|---|---|---|
| Inboxes per domain | 2 to 3 | 25 to 49 |
| Cold sends per inbox per day | 15 once warm | 2 to 3 |
| Copy | Forgiving | 15 to 40 words, no greeting, no signature |

Run about 80% Google and 20% Microsoft, with enterprise markets as the exception. Split inboxes 40 / 40 / 20, swap the first two batches monthly, and hold the last 20% in reserve.

Infrastructure goes in on day 1, because warmup needs about 3 weeks before the first cold send. Warmup starts at 5 a day and climbs by 1 until 20, and it never stops. Cold sends climb the same way, then step back down when the reply rate dips.

Settings that never change: plain text, no HTML, no images, no open tracking pixel, a written opt-out keyword instead of an unsubscribe link, weekdays 8am to 5pm Eastern, an MX lookup on every contact, and Google and Microsoft recipients in separate campaigns.

Inboxes burn at 6 to 9 months even with SPF, DKIM, and DMARC set up correctly. Stop trying to make one last. Monitor every inbox daily, alert on a dip, and put a fresh warm inbox in the same day. The rule on the rotation dashboard: every domain holds a 1%+ reply rate, or it gets replaced. You cannot prevent burn; you can make it irrelevant.

Stack, warmup schedule, and rotation detail: `references/infrastructure.md`.

## 5. Copy

- Under 65 words, ideally under 45.
- Subject line: 1 to 3 words, lowercase, spintaxed 3 ways.
- Write it like a message to a coworker.
- Spintax every sentence, or filters fingerprint the copy.
- A soft CTA ("Worth a look?") instead of a meeting ask.
- Social proof from the same industry, or none at all.

Personalization does not pay. We ran AI-written personal first lines against emails with nothing but a first-name variable. The personalized ones got 0.27%. The plain ones got 10%+. Relevance comes from the list and the offer, so add zero personalization unless it amplifies the offer.

The Eden email uses 4 moves: open on how the pain starts, in the buyer's words; say what the system does and what it produces; offer to build a sample from a job they just finished; close on "Worth a look?". It holds no personalization at all.

Google and Microsoft need different emails. Google forgives length and structure. Microsoft wants 15 to 40 words, no greeting, no signature, no pitch, written like a note to someone who already knows you.

Sequence: one fresh email, one threaded nudge 3 days later, then a new campaign. A new angle means a new campaign. A finished campaign returns about a month later as fresh.

Frameworks, provider differences, and the full sequence: `references/copy.md`.

## 6. Testing

Launch 15 to 30 variants across 3 to 5 core value props. Nobody gets an opinion on a script before it has 1,000 sends. After 2 weeks, kill the bottom two thirds and move every send behind what is left.

On one campaign, 1 of 4 variants produced every lead. Removing the other 3 tripled results overnight.

One change per test. A subject line and a value prop changed in the same launch teach nothing. Micro edits ("Mind if I" to "Cool if I") do not count as a test.

Reply rate is a deliverability signal, not the score. Judge a campaign on contacts per interested reply: 300 to 1 is strong, 500 to 1 is solid, past 1,500 to 1 the offer or the market is the problem. Split it by segment every week, because a couple of segments produce almost every lead and a blended average hides which.

The first 14 days:

| Days | Read |
|---|---|
| 1 to 3 | Bounce under 1%. Over 3%, pull the list. |
| 4 to 7 | First replies, and the spread between inboxes. |
| 8 to 14 | Reply rate settles at 1 to 3%, with 15 to 25% of replies positive. |

Diagnosis order: infrastructure, subject lines, copy, offer, TAM.

Portfolio: 60% of sending into proven winners, 30% into challengers being scaled, 10% into untested angles. The 10% becomes next quarter's 60%.

## 7. Replies

A webhook fires on every reply. Intent gets tagged: interested, more info, wrong person, cost, out of office. The reply lands in Slack with full context and a named owner, and a human answers inside 5 minutes. A positive reply turns into a meeting about 20% of the time with a slow answer, and about 80% with a fast one.

Four touches to the meeting:

| Touch | Timing | Content |
|---|---|---|
| 1 | Under 5 minutes | 2 to 3 specific times, no calendar link yet |
| 2 | On their yes | Booking link, plus a teaser of what they leave with |
| 3 | 24 hours before | Pre-call brief: their problem, 3 questions, the deliverable |
| 4 | 90 minutes before | Reminder with the link |

Cold meetings show at 30 to 50% with nothing in place. This sequence holds them above 75%.

Write one template per reply type so nobody types them fresh. Route a wrong-person reply to the right name the same day. Log a "we already have a vendor" reply with its renewal date. Send later and out-of-office replies into nurture.

Then close the loop: every reply, objection, and win goes back into the client's context, so the next 10,000 emails start smarter than the last.

Reply templates: `references/replies.md`.

## Adding the phone

Email fills the list. The phone closes what email starts.

- A parallel dialer at 500 dials a day.
- Train callers on the offer for 2 weeks.
- Call every positive email reply the same day.
- Under a 9% connect rate, the list is wrong, not the script.

On one build, 62% of meetings came from the phone off 44% of the touchpoints.

## Questions to ask first

1. How many contacts exist in the market?
2. Which offer category fits, from the table in layer 2?
3. What is the current contacts per interested reply?
4. Which provider holds most of the list, Google or Microsoft?
5. Who answers replies today, and how fast?

When the answer to 3 sits past 1,500, work the offer before anything else.

## What breaks these campaigns

- One bought list, shared with every competitor in the category.
- Enriching before qualifying.
- Warmup started the week of launch.
- Google and Microsoft in one campaign with one script.
- Personalization added to fix a weak offer.
- An opinion on a script with 200 sends behind it.
- Killing variants before they reach 1,000 sends.
- A reply that waits a day for a human.

Source: Christian Plascencia, Pipeline.tech.
