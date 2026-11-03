# Lead List, Enrichment, and Signals

## Write the persona as observable signals

"Ideal customer profile" labels like "innovative growth people" cannot become a lead list. A persona is only usable when it converts into things you can check in data. State the persona until it reduces to: role, company stage, region, and one or two verifiable facts (a tool they pay for, a size range, a tech stack).

## Cast a wide net first

Filtering happens during enrichment, not during sourcing. Pull the biggest plausible list early. A typical flow: build a LinkedIn Sales Navigator search, feed the URL into an export tool, and work from the CSV. Rough leads are cheap; the enrichment pass rejects the noise.

## Enrich everything, then filter

Enrich before judging. Enrichment is cheap enough that over-enriching and cutting beats under-enriching and missing good leads.

- Profiles: a bulk provider near $2 per 1,000 leads gives title, company, bio, work history, education, plus company domain and size.
- Emails: run a waterfall by price. Start near $0.01 per lead, then fall through cheaper-to-pricier providers only on misses. Never pay a premium per lead for emails the cheap source already found.

## Filter out, not in

The goal of the pass is removing disqualified leads, not ranking everyone. Hard disqualifiers cost almost nothing and cut the most:

**MX record check (free, instant).** Look up the DNS MX record of each lead's email domain. Points at outlook.com or protection.outlook.com: out (product does not run there, they churn on day one). Points at google.com or googlemail.com: in. This one check removes 30 to 40 percent of a typical list.

**Automation senders.** SendGrid, HubSpot, or Mailchimp SPF records on their domain mean they know email tooling and will get the value prop.

**DMARC.** Domains without DMARC records tend to be small, so your emails are less likely to hit security filtering.

**LinkedIn recency.** A profile with no activity for a month is a weaker target.

## High-value positive signal

A prospect who already pays for a premium inbox tool has both the pain and the budget. When detected, add a personalized PS line naming their current tool. Reply rates on that segment run meaningfully higher.

## Draft before you send

Draft every email before scheduling, then scan each draft. Three catches: an email waterfall that returned the wrong person, personalization that does not make sense for that lead (the restaurant hook mapped to the wrong college), and leads that survived filters but are clearly wrong for the pitch. Thirty minutes per batch. It protects domain reputation better than any technical fix.
