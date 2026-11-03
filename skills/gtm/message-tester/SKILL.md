---
name: message-tester
description: Tests the member's positioning, one-liner (or any message, like an email or homepage line) on 10 made-up buyers built from their own ICP. Each buyer reads it once, alone, and says what the company does, what they would compare it to, which line they skipped, which claim they did not believe, and whether they would reply. Reports where the message lands flat and what to cut. Use when someone says "test my message", "test my positioning", "does this land", "check my copy", or runs Module 4 Video 3 of the ACX program.
---

<!--
ACX fork. Source: https://github.com/takechanman1228/claude-persona (MIT).
Rewritten for the ACX GTM Terminal: agency owners already at revenue. See forks/CREDITS.md.
-->

# Message Tester

**The rule that matters most:** the buyers read it **one at a time, separately**. If they can see each other's answers they agree with each other and you learn nothing. Ten independent reads, not a conversation.

**Who this is for:** an agency owner who has written positioning and wants to know how buyers read it. The point is finding this out before sending, not after.

**Say this honestly to the member:** this measures how people **read** the message. It does not predict how many reply. It narrows the field; the real test is sending.

## Step 0: What are we testing?

Get the exact words. Positioning statement, one-liner, a cold email, a homepage line. If they describe it instead of pasting it, ask for the actual words — the whole point is the wording.

## Step 1: Build 10 buyers from their ICP

Use the ICP in `ACX/outputs/icp.md`. If it does not exist, stop and ask the member to run `icp-builder` first. Make the sample buyers different from each other in the ways that matter, and give each one:

- what they care about
- what makes them doubt a supplier
- how sceptical they are

Make sure you have the ones who decide, the ones who do the work, and the one who could block the purchase. A message that wins the enthusiast and loses the buyer is a message that does not sell.

## Step 2: Each buyer reads it once, alone

Run each buyer **separately**, without the other answers in front of them. Ask each the same five things:

1. What does this company do?
2. What would you compare it to?
3. Which line did you skip?
4. Which claim did you not believe?
5. Would you reply? Why not?

## Step 3: Add it up

- **Clarity** — how many described what the company does the same way. Different answers mean it is not clear.
- **Who they compared it to** — if most said "another agency", the belief is not landing.
- **The line most often skipped.**
- **The claim most often doubted.** This is usually the one worth rewriting first.
- **How many would reply.**

## Step 4: Cut the words that fit anyone

Go through the message for lines that every competitor could also say. If you could paste the line onto a competitor's site and it still fits, delete it. This is usually where the biggest gains are.

## Step 5: Fix the flat lines and run it again

Rewrite the skipped lines and the doubted claims, then run the same ten buyers again. Compare the two rounds — did the doubts move?

## How the member reads the result

| Result | What it means |
|---|---|
| Buyers repeat the words back | Clear. Move on. |
| Buyers call it "another X" | The point of view is not landing. Sharpen it. |
| Buyers do not react at all | Too generic. Cut more, not less. |
| Buyers doubt one specific claim | That claim needs proof or smaller words. |

## What to write

Save to `ACX/outputs/message-test.md`: the message tested, the ten buyers in one line each, the tally, the lines skipped, the claims doubted, the words cut, and round two if run. Put their one-liner at the top: **the line that landed best, and the words I cut.**

Then stop. That is the end of this run of modules.

## Things you must never do

- Present the ten buyers' reactions as real customer research.
- Claim this predicts replies or sales.
- Blend ten answers into one verdict. The disagreements are the finding.
- Let the buyers influence each other.
- Test five versions at once. Anything past two variants tells you nothing.
