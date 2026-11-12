import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "ink" | "ivory";
  cursor?: string;
};

/** The site's one call-to-action form: tracked capitals, a hairline, an arrow that travels. */
export function ArrowLink({ href, children, className, tone = "ink", cursor }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      data-cursor={cursor}
      className={cn(
        "group/cta label inline-flex items-center gap-3 border-b pb-2 transition-colors duration-500",
        tone === "ink" ? "border-ink/30 hover:border-ink" : "border-ivory/50 text-ivory hover:border-ivory",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        strokeWidth={1.25}
        className="size-4 transition-transform duration-500 ease-[var(--ease-reveal)] group-hover/cta:translate-x-1.5"
      />
    </Link>
  );
}
