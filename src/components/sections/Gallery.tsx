"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGSAP } from "@/lib/gsap";
import { revealImage, withMotion } from "@/lib/animations";
import { galleryPlates } from "@/data/campaigns";
import { Sheet } from "@/components/ui/Sheet";
import { TextReveal } from "@/components/animations/TextReveal";
import { pad } from "@/lib/utils";

/** Magazine-spread placements for nine plates: uneven widths, drops and air. */
const PLACEMENT = [
  "col-span-7 lg:col-span-4 lg:col-start-1",
  "col-span-5 self-end lg:col-span-4 lg:col-start-6 lg:self-start lg:mt-[22vh]",
  "col-span-6 col-start-4 lg:col-span-2 lg:col-start-11 lg:mt-[8vh]",
  "col-span-6 lg:col-span-3 lg:col-start-2 lg:mt-[10vh]",
  "col-span-6 self-end lg:col-span-5 lg:col-start-7 lg:mt-[10vh] lg:self-start",
  "col-span-8 col-start-3 lg:col-span-3 lg:col-start-1 lg:mt-[12vh]",
  "col-span-5 lg:col-span-3 lg:col-start-5 lg:mt-[28vh]",
  "col-span-7 lg:col-span-3 lg:col-start-9 lg:mt-[4vh]",
  "col-span-9 col-start-4 lg:col-span-4 lg:col-start-4 lg:mt-[6vh]",
];

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const total = galleryPlates.length;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = withMotion(() => {
        el.querySelectorAll<HTMLElement>("[data-plate]").forEach((plate, i) => {
          revealImage(plate, plate.querySelector("[data-zoom]"), { from: i % 2 ? "top" : "bottom", start: "top 90%" });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + total) % total),
    [total],
  );
  const plate = galleryPlates[active];

  return (
    <section ref={root} aria-labelledby="gallery-title" className="gutter pb-[clamp(6rem,12vw,11rem)]">
      <div className="editorial-grid mb-16 items-end gap-y-4 lg:mb-24">
        <TextReveal as="h2" id="gallery-title" className="display text-display col-span-12 lg:col-span-7">
          Seen &amp; kept
        </TextReveal>
        <p className="col-span-12 max-w-[34ch] text-small text-graphite lg:col-span-3 lg:col-start-10">
          Pictures we keep coming back to. Select any plate to see it larger.
        </p>
      </div>

      <ul className="editorial-grid gap-y-10 lg:gap-y-0">
        {galleryPlates.map((item, i) => (
          <li key={item.src} className={PLACEMENT[i]}>
            <button
              type="button"
              data-cursor="View"
              className="group block w-full text-left"
              onClick={() => {
                setActive(i);
                setOpen(true);
              }}
              aria-label={`Open plate ${i + 1}: ${item.caption}`}
            >
              <span
                data-plate
                className="relative block overflow-hidden bg-sand"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <span data-zoom className="absolute inset-0 block">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 60vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-reveal)] group-hover:scale-[1.05]"
                  />
                </span>
              </span>
              <span className="mt-3 flex gap-3 text-graphite">
                <span className="label tabular-nums">{pad(i + 1)}</span>
                <span className="label">{item.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        from="fade"
        labelledBy="lightbox-caption"
        className="flex flex-col bg-ivory"
      >
        <div
          className="gutter flex h-full flex-col py-5"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          <div className="flex items-center justify-between">
            <p className="label tabular-nums">
              {pad(active + 1)} / {pad(total)}
            </p>
            <button type="button" className="label link-line" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <div className="relative my-6 flex-1">
            <Image key={plate.src} src={plate.src} alt={plate.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-between gap-6">
            <button type="button" className="label inline-flex items-center gap-2" onClick={() => step(-1)}>
              <ChevronLeft aria-hidden="true" strokeWidth={1.25} className="size-4" /> Previous
            </button>
            <p id="lightbox-caption" className="display text-center text-lede italic">
              {plate.caption}
            </p>
            <button type="button" className="label inline-flex items-center gap-2" onClick={() => step(1)}>
              Next <ChevronRight aria-hidden="true" strokeWidth={1.25} className="size-4" />
            </button>
          </div>
        </div>
      </Sheet>
    </section>
  );
}
