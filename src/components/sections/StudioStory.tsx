import { images } from "@/data/images";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function StudioStory() {
  return (
    <section aria-labelledby="story-title" className="gutter py-[clamp(7rem,15vw,14rem)]">
      <div className="editorial-grid gap-y-12">
        <div className="relative col-span-12 md:col-span-7 lg:col-span-5">
          <ImageReveal image={images.storyPortrait} ratio="4 / 5" sizes="(min-width: 1024px) 40vw, (min-width: 768px) 58vw, 100vw" parallax={8} />
          <div className="absolute -bottom-12 -right-4 w-[38%] sm:-right-10 lg:-right-[32%] lg:bottom-[12%] lg:w-[46%]">
            <ImageReveal image={images.storyDetail} ratio="4 / 5" sizes="(min-width: 1024px) 18vw, 38vw" from="left" delay={0.2} />
          </div>
        </div>

        <div className="col-span-12 mt-16 md:col-span-5 md:mt-0 lg:col-span-4 lg:col-start-8 lg:self-center">
          <TextReveal as="h2" id="story-title" className="display text-title">
            Made to be lived in.
          </TextReveal>
          <Reveal className="mt-8 space-y-5 text-small text-graphite">
            <p data-reveal>
              Studio Babui is a small fashion studio designing contemporary clothing for everyone. We start from
              shapes people already love to wear, then shift a proportion, a colour or a detail until the piece feels
              like it has a point of view.
            </p>
            <p data-reveal>
              Nothing here asks you to perform. The clothes are meant to be reached for, worn often and made your own.
            </p>
            <div data-reveal className="pt-4">
              <ArrowLink href="/about">Read the studio note</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
