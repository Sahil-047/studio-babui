"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@/lib/gsap";
import { riseIn, withMotion } from "@/lib/animations";

type RevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
};

/**
 * Staggers children marked `data-reveal` up into place when the block enters
 * the viewport (or the block itself when none are marked).
 */
export function Reveal({ as: Tag = "div", className, children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = withMotion(() => {
        const marked = el.querySelectorAll("[data-reveal]");
        riseIn(marked.length ? marked : [el], el, delay);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
