# Companies, people and emails for Signal Watcher

These are the calls Signal Watcher uses to turn a company with a signal into a lead that can go straight into a campaign. Use them only for companies that need them:

- **Company lookup:** only for companies that still need a domain, a headcount or an industry.
- **People and emails:** only for companies marked `ICP match`.

## How to reach each tool

ACX members already have accounts with Prospeo, Icypeas and MillionVerifier. Always try the member's own account first:

1. **Their own connection in this chat** (an MCP server for that tool). Use its matching action.
2. **Their own key registered in Treg** (listed by Treg's `my_tools`). Call it the way `my_tools` shows. It uses their credits and Treg does not charge for it.
3. **Treg's catalog**, using the endpoint ids below. Treg's key is used and the Treg balance pays.

The route for each tool is saved in `watch-setup.md`. Treg prices below were checked on 2026-09-30. Confirm them with Treg's `catalog_get` before the first run of a new setup.

## Step order and cost per lead

| Step | Tool | Treg catalog endpoint | Treg price |
|---|---|---|---|
| Company lookup | Prospeo | `prospeo.companies.enrich` | $0.0245 per match, free on a miss |
| Find the person | Icypeas | `icypeas.people.search` | $0.00038 per row returned |
| Find the work email | Icypeas | `icypeas.people.email.find` | $0.019 per email found, free if none |
| Backup email finder | Treg's router | `treg.people.email.find` | from about $0.005; cap it (see below) |
| Check the email | MillionVerifier | `millionverifier.people.email.verify` | $0.00178 per check; catch-all and unknown are free |

A lead with a found and checked email costs about $0.025 through Treg. Add $0.0245 when the company also needed a lookup.

---

## Company lookup: Prospeo

- **Treg endpoint:** `prospeo.companies.enrich` (POST).
- **Body:** `{"data": {"company_website": "checkmarble.com"}}`. Use the website or LinkedIn company URL when known. Use `company_name` only when nothing else is known, and then check the result is the right company.
- **Returns (in `company`):** `domain`, `website`, `name`, `employee_count`, `employee_range`, `industry`, `location`, `linkedin_url`, `description`.
- **Use:** `domain` for the Domain column, and `employee_count`, `industry` and `location` for the fit check.
- **Watch out:** a lookup by name alone can return a different company with the same name. If the description does not match the signal's source, treat it as a miss.

## Find the person: Icypeas people search

- **Treg endpoint:** `icypeas.people.search` (POST). It answers straight away.
- **Body:**
  ```json
  {
    "query": {
      "currentCompanyWebsite": {"include": ["checkmarble.com"]},
      "currentJobTitle": {"include": ["Head of Sales", "VP Sales", "Sales Director"]}
    },
    "pagination": {"size": 5}
  }
  ```
  To look for a named new hire, add `"firstname": {"include": ["David"]}` and `"lastname": {"include": ["Tirazona"]}`.
- **Price dial:** `pagination.size`. Every row returned is paid for, so keep it at 5 or less.
- **Returns (in `leads`):** `firstname`, `lastname`, `headline`, `profileUrl` (LinkedIn), `lastJobTitle`, `lastJobStartDate` (month and year, e.g. `07-2026`), `lastCompanyName`, `lastCompanyWebsite`, `lastCompanySize`, `address`.
- **Checks before keeping a person:**
  - `lastCompanyWebsite` or `lastCompanyName` must be this company.
  - `lastJobTitle` must match a title the member asked for. "Sales Development Representative" is not "Head of Sales".
  - **For new hires:** `lastJobStartDate` must fall inside the member's window. It only gives month and year, so count a start in the first month of the window as inside. For example, with a 90-day window on 30 September, a start in `07-2026` counts.
- **Watch out:** LinkedIn data can lag a few weeks behind a real job change. If the news names a new hire but Icypeas still shows them at their old company, keep the person with the title from the news, set Lead status to `Needs check`, and do not look up an email at the old company.

## Find the work email: Icypeas email finder

- **Treg endpoint:** `icypeas.people.email.find` (POST).
- **Body:** `{"firstname": "David", "lastname": "Tirazona", "domainOrCompany": "reco.ai"}`. Always pass the domain, not the company name.
- **It answers later, not straight away.** The first reply only gives an `_id`. Read the result with `icypeas.search.results.read`, using that id. Check that endpoint's fields with `catalog_get` before the first use.
- **Backup:** if Icypeas finds nothing, try Treg's router once: `treg.people.email.find` with the person's full name and the domain. Send the header `X-Treg-Route-Max-Cost: 0.02` so one lookup can never cost more than 2 cents. Check its fields with `catalog_get` before the first use.
- If both find nothing, the person is kept with Email status `LinkedIn only`.

## Check the email: MillionVerifier

- **Treg endpoint:** `millionverifier.people.email.verify` (GET).
- **Query:** `email` and `timeout` (use 20).
- **Returns:** `result`, which is one of `ok`, `catch_all`, `unknown`, `invalid`, `disposable`, `unverified`. Also `role`, which is true for shared inboxes like `info@`.

| MillionVerifier result | Email status in the sheet |
|---|---|
| `ok` | `valid` |
| `catch_all`, `unknown`, `unverified` | `risky` |
| `invalid`, `disposable` | email dropped, Email status `LinkedIn only` |
| `role` is true | email dropped, Email status `LinkedIn only`. A shared inbox is not the person. |

Only `valid` rows are safe to upload to Smartlead without more checks.

## Never

- Look up a phone number, a personal email or a home address.
- Keep a person whose current company is not this company.
- Mark an email `valid` for any MillionVerifier result other than `ok`.
- Spend on people at a company that is not an `ICP match`.
