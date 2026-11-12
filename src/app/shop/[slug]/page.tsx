import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProduct, getProducts, products } from "@/data/products";
import { collections } from "@/data/collections";
import { AddToBag } from "@/components/shop/AddToBag";
import { ProductFigure } from "@/components/shop/ProductFigure";
import { Reveal } from "@/components/animations/Reveal";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.name,
    description: `${product.name} in ${product.colour}. ${product.description}`,
    openGraph: { images: [{ url: product.image.src, width: product.image.width, height: product.image.height }] },
  };
}

/**
 * The slug is URL data, so it is read behind Suspense: client navigation shows
 * the page frame at once, and the product streams in (it is prerendered, so in
 * practice it arrives immediately).
 */
export default function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  return (
    <Suspense fallback={<ProductFallback />}>
      <Product params={params} />
    </Suspense>
  );
}

function ProductFallback() {
  return (
    <div className="gutter pt-24 lg:pt-28" aria-hidden="true">
      <div className="editorial-grid mt-11">
        <div className="col-span-12 aspect-[4/5] bg-sand lg:col-span-7" />
      </div>
    </div>
  );
}

async function Product({ params }: { params: PageProps<"/shop/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const collection = collections.find((c) => c.productSlugs.includes(product.slug));
  const related = getProducts(collection?.productSlugs ?? [])
    .filter((p) => p.slug !== product.slug)
    .slice(0, 2);

  return (
    <article className="gutter pt-24 lg:pt-28">
      <nav aria-label="Breadcrumb" className="label mb-6 text-graphite">
        <Link href="/shop" className="link-line">
          Shop
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{product.category}</span>
      </nav>

      <div className="editorial-grid gap-y-10">
        <div className="col-span-12 lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
              style={{ objectPosition: product.image.position ?? "50% 50%" }}
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p data-reveal className="label text-graphite">
                {product.category} · {product.colour}
              </p>
              <h1 data-reveal className="display text-title mt-4">
                {product.name}
              </h1>
              <p data-reveal className="mt-4 text-lede tabular-nums">
                {formatPrice(product.price)}
              </p>
              <p data-reveal className="mt-6 max-w-[42ch] text-small text-graphite">
                {product.description}
              </p>
              <div data-reveal className="mt-10">
                <AddToBag slug={product.slug} sizes={product.sizes} name={product.name} />
              </div>
              <dl data-reveal className="mt-10 border-t border-sand pt-6 text-small">
                <div className="flex justify-between py-1">
                  <dt className="text-graphite">Colour</dt>
                  <dd>{product.colour}</dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-graphite">Sizes</dt>
                  <dd>{product.sizes.join(", ")}</dd>
                </div>
              </dl>
              <ul data-reveal className="mt-4 space-y-1 text-small text-graphite">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {collection && related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-[clamp(6rem,12vw,10rem)]">
          <div className="editorial-grid items-end gap-y-6">
            <h2 id="related-title" className="display text-title col-span-12 lg:col-span-6">
              Also in {collection.title}
            </h2>
            <div className="col-span-12 lg:col-span-3 lg:col-start-10">
              <Link href={`/collections/${collection.slug}`} className="label link-line">
                See the collection
              </Link>
            </div>
          </div>
          <ul className="editorial-grid mt-12 gap-y-12">
            {related.map((p, i) => (
              <li key={p.slug} className={i === 0 ? "col-span-12 sm:col-span-6 lg:col-span-4" : "col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-7 lg:mt-24"}>
                <ProductFigure product={p} sizes="(min-width: 1024px) 33vw, 50vw" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
