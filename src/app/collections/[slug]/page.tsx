import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { collections, getCollection } from "@/data/collections";
import { getProducts } from "@/data/products";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ProductGrid } from "@/components/shop/ProductGrid";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection not found" };
  return {
    title: collection.title,
    description: collection.summary,
    openGraph: { images: [{ url: collection.lead.src }] },
  };
}

export default function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  return (
    <Suspense
      fallback={
        <div className="gutter pt-24 lg:pt-28" aria-hidden="true">
          <div className="editorial-grid">
            <div className="col-span-12 aspect-[4/5] bg-sand lg:col-span-6 lg:col-start-7" />
          </div>
        </div>
      }
    >
      <CollectionContent params={params} />
    </Suspense>
  );
}

async function CollectionContent({ params }: { params: PageProps<"/collections/[slug]">["params"] }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = getProducts(collection.productSlugs);
  const index = collections.indexOf(collection);
  const next = collections[(index + 1) % collections.length];

  return (
    <>
      <header className="gutter pt-24 lg:pt-28">
        <div className="editorial-grid gap-y-8">
          <div className="col-span-12 lg:col-span-5 lg:self-end lg:pb-6">
            <p className="display text-lede text-umber">{collection.index}</p>
            <TextReveal as="h1" className="display text-display mt-4">
              {collection.title}
            </TextReveal>
            <p className="mt-6 max-w-[34ch] text-small text-graphite">{collection.summary}</p>
            <p className="label mt-6 text-graphite">{items.length} pieces</p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <ImageReveal image={collection.lead} ratio="4 / 5" sizes="(min-width: 1024px) 50vw, 100vw" priority from="top" />
          </div>
        </div>
      </header>

      <section aria-label={`Pieces in ${collection.title}`} className="gutter mt-[clamp(5rem,10vw,9rem)]">
        <ProductGrid products={items} />
      </section>

      <nav aria-label="Next collection" className="gutter mt-[clamp(6rem,12vw,10rem)] border-t border-sand pt-10">
        <Link href={`/collections/${next.slug}`} className="group flex flex-wrap items-baseline justify-between gap-4">
          <span className="label text-graphite">Next collection</span>
          <span className="display text-title transition-[padding] duration-700 ease-[var(--ease-reveal)] group-hover:pr-6">
            {next.title}
          </span>
        </Link>
      </nav>
    </>
  );
}
