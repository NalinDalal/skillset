---
name: category-gap-finder
description: Finds the spots in a market that competitors have left open, checks each one with buyer proof, crosses out the ones that are empty for a bad reason, and helps the member pick one play. Use when someone says "find gaps in my market", "what are competitors not offering", "where can I stand out", "find my angle", or runs Module 1 Video 3 of the ACX program.
---

<!--
ACX fork. Source: https://github.com/mloki23/market-gap-finder (MIT).
Rewritten for the ACX GTM Terminal: agency owners already at revenue. See forks/CREDITS.md.
-->

# Category Gap Finder

**The rule for everything you write:** a gap is only real if a buyer is already paying for something close to it. An opening with no money behind it is a warning sign, not an opportunity.

**Who this is for:** an agency owner who is already selling, has found their market can take them further, and now wants to know where to stand so they stop competing on price.

## How the final answer should feel

Write for a busy business owner, using words a 10-year-old could understand. The research can be detailed; the final answer must be short and easy to act on.

- Put the chosen opening first, in one plain sentence.
- Keep the main report to one page.
- Use "open spot" instead of "gap," and "other choices buyers have" instead of "competitors" when it is clearer.
- Show only the two strongest pieces of buyer proof for each open spot. Keep the links beside the proof.
- Include no more than three open spots that passed and three that were rejected.
- Say exactly why each rejected spot is a bad bet.
- End with no more than three practical next actions.
- Do not use words such as "category creation," "white space," or "competitive differentiation." Say "a new place to stand," "an open spot," and "why buyers would pick us."

## Step 0: Get the same two things the Scanner used

The member's **market** and **who they sell to**, from `ACX/my-business.md`. Use the same ones as the market scan so the two results line up.

## Step 1: Pick who to study

Three to five real options their buyers would actually consider. Always include:

- the direct competitors
- **"we'll do it in-house"** — often the real competitor
- **"do nothing"**

Name them specifically. "The market" is not a competitor.

## Step 2: Read each one properly

For each: what they sell, who they sell to, what they charge, what they claim, and where they are weak.

Go to the complaints for the weaknesses, not the marketing. Search: `[competitor] reviews 1 star`, `[competitor] alternative`, `[competitor] vs`, `[competitor] complaints`. The reasons people look for an alternative **are** the gaps.

## Step 3: Find what buyers say is wrong

Read what buyers actually write — reviews, forums, posts. Note what they complain about in their own words, and how often. What comes up again and again is where the openings are.

## Step 4: Draw the map

Two columns. Left: what everyone in this market offers. Right: what buyers say they want. The gaps sit where the right column has something the left column does not.

## Step 5: Test every open spot

For each spot, ask three questions:

1. Is anyone already paying for something close to this?
2. Do buyers complain about not having it?
3. Can the member actually deliver it?

Three yeses — keep it. Anything less — **cross it out.** Write down why you crossed it out, because the member needs to see it was tested, not skipped.

Especially cross out the spots that are empty because **nobody pays for it**. Those look like the biggest opportunity and are the most expensive mistake.

## Step 6: Pick one play

| Play | When to take it |
|---|---|
| **A corner of an existing market** | Fastest. The demand already exists and nobody is defending that spot. Default to this. |
| **A brand new market** | Only if something has genuinely changed — new tech, new rules, buyer expectations moved. Otherwise they are paying to teach people who are not looking to buy. |

Then check the play against the demand found in the market scan. Heavy demand plus an open spot is a go. An open spot in a market with no demand is a no.

## What to write

Save to `ACX/outputs/gap-finder.md` using this exact shape:

```md
# Where should we stand out?

## Short answer
We should own [the open spot] because [one plain reason buyers would care].

## The other choices buyers have
- [Named competitor or in-house option]: [what they offer in plain words]
- [Named competitor or do-nothing option]: [what they offer in plain words]
- [Named competitor]: [what they offer in plain words]

## The open spots worth looking at

### [Open spot]
Why buyers want it: [one plain sentence.]
- [Strong buyer proof with link]
- [Strong buyer proof with link]
Can we deliver it? Yes / No — [one plain reason.]

### [Second open spot, only if it passed]
[Use the same short shape.]

## What we are not doing
- [Rejected spot] — [why it is a bad bet: no one pays, buyers do not ask for it, or we cannot deliver it.]
- [Rejected spot] — [reason.]

## What to do next
1. [Practical action.]
2. [Practical action.]
3. Run `icp-builder` to decide exactly who to sell this to.
```

Keep the full competitor map and all rejected ideas in research notes. The main report should only contain what the member needs to choose a direction.

Then stop. The next step is who exactly to sell it to.

## Things you must never do

- Call something an opportunity with no buyer proof behind it.
- Recommend a brand new category just because it is empty.
- Make up a competitor's weakness. If you did not find it, leave it out.
- Repeat a competitor's own marketing claim as if it were a fact.
- Hide the spots you crossed out. The crossed-out list is half the value.
