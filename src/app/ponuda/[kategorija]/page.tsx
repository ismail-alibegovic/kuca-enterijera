import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryLine } from "@/components/page/InquiryLine";
import { PageIntro } from "@/components/page/PageIntro";
import { credit } from "@/components/ui/Photo";
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
import { pageMetadata } from "@/lib/seo";

/**
 * Every real slug is prerendered via generateStaticParams. Unknown slugs are turned into a real 404
 * by src/proxy.ts.
 */
export const instant = false;

export function generateStaticParams() {
  return categories.map((c) => ({ kategorija: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ponuda/[kategorija]">): Promise<Metadata> {
  const { kategorija } = await params;
  const c = categoryBySlug[kategorija];
  if (!c) return {};
  return pageMetadata({ title: c.seoTitle, description: c.seoDescription, path: categoryHref(c), image: c.hero });
}

export default async function CategoryPage({ params }: PageProps<"/ponuda/[kategorija]">) {
  const { kategorija } = await params;
  const c = categoryBySlug[kategorija];
  if (!c) notFound();

  const items = productsInCategory(c.slug);
  const makers = Array.from(new Set(items.flatMap((p) => p.manufacturers ?? []))).map((m) => manufacturerBySlug[m]);
  const catSpecies = Array.from(new Set(items.flatMap((p) => p.species ?? [])));
  const others = categories.filter((x) => x.slug !== c.slug);

  return (
    <>
      <PageIntro
        id="kategorija-title"
        title={c.name}
        text={c.intro}
        crumbs={[
          { name: "Naslovna", path: "/" },
          { name: "Ponuda", path: "/ponuda" },
          { name: c.name, path: categoryHref(c) },
        ]}
        thumb={c.heroAlt}
        wide={c.hero}
        wideCaption={c.hero ? [c.kicker, credit(c.hero)] : undefined}
      >
        <Link href={`/kontakt?proizvod=${items[0].slug}#upit`} className="link">
          Zatražite ponudu
        </Link>
      </PageIntro>

      {/* Editorial text */}
      <section className="shell pt-24 md:pt-36" aria-labelledby="o-kategoriji">
        <div className="grid-12 gap-y-8">
          <h2 id="o-kategoriji" className="sr-only">
            O kategoriji
          </h2>
          <p className="t-statement indent col-span-4 md:col-span-7" data-reveal="" suppressHydrationWarning>
            {c.body[0]}
          </p>
          {c.body[1] ? <p className="t-small col-span-4 max-w-[38ch] text-ink/80 md:col-span-3 md:col-start-10 md:self-end">{c.body[1]}</p> : null}
        </div>
      </section>

      {/* Product lines */}
      <section className="shell pt-24 md:pt-32" aria-labelledby="linije-title">
        <div className="grid-12 gap-y-6">
          <h2 id="linije-title" className="t-caption col-span-4 text-mute md:col-span-3">
            {items.length > 1 ? "Linije proizvoda" : "Proizvod"}
          </h2>
          <ul className="col-span-4 border-t border-line-strong md:col-span-8 md:col-start-5">
            {items.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={productHref(p)} className="group grid gap-x-8 gap-y-2 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:py-7">
                  <span>
                    <span className="t-h3 link-hover">{p.name}</span>
                    <span className="t-caption mt-1 block text-mute">{p.applications.map((a) => applicationLabels[a]).join(" · ")}</span>
                  </span>
                  <span className="t-small text-ink/80">{p.summary}</span>
                  <span aria-hidden className="t-small hidden transition-transform duration-500 group-hover:translate-x-1 md:block">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Wood species (parquet only) */}
      {catSpecies.length ? (
        <section className="shell pt-24 md:pt-32" aria-labelledby="vrste-title">
          <div className="grid-12 gap-y-6">
            <div className="col-span-4 md:col-span-3">
              <h2 id="vrste-title" className="t-caption text-mute">
                Vrste drveta
              </h2>
              <p className="t-caption mt-3 max-w-[30ch] text-mute">Dostupnost pojedinih vrsta i klasa provjerite u salonu.</p>
            </div>
            {(["domace", "egzoticno"] as const).map((o) => {
              const list = species.filter((s) => s.origin === o && catSpecies.includes(s.slug));
              return (
                <div key={o} className={`col-span-4 md:col-span-4 ${o === "domace" ? "md:col-start-5" : ""}`}>
                  <p className="t-small border-b border-line-strong pb-2 text-mute">{o === "domace" ? "Domaće vrste" : "Egzotične vrste"}</p>
                  <ul>
                    {list.map((s) => (
                      <li key={s.slug} className="t-body border-b border-line py-2.5">
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Manufacturer (only where verified) */}
      {makers.length ? (
        <section className="shell pt-24 md:pt-32" aria-labelledby="proizvodjac-title">
          <div className="grid-12 items-center gap-y-6">
            <h2 id="proizvodjac-title" className="t-caption col-span-4 text-mute md:col-span-3">
              Proizvođač
            </h2>
            {makers.map((m) => (
              <div key={m.slug} className="col-span-4 flex items-center gap-8 border-y border-line py-6 md:col-span-8 md:col-start-5">
                {m.logo ? <Image src={m.logo.src} alt={m.name} width={m.logo.width} height={m.logo.height} className="h-12 w-auto opacity-80" /> : null}
                <p className="t-small text-ink/80">{m.segment ?? m.name}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <InquiryLine subject={c.name.toLowerCase()} productSlug={items[0].slug} />

      <nav className="shell pt-20 md:pt-28" aria-label="Ostale kategorije">
        <p className="t-caption text-mute">Ostalo iz ponude</p>
        <ul className="t-small mt-3 flex flex-wrap gap-x-8 gap-y-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={categoryHref(o)} className="link-hover">
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
