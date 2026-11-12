"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { usePanel } from "@/components/layout/Providers";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { formatPrice } from "@/lib/utils";

type Result = { href: string; title: string; meta: string };

const INDEX: (Result & { haystack: string })[] = [
  ...collections.map((c) => ({
    href: `/collections/${c.slug}`,
    title: c.title,
    meta: "Collection",
    haystack: `${c.title} ${c.summary} collection`.toLowerCase(),
  })),
  ...products.map((p) => ({
    href: `/shop/${p.slug}`,
    title: p.name,
    meta: `${p.category} · ${p.colour} · ${formatPrice(p.price)}`,
    haystack: `${p.name} ${p.category} ${p.colour}`.toLowerCase(),
  })),
];

export function SearchOverlay() {
  const { panel, close } = usePanel();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return INDEX.filter((r) => terms.every((t) => r.haystack.includes(t))).slice(0, 8);
  }, [query]);

  const go = (href: string) => {
    close();
    setQuery("");
    router.push(href);
  };

  return (
    <Sheet open={panel === "search"} onClose={close} from="top" labelledBy="search-title" className="gutter pb-10">
      <div className="flex h-16 items-center justify-between lg:h-20">
        <h2 id="search-title" className="label">
          Search
        </h2>
        <button type="button" className="label link-line" onClick={close}>
          Close
        </button>
      </div>

      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) go(results[0].href);
        }}
      >
        <label htmlFor="search-input" className="sr-only">
          Search pieces and collections
        </label>
        <input
          id="search-input"
          type="search"
          autoFocus
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pieces, colours, collections"
          className="display w-full border-b border-ink/30 bg-transparent pb-4 text-title outline-none placeholder:text-stone focus:border-ink"
        />
      </form>

      <div aria-live="polite" className="mt-8 min-h-24">
        {query && results.length === 0 && (
          <p className="text-small text-graphite">
            Nothing matches &ldquo;{query}&rdquo;. Try a colour, like ivory, or a piece, like kurta.
          </p>
        )}
        {results.length > 0 && (
          <ul className="divide-y divide-sand">
            {results.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(r.href);
                  }}
                  className="group flex items-baseline justify-between gap-6 py-4"
                >
                  <span className="display text-lede transition-[padding] duration-500 group-hover:pl-3">{r.title}</span>
                  <span className="label shrink-0 text-graphite">{r.meta}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Sheet>
  );
}
