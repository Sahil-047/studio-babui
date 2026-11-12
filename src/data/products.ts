import type { Product } from "@/types";

/**
 * SAMPLE CATALOGUE. Names, prices, sizes and descriptions are placeholders
 * written for layout; replace them with Studio Babui's real products.
 * Image paths follow public/images/products/<slug>.jpg.
 */
export const products: Product[] = [
  {
    slug: "band-collar-shirt",
    name: "Band Collar Shirt",
    category: "Shirts",
    colour: "Chalk Blue",
    price: 4800,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A relaxed shirt with a short band collar and a straight hem, made to be worn open or closed.",
    details: ["Relaxed fit", "Band collar", "Sample product: replace with real details"],
    image: {
      src: "/images/products/band-collar-shirt.jpg",
      width: 1400,
      height: 2098,
      alt: "A chalk-blue band collar shirt hanging from a wooden rail",
    },
  },
  {
    slug: "boxy-half-sleeve-tee",
    name: "Boxy Half-Sleeve Tee",
    category: "Tops",
    colour: "Ash",
    price: 2400,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A square-cut tee with dropped shoulders and sleeves that land at the elbow.",
    details: ["Boxy fit", "Dropped shoulder", "Sample product: replace with real details"],
    image: {
      src: "/images/products/boxy-tee.jpg",
      width: 1400,
      height: 2099,
      alt: "An ash-grey boxy tee hanging from a wooden rail",
    },
  },
  {
    slug: "unstructured-jacket",
    name: "Unstructured Jacket",
    category: "Outerwear",
    colour: "Indigo",
    price: 9800,
    sizes: ["S", "M", "L", "XL"],
    description: "A soft jacket without shoulder padding, cut to sit easily over a kurta or a tee.",
    details: ["Unlined", "Patch pockets", "Sample product: replace with real details"],
    image: {
      src: "/images/products/unstructured-jacket.jpg",
      width: 1400,
      height: 1633,
      alt: "Two indigo unstructured jackets hanging side by side",
    },
  },
  {
    slug: "straight-kurta-marigold",
    name: "Straight Kurta",
    category: "Kurtas",
    colour: "Marigold",
    price: 5200,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A clean straight kurta with a mandarin collar, in a colour that does the talking.",
    details: ["Straight cut", "Mandarin collar", "Sample product: replace with real details"],
    image: {
      src: "/images/products/marigold-kurta.jpg",
      width: 1400,
      height: 1960,
      alt: "A model wearing a marigold straight kurta with white trousers against a white wall",
      position: "50% 25%",
    },
  },
  {
    slug: "kurta-bundi-set",
    name: "Kurta & Bundi Set",
    category: "Sets",
    colour: "Lilac",
    price: 12400,
    sizes: ["S", "M", "L", "XL"],
    description: "A lilac kurta paired with a sleeveless bundi, for evenings that ask for a little more.",
    details: ["Two pieces", "Sleeveless bundi", "Sample product: replace with real details"],
    image: {
      src: "/images/products/lilac-kurta-set.jpg",
      width: 1400,
      height: 1917,
      alt: "A model in a lilac kurta and embellished bundi standing against a grey backdrop",
      position: "50% 25%",
    },
  },
  {
    slug: "embroidered-motif-shirt",
    name: "Embroidered Motif Shirt",
    category: "Shirts",
    colour: "Ivory",
    price: 6200,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "An ivory shirt carrying a single small motif stitched in gold thread at the chest.",
    details: ["Regular fit", "Single motif", "Sample product: replace with real details"],
    image: {
      src: "/images/products/embroidered-shirt.jpg",
      width: 1400,
      height: 1960,
      alt: "Close detail of an ivory shirt with a small gold embroidered motif",
    },
  },
  {
    slug: "short-kurta-ink",
    name: "Short Kurta",
    category: "Kurtas",
    colour: "Ink",
    price: 4600,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A hip-length kurta in deep ink, with sleeves made to be rolled.",
    details: ["Hip length", "Side slits", "Sample product: replace with real details"],
    image: {
      src: "/images/products/ink-kurta.jpg",
      width: 1400,
      height: 2100,
      alt: "A man rolling up the sleeves of an ink-black short kurta in a pale doorway",
      position: "50% 30%",
    },
  },
  {
    slug: "gathered-shirt-dress",
    name: "Gathered Shirt Dress",
    category: "Dresses",
    colour: "Ivory",
    price: 7400,
    sizes: ["XS", "S", "M", "L"],
    description: "A long shirt dress gathered softly at the yoke, easy enough for every day.",
    details: ["Relaxed fit", "Gathered yoke", "Sample product: replace with real details"],
    image: {
      src: "/images/products/ivory-dress.jpg",
      width: 1400,
      height: 1750,
      alt: "A model in an ivory gathered shirt dress against a warm beige backdrop",
      position: "50% 25%",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProducts(slugs: string[]): Product[] {
  return slugs.flatMap((slug) => {
    const product = getProduct(slug);
    return product ? [product] : [];
  });
}
