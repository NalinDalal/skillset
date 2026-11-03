---
name: lead-grader
description: Grades every row of a lead list against the member's best-fit rules. Adds pass or fail, a one-line reason, a confidence level and what is missing to each row, then says what the result means and where the bad rows came from. Use when someone says "grade my list", "check this list", "score my leads", "is this list any good", "clean my list before sending", or runs Module 2 Video 3 of the ACX program.
---

<!--
ACX fork. Source: https://github.com/LeadMagic/gtm-skills (MIT), skill `foundation/icp-scoring`.
Rewritten for the ACX GTM Terminal: agency owners already at revenue. See forks/CREDITS.md.
-->

# Lead Grader

**The rule for everything you write:** grade on what is actually in the row and against the member's saved ICP. Anything missing gets flagged as missing — never filled in with a guess.

**Who this is for:** an agency owner with a list in hand and about to spend money and time sending to it. This is the check that happens *before* the send.

## Step 0: Load the rules and the list

Read `ACX/outputs/icp.md` and `ACX/my-business.md`. If there is no saved ICP yet, stop and say so — grading against nothing is guesswork.

Pull out the exact rules from the ICP:

- strong-fit company categories
- adjacent-fit company categories
- explicit non-focus categories
- priority locations and locations to skip
- company-size, buyer, and buy-now rules

Do not replace these rules with a generic industry or job-title guess. The point is to grade the list against the member's chosen targeting plan.

Then take the list: a CSV, a paste, however they have it.

## Step 1: Turn the ICP into a checklist

Four short lists before touching a single row:

- **Strong fit** — the company categories and locations to send to first.
- **Adjacent fit** — the related categories that need the member's review before sending.
- **Do not send** — the explicit non-focus categories and locations to skip. Any of these means do not send, no matter how good the rest looks.
- **Other must-haves** — company size, buyer, and buy-now rules that still need to match.

Show the member the four lists and get a yes before grading. This is the bar everything is scored against.

## Step 2: Practice round

Grade **10 rows first** and show them. If the bar is off, fix it now rather than after 500 rows.

## Step 3: Only fill gaps with a yes

Some rows will be missing a company size or an industry. Filling those in usually costs money (enrichment credits, a paid lookup). **Ask first, name the cost, then do it.** Never enrich silently.

## Step 4: Grade every row

Each row gets five things:

| Field | What goes in it |
|---|---|
| **Ready to send?** | Yes, review first, no, or need information |
| **Fit type** | strong fit, adjacent fit, non-focus, or unknown |
| **Why** | one line, plain |
| **Confidence** | high, medium or low — how much of the row was actually there to judge |
| **Missing** | what was absent and mattered |

Use these decisions consistently:

- **Yes** — matches a strong-fit category and location, with no hard no.
- **Review first** — matches an adjacent-fit category and no hard no.
- **No** — matches an explicit non-focus category or a location to skip.
- **Need information** — the category, location, or other must-have information is missing.

Low confidence is not a no. It means the row needs data before anyone decides.

## Step 5: Tally it

- How many are ready to send, need review, should not be sent, or need information.
- **Where the rejected rows came from.** If there is a source column, give the result by source. That answer is usually worth more than the grades themselves — a source that mostly produces non-focus companies should be dropped.

## Step 6: Say what it means

| Result | What it means |
|---|---|
| Most rows are ready to send | The targeting is right. Move on to the message. |
| Many rows need review or information | Check the missing details before spending time or money sending. |
| Most rows should not be sent | The list came from the wrong place. Fix the source before writing anything. |

## What to write

Save to `ACX/outputs/graded-list.csv`: the list with the five columns added. Then say out loud how many are ready to send, need review, should not be sent, or need information — and where the rejected rows came from.

Then stop. The next step is the offer.

## Things you must never do

- Invent a company size, industry, revenue or job title.
- Score a row on missing data without flagging it.
- Treat a pass as a promise that they will buy. A pass means fit, not intent.
- Enrich, scrape or spend anything without a yes first.
- Bury the source breakdown. It is the most useful line in the whole report.
