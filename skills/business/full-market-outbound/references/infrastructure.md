# Infrastructure

The stack is boring on purpose. Results come from the rules around it, not from the tools.

| Tool | Job |
|---|---|
| EmailBison | Sequencing, isolated IP sending, holds at 10,000 a day |
| ScaledMail | Google inboxes, DNS and DMARC handled |
| Porkbun, GoDaddy, Name.com | Domains, spread across registrars |
| EmailGuard | Weekly placement tests, anything under 8/10 gets investigated |

## Domains and inboxes

- Secondary domains only. .com, no hyphens, no numbers.
- The client's main domain stays out of sending entirely.
- Google: 2 to 3 inboxes per domain, 15 cold sends each per day once warm.
- Microsoft: 25 to 49 inboxes per domain, 2 to 3 sends each.
- Around 80% Google and 20% Microsoft. Enterprise markets flip that share.
- Split inboxes 40 / 40 / 20. Swap the first two batches monthly. The last 20% sits in reserve, warm and unused.

## Warmup

Infrastructure goes in on day 1, because warmup needs about 3 weeks before the first cold email.

| Week | Warmup per inbox per day |
|---|---|
| 1 | 5, adding 1 a day |
| 2 | 12 to 18 |
| 3 | 20, and hold |

Warmup never stops, not after launch, not after a good month. Cold sends climb the same way, from 5 a day upward, and step back down when the reply rate dips.

## Settings that never change

- Plain text. No HTML, no images.
- No open tracking pixel. It hurts placement and the number is not actionable.
- A written opt-out keyword instead of an unsubscribe link.
- Weekdays, 8am to 5pm Eastern.
- An MX lookup on every contact.
- Google and Microsoft recipients run as separate campaigns.

## Burn is planned for

Inboxes burn at 6 to 9 months even with SPF, DKIM, and DMARC set up perfectly. Stop trying to make one last.

- Monitor every inbox daily.
- Alert the moment one dips.
- Put a fresh warm inbox in the same day.
- Dashboard rule: every domain holds a 1%+ reply rate, or it gets replaced.
- Flag domains due for replacement on one screen, mark the rotation in one click, and let automation buy the new inboxes.

You cannot prevent burn. You can make it irrelevant.

## Before launch

- Placement test on every domain, 8/10 or better.
- Bounce rate under 1% in the first 3 days of sending. Over 3%, pull the list.
- SPF, DKIM, and DMARC verified on each domain.
- No inbox carrying more than its daily cap.
- The reserve batch stays untouched.

## Cadence inside the account

- A fresh first email, one threaded nudge 3 days later, then a new campaign.
- A new angle means a new campaign, not a new step in the old one.
- A finished campaign returns about a month later as fresh.
- Every list re-enriches monthly. The whole market gets contacted every 90 days.
