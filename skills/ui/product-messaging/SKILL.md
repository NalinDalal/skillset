---
name: product-messaging
description: Use whenever the user is writing or reviewing copy for a landing page, product homepage, pitch page, or hero section. Triggers on "write my landing page," "hero copy," "what should my homepage say," "positioning," "value prop," "why isn't my landing page converting," or any product/marketing page build where the layout is decided (or being decided via ui-theme-picker) but the actual words are not. Also use when a page already has UI polish but reads generic or forgettable, the content is the fix. Runs a messaging derivation (ICP, problem, outcome, mechanism, differentiation), builds a section-by-section content hierarchy tied to the question each section answers for the visitor, and hands back actual copy, not placeholder lorem or vague direction, mapped to sections a UI skill can then style. Pairs with ui-theme-picker: this skill decides what the page says, ui-theme-picker decides how it looks.
user-invocable: true
---

# Product Messaging

Decides what a landing page should actually say, before or alongside deciding how it
looks. A visually polished hero with generic copy still fails. "AI-powered platform
for modern teams" reads the same on every SaaS page ever shipped, no matter how good
the gradient is. This skill exists to stop content from being the afterthought.

**Core failure mode:** treating copy as filler text for a pre-built layout. The layout
should follow from what needs to be said, not the other way around. If a hero section
has an eyebrow, headline, subheadline, and two CTAs before anyone has answered "what's
the outcome, for whom, and why should they believe it," the section is empty scaffolding.

**The bar: specificity over cleverness.** The single biggest tell of forgettable copy
is vagueness dressed up as confidence. "The future of X," "reimagine your workflow,"
"empowering teams to do more." None of that is falsifiable, memorable, or specific to
this product. The fix is almost always a concrete number, a named use case, or a real
mechanism, not a punchier adjective.

## 1. Derive the messaging inputs first , never write copy cold

Before any copy gets written, establish these five things. If the user hasn't given
them, ask (short, direct questions , don't turn this into a lengthy intake form):

1. **The product** , what it actually does, one sentence, no jargon.
2. **The ICP** , who specifically. Not "developers" , "solo devs shipping side
   projects who don't have a DevOps person." The narrower and more concrete, the
   easier every downstream decision gets.
3. **The painful problem** , not the category problem ("deployment is hard") but the
   specific moment of pain this ICP feels ("you push to prod on a Friday and spend the
   weekend babysitting logs"). If the user can't articulate this specifically, that's
   itself a signal to dig further before writing anything.
4. **The desired outcome** , the after-state, in the visitor's terms, not the
   product's terms. "Deploy without checking Slack all weekend" beats "improved
   deployment reliability."
5. **The differentiator** , why this and not the obvious alternative (a competitor, a
   DIY approach, or doing nothing). If the honest answer is "nothing, really," flag
   that directly , it's a positioning problem to solve before a copy problem.

Skip mechanism-first thinking ("we use X technology") until outcome and problem are
locked , visitors care what changes for them, not how it works, until step 4 below.

## 2. Build the messaging hierarchy , one sentence per layer

Compress the five inputs into a strict hierarchy, each layer answering one visitor
question. Write these as actual sentences, not bullet fragments , they become the
literal copy for sections 3 (below).

```
Category / eyebrow   → What kind of thing is this?
Core value prop       → What do I get, and is it for me?
Clarifying subhead    → How, specifically, in one more sentence?
Proof point           → Why should I believe that claim?
Differentiation line  → Why this instead of the alternative?
```

**Rule: the value prop is an outcome, never a feature list.** Test every candidate
headline against "so what?" , "Real-time collaboration for design teams" invites "so
what?"; "See your teammate's cursor before they finish the sentence" doesn't, because
the outcome is already in the sentence.

## 3. Map the hierarchy to a section sequence

The exact sections depend on the product, but reason about _why a section exists_, not
just _whether it looks complete_. Each section answers one visitor question , if a
section can't state the question it answers, cut it or merge it into a neighbor.

```
NAV        → orientation, one clear path to the primary CTA
HERO       → What is this, and why should I care?
PROOF BAR  → Is this legitimate? (logos, a number, a one-line stat — thin, early)
PROBLEM    → Is this actually my problem?
SOLUTION   → How does this solve it?
DEMO       → Does it actually work the way I want? (real screenshot/product, not
             illustration)
BENEFITS   → What do I get, concretely?
USE CASES  → Does this fit my specific situation? (named, not generic)
HOW IT WORKS → What am I actually signing up for/doing?
DIFFERENTIATION → Why this over the alternative I'm already using or considering?
SOCIAL PROOF → Have people like me actually gotten the outcome?
OBJECTIONS/FAQ → What's the thing stopping me right now? (price, setup time, "will
             this work with my stack," migration risk — name the real one, not a
             softball)
FINAL CTA  → What do I do now? (same action as the hero CTA, not a new one)
FOOTER     → trust signals, secondary paths
```

Not every page needs every section. A technical dev-tool page might collapse
PROBLEM/SOLUTION into one section and spend more room on DEMO. A consumer app might
drop OBJECTIONS entirely in favor of more social proof. Cut based on what this
specific visitor is actually unsure about, not by copying the template wholesale.

## 4. Write the actual copy , not placeholder direction

Hand back real, ready-to-paste copy for each section, not descriptions of what the
copy should do. "Write a headline emphasizing speed" is not a deliverable; "Ship in
minutes, not sprints" is.

**Headline formulas that hold up** (pick based on what the ICP most needs convincing
of , don't default to the same one every time):

- **Outcome-first**: `[Outcome] without [the usual pain]` , "Deploy on Friday and
  actually enjoy your weekend."
- **Mechanism-first**: for products where _how_ is the differentiator and the ICP is
  technical enough to care , "One CLI command, zero YAML."
- **Category-defining**: only when genuinely creating a new category, otherwise this
  reads as empty ambition , "The Figma for spreadsheets."
- **Direct address**: names the ICP explicitly , "Built for solo devs who ship alone."

**CTA copy**: name the action and, where possible, the immediate next state , "Start
free deploy" beats "Get Started"; "See it on your repo" beats "Learn More." Reserve
"Learn More" / "Get Started" for genuinely low-stakes secondary actions only.

**Proof**: real numbers over vague claims. "Used by 40 teams shipping to production
daily" beats "Trusted by teams everywhere." If real numbers don't exist yet, say so
rather than inventing filler , recommend a placeholder proof strategy (early-access
count, founder credibility, a single strong testimonial) instead of fabricating scale.

## 5. Hard avoid-list , instantly generic, reads as AI-written or templated

Actively strip these unless the user's actual context justifies one specifically:

- "Empowering," "revolutionize," "reimagine," "unlock," "seamless," "cutting-edge,"
  "next-generation," "game-changing," "the future of X"
- A headline that would be equally true of ten competitors' products
- "All-in-one platform for X" with no specific outcome named
- Feature lists presented as benefits ("Real-time sync, AI-powered, cloud-native")
  without the "so what" translated
- Generic trust copy with no real proof behind it ("Trusted by industry leaders"
  next to no logos)
- A CTA that says "Learn More" as the _primary_ action
- Stock testimonial phrasing that sounds fabricated ("This tool changed my life!")
  , real testimonials are specific and slightly awkward, not polished

## 6. Reference points for voice (extract principle, not wording)

- **Stripe** , precise, confident, technical without being cold; never oversells.
- **Linear** , terse, declarative sentences; no filler adjectives.
- **Basecamp (Signal v. Noise era copy)** , opinionated, plainspoken, willing to name
  what it's against.
- **Superhuman** , outcome-obsessed headlines, heavy specificity ("the fastest email
  experience ever made").

Don't copy tone wholesale , match voice to the ICP from step 1. A dev-tool ICP wants
terse and technical; a consumer/SMB ICP tolerates warmer, more explanatory copy.

## 7. Self-check before presenting

- Does the hero headline pass the "so what?" test , is the outcome explicit, not
  implied?
- Could a competitor's name be swapped in without any sentence becoming false? If yes,
  it's not differentiated enough , go back to step 1's differentiator.
- Is there exactly one primary CTA action repeated (hero + final CTA), not several
  competing asks?
- Does every section's existence map to a specific visitor question from step 3? Cut
  any that don't.
- Did any phrase from the avoid-list in step 5 slip in? Remove or replace it.
- Is the proof real, or flagged as a placeholder needing real data? Never presented as
  real when it isn't.
- Handed back as copy mapped to sections (ready for a UI skill to lay out), not as
  abstract advice about what copy should do.
