import { ProductFigure } from "./ProductFigure";
import { Reveal } from "@/components/animations/Reveal";
import type { Product } from "@/types";

/**
 * An uneven editorial grid for product lists: alternating widths and drops,
 * collapsing to two columns on tablet and one on small phones.
 */
const SLOTS = [
  { col: "lg:col-span-5", ratio: "4 / 5" },
  { col: "lg:col-span-4 lg:col-start-7 lg:mt-[16vh]", ratio: "3 / 4" },
  { col: "lg:col-span-3 lg:col-start-2", ratio: "2 / 3" },
  { col: "lg:col-span-4 lg:col-start-6 lg:mt-[10vh]", ratio: "4 / 5" },
  { col: "lg:col-span-3 lg:col-start-10 lg:mt-[24vh]", ratio: "3 / 4" },
  { col: "lg:col-span-5 lg:col-start-1 lg:mt-[6vh]", ratio: "3 / 4" },
  { col: "lg:col-span-4 lg:col-start-8 lg:mt-[18vh]", ratio: "2 / 3" },
  { col: "lg:col-span-4 lg:col-start-3 lg:mt-[4vh]", ratio: "4 / 5" },
];

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="editorial-grid gap-y-14 lg:gap-y-20">
      {products.map((product, i) => {
        const slot = SLOTS[i % SLOTS.length];
        return (
          <li key={product.slug} className={`col-span-12 sm:col-span-6 ${slot.col}`}>
            <Reveal>
              <ProductFigure product={product} ratio={slot.ratio} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" />
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
