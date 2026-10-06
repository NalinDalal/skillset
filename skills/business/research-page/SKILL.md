---
name: research-page
version: 1.0.0
description: "Build a statistics and original research page that writers and AI answers cite. Use when the user asks for a 'statistics page', 'data page', 'research page', 'original research', 'published data', 'get cited by ChatGPT or Perplexity', 'AI citations', 'GEO', 'AEO', 'answer engine optimization', 'llms.txt', 'AI search visibility', or wants company measurements that rank and earn links. Covers picking a question customers ask, calculating the answer from real records, orphan cohorts, method disclosure, the quotable sentence format, source links, schema, internal links, and the quarterly refresh cycle."
---

# SOP: Build a Statistics Page That Gets Cited

## What this page is for

A statistics page is the one asset on a site a stranger can quote. A blog post argues. A statistics page reports a number, names the sample, names the period, and links to the work behind it. Writers pick it up because it saves them a spreadsheet. AI answers pick it up because it is one sentence with a number attached.

The mechanism is narrow. A language model lifts a single sentence. If that sentence has no unit, no sample size, and no date, the model drops the number or attaches the wrong one to it. So the unit of publication here is not the page. It is the sentence.

Two kinds of content belong on the page:

- **Your own findings.** You measured this, so nobody else has it. This part is what makes `[Company]` the source.
- **Industry figures.** Someone else measured it. You link the study, name the publisher, the publication date, and the period it covers.

Publish only the second kind when you hold no records of your own. A page of linked industry figures earns you a reference, not a citation.

## Why not llms.txt?

Skip it. No AI crawler reads it, and those systems already crawl and index HTML. Publishing `/llms.txt` gains nothing. A research page underperforms for a different reason: it holds no quotable sentence. Fix the sentences.

## Run this gate first

A research page needs data you already hold, or data you can collect this week. Check before writing:

- Product records that answer a question customers ask. Ship the page.
- Completed client projects with measured outcomes. Ship the page.
- A survey that can return more than 30 answers. Ship the page.
- None of the above. Do not build the page. Write one industry-figures section, link the About page to it, move on.

An empty page titled "Email marketing statistics 2026" reads as a placeholder. Writers and crawlers both skip it.

## Step 1: Fix the URL and the title

- **Title:** `[Topic] statistics [Year]`, or `[Year] [Topic] benchmark report`.
- **URL:** `/statistics` or `/research`. Pick one. Never change it.
- Keep the year in the title and out of the URL. The address stays stable across years so old links keep working and new links pile up on one asset.
- Each refresh bumps `dateModified` in schema and the visible last-updated line.

Reason: a stable URL compounds. A dated URL throws away every link the last year earned.

## Step 2: Pick one question customers actually ask

A good question has three properties:

- A customer asks it out loud, in those words.
- Your records answer it without new instrumentation.
- The answer is a number, not an opinion.

| Business | Question | Data source |
|---|---|---|
| Email platform | How long from signup to first campaign send? | Signup and first-send timestamps |
| SEO agency | Which keywords convert rather than only rank? | Client analytics plus rank data |
| Ecommerce store | How long from first visit to first purchase? | Session and order records |
| Dev tool | How long does a typical install take? | Setup telemetry |
| Agency | What does a rebrand project cost? | Closed project invoices |

Write the question down in the customer's words. That wording becomes the H2, the FAQ entry, and the wording of the finding.

Skip questions only the founder cares about ("what is our churn philosophy?"). Nobody outside the company asks those.

## Step 3: Calculate it and save the work

Write down four things before the number:

1. **Reporting period.** Exact dates, for example "signups between 2025-01-01 and 2025-12-31."
2. **Inclusion rule.** Which records count. One sentence.
3. **Exclusion rule.** Which records drop out, and why. One sentence.
4. **The orphan cohort.** Eligible records that never completed the action. Never drop these silently.

The orphan cohort is where most published numbers go wrong. If 10,000 accounts signed up and 6,200 sent a first campaign, the median time to first campaign sits on 6,200 records, and 38 percent of signups never sent one. Say both numbers. A reader who sees "median 4 days" and does not know 38 percent never sent at all cannot use the figure correctly, and will distrust the rest of the page.

Save the query, the spreadsheet, and the calculation. A method you cannot rerun is not a method.

## Step 4: Write each finding so it survives a quote

This is the highest-value rule on the page. Every finding is one standalone sentence carrying four elements:

| Element | Example |
|---|---|
| Finding | Median time from signup to first campaign was 4 days |
| Unit | days |
| Sample | among 6,200 accounts |
| Period | that sent a campaign in 2025 |

Written as one quotable line:

> Median time from signup to first campaign was 4 days, across 6,200 accounts that sent one in 2025.

Put the orphan figure in the next sentence, not the same one:

> A further 3,800 of 10,000 signups in that period had not sent a campaign when we pulled the data.

Rules for the findings list:

- One finding per bullet or short paragraph. Never two numbers in one bullet.
- No pronouns across bullets. Each bullet stands alone, because models lift bullets out of context.
- Keep the measurement date inside the sentence. "Users churn fast" is worthless in April 2027. "The median account lasted 14 months, across 2,100 accounts closed in 2025" survives.
- Round to a number a reader says out loud. "38 percent" yes. "37.6 percent" no. Put the precise figure in the method note.
- Selectable text, always. Quote text, never an image. Charts belong under the text as supporting visuals.

## Step 5: Publish the method beside the findings

Every set of findings carries a short method note. Not a legal disclaimer. A working note.

```markdown
**Method.** Pulled from `campaign_accounts` on 2026-01-14. Accounts created between
2025-01-01 and 2025-12-31 that sent at least one campaign. Left out 41 test accounts
and 12 reseller accounts. Median is the 50th percentile of account-level deltas,
per query `ttfc_2025`. Raw counts on request.
```

For a survey, publish the question as asked plus the number of answers:

> Question: "How long did it take you to send your first campaign?"
> Answers: 412 of 1,180 recipients, a 35 percent response rate. We dropped 14
> responses below 2 minutes and above 90 days as noise.

That note turns a claim into evidence. It is also what a skeptical writer needs before quoting you instead of a competitor.

## Step 6: Structure the page

```markdown
# Email marketing statistics 2026

Last updated 2026-01-14. By [Researcher Name], [Role].
Questions about a figure? [email]

## Industry data
## Our findings: [Question 1]
## Our findings: [Question 2]
## Method and limitations
## Sources
```

- **H1** names the topic and the year.
- **Industry data** sits either above or below your findings. Label it clearly either way.
- **Each finding** gets its own H2 that repeats the customer's question in the customer's words.
- **Method and limitations** is a real H2, not a footnote.
- **Sources** lists every third-party figure as `[Publisher], [Title], published [date], covering [period]`, with a link.
- Give each H2 an anchor id where the CMS allows it, so a writer can link one section instead of the whole page.
- Zero em dashes on the page. Models mishandle them and they read as filler.

## Step 7: Schema

Use `Article` for the page, plus `Dataset` when the underlying data is downloadable.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Email marketing statistics 2026",
  "description": "Median time to first campaign, average send volume and reply rates measured across 6,200 accounts in 2025.",
  "datePublished": "2026-01-14",
  "dateModified": "2026-01-14",
  "author": {
    "@type": "Person",
    "name": "[Researcher Name]",
    "jobTitle": "[Role]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "[Company]",
    "url": "https://[domain]"
  },
  "about": { "@type": "Thing", "name": "Email marketing" }
}
```

Add `Dataset` only when the data itself ships with the page:

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Time to first campaign, 2025",
  "description": "Account-level deltas between signup and first send for 6,200 accounts.",
  "temporalCoverage": "2025-01-01/2025-12-31",
  "creator": { "@type": "Organization", "name": "[Company]" }
}
```

Notes:

- `Article` is a Google rich result type. Validate it at Google Rich Results Test. `Dataset` is valid schema.org and not a Google rich result. Add it for machine readers, not for stars in the SERP.
- Give the page a named human author with a link. An anonymous research page reads as marketing.
- Do not add `aggregateRating` or `Review`. Fabricated ratings earn a manual penalty.

## Step 8: Link the page in

Internal links decide whether the page gets read and cited. `business/internal-linking` owns the full link plan. The minimum set:

- **From the About page.** Close the company section with a descriptive link: "Read `[Company]`'s email marketing statistics and original research." Anchor text names the destination, so the link itself carries the topic.
- **From every article that quotes a finding.** When a post says "most teams send their first campaign within a week," that sentence links to the finding.
- **From the footer**, in the Resources column. Site-wide links mark a page as a core document rather than a post.
- **Into the sitemap.** No `noindex`, no `nofollow`, no canonical pointing elsewhere.
- **Into the About page FAQ**, when a finding answers a customer question.

One link from the homepage is not enough. A page reachable only from the footer reads as peripheral.

## Step 9: Refresh on a schedule

Every quarter:

- Pull the finding again with the same rule. If the number moved, replace it and keep the old value in the changelog.
- Check every third-party source link. Dead links on a page whose whole job is credibility cost more than a stale figure.
- Replace industry figures where a newer study exists.
- Record what changed and when at the bottom of the page.

If a source disappears, keep the figure and say the publisher withdrew it. Do not drop it quietly.

## Verification: the paste test

Never claim this works on theory. Run the check:

1. Paste the URL into a browsing AI.
2. Ask the customer question in the customer's words.
3. Read the answer. Does it name `[Company]`, carry the right number, and link you?

If the answer names a competitor instead, the sentence on the page is probably not the one the model can lift. Fix the sentence before writing more findings.

Re-run it quarterly. It is the only check that measures the outcome rather than the intent.

## Pre-publish checklist

- [ ] URL is stable and holds no year.
- [ ] H1 names topic and year.
- [ ] Every finding states unit, sample, and period inside one standalone sentence.
- [ ] Orphan cohort counted and stated.
- [ ] Method note sits beside each set of findings.
- [ ] Survey questions published with response counts.
- [ ] Findings are selectable text, not text inside an image.
- [ ] Every industry figure links the original study, with publisher, publication date, and period covered.
- [ ] Method and limitations is a real H2.
- [ ] Named human author with a link and a contact address.
- [ ] `Article` schema validates at Google Rich Results Test. No fabricated ratings.
- [ ] Linked from the About page, the footer, and every article that quotes a finding.
- [ ] In the XML sitemap, no `noindex`.
- [ ] Zero em dashes.
- [ ] Paste test run and the answer read.

## Failure modes

- **Only industry figures.** You are a link farm and writers know it. Add one original finding, or admit the page is a reading list.
- **A real number in an unquotable paragraph.** A model cannot lift a paragraph. Give it a line.
- **The period chosen after the number.** That is cherry-picking. Publish the period next to the number or publish nothing.
- **An orphan page.** One footer link is not discovery. Link it from the content that quotes it.
- **A page that never updates.** A stale statistics page teaches readers to distrust the whole domain. Set the recurring reminder now.

## Related skills

- `business/seo` audits crawler access and measures whether this page gets cited.
- `engineering/about-sop` defines the company entity and links to this page.
- `business/internal-linking` owns the link plan that gets this page read.
- `business/customer-research` runs the interview and survey work when the data has to come from asking.
- `business/copywriting` writes the prose around a finding without inventing one.