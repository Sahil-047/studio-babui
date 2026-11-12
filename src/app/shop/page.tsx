import type { Metadata } from "next";
import { products } from "@/data/products";
import { PageIntro } from "@/components/ui/PageIntro";
import { ProductGrid } from "@/components/shop/ProductGrid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop contemporary unisex clothing from Studio Babui: shirts, kurtas, sets, outerwear and dresses.",
};

export default function ShopPage() {
  return (
    <>
      <PageIntro
        title="Shop"
        note={
          <p>
            {products.length} pieces, all unisex. These are sample products while the catalogue is being prepared;
            prices are in rupees.
          </p>
        }
      />
      <section aria-label="All pieces" className="gutter">
        <ProductGrid products={products} />
      </section>
    </>
  );
}
