---
name: launch-polish
version: 1.0.0
description: "UI launch polish checklist: remove horizontal scroll, fix broken links, mobile menu, favicon, page titles, meta descriptions, footer links, custom 404, copyright year, compress images, fix broken buttons, success and error messages, remove placeholder text, remove unused nav, fix mobile overflow, clickable logo, clickable phone number, mobile optimization. Use when the user asks 'polish the UI before launch', 'launch polish', 'mobile polish', 'fix UI before shipping', 'site polish checklist', or 'make the site feel finished'."
---

# SOP: Launch Polish

## What this skill owns

Eighteen UI checks. Run them before a site goes live. These are the details that make a site feel finished. Technical SEO items live in engineering/site-launch-readiness.

## Owner map

| # | Item | Owner |
|---|---|---|
| 1 | Remove horizontal scrolling | this skill |
| 2 | Fix broken links | this skill |
| 3 | Mobile menu | this skill plus ui/ask-drawer |
| 4 | Favicon | this skill |
| 5 | Fix page titles | engineering/site-launch-readiness |
| 6 | Add meta descriptions | engineering/site-launch-readiness |
| 7 | Fix footer links | business/internal-linking |
| 8 | Custom 404 page | ui/product-site |
| 9 | Copyright year | this skill |
| 10 | Compress images | devops/performance |
| 11 | Fix broken button | this skill |
| 12 | Success messages | this skill |
| 13 | Error messages | this skill |
| 14 | Remove placeholder text | this skill |
| 15 | Remove unused navigation | ui/product-site |
| 16 | Fix mobile overflow | this skill |
| 17 | Make logo clickable | this skill |
| 18 | Make phone number clickable | this skill |
| 19 | Mobile optimization | this skill |

## The checklist

### 1. Remove horizontal scrolling

Horizontal scroll breaks mobile layouts. It usually comes from a fixed-width element or an image.

Minimum viable:

- Test every page at 375px width.
- Find the element wider than the viewport.
- Fix with max-width, overflow hidden, or responsive units.
- Re-test after the fix.

Owner: this skill.

### 2. Fix broken links

Broken links frustrate users and waste crawl budget.

Minimum viable:

- Crawl the site with a link checker.
- Fix or remove every 404 link.
- Redirect moved pages with a 301.
- Re-run the crawl before launch.

Owner: this skill. engineering/site-launch-readiness owns redirects.

### 3. Mobile menu

A site without a working mobile menu is unusable on phones.

Minimum viable:

- Add a hamburger menu that opens a drawer or overlay.
- Test open, close, and navigation on a real phone.
- Close the menu after a link click.
- Trap focus inside the open menu.

Owner: this skill. ui/ask-drawer covers drawer patterns.

### 4. Favicon

A missing favicon looks unfinished in browser tabs and bookmarks.

Minimum viable:

- Add a favicon.ico at the site root.
- Add apple-touch-icon for iOS.
- Use a square, simple mark.
- Test in light and dark browser themes.

Owner: this skill.

### 5. Fix page titles

Each page needs a title that matches its content.

Minimum viable:

- Set a unique title per page.
- Keep it under 60 characters.
- Put the topic first, brand last.
- Check for duplicates with a crawler.

Owner: engineering/site-launch-readiness. business/copywriting writes the words.

### 6. Add meta descriptions

Descriptions earn clicks in search results.

Minimum viable:

- Write one description per page.
- Keep it between 150 and 160 characters.
- Describe the page, not the site.
- Avoid duplicates.

Owner: engineering/site-launch-readiness.

### 7. Fix footer links

Footer links repeat on every page. Broken ones multiply the damage.

Minimum viable:

- Check every footer link by hand.
- Group links by category: product, company, legal, social.
- Remove links to pages that no longer exist.
- Keep the list short.

Owner: business/internal-linking. It owns the footer set.

### 8. Custom 404 page

A default 404 loses visitors. A custom one keeps them.

Minimum viable:

- Build a branded 404 page.
- Return a real 404 status code.
- Add a link home and a search box.
- Noindex the page.

Owner: ui/product-site lists system states.

### 9. Copyright year

An old copyright year signals an abandoned site.

Minimum viable:

- Show the current year in the footer.
- Update it automatically from the date.
- Include the company name.
- Check it on launch day.

Owner: this skill.

### 10. Compress images

Large images slow the site and hurt mobile users.

Minimum viable:

- Compress every image before upload.
- Serve WebP where possible.
- Set width and height to avoid layout shift.
- Check the largest image on each page.

Owner: devops/performance.

### 11. Fix broken button

A button that does nothing erodes trust.

Minimum viable:

- Click every button on every page.
- Fix handlers that throw or do nothing.
- Show a loading state during async work.
- Disable the button while submitting.

Owner: this skill.

### 12. Success messages

Users need confirmation that an action worked.

Minimum viable:

- Show a success toast or banner after submit.
- Make the message specific, not generic.
- Auto-dismiss after a few seconds.
- Keep it accessible to screen readers.

Owner: this skill. ui/ask-toast covers toast patterns.

### 13. Error messages

Users need to know what went wrong and how to fix it.

Minimum viable:

- Show a clear error next to the field or action.
- Say what happened and what to do next.
- Avoid technical jargon.
- Do not clear the form on error.

Owner: this skill.

### 14. Remove placeholder text

Lorem ipsum and TODO text must not ship.

Minimum viable:

- Search the codebase for "lorem", "TODO", "placeholder".
- Replace each with real content.
- Remove any test data from production.
- Check again before deploy.

Owner: this skill.

### 15. Remove unused navigation

Dead nav items confuse users and clutter the header.

Minimum viable:

- List every nav item and its destination.
- Remove items that point to removed pages.
- Hide items behind feature flags if not ready.
- Test the nav on mobile and desktop.

Owner: ui/product-site owns page inventory.

### 16. Fix mobile overflow

Content that overflows the viewport breaks mobile layouts.

Minimum viable:

- Test at 375px and 320px widths.
- Fix with responsive units and max-width.
- Avoid fixed pixel widths on containers.
- Check tables and code blocks especially.

Owner: this skill.

### 17. Make logo clickable

The logo should always link home.

Minimum viable:

- Wrap the logo in an anchor to `/`.
- Add an accessible label: "Home".
- Keep the click target large enough.
- Test on mobile and desktop.

Owner: this skill.

### 18. Make phone number clickable

Phone numbers should open the dialer on mobile.

Minimum viable:

- Use a `tel:` link: `<a href="tel:+15551234567">`.
- Format the display number for humans.
- Test on a real phone.
- Add the same link in the footer and contact page.

Owner: this skill.

### 19. Mobile optimization

Every page must work on a phone.

Minimum viable:

- Set the viewport meta tag.
- Test every page at 375px width.
- Check tap targets are at least 44px.
- Verify text is readable without zooming.

Owner: this skill.

## Verification

Run this before launch. Every box must be checked.

- [ ] No horizontal scroll on any page at 375px.
- [ ] No broken links in the crawl.
- [ ] Mobile menu opens, closes, and navigates.
- [ ] Favicon shows in the browser tab.
- [ ] Page titles are unique and under 60 chars.
- [ ] Meta descriptions present on all pages.
- [ ] Footer links all work.
- [ ] Custom 404 returns 404 status.
- [ ] Copyright year is current.
- [ ] Images compressed and served as WebP.
- [ ] All buttons work and show loading states.
- [ ] Success messages appear after actions.
- [ ] Error messages are clear and helpful.
- [ ] No placeholder or lorem text remains.
- [ ] No unused nav items remain.
- [ ] No mobile overflow on any page.
- [ ] Logo links to home.
- [ ] Phone numbers use tel links.
- [ ] Every page passes a 375px review.

## Related skills

- engineering/site-launch-readiness: SSR, SEO, analytics, legal
- ui/product-site: page inventory, 404, nav, legal pages
- ui/ask-drawer: drawer and sheet patterns
- ui/ask-toast: toast notifications
- business/internal-linking: footer links, money pages
- devops/performance: image compression, bundle size
- business/copywriting: titles, headings, messages
