# Treg endpoints for Signal Watcher

Use only the endpoints on this page. Treg calls them with its own keys and bills the member's Treg balance. Every call result carries `cost_usd`, which is what was actually charged. Add those up for the "Actually spent" line.

Prices were checked on 2026-09-30. Before the first run in a new setup, confirm each endpoint's price with Treg's `catalog_get` tool. If a price changed, use the new one and tell the member.

## Which call answers which signal

| Signal | Finding new companies | Watching named companies |
|---|---|---|
| 1 Raised money | `getleadsio.companies.funding.feed` | news call, category `receives_financing` |
| 2 Hiring for a role | `apify.linkedin.search.jobs` | `predictleads.companies.job_openings` |
| 3 New leader | `predictleads.news.discover`, category `hires` | news call, category `hires` |
| 4 Launched something | `predictleads.news.discover`, category `launches` | news call, category `launches` |
| 5 Growing into new places | `predictleads.news.discover`, categories `opens_new_location,expands_offices_to,expands_offices_in` | news call, same categories |
| 6 New partner | `predictleads.news.discover`, category `partners_with` | news call, category `partners_with` |
| 7 Started using a tool | `predictleads.technologies.users` | `predictleads.companies.technology_detections` |

"News call" means one `predictleads.companies.news_events` call per named company, with every chosen category from signals 1, 3, 4, 5 and 6 in a single comma-separated `categories` value.

For finding new companies, put every chosen category from signals 3 to 6 into one `predictleads.news.discover` call.

---

## Finding new companies

### Raised money: `getleadsio.companies.funding.feed`

- **Price:** free. Treg allows 5 free calls per team per day, so make one call per run.
- **Params (query string):** `limit` (1 to 200, use 50), `since` (YYYY-MM-DD, the last run date), `region` (`US` or `EU`, only when the target is in that one region; leave it out otherwise, because `GLOBAL` returned nothing in testing on 2026-09-30), `min_confidence` (use 0.7).
- **Returns:** `companyName`, `amount`, `currency`, `roundType`, `announcedDate`, `investors`, `sourceUrl`.
- **Watch out:**
  - There is no website field.
  - Some `companyName` values are headlines ("Ex-Tesla team") or investment funds raising their own fund. Step 10 of the skill removes them.
  - Find the website from `sourceUrl` or a web search.

### Hiring for a role: `apify.linkedin.search.jobs`

- **Price:** $0.001 per job returned, plus $0.001 for each job title × location searched.
- **Query string:** `maxTotalChargeUsd` (required, above 0 and at most 1; set it to this check's share of the daily limit), `timeout` (1 to 90, use 90).
- **Body:** `jobTitles` (the member's titles), `locations` (LinkedIn place names, such as "United States" or "London"), `postedLimit` (`24h` if the last run was yesterday, otherwise `week`), `sortBy` (`date`), `maxItems` (use 25).
- **Returns:** the job list directly, including title, `linkedinUrl` and `postedDate`. The `company` object carries `name`, `website`, `employeeCount` and `industries`. Use these to check size and industry against the target, and to fill in the website.
- **Watch out:**
  - LinkedIn keyword matching is loose. Drop jobs whose title does not really match what the member asked for.
  - The scraper sometimes fails. Retry once before concluding there are no jobs.
- **Estimate:** titles × locations × $0.001, plus up to titles × locations × 25 × $0.001.

### New leader, launch, new places, new partner: `predictleads.news.discover`

- **Price:** $0.04 for each event returned, so `limit` sets the cost.
- **Params (query string):** `categories` (comma-separated, see the table above), `company_location` (a country name or US state), `limit` (default cap 10, which costs $0.40; raise it only if the member approves the extra cost).
- **Returns:** events newest first, each with `category`, `summary`, `found_at`, `confidence` and `article_sentence`. The company's domain is in `included`.
- **Watch out:**
  - `company_location` filters on where the company is headquartered, not where the event happened.
  - Drop events older than the last run, and events with confidence below 0.7.
  - For `hires`, keep only the seats the member chose; the job title is in `job_title` or `summary`.
  - Leave out `company_sizes` unless you know its exact size values. Check size yourself in Step 10 instead.

### Started using a tool: `predictleads.technologies.users`

- **Price:** $0.04 × `limit`. You are charged for the number you ask for, even if fewer come back. `limit` is the cost, so keep it small (default 10 = $0.40 per tool).
- **Params:** `technology_id_or_fuzzy_name` (the tool name, e.g. `hubspot`), `first_seen_at_from` (the last run date), `limit`.
- **Returns:** companies in `included`, newest adoption first, with `first_seen_at`.
- **Watch out:**
  - The tool name is matched loosely. Check that the returned technology name really is the tool the member asked for. If it is not, drop every result and tell the member.
  - There is no country or company-type filter, so most results may miss the target. Step 10 drops them, but they are still paid for.
  - Make one call per tool.

---

## Watching named companies

All three calls take the company's website (for example `checkmarble.com`) as `company_id_or_domain`. Pass it in `params`, together with the other filters.

### News: `predictleads.companies.news_events`

- **Price:** $0.04 per call, whatever the number of events returned.
- **Params:** `company_id_or_domain`, `found_at_from` (the last run date), `categories` (all chosen news categories in one value), `limit` (use 100; a higher limit does not cost more).
- **Watch out:**
  - News can reach PredictLeads a day or more after it happens.
  - Low-confidence events are often wrong (for example, "UKI Sales Director" was once read as an office in Uki, Australia). Drop anything below 0.7.

### Hiring: `predictleads.companies.job_openings`

- **Price:** $0.04 per call.
- **Params:** `company_id_or_domain`, `first_seen_at_from` (the last run date), `active_only` (`true`), `limit` (use 100).
- **Watch out:**
  - Responses include full job descriptions and can be very large. Read only `title`, `first_seen_at`, `url`, `categories` and `seniority`.
  - Keep only jobs whose title matches what the member asked for.
  - Coverage is thin for small companies that post only on job boards.

### New tools: `predictleads.companies.technology_detections`

- **Price:** $0.04 per call.
- **Params:** `company_id_or_domain`, `first_seen_at_from` (the last run date), `limit` (use 100).
- **Watch out:** keep only the tools the member named, and report each one with the date it was first seen.

---

## Checking the balance

Treg's `balance` tool is free. Call it at the start of every run and again at the end.

## Never use

- Any endpoint not listed on this page or in `people-and-emails.md`. If a better one appears in Treg's catalog, update the page first. Do not swap endpoints mid-run.
- Phone number lookups, or personal (non-work) email lookups, of any kind.
