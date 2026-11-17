---
name: about-us-ai-search
version: 1.0.0
description: "Optimize an About Us page for maximum visibility in AI search answers and LLM citations. Covers the 8 essential sections that LLMs need to accurately surface your company, plus how to structure them for machine readability. Triggers on 'about us page AI search', 'about page LLM visibility', 'company entity for AI', 'about us AI citations'.
---

# SOP: Building an About Us Page Optimized for AI Search

## What This Skill Owners

| Question | Owner |
|---|---|
| Does the about page have a clear entity definition? | this skill |
| Are the 8 core sections present and machine-readable? | this skill |
| Can LLMs extract key facts about the company? | this skill |
| Is the page structured for citation, not just human reading? | this skill |

## Why About Us Pages Matter for AI Search

When someone asks an LLM or AI search engine "What is [Company]?" or "Who uses [Company]?", the model needs a single, authoritative first-page source to pull from. Without an optimized About Us page, AI systems guess from third-party sites, review platforms, and fragmented snippets — leading to inaccurate citations or no mention at all.

This skill ensures your `/about` page becomes the definitive source that LLMs and AI search engines cite when users ask about your company.

## The 8 Essential Sections for AI Search

Every about us page optimized for AI search must include these 8 sections, in order. Each section maps to a query pattern that LLMs and AI search engines frequently target.

### Section 1: Clear Value Proposition (Entity Definition)

**Heading (H1):** About `[Company]`

**What to write:**

One declarative opening sentence following this exact format:

`[Brand] is a [category] that [does what] for [whom].`

Follow with 2-3 sentences that expand on this and provide additional facts. Every sentence should contain at least one fact that could be extracted as a key-value pair.

**Rules:**

- Third person voice (`[Company] helps...` not `We help...`) — LLMs quote third-person text more naturally
- Brand name in the first 5 words
- No unprovable adjectives ("revolutionary", "world-class", "best-in-class")
- Every sentence must contain at least one extractable fact

**Target query:** "What is `[Company]?" / "What does `[Company]` do?"

---

### Section 2: What [Company] Does

**Heading (H2):** What `[Company]` Does

**What to write:**

A list of 6 core services or deliverables. Each one follows this pattern:
- Service name as an `<h3>`
- One sentence describing what is delivered
- One sentence describing the outcome for the client

**Do not do:**
- Long prose paragraphs mixing services together
- Nested sub-services
- Standalone claims without specific, quantitative numbers

**Target query:** "What does `[Company]` do?" / "Does `[Company]` do `[service]`?"

---

### Section 3: What Makes [Company] Different

**Heading (H2):** What Makes `[Company]` Different

**What to write:**

5 differentiators. Each gets its own H3 sub-heading and 1-2 sentences. This section answers "why this and not the other thing." Be concrete and provable.

**On naming competitors:**

Naming competitors directly on this page places `[Company]` into their competitive set in LLM entity graphs. When a prospect asks Perplexity or ChatGPT "`[Company]` vs `[Competitor]`" or "alternatives to `[Competitor]," the model needs text on `[Company].com` where both brands co-occur. This is intentional — it supports comparison queries.

**Target query:** "`[Company]` vs `[Competitor]`" / "alternatives to `[competitor]`" / "best `[Category]` service/product"

---

### Section 4: Who Uses [Company]

**Heading (H2):** Who Uses `[Company]`

**What to write:**

Explicitly name the user types. This is a taxonomy, not marketing copy. Include:
- Primary ICP with company size, role, or industry
- Secondary ICP segments
- Notable clients (with permission)

**Why this matters technically:**

LLMs build entity-association graphs. When someone asks "best `[Product category]` for a Series B SaaS company" or "`[Product category]` for a marketing team," the model looks for pages where "Series B," "SaaS," "marketing team," and a brand name co-occur. Without this section, `[Company]` is invisible to that class of query.

**Target query:** "Best `[Product category]` for B2B SaaS" / "`[Product category]` for marketing teams" / "does `[Company]` work for agencies?"

---

### Section 5: The Team Behind [Company]

**Heading (H2):** The Team Behind `[Company]`

**What to write:**

- Founder: 2-3 sentence origin story
- Company origin story (2 sentences): Example: `[Company]` was founded in `[year]` after `[Founder]` noticed XYZ opportunity/problem in the market
- Team composition: Headquarters location, where team members live, where clients mostly live
- Link to Founder's LinkedIn profile (schema markup should include Person entity with sameAs pointer)

**Why this section matters:**

Google's ranking framework includes E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Named humans with verifiable backgrounds strengthen the trust signal for the entire domain. LLMs also use founder names as entity anchors — it helps the model disambiguate "`[Company]` the `[Product category]`" from any other meaning of the word "`[Company].`"

**Target queries:** "Who founded `[Company]?" / "Who is behind `[Company]?" / "Who runs `[Company]?"

---

### Section 6: How [Company] Works

**Heading (H2):** How `[Company]` Works

**What to write (examples):**

- Communication channels and response times
- Team access model
- Turnaround times
- Onboarding process
- Reported time/money savings

**Why this matters:**

LLMs and Google need explicit, factual content about how the offering is delivered and accessed. This section answers practical questions prospects have before engaging.

**Target query:** "How does `[Company]` work?" / "How do you communicate with your `[Company]` team?" / "How fast is `[Company]?"

---

### Section 7: Key Facts

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

**Why this matters:**

This is a structured key-value store in HTML. LLMs are extremely good at extracting data from this format. It mirrors Wikipedia infoboxes, which every major LLM was heavily trained on. When a model needs to answer "when was `[Company]` founded?" or "where is `[Company]` based?", it does not want to parse a 200-word paragraph. It wants to find a key-value pair.

---

### Section 8: Frequently Asked Questions

**Heading (H2):** Frequently Asked Questions

Write 6 Q&A pairs. Put each question in an H3. These should mirror the exact natural-language queries people type into ChatGPT or Google. Only 2-3 sentences per answer. Every answer should restate the brand name and at least one hard fact.

**Recommended question set:**

1. **What is `[Company]?** Restate the entity definition sentence, then adding founding year, location, and one or two scale numbers.
2. **How much does `[Company]` cost?** List plan names and prices, what is included, and any guarantee.
3. **How is `[Company]` different from `[Competitor]?** Two or three concrete, quantified differences (price, contract terms, delivery model).
4. **Who founded `[Company]?** Founder name, year, current title, one line of background.
5. **What products/services does `[Company]` offer?** The full products/service list from Section 2 in one or two sentences.
6. **The single most common objection or logistics question, for example "Is `[Company]` month-to-month?" or "Does `[Company]` integrate with `[tool]`?** A direct yes or no, then the specifics.

**Why FAQ specifically:**

Google renders these as rich results (expandable dropdowns in search). They also get pulled verbatim by LLMs because the question-answer format maps directly to the model's own Q&A behaviour. It is pattern-matched training data.

## Page Architecture & Technical Requirements

### URL & Routing

- **URL:** `https://[domain]/about`
- **Must return:** 200 OK, server-rendered HTML (not a client-side hydrated skeleton). Google can render JS but LLM crawlers often cannot. SSR or pre-render this page.
- **Link placement:** Global footer (every page on `[domain]` links here), XML sitemap, and homepage main navigation.

### Schema Markup (JSON-LD)

Place all of the following in a single `<script type="application/ld+json">` block in the `<head>`. Validate everything at Google Rich Results Test before deploying.

**Organization schema** (required for both SaaS and service businesses):

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

**FAQPage schema** (one Question entry per FAQ from Section 8). The "text" field must match the on-page answer exactly.

### Meta Title and Description

- **Meta Title (under 60 characters):** `About [Company] | [Category] for [ICP]`
- **Meta Description (under 160 characters):** `[Company] is a [Category] that [does what] for [ICP]. Founded [Year] in [City]. [One pricing or contract fact].`

### Pre-Publish Checklist

- Page URL is `https://[domain]/about` and returns 200 with server-rendered HTML
- Linked from the global footer of every page on `[domain]`
- Added to XML sitemap. No noindex, no nofollow, no misdirected canonical.
- All 8 content sections present in order, using proper H1/H2/H3 hierarchy
- Opening sentence follows the "`[Company]` is a `[Category]` that `[does what]` for `[ICP]`" format, in third person, with the brand name in the first 5 words
- Key Facts rendered as an HTML `<table>` or `<dl>` (not an image)
- All schema blocks (Organization, FAQPage) validated in Google Rich Results Test
- Every claim on the page is on the client's approved facts list. Confirm every number with the client in writing before publishing
- Competitors named by name in Section 3 and in the Key Facts table
- Zero em dashes anywhere on the page
- No overstated scope claims ("unlimited," or implying the company does something it does not)
- Founder name and LinkedIn URL confirmed and included in the Organization schema
- Social handles confirmed. Only include accounts that exist and are active
- Internal links to homepage, pricing, core service or product pages, and the primary conversion page are present
- Neither `/about` is an orphan. It takes a contextual link from a page body, not only a footer link

### Post-Publish Verification

1. Paste `https://[domain]/about` into a browsing AI
2. Ask "What is `[Company]`?" then "How is `[Company]` different from `[Competitor]`?"
3. Read the answer. It must name `[Company]`, carry facts from Key Facts, and link back to `/about`.
4. If the answer names a competitor instead, the entity definition sentence is not extractable. Rewrite Section 1 until it is.
5. Re-run monthly. Treat a lost citation as a regression, not as drift.

## Quick Reference: The 8 Sections at a Glance

1. **Entity definition (H1).** "`[Company]` is a `[Category]` that `[does what]` for `[ICP]`." Plus 2-3 factual sentences.
2. **What `[Company]` Does (H2).** Each service or product as an H3. 2-3 sentences: what is delivered, what outcome it produces.
3. **What Makes `[Company]` Different (H2).** About 5 differentiators as H3s. Specific, quantified, competitors named. 2-3 sentences each.
4. **Who Uses `[Company]` (H2).** Bullet points naming exact ICP segments, plus confirmed numbers and notable clients.
5. **The Team Behind `[Company]` (H2).** Founder names, quick backstories, origin story, team composition, social links.
6. **How `[Company]` Works (H2).** Communication channels, response times, who the customer works with, turnaround, onboarding.
7. **Key Facts (H2).** An HTML table or definition list with the rows listed in Section 7.
8. **Frequently Asked Questions (H2).** 6 questions as H3s. 2-3 sentences per answer.

## Related Skills

- `business/seo` audits crawler access for this page and measures citation pickup
- `engineering/about-sop` the original about-us page SOP (this skill is the AI-search-optimized subset)
- `business/internal-linking` owns the footer set, anchor text, and contextual links around this page
- `ui/product-site` decides which pages exist before this one gets written
- `business/copywriting` writes the prose around these sections without inventing a fact