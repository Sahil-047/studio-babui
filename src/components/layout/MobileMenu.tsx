"use client";

import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/animations";
import { primaryNav, site } from "@/data/site";
import { Sheet } from "@/components/ui/Sheet";
import { usePanel } from "./Providers";

export function MobileMenu() {
  const { panel, close, open } = usePanel();

  return (
    <Sheet
      open={panel === "menu"}
      onClose={close}
      from="fade"
      labelledBy="menu-title"
      className="gutter flex flex-col pb-8"
      onEntered={(el) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.from(el.querySelectorAll("[data-menu-link]"), {
          yPercent: 110,
          duration: 1,
          ease: EASE.reveal,
          stagger: 0.07,
        });
        gsap.from(el.querySelectorAll("[data-menu-meta]"), { opacity: 0, y: 12, duration: 0.8, delay: 0.25, stagger: 0.05 });
      }}
    >
      <div className="flex h-16 items-center justify-between">
        <h2 id="menu-title" className="display text-[1.0625rem] uppercase tracking-[0.22em]">
          Studio Babui
        </h2>
        <button type="button" className="label link-line" onClick={close}>
          Close
        </button>
      </div>

      <nav aria-label="Menu" className="mt-[12vh] flex-1">
        <ul className="space-y-2">
          {[{ label: "Home", href: "/" }, ...primaryNav].map((item) => (
            <li key={item.href} className="overflow-hidden">
              <Link
                href={item.href}
                data-menu-link
                onClick={close}
                className="display block text-[clamp(3rem,15vw,5.5rem)] leading-[1.02]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-2 gap-y-3 border-t border-sand pt-6">
        <button type="button" data-menu-meta className="label text-left" onClick={() => open("search")}>
          Search
        </button>
        <button type="button" data-menu-meta className="label text-left" onClick={() => open("bag")}>
          Bag
        </button>
        <a data-menu-meta className="label col-span-2 text-graphite" href={`mailto:${site.contact.email}`}>
          {site.contact.email}
        </a>
      </div>
    </Sheet>
  );
}
