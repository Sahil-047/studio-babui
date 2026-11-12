# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript (strict) + Tailwind CSS + GSAP with ScrollTrigger, Lucide React icons, next/image. Pinned by the user's brief.

## Users

Visitors discovering Studio Babui, a fashion boutique: people browsing contemporary clothing on phone and desktop, deciding whether the label's point of view is theirs, then exploring collections and individual pieces.

## Product Purpose

The website is the boutique's editorial storefront: it introduces Studio Babui's point of view, presents collections and featured pieces, and lets a visitor browse products, pick a size, and keep a bag. Success is a visitor who understands the label's sensibility within the first screen and goes on to explore a collection or a product.

## Positioning

An independent fashion studio presented like a fashion publication rather than a catalogue: photography, typography and whitespace carry the brand.

## Capabilities and Constraints

- Offering: unisex contemporary Indian clothing (confirmed by the user).
- Prices are shown in Indian rupees (INR, ₹).
- Bag: browser-only. Items persist in the visitor's browser; checkout is not connected yet and must say so.
- Newsletter: sign-up form with validation and states; the provider integration is not connected yet (API route is the integration point).
- Undecided: real product catalogue, prices, sizes, contact details, social handles, legal policy text.

## Brand Commitments

- Name: STUDIO BABUI (wordmark set in capitals).
- Newsletter voice given by the user: "Letters from Babui." / "Stories, collections and occasional notes from our world."
- Do not invent brand history, artisan partnerships, manufacturing claims or sustainability claims.

## Evidence on Hand

- No real photography yet. The build uses licensed stand-in photographs (Unsplash licence) under `public/images/`, each listed in `public/images/CREDITS.md`, to be replaced by Studio Babui shoots.
- No real product data yet. All products, prices and collection descriptions in `src/data/` are samples, labelled as such in code, to be replaced.
- No real contact details, social accounts or legal policies yet; placeholders live in `src/data/site.ts` and are marked for replacement.

## Product Principles

1. The photograph leads; interface recedes.
2. Say less, truthfully: no claims the studio has not made.
3. Every control works or says plainly that it is not connected yet.
4. Mobile is a first-class edition, not a shrunken desktop.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard-operable navigation, menu, bag and forms; visible focus; descriptive alt text; prefers-reduced-motion honoured across all GSAP motion.
