---
name: signal-watcher
description: "Watches for companies that match the member's target and just showed a sign they may buy now: raised money, hiring for a role, a new leader, a launch, a new office, a new partner, or a new tool. For each matching company it also finds the right person (the new hire, or the member's buyer) with a verified work email, so the sheet's Leads tab can go straight into Smartlead, Aimfox or Gojiberry. Set up once, then runs every day and adds only what is new to the member's own Google Sheet, with the cost shown before and after each run. Uses Treg for signals, Prospeo, Icypeas and MillionVerifier for companies, people and emails, and Composio for Google Sheets. It never sends outreach. Use when someone says \"watch for signals\", \"trigger events\", \"buying signals\", \"who just raised\", \"who is hiring\", \"set up my signal watch\", or \"run my signals\"."
---

# Signal Watcher

**The rule for everything you write:** add only signals Treg actually returned, for companies that actually match the member's target. A signal is a reason to reach out now. It is not proof that the company will buy.

**Who this is for:** an agency owner who knows who they sell to and wants one Google Sheet that fills up every day with the companies that just did something worth reaching out about, and the right person to contact at each one, ready to drop into a campaign.

## How it should feel

Write for a busy business owner, using words a 10-year-old could understand.

- The Google Sheet is the output. It is where the member works: they sort it, filter it, and mark who they contacted.
- The **Leads** tab must be ready to import as it is. Its first columns use Smartlead's own field names, so the member can export it as a CSV and upload it without mapping anything.
- Signal Watcher stops at the sheet. It never adds leads to a campaign, sends a message, or starts a LinkedIn sequence. The member does that.
- The chat reply after each run is short: how many new rows were added, the cost, and the sheet link.
- Show the cost at the start and at the end of every run.
- Do not use words such as "intent data," "trigger events," or "firmographics." Say "signal," "what happened," and "company type."

## Three ways this skill starts

Check for `ACX/signals/watch-setup.md`.

- **It does not exist:** run the full **Setup** (Steps 0 to 6), then the first **Daily run** (Steps 7 to 12).
- **It exists and this is the scheduled daily run** (the request says `scheduled daily run`): go straight to the **Daily run**. Ask nothing.
- **It exists and the member started it themselves:** show a short summary of their saved setup and ask: `Run now with this setup, or change something first?` If they want a change, ask again every question in the part they want to change (Steps 1 to 4), read the whole setup back (Step 5), then save.

---

## Setup

### How to ask: the questionnaire rules

This questionnaire belongs to Signal Watcher alone. It is separate from ACX onboarding.

- **Ask every question below.** Never skip one because another ACX file, the ICP or an earlier chat seems to answer it. Do not pre-fill answers from `my-business.md`, `icp.md` or any other skill's output.
- **Never assume.** Never fill a blank with a default, a suggestion or a "most people choose". If the member says "not sure", offer 2 or 3 concrete choices and let them pick. "Any" is a valid answer only when the member says it.
- **Make vague answers checkable.** "Tech companies" or "bigger ones" cannot be searched. Ask one follow-up until the answer is something a lookup can check, such as "B2B software" or "50 to 500 employees".
- **Two or three questions at a time.** Number them, wait for the answers, then move on.
- **Only this skill's files.** Save the answers in `ACX/signals/watch-setup.md` and the sheet's Setup tab. Never write them into `my-business.md` or `icp.md`.
- **Nothing is built or spent until the member confirms the full read-back** in Step 5.

### Step 0: Check the connections

Signal Watcher needs two connections:

1. **Treg** finds the signals. If the Treg tools are not in this chat, stop and say:
   `Signal Watcher needs the Treg connection. Connect the Treg MCP server with `opencode mcp add treg --url <url from treg setup>`, then run `/mcps` in OpenCode to sign in there. ACX never asks for or saves your key.`
2. **Composio with Google Sheets** holds the results. Read `references/google-sheet.md`. If the Composio tools are not in this chat, stop and say:
   `Signal Watcher saves your signals to a Google Sheet through Composio. Connect the Composio MCP server with `opencode mcp add composio --url <your Composio MCP url>`, then connect Google Sheets inside Composio.`
   If Composio is there but Google Sheets is not connected, use Composio's connection tool to start the Google Sheets sign-in. Show the member the sign-in link and wait until they say it is done.

When both work, mark `Treg` and `Google Sheets (Composio)` as `available` in `ACX/setup-status.md`.

Then check the member's own lead tools, which Signal Watcher uses to look up companies, find people and check emails. Read `references/people-and-emails.md`. For each of **Prospeo**, **Icypeas** and **MillionVerifier**, find how it can be reached, in this order:

1. The member's own connection in this chat (its MCP server).
2. The member's own key registered in Treg (it shows in Treg's `my_tools`). These calls use the member's own credits and Treg does not charge for them.
3. Treg's catalog, which works without the member's account but is paid from the Treg balance.

Tell the member in one line which ones will spend Treg balance.

Read `references/treg-signals.md` before choosing any Treg endpoint. Use only the endpoints it lists.

### Step 1: Part A: the companies

1. **What kind of companies do you want to find?** Describe them the way you would to a friend. (Follow up until it is checkable: an industry or company type, such as "B2B software" or "logistics companies".)
2. **Which countries or regions should they be in?** And are there any places to leave out?
3. **How big should they be?** Give a range of employees, such as "20 to 200".
4. **Is there anything else that must be true about them?** For example "only venture-backed", "no agencies", "must sell to other businesses". The member may answer "nothing else".
5. **Which companies or types should never show up?** For example existing clients, competitors, partners. They can paste names, websites or a file, or say "none".
6. **Do you want me to keep an eye on specific companies by name?** Paste their websites or give me a file, or say "no". Tell them in one line: `Each named company is checked every day and costs money for each check. You can add or remove names later in the sheet's Watch list tab.`

### Step 2: Part B: the signals

7. **Which signals should I watch?** Show this menu and let them pick as many as they like:

| # | Signal | Plain meaning |
|---|---|---|
| 1 | Raised money | announced a funding round |
| 2 | Hiring for a role | posted a job you care about |
| 3 | New leader | hired a new senior person, who Signal Watcher can find for you |
| 4 | Launched something | released a product or feature |
| 5 | Growing into new places | opened a new office or location |
| 6 | New partner | announced a partnership |
| 7 | Started using a tool | a new tool showed up on their website |

If they ask for a signal that is not on the menu, say Signal Watcher cannot watch it yet. Do not invent a way to fake it.

8. **Ask the details for each signal they picked, and nothing for the others:**
   - **Raised money:** Which rounds count (pre-seed, seed, Series A, Series B, Series C or later, or any)? Is there a smallest amount that counts?
   - **Hiring for a role:** Which job titles? Where must the job be based?
   - **New leader:** Which roles count as a new leader, e.g. "Head of Sales", "VP Marketing"? How recently must they have started, in days?
   - **Launched something:** Any launch, or only certain kinds? If certain kinds, which?
   - **Growing into new places:** Any new office, or only in certain countries? If certain countries, which?
   - **New partner:** Any partnership, or only with certain companies or types of company?
   - **Started using a tool:** Which tools, exactly? Warn in one line: `Searching the whole market for a tool is the priciest and noisiest signal. It costs the same whether anything comes back, it cannot filter by country or company type, and a loose tool name can match the wrong tool.`
9. **If they named companies in question 6:** For each signal, should I search the whole market, only your named companies, or both?

### Step 3: Part C: the people to contact

10. **For each signal, who should I find at the company?** For each one they picked, the choices are: the new hire (New leader only), people with certain job titles, or nobody (company only). Ask whether it is the same for every signal, or different per signal.
11. **Which exact job titles?** Collect every title they want, including the variants they accept, e.g. "Head of Sales, VP Sales, Sales Director, CRO". Ask which titles to keep out, e.g. "no assistants, no interns, no SDRs".
12. **At most how many people per company?** 1, 2 or 3.
13. **Where must the person be based?** The same countries as the companies, anywhere, or somewhere specific.
14. **Which emails do you want in the sheet?** Only emails that passed the check (`valid`), or also catch-all emails that cannot be fully checked (`risky`)? And should people with no email be kept for LinkedIn outreach?
15. **Do you want a personal opening line for each lead?** If yes: which language, and are there words or phrases to avoid?

### Step 4: Part D: budget, schedule and sheet

16. **At most how many new leads a day?** This caps the daily cost of finding people.
17. **Show the cost, then ask for a daily limit.** Work the estimate out from the prices in `references/treg-signals.md` and `references/people-and-emails.md`, using only the member's answers: the chosen signals, the named companies, the people per company and the leads-per-day cap. Check the live balance with Treg's `balance` tool. Show costs paid from the member's own Prospeo, Icypeas or MillionVerifier credits on their own line. Show it like this:

```text
What this will cost each day
- Finding new companies that raised money: free (up to 5 checks a day)
- Finding new companies hiring "SDR" in 2 countries: about $0.03
- Watching 20 named companies for news: 20 × $0.04 = $0.80
- Finding people and emails for up to 10 leads: about $0.25
Total from Treg: about $1.08 a day, about $32 a month.
From your own accounts instead: [only if routed there, e.g. "Icypeas and MillionVerifier credits for up to 10 people a day"]
Your Treg balance right now: $12.40, which covers about 15 days.
```

   Then ask: `What daily spend limit should I use? I will never spend more than that in one day without asking you.` Use the number they give. If the balance covers fewer than 7 days, say so plainly.
18. **When should it run?** Every day, or only on certain days? At what time, and in which time zone? Or only when you ask?
19. **Which Google account should the sheet live in?** Ask only if more than one Google Sheets account is connected in Composio. List their email addresses.
20. **What should the sheet be called?**

### Step 5: Part E: read it all back, then build

Show every answer from questions 1 to 20 in one short, plain summary, grouped as Companies, Signals, People, Leads and Budget. Ask: `Is all of this right? Tell me anything to change.` Change what they say, and show the summary again until they say it is right.

Only then:

1. **Schedule.** If they asked for a schedule and a scheduling tool is available, create it now. The task's request must be `/acx:signal-watcher scheduled daily run`. If no scheduling tool is available, tell them to run `/acx:signal-watcher` themselves, or set a scheduled task up in their chat app.
2. **Create the Google Sheet.** Follow `references/google-sheet.md` for the tool names, the tab layout and the column order.
   1. If `watch-setup.md` already has a sheet link, use that sheet. Never create a second one.
   2. Create one spreadsheet with the name from question 20, in the account from question 19.
   3. Rename the first tab to **Signals**, then add **Leads**, **Watch list**, **Run log** and **Setup** one at a time, in that order. Adding tabs at the same time puts them in a random order.
   4. Write the header row on each tab, make it bold, and freeze it.
   5. Add the dropdowns listed in `references/google-sheet.md`.
   6. Fill the **Watch list** tab with the companies from question 6.
   7. Fill the **Setup** tab with the confirmed answers.
   8. Read the headers back once to check they landed in the right place.

Give the member the link: `Your signal sheet is ready: [link]. Companies with a new signal show up in the Signals tab, and the people to contact in the Leads tab. You can add companies to the Watch list tab any time.`

### Step 6: Save the setup

Create `ACX/signals/watch-setup.md` using this exact shape. Every line comes from an answer the member gave. Nothing is filled in by guess.

```md
# Signal watch setup

Last changed: [date]
Last run: never

## Google Sheet
- Name: [answer 20]
- Link: [spreadsheet link]
- Spreadsheet ID: [id]
- Google account: [email] (Composio account: [account id])

## Companies
- Company type: [answer 1]
- Where: [answer 2]
- Leave out these places: [answer 2, or none]
- Size: [answer 3]
- Must also be true: [answer 4, or nothing else]
- Never show: [answer 5, or none]
- Named companies: kept in the sheet's Watch list tab

## Signals
- [Signal name]: [its details from answer 8] | [whole market, named companies, or both]

## People to contact
- Per signal: [signal] → [the new hire / these titles / nobody]
- Titles: [answer 11]
- Keep out: [answer 11, or none]
- At most per company: [answer 12]
- Based in: [answer 13]

## Leads
- Emails in the sheet: [valid only, or valid and risky]
- Keep people with no email for LinkedIn: [yes or no]
- Personal line: [no, or yes: language, words to avoid]
- At most new leads a day: [answer 16]

## Lead tools
- Prospeo: [own connection, own key in Treg, or Treg catalog]
- Icypeas: [own connection, own key in Treg, or Treg catalog]
- MillionVerifier: [own connection, own key in Treg, or Treg catalog]

## Daily spend limit
$[answer 17] a day, approved on [date]

## Schedule
[answer 18, with time zone, or: run by hand]
```

Also create `ACX/signals/seen.csv` with only this header:

```csv
first_seen,signal_id,company,domain,signal
```

And create `ACX/signals/leads-seen.csv` with only this header:

```csv
first_seen,company_domain,person,linkedin_url,email
```

These two files are Signal Watcher's memory. They stop a signal or a person from coming back if the member deletes a row from the sheet.

Then go straight to the first Daily run.

---

## Daily run

### Step 7: Before spending: show the cost

1. Read `ACX/signals/watch-setup.md`, `ACX/signals/seen.csv` and `ACX/signals/leads-seen.csv`.
2. Read the sheet's **Watch list** tab. The member may have added or removed companies since the last run.
3. Check the balance with Treg's `balance` tool.
4. Work out today's estimate from the setup and today's Watch list.
5. Show it: `Today's run: about $[estimate] (your limit is $[limit]). Treg balance: $[balance].`
6. If the estimate is above the daily limit, or above the balance, stop and ask the member. Do not trim the setup or the Watch list silently.

The member approved the daily limit in setup, so a run within the limit does not need a new yes.

If the sheet cannot be reached, stop before spending anything and tell the member. Do not collect signals that have nowhere to go.

### Step 8: Look back to the last run

Use `Last run` as the start date for every "since" filter in `references/treg-signals.md`. If it says `never`, look back 7 days. If the last run was more than 7 days ago, look back only 7 days and say so in the chat reply.

### Step 9: Collect the signals

Run only the calls the setup needs. Follow `references/treg-signals.md` for which endpoint, which filters, and which result caps.

- One news call per named company covers signals 1, 3, 4, 5 and 6 together. Never make a separate call for each of those signals.
- Add up the `cost_usd` of every call as you go. If the running total reaches the daily limit, stop calling and note which checks were skipped.
- If a call fails, try once more. A Treg error with no charge costs nothing. If it fails again, note it as a check that did not run.

### Step 10: Clean, match and drop repeats

For every result:

1. **Is it a real company?** Drop headlines, investment funds raising their own fund, and rows with no clear company name. Count them as "not a company".
2. **Drop the obvious misses for free.** If the source already shows a clear miss (a place left out, clearly the wrong industry, on the "Never show" list), drop it now, before paying for any lookup.
3. **Does the signal match the member's details?** Check it against that signal's details in the setup, e.g. the rounds and smallest amount for "Raised money", the roles and how recently they started for "New leader", the countries for "Growing into new places". A signal outside those details is dropped and counted.
4. **Look the company up.** Every company left needs a domain, a headcount and an industry. If the source already gave all three (LinkedIn job results do), use them. Otherwise run one company lookup with Prospeo, following `references/people-and-emails.md`. If Prospeo does not know the company, try the source article or a quick web search for the domain. Store the domain in plain form, e.g. `checkmarble.com`, never `https://www.checkmarble.com/`.
5. **Does it match the target?** Check it against every line under `## Companies` in the setup: company type, where, places left out, size, what must also be true, and the "Never show" list. Judge only from the lookup, the source, or the company's own site.
   - Clear match on every rule: keep it, with Fit `ICP match`.
   - Clear miss on any line: drop it and count the reason.
   - A real company in the right space, but a rule still cannot be confirmed after the lookup: keep it with Fit `No ICP match`, and say in "Fits because" what could not be confirmed. Never guess an industry or size to turn it into a match.
6. **Is it the same news twice?** The same event often arrives from two sources, or from both a market-wide check and the Watch list (for example, one funding round reported by two news sites). When the company, the signal and the date match within a few days, keep one row. Use the most detailed source, and put every record id in Signal ID, separated by ` / `.
7. **Is it new?** Drop any result whose id is already in `seen.csv`. A known company with a new signal still counts as new.
8. **Drop weak news.** Drop news events with a confidence below 0.7.

### Step 11: Find the people and their emails

Only for companies marked `ICP match`. Never spend on people at a `No ICP match` company. Follow `references/people-and-emails.md` for every call, and the member's answers under `## People to contact` and `## Leads` in the setup for every choice. Never swap in a default.

1. **Pick who to find**, using the per-signal choice in the setup:
   - **The new hire** (New leader only): the person who was just hired.
   - **These titles:** people whose current title is one of the member's titles and none of the "keep out" titles. Most senior first, up to the member's "at most per company".
   - **Nobody:** find no one. The company stays in the Signals tab only.
2. **Find them.**
   - If the news names the new hire, search for that name at the company's domain.
   - If it does not, search the company's domain for the new-leader roles the member chose.
   - For titles, search the company's domain for the member's titles.
3. **Check each person before keeping them.**
   - Their current company must be this company (same domain or same LinkedIn company page).
   - Their current title must match what the member asked for, and not a "keep out" title.
   - They must be based where the member said.
   - For a new hire, their start date in this role must fall inside the number of days the member gave. If it is older, this is not the new hire: drop them.
   - If two people could be the new hire and nothing tells them apart, keep both and set Lead status to `Needs check`. Never guess.
   - Drop anyone already in `leads-seen.csv`.
4. **Find the work email** from first name, last name and company domain. Work emails only. Never a personal email and never a phone number.
5. **Check the email.** Map the result to Email status:
   - `ok` → `valid`
   - `catch_all` or `unknown` → `risky`
   - `invalid` or `disposable`, or a shared inbox like `info@` → drop the email. Email status `LinkedIn only`.
   - No email found → `LinkedIn only`.
   - Then apply the member's email choices: if they chose valid only, a `risky` email is removed and the person becomes `LinkedIn only`. If they chose not to keep people with no email, drop every `LinkedIn only` person.
6. **Write the personal line**, only if the member asked for one: one plain sentence, under 20 words, in the member's language, built only from the real signal, and without any words they asked to avoid. For example: `Congrats on stepping in as Head of Sales at Reco.` or `Saw the €6.5M Series A led by Smartfin, congrats.` No flattery, no guesses, no claims the source does not support. If they said no, leave the column blank.
7. **When nobody can be found:** add no lead. Note the company in the Run log's "Companies with no lead found" count. The company still stays in the Signals tab.

Add up every cost as you go, together with the signal costs. Stop finding people when either the daily spend limit or the member's "at most new leads a day" is reached. Work through companies with the most signals first, then the newest, and say in the chat reply how many companies were left without leads.

### Step 12: Update the sheet, then show the cost again

1. **Signals tab:** append one row per new signal, in the column order from `references/google-sheet.md`. Set Status to `New`. Put companies with more than one signal today next to each other.
2. **Leads tab:** append one row per person, in the column order from `references/google-sheet.md`. Put people with a `valid` email first, then `risky`, then LinkedIn only.
3. **Never change rows that are already in the sheet.** The Status and Notes columns belong to the member.
4. Add every new signal to `ACX/signals/seen.csv`, including every id of a merged row, and every new person to `ACX/signals/leads-seen.csv`.
5. Check the balance with Treg's `balance` tool again.
6. **Run log tab:** append one row with today's date, the estimate, the actual spend, the balance before and after, the counts, and any checks that did not run.
7. Set `Last run` in `watch-setup.md` to today.
8. End the chat reply with:

```text
Added [number] new signals from [number] companies, and [number] leads ([number] with a valid email, [number] risky, [number] LinkedIn only): [link]
Skipped [number]: [short reasons, e.g. "4 outside your countries, 2 were investment funds"]
This run cost $[actual] (estimated $[estimate]). Treg balance: $[before] → $[after].
Next: filter the Leads tab to Email status = valid, export it as a CSV and upload it to Smartlead. Send the LinkedIn-only rows to Aimfox or Gojiberry.
```

If nothing new came in, still add the Run log row and say: `Nothing new today. This run cost $[actual].` A quiet day is a real result.

## Things you must never do

- Spend more than the daily limit, or run any paid call before the limit is approved.
- Create a second spreadsheet when one is already saved in `watch-setup.md`.
- Edit, reorder or delete rows the member already has in the sheet.
- Look up people at a company that is not an `ICP match`.
- Look up personal emails, phone numbers or home addresses. Work emails only.
- Mark an email `valid` unless the email check returned `ok`.
- Add leads to a campaign, send any message, or start a LinkedIn sequence. The member does that.
- Use an endpoint that is not in `references/treg-signals.md` or `references/people-and-emails.md`.
- Put a guess in the personal line. It says only what the signal says.
- Invent a signal, a date, a funding amount, a company size, an industry, a person, a title or an email.
- Add a company from the "Never show" list.
- Fill a setup answer with a default, a guess, or an answer from onboarding or the ICP. Every setup answer comes from the member, in this skill's own questionnaire.
- Add the same signal twice.
- Call a signal proof that a company will buy.
- Save a Treg key, a Google password, or any key in the ACX folder or the sheet.
