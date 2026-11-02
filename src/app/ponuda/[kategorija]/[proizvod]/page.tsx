import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryLine } from "@/components/page/InquiryLine";
import { PageIntro } from "@/components/page/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Photo, credit } from "@/components/ui/Photo";
import {
  applicationLabels,
  categoryBySlug,
  categoryHref,
  constructionLabels,
  manufacturerBySlug,
  materialLabels,
  productBySlug,
  productHref,
  products,
  speciesBySlug,
} from "@/content/catalog";
import { media } from "@/content/media";
import { absolute, pageMetadata } from "@/lib/seo";

/** Real slugs are prerendered; unknown slugs become a real 404 via src/proxy.ts. */
export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ kategorija: p.category, proizvod: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ponuda/[kategorija]/[proizvod]">): Promise<Metadata> {
  const { kategorija, proizvod } = await params;
  const p = productBySlug[proizvod];
  if (!p || p.category !== kategorija) return {};
  return pageMetadata({
    title: `${p.name}, Sarajevo`,
    description: p.summary,
    path: productHref(p),
    image: p.images[0] ?? categoryBySlug[p.category].hero,
  });
}

export default async function ProductPage({ params }: PageProps<"/ponuda/[kategorija]/[proizvod]">) {
  const { kategorija, proizvod } = await params;
  const p = productBySlug[proizvod];
  if (!p || p.category !== kategorija) notFound();
  const c = categoryBySlug[p.category];
  const makers = (p.manufacturers ?? []).map((m) => manufacturerBySlug[m]);
  const related = p.related.map((s) => productBySlug[s]).filter(Boolean);
  const [lead, ...rest] = p.images;

  // Only verified attributes. Rows without a verified value are never created.
  const rows: { label: string; value: string }[] = [
    { label: "Kategorija", value: c.name },
    { label: "Materijal", value: materialLabels[p.material] },
  ];
  if (p.constructions?.length) rows.push({ label: "Konstrukcija", value: p.constructions.map((x) => constructionLabels[x]).join(", ") });
  rows.push({ label: "Primjena", value: p.applications.map((a) => applicationLabels[a]).join(", ") });
  if (makers.length) rows.push({ label: "Proizvođač", value: makers.map((m) => m.name).join(", ") });
  if (p.species?.length) rows.push({ label: "Vrste drveta", value: p.species.map((s) => speciesBySlug[s].name).join(", ") });
  p.specs?.forEach((s) => rows.push({ label: s.label, value: s.value }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.summary,
    category: c.name,
    ...(p.images.length ? { image: p.images.map((k) => absolute(media[k].src.src)) } : {}),
    url: absolute(productHref(p)),
    ...(makers.length ? { brand: { "@type": "Brand", name: makers[0].name } } : {}),
    // No offers/price/rating: products are sold by inquiry, and no ratings exist.
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageIntro
        id="proizvod-title"
        title={p.name}
        text={p.summary}
        crumbs={[
          { name: "Naslovna", path: "/" },
          { name: "Ponuda", path: "/ponuda" },
          { name: c.name, path: categoryHref(c) },
          { name: p.name, path: productHref(p) },
        ]}
        thumb={rest[0]}
        wide={lead}
        wideCaption={lead ? [p.tagline, credit(lead)] : undefined}
      >
        <Link href={`/kontakt?proizvod=${p.slug}#upit`} className="link">
          Zatražite ponudu
        </Link>
      </PageIntro>

      {/* Description + verified specification table */}
      <section className="shell pt-24 md:pt-36" aria-labelledby="opis-title">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-6">
            <h2 id="opis-title" className="sr-only">
              Opis
            </h2>
            <p className="t-statement indent" data-reveal="" suppressHydrationWarning>
              {p.description[0]}
            </p>
            {p.description.slice(1).map((d, i) => (
              <p key={i} className="t-body mt-6 max-w-[52ch] text-ink/80">
                {d}
              </p>
            ))}
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <h2 className="t-caption mb-3 text-mute">Podaci o proizvodu</h2>
            <dl className="border-t border-line-strong">
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-6 border-b border-line py-3">
                  <dt className="t-small text-mute">{r.label}</dt>
                  <dd className="t-small">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="t-caption mt-4 text-mute">Dimenzije, klase i završne obrade provjerite u salonu.</p>
          </div>
        </div>
      </section>

      {/* Range lists (e.g. Chimiver) */}
      {p.range?.length ? (
        <section className="shell pt-24 md:pt-32" aria-labelledby="asortiman-title">
          <div className="grid-12 gap-y-6">
            <h2 id="asortiman-title" className="t-caption col-span-4 text-mute md:col-span-3">
              Asortiman
            </h2>
            <div className="col-span-4 grid gap-x-[var(--col-gap)] gap-y-10 sm:grid-cols-2 md:col-span-8 md:col-start-5">
              {p.range.map((g) => (
                <div key={g.title}>
                  <h3 className="t-body border-b border-line-strong pb-2">{g.title}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it} className="t-small border-b border-line py-2.5 text-ink/80">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Remaining images, asymmetric pair */}
      {rest.length > 1 ? (
        <section className="shell pt-24 md:pt-32" aria-label="Fotografije">
          <div className="grid-12 items-end gap-y-8">
            <Photo id={rest[1]} sizes="(min-width: 768px) 48vw, 100vw" className="col-span-4 md:col-span-6" frameClassName="aspect-[4/3]" caption={credit(rest[1])} />
            {rest[2] ? (
              <Photo id={rest[2]} sizes="(min-width: 768px) 24vw, 60vw" className="col-span-3 md:col-span-3 md:col-start-10" frameClassName="aspect-square" caption={credit(rest[2])} />
            ) : null}
          </div>
        </section>
      ) : null}

      <InquiryLine subject={p.manufacturers?.length ? p.name : p.name.charAt(0).toLowerCase() + p.name.slice(1)} productSlug={p.slug} />

      {related.length ? (
        <nav className="shell pt-20 md:pt-28" aria-label="Povezani proizvodi">
          <p className="t-caption text-mute">Povezano</p>
          <ul className="t-small mt-3 flex flex-wrap gap-x-8 gap-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={productHref(r)} className="link-hover">
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
