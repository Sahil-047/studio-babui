"use client";

import { useState } from "react";
import { usePanel } from "@/components/layout/Providers";
import { useBag } from "@/hooks/useBag";
import type { Size } from "@/types";
import { cn } from "@/lib/utils";

export function AddToBag({ slug, sizes, name }: { slug: string; sizes: Size[]; name: string }) {
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState(false);
  const { add } = useBag();
  const { open } = usePanel();

  return (
    <div>
      <fieldset aria-describedby={error ? "size-error" : undefined}>
        <legend className="label text-graphite">Size</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <label key={s} className="cursor-pointer">
              <input
                type="radio"
                name="size"
                value={s}
                className="peer sr-only"
                checked={size === s}
                onChange={() => {
                  setSize(s);
                  setError(false);
                }}
              />
              <span
                className={cn(
                  "label grid h-11 min-w-12 place-items-center border px-3 transition-colors",
                  "border-sand hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ivory",
                  "peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2",
                )}
              >
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <p id="size-error" role="alert" className="mt-2 min-h-[1.5em] text-small text-[#8a3b2e]">
        {error ? "Choose a size first." : ""}
      </p>
      <button
        type="button"
        className="label mt-2 w-full bg-ink py-4 text-ivory transition-opacity hover:opacity-90"
        onClick={() => {
          if (!size) {
            setError(true);
            return;
          }
          add(slug, size);
          open("bag");
        }}
      >
        Add to bag<span className="sr-only">: {name}</span>
      </button>
      <p className="mt-3 text-small text-graphite">Your bag is saved in this browser. Checkout isn&rsquo;t connected yet.</p>
    </div>
  );
}
