"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, withMotion } from "@/lib/animations";
import { onIntroDone } from "@/lib/intro";
import { images } from "@/data/images";
import { ArrowLink } from "@/components/ui/ArrowLink";

const HEADLINE = ["Quiet forms,", "worn loud."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      const mm = withMotion(({ isDesktop }) => {
        // Entrance: held under the loader, played the moment it lifts.
        const intro = gsap.timeline({ paused: true, defaults: { ease: EASE.reveal } });
        intro
          .fromTo(q("[data-hero-frame]"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8 })
          .fromTo(q("[data-hero-photo]"), { scale: 1.28 }, { scale: 1, duration: 2.4 }, 0)
          .from(q("[data-hero-line]"), { yPercent: 112, duration: 1.4, stagger: 0.12 }, 0.35)
          .fromTo(
            q("[data-hero-detail]"),
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 },
            0.6,
          )
          .from(q("[data-hero-meta]"), { opacity: 0, y: 16, duration: 1, stagger: 0.08 }, 0.8);
        const unsubscribe = onIntroDone(() => intro.play());

        // Exit: the photograph drifts and closes from below as the hero leaves.
        if (isDesktop) {
          const exit = { trigger: el, start: "top top", end: "bottom top", scrub: true } as const;
          gsap.to(q("[data-hero-photo-wrap]"), { yPercent: 12, ease: "none", scrollTrigger: exit });
          // Explicit start: a plain .to() would record the frame's hidden pre-intro
          // clip as its start, so scrolling back to the top re-hid the photograph.
          // immediateRender: false leaves the intro's hidden state alone until scrolled.
          gsap.fromTo(
            q("[data-hero-frame]"),
            { clipPath: "inset(0% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 18% 0%)", ease: "none", immediateRender: false, scrollTrigger: exit },
          );
          gsap.to(q("[data-hero-headline]"), { xPercent: -8, ease: "none", scrollTrigger: exit });
        }
        return unsubscribe;
      }, { responsive: true });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="gutter relative pt-20 lg:min-h-svh lg:pt-24">
      <div className="editorial-grid relative lg:h-[calc(100svh-7rem)]">
        {/* Campaign marginalia */}
        <div className="col-span-12 mb-5 flex items-baseline justify-between lg:col-span-3 lg:mb-0 lg:flex-col lg:justify-start lg:gap-1 lg:pt-2">
          <p data-hero-meta className="label">Collection I</p>
          <p data-hero-meta className="label text-graphite">The New Edit — Look 01</p>
        </div>

        {/* Campaign photograph */}
        <div
          data-hero-frame
          className="relative col-span-12 aspect-[4/5] overflow-hidden bg-sand max-lg:max-h-[78svh] max-lg:w-full lg:col-span-6 lg:col-start-4 lg:aspect-auto lg:h-full"
        >
          <div data-hero-photo-wrap className="absolute inset-0">
            <div data-hero-photo className="relative h-full w-full">
              <Image
                src={images.heroArch.src}
                alt={images.heroArch.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: images.heroArch.position }}
              />
            </div>
          </div>
        </div>

        {/* Right column: detail plate and the way in */}
        <div className="col-span-12 mt-8 flex flex-col justify-between max-lg:row-start-4 lg:col-span-3 lg:col-start-10 lg:mt-0">
          <figure className="hidden lg:block lg:w-2/3 lg:self-end">
            <div data-hero-detail className="relative aspect-[2/3] overflow-hidden bg-sand">
              <Image
                src={images.heroSleeve.src}
                alt={images.heroSleeve.alt}
                fill
                sizes="15vw"
                className="object-cover"
                style={{ objectPosition: images.heroSleeve.position }}
              />
            </div>
            <figcaption data-hero-meta className="label mt-3 text-graphite">
              Detail, ivory cotton
            </figcaption>
          </figure>

          <div className="lg:pb-2">
            <p data-hero-meta className="max-w-[30ch] text-small text-graphite">
              Unisex clothing from Studio Babui. Simple cuts, considered colour, made to be worn your way.
            </p>
            <div data-hero-meta className="mt-6">
              <ArrowLink href="/collections/the-new-edit" cursor="Explore">
                Explore the collection
              </ArrowLink>
            </div>
          </div>
        </div>

        {/* Headline, laid across the photograph's lower edge */}
        <h1
          id="hero-title"
          data-hero-headline
          className="display text-display relative z-10 col-span-12 row-start-3 -mt-[0.5em] lg:pointer-events-none lg:absolute lg:bottom-[6%] lg:left-0 lg:mt-0"
        >
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.16em] -mb-[0.12em]">
              <span data-hero-line className={i === 1 ? "block pl-[0.9em] italic" : "block"}>
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
