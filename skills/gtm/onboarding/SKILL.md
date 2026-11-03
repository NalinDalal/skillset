---
name: onboarding
description: "Sets up ACX for a new member. Creates the shared business file, asks only the facts the first skills need, reads each named client's website and tags what that company does, and records optional tools without forcing any connection. Use when a member says \"set me up\", \"onboarding\", \"start ACX\", or when the start skill finds no ACX/my-business.md file."
---

# ACX Onboarding

## What this does

Set up the member once, in plain language. By the end, these files exist in their ACX workspace:

```text
ACX/
  my-business.md
  setup-status.md
  outputs/
```

Do not save API keys, passwords, or private links in any ACX file.

## How to speak

- Write so a 10-year-old could follow it.
- Ask two questions at a time, then wait for the answer.
- Do not make the member connect tools they do not need today.
- Do not ask about price, revenue, or a lead list during onboarding.
- Do not make up missing facts. Write `Not known yet` instead.

## Step 1: Check what already exists

Choose the ACX workspace before creating or reading any file:

1. If the member opened OpenCode in a specific folder, use `[that folder]/ACX`.
2. If the member did not open a folder, create and use `~/ACX`.
3. Tell the member the exact folder in one sentence: `I will keep your ACX files in [full path].`
4. If `my-business.md` already exists in that ACX workspace, read it.
5. Ask one short question: `Do you want to update anything about your business?`
6. If the answer is no, read `setup-status.md` if it exists, update only what changed, then stop.
7. If the business file does not exist, create the ACX workspace and its `outputs` folder, then continue.

For the rest of this chat, use this chosen ACX workspace for every file. When another skill says `ACX/my-business.md` or `ACX/outputs/`, it means the matching path inside this workspace.

## Step 2: Ask about the business

Ask these in pairs. Use the member's own words when saving the answers.

1. What do you sell, and what result do you help clients get?
2. Who usually buys it?
3. Which countries or regions do you sell in?
4. What are your website and LinkedIn link, if you have them?
5. Which companies have you worked with? Paste up to three names or websites, and say what you did for each one.
6. Which businesses do buyers compare you with, including doing it themselves or doing nothing?
7. What do you believe about this market that most people get wrong?
8. What type of company do you want to work with, and roughly what size are they?

Do not ask a question whose answer is already in the business file.

## Step 3: Look up each client and tag it

The member only names the client. You work out what that client does.

1. Visit each client's website. Read the homepage. If the homepage is unclear, read the product page too.
2. If the member gave a name with no website, search for the company's own site. If more than one company has that name, ask the member which one they mean.
3. Write two to four short tags for each client. A tag says what the company sells, in words a buyer would search for.
4. Show the tags to the member like this, and ask them to fix anything wrong:

```text
Smartlead.ai: email outreach, cold email
Heyreach.io: LinkedIn automation, LinkedIn outreach
```

5. Save the confirmed website and tags with that client under `## Best clients` in `ACX/my-business.md`, so no other skill has to look the client up again.

Rules for tags:

- Take every tag from the company's own website. Never tag from the name alone or from what you already know.
- If a website will not open, say so and ask the member what that company does.
- If no web-research tool is available in this chat, do not guess. Write `Tags: Not known yet` and tell the member ICP Builder will tag these clients later.
- Do not ask the member to describe a client whose website you can read.

## Step 4: Check optional tools

Read `references/tools.md`. Tell the member: `You can start without connecting anything. Prospeo is needed before you run Market Scanner.`

Ask which of these they already use:

- Google Drive or Google Sheets
- Apify
- Prospeo
- A web-research tool already available in their chat

Record only `available`, `not connected`, or `not needed yet` in `ACX/setup-status.md`. Never request, receive, or store an API key during onboarding.

If they want to use Market Scanner, explain: `Connect the Prospeo MCP server with `opencode mcp add prospeo --url <url from Prospeo's MCP page>`, then run `/mcps` in OpenCode to sign in there. ACX never asks for or saves your key.`

Do not ask about Signal Watcher here. It has its own questionnaire and checks its own connections when the member first runs it.

## Step 5: Save and finish

1. Create `ACX/my-business.md` from `references/my-business-template.md`.
2. Create `ACX/setup-status.md` from `references/setup-status-template.md`.
3. Show a short summary of what was saved and ask the member to correct anything wrong.
4. End with: `You are ready. Tell me what you want to work on, or run /acx:start.`

## When another skill needs a tool

- Use Prospeo company search for Market Scanner, which only counts companies. Signal Watcher may also use Prospeo to look up single companies.
- Use ordinary web research for competitor and positioning work.
- Use Google Drive only when the member wants to read or save a Google Sheet or Drive file, or when Signal Watcher saves its results to the member's signal sheet through Composio.
- Use Apify only when normal web research cannot gather the required public data. Explain any expected cost and get a yes before running it.
- Use Treg, Icypeas and MillionVerifier only for Signal Watcher. It finds companies with a buying signal and, at companies that match the targets set in its own questionnaire, the right person with a checked work email. It never looks up phone numbers or personal emails.
- Signal Watcher is the only skill that looks up people or checks emails. No skill in this plugin sends outreach or runs campaigns. Do not connect a sending, CRM or automation tool for these skills.
