# Brand

A brand is the set of choices a product makes the same way every time, so
a user recognizes it without reading the logo. That is a design-system
problem, not a marketing one: consistency is enforced in tokens, in the
icon family, and in the copy register, or it is not enforced at all.

The practical test, from `house-style`: would someone know this is ours
without seeing the logo? If not, the fix is more distinctive choices, not
more polish.

## Protect the brand first, when one exists

This is the expensive failure mode, so it comes before anything else. If
the product already has a brand, a redesign is not a blank canvas.

**Hard constraints, never renegotiated without being told:**

- The brand's typefaces. A redesign that swaps the brand face is a
  rebrand, not a redesign, and it has to be named as one.
- The brand's primary color and its meaning. The color that carries the
  brand stays on the things that carry the brand.
- The logo, at the sizes and with the clear space the brand specifies.
  Never stretch, recolor, rotate, or add effects to it.
- Existing voice and terminology. Product nouns do not get renamed in a
  UI pass. See `copy.md` for the register rules.

**Allowed to change:** neutrals around the brand color, the type scale,
spacing, radii, elevation, component styling, layout, and motion, as
long as the result still reads as the same product. State plainly in the
handoff which constraints you held and which you moved, so nobody
discovers the boundary later by looking at the diff.

When there is no brand, do not invent one silently. Pick a direction,
state it in one line, and make it consistent enough to be reversible.

## The three layers

**Visual identity.** Colors, type, logo, and imagery. This is the layer
with the most tooling and the least enforcement, because each element can
look right alone while the set drifts together. The tokens are the
enforcement. A brand color that appears as a raw hex in a component is a
brand color that will be wrong in six months.

**Tone of voice.** How the product talks, in every string it owns. Pick a
register and hold it. `copy.md` has the mechanics; the brand part is that
the register does not drift between the marketing site, the app, the
error messages, and the emails. Two products sharing a logo but not a
voice is a common and expensive split.

**The emotional response.** What a user feels. This is the layer with no
tokens and the most influence, and it is why the other two exist. It is
also the hardest to check, which is why `ux-laws.md` matters here: a
brand that feels trustworthy and an interface that behaves lawfully are
the same goal reached from two directions.

## What each element owes the brand

**Color.** Three roles at most: a primary, a secondary that supports it,
and an accent used sparingly. The roles are the point, not the specific
values. See `refero-design/references/color.md` for how to build the
palette and for why more than three roles stops working. Temperature is
a brand decision as much as a design one.

**Typography.** One family that carries the brand, applied the same way
at every size, plus at most one supporting face. If the brand names a
typeface, that outranks the preference in `typography-picker`. Weight
and size do the hierarchy work; see that skill for the scale.

**Iconography.** One family, one stroke weight, one fill convention
(outline for default, filled for active). Mixing conventions reads as
inconsistency even when every icon is individually well drawn. Rules
live in `refero-design/references/icons.md`.

**Imagery.** Photography and illustration should share a treatment:
similar grade, similar contrast, similar subject framing. Untreated
stock photos are the most reliable way to make a considered interface
look generic. A consistent duotone or tonal treatment is cheap and
reads as intentional. `house-style` has the stronger version of this
argument.

**Motion.** The product should move the same way everywhere. One
duration set, one easing family, one set of distances. A playful brand
that snaps in one component and drifts in another reads as two products
sharing a codebase.

**Copy.** Same register, same sentence-case conventions, same treatment
of the product name. See `copy.md`.

## The consistency check

Before shipping, confirm:

- Every color comes from a token, and the brand primary is on the brand
  surfaces only.
- The brand typeface is loaded once and used at every size with the
  intended tracking.
- One icon family, one stroke weight, no mixed fill conventions.
- Imagery has a consistent treatment across the site.
- Voice holds across the marketing site, the app, and the error states.
- The logo is unmodified, correctly sized, with its clear space.
- Durations and easing come from the token set, not from per-component
  values.

`verify.md` is the gate for the first and last of these. The rest are
judgment calls, so state the call rather than assuming it landed.

## Anti-patterns

- **The logo carries everything.** A wall of stock photography and
  default type with the logo in the corner is not a brand, it is a
  placeholder.
- **Purple, or any color picked by default.** The single most reliable
  mark of an unconsidered product.
- **Voice drift by surface.** Marketing writes one way, the app another,
  errors a third.
- **Redesigning a brand by accident.** Swapping the type or the primary
  while "just cleaning up the UI."
- **Icon families assembled over time.** Each icon fine, the set
  inconsistent.
- **Tone of voice with no register.** "Friendly but professional" is not
  a decision. Name the voice in a way that can be followed: plain and
  direct, or warm and conversational. `copy.md` picks one and holds it.
