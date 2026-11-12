"use client";

import type { BagLine, Size } from "@/types";

/**
 * Browser-only bag. Lines live in localStorage and are read through
 * useSyncExternalStore, so the server always renders an empty bag and the
 * client fills in after hydration without a mismatch.
 */
const KEY = "studio-babui:bag";
const EMPTY: BagLine[] = [];

let cache: BagLine[] | null = null;
const listeners = new Set<() => void>();

function read(): BagLine[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BagLine[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function write(lines: BagLine[]): void {
  cache = lines;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Storage can be unavailable (private mode); the bag still works for this visit.
  }
  listeners.forEach((fn) => fn());
}

export const bagStore = {
  subscribe(fn: () => void): () => void {
    listeners.add(fn);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        cache = read();
        fn();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(fn);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): BagLine[] {
    if (cache === null) cache = read();
    return cache;
  },
  getServerSnapshot(): BagLine[] {
    return EMPTY;
  },
  add(slug: string, size: Size): void {
    const lines = bagStore.getSnapshot();
    const existing = lines.find((l) => l.slug === slug && l.size === size);
    write(
      existing
        ? lines.map((l) => (l === existing ? { ...l, quantity: Math.min(l.quantity + 1, 9) } : l))
        : [...lines, { slug, size, quantity: 1 }],
    );
  },
  setQuantity(slug: string, size: Size, quantity: number): void {
    const lines = bagStore.getSnapshot();
    write(
      quantity <= 0
        ? lines.filter((l) => !(l.slug === slug && l.size === size))
        : lines.map((l) => (l.slug === slug && l.size === size ? { ...l, quantity: Math.min(quantity, 9) } : l)),
    );
  },
};
