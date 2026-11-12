"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/animations";
import { markIntroDone } from "@/lib/intro";

const WORD = "STUDIO BABUI";

/**
 * A short branded entrance on a hard load. The page renders underneath it from
 * the first byte, so content is never held back; the hero's own entrance waits
 * for this timeline's onComplete rather than a timer.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const finish = () => {
        el.style.display = "none";
        markIntroDone();
      };
      // The no-JS failsafe animation is not needed once GSAP is in charge.
      el.style.animation = "none";

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(el, { opacity: 0, duration: 0.3, delay: 0.2, onComplete: finish });
        return;
      }

      const tl = gsap.timeline({ onComplete: finish });
      tl.from("[data-letter]", {
        yPercent: 105,
        duration: 0.9,
        ease: EASE.reveal,
        stagger: 0.035,
      })
        .fromTo(
          "[data-bar]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power2.inOut", transformOrigin: "left center" },
          0.1,
        )
        .to("[data-letter]", { yPercent: -105, duration: 0.6, ease: "power3.in", stagger: 0.02 }, ">-0.05")
        .to("[data-bar]", { scaleX: 0, transformOrigin: "right center", duration: 0.5, ease: "power3.in" }, "<")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, "-=0.25");
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="loader fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ivory"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden="true"
    >
      <p className="display flex overflow-hidden text-[clamp(2.25rem,6vw,5rem)] leading-none tracking-[0.02em]">
        {WORD.split("").map((ch, i) => (
          <span key={i} data-letter className="inline-block whitespace-pre">
            {ch}
          </span>
        ))}
      </p>
      <span className="mt-8 block h-px w-[min(14rem,50vw)] bg-sand">
        <span data-bar className="block h-full w-full origin-left bg-ink" />
      </span>
    </div>
  );
}
