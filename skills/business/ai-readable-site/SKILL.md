---
name: ai-readable-site
version: 1.0.0
description: "Make an entire web site readable by AI agents: markdown versions of every page (+ .md suffix & Accept negotiation), /llms.txt /llms-full.txt /ai.txt, robots.txt updates for AI crawlers, ai-summary meta tags, Organization JSON-LD on homepage, and verification checklist. Triggers on 'make site AI-readable', 'ai-readable-site', 'llms.txt setup', 'markdown routes', 'AI agent site map'.
---

# SOP: Make Your Whole Site Readable by AI Agents

## What This Skill Owns

Every public HTML page gets a clean markdown version. Site-level files (`/llms.txt`, `/llms-full.txt`, `/ai.txt`) tell AI crawlers who you are, how the site is laid out, and how they may use your content. This skill covers **markdown routing**, **AI crawler protocols**, and **head signals** — so LLMs and AI search engines can find, understand, and cite your content.

**Triggers:** `'make site AI-readable'`, `'ai-readable-site'`, `'llms.txt setup'`, `'markdown routes'`, `'AI agent site map'`

## Why This Matters

AI crawlers need **structured, crawlable sources** to cite your brand accurately. Without explicit markdown routes and site-level files, they guess from third-party snippets — leading to inaccurate citations or no mention at all. This skill ensures:

- **One source of truth** per page that AI systems can parse cheaply
- **Site-level metadata** (`llms.txt`, `ai.txt`) that survives across AI product updates
- **Discovery** — search bots can find your pages; training bots are your call
- **No duplicate content penalties** — markdown is `noindex, follow`, pointing to the HTML canonical

## 1. Architecture: One Renderer Registry

### Registry File: `src/lib/md/registry.ts`

Maps route patterns → renderer functions.

- **Static pages** get their own renderer (loaded from data, CMS, or hardcoded).
- **Dynamic pages** (`/products/[slug]`, `/blog/[slug]`, `/category/[slug]`, etc.) get a **pattern renderer** that loads the same data the HTML page uses.
- **Reuse existing data-fetching functions** — don't duplicate queries. The registry delegates to your existing `getPageData()`, `getProduct()`, `getBlogPost()`, etc.
- If a route isn't in the registry and isn't on the skip list, return a **markdown 404 body with status 404**.

### Formatting Helpers: `src/lib/md/format.ts`

Shared markdown formatting:

- Headings (`h2`, `h3`), escaped links, tables, lists, dates, absolute URLs
- Turn structured data (price tables, feature lists, FAQ) into readable markdown
- Never invent facts. If the HTML hides it, the markdown doesn't show it.

### HTTP Helper: `src/lib/md/http.ts`

Builds the response with the headers below. Used by the middleware handler.

### Catalog: `listMarkdownRoutes()`

- Returns every addressable markdown route.
- Feeds a catalog at `/api/md/_catalog` and `/llms.txt`.
- On-demand: revalidate daily or on content change.

## 2. Markdown Routing & Middleware

### Three Ways to Reach Markdown

| Method | When It Applies | Behavior |
|---|---|---|
| **`.md` suffix** | `GET /pricing.md`, `GET /index.md`, `GET /blog/my-post.md` | Markdown of that page. `GET /index.md` → homepage. `GET /blog/my-post.md` → that post. |
| **Content negotiation** | `GET /pricing` with `Accept: text/markdown` | If `text/markdown` has a higher `q` value than `text/html`, serve markdown. Parse `Accept` properly, including q-values. `*/*` or missing `Accept` → **always HTML** (so curl, link previews, browsers don't break). |
| **Direct backend URL** | `GET /api/md/<path>` | Always returns markdown (useful for debugging). |

### Middleware: One Handler for All Three

- **Do not** make a separate route file per page.
- **Do** use middleware/edge rewrites to **one markdown handler** that checks the route pattern, looks up the renderer from the registry, and serves markdown (or HTML if the route is on the skip list).
- **Exclusions in middleware** — don't apply the `.md` and Accept rewrite to: `/llms.txt`, `/llms-full.txt`, `/ai.txt`, `/robots.txt`, `/sitemap.xml`, `/api/*`, static assets, `/_next/*`, `/.well-known/*`, or any real route that already ends in `.md` (e.g. `/auth.md`, `SKILL.md` files). Keep an **explicit allowlist** of content routes for negotiation, not a denylist.

### Markdown Page Rules

- **Use only the page's main content.** Leave out nav, footer, cookie banners, modals, tracking, and repeated "Sign up" CTAs.
- **Every link is ABSOLUTE.** Point internal links at the HTML URL, not the `.md` one.
- **Turn structured data into readable markdown:** price tables, feature lists, FAQ as `### Question` + answer, product specs as a table.
- **Listing pages** (blog index, category pages) list items as `- [Title](url) - one-line description`, paginated the same way the HTML is.
- **Use the same facts** as the HTML and the JSON-LD (names, prices, dates, ratings). Never invent anything.
- **No front-matter YAML** unless useful. Plain markdown is the priority.
- **Logged-in-only, admin, draft, noindex and private pages are NEVER exposed.**

### Response Headers on Every Markdown Response

- `Content-Type: text/markdown; charset=utf-8`
- `X-Markdown-Tokens: <approx tokens = chars/4>`
- `X-Robots-Tag: noindex, follow` (HTML page stays canonical so Google doesn't see duplicate content)
- `Content-Location: <canonical HTML URL>`. Also set `Link: <url>; rel="canonical"` if the framework doesn't overwrite route-level Link headers. **Check this**: Next.js `headers()` config overwrites them.
- `Vary: Accept` (on negotiated responses)
- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` (longer for static pages)
- `Last-Modified` when known
- HEAD returns the same headers as GET, with no body. OPTIONS handles preflight.

## 3. Advertise the Markdown Version from HTML

- In `<head>` of **every page**: `<link rel="alternate" type="text/markdown" href="https://example.com/<path>.md">`
- A global `Link` response header advertising `/llms.txt`, `/llms-full.txt` and `/ai.txt` with `rel="describedby"`
- Optional: a tiny "View as Markdown" link in the footer

## 4. /llms.txt (follow the llmstxt.org spec)

- Served as `text/plain; charset=utf-8`, **generated from code** (not a hand-written static file) so it never goes stale.
- Structure:

```
# <Site name>

> <2–3 sentence description: what it is, who it's for, what makes it different>

<short paragraph of key facts: founded, pricing model, main audience, contact>

## Core pages
- [Home](https://example.com/index.md): one-line description
- [Pricing](https://example.com/pricing.md): ...
- [About](https://example.com/about.md): ...

## Docs / Guides
- [...](...md): ...

## <Main content type, e.g. Products / Blog>
- [Top/recent N items](...md): ... (cap at ~50 here; point to the full listing)

## Machine-readable
- [Full content](https://example.com/llms-full.txt): every page concatenated
- [Markdown catalog](https://example.com/api/md/_catalog)
- [Sitemap](https://example.com/sitemap.xml)
- [AI usage policy](https://example.com/ai.txt)
- [OpenAPI](https://example.com/openapi.json) (only if one exists)

## Optional
- [Terms](...md), [Privacy](...md), changelog, etc.
```

- Links point to the `.md` versions.
- Each link gets a **factual description**, not marketing fluff.
- **Revalidate daily** (or on content change).

## 5. /llms-full.txt

- Served as `text/plain; charset=utf-8` (or text/markdown). It's every page in `llms.txt`, rendered with the **SAME renderer registry** and joined together:

```
# <Site name> - full content
> <description>
Generated: YYYY-MM-DD

---
<!-- source: https://example.com/pricing -->
<markdown of page>

---
<!-- source: https://example.com/about -->
...
```

- **Order:** core pages → docs → main content → legal.
- **Big dynamic collections:** include the top N by importance/recency and state the limit plus where to find the rest. Keep the total under ~500k chars and log a warning if it's bigger.
- **Cache it hard** (s-maxage=86400, SWR=604800). Build it on demand or with ISR, never at request time per user.

## 6. /ai.txt (ai-visibility.org.uk ai-txt spec v1.1.1)

- `text/plain`, generated from code. Sections:

```
[identity]
name: <Site name>
url: https://example.com
description: <2–3 sentence description>
contact: <email or contact form>
matching: <reference to llms.txt and Organization JSON-LD exactly>

[permissions]
allowed: summarise, quote with attribution, cite, index for search/answers

[restrictions]
no fabricated quotes
no fake reviews/ratings
no presenting our content as the model's own
no training on user-generated private data (adjust to what I want)

[attribution]
how to cite: site name + canonical HTML URL

[scope]
included paths: /, /blog, /products
excluded paths: /admin, /dashboard, /api, /auth

[contact]
Last updated: YYYY-MM-DD
```

- Keep `[scope]` in sync with `robots.txt`.
- `[identity]` must match the `Organization` JSON-LD and `/llms.txt` exactly.

## 7. robots.txt and Discovery

- **Explicitly allow** the AI search and user-fetch crawlers on public paths:

```
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /
```

- **Training crawlers** are your call: `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `Bytespider`. **Blocking them doesn't stop citations** from the search bots above, so say that when you ask.
- **Disallow private paths** for every user agent.
- **Add comments** pointing to `/llms.txt` and `/ai.txt`, plus the `Sitemap:` line.
- **Leave `.md` URLs OUT** of `sitemap.xml` (they're noindex alternates).
- **Comments in each** of `robots.txt`, `llms.txt` and `ai.txt` say "keep in sync with" the other two.

## 8. Head Signals on Every Page

- `<meta name="ai-summary" content="...">` on every **public page**: 1-2 factual sentences about what the page is, written for a model that has already fetched it. Default to the page's meta description; give key pages (home, pricing, main listing) their own.
- **Homepage JSON-LD**: an `Organization` (name, url, logo, sameAs socials, contact) and a `WebSite` node, built from the **same site config** as `llms.txt` and `ai.txt`. If they already exist, check the facts match and leave them alone.
- **Don't add** an MCP discovery file (`/.well-known/mcp.json`) unless you actually run an MCP server. List it under "skipped" in your summary.

## 9. Single Source of Truth

- **Site name, URL, description and contact** come from the existing site config. Never hardcode them in several places.
- **Adding a new page** should take exactly one step: **register a renderer**. `llms.txt`, `llms-full.txt` and the catalog pick it up automatically.
- **Add a dev check/test** that fails if a public route in the app has no markdown renderer (or isn't on an explicit "skip" list with a reason).

## 10. Verification (run these and show output)

```bash
# Markdown routing
curl -sI localhost:3000/pricing.md                    # 200, text/markdown, X-Markdown-Tokens, noindex
curl -s -H 'Accept: text/markdown' localhost:3000/pricing | head -30
curl -sI localhost:3000/pricing                        # still HTML, has Link describedby header
curl -s -H 'Accept: */*' localhost:3000/               # HTML, not markdown
curl -s localhost:3000/does-not-exist.md              # markdown 404, status 404

# Site-level files
curl -s localhost:3000/llms.txt | head -40
curl -s localhost:3000/llms-full.txt | wc -c
curl -s localhost:3000/ai.txt

# Catalog
curl -s localhost:3000/api/md/_catalog | head

# robots.txt
curl -s localhost:3000/robots.txt                     # search bots allowed, Sitemap: line present

# Head signals
curl -s localhost:3000/ | grep -o '<meta name="ai-summary"[^>]*>'
curl -s localhost:3000/ | grep -c 'application/ld+json'   # 1 or more

# Dynamic page check (one per type)
# Private/admin pages return 404 as markdown

# Typecheck and lint pass
```

## 11. Constraints

- **Match the existing code style**, naming, comment density and folder layout.
- **No new dependencies** unless really needed (no HTML-to-markdown scraping of the rendered page; render from data).
- **Don't change how any HTML page looks or behaves.**
- **Don't commit or push**; review the diff.
- At the end, give a summary: files added/changed, the route inventory with coverage, anything skipped and why, and how to add a markdown renderer for a future page.

## 12. Example: Adding a New Page Renderer

To add a new page:

1. **Create a renderer function** in `src/lib/md/registry.ts` that fetches the page data and formats it as markdown.
2. **Register the route pattern** in the registry (one line).
3. The following are auto-generated:
   - ` /<page>.md` suffix route
   - `Accept: text/markdown` negotiation
   - Appear in `/llms.txt` and `/llms-full.txt`
   - Appear in `/api/md/_catalog`
4. **Add the `<link rel="alternate" type="text/markdown">`** tag in the HTML `<head>` (handled by the registry or a partial).

**Example renderer for a blog post:**

```ts
import { getBlogPost } from '@/lib/blog';

export function blogPostRenderer(slug: string) {
  const post = getBlogPost(slug);
  if (!post) return null;

  return [
    `# ${post.title}`,
    ``,
    `> ${post.metaDescription || post.excerpt.substring(0, 120)}...`,
    ``,
    `Canonical: https://example.com/blog/${post.slug}`,
    `Last updated: ${post.updatedAt?.format('YYYY-MM-DD') || post.publishedAt.format('YYYY-MM-DD')}`,
    ``,
    post.content, // already markdown-safe
    ``,
    `## Related`,
    `- [${post.related[0].title}](${post.related[0].url}) - ${post.related[0].description}`,
    ``,
  ].join('\n');
}
```

## 13. Related Skills

- `business/seo` audits crawler access for this page and measures citation pickup
- `business/research-page` publishes the quotable finding and statistics
- `business/internal-linking` owns the footer set, anchor text, and contextual links around this page
- `ui/product-site` decides which pages exist before this one gets written
- `business/copywriting` writes the prose around these sections without inventing a fact