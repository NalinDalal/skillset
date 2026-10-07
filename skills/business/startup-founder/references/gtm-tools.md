# Go-To-Market: Launch, First Users, Tools

## Contents

1. Getting the first 10 users
2. Launch platforms
3. Getting to 100-1000 users
4. Posting in public: the Reddit playbook
5. Build an audience
6. Marketing your SaaS: the checklist
7. Landing page / positioning basics
8. Pricing
9. Curated tool directory
10. Startup credit programs

Deeper references live beside this file: `gtm-funnel.md` (the 6 levels, tool stack, first 100 users, weekly growth targets, 25 YC GTM patterns), `content-playbook.md` (post types and content pillars), and `gtm-agents.md` (running the funnel with coding agents).

## Getting the first 10 users
- Cold outreach to people who match your validation-interview profile (see `validation.md`). Use direct DMs/emails, not blasts. Reference the actual problem they described.
- Personal network + relevant communities (Reddit, Indie Hackers, Discord servers for your niche). Post as a person sharing something useful, not an ad.
- "Build in public" on Twitter/X or LinkedIn: share progress, problems, and decisions. Works especially well for dev-tooling/technical products aimed at other developers.

## Launch platforms (once you have something demoable)
- **Product Hunt** is still the biggest single-day traffic/feedback spike if done right. Prepare a hunter, assets, and a "launch day" plan in advance. Do not just submit and hope.
- Other launch platforms: Betalist, Fazier, Uneed, Microlaunch, Peerlist, Indie Hackers, Hacker News "Show HN".
- Software/tool directories for steady long-tail discovery: SaaSHub, AlternativeTo, G2, Capterra, There's An AI For That (if AI-adjacent).
- Relevant subreddits for self-promo (check the rules/flair of each subreddit first): r/SideProject, r/webdev ("Showoff Saturday"), r/indiehackers, r/SaaS, r/buildinpublic, r/roastmystartup, r/developersIndia ("I made this").

## Getting to 100-1000 users
- **SEO**: slow but compounding. Do not prioritize it in week 1. Start writing useful content (docs, comparison pages, how-tos) early because it takes months to rank.
- **LLM/AI search visibility (AEO/GEO)**: increasingly important. Being mentioned or cited by ChatGPT, Claude, Perplexity when people ask for tools in your category. Publish clear, structured, factual content about what your product does and who it is for. Get mentioned on third-party sites (reviews, comparisons) because LLMs often cite those.
- **Content marketing**: write about the specific problem you solve. Share it where your audience already is (relevant subreddits, newsletters, dev communities). Do not just publish to your own blog and hope for organic traffic.
- **Free-tool marketing / "engineering as marketing"**: build a small free tool adjacent to your product. It can be a calculator, checker, or generator that solves a narrow problem. It drives backlinks, PR, and organic traffic without feeling like an ad.
- **Affiliates/referrals**: cheap because you only pay on conversion. Good fit for bootstrapped products with a clear price point.

For the technical SEO work (LCP, bundle size, semantic HTML, keyword research) see section 6 below. For the full search and AI answer engine SOP, load the `seo` skill.

## Posting in public: the Reddit playbook

A founder gets 80% of signups from Reddit. No ads, no content calendar, no following. He posts and replies to people who have the problem his product solves, 3 times a week, for 8 months, and now has 2000 paying users.

The mechanism is simple and repeatable:

1. Find the subreddits where the problem gets described out loud, not where products get promoted.
2. Read before posting. Learn the room's rules, the recurring questions, the language people use.
3. Post and reply where the pain already appears, 3 times a week. Consistency beats reach.
4. Answer first. Only mention the product when someone asks or when it is the honest answer.
5. Never drop a link as the first line. It reads as an ad and gets removed.

Everyone overcomplicates this. The founder with 2000 users has no ads, no content, and no audience. He has a schedule.

### The general rule

Give value where the audience already gathers. Impart real knowledge, teach the thing you are known for, and show how to do the work well. Drop the gyaan-bait posts on LinkedIn and X. Talk about the actual problem, and about building the thing.

Then join the groups, Discords, and communities where the audience already is, and be useful there. Visibility follows contribution.

## Build an audience

An audience is the compounding asset. It turns every launch into a distribution event and makes customer development easier.

- Give value consistently in one place rather than scattering across five.
- Teach the skill you are best at. Being known for one thing beats being mediocre at ten.
- Repost the best replies and threads as standalone posts.
- Own a channel (newsletter, YouTube, blog) so the audience outlives any single algorithm.

## Marketing your SaaS: the checklist

A working order of operations. Do them in roughly this sequence.

### 1. Search and AI answer engines (SEO, AEO, GEO)

- Pick target keywords based on who the audience is, not on volume alone. Use Google's Keyword Planner for volume and difficulty.
- Semantic HTML: real headings, real lists, real landmarks. Search engines and AI crawlers both read structure.
- LCP under 2.5s. Check PageSpeed Insights and fix what it flags.
- Cut the JS bundle. Every kilobyte costs you rankings and conversions.
- Earn backlinks. Product Hunt and directories are the cheapest starting points; guest posts and original data are the durable ones.
- Write substantive posts on your own site first, then republish to Medium for reach and referral traffic.
- For AEO/GEO: publish structured, factual pages about what the product does, plus comparison pages and pricing pages. Get cited on third-party sites.

### 2. X, LinkedIn, Instagram

- Tell the target audience what problem you solve, and show the work.
- Post the thing you know best: how to do the job well, with specifics.
- Skip the gyaan bait. Generic advice posts on LinkedIn reach nobody.
- Post about building the product in public. Progress, decisions, numbers, and the failures too.

### 3. Build the audience

- Give value on a schedule, in public, where the audience already reads.
- Turn the best replies into standalone posts.
- Move the audience somewhere you own: newsletter, email list, community.

## Landing page / positioning basics
- Above the fold: who it is for, what it does, why it is better. Use plain language, not jargon.
- One primary CTA. Cut anything that does not help a first-time visitor decide in 10 seconds.
- Social proof (even 1-2 real quotes/logos) matters more early than more features.

## Pricing
- Price on value delivered, not your costs. Talk to a few prospective customers about what they would pay before finalizing (see `validation.md`).
- For India-based founders selling to a global audience: price in USD by default.
- Do not over-index on lifetime-deal platforms (AppSumo etc.) for cash. They are good for feedback and traction signal early. They are bad for long-term revenue economics.

## Curated tool directory (by function)
Pick based on stack and budget. Most have free tiers usable pre-revenue.

- **Payments**: Stripe, Razorpay (India), PayPal, Paddle (handles tax/compliance for you, good for solo global sellers)
- **Billing/Subscriptions**: Lago (open-source, usage-based, seats, credits), Stripe Billing
- **Auth/Backend**: Supabase, Firebase, Clerk
- **AI Agent Platform**: Dify (build/deploy agents & workflows), LangGraph
- **Analytics (product)**: PostHog (open-source friendly), Mixpanel, Amplitude, Simple Analytics/Plausible (privacy-friendly, lightweight)
- **Session Replay**: OpenReplay (self-hosted), Highlight.io
- **In-App Surveys**: Formbricks (onboarding friction, churn)
- **Email/newsletters**: Resend/Postmark (transactional), ConvertKit/Buttondown (newsletter), Mailchimp
- **Notifications**: Novu (email, SMS, push — one API, all channels), Knock
- **CRM/support**: Crisp, Intercom, HubSpot (has a startup program)
- **No-code/prototyping**: Framer, Webflow, Bubble, Retool
- **Docs**: Docusaurus, Mintlify, GitBook
- **Monitoring**: Sentry, UptimeRobot
- **Design**: Figma, Canva, Undraw (illustrations)
- **Launch Video / Demo Recording**: Cap Software (clean product demos without videographer), `/brag` skill (AI-generated launch video)
- **Pitch Deck Tracking**: Papermark (who opened, which slides, time per slide)
- **Legal**: Claude for Legal by Anthropic (contract review, legal workflows)
- **Market Research**: Last 30 Days (scrapes Reddit, X, forums for topic research)
- **Back-Office AI**: qm by Y Combinator (AI agents for YC company back-office work)
- **AI Dev Team**: gstack by Garry Tan (Claude as planner/reviewer/QA for code)
- **UI Components**: shadcn/ui (copy-paste components, no lock-in, Radix-based)

## Startup credit programs (cut infra cost near-zero early on)
AWS Activate, Google Cloud for Startups, Microsoft for Startups, MongoDB for Startups, Notion for Startups, HubSpot for Startups, Segment Startup Program. India-specific: Razorpay startup programs, MSG91/Exotel for Startups. Apply once incorporated (or with a live product). Terms and amounts change. Verify current details via search rather than assuming figures.