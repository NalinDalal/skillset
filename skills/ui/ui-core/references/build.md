# Build the screen

## The anti-slop tells (kill every one)

- Purple or blue glow gradients.
- Glowing buttons, oversized rounded cards.
- Three equal feature cards.
- The same five icons as every other AI output.
- Version labels in heroes (V0.6, BETA) unless it is a launch.
- Section-number eyebrows ("001", "01/4").
- Middle dots everywhere, decorative color dots.
- Filler words: Elevate, Seamless, Unleash, Next-Gen, Game-changer.
- Fake names and numbers: John Doe, Acme, 99.99%.
- Scroll cues, hero-bottom strips, mock-humble references.
- Cards in cards, div-fake product UI.
- Inter and Roboto as defaults.

## Accessibility (enforced in build, not just verified)

- Color contrast: 4.5:1 for body text, 3:1 for large text and UI
  components. Test with actual text, not color picker values.
- Focus management: every interactive element must be keyboard reachable.
  Focus order follows visual order. No keyboard traps.
- Focus visible: never remove focus styles. Custom focus rings must be
  at least 2px, high contrast, and visible on both light and dark
  backgrounds.
- ARIA: use semantic HTML first. Add ARIA only when HTML falls short.
  aria-label for icon-only buttons, aria-describedby for help text,
  aria-live for dynamic updates.
- Screen reader: decorative icons get aria-hidden="true". Status
  messages use aria-live="polite". Errors use aria-live="assertive".
- Touch targets: 44x44px minimum on mobile, 32x32px on desktop. Gaps
  between targets count toward size.
- Motion: respect prefers-reduced-motion. Provide reduced-motion
  alternatives for all animations.
- Forms: every input has a label. Error messages are linked with
  aria-describedby. Required fields use required, not just asterisks.
- Landmarks: use header, main, nav, footer, aside. One main landmark per
  page. Skip links for keyboard users.
- Text alternatives: meaningful images have alt text. Decorative images
  have alt="". SVG icons use aria-hidden or title/desc.
- Error prevention: destructive actions have confirmation. Inputs have
  validation before submission, not after.
- Consistent navigation: same nav on every page. Current page indicated
  visually and with aria-current="page".

## Responsive design system

- Breakpoint scale: sm 640, md 768, lg 1024, xl 1280, 2xl 1536. Mobile
  first, always.
- Reflow before resize: at each breakpoint, ask if the layout should
  reflow or just resize. Reflow wins.
- Container queries over media queries when component width depends on
  parent, not viewport.
- Touch targets: 44x44px minimum on touch devices. Spacing between
  targets: 8px minimum gap.
- Density shifts: mobile gets larger touch targets and less dense
  content. Desktop gets more columns and tighter spacing.
- Horizontal scroll banned: no element should overflow its container on
  any viewport.
- Typography scales with viewport: use clamp() for font sizes, not
  fixed breakpoint jumps.
- Images: max-width 100%, height auto. Use srcset and sizes for
  responsive images. Art direction with <picture> when needed.
- Navigation: hamburger on mobile, full nav on desktop. Always visible,
  never hidden behind hover.
- Tables: horizontal scroll on mobile, full table on desktop. Sticky
  first column on mobile tables.
- Modals: full-screen on mobile, centered dialog on desktop. Bottom
  sheet on mobile feels native.
- Forms: single column on mobile, multi-column on desktop when fields
  are short. Labels above inputs on all viewports.

## Dark mode implementation

- CSS variable architecture: all colors via CSS variables. Light and dark
  variants in :root and .dark.
- Tailwind strategy: use dark: prefix. Never hardcode colors in JSX.
  All colors reference tokens.
- System preference: default to system. Allow manual override with
  localStorage. Respect prefers-color-scheme.
- Color adjustments: reduce saturation by 10-20% in dark mode. Dark
  backgrounds need lighter text, not darker.
- Neutral scale: invert for dark mode. Background goes from light to
  dark. Text goes from dark to light. Borders go from light to
  semi-transparent light.
- Accent: keep the same hue, increase lightness by 5-10% in dark mode.
  Don't change the accent color between light and dark.
- Shadows: eliminate in dark mode or use very subtle diffused shadows.
  Borders replace shadows for separation in dark mode.
- Images: don't invert. Use opacity adjustments for images in dark mode
  if needed. SVG icons with currentColor adapt automatically.
- Text: never pure white (#fff) on pure black (#000). Use gray-50 to
  gray-100 on gray-900 to gray-950. Minimum 4.5:1 contrast.
- Form inputs: darker background, lighter border, lighter text. Focus
  ring must be visible on dark backgrounds.
- Code blocks: darker background, lighter text. Syntax highlighting
  must adapt to dark mode.
- Testing: verify every screen in both light and dark mode. Check
  contrast, readability, and visual hierarchy.

## Copy and UX writing standards

- Imperative mood for CTAs: "Create project", "Send message", not
  "Create a project" or "Submit your request". Verb first.
- Sentence case for all UI text: capitalize first word and proper nouns
  only. No title case, no all caps except for acronyms.
- Error messages: three parts. What happened, why it happened, how to
  fix it. "Email is required" not "Error: invalid email".
- Success messages: what was done, not "Success!". "Project created"
  not "Success! Your project has been created".
- Label brevity: one to three words. "Email" not "Email address".
  "Save" not "Save changes". Use helper text for context.
- Micro-copy tone: calm, direct, human. No marketing speak. No
  exclamation marks in functional text. One exclamation max per
  marketing screen.
- Placeholder text: shows the format, not the label. "you@example.com"
  not "Enter your email address".
- Button labels: action verb, no articles. "Delete account" not "Delete
  the account". "Continue" not "Next".
- Help text: one sentence. Two max. Explain the constraint, not the
  obvious. "8+ characters" not "Please enter at least 8 characters".
- Confirmation dialogs: title is the action, body is the consequence.
  "Delete project" / "This will permanently remove all data. This
  action cannot be undone."
- Empty states: what the user sees, what they can do. "No projects
  yet. Create your first project to get started."
- Tooltips: one line, no punctuation. Context, not description.
  "Sort by date" not "Click here to sort the list by date".

## Animation state machine

Define behavior for each state. Motion answers "what happened?"

| State | Trigger | Motion | Duration | Notes |
|-------|---------|--------|----------|-------|
| Idle | Resting | None | - | No idle animations. No pulses, no floating. |
| Entering | Appear | Fade + slight scale or translate | 200ms | Spring curve. State lands first. |
| Entered | Settled | None | - | Static until next event. |
| Active | Hover, press, focus | Subtle state change | 150ms in, 100ms out | One motion per event. |
| Exiting | Disappear | Fade out, reverse of enter | 150ms | Matches enter direction. |
| Exited | Gone | None | - | Remove from DOM after animation. |
| Disabled | Invalid state | None | - | Visual state only, no motion. |
| Error | Validation fails | Shake or highlight | 200ms | Subtle, not distracting. |
| Loading | Async operation | None or subtle pulse | Infinite only if justified | Prefer skeleton over spinner. |
| Updating | Data changes | Layout animation or flash | 150ms | Only the changed element. |

Rules:
- One motion per event. Two springs competing reads as glitch.
- Exits exist. No one-frame vanishes.
- State lands first. Motion is polish on top.
- Reduced motion: all states become instant. No springs, no entrances.
- Interruptible: next event cancels current animation. Nobody waits.

## Image and asset guidelines

- Format selection: WebP for photos, AVIF for graphics with gradients,
  SVG for icons and illustrations, PNG only when transparency is
  required and WebP/AVIF fail.
- Responsive images: use srcset and sizes. Provide 1x, 2x, and 3x
  sources. Art direction with <picture> for major layout changes.
- Lazy loading: native loading="lazy" for below-fold images. Above-fold
  images use loading="eager" with width and height attributes to
  prevent layout shift.
- Placeholder patterns: low-quality image placeholder (LQIP) with blur
  transition, solid color placeholder, or SVG silhouette. No broken
  image icons.
- SVG optimization: remove metadata, minify paths, use currentColor for
  dynamic coloring. Inline small SVGs, reference external for large.
- Icon fonts: avoid. Use SVG sprites or individual SVG files.
- Image sizing: never serve larger images than needed. Use image CDN or
  build-time resizing. Max width per breakpoint.
- Decorative images: aria-hidden="true", empty alt. Don't clutter
  screen readers with decoration.
- Favicon: 32x32 and 16x16 PNG, or SVG favicon. One favicon per site.
- Background images: use CSS background-image for decorative images.
  Use <img> for content images. Never use img for pure decoration.

## Form design standards

- Label placement: above the input, left-aligned. Never floating
  labels. Never placeholder-as-label.
- Label association: use htmlFor matching input id. Screen readers
  announce the label with the input.
- Input sizing: height 40-44px on desktop, 44-48px on mobile. Full
  width on mobile, constrained on desktop.
- Validation timing: validate on blur for single fields, on submit for
  the whole form. No inline validation while typing unless the field
  has a clear format constraint (email, phone).
- Error display: below the input, red text, error icon. Linked with
  aria-describedby. Show only the first error per field.
- Success indication: green border or checkmark on valid fields after
  interaction. Don't show before user interacts.
- Required fields: required attribute, asterisk after label in red.
  Don't use color alone. Screen reader announces "(required)".
- Submit button: disabled while submitting. Shows spinner or "Saving..."
  text. Re-enable on error.
- Multi-step forms: show progress indicator. Save state between steps.
  Allow back navigation. Don't lose data on refresh.
- Field grouping: use fieldset and legend for related fields. Radio
  buttons and checkboxes always grouped.
- Auto-complete: use appropriate autocomplete attributes. Name, email,
  address, credit card. Helps users and password managers.
- Password fields: show/hide toggle. Never auto-fill password managers
  incorrectly. Use autocomplete="current-password" or
  "new-password".
- Form layout: single column on mobile, two columns on desktop when
  fields are short. Max width 600px for forms. Don't stretch full
  width on desktop.

## Loading and skeleton patterns

- Skeleton first: show skeleton before spinner. Skeleton matches the
  content shape. Spinner is for unknown duration or full-page loading.
- Skeleton design: same layout as content, gray animated blocks. No
  content-shaped skeletons that look like real data.
- Shimmer animation: light gradient moving across skeleton. 1.5s to
  2s duration, ease-in-out infinite. Respects reduced-motion.
- Progressive loading: load critical content first, then enhancements.
  Show content as soon as available, don't wait for everything.
- Optimistic UI: update UI immediately, revert on error. Show subtle
  indicator that update is pending. Don't block user interaction.
- Spinner usage: small spinner for buttons and inline. Medium spinner
  for cards and panels. Large spinner for full-page. No spinner for
  content that loads in under 300ms.
- Placeholder text: "Loading..." not "Please wait". Time estimates when
  available: "Uploading... 2 of 5 files".
- Button loading: disable button, show spinner inside, change text to
  "Saving..." or similar. Never submit twice.
- Infinite scroll: show skeleton at bottom while loading more. Don't
  show spinner at bottom. Have a "Load more" button for explicit
  control.
- Error recovery: if loading fails, show error with retry button.
  Don't silently fail or show empty state.
- Image loading: show blur placeholder, then fade in. Don't show
  broken image icon. Lazy load below-fold images.

## Design token naming convention

- Semantic naming: use function, not appearance. --color-primary, not
  --color-blue-500. --spacing-md, not --spacing-16px.
- Component tokens: --button-bg, --button-text, --input-border. Derived
  from semantic tokens.
- Scale naming: 50-950 for color (50 lightest, 950 darkest). sm/md/lg
  for spacing and sizing. xs, sm, md, lg, xl for icons and typography.
- Light/dark variants: --color-primary in :root, --color-primary in
  .dark. Same name, different value. Never --color-primary-dark.
- Extension rules: add new tokens at the end of the scale. Never insert
  in the middle. New scales need a reason and documentation.
- Token categories: color, spacing, radius, shadow, typography, motion,
  z-index. One category per token prefix.
- Alias tokens: --color-text = --color-gray-900. Use aliases for
  frequently used values. Reduces duplication.
- Deprecated tokens: mark with comment, don't delete. Migrate in next
  major version. Keep old token working during transition.
- Documentation: every token has a comment explaining its purpose and
  usage. No orphaned tokens.

## i18n and text expansion

- Text expansion budget: design for 30-50% text expansion. German,
  French, Spanish can be 30-50% longer than English. Don't break
  layouts.
- Flexible containers: use min-width and max-width, not fixed widths.
  Allow text to wrap naturally. Avoid fixed-width buttons.
- Text truncation: use line-clamp for headlines. Ellipsis for buttons
  and labels. Never truncate error messages or instructions.
- RTL support: use logical properties (margin-inline-start, not
  margin-left). Use dir="rtl" for Arabic, Hebrew. Test both
  directions.
- Locale-aware formatting: dates, numbers, currency. Use user's locale.
  Don't hardcode formats. Use Intl API.
- Number formatting: thousands separators, decimal separators vary by
  locale. 1,000.00 in US, 1.000,00 in DE. Use Intl.NumberFormat.
- Date formatting: relative dates ("2 hours ago") and absolute dates
  vary by locale. Use Intl.DateTimeFormat.
- Currency: symbol position varies. $100 in US, 100€ in DE. Use
  Intl.NumberFormat with currency style.
- Pluralization: "1 file" vs "2 files". Use ICU message format or
  similar. Don't concatenate strings.
- String externalization: all UI text in translation files. No hardcoded
  strings in components. Use keys, not raw text.
- Font support: ensure fonts support required character sets. Noto fonts
  for broad language support. Test with actual translated text.
- BCP 47 tags: use proper language tags (en-US, fr-FR, ar-SA). Don't
  use generic "en" or "fr" when region matters.

## Component composition patterns

- Compound components: related components that work together. <Select>,
  <Select.Item>, <Select.Trigger>. Parent manages state, children
  compose UI.
- Render props: pass function as child for flexibility. <List
  items={items} renderItem={item => <Item {...item} />} />.
- Headless vs styled: separate logic from presentation. Headless
  component handles state, accessibility, keyboard nav. Styled
  component handles visuals.
- Slots: named slots for flexible composition. <Card header={...}
  body={...} footer={...} />. Clear contract for each slot.
- Polymorphic components: render as different HTML elements. <Text
  as="h1"> or <Text as="p">. Use "as" prop, never "component".
- Hook extraction: extract reusable logic to custom hooks. Use for
  state, effects, accessibility. Keep hooks focused and single-purpose.
- Context for state sharing: use React Context for deeply nested state.
  Avoid prop drilling beyond 2 levels. Split contexts by concern.
- Higher-order components: use sparingly. Prefer hooks. HOC for
  cross-cutting concerns (auth, theme). Document the wrapped props.
- Component variants: use type variants, not conditional classes.
  Button variants: primary, secondary, ghost. Use discriminated union.
- Composition over configuration: prefer props for composition, not
  giant config objects. <Form><Input /><Input /></Form> over <Form
  fields={[...]} />.
- Avoid premature abstraction: duplicate until it hurts. Extract when
  three or more components share the same pattern. Not two.

## Keyboard shortcut and command palette design

- Shortcut formatting: use platform symbols. ⌘ for Mac, Ctrl for
  Windows/Linux. Display as text: "⌘K" not "Cmd+K" or "Command+K".
- Shortcut conflicts: check against browser and OS shortcuts. Don't
  override browser shortcuts (⌘T, ⌘W, ⌘Q).
- Discoverability: show shortcuts in menus, tooltips, and help pages.
  Command palette is the primary discovery mechanism.
- Command grouping: group by category. Navigation, actions, settings.
  Use dividers. Most used commands at top.
- Command search: fuzzy search by default. Search by name, shortcut,
  and description. Recent commands at top.
- Command feedback: show what the command does before executing.
  Preview for navigation commands. Confirm for destructive commands.
- Keyboard navigation: arrow keys to navigate, Enter to execute, Esc
  to close. Tab to skip between groups. Type to filter.
- Context-aware commands: show different commands based on current
  page or selection. Hide unavailable commands, don't disable.
- Command palette trigger: ⌘K or Ctrl+K. Always available. Never
  hidden behind menu.
- Custom shortcuts: allow user customization. Show current shortcut.
  Warn on conflicts. Persist in user settings.

## Notification and toast design

- Toast hierarchy: info, success, warning, error. Each has distinct
  color and icon. Info is default, success is green, warning is amber,
  error is red.
- Toast placement: bottom-right on desktop, bottom-center on mobile.
  Don't cover primary content. Stack from bottom.
- Toast duration: 4s for info, 5s for success, 6s for warning, 8s for
  error. User can dismiss early. Pause on hover.
- Toast actions: one action max. "Undo" for undoable actions. "View"
  for navigation. No "OK" button. Dismiss is implicit.
- Toast stacking: max 3 toasts visible. New toasts push old ones up.
  Don't stack more than 3. User sees all, not a wall.
- Persistent toasts: for errors requiring action. Don't auto-dismiss.
  Require explicit dismiss or action.
- Inline vs toast: use toast for transient feedback. Use inline for
  persistent status. Use alert for errors blocking the page.
- Toast icons: match the type. Checkmark for success, alert for error,
  info for info. Don't use icons for dismiss.
- Toast accessibility: aria-live="polite" for info/success,
  aria-live="assertive" for error. Focus stays on main content. Toast
  doesn't steal focus.
- Toast styling: subtle shadow, border, background. Match the design
  system. No glowing, no gradients. Compact on mobile.

## Error boundary and error state design

- Error boundaries: wrap each major section, not just the whole app.
  One error boundary per route or feature. Isolate failures.
- Inline errors: show next to the field. Red border, error icon, error
  message below. Don't alert for field errors.
- Full-page errors: when the whole page fails. Error message,
  description, retry button. Don't show stack traces to users.
- Error message structure: what happened, why (if helpful), how to
  recover. "Something went wrong" is never enough.
- Recovery actions: primary action is retry. Secondary action is go
  home or contact support. Always give user a way out.
- Technical details: collapsible section or link. Show for debugging,
  hide by default. Never show stack traces unless user asks.
- Network errors: distinguish between 4xx and 5xx. 401/403 means auth
  issue, redirect to login. 404 means not found, show not found page.
  5xx means server error, show retry.
- Form errors: field-level errors inline. Form-level errors above the
  form. Don't mix them. Show form-level only after submit.
- Error prevention: destructive actions have confirmation. Auto-save
  drafts. Show "You have unsaved changes" before navigation.
- Logging: log errors with context. User ID, action, timestamp. Don't
  log sensitive data. Don't show internal error codes to users.
- Error pages: 404, 500, maintenance. Each has consistent design.
  Navigation to home. Don't dead-end the user.

## Performance and rendering guidelines

- Layout stability: reserve space for async content. Use aspect-ratio
  boxes. Prevent layout shift. CLS under 0.1.
- Paint complexity: avoid box-shadow on large areas. Use border
  instead. Avoid backdrop-filter on scroll. Test with DevTools
  Performance.
- Animation performance: animate transform and opacity only. Avoid
  layout animations. Use will-change sparingly. Remove after animation.
- Bundle impact: tree-shake animation libraries. Import only what you
  use. motion.dev is lighter than Framer Motion. Lenis only when dial=3.
- Image optimization: WebP/AVIF, srcset, lazy loading. Use image CDN.
  Serve correct sizes. Don't load 4k images for 400px containers.
- Font loading: use font-display: swap. Preload critical fonts.
  Subset fonts to needed characters. Avoid layout shift from font
  swap.
- JavaScript: code split by route. Lazy load below-fold components.
  Avoid large dependencies. Use dynamic imports.
- Rendering: avoid unnecessary re-renders. Use React.memo for pure
  components. Use useMemo and useCallback for expensive operations.
  Don't over-optimize.
- Caching: cache static assets. Use service workers for offline.
  Cache API responses when appropriate. Stale-while-revalidate for
  dynamic content.
- Metrics targets: LCP under 2.5s, FID under 100ms, CLS under 0.1.
  Measure with real user metrics, not just lab tests.
- Motion dial impact: dial=3 adds GSAP, ScrollTrigger, Lenis. Only
  load when needed. Don't load on pages that don't use them.

## Mobile-specific patterns

- Bottom sheets: use for mobile modals. Swipe to dismiss. Snap points
  for height. Don't use centered modals on mobile.
- Swipe actions: swipe left for delete, swipe right for archive. Show
  action buttons on swipe. Undo for destructive actions.
- Pull-to-refresh: for content feeds. Visual feedback during pull.
  Don't use on forms or inputs. Disable when not applicable.
- Safe areas: respect safe area insets. Don't put content under
  notches or home indicators. Use env(safe-area-inset-*).
- Thumb zone: primary actions in bottom third of screen. Secondary
  actions in top. Navigation at bottom for mobile.
- Touch feedback: immediate visual feedback on touch. Ripple or
  highlight. No 300ms delay. Use active state.
- Gestures: swipe for navigation, pinch for zoom, long-press for
  context menu. Don't override system gestures.
- Keyboard handling: dismiss keyboard on scroll. Don't hide content
  behind keyboard. Scroll to focused input.
- Orientation: support both portrait and landscape. Test both. Don't
  lock orientation unless required.
- Performance: mobile devices have less power. Reduce animation
  complexity. Lazy load aggressively. Test on low-end devices.
- Hover states: don't rely on hover for mobile. Use active and focus
  states. Hover is enhancement, not requirement.
- Navigation: bottom tab bar for primary navigation. Hamburger menu
  for secondary. Don't hide navigation behind gestures.

## Notification and badge design

- Badge purpose: show count, status, or newness. One purpose per badge.
  Don't combine count and status.
- Badge placement: top-right of the element. Don't cover icon or text.
  Use offset to position clearly.
- Badge size: 16-20px for small icons, 20-24px for medium, 24-28px
  for large. Scale with the element.
- Badge content: number up to 99, then "99+". For status, use dot or
  icon. For newness, use "New" text or dot.
- Badge color: accent color for count, semantic color for status. Red
  for error, green for success, amber for warning.
- Badge animation: subtle pulse for new badges. Stop after first view.
  Don't pulse forever. No animation for count badges.
- Notification center: list of notifications. Group by date. Mark all
  as read. Clear visual hierarchy.
- Unread indicator: dot or bold text. Not both. Don't use color alone.
- Badge accessibility: aria-label with count. "3 notifications" not
  "notification". Screen reader announces the count.
- Badge density: one badge per element. Don't stack badges. If multiple
  statuses, use a dot with tooltip.

## Empty state design system

- Empty state purpose: explain why empty, what user can do. Not just
  "No data". Tell the story.
- Empty state structure: illustration or icon, headline, description,
  primary CTA. In that order.
- Illustration vs icon: illustration for major empty states (first
  visit, no data). Icon for minor empty states (empty filter results).
  Don't use illustration for every empty state.
- Empty state copy: headline is one line, max 8 words. Description is
  one to two sentences. CTA is action verb. "Create your first project"
  not "Click here to create a project".
- Empty state CTA: primary action only. One button. No secondary
  actions. If multiple actions possible, show the most important one.
- Empty state placement: full panel for major empty states. Inline for
  minor. Center for focused content. Don't hide empty state in corner.
- Filter empty state: "No results for [query]" with clear filter.
  Show active filters. Offer to clear filters.
- Error state vs empty state: empty state is expected (no data yet).
  Error state is unexpected (something broke). Different design,
  different copy.
- Returning user empty state: acknowledge history. "You haven't
  created any projects yet" not "No projects". Personalize when
  possible.
- Empty state animation: subtle fade-in for illustration. No motion
  for text. Keep it quiet. Empty state is not a showcase.


## Hero rules

- Fits the viewport: headline max 2 lines, subtext max 20 words.
- One primary CTA, max one secondary. Nothing under the CTA: no
  taglines, no trust strips, no avatar rows, no feature bullets.
- No pills, fake stats, badges, or tiny logos.
- Banned: centered dark mesh, generic background image.

## Layout rules

- One layout family per section. A family appears once across 8
  sections.
- Max two consecutive image-text splits.
- Grid over flex math. No w-[calc(33%-1rem)] style fractions.
- min-h-[100dvh], never h-screen.
- Bento: as many cells as content, no empty cells, 2-3 cells with real
  visual variation.
- Split headers banned: stack vertically, body at 65ch.
- Sidebars: no multi-level nested scroll.

## Typography discipline

- No 6-line wraps. A headline over 3 lines is a font-size error.
- Eyebrows: max one per 3 sections. Signature style: text-[11px]
  uppercase tracking-[0.18em].
- One copy register across the whole page.
- No em dashes in visible text. Ever.

## Content

- Real words, real numbers, real names.
- Lists over paragraphs. Spec tables become 2-column cards or grouped
  chunks.
- Quotes under 3 lines with name and role.
- No Lorem Ipsum. Placeholder images: picsum with a seed, labeled TODO,
  or generated.

## Icons, imagery, motion

- Icon family: Phosphor, Radix, Tabler, or Doton. One family, one stroke
  weight. Lucide only on request.
- Duo-tone or triple-tone icons also look great.
- Real imagery: hero plus supporting images, even in minimal builds.
  SVG grayscale filters on photos are banned.
- Motion: see the motion skill. Springs, one motion per event, nothing
  loops.
- No external widget dependencies in the first pass. Build the core
  first, add libraries only when they earn it.

## Chart and data visualization design

- Prefer minimal ink: remove gridlines, axis ticks, and borders until the
  chart is unreadable, then add back the minimum needed.
- One accent per series. Use hue, not lightness, to distinguish series in
  the same chart. Lightness is for emphasis within a series.
- Annotations over legends: label the line, don't make the reader match
  color to name. Tooltips are a fallback, not the primary label.
- Type hierarchy in charts: title > axis label > tick label > annotation.
  No more than three levels.
- Zero baseline for deltas, true zero for counts. A bar chart starting
  at 50 exaggerates a 52-51 difference. A line chart can zoom when the
  range is known.
- Interactivity earns complexity: static first, hover detail second,
  draggable/brush only when the user asks for it. Every interactive
  element must have a keyboard equivalent.
- Evil Charts is a strong reference for chart inspiration.

## Testimonial and social proof patterns

- One quote, one name, one role. Three lines max for the quote. The name
  and role sit below, smaller and quieter. No avatar rows, no logo grids,
  no "trusted by" marquees in the hero.
- The quote is the UI element, not the person. Design the quote mark,
  the type treatment, the spacing. The photo is optional and small.
- Static over carousel. A carousel implies scarcity. Show three strong
  quotes stacked or in a clean grid. If space demands a carousel, make it
  obvious there are more and let the user control pace.
- Attribution format: "Name, Role at Company" in body or hint weight.
  Never bold the name alone. The role gives the quote weight.
- Make.design testimonial pages are a strong reference for polish and
  layout rhythm.

## Whitespace as a first-class principle

- Whitespace is a layout tool, not empty space. It separates, groups, and
  establishes hierarchy the same way borders and shadows do, but quieter.
- Section padding: py-24 to py-32 on desktop, py-16 to py-24 on tablet,
  py-12 to py-16 on mobile. Never drop below py-12 between distinct
  sections.
- Component padding: p-6 to p-8 for cards, p-4 for compact controls.
  Inconsistent padding is a visual error.
- Density ladder: hero is sparse, feature section is medium, data table
  is dense. One density per section. Mixed density reads as sloppy.
- Kobbe.io is a strong reference for generous whitespace and clean
  spacing rhythm.

## Type scale system

- One scale, one ratio. Use modular scale: major third (1.25), perfect
  fourth (1.333), or golden ratio (1.618) depending on density.
- Display scale: clamp() for responsive type. Example: text-[clamp(2.5rem,5vw,4.5rem)]
  for hero headlines. Never hardcode breakpoint-specific font sizes.
- Hierarchy: display > headline > section > body > caption. Five levels
  max. Body at 16px base, 1.5 line-height, max 65ch width.
- Weight ladder: 400 for body, 500 for emphasis, 600 for labels, 700 for
  display. No 800 or 900 in UI text.
- Tracking: tighten display type (-0.02em to -0.04em), loosen small
  labels (0.02em to 0.05em). Body tracking is default.
- Leading: display at 1.05 to 1.1, body at 1.5 to 1.6, caption at 1.4.
  Tight leading for big type, loose for small.
- Mono for data only. JetBrains Mono, IBM Plex Mono, or Geist Mono.
  Never use mono for body copy.

## Color semantics

- One accent hue, multiple lightness stops. Use the same hue for primary
  action, active state, focus ring, and selected state. Lightness
  distinguishes the role, not hue.
- Accent usage order: primary CTA > active state > focus ring > selected
  state > notification dot. Use it in this priority. When in doubt, the
  primary CTA gets the full saturation.
- Neutral scale: nine stops from 0 to 100. Use 0-20 for backgrounds,
  40-60 for body text, 80-100 for disabled and hints. Never pure black
  (#000) on white; use gray-950 or gray-900.
- Semantic colors: success, warning, danger, info. Each gets one hue,
  used only in that semantic role. Warning never borrows from accent.
  Danger never borrows from warning.
- Dark mode: invert the neutral scale, keep the accent hue, reduce
  saturation by 10-20%. Dark backgrounds need lighter text, not darker
  text.
- 4.5:1 contrast minimum for body text, 3:1 for large text and UI
  components. Test with actual text, not color picker values.

## Component state matrix

Every interactive component must define these states before it ships:

| State | Visual | Motion | Example |
|-------|--------|--------|---------|
| Default | Resting state, no highlight | None | Button at rest |
| Hover | Subtle background or border shift | 150ms ease-out | Button lightens |
| Focus | Focus ring, no outline | Instant | Ring appears |
| Active/Pressed | Scale 0.97 to 0.98, darker fill | 100ms spring | Button depresses |
| Disabled | Grayed, no interaction | None | Button unclickable |
| Loading | Spinner or skeleton inside | None or subtle pulse | Button shows spinner |
| Error | Red border or text, error icon | None or shake | Input shows error |
| Empty | Placeholder text or illustration | None or fade-in | Empty state panel |
| Selected | Accent background or border | 150ms ease-out | Tab or toggle active |

Rules:
- Motion is optional for non-interactive states (empty, error).
- Focus must always be visible. Never remove focus styles.
- Disabled state must be visually distinct from loading state.
- Error state must include a recovery action or explanation.
- Every state must have a keyboard equivalent. No mouse-only states.

## Icon system

- Stroke weight: 1.5px for data-dense interfaces, 2px for marketing and
  landing pages. One weight per product.
- Sizing: 16px for inline with body text, 20px for section headers, 24px
  for standalone icons, 32px+ for feature illustrations.
- Filled vs outline: filled for active/selected state, outline for
  default. Never mix in the same component.
- Duo-tone: primary element filled, secondary element outline. Use for
  decorative icons that need hierarchy without color.
- Triple-tone: three opacity stops on a single icon. Use for
  illustrations and empty states, not navigation.
- Icon as decoration: earns its place. An icon that does not convey
  information or state is decoration. One per component max.
- Doton is approved for duo-tone and triple-tone icon sets.
