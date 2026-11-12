import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { legalLinks, site } from "@/data/site";
import { PageIntro } from "@/components/ui/PageIntro";

function findPage(slug: string) {
  return legalLinks.find((l) => l.href === `/legal/${slug}`);
}

export function generateStaticParams() {
  return legalLinks.map((l) => ({ slug: l.href.replace("/legal/", "") }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  return { title: page?.label ?? "Not found", robots: { index: false } };
}

/**
 * PLACEHOLDER: the studio's policies have not been written yet. This page says
 * so plainly instead of shipping invented legal text.
 */
export default function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" aria-hidden="true" />}>
      <LegalContent params={params} />
    </Suspense>
  );
}

async function LegalContent({ params }: { params: PageProps<"/legal/[slug]">["params"] }) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageIntro title={page.label} />
      <section className="gutter" aria-label={page.label}>
        <div className="editorial-grid">
          <div className="col-span-12 max-w-[60ch] space-y-5 text-body lg:col-span-6 lg:col-start-2">
            <p>This policy is being prepared and will be published here before the shop opens for orders.</p>
            <p className="text-graphite">
              Questions in the meantime? Write to{" "}
              <a className="link-line text-ink" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
