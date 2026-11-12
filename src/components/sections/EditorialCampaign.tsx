import { featuredCampaign as campaign } from "@/data/campaigns";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function EditorialCampaign() {
  return (
    <section aria-labelledby="campaign-title" className="mt-[clamp(6rem,12vw,11rem)]">
      <ParallaxImage image={campaign.image} sizes="100vw" className="h-[88svh] min-h-[34rem] lg:h-[120svh]">
        {/* Copy sits in the photograph's dark doorway, clear of the printed drape below. */}
        <div className="gutter flex h-full flex-col py-8 text-ivory lg:py-14">
          <Reveal className="flex justify-between">
            <p data-reveal className="label">
              {campaign.kicker}
            </p>
            <p data-reveal className="label">
              Signature Pieces
            </p>
          </Reveal>

          <div className="editorial-grid mt-[8vh] gap-y-6 lg:mt-[14vh]">
            <TextReveal
              as="h2"
              id="campaign-title"
              className="display text-display col-span-12 lg:col-span-6 lg:col-start-3"
            >
              {campaign.title}
            </TextReveal>
            <Reveal className="col-span-10 sm:col-span-6 lg:col-span-3 lg:col-start-3">
              <p data-reveal className="max-w-[28ch] text-small text-ivory/90">
                {campaign.summary}
              </p>
              <div data-reveal className="mt-6">
                <ArrowLink href={campaign.href} tone="ivory" cursor="Explore">
                  Explore the campaign
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </ParallaxImage>
    </section>
  );
}
