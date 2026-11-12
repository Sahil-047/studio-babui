"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@/lib/gsap";
import { revealLines, withMotion } from "@/lib/animations";

type TextRevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
  stagger?: number;
  id?: string;
};

/** Masked line-by-line reveal on scroll. Plain, readable text without JS or with reduced motion. */
export function TextReveal({ as: Tag = "p", className, children, delay, stagger, id }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = withMotion(() => {
        const split = revealLines(el, { delay, stagger });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
