"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { drift, revealImage, withMotion, type Edge } from "@/lib/animations";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  image: ImageAsset;
  sizes: string;
  /** CSS aspect-ratio for the frame, e.g. "4 / 5". Defaults to the photo's own ratio. */
  ratio?: string;
  from?: Edge;
  delay?: number;
  /** Scroll drift amount in percent; 0 disables. Desktop only. */
  parallax?: number;
  priority?: boolean;
  className?: string;
  /** Scales the photograph slightly when an ancestor `.group` is hovered. */
  hoverZoom?: boolean;
};

/**
 * A photograph in a frame that wipes open with clip-path when it enters the
 * viewport, settling from a slight zoom; optional slow drift while scrolling.
 * The frame reserves its aspect ratio, so nothing shifts while images load.
 */
export function ImageReveal({
  image,
  sizes,
  ratio,
  from = "bottom",
  delay = 0,
  parallax = 0,
  priority = false,
  className,
  hoverZoom = false,
}: ImageRevealProps) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = frame.current;
      if (!el) return;
      const media = el.querySelector("[data-media]");
      const mm = withMotion(({ isDesktop }) => {
        revealImage(el, media?.firstElementChild ?? null, { from, delay });
        if (parallax && isDesktop && media) drift(media, el, parallax);
      }, { responsive: parallax > 0 });
      return () => mm.revert();
    },
    { scope: frame },
  );

  return (
    <div
      ref={frame}
      className={cn("relative overflow-hidden bg-sand", className)}
      style={{ aspectRatio: ratio ?? `${image.width} / ${image.height}` }}
    >
      <div data-media className={parallax ? "absolute inset-x-0 -inset-y-[8%]" : "absolute inset-0"}>
        <div className="relative h-full w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover",
              hoverZoom && "transition-transform duration-[1.4s] ease-[var(--ease-reveal)] group-hover:scale-[1.04]",
            )}
            style={{ objectPosition: image.position ?? "50% 50%" }}
          />
        </div>
      </div>
    </div>
  );
}
