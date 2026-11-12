"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, DURATION, withMotion } from "@/lib/animations";
import { images } from "@/data/images";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";

/** Each line sits at its own indent and drifts its own way while the section scrolls past. */
const LINES = [
  { text: "Fashion is an", indent: "pl-0", shift: -4 },
  { text: "expression of", indent: "pl-[0.7em] sm:pl-[1.6em] lg:pl-[2.4em]", shift: 5 },
  { text: "individuality.", indent: "pl-[0.5em] lg:pl-[0.8em]", shift: -3, italic: true },
];

export function BrandStatement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const lines = gsap.utils.toArray<HTMLElement>("[data-statement-line]", el);
      const mm = withMotion(({ isDesktop }) => {
        gsap.from(lines, {
          yPercent: 112,
          duration: DURATION.text + 0.2,
          ease: EASE.reveal,
          stagger: 0.12,
          scrollTrigger: { trigger: el.querySelector("h2"), start: "top 80%", once: true },
        });
        if (!isDesktop) return;
        lines.forEach((line, i) => {
          gsap.fromTo(
            line.parentElement,
            { xPercent: -LINES[i].shift },
            {
              xPercent: LINES[i].shift,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      }, { responsive: true });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="statement-title"
      className="gutter overflow-x-clip py-[clamp(7rem,15vw,14rem)]"
    >
      <div className="editorial-grid gap-y-14">
        <h2 id="statement-title" className="display text-display col-span-12 lg:col-span-11 lg:col-start-2">
          {LINES.map((line) => (
            <span key={line.text} className={`block ${line.indent}`}>
              <span className="block overflow-hidden pb-[0.16em] -mb-[0.12em]">
                <span data-statement-line className={line.italic ? "block italic" : "block"}>
                  {line.text}
                </span>
              </span>
            </span>
          ))}
        </h2>

        <figure className="col-span-8 col-start-1 sm:col-span-6 lg:col-span-4 lg:col-start-2 lg:mt-10">
          <ImageReveal image={images.statementWall} sizes="(min-width: 1024px) 33vw, 66vw" ratio="3 / 2" from="left" />
          <figcaption className="label mt-3 text-graphite">Against the wall, in grey</figcaption>
        </figure>

        <Reveal className="col-span-11 col-start-2 sm:col-span-6 sm:col-start-7 lg:col-span-3 lg:col-start-9 lg:self-end">
          <p data-reveal className="text-lede display">
            We make clothes for people who dress for themselves first.
          </p>
          <p data-reveal className="mt-6 text-small text-graphite">
            Studio Babui designs unisex pieces that sit between the familiar and the new: easy shapes, honest colour,
            and room for whoever wears them to finish the thought.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
