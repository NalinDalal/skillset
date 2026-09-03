# Verify (the finish gate)

Nothing ships without this gate. Evidence classes: [capture] screenshot
at the stated viewport, [dom] computed style or DOM check, [code]
source with file:line. Assertions are not evidence.

## The gate

1. Seven viewports render without overflow: 1440, 1280, 1024, 768, 640,
   390, 375. [capture]
2. Hierarchy changes per class, not just shrinks: desktop full chrome,
   tablet reduced secondary chrome, mobile one-column with primary
   action first. A squeezed desktop is a failed adaptation. [capture]
3. No surface renders blank: every list, panel, search, trash has empty,
   loading, and error states. [dom]
4. Error states explain what happened and give a recovery action. [dom,
   code]
5. No P0 or P1 issues remain. [code, dom]
6. Feedback matches the mechanism table. [code]
7. Keyboard: Escape exits transient states, focus never gets trapped,
   no mouse-only controls. [code, dom]
8. First-run guidance exists and self-disappears. [capture]
9. prefers-reduced-motion respected. [code]
10. The 10-minute journey runs clean at every step. [per-step result]
11. Lint and build pass. [command output]

Per class also verify: nav collapse, hero reflow, multi-column
fallbacks, touch targets at 44px minimum, nothing scrolls horizontally,
container-queried components at their narrowest realistic container.

Accessibility, responsive, dark mode, and copy each have a dedicated
gate. See references/accessibility.md, references/responsive.md,
references/dark-mode.md, references/copy.md.

Zero failures to declare done. Fix and re-run the failed rows. If no
browser tooling exists, say "visual verification was NOT performed" and
downgrade captures to dom and code. Never skip silently.
