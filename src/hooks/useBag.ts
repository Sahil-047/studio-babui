"use client";

import { useMemo, useSyncExternalStore } from "react";
import { bagStore } from "@/lib/bag";
import { getProduct } from "@/data/products";
import type { BagLine, Product } from "@/types";

export type BagEntry = BagLine & { product: Product; lineTotal: number };

export function useBag() {
  const lines = useSyncExternalStore(bagStore.subscribe, bagStore.getSnapshot, bagStore.getServerSnapshot);

  return useMemo(() => {
    const entries: BagEntry[] = lines.flatMap((line) => {
      const product = getProduct(line.slug);
      return product ? [{ ...line, product, lineTotal: product.price * line.quantity }] : [];
    });
    return {
      entries,
      count: entries.reduce((n, e) => n + e.quantity, 0),
      subtotal: entries.reduce((n, e) => n + e.lineTotal, 0),
      add: bagStore.add,
      setQuantity: bagStore.setQuantity,
    };
  }, [lines]);
}
