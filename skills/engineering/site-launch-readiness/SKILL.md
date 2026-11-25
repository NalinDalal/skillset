---
name: site-launch-readiness
version: 1.0.0
description: "Pre-launch site readiness checklist: SSR, robots.txt, sitemap, title tags, meta descriptions, H1, canonical, OG images, 404, 301 redirects, alt text, WebP, lazy loading, org schema, breadcrumbs, internal links, GA, Search Console, privacy policy, contact form. Use when the user asks 'what do I need before launching a site', 'site launch checklist', 'pre-launch checklist', 'launch readiness', 'technical SEO checklist', or 'is my site ready to ship'."
---

# SOP: Site Launch Readiness

## What this skill owns

Twenty checks. Run them before a site goes live. Each check names the owner skill when one exists, and gives the minimum viable implementation when none does.

## Owner map

| # | Item | Owner |
|---|---|---|
| 1 | Server-side rendering | this skill |
| 2 | robots.txt | business/seo |
| 3 | sitemap.xml | business/seo |
| 4 | Unique title tags | this skill plus ui/product-site |
| 5 | Meta descriptions | this skill |
| 6 | One H1 per page | this skill plus business/copywriting |
| 7 | Canonical tags | business/ai-readable-site |
| 8 | Open Graph images | this skill |
| 9 | Custom 404 page | ui/product-site |
| 10 | 301 redirects | this skill plus devops/deployments |
| 11 | Alt text | this skill |
| 12 | WebP images | devops/performance |
| 13 | Lazy loading | devops/performance |
| 14 | Organization schema | business/about-sop |
| 15 | Breadcrumbs | business/internal-linking |
| 16 | Internal links | business/internal-linking |
| 17 | Google Analytics | this skill |
| 18 | Search Console | business/seo |
| 19 | Privacy policy | ui/product-site |
| 20 | Working contact form | ui/product-site |

## The checklist

### 1. Server-side rendering

Ship HTML that a crawler can read without running JavaScript. Client-only rendering hides content from search engines and from AI fetchers.

Minimum viable:

- Render the first paint on the server. Use SSR, SSG, or ISR. Pick one and stay consistent.
- Test with `curl https://site/` and confirm the page text appears in the response body.
- Keep client JavaScript for interactivity only, not for core content.

Owner: this skill. Cross-check with devops/performance for bundle size.

### 2. robots.txt

Allow the crawlers you want. Block the ones you do not.

Minimum viable:

- Serve `/robots.txt` with a 200 status from the same origin.
- Allow search and index bots: `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`.
- Block training bots if the client wants that: `GPTBot`, `ClaudeBot`, `CCBot`.
- Link the sitemap: `Sitemap: https://site/sitemap.xml`.

Owner: business/seo. Follow its bot-class table and policy template.

### 3. sitemap.xml

List every page you want indexed. Update it when pages change.

Minimum viable:

- Serve `/sitemap.xml` with a 200 status.
- Include every indexable URL. Exclude 404s, redirects, and noindex pages.
- Submit it in Search Console (item 18).
- Regenerate on deploy, not by hand.

Owner: business/seo.

### 4. Unique title tags

Every page gets a title that describes that page. No two pages share one.

Minimum viable:

- One `<title>` per page, 50 to 60 characters.
- Format: `Primary topic | Brand` or `Brand: topic`. Pick one and stay consistent.
- Put the unique part first. Brand last.
- Check for duplicates with a crawler or a script before launch.

Owner: this skill. ui/product-site owns page inventory.

### 5. Meta descriptions

Write a description for every indexable page. Search engines may rewrite them, but a good one still earns clicks.

Minimum viable:

- One `<meta name="description">` per page, 150 to 160 characters.
- Describe the page, not the site.
- Include the primary keyword once, naturally.
- Avoid duplicate descriptions across pages.

Owner: this skill.

### 6. One H1 per page

One H1 per page. It states the page topic.

Minimum viable:

- Exactly one `<h1>` in the document.
- The H1 matches the page title intent.
- Use H2 and H3 for sections. Do not skip levels.
- Check with a crawler before launch.

Owner: business/copywriting writes the words. This skill enforces the count.

### 7. Canonical tags

Tell search engines which URL is the real one. Stops duplicate content from splitting ranking signals.

Minimum viable:

- One `<link rel="canonical" href="...">` per page, pointing to the preferred URL.
- Use absolute URLs, not relative.
- Self-referencing canonical on the preferred version.
- Match the canonical to the sitemap entry (item 3).

Owner: business/ai-readable-site. It covers canonical headers and noindex rules.

### 8. Open Graph images

Social previews need an image. A missing one looks broken in shares.

Minimum viable:

- One `og:image` per page, 1200 by 630 pixels.
- Use a real image, not a logo on a blank background.
- Include `og:title`, `og:description`, `og:url`, `og:type`.
- Test with the platform debuggers before launch.

Owner: this skill. ui/product-site owns the asset list.

### 9. Custom 404 page

A default 404 loses visitors. A custom one keeps them.

Minimum viable:

- A branded 404 page with a link home and a search box if you have search.
- Return a real 404 status code, not a 200.
- Noindex the 404 page.
- Log 404s so broken links get fixed.

Owner: ui/product-site lists system states.

### 10. 301 redirects

Moved a URL? Redirect it. Permanent redirects pass ranking signals.

Minimum viable:

- Map every old URL to its new home before launch.
- Use 301 for permanent moves, 302 only for temporary ones.
- Avoid redirect chains. Point A straight to C.
- Test redirects with `curl -I` after deploy.

Owner: this skill. devops/deployments owns server config.

### 11. Alt text

Describe images for screen readers and for search. Empty alt on meaningful images is a failure.

Minimum viable:

- Every content image gets descriptive alt text.
- Decorative images get empty alt: `alt=""`.
- Keep alt under 125 characters.
- Do not stuff keywords into alt text.

Owner: this skill.

### 12. WebP images

Serve modern formats. Smaller files, same quality.

Minimum viable:

- Convert source images to WebP. Keep a fallback for old browsers if needed.
- Use `picture` with `source type="image/webp"` when fallback matters.
- Check that the served type is `image/webp`, not just the filename.
- Compress before converting.

Owner: devops/performance.

### 13. Lazy loading

Do not load images the user has not scrolled to.

Minimum viable:

- Add `loading="lazy"` to below-the-fold images.
- Do not lazy-load the LCP image. It delays the largest paint.
- Add `decoding="async"` on images.
- Test that lazy images still load on scroll.

Owner: devops/performance.

### 14. Organization schema

Tell search engines and AI who you are. Structured data earns rich results.

Minimum viable:

- Add `Organization` JSON-LD to the homepage.
- Include name, url, logo, and sameAs links to social profiles.
- Validate with the Rich Results Test before launch.
- Keep the data accurate. Do not invent certifications.

Owner: business/about-sop owns entity definition.

### 15. Breadcrumbs

Show where a page sits in the site. Breadcrumbs help users and crawlers.

Minimum viable:

- Add breadcrumb navigation on nested pages.
- Mark it up with `BreadcrumbList` JSON-LD.
- Link each crumb to its parent.
- Match the breadcrumb path to the URL path.

Owner: business/internal-linking.

### 16. Internal links

Pages need paths in. Orphan pages do not rank.

Minimum viable:

- Every page reachable within three clicks from the homepage.
- Link from strong pages to money pages with descriptive anchors.
- No orphan pages. Check with a crawler.
- Avoid `nofollow` on internal links unless you mean it.

Owner: business/internal-linking. Follow its money-page and footer rules.

### 17. Google Analytics

Measure what happens. Without data you are guessing.

Minimum viable:

- Install GA4 with a single measurement ID.
- Track page views and key events: signup, purchase, contact.
- Verify events fire in the real-time view.
- Respect consent. Do not load the tag before consent where required.

Owner: this skill.

### 18. Search Console

See what Google sees. Search Console is free and direct.

Minimum viable:

- Verify the property. Use DNS or HTML file method.
- Submit the sitemap (item 3).
- Check coverage for errors and excluded pages.
- Set up email alerts for issues.

Owner: business/seo. It covers the measurement loop.

### 19. Privacy policy

A live site that collects data needs a privacy policy. Legal pages are not optional.

Minimum viable:

- Publish a privacy policy at `/privacy`.
- State what you collect, why, and how long you keep it.
- Link it in the footer on every page.
- Match the policy to the actual product and jurisdiction. Do not copy a template blindly.

Owner: ui/product-site lists trust and legal pages.

### 20. Working contact form

A contact form that does not work is worse than no form. Test it.

Minimum viable:

- Submit the form yourself. Confirm the message arrives.
- Show a success state and an error state.
- Protect against spam with a honeypot or a captcha.
- Log failures so broken forms get noticed.

Owner: ui/product-site. It owns the contact page.


### 21. Open Graph image

Social previews need an image. A missing one looks broken in shares.

Minimum viable:

- One og:image per page, 1200 by 630 pixels.
- Use a real image, not a logo on a blank background.
- Include og:title, og:description, og:url, og:type.
- Test with the platform debuggers before launch.

Owner: this skill. ui/product-site owns the asset list.

### 22. Sitemap XML

List every page you want indexed. Update it when pages change.

Minimum viable:

- Serve /sitemap.xml with a 200 status.
- Include every indexable URL. Exclude 404s, redirects, and noindex pages.
- Submit it in Search Console.
- Regenerate on deploy, not by hand.

Owner: business/seo.

### 23. Alt text on every image

Describe images for screen readers and search. Empty alt on meaningful images is a failure.

Minimum viable:

- Every content image gets descriptive alt text.
- Decorative images get empty alt: alt="".
- Keep alt under 125 characters.
- Do not stuff keywords into alt text.

Owner: this skill.

### 24. Mobile breakpoints

A layout that breaks at common widths loses mobile users.

Minimum viable:

- Test at 375px, 768px, and 1024px widths.
- Fix overflow, clipping, and cramped tap targets.
- Use responsive units, not fixed pixel widths.
- Check tables, images, and code blocks.

Owner: this skill. ui/launch-polish covers mobile overflow.

### 25. Sticky mobile CTA

Mobile users should always have a next step within reach.

Minimum viable:

- Fix a CTA bar to the bottom of the viewport on mobile.
- Show it only after the hero scrolls out of view.
- Keep it short: one button.
- Do not cover content or cookie banners.

Owner: business/launch-conversion. ui/launch-polish covers mobile polish.

### 26. Loading states

Missing loading states feel broken during async work.

Minimum viable:

- Show a spinner or skeleton while data loads.
- Disable buttons during submit.
- Show progress for long operations.
- Avoid blank screens.

Owner: this skill. ui/launch-polish covers skeletons.

### 27. Form error states

Users need to know what went wrong and how to fix it.

Minimum viable:

- Show a clear error next to the field or action.
- Say what happened and what to do next.
- Avoid technical jargon.
- Do not clear the form on error.

Owner: this skill. ui/launch-polish covers messages.

### 28. Privacy policy page

A live site that collects data needs a privacy policy.

Minimum viable:

- Publish a privacy policy at /privacy.
- State what you collect, why, and how long you keep it.
- Link it in the footer on every page.
- Match the policy to the product and jurisdiction.

Owner: ui/product-site lists trust and legal pages.

### 29. Terms page

Terms set the rules. A live site needs them.

Minimum viable:

- Publish terms at /terms.
- Cover acceptable use, liability, and termination.
- Link it in the footer on every page.
- Match the terms to the product and jurisdiction.

Owner: ui/product-site lists trust and legal pages.

### 30. Cookie banner

Sites that use cookies need consent where required.

Minimum viable:

- Show a banner before setting non-essential cookies.
- Let users accept or reject.
- Store the choice and respect it.
- Link to the cookie policy.

Owner: this skill. ui/product-site lists legal pages.

## Verification

Run this before launch. Every box must be checked.

- [ ] `curl` returns full HTML for the homepage.
- [ ] `/robots.txt` and `/sitemap.xml` return 200.
- [ ] No duplicate title tags or meta descriptions.
- [ ] One H1 per page.
- [ ] Canonical tags present and correct.
- [ ] OG images load and preview correctly.
- [ ] Custom 404 returns 404 status.
- [ ] Redirects tested with `curl -I`.
- [ ] Images have alt text and serve as WebP where possible.
- [ ] Lazy loading on below-the-fold images.
- [ ] Organization schema validates.
- [ ] Breadcrumbs present on nested pages.
- [ ] No orphan pages.
- [ ] GA4 events fire in real time.
- [ ] Search Console verified and sitemap submitted.
- [ ] Privacy policy linked in footer.
- [ ] Contact form tested end to end.
- [ ] Open Graph image loads and previews.
- [ ] Sitemap submitted and returns 200.
- [ ] Alt text on every content image.
- [ ] No overflow at 375px, 768px, 1024px.
- [ ] Sticky mobile CTA works.
- [ ] Loading states on async actions.
- [ ] Form error states are clear.
- [ ] Privacy policy linked in footer.
- [ ] Terms page linked in footer.
- [ ] Cookie banner respects consent.

## Related skills

- business/seo: crawler access, robots, sitemap, Search Console
- business/ai-readable-site: canonical, markdown routes, llms.txt
- business/about-sop: organization entity
- business/internal-linking: money pages, footer, breadcrumbs
- ui/product-site: page inventory, 404, legal pages, contact
- devops/performance: WebP, lazy loading, bundle size
- devops/deployments: redirects, server config
- business/copywriting: titles, H1, meta descriptions
