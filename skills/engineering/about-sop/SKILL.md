---
name: about-sop
category: engineering
source: custom
description: "Repeatable SOP for building an About Us page that serves both humans and machine-readable entity sources for LLMs. Covers entity definition, core services, differentiators, user segments, team & origin, how it works, key facts, and FAQ with structured schema markup."
triggers:
  - about us page
  - build an about page
  - llm entity source
  - e-e-a-t optimization
  - structured data for about page
---
# SOP: How to Build a Perfectly Optimized About Us Page

## Contact

Human-readable About page + machine-readable entity source for LLMs

## How to Use This SOP

This document is a repeatable process for building an About Us page for any company. Work through it top to bottom. Every place you see a placeholder in square brackets, such as [Company], [Founder Name], or [Competitor], replace it with the client's real information.

### Placeholders used throughout

- **[Company]** The client's brand name.
- **[domain]** The client's root domain, for example acme.com.
- **[Category]** The one-phrase category the company belongs to, for example "subscription-based design agency" or "B2B payroll software."
- **[ICP]** The company's ideal customer profile, for example "B2B SaaS marketing teams."
- **[Founder Name]** The founder or founders.
- **[Competitor]** A named competitor. Use real names.

## What This Page Actually Is

We are building a page at `/about` that does two jobs at the same time:

1. **For humans.** A normal About Us page. What `[Company]` is, what it does, who built it, and why people should use our product/service.

2. **For machines.** A structured, crawlable source document that Google's knowledge graph and LLMs (ChatGPT, Claude, Gemini, Perplexity) can parse, extract facts from, and cite when users ask about `[Company]`.

The problem this solves: right now, when someone asks an LLM "what is `[Company],"` the model pulls from third-party pages and stitched-together snippets. `[Company]` has no authoritative source document that these systems can read. This page becomes that source document.

### Why this page is so important

- **It helps train AI to talk about your brand accurately.** LLMs and AI search engines need a single, factual, first-party page to pull from. If you do not give them one, they guess.

- **It strengthens the E-E-A-T score of your entire domain.** Named founders, verifiable backgrounds, real numbers, and clear facts raise the trust signal for every other page on the site.

- **In a world where everything seems fake, it makes your brand human.** Real people, a real origin story, and real clients are the fastest way to earn trust from a prospect who has never heard of you.

### Why not llms.txt?

Ignore it. No AI crawler currently reads it (John Mueller at Google confirmed this; Semrush logged zero bot visits over 2.5 months). A real HTML page with structured markup already works because AI systems already crawl and index HTML pages. Do not solve a solved problem with a hypothetical standard.

## URL, Routing & Link Architecture

- **URL:** `https://[domain]/about`
- **Must return:** 200 OK, server-rendered HTML (not a client-side hydrated skeleton). Google can render JS but LLM crawlers often cannot. SSR or pre-render this page.
- **Link placement:** global footer (every page on `[domain]` links here), XML sitemap, and homepage main navigation (optional but preferred).
- **Internal links from this page to:** homepage, `/pricing`, the main product or service pages, case studies or portfolio page, and the primary conversion page (book a call, start a trial, contact).
- **No noindex, no nofollow, no canonical pointing elsewhere.**

### Why the footer matters

Google and LLM crawlers treat persistent site-wide links as structural navigation signals. A page linked from every footer is interpreted as a core entity page, not a throwaway post. Think of it as the difference between a primary key and a foreign key. You are telling crawlers "this page defines us."

## Page Structure: Section by Section

Every section below exists because it maps to a specific query pattern that LLMs and Google need to answer. For each section: what the section is, exactly what to write for `[Company]`, and the query it targets.

### Section 1: Entity Definition (H1)

**Heading:** About `[Company]`

**What to write:**

One declarative opening sentence. This is the most important sentence on the entire website. It should read like the first line of a Wikipedia article. Format:

`[Brand] is a [category] that [does what] for [whom].`

Follow with 2 to 3 sentences that expand on this and provide additional context.

**Rules:**

- Third person. "`[Company] helps...`" not "We help..." LLMs quote third-person text more naturally because it matches their output style.
- Brand name in the first 5 words.
- No adjectives that aren't provable ("revolutionary", "world-class", "best-in-class").
- Every sentence should contain at least one fact that could be extracted as a key-value pair.
- **No em dashes anywhere on the page.** Use commas, periods, or parentheses.

**Target query this answers:** "What is `[Company]?`" / "What does `[Company]` do?"

### Section 2: Core Services

**Heading (H2):** What `[Company]` Does

**What to write:**

A list of 6 services. Each one follows this pattern: service name as an `<h3>`, one sentence describing what is delivered, one sentence describing the outcome for the client.

**Do not do:**

- Long prose paragraphs mixing services together.
- Nested sub-services.
- Standalone claims that can't be verified with specific, quantitative numbers.

**Target query this answers:** "What does `[Company]` do?" / "Does `[Company]` do `[service]`?"

### Section 3: Differentiators

**Heading (H2):** What Makes `[Company]` Different

**What to write:**

5 differentiators. Each gets its own H3 sub-heading and 1 to 2 sentences. This section answers "why this and not the other thing." Be concrete and provable.

**On naming competitors:**

Naming competitors directly on this page places `[Company]` into their competitive set in LLM entity graphs. When a prospect asks Perplexity or ChatGPT "`[Company]` vs `[Competitor]`" or "alternatives to `[Competitor],`" the model needs text on `[Company].com` where both brands co-occur. This is intentional. It supports the bottom-of-funnel comparison strategy.

**Target query this answers:** "`[Company]` vs `[Competitor]`" / "alternatives to `[competitor]`" / "best `[Category]` service/product"

### Section 4: User Segments

**Heading (H2):** Who Uses `[Company]`

**What to write:**

Explicitly name the user types. This is a taxonomy, not marketing copy.

**Example segments:**

- B2B SaaS marketing teams at 50 to 200-employee scaleups (primary ICP)
- Marketing leaders at 200 to 800+ employee platform companies (secondary ICP)
- Marketing and creative agencies using `[Company]` to `[Do XYZ]` for their own clients
- Industry verticals served: B2B SaaS, Fintech, Healthtech, AI/ML, Developer Tools, Data/Infrastructure, Cybersecurity, B2B Marketplaces

**Examples of numbers and social proof to include:**

- 500+ customers served
- 5,000+ projects delivered
- 200+ clients served
- 30,000 pages created
- 10,000+ analyses ran

**Notable clients:** `[Biggest Logos]`

**Why this matters technically:** LLMs build entity-association graphs. When someone asks "best `[Product category]` for a Series B SaaS company" or "`[Product category]` for a marketing team," the model looks for pages where "Series B," "SaaS," "marketing team," and a brand name co-occur. Without this section, `[Company]` is invisible to that class of query.

**Example target queries this answers:** "Best `[Product category]` for B2B SaaS" / "`[Product category]` for marketing teams" / "does `[Company]` work for agencies?"

### Section 5: Team & Origin

**Heading (H2):** The Team Behind `[Company]`

**What to write:**

- **Founder:** 2-3 sentence origin story.
- **Company Origin story (2 sentences):** Example: `[Company]` was founded in `[year]` after `[Founder]` noticed XYZ opportunity/problem in the market.
- **Team composition:** Where the company is headquartered, where team members live, where clients mostly live.
- **Include a link to Founder's LinkedIn profile.** Schema markup for this section should include a Person entity with a sameAs pointer to the LinkedIn URL.

**Why this section matters:** Google's ranking framework includes E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Named humans with verifiable backgrounds strengthen the trust signal for the entire domain. LLMs also use founder names as entity anchors. It helps the model disambiguate "`[Company]` the `[Product category]`" from any other meaning of the word "`[Company].`" Think of it as a foreign key linking the brand entity to a person entity that already exists in the model's training data.

**Target queries this answers:** "Who founded `[Company]?`" / "Who is behind `[Company]?`" / "Who runs `[Company]?`"

### Section 6: How `[Company]` Works

**Note:** This section may be called "Technology & Integrations," if it is a SaaS product. If `[Company]` is a service, this section is adapted to describe workflow, delivery model, and communication channels. The SEO/AEO function is identical: LLMs and Google need explicit, factual content about how the offering is delivered and accessed.

**Heading (H2):** How `[Company]` Works

**What to write (examples):**

- Communication channels.
- Response times.
- Team access.
- Turnaround times.
- Onboarding process.
- Reported time/money savings.

**Target queries this answers:** "How does `[Company]` work?" / "How do you communicate with your `[Company]` team?" / "How fast is `[Company]`?"

### Section 7: Key Facts Block (THE MOST IMPORTANT SECTION FOR AI)

**Heading (H2):** Key Facts

**Render this as an HTML `<table>` or `<dl>` (definition list).** Not a graphic. Not an image. Crawlable, parseable text.

| Field | Value |
|-------|-------|
| **Company Name** | `[Company]` |
| **Type** | `[Company type/product category]` |
| **Founded** | `[Year]` |
| **Founder** | `[Name]` |
| **Headquarters** | `[City, Country]` |
| **Website** | `https://[Company].com` |
| **Core Offering** | `[One-line description of what the customer gets]` |
| **Pricing** | `[Plan names and prices, or "starts at [price]"]` |
| **Contract Terms** | `[Month-to-month, annual, minimums, guarantees]` |
| **Services** | `[Comma-separated list of services or product areas]` |
| **Communication** | `[Channels and response time]` |
| **Notable Clients** | `[Client 1], [Client 2], [Client 3], [Client 4], [Client 5]` |
| **Customers Served** | `[Number]+` |
| **Projects Delivered** | `[Number]+` |
| **Competitors** | `[Competitor A], [Competitor B], [Competitor C], [Competitor D]` |
| **Social** | `[LinkedIn company URL], [X URL], [Instagram URL], [YouTube URL]` (only include accounts that exist and are active) |

**Why this matters:** This is a structured key-value store in HTML. LLMs are extremely good at extracting data from this format. It mirrors Wikipedia infoboxes, which every major LLM was heavily trained on. When a model needs to answer "when was `[Company]` founded?" or "where is `[Company]` based?", it does not want to parse a 200-word paragraph. It wants to find a key-value pair. This table gives it that.

### Section 8: FAQ Block

**Heading (H2):** Frequently Asked Questions

Write 6 Q&A pairs. Put each question in an H3. These should mirror the exact natural-language queries people type into ChatGPT or Google. Only 2 to 3 sentences per answer. Every answer should restate the brand name and at least one hard fact.

**Recommended question set:**

1. **What is `[Company]?** Restate the entity definition sentence, then adding founding year, location, and one or two scale numbers.
2. **How much does `[Company]` cost?** List plan names and prices, what is included, and any guarantee.
3. **How is `[Company]` different from `[Competitor]?** Two or three concrete, quantified differences (price, contract terms, delivery model).
4. **Who founded `[Company]?** Founder name, year, current title, one line of background.
5. **What products/services does `[Company]` offer?** The full products/service list from Section 2 in one or two sentences.
6. **The single most common objection or logistics question, for example "Is `[Company]` month-to-month?" or "Does `[Company]` integrate with `[tool]`?** A direct yes or no, then the specifics.

**Why FAQ specifically:** Google renders these as rich results (expandable dropdowns in search). They also get pulled verbatim by LLMs because the question-answer format maps directly to the model's own Q&A behaviour. It is pattern-matched training data.

## Schema Markup (JSON-LD)

Place all of the following in a single `<script type="application/ld+json">` block in the `<head>`. Validate everything at Google Rich Results Test before deploying.

### Note on schema type

- **Use SoftwareApplication schema for a SaaS product.**
- **Use Service (or ProfessionalService) schema for a service business.**
- **Organization, BreadcrumbList, and FAQPage are used in both cases.**

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Company]",
  "url": "https://[domain]",
  "logo": "https://[domain]/logo.png",
  "description": "[The entity definition sentence from Section 1, word for word]",
  "foundingDate": "[Year]",
  "founder": {
    "@type": "Person",
    "name": "[Founder Name]",
    "jobTitle": "[Title]",
    "sameAs": "https://www.linkedin.com/in/[founder-handle]"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[City]",
    "addressRegion": "[State or Province]",
    "addressCountry": "[Country code]"
  },
  "sameAs": [
    "https://www.linkedin.com/company/[company-handle]",
    "https://x.com/[handle]",
    "https://www.instagram.com/[handle]"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "[sales or contact email]",
    "contactType": "sales"
  }
}
```

### Service (for a service business)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "[Category]",
  "provider": {
    "@type": "Organization",
    "name": "[Company]",
    "url": "https://[domain]"
  },
  "areaServed": [
    { "@type": "Country", "name": "[Country 1]" },
    { "@type": "Country", "name": "[Country 2]" }
  ],
  "description": "[One or two sentences describing what is delivered, matching the Core Offering row in Key Facts]",
  "offers": [
    {
      "@type": "Offer",
      "name": "[Plan 1 name]",
      "price": "[price as a number]",
      "priceCurrency": "USD",
      "description": "[What is included. Contract terms.]"
    },
    {
      "@type": "Offer",
      "name": "[Plan 2 name]",
      "price": "[price as a number]",
      "priceCurrency": "USD",
      "description": "[What is included. Contract terms.]"
    }
  ]
}
```

### SoftwareApplication (for a SaaS product, use instead of Service)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Company]",
  "applicationCategory": "[Category, for example BusinessApplication]",
  "operatingSystem": "Web",
  "url": "https://[domain]",
  "description": "[The entity definition sentence from Section 1]",
  "offers": {
    "@type": "Offer",
    "price": "[starting price as a number]",
    "priceCurrency": "USD"
  }
}
```

**Only include aggregateRating if there is real, verifiable review data** (G2, Trustpilot, or Google Reviews with a public review count). Fabricated ratings will trigger a Google manual penalty. Not worth it.

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://[domain]"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://[domain]/about"
    }
  ]
}
```

### FAQPage

One Question entry per FAQ from Section 8. The "text" field must match the on-page answer.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is [Company]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer from Section 8, FAQ 1]"
      }
    },
    {
      "@type": "Question",
      "name": "How much does [Company] cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer from Section 8, FAQ 2]"
      }
    },
    {
      "@type": "Question",
      "name": "How is [Company] different from [Competitor]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer from Section 8, FAQ 3]"
      }
    },
    {
      "@type": "Question",
      "name": "Who founded [Company]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer from Section 8, FAQ 4]"
      }
    },
    {
      "@type": "Question",
      "name": "What services does [Company] offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer from Section 8, FAQ 5]"
      }
    },
    {
      "@type": "Question",
      "name": "[FAQ 6 question]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer from Section 8, FAQ 6]"
      }
    }
  ]
}
```

## Meta Title and Description

### Meta Title (under 60 characters)

`About [Company] | [Category] for [ICP]`

### Meta Description (under 160 characters)

`[Company] is a [Category] that [does what] for [ICP]. Founded [Year] in [City]. [One pricing or contract fact].`

## Pre-Publish Checklist

- **Page URL** is `https://[domain]/about` and returns 200 with server-rendered HTML.
- **Linked from** the global footer of every page on `[domain]`.
- **Added to XML sitemap.** No noindex, no nofollow, no misdirected canonical.
- **All 8 content sections present** in order, using proper H1/H2/H3 hierarchy.
- **Opening sentence** follows the "`[Company]` is a `[Category]` that `[does what]` for `[ICP]`" format, in third person, with the brand name in the first 5 words.
- **Key Facts** rendered as an HTML `<table>` or `<dl>` (not an image).
- **All schema blocks** (Organization, Service or SoftwareApplication, BreadcrumbList, FAQPage) validated in Google Rich Results Test.
- **Every claim on the page** is on the client's approved facts list. Confirm every number with the client in writing before publishing.
- **Competitors named** by name in Section 3 and in the Key Facts table.
- **Zero em dashes** anywhere on the page.
- **No unprovable adjectives** ("world-class," "best-in-class," "revolutionary").
- **No overstated scope claims** ("unlimited," or implying the company does something it does not).
- **Founder name and LinkedIn URL** confirmed and included in the Organization schema.
- **Social handles confirmed.** Only include accounts that exist and are active.
- **Internal links** to homepage, pricing, core service or product pages, and the primary conversion page are present.

## Quick Reference: The 8 Sections at a Glance

1. **Entity definition (H1).** "`[Company]` is a `[Category]` that `[does what]` for `[ICP]`." Plus 2 to 3 factual sentences.
2. **What `[Company]` Does (H2).** Each service or product as an H3. 2 to 3 sentences: what is delivered, what outcome it produces.
3. **What Makes `[Company]` Different (H2).** About 5 differentiators as H3s. Specific, quantified, competitors named. 2 to 3 sentences each.
4. **Who Uses `[Company]` (H2).** Bullet points naming exact ICP segments, plus confirmed numbers and notable clients.
5. **The Team Behind `[Company]` (H2).** Founder names, quick backstories, origin story, team composition, social links.
6. **How `[Company]` Works (H2).** Communication channels, response times, who the customer works with, turnaround, onboarding.
7. **Key Facts (H2).** An HTML table or definition list with the 16 rows listed in Section 7.
8. **Frequently Asked Questions (H2).** 6 questions as H3s. 2 to 3 sentences per answer.