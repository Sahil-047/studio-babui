import Link from "next/link";

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[80svh] flex-col justify-end pb-10 pt-32">
      <h1 className="display text-display">
        Nothing <span className="italic">here.</span>
      </h1>
      <p className="mt-6 max-w-[36ch] text-small text-graphite">
        The page you were looking for has moved, or never existed.
      </p>
      <div className="mt-8 flex gap-8">
        <Link href="/" className="label link-line">
          Home
        </Link>
        <Link href="/shop" className="label link-line">
          Shop
        </Link>
      </div>
    </section>
  );
}
