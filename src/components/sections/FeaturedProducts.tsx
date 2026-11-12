import { products } from "@/data/products";
import { HorizontalGallery } from "@/components/animations/HorizontalGallery";
import { ProductFigure } from "@/components/shop/ProductFigure";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { pad } from "@/lib/utils";

/** Varied plate sizes and drops so the row reads like a contact sheet, not a shelf. */
const PLATES = [
  { ratio: "3 / 4", width: "w-[72vw] sm:w-[42vw] lg:w-[24vw]", drop: "lg:mt-0" },
  { ratio: "4 / 5", width: "w-[64vw] sm:w-[36vw] lg:w-[19vw]", drop: "lg:mt-[14vh]" },
  { ratio: "2 / 3", width: "w-[72vw] sm:w-[40vw] lg:w-[22vw]", drop: "lg:mt-[4vh]" },
  { ratio: "4 / 5", width: "w-[68vw] sm:w-[38vw] lg:w-[26vw]", drop: "lg:mt-[18vh]" },
];

export function FeaturedProducts() {
  return (
    <HorizontalGallery
      labelledBy="featured-title"
      className="border-y border-sand lg:h-svh"
      trackClassName="items-start gap-[clamp(1.25rem,3vw,4rem)] gutter py-16 lg:h-svh lg:items-center lg:py-0"
    >
      <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-between sm:w-[46vw] lg:h-[72vh] lg:w-[28vw]">
        <div>
          <h2 id="featured-title" className="display text-title">
            Featured
            <br />
            <span className="italic">pieces</span>
          </h2>
          <p className="mt-6 max-w-[30ch] text-small text-graphite">
            A short edit from across the collections. Sample pieces for now; prices in rupees.
          </p>
        </div>
        <div className="mt-10 flex items-end justify-between gap-6 lg:mt-0">
          <p className="display hidden text-lede tabular-nums lg:block" aria-hidden="true">
            <span data-h-current>01</span>
            <span className="text-stone"> / {pad(products.length)}</span>
          </p>
          <ArrowLink href="/shop">View all pieces</ArrowLink>
        </div>
      </div>

      {products.map((product, i) => {
        const plate = PLATES[i % PLATES.length];
        return (
          <div key={product.slug} data-h-item className={`shrink-0 snap-start ${plate.width} ${plate.drop}`}>
            <ProductFigure product={product} ratio={plate.ratio} sizes="(min-width: 1024px) 26vw, 72vw" />
          </div>
        );
      })}
      <div aria-hidden="true" className="w-px shrink-0 lg:w-[6vw]" />
    </HorizontalGallery>
  );
}
