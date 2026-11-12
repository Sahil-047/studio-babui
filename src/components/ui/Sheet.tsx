"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  /** Where the panel enters from. */
  from: "right" | "top" | "fade";
  labelledBy: string;
  className?: string;
  children: ReactNode;
  /** Runs after the panel has entered (e.g. to stagger its contents). */
  onEntered?: (panel: HTMLElement) => void;
};

const OFFSET = {
  right: { xPercent: 100, yPercent: 0, opacity: 1 },
  top: { xPercent: 0, yPercent: -100, opacity: 1 },
  fade: { xPercent: 0, yPercent: 0, opacity: 0 },
} as const;

/**
 * Native <dialog> as the base for every overlay: it gives us focus trapping,
 * Escape handling, an inert page behind it and correct semantics for free.
 * GSAP only animates the entrance and exit around showModal()/close().
 */
export function Sheet({ open, onClose, from, labelledBy, className, children, onEntered }: SheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const dialog = dialogRef.current;
      const panel = panelRef.current;
      if (!dialog || !panel) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reduce ? 0.01 : 0.8;

      if (open && !dialog.open) {
        dialog.showModal();
        gsap.fromTo(dialog, { "--scrim": 0 }, { "--scrim": 1, duration: duration * 0.6, ease: "power2.out" });
        gsap.fromTo(panel, OFFSET[from], {
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          duration,
          ease: EASE.reveal,
          onComplete: () => onEntered?.(panel),
        });
      } else if (!open && dialog.open) {
        gsap.to(dialog, { "--scrim": 0, duration: duration * 0.5, ease: "power2.in" });
        gsap.to(panel, {
          ...OFFSET[from],
          duration: duration * 0.6,
          ease: "power3.in",
          onComplete: () => dialog.close(),
        });
      }
    },
    { dependencies: [open], scope: dialogRef },
  );

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      className={cn("sheet", `sheet--${from}`)}
      onCancel={(e) => {
        // Escape: let the exit animation run instead of closing instantly.
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // A click on the backdrop (the dialog itself, outside the panel) closes.
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div ref={panelRef} className={cn("sheet__panel", className)}>
        {children}
      </div>
    </dialog>
  );
}
