# The Signal Watcher Google Sheet

The sheet is written through Composio's Google Sheets tools. Composio signs in to Google on the member's behalf. ACX never sees or stores a Google password or key.

## Composio tools to use

Tool names were checked on 2026-09-30. Before the first call of a run, fetch each tool's input fields with Composio's `COMPOSIO_GET_TOOL_SCHEMAS`, because field names differ between tools. For example, some tools take `spreadsheetId` and others take `spreadsheet_id`.

| Job | Composio tool |
|---|---|
| Create the spreadsheet | `GOOGLESHEETS_CREATE_GOOGLE_SHEET1` |
| Add a tab | `GOOGLESHEETS_ADD_SHEET` |
| Rename the first tab to "Signals" | `GOOGLESHEETS_UPDATE_SHEET_PROPERTIES` |
| Freeze the header row | `GOOGLESHEETS_UPDATE_SHEET_PROPERTIES` |
| Make the header bold | `GOOGLESHEETS_FORMAT_CELL` |
| Get tab names and numeric tab ids | `GOOGLESHEETS_GET_SPREADSHEET_INFO` |
| Write the header rows and the Setup tab | `GOOGLESHEETS_UPDATE_VALUES_BATCH` or `GOOGLESHEETS_VALUES_UPDATE` |
| Add new rows at the bottom | `GOOGLESHEETS_SPREADSHEETS_VALUES_APPEND` |
| Read the Watch list, or read headers back | `GOOGLESHEETS_BATCH_GET` |
| Add a dropdown to a column | `GOOGLESHEETS_SET_DATA_VALIDATION_RULE` (`validation_type` `ONE_OF_LIST`, the tab's numeric id, zero-based column index, rows from index 1 down) |
| Tidy column widths (optional) | `GOOGLESHEETS_AUTO_RESIZE_DIMENSIONS` |

Known problems to avoid:

- **Creating the spreadsheet cannot be undone by running it again.** Running the create call twice makes two sheets. Create it once, then save the ID in `watch-setup.md` straight away. If the create call times out, check Google Drive for the sheet before trying again.
- **Tab names must match exactly** inside a range, e.g. `'Run log'!A1`. Put names that contain a space in single quotes.
- **Values must be a list of rows.** Every row in one call must have the same number of cells. Use an empty string for a blank cell, never a missing value.
- **Append rows one call at a time.** Do not run several appends at once.
- **Add tabs one at a time.** Tabs added in the same batch land in a random order.
- **More than one Google account may be connected.** Every call must name the Composio account saved in `watch-setup.md`, or it fails.
- **Formatting and freezing need the numeric tab id,** not the tab name. Get it from `GOOGLESHEETS_GET_SPREADSHEET_INFO`.

## Tab 1: Signals

One row per signal. A company with two signals today gets two rows next to each other.

| Column | Header | What goes in it |
|---|---|---|
| A | Date found | the date of this run, YYYY-MM-DD |
| B | Company | company name |
| C | Domain | plain domain, e.g. `checkmarble.com` (no `https://`, no `www.`), from the company lookup; `not confirmed` only if every lookup failed |
| D | Signal | the menu name, e.g. `Raised money`, `Hiring for a role` |
| E | What happened | one plain line, e.g. `Raised €6.5M Series A led by Smartfin` |
| F | Signal date | when it happened, YYYY-MM-DD |
| G | Source link | the article, job post or source URL |
| H | Fits because | one line against the target, or what is missing |
| I | Fit | `ICP match` or `No ICP match`. Dropdown with only these two choices (column index 8). |
| J | Status | Signal Watcher writes `New`. The member changes it to `Contacted`, `Not a fit`, `Won` or anything they like. |
| K | Notes | left blank for the member |
| L | Signal ID | the Treg record id, or several ids separated by ` / ` when the same news came from more than one source; Signal Watcher uses this to avoid repeats |

Signal Watcher only ever adds rows at the bottom of this tab. It never changes an existing row.

## Tab 2: Leads

One row per person. This is the tab the member exports to a campaign. Columns A to F use Smartlead's own field names, so a CSV export uploads without any mapping. Every other column comes in as a custom field that can be used in templates, e.g. `{{personal_line}}`.

| Column | Header | What goes in it |
|---|---|---|
| A | email | the work email, or blank for LinkedIn-only rows |
| B | first_name | |
| C | last_name | |
| D | company_name | |
| E | website | the company domain, same as the Signals tab |
| F | linkedin_profile | the person's LinkedIn URL |
| G | title | their current title |
| H | personal_line | one sentence from the real signal, e.g. `Congrats on stepping in as Head of Sales at Reco.` |
| I | signal | the menu name, e.g. `New leader`, `Raised money` |
| J | signal_date | YYYY-MM-DD |
| K | source_link | the article, job post or source URL |
| L | lead_type | `New hire` or `Buyer` |
| M | started_role | month and year they started, e.g. `07-2026` (new hires) |
| N | email_status | `valid`, `risky` or `LinkedIn only`. Dropdown (column index 13). |
| O | lead_status | Signal Watcher writes `New`, or `Needs check` when it could not be sure it has the right person. The member changes it to `Exported`, `Contacted` or `Not a fit`. Dropdown with these five choices (column index 14). |
| P | added_on | the date of this run, YYYY-MM-DD |
| Q | notes | left blank for the member |

How the member uses it:

- **Email campaign:** filter `email_status` = `valid` and `lead_status` = `New`, export as CSV, upload to Smartlead, then set those rows to `Exported`.
- **LinkedIn campaign:** filter `email_status` = `LinkedIn only` (or `risky`), and send the `linkedin_profile` list to Aimfox or Gojiberry.
- `Needs check` rows should be looked at by a person before any outreach.

Signal Watcher only ever adds rows at the bottom of this tab. It never changes an existing row.

## Tab 3: Watch list

The named companies to check every day. The member can add or remove rows here directly, and each run reads this tab fresh.

| Column | Header | What goes in it |
|---|---|---|
| A | Domain | plain domain, e.g. `reco.ai` |
| B | Company | name, if known |
| C | Added on | YYYY-MM-DD |
| D | Notes | anything the member wants |

Each company on this list costs money every day (see `treg-signals.md`). The daily cost check in Step 7 counts the rows on this tab.

## Tab 4: Run log

One row per run, so the member can see what each day cost.

| Column | Header |
|---|---|
| A | Run date |
| B | Estimated cost ($) |
| C | Actually spent ($) |
| D | Treg balance before ($) |
| E | Treg balance after ($) |
| F | New signals added |
| G | Skipped: not a fit |
| H | Skipped: already seen |
| I | Checks that did not run |
| J | Leads added |
| K | Leads with a valid email |
| L | ICP-match companies with no lead found |

## Tab 5: Setup

Two columns, `Setting` and `Value`, written once at setup and rewritten when the member changes something. It is there so the member can see their choices. Changes are made by telling the agent, not by editing this tab.

Rows, in order. Each value is the member's own answer from Signal Watcher's questionnaire:

- Company type
- Where
- Leave out these places
- Size
- Must also be true
- Never show
- Signals watched (one line per signal, with its details and whether it covers the whole market, named companies, or both)
- People to contact, per signal
- Titles, and titles kept out
- At most per company
- Based in
- Emails in the sheet
- Keep people with no email for LinkedIn
- Personal line
- At most new leads a day
- Daily spend limit
- Schedule
- Set up on
- How to change this: `Run /acx:signal-watcher and say "change something".`
