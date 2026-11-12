"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/animations";

/**
 * Mounted by app/template.tsx, which re-mounts on every navigation: each new
 * page rises in softly, and ScrollTrigger re-measures once it has settled.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: EASE.reveal,
        clearProps: "transform,opacity",
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
