# Running GTM with Coding Agents

Every stage of outbound can be written as an SOP, and a coding agent can run those SOPs the same way a new campaign manager does. This covers how to set it up and where a person still signs off.

Claude Code is the reference implementation here. Codex, Grok, and similar tools work the same way. A custom frontend to visualize agent activity is a nice-to-have, not a prerequisite.

The SOPs come from `decision-maker-outreach` and `gtm-funnel.md`. This file covers the agent layer.

## Contents

1. SOPs are the job description
2. Set the agent up like a new hire
3. The four stages an agent runs
4. Give the agent hands
5. Where a human must review
6. Loosen the review as the agent earns it
7. Writing SOPs an agent can run

---

## 1. SOPs are the job description

Keep SOPs short. Each one has an introduction, a numbered workflow, a video walkthrough, and a next step. A new campaign manager reads one, watches the video, and does the work.

An agent works the same way. It needs the SOP and a clear stop point. When the SOP says "review past campaign data, write a hypothesis, change one variable," the agent follows those steps in the order a person would.

This changes where your time goes. Your effort goes into maintaining SOPs, and every improvement to one SOP improves every campaign the agent runs after it.

## 2. Set the agent up like a new hire

In Claude Code, the `CLAUDE.md` file at the project root is the first thing the agent reads, so it does the job a welcome doc does for a person. Set up four things:

- **SOP files.** One markdown file per SOP: list building, campaign iteration, script creation, campaign assembly. Keep them close to how they read today.
- **Reference material.** SOPs point at other documents, such as a copywriting masterclass. The agent needs those in the folder too, or it will guess.
- **Client context.** Each client has a campaign strategy document and a campaign inputs document. Tell the agent where they live and which parts it fills in, such as the split test and lead list sections.
- **Hard stops.** A short list of actions the agent must ask about first: spending money, launching a campaign, editing a live campaign.

Then map each stage to its SOP in `CLAUDE.md`. When you say "build the list for this client," the agent knows which document to open.

## 3. The four stages an agent runs

### Campaign iteration

The agent reviews past campaign results and notes from client strategy calls, finds what works and what does not, then writes a hypothesis for the next test.

The SOP gives it firm rules: change one variable per split test, put separate tests in separate scripts, use a 2 or 3 step sequence. If a script already hits KPI, copy the winner and test smaller variables.

Output: a new version of an existing campaign (another script to split test), or a new campaign with a new lead list and a name based on that list.

**Stops at:** approval of the hypothesis.

### List building

The agent reads the client's strategy document for ICP, head count, location, and job titles. It drafts 1 to 5 main keywords, then include keywords, exclude keywords, and job titles, and saves them in the list drafting template.

It also does the volume math. Sending 4,000 emails a day with one follow-up needs 10,000 leads for the week. Verification removes some, so the agent scrapes 30 to 40 percent more, which is 13,000 to 14,000.

With browser access it builds the Apollo search, saves it with the SOP naming format, and prepares the list order. When the file comes back it runs verification through MillionVerifier and stores the clean list in the client's Leads folder. Google Maps lists follow a similar path through MapsData.

Keep the guardrails in `decision-maker-outreach` in force here. Public business contact data and licensed data sources only, never scraped private groups.

**Stops at:** review of a sample set of companies from the search before scraping, and any payment.

### Script creation

The agent writes the initial message and follow-ups in the client's campaign inputs document, using the copywriting guide. When a split test has a winning script, it copies that script and makes small changes instead of writing from scratch.

**Stops at:** copy approval.

### Campaign assembly

Inside the sequencer, the agent creates the campaign named after the lead list, uploads the leads, and maps the headers. It pastes in the sequence and checks the variables in the preview.

It sets follow-up delays, picks a sending schedule in the lead list's time zone, sets the daily limit to the inbox capacity, and applies the SOP settings one by one, such as stop sending on reply on and open tracking off.

**Stops at:** a check of the inboxes and settings, and launch.

## 4. Give the agent hands

An agent that only writes text still leaves you doing the clicking. Give it tools and it does the clicking too.

Claude Code is the base. It reads the SOPs, works with the client files, and writes drafts into your documents.

Tools come in two kinds:

- **API or MCP connections** give a direct link, so the agent can create campaigns, upload leads, and add sequences without a person clicking through the app.
- **Sign-in-and-click tools** (Apollo, MillionVerifier, MapsData) need browser automation, following the same steps the SOP gives a person.

Keep payment and checkout as a manual step until you trust the setup.

## 5. Where a human must review

These checkpoints matter most. Each sits where a mistake is expensive or hard to see later.

- **List and ICP review.** The SOP says to click into 10 to 15 companies before scraping and check 10 to 20 websites once the list comes back. Keep a person on both. A bad list wastes the scrape cost and a day of waiting, and no script fixes it. The agent drafts the keywords, you edit them.
- **Hypothesis.** Check that the test changes one variable and follows from the data. An agent will write a plausible hypothesis that the data does not support.
- **Copy.** Read every script and follow-up before it goes anywhere. Check the variables in the preview, the length of the sequence, and whether the offer is stated clearly.
- **Inboxes and settings.** Confirm which inboxes are attached, that the daily cap matches their real capacity, and that the schedule fits the lead list's time zone. Mistakes here hurt deliverability and only show up later, when replies drop.
- **Launch.** A person presses go. It is the last check and it takes seconds.

Money follows the same rule. Any order or checkout goes through you.

## 6. Loosen the review as the agent earns it

Begin with a person reviewing every stage output on every campaign. Keep a running note of what the reviewer changed and why. Those notes tell you what to add to the SOP or the `CLAUDE.md` file.

Once a stage comes back with no changes across several campaigns, reduce review on that stage. Do it one stage at a time, and watch performance for a few campaigns before touching the next. If results dip, put the review back.

A sensible order loosens the rule-heavy work first. Campaign assembly follows fixed settings, so it is easy to check and easy to trust. List building comes next, then hypotheses. Copy approval and launch come last, since one bad output there costs the most.

The goal is a review that gets lighter as the agent earns it, with a person still able to step in at any stage.

## 7. Writing SOPs an agent can run

Most SOPs work for agents as written. A few habits make them work better:

- Put in exact values.
- Say what done looks like.
- Write rules for judgment calls.
- Turn videos into text.

Then run the agent and watch where it asks questions or gets stuck. Each of those is a gap in the SOP. Fix the SOP and the next campaign benefits.

If your outbound process lives in people's heads, write it down first. If it is already written down, give one SOP to an agent this week, review everything it produces, and expand from there.