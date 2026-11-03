# Replies

## The system

A reply is a lead with a timer on it. The whole layer exists to make the timer short.

1. EmailBison fires a webhook on every reply.
2. n8n tags the intent: interested, more info, wrong person, cost, out of office.
3. The reply lands in Slack with full context and a named owner.
4. A rep answers inside 5 minutes.

A positive reply turns into a meeting about 20% of the time with a slow answer, and about 80% with a fast one. After 20 minutes, the chance of booking drops by half or more.

## Tagging

| Tag | What the rep does |
|---|---|
| Interested | 2 to 3 specific times, no link yet |
| More info | Answer in one line, then ask for a time |
| Wrong person | Ask for the right name, same-day handoff |
| Cost | Give the shape of the price, ask for 7 minutes |
| Out of office | Into nurture, with the return date |
| Not now | Log the date, into nurture |
| Vendor in place | Log the renewal date, follow the account |

Every tag maps to one template. Nobody types a reply from scratch.

## Templates

**Interested.**

> A little more context: {{one line on what we do}}. Free Tuesday at 2pm Eastern, or Wednesday morning?

**Cost.**

> Pricing varies, but we typically run a monthly retainer. Happy to talk for 7 minutes about it if you are open to it.

**Wrong person.**

> Thanks for pointing me the right way. Who owns this now? I will reach out today so {{name}} of yours does not have to relay.

**Vendor already in place.**

> Understood. When does the current contract come up for renewal? I will check back then and leave you alone until it does.

**Later or out of office.**

No reply. Log the date and move the contact into nurture.

## Four touches to the meeting

| Touch | Timing | What goes out |
|---|---|---|
| 1 | Under 5 minutes | 2 to 3 specific times, no calendar link yet |
| 2 | On their acceptance | Booking link, plus a teaser of what they leave with |
| 3 | 24 hours before | Pre-call brief: their problem, 3 questions, the deliverable |
| 4 | 90 minutes before | Reminder with the link |

Cold meetings show at 30 to 50% with nothing in place. This sequence holds them above 75%.

Rules:

- No calendar link in the first touch. Two or three times in plain text converts better than an open calendar.
- The teaser names the deliverable, not the call.
- The pre-call brief repeats their problem in their words, so the call starts at minute 20.

## Closing the loop

Every reply, objection, and win goes back into the client's context. That is the compounding asset: the next 10,000 emails start from what the last ones learned.

Keep three files:

- **Objections.** The exact phrasing a buyer used, and the answer that worked.
- **Wins.** The trigger that was true before the deal, so it can become a scoring signal.
- **Loses.** The reason, in their words, not the rep's summary.

Review them weekly, by segment. A couple of segments produce almost every lead, and a blended average hides which ones.

## What breaks replies

- A shared inbox with no named owner.
- A five-minute promise nobody measures.
- Answering with a calendar link and no context.
- Tagging by hand, inconsistently, days later.
- Treating "we already have a vendor" as a no instead of a date.
- Sending a cost question into a sequence that ends.
