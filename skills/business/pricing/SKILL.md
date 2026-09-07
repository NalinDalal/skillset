---
name: pricing
version: 1.0.0
description: "Pricing decisions, packaging, and monetization strategy. Covers value metrics, tiers, Van Westendorp research, price increases, and pricing page teardowns."
triggers:
  - pricing
  - pricing tiers
  - freemium
  - free trial
  - packaging
  - price increase
  - value metric
  - willingness to pay
  - monetization
  - how much should I charge
  - pricing page
  - annual vs monthly
  - per seat pricing
  - should I offer a free plan
---

## When to use

Use when the user needs help with pricing decisions, packaging, or monetization strategy. Trigger on mentions of pricing tiers, freemium, free trial, packaging, price increase, value metric, Van Westendorp, willingness to pay, monetization, pricing page, annual vs monthly, or per seat pricing.

## Context to gather

Ask if not provided:

**Business context**
- Product type (SaaS, marketplace, e-commerce, service)
- Current pricing, if any
- Target market (SMB, mid-market, enterprise)
- Go-to-market motion (self-serve, sales-led, hybrid)

**Value and competition**
- Primary value delivered
- Alternatives customers consider
- How competitors price

**Current performance**
- Conversion rate, ARPU, churn rate
- Customer feedback on pricing

**Goals**
- Optimizing for growth, revenue, or profitability?
- Moving upmarket or downmarket?

## Pricing fundamentals

### The three pricing axes

**Packaging.** What's included at each tier. Features, limits, support level. How tiers differ.

**Pricing metric.** What you charge for. Per user, per usage, flat fee. How price scales with value.

**Price point.** The actual dollar amounts. Perceived value vs. cost.

### Value-based pricing

Price based on value delivered, not cost to serve:

- Customer's perceived value is the ceiling.
- Your price sits between alternatives and perceived value.
- Next best alternative is the floor for differentiation.
- Cost to serve is a baseline, not the basis.

Do not anchor on the wrong things. Matching a competitor's price copies their strategy, not their economics. Cost is a floor, never the basis.

## Picking your first price

### The $10 / $100 / $1,000 rule of thumb

When you have nothing to go on, start with the order of magnitude that matches who you serve:

- ~$10/mo for prosumer/individual, high volume, low touch
- ~$100/mo for SMB/team tool, the SaaS default
- ~$1,000/mo for mid-market/business-critical/sales-assisted

Pick the bucket by who the customer is and how much value you deliver. Start near the round number. You can move within the bucket fast once you have signal.

### Avoid the $9 trap

Resist pricing ultra-low to reduce friction. Ultra-low pricing creates false traction (signups that look like validation but come from people who would never pay a real price) and traps you. Raising a price 5 to 10x later is far harder than starting higher. Your cheapest customers churn most and complain loudest.

Round-and-slightly-higher beats clever-and-cheap.

### "Just charge $50 and see what happens"

When early Intercom agonized over pricing, Jason Fried's advice was: just charge $50 and see what happens. Stop modeling. Get real signal. If people pay without flinching, raise it. If nobody bites, you learned something for the cost of a week, not a quarter.

## Value metrics

A value metric is what you charge for. It should scale with the value customers receive.

**Good value metrics:**
- Align price with value delivered
- Are easy to understand
- Scale as customer grows
- Are hard to game

| Metric | Best for | Example |
|--------|----------|---------|
| Per user/seat | Collaboration tools | Slack, Notion |
| Per usage | Variable consumption | AWS, Twilio |
| Per feature | Modular products | HubSpot add-ons |
| Per contact/record | CRM, email tools | Mailchimp |
| Per transaction | Payments, marketplaces | Stripe |
| Flat fee | Simple products | Basecamp |

Ask: as a customer uses more of this metric, do they get more value? If yes, it's a good value metric. If no, the price does not align with value.

## Tier structure

### Good-better-best framework

**Good tier (entry):** Core features, limited usage, low price.

**Better tier (recommended):** Full features, reasonable limits, anchor price.

**Best tier (premium):** Everything, advanced features, 2 to 3x Better price.

### Tier differentiation methods

- Feature gating: basic vs. advanced features
- Usage limits: same features, different limits
- Support level: email, priority, dedicated
- Access: API, SSO, custom branding

## Pricing research

### Van Westendorp method

Four questions that identify acceptable price range:

1. At what price would this be so expensive you would not consider it?
2. At what price would this be so cheap you would question its quality?
3. At what price would this be expensive but you would still consider it?
4. At what price would this be a bargain?

Analyze intersections to find the optimal pricing zone.

### MaxDiff analysis

Identifies which features customers value most. Show sets of features and ask: most important? Least important? Results inform tier packaging.

## When to raise prices

### Signs it is time

**Market signals:** Competitors have raised prices. Prospects do not flinch at price. You hear "it's so cheap" feedback.

**Business signals:** Very high conversion rates (over 40%). Very low churn (under 3% monthly). Strong unit economics.

**Product signals:** Significant value added since last pricing. Product more mature and stable.

### Price increase strategies

1. Grandfather existing customers. New price for new customers only.
2. Delayed increase. Announce 3 to 6 months out.
3. Tied to value. Raise price but add features.
4. Plan restructure. Change plans entirely.

### Rollout methodology

A price change is a rollout, not a switch you flip:

1. **Test on new customers first.** Raise the price only for new signups and watch conversion. New customers have no anchor, so they give you a clean read on whether the market accepts the number.
2. **Do not reflexively grandfather forever.** Grandfathering feels kind but leaves money on the table. A customer paying $50/mo who should be at $250/mo is a $2,400/yr gap you are subsidizing indefinitely.
3. **Roll out small, then gradually.** Move 5 to 10% of existing customers to the new price first. Watch churn and support volume for a cycle, then expand in staggered waves.
4. **Communicate the why, months ahead, with a generous offer.** Tell customers why the price is changing well in advance. Lock in the old price if they upgrade to annual now, offer an extended grace window, or a one-time credit.

Expect some churn. The customers most likely to leave over a justified increase are usually your least-profitable, highest-support, most price-sensitive accounts.

## Pricing page best practices

### Above the fold

- Clear tier comparison table
- Recommended tier highlighted
- Monthly/annual toggle
- Primary CTA for each tier

### Common elements

- Feature comparison table
- Who each tier is for
- FAQ section
- Annual discount callout (17 to 20%)
- Money-back guarantee
- Customer logos or trust signals

### Pricing psychology

- Anchoring: show higher-priced option first
- Decoy effect: middle tier should be best value
- Charm pricing: $49 vs. $50 for value-focused products
- Round pricing: $50 vs. $49 for premium products

## Pricing page teardown

When auditing an existing pricing page for clarity, transparency, and AI-readability, score it across two axes:

**Human buyer experience.** Value-prop clarity, plan differentiation, cognitive load, trust signals, pricing psychology, and price transparency.

**AI-agent readiness.** Whether LLMs and agents that shortlist and compare tools can actually read and quote your pricing. Machine-readable prices (not locked in an image or behind "Contact us"), extractable FAQ coverage, per-tier depth stated in text, and structured data. Buyers now ask ChatGPT or Perplexity "what's the best X and what does it cost" before visiting. A pricing page an agent cannot parse loses deals you never see.

**Fast check, the paste test.** Give the pricing URL to a browsing-capable AI and ask "what are the plans and prices?" A clean miss means agents fetching your page will struggle too.

## Pricing checklist

**Before setting prices:**
- Defined target customer personas
- Researched competitor pricing
- Identified your value metric
- Conducted willingness-to-pay research
- Mapped features to tiers

**Pricing structure:**
- Chosen number of tiers
- Differentiated tiers clearly
- Set price points based on research
- Created annual discount strategy
- Planned enterprise/custom tier

## Questions to ask

1. What pricing research have you done?
2. What is your current ARPU and conversion rate?
3. What is your primary value metric?
4. Who are your main pricing personas?
5. Are you self-serve, sales-led, or hybrid?
6. What pricing changes are you considering?
