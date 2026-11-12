"use client";

/**
 * Tiny signal shared by the loader and the hero: the hero's entrance waits for
 * the loader's exit instead of guessing with a timeout.
 */
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone(): void {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/** Calls `fn` once the intro has finished (immediately if it already has). Returns an unsubscribe. */
export function onIntroDone(fn: () => void): () => void {
  if (done) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
