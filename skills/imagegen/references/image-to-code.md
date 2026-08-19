# Image to code

## The workflow

1. Infer the section count.
2. Generate the section reference images first.
3. Add detail or extraction images where needed.
4. Regenerate unclear sections as fresh standalone images.
5. Deeply inspect every image.
6. Extract: text, type, spacing, colors, layout, buttons, component
   logic.
7. Implement to match the generated design as closely as possible.
8. Invent missing details only when the images leave it ambiguous.

## Anti-under-generation

Never reduce the image count for convenience. One clear image per
section beats one compressed board. An extra detail image beats
guessing.

## The do-not-crop rule

Never crop a section out of a larger image: it destroys spacing, type
scale, and proportions. Generate fresh, keeping the design language.

## Deep analysis

Treat the images as the specification: exact visible text, type scale
relationships, spacing logic, button shapes, palette, shadow mood.
Faithful logic, not pixel OCR.

## Design-to-code discipline

Copy-oriented: visually faithful, not inspired by. No drift into
default templates, generic rows, compressed spacing, flattened type, or
reintroduced nested boxes.

## Missing detail order

1. Preserve the visible design language.
2. Preserve the layout logic.
3. Preserve the component family.
4. Preserve the mood.
5. Generate an extra image.
6. Regenerate fresh.
7. Then pick the most implementation-friendly faithful version.

## Hero readability

One focal point, headline 1-3 lines, no pills or fake stats, clean on
a small laptop.

## Section packs

4, 8, or 12: hero, trust bar, features, showcase, benefits,
testimonials, pricing, CTA.