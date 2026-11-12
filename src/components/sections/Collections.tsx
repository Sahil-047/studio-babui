import Link from "next/link";
import { collections } from "@/data/collections";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { Collection, CollectionLayout } from "@/types";

type Slots = { lead: string; support: string; text: string; leadRatio: string; supportRatio: string };

/** Each collection is laid out as its own spread; mobile shares one single-column rhythm. */
const LAYOUTS: Record<CollectionLayout, Slots> = {
  "portrait-left": {
    lead: "lg:col-span-6 lg:col-start-1 lg:row-span-2",
    support: "lg:col-span-3 lg:col-start-9 lg:row-start-2 lg:self-end",
    text: "lg:col-span-4 lg:col-start-8 lg:row-start-1 lg:pt-6",
    leadRatio: "4 / 5",
    supportRatio: "4 / 5",
  },
  "landscape-wide": {
    lead: "lg:col-span-8 lg:col-start-5 lg:row-span-2",
    support: "lg:col-span-3 lg:col-start-1 lg:row-start-1",
    text: "lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:self-end",
    leadRatio: "3 / 2",
    supportRatio: "3 / 2",
  },
  "portrait-right": {
    lead: "lg:col-span-5 lg:col-start-7 lg:row-span-2",
    support: "lg:col-span-3 lg:col-start-2 lg:row-start-1",
    text: "lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-end",
    leadRatio: "2 / 3",
    supportRatio: "2 / 3",
  },
  "offset-pair": {
    lead: "lg:col-span-5 lg:col-start-2 lg:row-span-2",
    support: "lg:col-span-3 lg:col-start-9 lg:row-start-2 lg:self-end",
    text: "lg:col-span-4 lg:col-start-8 lg:row-start-1",
    leadRatio: "2 / 3",
    supportRatio: "2 / 3",
  },
};

function CollectionSpread({
  collection,
  position,
  titleTag,
}: {
  collection: Collection;
  position: number;
  titleTag: "h2" | "h3";
}) {
  const slots = LAYOUTS[collection.layout];
  const href = `/collections/${collection.slug}`;
  const titleId = `collection-${collection.slug}`;

  return (
    <article aria-labelledby={titleId} className="editorial-grid gap-y-8 lg:gap-y-10">
      <Link
        href={href}
        data-cursor="View"
        className={`group col-span-12 block ${slots.lead}`}
        aria-label={`${collection.title}: view the collection`}
        tabIndex={-1}
      >
        <ImageReveal
          image={collection.lead}
          ratio={slots.leadRatio}
          sizes="(min-width: 1024px) 50vw, 100vw"
          from={position % 2 === 0 ? "bottom" : "top"}
          parallax={6}
          hoverZoom
        />
      </Link>

      <div className={`col-span-12 ${slots.text}`}>
        <Reveal className="flex items-baseline justify-between gap-6 border-t border-ink/15 pt-4">
          <span data-reveal className="display text-lede text-umber">
            {collection.index}
          </span>
          <span data-reveal className="label text-graphite">
            {collection.productSlugs.length} pieces
          </span>
        </Reveal>
        <TextReveal as={titleTag} id={titleId} className="display text-title mt-6">
          <Link href={href} className="transition-colors duration-500 hover:text-umber">
            {collection.title}
          </Link>
        </TextReveal>
        <Reveal>
          <p data-reveal className="mt-5 max-w-[34ch] text-small text-graphite">
            {collection.summary}
          </p>
          <div data-reveal className="mt-7">
            <ArrowLink href={href}>Explore</ArrowLink>
          </div>
        </Reveal>
      </div>

      <div className={`col-span-7 col-start-6 sm:col-span-5 sm:col-start-8 ${slots.support}`}>
        <ImageReveal
          image={collection.support}
          ratio={slots.supportRatio}
          sizes="(min-width: 1024px) 25vw, 50vw"
          from={position % 2 === 0 ? "right" : "left"}
          delay={0.15}
        />
      </div>
    </article>
  );
}

export function Collections({ titleAs = "h2" }: { titleAs?: "h1" | "h2" }) {
  return (
    <section
      aria-labelledby="collections-title"
      className={titleAs === "h1" ? "gutter pb-[clamp(6rem,12vw,11rem)] pt-32 lg:pt-44" : "gutter pb-[clamp(6rem,12vw,11rem)]"}
    >
      <div className="editorial-grid mb-[clamp(4rem,9vw,8rem)] items-end gap-y-6">
        <TextReveal as={titleAs} id="collections-title" className="display text-display col-span-12 lg:col-span-8">
          Collections
        </TextReveal>
        <p className="col-span-12 max-w-[36ch] text-small text-graphite lg:col-span-3 lg:col-start-10">
          Four ways into the studio&rsquo;s wardrobe, each with its own pace and palette.
        </p>
      </div>

      <div className="space-y-[clamp(6rem,14vw,13rem)]">
        {collections.map((collection, i) => (
          <CollectionSpread
            key={collection.slug}
            collection={collection}
            position={i}
            titleTag={titleAs === "h1" ? "h2" : "h3"}
          />
        ))}
      </div>
    </section>
  );
}
