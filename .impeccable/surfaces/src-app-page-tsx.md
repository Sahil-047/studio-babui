---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/shop/page.tsx","src/app/collections/page.tsx","src/app/about/page.tsx"]
---

# Surface: Studio Babui homepage (and shop/collections/about routes)

Mode: Persuade (visitor decides the label is theirs, then explores a collection or a piece).
Audience: people browsing contemporary unisex Indian clothing on phone and desktop.
Action: explore a collection; open a piece; add to bag (browser-only bag).
Proof/content: stand-in editorial photography (to be replaced), sample products in INR.
Constraints: brief-pinned palette, fonts, section list, GSAP + ScrollTrigger; no invented brand history or sustainability/artisan claims.

## Direction contract

THESIS: The site is an issue of a fashion publication, not a shop template: each scroll is a spread, photographs placed off-centre on a calm ivory field, type as the second image. It refuses the centred hero over a row of equal product cards.

OWN-WORLD: Ivory #F5F2EC field, ink #22211F, stone #77736C captions, sand #E9E2D7 plates behind images, umber #9B8975 accent used only for rules and active states. Bodoni Moda display at oversized scale with tight tracking, DM Sans 11–12px tracked capitals for navigation and captions. Hairline rules, square corners, no shadows, no cards. Images masked in and out with clip-path insets.

STORY: The visitor meets one campaign image and one sentence, reads the studio's statement, walks four collections set like magazine spreads, scrolls sideways through featured pieces, stops at a full-bleed campaign, reads the studio note, browses a loose gallery spread, and signs up for letters.

FIRST VIEWPORT: Left two-thirds: a tall campaign photograph inset from the top-right edge, revealed by a clip-path wipe. The wordmark-sized headline "Quiet forms, / worn loud." in Bodoni overlaps the photo's lower-left edge, half on ivory, half on image. Tiny campaign metadata (season, look count, photographer credit placeholder) set as marginalia in the right column with a second small detail image. "Explore the collection" CTA under the headline on the ivory side, with an arrow that travels on hover. Header transparent over the field.

FORM: Brief-pinned ViV-led minimal editorial world with 11.11-style campaign storytelling and Möbius-style motion. seed: none (pinned) — "The primary aesthetic must be ViV-inspired minimal editorial design. 11.11 should influence the fashion storytelling. Möbius should influence the motion and interaction design."
Signature interaction: the pinned horizontal Featured Pieces sequence on desktop, where products glide past at mixed ratios while a running index counts the pieces; motion grammar: clip-path inset reveals with expo-out, masked line reveals for type, slow parallax drift on photographs.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
