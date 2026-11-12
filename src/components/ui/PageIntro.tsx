import type { ReactNode } from "react";
import { TextReveal } from "@/components/animations/TextReveal";

/** Opening of an inner page: oversized title left, a short note in the right margin. */
export function PageIntro({ title, note, aside }: { title: ReactNode; note?: ReactNode; aside?: ReactNode }) {
  return (
    <header className="gutter pb-16 pt-32 lg:pb-24 lg:pt-44">
      <div className="editorial-grid items-end gap-y-6">
        <TextReveal as="h1" className="display text-display col-span-12 lg:col-span-8">
          {title}
        </TextReveal>
        {(note || aside) && (
          <div className="col-span-12 max-w-[36ch] text-small text-graphite lg:col-span-3 lg:col-start-10">
            {note}
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
