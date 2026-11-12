"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { usePanel } from "@/components/layout/Providers";
import { useBag } from "@/hooks/useBag";
import { formatPrice } from "@/lib/utils";

export function BagDrawer() {
  const { panel, close } = usePanel();
  const { entries, count, subtotal, setQuantity } = useBag();

  return (
    <Sheet open={panel === "bag"} onClose={close} from="right" labelledBy="bag-title" className="flex flex-col">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-sand px-6 lg:h-20">
        <h2 id="bag-title" className="label">
          Bag {count > 0 && <span className="text-graphite">({count})</span>}
        </h2>
        <button type="button" className="label link-line" onClick={close}>
          Close
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-1 flex-col justify-center px-6 pb-24">
          <p className="display text-title">Your bag is empty.</p>
          <p className="mt-4 max-w-[30ch] text-small text-graphite">
            Pieces you add will wait here, saved in this browser.
          </p>
          <Link href="/shop" onClick={close} className="label link-line mt-8 self-start">
            Browse the shop
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-sand overflow-y-auto px-6">
            {entries.map((entry) => (
              <li key={`${entry.slug}-${entry.size}`} className="flex gap-4 py-6">
                <Link
                  href={`/shop/${entry.slug}`}
                  onClick={close}
                  className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-sand"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={entry.product.image.src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                    style={{ objectPosition: entry.product.image.position ?? "50% 50%" }}
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-baseline justify-between gap-3">
                    <Link href={`/shop/${entry.slug}`} onClick={close} className="display text-[1.25rem] leading-tight">
                      {entry.product.name}
                    </Link>
                    <p className="text-small tabular-nums">{formatPrice(entry.lineTotal)}</p>
                  </div>
                  <p className="label mt-1 text-graphite">
                    {entry.product.colour} · Size {entry.size}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-4" role="group" aria-label={`Quantity of ${entry.product.name}`}>
                      <button
                        type="button"
                        aria-label="Remove one"
                        className="grid size-8 place-items-center border border-sand transition-colors hover:border-ink"
                        onClick={() => setQuantity(entry.slug, entry.size, entry.quantity - 1)}
                      >
                        <Minus aria-hidden="true" strokeWidth={1.25} className="size-3.5" />
                      </button>
                      <span className="text-small tabular-nums" aria-live="polite">
                        {entry.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Add one"
                        className="grid size-8 place-items-center border border-sand transition-colors hover:border-ink"
                        onClick={() => setQuantity(entry.slug, entry.size, entry.quantity + 1)}
                      >
                        <Plus aria-hidden="true" strokeWidth={1.25} className="size-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="label link-line text-graphite"
                      onClick={() => setQuantity(entry.slug, entry.size, 0)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="shrink-0 border-t border-sand px-6 py-6">
            <div className="flex items-baseline justify-between">
              <p className="label">Subtotal</p>
              <p className="display text-lede tabular-nums">{formatPrice(subtotal)}</p>
            </div>
            <button
              type="button"
              disabled
              aria-describedby="checkout-note"
              className="label mt-6 w-full bg-ink py-4 text-ivory disabled:cursor-not-allowed disabled:opacity-60"
            >
              Checkout
            </button>
            <p id="checkout-note" className="mt-3 text-small text-graphite">
              Checkout isn&rsquo;t connected yet. Your bag is saved in this browser.
            </p>
          </div>
        </>
      )}
    </Sheet>
  );
}
