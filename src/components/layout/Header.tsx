"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/animations";
import { onIntroDone } from "@/lib/intro";
import { primaryNav } from "@/data/site";
import { useBag } from "@/hooks/useBag";
import { usePanel } from "./Providers";
import { cn } from "@/lib/utils";

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { open, panel } = usePanel();
  const { count } = useBag();

  useGSAP(
    () => {
      const header = ref.current;
      if (!header) return;

      // Background appears once the page has moved; the bar slides away while
      // reading downward and returns on the way back up.
      const st = ScrollTrigger.create({
        start: "top -40",
        end: "max",
        onToggle: (self) => header.toggleAttribute("data-scrolled", self.isActive),
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 480;
          header.toggleAttribute("data-hidden", hide);
        },
      });

      let unsubscribe = () => {};
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const items = header.querySelectorAll("[data-nav-item]");
        gsap.set(items, { opacity: 0, y: -8 });
        unsubscribe = onIntroDone(() => {
          gsap.to(items, { opacity: 1, y: 0, duration: 1, ease: EASE.reveal, stagger: 0.05, delay: 0.5 });
        });
      }
      return () => {
        st.kill();
        unsubscribe();
      };
    },
    { scope: ref },
  );

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const bagLabel = count > 0 ? `Bag (${count})` : "Bag";

  return (
    <header
      ref={ref}
      className={cn(
        "group/header gutter fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,transform] duration-700 ease-[var(--ease-reveal)]",
        "border-b border-transparent data-[scrolled]:border-sand data-[scrolled]:bg-ivory/95",
        "data-[hidden]:-translate-y-full",
        panel === "menu" && "!translate-y-0",
      )}
    >
      <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-20">
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex gap-8">
            {primaryNav.map((item) => (
              <li key={item.href} data-nav-item>
                <Link
                  href={item.href}
                  className="label link-line"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/"
          data-nav-item
          className="display col-start-1 justify-self-start text-[1.0625rem] uppercase tracking-[0.22em] lg:col-start-2 lg:justify-self-center lg:text-[1.25rem]"
          aria-label="Studio Babui, home"
        >
          Studio Babui
        </Link>

        <div className="col-start-3 flex items-center justify-end gap-6 lg:gap-8">
          <button type="button" data-nav-item className="label link-line hidden lg:inline" onClick={() => open("search")}>
            Search
          </button>
          <button
            type="button"
            data-nav-item
            className="label link-line"
            onClick={() => open("bag")}
            aria-label={count > 0 ? `Bag, ${count} item${count === 1 ? "" : "s"}` : "Bag, empty"}
          >
            {bagLabel}
          </button>
          <button
            type="button"
            data-nav-item
            className="label link-line lg:hidden"
            aria-haspopup="dialog"
            aria-expanded={panel === "menu"}
            onClick={() => open("menu")}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
