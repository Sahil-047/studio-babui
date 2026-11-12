"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { withMotion } from "@/lib/animations";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  image: ImageAsset;
  sizes: string;
  className?: string;
  /** Overlay content (copy, links) laid over the photograph. */
  children?: ReactNode;
};

/**
 * Full-bleed photograph that opens from an inset window to the full frame as
 * it scrolls in, while the picture drifts more slowly than the page.
 * Mobile keeps only the drift; reduced motion keeps neither.
 */
export function ParallaxImage({ image, sizes, className, children }: ParallaxImageProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const frame = el.querySelector("[data-frame]");
      const media = el.querySelector("[data-media]");
      const mm = withMotion(({ isDesktop }) => {
        if (isDesktop) {
          gsap.fromTo(
            frame,
            { clipPath: "inset(10% 14% 10% 14%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "top 15%", scrub: 0.6 },
            },
          );
        }
        gsap.fromTo(
          media,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }, { responsive: true });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn("relative", className)}>
      <div data-frame className="absolute inset-0 overflow-hidden bg-sand">
        <div data-media className="absolute inset-x-0 -inset-y-[10%]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: image.position ?? "50% 50%" }}
          />
        </div>
        <div className="absolute inset-0 bg-ink/30" aria-hidden="true" />
      </div>
      <div className="relative h-full">{children}</div>
    </div>
  );
}
