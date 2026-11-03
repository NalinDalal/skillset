---
name: outlier-finder
description: "Finds the LinkedIn posts that did unusually well in a member's niche during the last month, then turns the patterns into practical content angles. Uses only the Apify Actor harvestapi/linkedin-profile-posts. Use when a member says \"find what is working\", \"find content outliers\", \"what posts work in my niche\", or \"give me LinkedIn angles\"."
---

# Outlier Finder

## What this does

Finds recent LinkedIn posts that beat each account's usual performance. It does not chase the biggest raw like count. A post with 80 reactions can be a bigger win for a small account than a post with 800 reactions is for a large one.

The final result is a short set of content angles the member can use in their own voice.

## What this needs

Read `ACX/my-business.md` first. You need:

- the member's niche
- who their buyers are
- five to ten LinkedIn profiles or company pages worth studying

Use the member's own competitors and adjacent voices first. If they have not named enough accounts, ask for LinkedIn URLs or use ordinary web research to find real, relevant public profiles. Do not use another Apify Actor.

## The only LinkedIn data tool

Use only the Apify Actor `harvestapi/linkedin-profile-posts`.

Read `references/apify-actor.md` before running it. Ask for a clear yes before starting the Actor, because it may use Apify credits. Say how many profiles and maximum posts per profile you will request.

Do not scrape reactions or comments. They are not needed to find the post-level engagement counts, and they can increase the amount of data and cost.

## Step 1: Choose the accounts

Pick five to ten real accounts whose posts the member's buyers would actually see or care about. Include a mix of:

- direct competitors
- respected people in the niche
- adjacent companies with the same buyer

Do not include famous general creators who do not speak to the member's buyer. A large audience does not make someone relevant.

Write down why each account belongs in the set before collecting posts.

## Step 2: Collect recent posts

Run `harvestapi/linkedin-profile-posts` once with:

- the chosen LinkedIn URLs
- `postedLimit` set to `month`
- `maxPosts` set to a sensible number that covers the last month without collecting unnecessary history
- reactions and comments disabled
- reposts and quote posts excluded unless the member explicitly wants them

If the Actor returns fewer than five recent original posts for an account, keep it in the raw data but label it `not enough recent posts`. Do not pretend its top post is an outlier.

## Step 3: Find the real outliers

Work one account at a time.

1. Inspect the returned fields and identify the actual engagement counts available. Never assume a field name or fill a missing count with zero.
2. Add together the engagement counts that are present for each post. Use the same fields for every post from that account.
3. Find that account's middle engagement result for the month. This is its normal result.
4. Compare every post with that normal result.
5. Keep only posts that clearly beat the account's usual result. If no post clearly does, say `no clear outlier`.

For every kept post, record:

- the author or company
- the post date
- the first line or hook
- the post link
- engagement compared with that account's normal result
- why it likely stood out

Do not compare an account's raw engagement with another account's raw engagement. The comparison only matters within the same account.

## Step 4: Look for the pattern

Read the kept posts. Look for what repeats:

- the topic or problem
- the first line
- the shape of the post: story, opinion, list, lesson, mistake, teardown, or other real format
- the point of view
- the proof or example used

Only call something a pattern when it appears in at least two outliers. A single strong post is an example, not a rule.

## Step 5: Turn patterns into angles

Write angles, not copies. Each angle must use the same underlying idea in the member's own voice and for their buyer.

An angle should include:

- a simple topic
- a first-line idea
- the proof, story, or example the member would need

Never copy a post's wording or claim that a pattern will guarantee reach.

## What to write

Save to `ACX/outputs/outlier-finder.md` using this exact shape:

```md
# What is already working

## Posts that stood out
- [Author]: [short hook] — [why it beat that account's normal result]. [Post link]
- [Author]: [short hook] — [why it beat that account's normal result]. [Post link]
- [Author]: [short hook] — [why it beat that account's normal result]. [Post link]

## What they have in common
- [Simple pattern seen in at least two outliers.]
- [Simple pattern seen in at least two outliers.]
- [Simple pattern seen in at least two outliers.]

## Angles you can use
- [Topic]. First line: "[First-line idea]." Use: [the member's proof or example].
- [Topic]. First line: "[First-line idea]." Use: [the member's proof or example].
- [Topic]. First line: "[First-line idea]." Use: [the member's proof or example].
```

Keep the raw Actor data and calculations out of the member-facing report. The final report should be short, simple, and usable.

## Things you must never do

- Run the Actor without a clear yes from the member.
- Use a second Apify Actor for LinkedIn data.
- Treat the most-liked post across all accounts as the winner.
- Call a post an outlier when the account has too little recent data.
- Copy someone else's content or make up a reason it worked.
- Promise that an angle will perform the same way for the member.

