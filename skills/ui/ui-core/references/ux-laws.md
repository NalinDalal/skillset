# UX laws

Named principles that justify a decision already made. Reach for these
when a call is contested ("why is the nav on the left?"), not as a
checklist to run before building. The rules in `system.md` and
`verify.md` are the enforcement; this file is the reasoning behind them.

Most of them come from psychology research, which means they are
reliable on average and occasionally wrong for a specific audience.
Treat them as defaults with a reason attached, never as laws you cannot
break. A deliberate exception beats a reflexive rule.

## UI and UX are not the same thing

**UI** is what the user can see and touch: layout, type, color, controls,
imagery. **UX** is what happens to them: how the product thinks, what it
asks for, how hard it is to finish the job.

UX without UI is a plan nobody can execute. UI without UX is a beautiful
screen that makes people give up. Ship neither alone, and do not let a
strong screen excuse a frustrating flow.

## The laws

**Hick's law.** Decision time grows with the number and complexity of
choices. More options means slower decisions and more abandonment.
Apply it by cutting options, not by adding a helper tooltip. A nav with
nine equal-weight items loses to one with four, every time. Multi-step
forms beat one long form for exactly this reason. The limit is roughly
four meaningful choices per decision point.

**Fitts's law.** Time to reach a target depends on its size and distance
from the starting point. A 24px icon button in a corner costs more effort
than a full-width button under the thumb, and the cost shows up as
mis-taps. This is the reason behind the 44x44px minimum in
`system.md`: hit area includes padding, and the gap between adjacent
targets matters as much as the target itself. On mobile, put the primary
action where the thumb already is, not where the layout puts it.

**Jakob's law.** Users spend most of their time in other products, and
they expect yours to work the way those do. A hamburger that opens a
side panel, a shopping cart in the top right, a search field that filters
as you type. Deviating from a familiar pattern costs you a
re-explanation on every single user. Deviate only when the familiar
version is actively broken for this job, and then only where you can
afford to teach it.

**Miller's law.** Working memory holds a small, fixed number of items.
The textbook figure is 7 plus or minus 2; the modern revision (Cowan,
2001) puts the real limit nearer 4 for items a user is actively
reasoning about. Use 4 as the working number. Chunk a long form into
steps, split a settings page into groups, and reveal detail only when
someone asks for it.

**Law of proximity.** Objects close together are perceived as related.
This is why a form label sits 8px from its input and 40px from the next
field. It is also the cheapest grouping tool available: before adding a
border, a card, or a background tint to separate two groups, move them
closer together and push the unrelated group further away. A container
compensating for weak proximity is a container you did not need.

**Gestalt continuity.** People perceive elements arranged on a line or
curve as related, and they prefer smooth continuous paths over broken
ones. Apply it to flow: breadcrumbs, progress indicators, and step
markers should read as one unbroken line. Alignment does the same work
down and across, so a consistent left edge or column grid is a
continuity device before it is a layout device.

**Aesthetic-usability effect.** People rate attractive products as more
usable, and they tolerate worse performance from something that looks
good. This is a reason to care about craft and a warning against using
it as one. It is also well documented as unreliable: several studies
found the effect disappears or reverses when users actually perform a
task. Build for the boring reason, then let it look good.

## UI principles that follow

**Hierarchy.** Arrange elements so importance is readable without
reading. Size, color, position, and whitespace are the four levers.
Larger reads as more important, saturated reads as closer, higher and
more central gets more attention, and more surrounding space reads as
more important. Hierarchy exists in two forms and both are required:
visual (does the eye go to the right thing) and content (do the heading
levels describe the actual structure of the information). A page can
have a beautiful visual hierarchy over a content hierarchy that lies.

**Consistency.** Four kinds, and each one fails differently:

- *Visual*: same colors, type, spacing, icons, and control shapes
  throughout.
- *Functional*: the same action behaves the same way everywhere. Back
  means back. A trash icon deletes the thing it sits next to.
- *Internal*: consistent across your own screens.
- *External*: consistent with platform and category conventions. This
  one is Jakob's law applied to your own product, and it is the easiest
  to break by accident when a component library drifts.

**Whitespace.** The empty space around elements, and the single most
underused tool in a crowded interface. Space gives readability, directs
attention to the important thing, and communicates grouping on its own.
It comes in two sizes and both matter: macro space between sections
(`py-24` to `py-40` in `system.md`) and micro space inside a component
(the gap between a button's icon and its label). Related things get
micro space, unrelated things get macro space. The failure mode is
clutter: elements packed tight enough to read as noise, where the user
cannot tell what groups with what.

## When to break a rule on purpose

Every law here has a legitimate exception, and knowing which one you are
breaking is the difference between a decision and an accident:

- Hick's law breaks when discovery is the product, as in a bento grid
  meant to be explored.
- Jakob's law breaks when the familiar pattern is genuinely wrong for
  the job, and you have the budget to teach the new one.
- Fitts's law breaks for a deliberately hard action, such as a confirm
  button you want two people to look at twice.
- Aesthetic-usability breaks nothing. It is a measurement you can
  ignore, not a permission slip.

When you do break one, say so in the handoff and give the reason. The
next person will otherwise read it as a bug and "fix" it back.
