import Link from "next/link";
import { collections } from "@/data/collections";
import { legalLinks, primaryNav, site } from "@/data/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="gutter mt-[clamp(6rem,14vw,12rem)] border-t border-sand pb-6 pt-14 lg:pt-20">
      <div className="editorial-grid gap-y-12">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <p className="display text-lede max-w-[22ch]">Clothes for people who dress for themselves first.</p>
        </div>

        <nav aria-label="Footer" className="col-span-6 md:col-span-2 lg:col-start-6">
          <p className="label mb-4 text-graphite">Visit</p>
          <ul className="space-y-2 text-small">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 md:col-span-2">
          <p className="label mb-4 text-graphite">Collections</p>
          <ul className="space-y-2 text-small">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="link-line">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <p className="label mb-4 text-graphite">Follow</p>
          <ul className="space-y-2 text-small">
            {site.social.map((s) =>
              s.url ? (
                <li key={s.label}>
                  <a href={s.url} className="link-line" rel="noopener noreferrer" target="_blank">
                    {s.label}
                  </a>
                </li>
              ) : (
                <li key={s.label} className="text-graphite">
                  {s.label} <span className="text-micro">· soon</span>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <p className="label mb-4 text-graphite">Write to us</p>
          <a href={`mailto:${site.contact.email}`} className="link-line text-small break-all">
            {site.contact.email}
          </a>
          <p className="mt-2 text-small text-graphite">{site.contact.location}</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="display mt-20 select-none whitespace-nowrap text-center text-[calc((100vw_-_2_*_clamp(1rem,0.4rem_+_2.6vw,3rem))_/_6.8)] uppercase leading-[0.8] tracking-[-0.02em] lg:mt-28"
      >
        Studio Babui
      </p>

      <div className="mt-8 flex flex-col gap-4 border-t border-sand pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="label text-graphite">© {year} Studio Babui</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="label link-line text-graphite">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
