---
name: seo
version: 1.0.0
description: "Audit and fix search visibility, including AI answer engines. Use when the user asks about 'SEO', 'AEO', 'GEO', 'answer engine optimization', 'AI search visibility', 'why does ChatGPT recommend my competitor', 'getting cited by AI', 'robots.txt for AI crawlers', 'GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'llms.txt', 'off-site mentions', 'share of voice', or wants to know whether an AI answer mentions their brand. Covers bot access, quotable facts, entity pages, off-site mentions, a query-set measurement loop, and competitive diagnosis. Routes page building to about-sop, research-page, and internal-linking."
---

# SOP: Search and AI Answer Visibility

## What this skill owns

| Question | Owner |
|---|---|
| Can the crawler read your pages? | this skill |
| Do you have a quotable fact? | this skill decides, `business/research-page` writes it |
| Is there a path from strong pages to your money pages? | `business/internal-linking` |
| Is there a page that defines the company? | `engineering/about-sop` |
| Which pages need to exist? | `ui/product-site` |
| Is the site fast? | `devops/performance` |

This skill audits, prioritizes, and measures. It writes two artifacts: a query set and a crawler policy.

## Three gates on any citation

An answer engine does three things before it names you:

1. **Reach.** The crawler fetches the page. Fail here and nothing after it matters.
2. **Extract.** The page holds one sentence with a number, a name, or a definition in it.
3. **Trust.** Something off-site already vouches for you.

Writing a page is easy, so most sites clear gate 2. Most fail gate 1 in silence, because nobody checks. Gate 3 caps the ceiling and takes months.

## Step 1: Audit crawler access

Do this before anything else. A blocked crawler looks exactly like bad content from the outside.

### Know the three bot classes

| Class | Job | Tokens | Blocking it costs you |
|---|---|---|---|
| Search and index | Lists and cites your pages in AI search | `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot` | Everything. This is the one that decides citations. |
| User-triggered | Fetches because a person asked | `ChatGPT-User`, `Claude-User`, `Perplexity-User` | Little. A person requested it, and these agents often ignore robots.txt. |
| Training | Collects text for future models | `GPTBot`, `ClaudeBot`, `anthropic-ai`, `CCBot`, `Bytespider`, `meta-externalagent`, `Amazonbot`, `cohere-ai` | Nothing you can measure this quarter. |

Consent tokens for training rather than separate fetchers: `Google-Extended` and `Applebot-Extended`. Google states that `Google-Extended` has no effect on Google Search, AI Overviews, or rankings.

This table is a snapshot. Tokens change. Read the operator's own documentation before writing policy, and re-read it quarterly.

### The mistake almost everyone makes

Blocking `GPTBot` does not remove you from ChatGPT answers. ChatGPT search runs on `OAI-SearchBot`. OpenAI documents the two settings as independent: allow search, refuse training. Many publishers do exactly that, and most blogs get it backwards.

The policy that wins citations while refusing training looks like this:

```txt
# AI search: allow
User-agent: OAI-SearchBot
User-agent: Claude-SearchBot
User-agent: PerplexityBot
Allow: /

# Training: refuse
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: CCBot
User-agent: Bytespider
User-agent: meta-externalagent
Disallow: /
```

That is a policy choice, not a fact. Refusing training costs nothing measurable now, and some clients want it on principle. Ask, then write it down.

### robots.txt is a request, not a lock

A crawler can ignore robots.txt. Real blocking happens at the edge:

- CDN bot management. Cloudflare and several others ship an AI-bot block that can sit on by default.
- WAF rules a security team wrote two years ago and left in place.
- Geo or rate rules that catch datacenter IP ranges, which is where most AI crawlers sit.

Three checks:

```bash
curl -s https://[domain]/robots.txt
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)" https://[domain]/about
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)" https://[domain]/about
```

Expect 200 on all three. A 403 or 429 from the second and third means the edge blocks you, whatever robots.txt claims.

- **Read the served file, not your source file.** Some CDNs prepend a managed AI block. Compare `curl` output against the file in the repo.
- **Check the response, not the header.** An allowed crawler can still get a 403 from a WAF.
- **Verify the IP, not the user agent.** Anyone can claim to be `OAI-SearchBot`. OpenAI publishes ranges at `openai.com/searchbot.json` and Perplexity at `perplexity.com/perplexitybot.json`. Match log entries against those lists.
- **Allow time.** OpenAI and Perplexity both say changes take up to 24 hours. Re-test the next day.
- **Count the log lines.** Track requests per token per week. A search crawler that stopped coming is your first signal.

### Why nobody notices

One 2026 crawl of 504 publisher sites found 48.6 percent blocking at least one AI user agent. Most block training bots on purpose. A few block the search bots by accident, through a CDN default or an inherited SEO plugin, and never find out because their Google rankings held steady.

## Step 2: Make the facts quotable

Route out for the writing:

- Entity definition, founding, team, key facts → `engineering/about-sop`
- A number with a sample and a date → `business/research-page`
- A path to those pages → `business/internal-linking`

Rules that hold across all three:

- One claim, one standalone sentence. A model lifts a sentence, never a paragraph.
- Tables and definition lists beat prose for anything a model has to look up.
- Never publish a claim that exists only inside an image.
- Never publish a number you cannot show the method for. The first person to ask how you measured it ends the citation.

## Step 3: Earn off-site mentions

The ceiling. On-site work runs out because models prefer sources that already exist.

Where answers draw from:

- Review sites: G2, Capterra, Trustpilot, app stores
- Comparison and list pages, including "best X for Y" roundups
- Community threads: Reddit, Hacker News, niche forums, Discord
- Documentation and community sites, for developer tools
- Wikipedia and other reference works
- Editable directories, for the worst of them

Rules:

- **Consistency beats volume.** Your name, your category, and your one-line description must match on every profile. Models reconcile conflicts by dropping the brand or guessing at it. A LinkedIn page calling you "an AI content platform" while your site says "SEO platform" splits the entity in half.
- **Recency beats profile count.** Five profiles updated this quarter beat forty stale ones.
- **Answer real questions in public, with your name in the reply and no link.** A useful Reddit answer attached to a username gets cited. A link dump gets removed.
- **Ask for specifics in review requests.** "What was hard about the setup?" produces quotable sentences. "Leave us a review" produces three stars and no text.
- **Never fabricate.** No purchased profiles, no invented reviews, no made-up statistics. `ui/product-site` and `engineering/about-sop` refuse fabricated claims for the same reason. A caught fabrication costs the domain, not the page.

## Step 4: Measure with a query set

The paste test is one query. It does not scale and it shows no trend. Keep a sheet.

### Build the set

Write 20 to 40 questions in the words a buyer types. Not "email marketing keywords". Real ones:

| Type | Example | Why it matters |
|---|---|---|
| Category | "best email marketing tools for Shopify" | The comparison query |
| Problem | "why do welcome emails go unread" | You own the answer if you wrote about it |
| Alternative | "Mailchimp alternatives for agencies" | Names you against an incumbent |
| Brand | "is [Company] any good" | The reputation query |
| Statistic | "email marketing open rate benchmark 2026" | Where your research page wins outright |

Keep the list. It becomes the editorial calendar and the scoreboard.

### Run it

Every quarter, for each query, across ChatGPT search, Perplexity, Gemini, and Google AI Overviews, score one row:

| Score | Meaning |
|---|---|
| Mentioned | The answer names you |
| Cited | The answer names you and links you |
| Accurate | The facts about you are correct |
| Top 3 | You outrank the incumbents in that answer |
| Number carried | Your figure appears, unmodified |

Same columns every run, or the trend is a guess.

### The four numbers

- **Mention rate.** Queries that name you, over total queries.
- **Citation rate.** Queries that link you, over total queries. A mention with no link is weak: the model knows the name and nothing else.
- **Accuracy rate.** Correct facts, over answers that mention you. Low accuracy is worse than silence, because a wrong answer about you gets repeated.
- **Share of voice.** Competitor mentions across the same set, divided by your own.

## The diagnosis: "AI recommends my competitor"

For every query where a competitor wins, ask which gate they cleared and you did not.

| The competitor has | You have | Fix with |
|---|---|---|
| A page defining them | Nothing | `engineering/about-sop` |
| Original published data | Nothing | `business/research-page` |
| Reviews, comparisons, forum presence | Nothing | Step 3 of this skill |
| Crawler access confirmed | Untested | Step 1 of this skill |
| Links from strong pages | Footer-only links | `business/internal-linking` |

Usually it is one of the last two rows, and it takes an afternoon rather than a quarter.

## Pre-flight checklist

- [ ] `robots.txt` read as served, not as committed.
- [ ] Search crawlers (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`) return 200 on a real page.
- [ ] Training crawler policy chosen on purpose, not inherited.
- [ ] CDN and WAF bot rules reviewed.
- [ ] Published IP ranges checked against recent log entries.
- [ ] Entity definition page live and server-rendered.
- [ ] At least one original finding published with its method.
- [ ] Footer links are real text links, identical across templates.
- [ ] Query set written down, 20 to 40 rows.
- [ ] Baseline scores recorded for every engine.
- [ ] Quarterly re-run scheduled.
- [ ] Name and category consistent across every off-site profile.

## Failure modes

- **Blocked at the edge, blamed on the content.** Check access first. Five minutes, and it rules out the most common cause.
- **Blocking `GPTBot` and calling it a strategy.** It has no effect on ChatGPT search. `OAI-SearchBot` is the token that counts.
- **Trusting the robots.txt file in your repo.** Some CDNs serve a different one.
- **Publishing a number with no method.** The first person to ask how you measured it ends the citation.
- **Buying mentions.** Fabricated profiles cost you the domain, not the page.
- **Measuring one query and declaring victory.** Ten data points from one afternoon is a sample, not a trend.
- **Optimizing a phrase nobody types.** Query sets start from the words buyers use. Volume on an unused phrase buys nothing.

## Related skills

- `engineering/about-sop` writes the entity page.
- `business/research-page` publishes the quotable finding.
- `business/internal-linking` builds the path to both.
- `ui/product-site` decides which pages exist.
- `devops/performance` covers speed and Core Web Vitals, which sit in the classic four alongside crawl, links, and on-page.
- `business/customer-research` supplies the numbers when the data has to come from asking.