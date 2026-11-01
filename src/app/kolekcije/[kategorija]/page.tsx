import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ComparisonTable } from "@/components/catalog/ComparisonTable";
import { InquiryBand } from "@/components/catalog/InquiryBand";
import { ProductExplorer, type FacetKey } from "@/components/catalog/ProductExplorer";
import { SpeciesChips, toneDisclaimer } from "@/components/catalog/SpeciesChips";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Cta } from "@/components/ui/Cta";
import { Lines } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  applicationLabels,
  categories,
  categoryBySlug,
  categoryHref,
  manufacturerBySlug,
  productHref,
  productsInCategory,
  species,
} from "@/content/catalog";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

/**
 * Every real slug is prerendered via generateStaticParams, so navigation to them is instant.
 * Unknown slugs may block so that notFound() can return a real 404 status (no streamed 200 shell).
 */
export const instant = false;

export function generateStaticParams() {
  return categories.map((c) => ({ kategorija: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/kolekcije/[kategorija]">): Promise<Metadata> {
  const { kategorija } = await params;
  const c = categoryBySlug[kategorija];
  if (!c) return {};
  return pageMetadata({ title: c.seoTitle, description: c.seoDescription, path: categoryHref(c), image: c.hero });
}

/** Category-specific filtering: facets only where the data makes them meaningful. */
const facetsFor: Record<string, FacetKey[]> = {
  parketi: ["construction", "origin", "species"],
  "pvc-i-tekstilni-podovi": ["material", "application"],
};

export default async function CategoryPage({ params }: PageProps<"/kolekcije/[kategorija]">) {
  const { kategorija } = await params;
  const c = categoryBySlug[kategorija];
  if (!c) notFound();

  const items = productsInCategory(c.slug);
  const single = items.length === 1 ? items[0] : undefined;
  const makers = Array.from(new Set(items.flatMap((p) => p.manufacturers ?? []))).map((m) => manufacturerBySlug[m]);
  const catSpecies = Array.from(new Set(items.flatMap((p) => p.species ?? [])));
  const idx = categories.findIndex((x) => x.slug === c.slug);
  const next = [1, 2, 3].map((o) => categories[(idx + o) % categories.length]);

  return (
    <>
      {/* Hero */}
      <section className="shell pt-8 pb-16 md:pb-24" aria-labelledby="cat-title">
        <Breadcrumbs
          items={[
            { name: "Početna", path: "/" },
            { name: "Kolekcije", path: "/kolekcije" },
            { name: c.name, path: categoryHref(c) },
          ]}
        />
        <div className="grid-12 mt-10 gap-y-10 md:mt-14">
          <div className="col-span-4 flex flex-col md:col-span-6">
            <p className="t-label flex items-center gap-3" suppressHydrationWarning data-reveal="fade">
              <span className="t-index tracking-normal text-mute">Nº {c.index}</span>
              <span aria-hidden className="h-px w-8 bg-current opacity-40" />
              {c.kicker}
            </p>
            <Lines as="h1" id="cat-title" className="t-display mt-8" lines={c.name.split(" i ").length === 2 && c.name.length > 16 ? [c.name.split(" i ")[0], <span key="2" className="t-serif-italic">i {c.name.split(" i ")[1]}</span>] : [c.name]} />
            <p className="t-lead mt-8 max-w-[44ch] text-ink/80" suppressHydrationWarning data-reveal="up" style={{ "--d": 200 } as CSSProperties}>
              {c.intro}
            </p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6" suppressHydrationWarning data-reveal="up" style={{ "--d": 300 } as CSSProperties}>
              <Cta href={single ? productHref(single) : "#linije"}>{single ? "Pogledajte proizvod" : "Linije proizvoda"}</Cta>
              <Cta href={`/kontakt?proizvod=${items[0].slug}#upit`} variant="line">
                Zatražite ponudu
              </Cta>
            </div>
            {c.heroAlt ? (
              <div className="mt-auto hidden w-[42%] pt-16 md:block">
                <Photo id={c.heroAlt} sizes="20vw" className="aspect-[4/5]" delay={400} tag />
              </div>
            ) : null}
          </div>
          <div className="col-span-4 md:col-span-6">
            <Photo id={c.hero} preload sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5] md:aspect-[5/6]" tag parallax />
          </div>
        </div>
      </section>

      {/* Editorial context */}
      <section className="border-t border-ink" aria-labelledby="o-kategoriji">
        <div className="shell grid-12 gap-y-8 py-20 md:py-28">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel>O kolekciji</SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-8 md:col-start-5">
            <h2 id="o-kategoriji" className="t-statement" suppressHydrationWarning data-reveal="up">
              {c.body[0]}
            </h2>
            {c.body.slice(1).map((b, i) => (
              <p key={i} className="t-lead mt-8 max-w-[60ch] text-ink/75" suppressHydrationWarning data-reveal="up">
                {b}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Product lines */}
      {single ? (
        <section id="linije" className="bg-paper-2" aria-labelledby="proizvod-title">
          <div className="shell grid-12 gap-y-10 py-20 md:py-28">
            <Link href={productHref(single)} className="group col-span-4 md:col-span-7">
              <Photo id={single.images[1] ?? single.images[0]} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[16/11]" zoom tag />
            </Link>
            <div className="col-span-4 flex flex-col md:col-span-4 md:col-start-9">
              <SectionLabel>Linija proizvoda</SectionLabel>
              <h2 id="proizvod-title" className="t-h1 mt-6">
                <Link href={productHref(single)} className="link-reveal">
                  {single.name}
                </Link>
              </h2>
              <p className="t-body mt-5 text-ink/75">{single.summary}</p>
              <dl className="mt-8 border-t border-line">
                <div className="flex justify-between gap-6 border-b border-line py-3">
                  <dt className="t-label text-mute">Primjena</dt>
                  <dd className="t-small text-right">{single.applications.map((a) => applicationLabels[a]).join(", ")}</dd>
                </div>
                {single.specs?.map((s) => (
                  <div key={s.label} className="flex justify-between gap-6 border-b border-line py-3">
                    <dt className="t-label shrink-0 text-mute">{s.label}</dt>
                    <dd className="t-small text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <Cta href={productHref(single)}>Detalji proizvoda</Cta>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section id="linije" className="shell py-20 md:py-28" aria-labelledby="linije-title">
          <div className="grid-12 mb-10 items-end gap-y-4">
            <h2 id="linije-title" className="t-h1 col-span-4 md:col-span-7" suppressHydrationWarning data-reveal="up">
              Linije proizvoda <span className="t-serif-italic">· {String(items.length).padStart(2, "0")}</span>
            </h2>
            <p className="t-small col-span-4 text-mute md:col-span-4 md:col-start-9">
              Filtrirajte prema {facetsFor[c.slug]?.length ? "konstrukciji, porijeklu i vrsti" : "primjeni"}. Kombinacije bez rezultata su onemogućene.
            </p>
          </div>
          <ProductExplorer products={items} facets={facetsFor[c.slug] ?? ["application"]} />
        </section>
      )}

      {/* Species index (wood categories) */}
      {catSpecies.length ? (
        <section className="border-t border-line" aria-labelledby="vrste-title">
          <div className="shell grid-12 gap-y-8 py-20 md:py-28">
            <div className="col-span-4 md:col-span-4">
              <SectionLabel>Indeks vrsta</SectionLabel>
              <h2 id="vrste-title" className="t-h2 mt-6">
                {catSpecies.length} vrsta drveta <span className="t-serif-italic">u ponudi</span>
              </h2>
              <p className="t-small mt-6 max-w-[40ch] text-mute">{toneDisclaimer}</p>
            </div>
            <div className="col-span-4 md:col-span-7 md:col-start-6">
              {(["domace", "egzoticno"] as const).map((o) => {
                const list = species.filter((s) => s.origin === o && catSpecies.includes(s.slug)).map((s) => s.slug);
                if (!list.length) return null;
                return (
                  <div key={o} className="mb-10 last:mb-0">
                    <p className="t-label mb-4 text-mute">{o === "domace" ? "Domaće vrste" : "Egzotične vrste"}</p>
                    <SpeciesChips slugs={list} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Comparison */}
      {items.length > 1 ? (
        <section className="border-t border-line" aria-labelledby="usporedba-title">
          <div className="shell py-20 md:py-28">
            <div className="grid-12 mb-10 gap-y-4">
              <div className="col-span-4 md:col-span-4">
                <SectionLabel>Usporedba</SectionLabel>
              </div>
              <h2 id="usporedba-title" className="t-h2 col-span-4 md:col-span-7 md:col-start-6">
                Linije jedna uz drugu
              </h2>
            </div>
            <ComparisonTable items={items} />
          </div>
        </section>
      ) : null}

      {/* Manufacturers (only where verified) */}
      {makers.length ? (
        <section className="border-t border-line" aria-labelledby="proizvodjac-title">
          <div className="shell grid-12 items-center gap-y-8 py-16 md:py-20">
            <div className="col-span-4 md:col-span-3">
              <SectionLabel>Proizvođač</SectionLabel>
            </div>
            {makers.map((m) => (
              <div key={m.slug} className="col-span-4 flex items-center gap-8 md:col-span-8 md:col-start-5">
                {m.logo ? (
                  <Image src={m.logo.src} alt={m.name} width={m.logo.width} height={m.logo.height} className="h-14 w-auto" />
                ) : null}
                <div>
                  <h2 id="proizvodjac-title" className="t-h3">
                    {m.name}
                  </h2>
                  {m.segment ? <p className="t-small text-mute">{m.segment}</p> : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <InquiryBand title={`Zatražite ponudu:`} italic={c.name.toLowerCase() + "."} productSlug={items[0].slug} />

      {/* Next collections */}
      <section className="shell py-20 md:py-24" aria-labelledby="dalje-title">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 id="dalje-title" className="t-label">
            Ostale kolekcije
          </h2>
          <Link href="/kolekcije" className="t-label link-line">
            Sve kolekcije →
          </Link>
        </div>
        <ul className="grid gap-[var(--col-gap)] md:grid-cols-3">
          {next.map((n) => (
            <li key={n.slug}>
              <Link href={categoryHref(n)} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-2 img-zoom">
                  <Image src={media[n.hero].src} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" quality={70} className="object-cover" style={{ objectPosition: media[n.hero].focus }} />
                </div>
                <p className="mt-3 flex items-baseline gap-3">
                  <span className="t-index text-mute">{n.index}</span>
                  <span className="t-h3 link-reveal">{n.name}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
