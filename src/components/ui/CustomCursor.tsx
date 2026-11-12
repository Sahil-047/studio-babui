"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/animations";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Desktop-only companion to the system cursor (which stays visible): a small
 * ink dot that trails the pointer and opens into a label such as VIEW or
 * EXPLORE over elements carrying `data-cursor`. Not rendered on touch devices
 * or with reduced motion.
 */
export function CustomCursor() {
  const enabled = useMediaQuery(`${MEDIA.finePointer} and ${MEDIA.motion}`, false);
  if (!enabled) return null;
  return <CursorDot />;
}

function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const dot = ref.current;
      if (!dot) return;
      const label = dot.querySelector<HTMLElement>("[data-cursor-label]");
      gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0 });
      const xTo = gsap.quickTo(dot, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(dot, "y", { duration: 0.45, ease: "power3.out" });
      let current: string | null = null;
      let visible = false;

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        xTo(e.clientX);
        yTo(e.clientY);
        if (!visible) {
          visible = true;
          gsap.set(dot, { x: e.clientX, y: e.clientY });
          gsap.to(dot, { scale: 1, duration: 0.4 });
        }
        const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
        const next = target?.dataset.cursor ?? null;
        if (next === current) return;
        current = next;
        if (label) label.textContent = next ?? "";
        gsap.to(dot, {
          width: next ? 84 : 10,
          height: next ? 84 : 10,
          duration: 0.5,
          ease: "expo.out",
        });
        gsap.to(label, { opacity: next ? 1 : 0, duration: 0.25 });
      };
      const onLeave = () => {
        visible = false;
        gsap.to(dot, { scale: 0, duration: 0.3 });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] flex size-2.5 items-center justify-center rounded-full bg-ink text-ivory"
    >
      <span data-cursor-label className="label text-[0.625rem] opacity-0" />
    </div>
  );
}
