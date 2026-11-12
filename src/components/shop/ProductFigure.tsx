import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

type ProductFigureProps = {
  product: Product;
  ratio?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** A product as an editorial plate: photograph, then a single hairline row of facts. No card. */
export function ProductFigure({ product, ratio = "3 / 4", sizes, className, priority }: ProductFigureProps) {
  return (
    <Link href={`/shop/${product.slug}`} data-cursor="View" className={cn("group block", className)}>
      <div className="relative overflow-hidden bg-sand" style={{ aspectRatio: ratio }}>
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-reveal)] group-hover:scale-[1.04]"
          style={{ objectPosition: product.image.position ?? "50% 50%" }}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-[1.375rem] leading-tight">
          <span className="transition-[padding] duration-500 ease-[var(--ease-reveal)] group-hover:pl-3">
            {product.name}
          </span>
        </h3>
        <p className="text-small tabular-nums">{formatPrice(product.price)}</p>
      </div>
      <p className="label mt-1.5 text-graphite">
        {product.category} · {product.colour}
      </p>
    </Link>
  );
}
