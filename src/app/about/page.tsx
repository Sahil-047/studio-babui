import type { Metadata } from "next";
import { images } from "@/data/images";
import { PageIntro } from "@/components/ui/PageIntro";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "About",
  description: "Studio Babui is a fashion studio designing contemporary unisex clothing.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title={
          <>
            A studio <span className="italic">note</span>
          </>
        }
        note={<p>What Studio Babui makes, and how we think about it.</p>}
      />

      <section className="gutter" aria-label="Studio note">
        <div className="editorial-grid gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <ImageReveal image={images.storyPortrait} ratio="16 / 10" sizes="(min-width: 1024px) 50vw, 100vw" priority />
          </div>
          <Reveal className="col-span-12 space-y-6 lg:col-span-4 lg:col-start-8 lg:self-end">
            <p data-reveal className="display text-lede">
              Studio Babui designs contemporary clothing for everyone, without dividing the rail by gender.
            </p>
            <p data-reveal className="text-small text-graphite">
              We begin with shapes people already love: the shirt, the kurta, the easy jacket, the long dress. Then we
              change one thing, a proportion, a colour, a detail, until the piece feels considered without feeling
              precious.
            </p>
            <p data-reveal className="text-small text-graphite">
              The clothes are meant to be reached for and worn often. How you wear them is the part we leave to you.
            </p>
          </Reveal>
        </div>

        <div className="editorial-grid mt-[clamp(6rem,12vw,10rem)] gap-y-12">
          <TextReveal as="h2" className="display text-title col-span-12 lg:col-span-5 lg:col-start-2">
            What we hold to
          </TextReveal>
          <ol className="col-span-12 divide-y divide-sand border-y border-sand lg:col-span-5 lg:col-start-8">
            {[
              ["Clothes for everyone", "Every piece is cut to be worn by anyone it fits."],
              ["The photograph, then the words", "We would rather show you a piece than describe it at length."],
              ["Nothing we can't stand behind", "We only say what is true about what we make."],
            ].map(([title, body]) => (
              <li key={title} className="py-6">
                <p className="display text-lede">{title}</p>
                <p className="mt-2 text-small text-graphite">{body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="editorial-grid mt-[clamp(6rem,12vw,10rem)] gap-y-8">
          <div className="col-span-6 col-start-4 sm:col-span-4 sm:col-start-5 lg:col-span-3 lg:col-start-3">
            <ImageReveal image={images.storyDetail} ratio="4 / 5" sizes="(min-width: 1024px) 25vw, 50vw" from="left" />
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-8 lg:self-center">
            <p className="display text-lede">Start with the collections.</p>
            <div className="mt-6">
              <ArrowLink href="/collections">Explore collections</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
