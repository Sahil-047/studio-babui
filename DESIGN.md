---
name: Studio Babui
description: An editorial storefront for contemporary unisex clothing, set like an independent fashion publication.
colors:
  ivory: "#f5f2ec"
  ink: "#22211f"
  stone: "#77736c"
  graphite: "#625e57"
  sand: "#e9e2d7"
  umber: "#9b8975"
  white: "#ffffff"
  error: "#8a3b2e"
typography:
  display:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(3rem, 1.4rem + 6.6vw, 8.25rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.6rem + 2.8vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.035em"
  lede:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.8vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.9375rem, 0.9rem + 0.15vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.65
  small:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(1rem, 0.4rem + 2.6vw, 3rem)"
  column-gap: "clamp(0.75rem, 0.4rem + 1.2vw, 1.75rem)"
  section: "clamp(7rem, 15vw, 14rem)"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 0"
  link-cta:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0 0 8px 0"
  size-option:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "44px"
  size-option-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
  input-underline:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "12px 0"
---

# Design System: Studio Babui

## Overview

**Creative North Star: "The Issue, Not the Shop"**

Studio Babui is presented as an issue of an independent fashion publication. Each scroll is a spread: a photograph placed off-centre on a calm ivory field, with Bodoni type working as a second image. Whitespace is the material, not leftover space. Interface chrome (navigation, captions, controls) stays tiny, tracked and quiet so the photographs and the headlines carry the page.

Motion borrows from editorial film titles. Photographs wipe open through a clip-path inset and settle from a slight zoom. Headlines rise line by line out of masks. Photographs drift a little slower than the page. Exactly one sequence moves sideways: Featured Pieces pins on desktop while products glide past with a running count.

**Key Characteristics:**
- Ivory field, ink type, sand behind every photograph while it loads.
- Oversized Bodoni display set against 11px tracked DM Sans capitals.
- Asymmetric 12-column spreads; no two sections share a composition.
- Square corners, hairline rules, no shadows, no cards.
- Every animation is off under prefers-reduced-motion; content is visible without JavaScript.

## Colors

A restrained palette: neutrals tinted warm, one muted accent that never fills an area.

### Primary
- **Ink** (`#22211f`): all primary text, solid buttons, the selected size, the custom cursor.

### Neutral
- **Ivory** (`#f5f2ec`): the page field, overlays, text on photographs.
- **Sand** (`#e9e2d7`): the placeholder behind every photograph, hairline dividers, borders on quiet controls.
- **Graphite** (`#625e57`): secondary text at small sizes on ivory (≈5.6:1).
- **Stone** (`#77736c`): secondary text only at large sizes (≈4.2:1 on ivory) and the counter's total.
- **White** (`#ffffff`): reserved; not used as a surface.

### Tertiary
- **Umber** (`#9b8975`): collection numerals, link hover tint, scrollbar thumb. Never body text, never a fill.

### Named Rules
**The Small Text Rule.** Text under 18px on ivory uses graphite, never stone; stone fails contrast at small sizes.
**The No Fill Rule.** Umber marks; it never fills a region.

## Typography

**Display Font:** Bodoni Moda (variable, optical sizing automatic) with Bodoni 72, Didot, Georgia fallbacks.
**Body Font:** DM Sans with system sans fallbacks.

**Character:** Hairline-contrast Didone headlines with italic turns for emphasis, against small, wide-tracked grotesque capitals for everything functional.

### Hierarchy
- **Display** (400, clamp 3–8.25rem, 0.92 line height, −0.035em): hero headline, section titles, brand statement, newsletter heading.
- **Title** (400, clamp 2.25–4.25rem, 1): collection names, inner-page subheads, empty bag.
- **Lede** (400 Bodoni, clamp 1.25–1.75rem, 1.3): pull statements, collection numerals, search results, subtotal.
- **Body** (400, clamp 15–17px, 1.65): long copy, inputs; measure kept to about 30–42ch in margins.
- **Small** (400, 13px, 1.55): supporting paragraphs, prices, product descriptions.
- **Label** (500, 11px, 0.16em tracking, uppercase): navigation, captions, metadata, CTAs, buttons.

### Named Rules
**The Italic Turn Rule.** A display line may switch to italic for its last phrase ("worn loud.", "individuality.", "Babui."). Never italicise a whole headline.
**The Masked Line Rule.** Any display text that animates is revealed line by line from a mask with padding below the baseline, so descenders never clip.

## Layout

A 12-column grid (`editorial-grid`) with fluid gutters (`gutter`, 16–48px) and fluid column gaps. Sections breathe with `clamp(7rem, 15vw, 14rem)` vertical padding. Compositions are asymmetric spreads: a large photograph on 5–8 columns, a supporting plate on 2–3 columns at a different height, and type set in the remaining margin. Every collection spread uses a different arrangement (portrait-left, landscape-wide, portrait-right, offset-pair).

Breakpoints follow Tailwind: phones are single-column, with supporting plates offset to the right. Tablets (sm/md) rebalance to two columns. Desktop (lg, 1024px and up) enables the full spreads, parallax drift and the pinned horizontal sequence. Mobile never pins: the horizontal sequence becomes a native swipe row with snap points.

### Named Rules
**The One Sideways Rule.** Only Featured Pieces moves horizontally, and only on desktop with motion allowed.

## Elevation & Depth

Flat. No shadows anywhere. Depth comes from overlap (the hero headline laid across the photograph's lower edge, the story's detail plate overlapping the portrait) and from scroll parallax. Overlays (menu, search, bag, lightbox) are native dialogs on an ivory panel over a 35% ink scrim.

## Shapes

Square everywhere: photographs, buttons, inputs, size options. The only round element is the desktop cursor dot. Rules are 1px hairlines in sand or ink at 15–40% opacity.

## Components

### Buttons
- **Solid** (Add to bag, Checkout): ink fill, ivory label type, full width, 16px vertical padding, square. Disabled at 60% opacity with an explanation underneath.
- **Text controls** (Search, Bag, Close, Remove): label type with the animated underline (`link-line`): a 1px rule that draws in from the left on hover, focus and for the current page.

### Calls to action
- **Arrow link** (`ArrowLink`): label type, a 1px rule under the whole link that darkens on hover, and a Lucide arrow at stroke 1.25 that travels 6px right. Ivory variant on photographs.

### Inputs / Fields
- **Underline field** (newsletter, search): no box, a single rule that darkens on focus; label above in label type; status line below with `aria-live`; errors in `#8a3b2e`.
- **Size options**: 44px square-cornered tiles in label type, sand border, ink border on hover, ink fill when selected.

### Navigation
Fixed header with three zones: section links on the left, the STUDIO BABUI wordmark centred in tracked Bodoni capitals, Search and Bag on the right. It is transparent at the top and gains an ivory panel with a sand hairline after 40px. It slides away while you read downward and returns on the way up. On mobile, the wordmark moves left and a full-screen menu sets its links in oversized Bodoni.

### Product plate (signature)
A photograph in a fixed aspect ratio over sand, then one row with the name in Bodoni and the price in tabular numerals, then category and colour in label type. No border, no card, no badge. On hover the photograph scales to 1.04 over 1.4s and the name nudges right.

## Do's and Don'ts

### Do:
- **Do** let one photograph lead each spread, and give it the most space.
- **Do** put metadata in the margins and captions (label type, graphite), never stacked above a headline.
- **Do** reveal photographs with the clip-path wipe and display type with masked lines, using `withMotion` and the presets in `src/lib/animations.ts`.
- **Do** keep content visible by default; animations only start from hidden once GSAP has taken over.
- **Do** label sample data as sample, and say plainly when something isn't connected yet.

### Don't:
- **Don't** use cards, shadows, rounded corners, gradients or glass.
- **Don't** put a kicker or eyebrow label above a heading.
- **Don't** use stone for text under 18px on ivory.
- **Don't** add a second horizontal or pinned sequence.
- **Don't** invent brand history, artisan, manufacturing or sustainability claims.
