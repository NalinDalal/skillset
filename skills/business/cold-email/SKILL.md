---
name: cold-email
description: "The full cold outbound playbook as a 7-step operating sequence. Use when the user says 'write a cold email sequence', 'cold outbound', '4-email sequence', 'blitz cadence', 'spintax', 'breakup email', 'find leads for cold email', 'how many sending domains do I need', 'warm up my inboxes', or asks about reply rates, deliverability, or signal-based lead filtering for outbound."
---

# Cold Email

Work the steps in order: script the sequence, build the list, enrich and filter, personalize, send, iterate, and only then set up infrastructure. The first 50 emails are written by hand and sent from a personal inbox. Infrastructure waits until messaging has earned replies.

Source: "The Slashy Outbound Email Playbook" by Harsha Gaddipati (Slashy). Their reported baseline: 5 to 7 percent positive replies, about 10 percent total.

## Step 1: Script the sequence

Pick the WHAT before the WHO. Find customers sitting in the "very disappointed" half of the Superhuman PMF survey and list 10 to 15 reasons they love the product: survey answers, transcript moments, usage patterns, and a profile of who they are. Then filter:

1. **Novelty.** Does anyone else doing this exist? Novel angles sell even when they do not drive retention.
2. **KPI tie.** Table stakes still sell when anchored to a number the buyer tracks, and you know you win it.
3. **Switch trigger.** The specific thing the prospect hates about their current tool is often the strongest angle.

Drop table-stakes claims in competitive markets unless provable. Keep 2 to 3 differentiators and write the 4-email sequence by hand: see `references/sequence.md`.

## Step 2: Lead list

Turn the ICP into observable, checkable signals. Cast a wide net (Sales Navigator query, export to CSV): filtering happens later. See `references/leads-and-signals.md`.

## Step 3: Enrich and filter

Enrich everything first. Then filter OUT, not in: the MX record check alone removes 30 to 40 percent of most lists for free. See `references/leads-and-signals.md`.

## Step 4: Personalize

Write the hook and offer. Never the product pitch. Safe personalization uses verifiable public facts mapped from a lookup table. Add spintax for content uniqueness, then AI drafts with human feedback until drafts send unedited. See `references/personalization.md`.

## Step 5: Send

Blitz cadence: all 4 emails in 4 to 5 days, 7 days a week, sends spread randomly 7 AM through 5 PM prospect-local. See `references/cadence-and-metrics.md`.

## Step 6: Iterate

Run 2 to 3 campaigns in parallel. Check daily: deliverability, reply rate, bounces under 2 percent, spam complaints under 0.1 percent. Kill a losing angle at 50 to 100 sends. Turn open tracking off at volume. See `references/cadence-and-metrics.md`.

## Step 7: Infrastructure

Last on purpose. 1 to 2 domains, 3 to 5 inboxes, 20 to 40 emails a day until it works. SPF, DKIM, DMARC, then 2 to 4 weeks of warmup, then Google Postmaster Tools checked daily. Scale in 3 to 5-domain batches after clean weeks. See `references/infrastructure.md`.

## Spend rules

Enrichment, verification, domain purchases, and warmup tools all cost money. Confirm budgets with the user before running a paid step, and fetch current pricing rather than trusting the numbers here.
