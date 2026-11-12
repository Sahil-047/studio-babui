import type { NavLink } from "@/types";

export const site = {
  name: "Studio Babui",
  description:
    "Studio Babui is a fashion studio making contemporary unisex clothing. Explore collections, featured pieces and editorial stories.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  currency: "INR",
  /**
   * PLACEHOLDERS: replace with the studio's real contact details and social
   * accounts. Social entries without a URL render as "coming soon" text, never
   * as a link to an account the studio may not own.
   */
  contact: {
    email: "hello@studiobabui.com",
    location: "India",
  },
  social: [
    { label: "Instagram", url: undefined },
    { label: "Pinterest", url: undefined },
  ] as { label: string; url?: string }[],
};

export const primaryNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Shipping & Returns", href: "/legal/shipping-returns" },
];
