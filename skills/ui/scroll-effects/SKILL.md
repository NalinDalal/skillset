---
name: scroll-effects
version: 1.0.0
description: "Scroll-driven animation patterns: layered parallax, pinned heading, 3D card zoom, line-by-line reveal, sideways text, card arc carousel, fixed 3D models, stacking cards, focus frame slider, scroll-triggered demo. Use when the user asks 'scroll effects', 'parallax', 'pinned section', 'scroll animation', 'scroll-triggered', 'scrollytelling', or wants motion tied to scroll position."
---

# SOP: Scroll Effects

## What this skill owns

Ten scroll-driven patterns. Each ties motion to scroll position. Use them to guide attention, not to decorate. Pair with ui/gsap-scrolltrigger for implementation.

## The patterns

### 1. Layered parallax

Background and foreground move at different speeds. Creates depth.

Minimum viable:

- Move the background slower than the content.
- Keep the offset small. Large offsets cause motion sickness.
- Disable on prefers-reduced-motion.
- Test on mobile.

Owner: this skill. ui/gsap-scrolltrigger covers implementation.

### 2. Pinned heading

The heading stays fixed while content scrolls past it.

Minimum viable:

- Pin the heading for a defined scroll range.
- Unpin before the next section.
- Keep the pinned element short.
- Test that it releases on mobile.

Owner: this skill.

### 3. 3D card zoom

A card scales and rotates as it enters the viewport.

Minimum viable:

- Animate scale and rotation on scroll enter.
- Keep the rotation under 15 degrees.
- Reset when the card leaves view.
- Respect reduced motion.

Owner: this skill.

### 4. Line-by-line reveal

Text lines appear one by one as the user scrolls.

Minimum viable:

- Split text into lines.
- Reveal each line on scroll progress.
- Keep the timing steady, not jerky.
- Provide a no-motion fallback.

Owner: this skill. ui/animaxxing covers text effects.

### 5. Sideways text

Text moves horizontally as the page scrolls vertically.

Minimum viable:

- Tie horizontal position to vertical scroll.
- Keep the text readable.
- Avoid covering content.
- Disable on small screens.

Owner: this skill.

### 6. Card arc carousel

Cards fan out along an arc as the user scrolls.

Minimum viable:

- Position cards along a curved path.
- Animate the arc on scroll progress.
- Keep focus on the centre card.
- Test on touch devices.

Owner: this skill.

### 7. Fixed 3D models

A 3D model stays fixed while text scrolls around it.

Minimum viable:

- Fix the model to the viewport.
- Scroll text alongside it.
- Keep the model light. Heavy models hurt performance.
- Provide a static fallback.

Owner: this skill.

### 8. Stacking cards

Cards stack on top of each other as the user scrolls.

Minimum viable:

- Pin each card as it arrives.
- Scale the previous card slightly.
- Keep the stack short, five cards max.
- Test on mobile.

Owner: this skill.

### 9. Focus frame slider

A frame highlights one item at a time as the user scrolls.

Minimum viable:

- Move the frame to the active item.
- Keep the frame visible.
- Sync the frame with scroll progress.
- Avoid jarring jumps.

Owner: this skill.

### 10. Scroll-triggered demo

A product demo plays as the user scrolls through it.

Minimum viable:

- Tie demo steps to scroll progress.
- Keep each step short.
- Let users pause or skip.
- Provide a non-scroll fallback.

Owner: this skill.

## Rules

- Motion should guide attention, not decorate.
- Respect prefers-reduced-motion.
- Keep frame rates smooth. Drop effects that jank.
- Test on a real phone.
- Avoid scroll hijacking. Let the user control speed.

## Related skills

- ui/gsap-scrolltrigger: ScrollTrigger implementation
- ui/gsap-core: GSAP tweens and timelines
- ui/animaxxing: text and particle effects
- ui/motion: motion decisions and review
- devops/performance: animation performance
- engineering/site-launch-readiness: launch checks
