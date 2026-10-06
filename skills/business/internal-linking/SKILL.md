---
name: internal-linking
version: 1.0.0
description: "Plan a site's internal link graph: which pages earn site-wide links, the money-page footer set, descriptive anchor text, contextual links inside articles, hub-and-spoke clusters, and orphan-page cleanup. Use when the user asks about 'internal linking', 'which pages go in my footer', 'footer links', 'money pages', 'link equity', 'anchor text', 'site structure', 'hub and spoke', 'orphan pages', 'crawl depth', 'my pages are not ranking', or wants search engines and AI answers to reach the pages that sell."
---

# SOP: Internal Linking

## What this skill owns

Three skills touch a site's links. Keep them apart:

- `ui/product-site` decides which pages exist.
- `business/copywriting` and `ui/product-messaging` write the words, including the words inside a link.
- This skill decides where links point and what those links say.

## What an internal link does

An internal `<a href>` does three jobs at once:

1. **Discovery.** A crawler has to reach the page to read it. Discounted pages sit behind JavaScript menus, `nofollow`, or redirects.
2. **Ranking signal.** A link passes context and equity to the destination. A link from a strong page to `/pricing` says `/pricing` matters.
3. **Entity association.** AI answers build graphs from co-occurring text. A site where the product name, the category, and the customer type sit next to each other in link labels is easier to describe correctly.

The third job is why anchor text matters more than link count. Five hundred links to `/product` labelled "product" teach nothing. Six links labelled "email marketing for Shopify" teach the exact pairing you want quoted back.

## Step 1: Name the money pages

A money page is a page where a visitor can become a customer. Pick 4 to 6. Not 30.

The set:

1. `/pricing`, always.
2. The main product or service page, the one you would sell on a call.
3. One use-case page per segment you actually sell to. "Email marketing for Shopify" earns its place because Shopify stores are a real segment, not because it fills a slot.

Write each one down with a single job and a single visitor. A page with two jobs attracts two audiences and converts neither.

| Page | Job | Visitor | In footer? |
|---|---|---|---|
| /pricing | Show cost | Comparing vendors | Yes |
| /email-marketing | Sell the core service | Owner with no tool | Yes |
| /email-marketing-for-shopify | Sell to one segment | Shopify store owner | Yes |
| /email-marketing-for-agencies | Sell to one segment | Agency owner | Yes |
| /statistics | Supply evidence | Skeptical evaluator | Yes |

Rules:

- 4 to 6 is a ceiling, not a target. A focused footer beats a complete one.
- Every money page takes a link from the body of at least one other page, not only from the footer.
- No money page behind a hover menu or a "Resources" dropdown. Crawlers and most AI fetchers skip those.

## Step 2: Build the shared footer

The footer is the one link block that repeats on every page of a template. That makes it the cheapest place to give a page site-wide relevance.

```
Product
  Email marketing software
  Pricing
Resources
  Statistics and original research
Company
  About
  Contact
Legal
  Privacy
  Terms
```

Rules:

- **Use the money-page set as the footer labels.** Descriptive names, not "Features" or "Learn more."
- **One label per destination.** Never a "Product" link pointing at three pages.
- **Normal text links.** Real `<a href>` elements with real anchor text. Not a script handler, not an image with an `alt`, not an SVG sprite.
- **No `nofollow` and no `rel="sponsored"`** on internal links to your own money pages.
- **Keep the footer identical across templates.** Many sites ship a different footer on blog posts, docs, and marketing pages. Crawlers read each template separately, so a money page linked only in the blog footer is not linked site-wide.
- **Check the mobile footer.** Accordion sections hide items behind a tap. Keep pricing and the main product visible without a tap.
- **Stay under about 25 links in total.** Past that, nobody scans it and the signal spreads thin.

Verify by hand, not from memory:

- Open the homepage, a blog post, a product page, and a docs page. All four show the same set.
- Click every footer link. Each opens the right page, with no redirect chain.
- Resize to 375px wide. The money links stay visible.
- View source. The links sit in the HTML, not injected by script.

## Step 3: Write anchor text that names the destination

The anchor text is the phrase a model has to repeat. Write it as the thing a buyer searches for.

| Weak | Strong | Why |
|---|---|---|
| Click here | Email marketing for Shopify | "Click here" carries no topic |
| Read more | Email marketing automation | Names the category |
| Learn more | Pricing | Names the destination |
| Services | Email marketing software | Names the product |

Rules:

- Describe the destination. Never "click here," "read more," "this," or "learn more."
- Use the buyer's words, not the company's internal name. "Onboarding" means nothing outside the company. "Set up your first workspace" does.
- Give each page one primary phrase and keep it site-wide. Mixed labels for one destination split the signal.
- Vary the phrasing where it reads naturally, and keep the destination constant. Six variants of the same phrase read as spam to a person and as noise to a model.
- Skip matchy phrasing inside a sentence. A sentence that reads like a keyword list is bad copy. Pick the phrase a person would type, then write the sentence around it.

## Step 4: Link from inside articles

A footer link says "this page exists." A link inside a sentence says "this page answers what you just read."

Anatomy of a good contextual link:

> Most teams send their first campaign within a week of signup, based on [6,200 accounts measured in 2025](https://[domain]/statistics#time-to-first-campaign).

The sentence carries the claim, the link carries the evidence, and the reader has a reason to click.

Rules:

- **1 to 3 contextual links per article.** More reads as a link dump.
- **Link the sentence that makes the claim,** not the nearest heading.
- **The surrounding sentence must justify the click.** Remove the link and the sentence falls apart. If it reads the same without the link, cut it.
- **Link to the page that continues the topic,** not to the homepage. "Read more about email automation" goes to the automation page.
- **Point at the finding,** not the section index, where the CMS supports anchor ids: `/statistics#time-to-first-campaign`.

Conflict to resolve, because two skills touch this:

`ui/impeccable` tells you to gather related links into one block at the end of a long article rather than scattering them mid-flow. That rule protects reading flow. Keep it. Both rules hold at once:

- Contextual links sit inside the sentences that earn them. Count: 1 to 3.
- Everything else goes in a "Related" block at the end. Count: as many as fit.

Never link the same destination twice in one article. One contextual link or one Related block, never both.

## Step 5: Build hub and spoke clusters

A cluster is one hub page plus its spokes.

```
/email-marketing                  hub
  /email-marketing/onboarding     spoke
  /email-marketing/automation     spoke
  /email-marketing/shopify        spoke
  /email-marketing/for-agencies   spoke
```

Rules:

- Every spoke links up to the hub near the top of the article, with the hub's primary phrase as anchor text.
- The hub links down to every spoke.
- Breadcrumbs mirror the same shape on every page in the cluster.
- Sibling spokes link to each other only where the reader wants the other one. A "next step" line at the end of a spoke does that job.
- One hub per topic. Two competing hubs for one topic split the internal signals.

Keep it shallow. Three clicks from the homepage to any page that matters.

## Step 6: Find and fix the traps

Run this audit quarterly. Crawl the site, export every internal link, then check:

- **Orphan pages.** Inbound internal links: 0. Fix by linking from a related page's body, not from the footer alone.
- **Depth.** Any page more than 3 clicks from the homepage. Add a link from a closer page.
- **Redirect chains.** `/blog/post` to `/blog/post-v2` to `/post`. Point the links at the final URL.
- **Mixed URL variants.** Trailing slashes, `www` versus bare domain, mixed case. Pick one form and correct the rest.
- **`nofollow` on internal money pages.** Usually a plugin default. Remove it.
- **Footer as the only inbound link.** A page with one footer link and nothing in any body reads as peripheral. Give it a contextual link.
- **Anchor text pointing at the wrong page.** A link labelled "pricing" that lands on `/contact`.
- **Images in link position with no anchor text.** Add `alt` text that names the destination.

## Measurement

Four numbers, checked quarterly:

- **Money-page inbound internal links.** Target: 5 or more from distinct pages, at least 3 of them from body copy.
- **Clicks from homepage to each money page.** Target: 2 or fewer.
- **Pages with 0 inbound internal links.** Target: 0.
- **Distinct anchor texts per destination.** Target: 1 primary, up to 3 variants.

## Pre-publish checklist

- [ ] Money-page set written down, 4 to 6 pages, one job each.
- [ ] Every money page linked from at least one page body, not only the footer.
- [ ] Footer identical across homepage, blog, product, and docs templates.
- [ ] Footer labels name destinations. No "click here," no "learn more."
- [ ] Money links visible on mobile without a tap.
- [ ] Footer links are real `<a href>` text links in the HTML.
- [ ] No `nofollow` on internal links.
- [ ] Every article has 1 to 3 contextual links inside earning sentences.
- [ ] Each destination linked at most once per article, plus one Related block at the end.
- [ ] Each cluster has one hub, spokes linking up, hub linking down.
- [ ] Breadcrumbs mirror the cluster shape.
- [ ] No page more than 3 clicks from the homepage.
- [ ] Zero orphan pages.
- [ ] Quarterly audit scheduled.

## Failure modes

- **A footer with 40 links.** Nobody scans it and the equity spreads to nothing. Cut back to the money-page set plus company and legal.
- **The footer is the only source of internal links.** Crawlers read a footer-only page as peripheral. Add contextual links.
- **Every link says "click here."** The site teaches a model nothing about its own pages. Name the destination.
- **Contextual links on every sentence.** Readers leave the article, sales drop, and the links stop reading as recommendations. Cap at 3.
- **Two hubs for one topic.** Signals split. Merge them.
- **Money pages behind a dropdown.** Some crawlers skip those. Link them as plain text.

## Related skills

- `business/seo` audits crawler access and measures whether this link plan moves AI visibility.
- `engineering/about-sop` owns `/about` and explains why footer links mark core entity pages.
- `business/research-page` publishes the findings your best contextual links point at.
- `ui/product-site` decides which pages exist.
- `business/copywriting` and `ui/product-messaging` write the words around a link.