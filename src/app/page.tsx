import { Hero } from "@/components/sections/Hero";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { Collections } from "@/components/sections/Collections";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { EditorialCampaign } from "@/components/sections/EditorialCampaign";
import { StudioStory } from "@/components/sections/StudioStory";
import { Gallery } from "@/components/sections/Gallery";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <Collections />
      <FeaturedProducts />
      <EditorialCampaign />
      <StudioStory />
      <Gallery />
      <Newsletter />
    </>
  );
}
