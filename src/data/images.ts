import type { ImageAsset } from "@/types";

/**
 * Every photograph on the site, in one place.
 *
 * These are licensed stand-ins (Unsplash licence) until Studio Babui's own
 * shoots arrive. To replace one, drop the new file at the same path and update
 * its width, height and alt text here. Sources are listed in
 * public/images/CREDITS.md.
 */
function asset(src: string, width: number, height: number, alt: string, position?: string): ImageAsset {
  return { src: `/images/${src}`, width, height, alt, position };
}

export const images = {
  heroArch: asset(
    "hero/hero-arch.jpg",
    2000,
    2500,
    "A model in a sand-coloured wrap dress turns away beneath a vast travertine arch",
    "62% 70%",
  ),
  heroSleeve: asset(
    "hero/hero-sleeve.jpg",
    900,
    1350,
    "Close detail of a hand holding dried flowers against an ivory cotton dress",
    "50% 60%",
  ),
  statementWall: asset(
    "editorial/statement-wall.jpg",
    1400,
    934,
    "Black and white portrait of a woman in an embellished drape standing against a textured wall",
    "62% 50%",
  ),
  storyPortrait: asset(
    "editorial/story-portrait.jpg",
    1400,
    788,
    "A model in an indigo off-shoulder top looks back in front of a pink sandstone palace",
    "57% 40%",
  ),
  storyDetail: asset(
    "editorial/story-detail.jpg",
    1000,
    1250,
    "A model in a white kurta dress leaning against a pale wall",
    "50% 35%",
  ),
  newEditCoat: asset(
    "collections/new-edit-coat.jpg",
    1600,
    2341,
    "A figure in a long camel coat standing on pale stone steps",
    "50% 40%",
  ),
  newEditLinens: asset(
    "collections/new-edit-linens.jpg",
    1000,
    1250,
    "Folded ivory and blush linens stacked on a low wooden bench",
  ),
  signatureDrape: asset(
    "collections/signature-drape.jpg",
    1600,
    1060,
    "A seated model veiled in a rust drape, a green printed skirt fanned around her, before a carved stone screen",
    "50% 55%",
  ),
  signatureWeave: asset(
    "collections/signature-weave.jpg",
    1000,
    667,
    "Close texture of a cream textile woven with red and black lines",
  ),
  everydayShirt: asset(
    "collections/everyday-shirt.jpg",
    1600,
    2505,
    "A model in an oversized white shirt standing against a grey wall",
    "50% 30%",
  ),
  everydayTrouser: asset(
    "collections/everyday-trouser.jpg",
    1000,
    1500,
    "A man in loose ivory trousers sitting on a rock in a forest",
    "50% 60%",
  ),
  formsTunic: asset(
    "collections/forms-tunic.jpg",
    1600,
    2400,
    "Seen from behind, a figure in a wide-sleeved linen tunic and straw hat against a concrete wall",
  ),
  formsChair: asset(
    "collections/forms-chair.jpg",
    1000,
    1500,
    "A young man in a black top and wide trousers sitting on a wooden chair, knees drawn up",
  ),
  courtyard: asset(
    "campaigns/courtyard.jpg",
    2000,
    1600,
    "A model in a block-printed drape reclines on the threshold of a carved courtyard doorway",
    "55% 60%",
  ),
} satisfies Record<string, ImageAsset>;
