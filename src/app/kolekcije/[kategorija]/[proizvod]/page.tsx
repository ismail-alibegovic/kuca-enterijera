import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Gallery } from "@/components/catalog/Gallery";
import { InquiryBand } from "@/components/catalog/InquiryBand";
import { SampleBoard } from "@/components/catalog/SampleBoard";
import { SpeciesChips, toneDisclaimer } from "@/components/catalog/SpeciesChips";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Cta } from "@/components/ui/Cta";
import { SectionLabel } from "@/components/ui/SectionLabel";
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
} from "@/content/catalog";
import { media } from "@/content/media";
import { primaryPhone } from "@/content/site";
import { absolute, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ kategorija: p.category, proizvod: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/kolekcije/[kategorija]/[proizvod]">): Promise<Metadata> {
  const { kategorija, proizvod } = await params;
  const p = productBySlug[proizvod];
  if (!p || p.category !== kategorija) return {};
  return pageMetadata({
    title: `${p.name}, Sarajevo`,
    description: p.summary,
    path: productHref(p),
    image: p.images[0],
  });
}

export default async function ProductPage({ params }: PageProps<"/kolekcije/[kategorija]/[proizvod]">) {
  const { kategorija, proizvod } = await params;
  const p = productBySlug[proizvod];
  if (!p || p.category !== kategorija) notFound();
  const c = categoryBySlug[p.category];
  const makers = (p.manufacturers ?? []).map((m) => manufacturerBySlug[m]);
  const related = p.related.map((s) => productBySlug[s]).filter(Boolean);

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Kolekcija", value: c.name },
    { label: "Materijal", value: materialLabels[p.material] },
  ];
  if (p.constructions?.length) rows.push({ label: "Konstrukcija", value: p.constructions.map((x) => constructionLabels[x]).join(", ") });
  rows.push({ label: "Primjena", value: p.applications.map((a) => applicationLabels[a]).join(", ") });
  if (makers.length) rows.push({ label: "Proizvođač", value: makers.map((m) => m.name).join(", ") });
  if (p.species?.length) rows.push({ label: "Vrste drveta", value: `${p.species.length} vrsta, vidi indeks ispod` });
  p.specs?.forEach((s) => rows.push({ label: s.label, value: s.value }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.summary,
    category: c.name,
    image: p.images.map((k) => absolute(media[k].src.src)),
    url: absolute(productHref(p)),
    ...(makers.length ? { brand: { "@type": "Brand", name: makers[0].name } } : {}),
    // No offers/price/rating: products are sold by inquiry, and no ratings exist.
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="shell pt-8 pb-20 md:pb-28">
        <Breadcrumbs
          items={[
            { name: "Početna", path: "/" },
            { name: "Kolekcije", path: "/kolekcije" },
            { name: c.name, path: categoryHref(c) },
            { name: p.name, path: productHref(p) },
          ]}
        />

        <div className="grid-12 mt-10 gap-y-14 md:mt-12">
          <div className="col-span-4 md:col-span-7">
            <Gallery images={p.images} name={p.name} />
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            <div className="md:sticky md:top-[calc(var(--header-h)+1.5rem)]">
              <p className="t-label flex items-center gap-3 text-mute">
                <span className="t-index tracking-normal">Nº {c.index}</span>
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                {c.short}
              </p>
              <h1 className="t-h1 mt-6">{p.name}</h1>
              <p className="t-serif-italic mt-3 text-[1.5rem] leading-tight text-oak-deep">{p.tagline}</p>
              <p className="t-body mt-6 text-ink/80">{p.summary}</p>

              {makers.length ? (
                <div className="mt-8 flex items-center gap-4">
                  {makers.map((m) =>
                    m.logo ? <Image key={m.slug} src={m.logo.src} alt={m.name} width={m.logo.width} height={m.logo.height} className="h-10 w-auto" /> : null,
                  )}
                </div>
              ) : null}

              <dl className="mt-8 border-t border-ink">
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-3">
                    <dt className="t-label pt-0.5 text-mute">{r.label}</dt>
                    <dd className="t-small">{r.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3">
                <Cta href={`/kontakt?proizvod=${p.slug}#upit`} className="w-full">
                  Zatražite ponudu za ovaj proizvod
                </Cta>
                <Cta href={primaryPhone.href} variant="outline" className="w-full">
                  Pozovite salon · {primaryPhone.display}
                </Cta>
              </div>
              <p className="t-small mt-5 text-mute">
                Za modele, dekore, dimenzije i tehničke podatke obratite se salonu. Katalog prikazuje linije proizvoda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="border-t border-ink" aria-labelledby="opis-title">
        <div className="shell grid-12 gap-y-8 py-20 md:py-28">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel>Opis</SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-7 md:col-start-5">
            <h2 id="opis-title" className="t-statement" suppressHydrationWarning data-reveal="up">
              {p.description[0]}
            </h2>
            {p.description.slice(1).map((d, i) => (
              <p key={i} className="t-lead mt-8 max-w-[60ch] text-ink/75" suppressHydrationWarning data-reveal="up" style={{ "--d": 120 } as CSSProperties}>
                {d}
              </p>
            ))}
          </div>
        </div>
      </section>

      {p.range?.length ? (
        <section className="border-t border-line" aria-labelledby="asortiman-title">
          <div className="shell grid-12 gap-y-8 py-20 md:py-28">
            <div className="col-span-4 md:col-span-3">
              <SectionLabel>Asortiman</SectionLabel>
              <h2 id="asortiman-title" className="sr-only">
                Asortiman
              </h2>
            </div>
            <div className="col-span-4 grid gap-px bg-line md:col-span-8 md:col-start-5 md:grid-cols-2">
              {p.range.map((r, i) => (
                <div key={r.title} className="bg-paper p-6 md:p-8" suppressHydrationWarning data-reveal="up" style={{ "--d": i * 80 } as CSSProperties}>
                  <p className="t-index text-mute">0{i + 1}</p>
                  <h3 className="t-h3 mt-3">{r.title}</h3>
                  <ul className="t-small mt-4 space-y-2 text-ink/75">
                    {r.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-oak" />
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

      {p.species?.length ? (
        <section className="border-t border-line" aria-labelledby="vrste-title">
          <div className="shell grid-12 gap-y-8 py-20 md:py-28">
            <div className="col-span-4 md:col-span-3">
              <SectionLabel>Vrste drveta</SectionLabel>
            </div>
            <div className="col-span-4 md:col-span-8 md:col-start-5">
              <h2 id="vrste-title" className="t-h2">
                Dostupne vrste <span className="t-serif-italic">· {p.species.length}</span>
              </h2>
              <div className="mt-8">
                <SpeciesChips slugs={p.species} />
              </div>
              <p className="t-small mt-6 max-w-[56ch] text-mute">{toneDisclaimer}</p>
            </div>
          </div>
        </section>
      ) : null}

      <InquiryBand title="Želite vidjeti uzorak?" italic="Dođite u salon ili zatražite ponudu." productSlug={p.slug} />

      {related.length ? (
        <section className="shell py-20 md:py-28" aria-labelledby="povezano-title">
          <h2 id="povezano-title" className="t-h2 mb-12">
            Povezane <span className="t-serif-italic">linije proizvoda</span>
          </h2>
          <div className="grid gap-x-[var(--col-gap)] gap-y-12 md:grid-cols-3">
            {related.map((r, i) => (
              <SampleBoard key={r.slug} product={r} aspect="aspect-[4/3]" delay={i * 90} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
