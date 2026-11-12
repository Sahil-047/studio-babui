"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { isValidEmail } from "@/lib/utils";
import { TextReveal } from "@/components/animations/TextReveal";

type Status =
  | { kind: "idle" }
  | { kind: "invalid"; message: string }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus({ kind: "invalid", message: "Enter an email address like name@example.com." });
      return;
    }
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };
      if (!res.ok || !data.ok) throw new Error(data.message);
      setStatus({ kind: "success", message: data.message });
      setEmail("");
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error && err.message
            ? err.message
            : "We couldn't sign you up just now. Please try again in a moment.",
      });
    }
  }

  const invalid = status.kind === "invalid";
  const message = "message" in status ? status.message : "";

  return (
    <section aria-labelledby="newsletter-title" className="gutter">
      <div className="editorial-grid gap-y-10 border-t border-ink/15 pt-14 lg:pt-20">
        <TextReveal as="h2" id="newsletter-title" className="display text-display col-span-12 lg:col-span-7">
          Letters from <span className="italic">Babui.</span>
        </TextReveal>

        <div className="col-span-12 sm:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-small text-graphite">Stories, collections and occasional notes from our world.</p>

          <form noValidate onSubmit={onSubmit} className="mt-8" aria-describedby="newsletter-status">
            <label htmlFor="newsletter-email" className="label text-graphite">
              Email address
            </label>
            <div className="mt-2 flex items-end gap-4 border-b border-ink/40 transition-colors focus-within:border-ink">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status.kind !== "loading") setStatus({ kind: "idle" });
                }}
                aria-invalid={invalid}
                placeholder="name@example.com"
                className="min-w-0 flex-1 bg-transparent py-3 text-body outline-none placeholder:text-graphite/70"
              />
              <button
                type="submit"
                disabled={status.kind === "loading"}
                className="group/cta label inline-flex shrink-0 items-center gap-2 py-3 disabled:opacity-50"
              >
                {status.kind === "loading" ? "Sending…" : "Subscribe"}
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="size-4 transition-transform duration-500 group-hover/cta:translate-x-1"
                />
              </button>
            </div>
            <p
              id="newsletter-status"
              role="status"
              aria-live="polite"
              className={`mt-3 min-h-[1.5em] text-small ${
                status.kind === "success" ? "text-ink" : invalid || status.kind === "error" ? "text-[#8a3b2e]" : ""
              }`}
            >
              {message}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
