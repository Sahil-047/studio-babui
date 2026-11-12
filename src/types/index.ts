export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position, used when the frame crops the photograph. */
  position?: string;
};

export type ProductCategory =
  | "Shirts"
  | "Tops"
  | "Kurtas"
  | "Sets"
  | "Outerwear"
  | "Dresses";

export type Size = "XS" | "S" | "M" | "L" | "XL";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  colour: string;
  /** Price in Indian rupees, whole units. */
  price: number;
  sizes: Size[];
  description: string;
  details: string[];
  image: ImageAsset;
};

export type CollectionLayout = "portrait-left" | "landscape-wide" | "portrait-right" | "offset-pair";

export type Collection = {
  slug: string;
  title: string;
  index: string;
  summary: string;
  layout: CollectionLayout;
  lead: ImageAsset;
  support: ImageAsset;
  productSlugs: string[];
};

export type Campaign = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  image: ImageAsset;
  href: string;
};

export type GalleryPlate = ImageAsset & { caption: string };

export type BagLine = {
  slug: string;
  size: Size;
  quantity: number;
};

export type NavLink = { label: string; href: string };
