---
name: product-site
description: Use when designing, auditing, or planning the public-facing website and supporting pages for a software product, SaaS, startup, developer tool, consumer app, marketplace, or community product. Determines which pages are needed, what each page should accomplish, how pages relate to the product funnel, and which legal, trust, support, authentication, and operational pages are appropriate. Also use when asking "what pages does my product site need," "what should my about/pricing/features page contain," or when a site exists but is missing structural pages or has pages that don't serve a clear purpose.
user-invocable: true
---

# Product Site

Build the product's public-facing site as a complete product surface, not merely a homepage.

The goal is to answer:

1. What is this product?
2. Who is it for?
3. Why should someone care?
4. What can it do?
5. Why should someone trust it?
6. What should they do next?
7. Where can they get help?
8. What legal/privacy information do they need?
9. What happens when something goes wrong?

Do not automatically create every possible page. Determine the appropriate surface from the product type, business model, audience, maturity, and user journey.

## Core page architecture

A typical product site consists of these groups.

### Marketing

- Home
- Features / Product
- Use Cases
- Pricing
- About
- Contact

Not every product needs all six.

### Trust and legal

- Privacy Policy
- Terms of Service
- Cookie Policy, when applicable
- Security
- Compliance / DPA, when applicable

Legal pages should reflect the actual product and jurisdiction. Never invent certifications, compliance claims, security practices, or legal obligations.

### Support and education

- Documentation
- Help Center
- FAQ
- Changelog
- Status

These become increasingly important as the product becomes more mature or operationally important.

### Authentication

If the product has accounts, consider:

- Sign in
- Sign up
- Forgot password
- Reset password
- Email verification
- Invitation acceptance
- Account recovery

These are product flows rather than marketing pages, but they are part of the complete website architecture.

### System states

A production product should account for:

- 404
- 500 / unexpected error
- Maintenance
- Unauthorized
- Forbidden
- Empty states
- Offline / connection failure where applicable

Do not treat these as optional visual polish. They are part of the product experience.

## Decide pages from the product

Before generating pages, determine:

- Product type
- Target audience
- B2B vs B2C
- Self-serve vs sales-led
- Free vs paid
- Subscription vs one-time purchase
- Product-led vs marketing-led acquisition
- Whether users need accounts
- Whether the product handles sensitive data
- Whether integrations exist
- Whether documentation is necessary
- Whether uptime is important to users
- Whether there are multiple user roles
- Product maturity

Then select the required pages.

Do not add pages simply because another SaaS company has them.

## Minimum credible product site

For a new software product, the default starting point is:

Home
Features / Product
About or Company
Contact
Privacy Policy
Terms of Service

Add Pricing when pricing is public.

Add Security when users need meaningful assurance about data or infrastructure.

Add Documentation / Help when the product requires explanation.

Add Status when service availability is important.

Add Changelog when the product is actively shipping and users benefit from release visibility.

## Homepage

The homepage should establish the product's primary communication hierarchy.

Typical structure:

Navbar
Hero
Proof / trust
Problem
Solution
Key benefits
Product demonstration
Use cases
How it works
Differentiation
Social proof
FAQ / objections
Final CTA
Footer

This is a starting structure, not a mandatory template.

The page should answer progressively:

Hero:
"What is this and why should I care?"

Problem:
"Is this relevant to me?"

Solution:
"How does it solve the problem?"

Product demonstration:
"What does the actual product look like?"

Benefits:
"What do I get from using it?"

Proof:
"Why should I believe these claims?"

Differentiation:
"Why this product rather than the alternatives?"

FAQ:
"What concerns might stop me?"

CTA:
"What should I do next?"

## Features page

A features page should not simply reproduce the application's sidebar.

Group functionality around user outcomes.

Prefer:

"Manage your community in one place"

over:

"Member Management"

when the broader outcome is the meaningful concept.

For each major capability explain:

- What it does
- Who uses it
- What problem it addresses
- What outcome it enables
- Relevant product evidence

Avoid turning every minor feature into a marketing section.

## Use Cases

Use cases are useful when the same product serves different workflows, roles, or audiences.

Examples:

- For administrators
- For teams
- For developers
- For families
- For organizations

Only create separate use-case pages when the audience or workflow is meaningfully different.

A use-case page should change the messaging and workflow explanation, not merely replace a heading.

## Pricing

When pricing exists, make the pricing page answer:

- What plans exist?
- Who is each plan for?
- What is included?
- What are the limits?
- What happens when limits are exceeded?
- Is billing monthly or annually?
- Can the user cancel?
- Is there a trial?
- Is there a refund policy?
- Is there a free tier?

Do not create fake pricing just to complete the page architecture.

## About

An About page is useful when company/product context increases trust or explains the product's origin.

Possible content:

- What the company/product is
- Why it exists
- Product philosophy
- Team/founders
- Company information
- Contact information

Do not manufacture a startup story, mission, team, or traction.

## Contact

Provide an appropriate contact mechanism.

Depending on the product:

- General email
- Sales
- Support
- Partnerships
- Security contact
- Abuse/reporting contact

Do not create unnecessary forms when a simple contact method is sufficient.

## Privacy

Privacy should explain the actual data lifecycle.

At minimum consider:

- Information collected
- How information is collected
- Why it is used
- Account information
- User-generated content
- Analytics
- Cookies
- Third-party services
- Data retention
- Data deletion
- Data sharing
- Security
- User rights
- Contact information

The implementation must match the actual product. Do not copy generic privacy language that describes services the product does not use.

## Terms

Terms should cover the actual relationship between the product and its users.

Depending on the product:

- Account responsibilities
- Acceptable use
- User content
- Intellectual property
- Payments
- Subscriptions
- Termination
- Disclaimers
- Limitation of liability
- Governing law
- Contact

Legal language should be reviewed appropriately for the jurisdiction and business.

## Security

A security page is appropriate when security is an important purchasing or trust consideration.

Potential content:

- Authentication
- Authorization
- Encryption
- Infrastructure
- Data isolation
- Backups
- Monitoring
- Incident response
- Vulnerability reporting
- Security contact
- Certifications, only if actually held

Never claim:

- SOC 2
- ISO certification
- GDPR compliance
- HIPAA compliance
- Encryption standards
- Penetration testing
- 99.99% uptime

unless the product actually has the corresponding evidence.

## Documentation / Help Center

Documentation should reduce dependency on support.

Typical structure:

Getting Started
Account / Setup
Core workflows
Configuration
Integrations
Troubleshooting
FAQ
Permissions / Roles
Billing
Security / Privacy

For developer products also consider:

API Reference
SDKs
Examples
Webhooks
Authentication
Rate limits
Errors

## Changelog

A changelog should communicate actual product changes.

Typical entry:

Version / Date
What changed
Why it matters
Relevant screenshots or links

Do not use a changelog as fabricated traction.

## Status

A status page is useful when users depend on the service being operational.

Typical components:

Current status
Active incidents
Affected services
Incident history
Maintenance
Resolution updates

## Footer

The footer should provide the secondary navigation users expect.

Typical groups:

Product

- Features
- Pricing
- Documentation

Company

- About
- Contact

Legal

- Privacy
- Terms
- Cookies

Resources

- Help
- Changelog
- Status

Social / external links only when those destinations actually exist.

## Product vs marketing surface

Keep these concepts separate.

Marketing pages answer "why this product."

Product surfaces answer "how do I use this product."

Both are part of the complete site, but they serve different purposes and should not be conflated.

## Relationship with messaging and UI skills

This skill decides:

"What pages should exist?"
"What should each page accomplish?"
"What is the user's journey?"
"What information belongs on each page?"

Use the product messaging skill for:

- Positioning
- ICP
- Value proposition
- Headlines
- Subheadlines
- Benefits
- Feature-to-benefit translation
- CTA strategy
- Objection handling
- Messaging hierarchy

Then use the UI/theme skill to translate that content into an interface.

## Architectural rule

Product Site = page architecture
Product Messaging = communication architecture
UI Theme = visual architecture

These three skills are distinct layers. Do not collapse them into one.
