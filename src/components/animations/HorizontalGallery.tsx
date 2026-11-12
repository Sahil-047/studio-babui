"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { withMotion } from "@/lib/animations";
import { pad } from "@/lib/utils";
import { cn } from "@/lib/utils";

type HorizontalGalleryProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  labelledBy?: string;
};

/**
 * Desktop with motion: the section pins and its track glides sideways as the
 * page scrolls, updating any `[data-h-current]` counter inside it.
 * Mobile, tablet and reduced motion: a native swipeable row with snap points,
 * so nothing hijacks vertical scrolling.
 */
export function HorizontalGallery({ children, className, trackClassName, labelledBy }: HorizontalGalleryProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const viewport = section.querySelector<HTMLElement>("[data-h-viewport]");
      const track = section.querySelector<HTMLElement>("[data-h-track]");
      const counter = section.querySelector<HTMLElement>("[data-h-current]");
      if (!viewport || !track) return;
      const count = track.querySelectorAll("[data-h-item]").length;

      const mm = withMotion(({ isDesktop }) => {
        if (!isDesktop) return;
        gsap.set(viewport, { overflowX: "hidden", scrollSnapType: "none" });
        viewport.scrollLeft = 0;
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (counter) counter.textContent = pad(Math.min(count, Math.floor(self.progress * count) + 1));
            },
          },
        });
      }, { responsive: true });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby={labelledBy} className={cn("relative", className)}>
      <div
        data-h-viewport
        className="snap-x snap-mandatory scroll-px-[clamp(1rem,0.4rem+2.6vw,3rem)] overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div data-h-track className={cn("flex w-max", trackClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
}
