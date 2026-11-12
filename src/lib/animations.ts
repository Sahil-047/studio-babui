"use client";

import { gsap, ScrollTrigger, SplitText } from "./gsap";

/**
 * The site's motion grammar, in one place.
 * Clip-path inset reveals with expo-out, masked line reveals for type,
 * slow parallax drift on photographs. Nothing else.
 */
export const EASE = {
  reveal: "expo.out",
  move: "power3.inOut",
  drift: "none",
} as const;

export const DURATION = {
  reveal: 1.4,
  text: 1.1,
  quick: 0.6,
} as const;

export const MEDIA = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

type MotionConditions = { isDesktop: boolean };

/**
 * Runs `setup` only when the visitor allows motion. With `responsive`, it is
 * also rebuilt when the desktop breakpoint flips; leave that off for anything
 * that looks the same at every width, so a resize doesn't tear down and
 * rebuild every trigger on the page at once.
 * Returns the matchMedia so callers can revert it.
 */
export function withMotion(
  setup: (c: MotionConditions) => void | (() => void),
  { responsive = false }: { responsive?: boolean } = {},
): gsap.MatchMedia {
  const mm = gsap.matchMedia();
  if (!responsive) {
    mm.add(MEDIA.motion, () => setup({ isDesktop: false }));
    return mm;
  }
  mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktop }, (ctx) => {
    const conditions = ctx.conditions as { motion: boolean; desktop: boolean };
    if (!conditions.motion) return;
    return setup({ isDesktop: conditions.desktop });
  });
  return mm;
}

export type Edge = "top" | "bottom" | "left" | "right";

const HIDDEN_INSET: Record<Edge, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

const SHOWN_INSET = "inset(0% 0% 0% 0%)";

type RevealOptions = {
  from?: Edge;
  delay?: number;
  /** Attach to a ScrollTrigger; false returns a paused-ready tween for timelines. */
  scroll?: boolean;
  start?: string;
};

/** Clip-path wipe of a frame, with the photograph settling from a slight zoom. */
export function revealImage(frame: Element, media: Element | null, opts: RevealOptions = {}): gsap.core.Timeline {
  const { from = "bottom", delay = 0, scroll = true, start = "top 85%" } = opts;
  const tl = gsap.timeline({
    delay,
    scrollTrigger: scroll ? { trigger: frame, start, once: true } : undefined,
  });
  tl.fromTo(
    frame,
    { clipPath: HIDDEN_INSET[from] },
    { clipPath: SHOWN_INSET, duration: DURATION.reveal, ease: EASE.reveal },
  );
  if (media) {
    tl.fromTo(media, { scale: 1.18 }, { scale: 1, duration: DURATION.reveal + 0.4, ease: EASE.reveal }, 0);
  }
  return tl;
}

type LineOptions = {
  delay?: number;
  stagger?: number;
  scroll?: boolean;
  start?: string;
  onReady?: (lines: Element[]) => void;
};

/**
 * Masked line-by-line reveal. SplitText keeps an aria-label on the element so
 * screen readers hear the sentence once, and autoSplit re-splits on resize or
 * font load, re-creating the animation each time.
 */
export function revealLines(el: HTMLElement, opts: LineOptions = {}): SplitText {
  const { delay = 0, stagger = 0.09, scroll = true, start = "top 88%" } = opts;
  return SplitText.create(el, {
    type: "lines",
    mask: "lines",
    linesClass: "split-line",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 110,
        duration: DURATION.text,
        ease: EASE.reveal,
        stagger,
        delay,
        scrollTrigger: scroll ? { trigger: el, start, once: true } : undefined,
      });
    },
  });
}

/** Slow vertical drift tied to scroll, for photographs inside an overflow-hidden frame. */
export function drift(media: Element, trigger: Element, amount = 10): gsap.core.Tween {
  return gsap.fromTo(
    media,
    { yPercent: -amount / 2 },
    {
      yPercent: amount / 2,
      ease: EASE.drift,
      scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}

/** Staggered rise for small groups (captions, metadata, links). */
export function riseIn(targets: Element[] | NodeListOf<Element>, trigger: Element | null, delay = 0): gsap.core.Tween {
  return gsap.from(targets, {
    y: 24,
    opacity: 0,
    duration: DURATION.quick + 0.4,
    ease: EASE.reveal,
    stagger: 0.08,
    delay,
    scrollTrigger: trigger ? { trigger, start: "top 88%", once: true } : undefined,
  });
}

export function refreshScroll(): void {
  ScrollTrigger.refresh();
}
