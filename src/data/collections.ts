import type { Collection } from "@/types";
import { images } from "./images";

/** SAMPLE COLLECTIONS: titles come from the brief; summaries are placeholders. */
export const collections: Collection[] = [
  {
    slug: "the-new-edit",
    title: "The New Edit",
    index: "I",
    summary: "Long lines, pale grounds and pieces that layer without effort.",
    layout: "portrait-left",
    lead: images.newEditCoat,
    support: images.newEditLinens,
    productSlugs: ["band-collar-shirt", "boxy-half-sleeve-tee", "gathered-shirt-dress"],
  },
  {
    slug: "signature-pieces",
    title: "Signature Pieces",
    index: "II",
    summary: "The pieces we keep returning to: colour, drape and detail held with restraint.",
    layout: "landscape-wide",
    lead: images.signatureDrape,
    support: images.signatureWeave,
    productSlugs: ["kurta-bundi-set", "embroidered-motif-shirt", "unstructured-jacket"],
  },
  {
    slug: "everyday-expressions",
    title: "Everyday Expressions",
    index: "III",
    summary: "Shirts, tees and kurtas for the days you would rather not think about it.",
    layout: "portrait-right",
    lead: images.everydayShirt,
    support: images.everydayTrouser,
    productSlugs: ["boxy-half-sleeve-tee", "straight-kurta-marigold", "short-kurta-ink"],
  },
  {
    slug: "contemporary-forms",
    title: "Contemporary Forms",
    index: "IV",
    summary: "Volume, shadow and structure: silhouettes that move away from the body.",
    layout: "offset-pair",
    lead: images.formsTunic,
    support: images.formsChair,
    productSlugs: ["unstructured-jacket", "short-kurta-ink", "gathered-shirt-dress"],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
