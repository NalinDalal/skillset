# Prospeo Company Search

Use only Prospeo's company-search capability for this skill.

## What you may use

- Prospeo search suggestions for industry, location, technology and job title
- Prospeo company search
- The returned `pagination.total_count`

## What you must never use

- People search
- Person enrichment
- Email or mobile lookup
- Contact reveal
- More than one page per search unless the member separately approves it

## Turn the business profile into filters

| Business detail | Prospeo filter |
|---|---|
| Company type or industry | `company_industry` or `company_keywords` |
| Country or region | `company_location_search` |
| Company size | `company_headcount_range` or `company_headcount_custom` |

Use Prospeo's search suggestions before searching. Use the exact values it returns. Do not guess a value.

When a region such as "Western Europe" is given, list the countries you used in the report.

## Signal counts (optional, one credit each)

Run the main count first. Then, for each signal the member approved, run the same filters plus one signal filter and read `pagination.total_count`:

| Signal | Prospeo filter | Example |
|---|---|---|
| Hiring for a role | `company_job_posting_hiring_for` | `{"include": ["Video Editor", "Content Creator", "Social Media Manager"]}` |
| Raised money recently | `company_funding.funding_date` | `90` (days) |
| In the news | `company_news` | `{"categories": ["Product Launch", "Expansion"], "timeframe_days": 90}` |
| New leader | `company_key_execs` | `{"event_types": ["CMO Appointed", "VP of Marketing Appointed"], "timeframe_days": 90}` |
| Growing team | `company_headcount_growth` | `{"timeframe_month": 6, "min": 20, "max": 10000}` |

Use search suggestions for job titles before using `company_job_posting_hiring_for`.

## Cost and approval

A company-search page that returns companies may use one Prospeo credit. The first page includes the total count, so one page is enough for each count.

Before searching, tell the member the total number of credits (main count plus each signal count) and wait for a clear yes.

## Read the result

Use the exact `pagination.total_count` returned by Prospeo. Do not estimate from it except for the labelled fit-rate range described in SKILL.md.

## Official documentation

- [Prospeo MCP](https://prospeo.io/api-docs/mcp)
- [Search Company](https://prospeo.io/api-docs/search-company)
- [Company filters](https://prospeo.io/api-docs/filters-documentation)
