import type { Campaign, GalleryPlate } from "@/types";
import { images } from "./images";

export const featuredCampaign: Campaign = {
  slug: "in-the-courtyard",
  title: "In the Courtyard",
  kicker: "Campaign",
  summary: "Printed drapes, worn slow, at the edge of a threshold.",
  image: images.courtyard,
  href: "/collections/signature-pieces",
};

/** Gallery plates, in reading order. Stand-in photography; see CREDITS.md. */
export const galleryPlates: GalleryPlate[] = [
  {
    src: "/images/gallery/rust-dress.jpg",
    width: 1200,
    height: 1500,
    alt: "A woman in a rust off-shoulder dress against a dark backdrop",
    caption: "Rust, held in shadow",
  },
  {
    src: "/images/gallery/white-horizon.jpg",
    width: 1200,
    height: 900,
    alt: "A figure in white standing on an empty pale shore beside tall poles",
    caption: "White on white",
  },
  {
    src: "/images/gallery/ochre-veil.jpg",
    width: 1200,
    height: 1798,
    alt: "Portrait of a woman wrapped in an ochre headscarf",
    caption: "Ochre veil",
  },
  {
    src: "/images/gallery/shadow-profile.jpg",
    width: 1200,
    height: 1803,
    alt: "Black and white profile of a man in deep shadow",
    caption: "Profile, after light",
  },
  {
    src: "/images/gallery/cloth-rolls.jpg",
    width: 1200,
    height: 800,
    alt: "Rolls of muted cloth stacked on a shelf",
    caption: "Cloth, waiting",
  },
  {
    src: "/images/gallery/green-scarf.jpg",
    width: 1200,
    height: 1800,
    alt: "A woman in a black blazer over a white shirt, chin resting on her hand",
    caption: "Black, white, and a pause",
  },
  {
    src: "/images/gallery/field.jpg",
    width: 1200,
    height: 1800,
    alt: "A woman in a blue drape standing in a field of dry grass",
    caption: "Blue in the grass",
  },
  {
    src: "/images/gallery/knit-coat.jpg",
    width: 1200,
    height: 1800,
    alt: "A woman sitting on the ground with her hands raised to her face",
    caption: "Hands, close",
  },
  {
    src: "/images/gallery/street-coat.jpg",
    width: 1200,
    height: 1800,
    alt: "A woman with curly hair walking along a cobblestone street",
    caption: "On the way",
  },
];
