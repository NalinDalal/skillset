---
name: launch-conversion
version: 1.0.0
description: "Conversion and trust launch checklist: CTA above the fold, internal links, thank you page, breadcrumbs, case studies, five FAQs, response time promise, sticky mobile CTA, social share image, maps and directions, real reviews, alt text, local schema, privacy policy page, Google Analytics, team photo, custom 404, robots.txt, unique titles, meta descriptions. Use when the user asks 'conversion checklist', 'trust signals before launch', 'launch conversion', 'local SEO launch', or 'make the site convert'."
---

# SOP: Launch Conversion and Trust

## What this skill owns

Twenty checks. They turn a live site into one that converts and earns trust. Technical SEO items live in engineering/site-launch-readiness. UI polish items live in ui/launch-polish.

## Owner map

| # | Item | Owner |
|---|---|---|
| 1 | Custom 404 page | ui/product-site |
| 2 | CTA above the fold | this skill |
| 3 | Internal links | business/internal-linking |
| 4 | Thank you page | this skill |
| 5 | Breadcrumbs | business/internal-linking |
| 6 | Case studies | this skill |
| 7 | Five FAQs | this skill |
| 8 | Response time promise | this skill |
| 9 | Sticky mobile CTA | this skill |
| 10 | robots.txt | business/seo |
| 11 | Unique page titles | engineering/site-launch-readiness |
| 12 | Meta descriptions | engineering/site-launch-readiness |
| 13 | Social share image | engineering/site-launch-readiness |
| 14 | Maps and directions | this skill |
| 15 | Real reviews | this skill |
| 16 | Alt text on images | engineering/site-launch-readiness |
| 17 | Local schema | business/about-sop |
| 18 | Privacy policy page | ui/product-site |
| 19 | Google Analytics | engineering/site-launch-readiness |
| 20 | Team photo | this skill |

## The checklist

### 1. Custom 404 page

A default 404 loses visitors. A custom one keeps them.

Minimum viable:

- Build a branded 404 page.
- Return a real 404 status code.
- Add a link home and a search box.
- Noindex the page.

Owner: ui/product-site lists system states.

### 2. CTA above the fold

Visitors should see the next step without scrolling.

Minimum viable:

- Put one primary CTA in the hero.
- Make it specific: "Start free trial", not "Learn more".
- Repeat it lower on long pages.
- Test on mobile.

Owner: this skill. business/copywriting writes the words.

### 3. Internal links

Pages need paths in. Orphan pages do not rank or convert.

Minimum viable:

- Every page reachable within three clicks from home.
- Link strong pages to money pages with descriptive anchors.
- No orphan pages.
- Avoid nofollow on internal links.

Owner: business/internal-linking.

### 4. Thank you page

A thank you page confirms the action and opens the next step.

Minimum viable:

- Route form submissions to a dedicated thank you URL.
- Confirm what happens next and when.
- Offer one next action: book a call, read a guide, invite a teammate.
- Track it as a conversion in GA4.

Owner: this skill.

### 5. Breadcrumbs

Breadcrumbs help users and crawlers find their place.

Minimum viable:

- Add breadcrumb navigation on nested pages.
- Mark it up with BreadcrumbList JSON-LD.
- Link each crumb to its parent.
- Match the path to the URL.

Owner: business/internal-linking.

### 6. Case studies

Proof beats claims. Case studies show the work.

Minimum viable:

- Publish at least one case study with a real customer.
- Include the problem, the approach, and the result with numbers.
- Name the customer if they allow it.
- Link case studies from the homepage and pricing page.

Owner: this skill. business/copywriting writes the story.

### 7. Five FAQs

FAQs remove friction and earn featured snippets.

Minimum viable:

- Answer the five questions prospects ask most.
- Keep each answer under 60 words.
- Add FAQ schema where it fits.
- Update them as new questions come in.

Owner: this skill.

### 8. Response time promise

A clear response time sets expectations and builds trust.

Minimum viable:

- State how fast you reply: "We reply within one business day."
- Put it next to the contact form.
- Keep the promise.
- Update it if it changes.

Owner: this skill.

### 9. Sticky mobile CTA

Mobile users should always have a next step within reach.

Minimum viable:

- Fix a CTA bar to the bottom of the viewport on mobile.
- Show it only after the hero scrolls out of view.
- Keep it short: one button.
- Do not cover content or cookie banners.

Owner: this skill. ui/launch-polish covers mobile overflow.

### 10. robots.txt

Allow the crawlers you want. Block the ones you do not.

Minimum viable:

- Serve /robots.txt with a 200 status.
- Allow search and index bots.
- Block training bots if the client wants that.
- Link the sitemap.

Owner: business/seo.

### 11. Unique page titles

Every page needs a title that matches its content.

Minimum viable:

- One title per page, under 60 characters.
- Put the topic first, brand last.
- No duplicates across pages.
- Check with a crawler before launch.

Owner: engineering/site-launch-readiness.

### 12. Meta descriptions

Descriptions earn clicks in search results.

Minimum viable:

- One description per page, 150 to 160 characters.
- Describe the page, not the site.
- Avoid duplicates.
- Include the primary keyword once.

Owner: engineering/site-launch-readiness.

### 13. Social share image

A missing share image looks broken in links and posts.

Minimum viable:

- One og:image per page, 1200 by 630 pixels.
- Use a real image, not a logo on blank.
- Include og:title, og:description, og:url, og:type.
- Test with platform debuggers.

Owner: engineering/site-launch-readiness.

### 14. Maps and directions

Local visitors need to find you.

Minimum viable:

- Embed a map on the contact or location page.
- Add a "Get directions" link.
- Show address, hours, and parking if relevant.
- Keep the map lazy-loaded.

Owner: this skill.

### 15. Real reviews

Real reviews beat invented ones. Use them or skip them.

Minimum viable:

- Show reviews from a verifiable source.
- Include name, date, and rating.
- Do not edit the wording.
- Link to the original source.

Owner: this skill.

### 16. Alt text on images

Describe images for screen readers and search.

Minimum viable:

- Every content image gets descriptive alt text.
- Decorative images get empty alt.
- Keep alt under 125 characters.
- Do not stuff keywords.

Owner: engineering/site-launch-readiness.

### 17. Local schema

Structured data helps local search and AI answers.

Minimum viable:

- Add LocalBusiness JSON-LD on the homepage or location page.
- Include name, address, phone, hours, and geo.
- Validate with the Rich Results Test.
- Keep the data accurate.

Owner: business/about-sop owns entity definition.

### 18. Privacy policy page

A live site that collects data needs a privacy policy.

Minimum viable:

- Publish a privacy policy at /privacy.
- State what you collect, why, and how long.
- Link it in the footer on every page.
- Match the policy to the product and jurisdiction.

Owner: ui/product-site lists trust and legal pages.

### 19. Google Analytics

Measure what happens. Without data you are guessing.

Minimum viable:

- Install GA4 with one measurement ID.
- Track page views and key events.
- Verify events fire in real time.
- Respect consent where required.

Owner: engineering/site-launch-readiness.

### 20. Team photo

A real team photo builds trust. Stock photos do the opposite.

Minimum viable:

- Use a real photo of the team.
- Keep it natural, not staged.
- Add names and roles if you can.
- Update it when the team changes.

Owner: this skill.

## Verification

Run this before launch. Every box must be checked.

- [ ] Custom 404 returns 404 status.
- [ ] Primary CTA visible above the fold on mobile.
- [ ] No orphan pages.
- [ ] Thank you page tracked as a conversion.
- [ ] Breadcrumbs on nested pages.
- [ ] At least one case study published.
- [ ] Five FAQs answered.
- [ ] Response time stated near the contact form.
- [ ] Sticky mobile CTA works.
- [ ] robots.txt and sitemap return 200.
- [ ] Page titles unique and under 60 chars.
- [ ] Meta descriptions present on all pages.
- [ ] Social share images load.
- [ ] Map and directions present.
- [ ] Reviews are real and sourced.
- [ ] Alt text on all content images.
- [ ] Local schema validates.
- [ ] Privacy policy linked in footer.
- [ ] GA4 events fire in real time.
- [ ] Team photo is real and current.

## Related skills

- engineering/site-launch-readiness: technical and SEO checks
- ui/launch-polish: UI and mobile polish
- business/internal-linking: money pages, footer, breadcrumbs
- business/seo: robots, sitemap, Search Console
- business/about-sop: organization and local entity
- ui/product-site: page inventory, 404, legal pages
- business/copywriting: CTA, case studies, FAQs
