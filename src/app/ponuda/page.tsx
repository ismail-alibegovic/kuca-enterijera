import type { Metadata } from "next";
import Link from "next/link";
import { InquiryLine } from "@/components/page/InquiryLine";
import { PageIntro } from "@/components/page/PageIntro";
import { Photo, credit } from "@/components/ui/Photo";
import { categories, categoryHref, productHref, productsInCategory, type Category } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ponuda: parketi, podne obloge, sigurnosna vrata",
  description:
    "Dvoslojni, troslojni i masivni parketi, PVC i tekstilni podovi, WPC vanjske obloge, sigurnosna vrata Dierre, kancelarijski namještaj te ljepila i lakovi Chimiver. Salon u Sarajevu.",
  path: "/ponuda",
  image: "oakPlanks",
});

/** Per-category art direction: image column and proportion differ so no two rows look alike. */
const layout: Record<string, { image: string; frame: string; text: string; sizes: string }> = {
  parketi: { image: "md:col-span-7", frame: "aspect-[4/3]", text: "md:col-span-4 md:col-start-9", sizes: "(min-width: 768px) 56vw, 100vw" },
  "pvc-i-tekstilni-podovi": { image: "md:col-span-4 md:col-start-9 md:row-start-1", frame: "aspect-[4/5]", text: "md:col-span-5 md:row-start-1", sizes: "(min-width: 768px) 32vw, 100vw" },
  "sigurnosna-vrata": { image: "md:col-span-6", frame: "aspect-[16/10]", text: "md:col-span-4 md:col-start-8", sizes: "(min-width: 768px) 48vw, 100vw" },
  "ljepila-lakovi-i-njega": { image: "md:col-span-3 md:col-start-10 md:row-start-1", frame: "aspect-square", text: "md:col-span-5 md:col-start-3 md:row-start-1", sizes: "(min-width: 768px) 24vw, 100vw" },
};

function CategoryRow({ c }: { c: Category }) {
  const l = layout[c.slug];
  const lines = productsInCategory(c.slug);
  return (
    <article className="grid-12 items-end gap-y-8 pt-24 md:pt-36" aria-labelledby={`k-${c.slug}`}>
      {c.hero ? (
        <Link href={categoryHref(c)} className={`group col-span-4 ${l.image}`} tabIndex={-1} aria-hidden>
          <Photo id={c.hero} sizes={l.sizes} frameClassName={l.frame} zoom caption={credit(c.hero)} />
        </Link>
      ) : null}
      <div className={`col-span-4 ${l.text}`}>
        <p className="t-caption text-mute">{c.kicker}</p>
        <h2 id={`k-${c.slug}`} className="t-statement mt-3">
          <Link href={categoryHref(c)} className="link-hover">
            {c.name}
          </Link>
        </h2>
        <p className="t-small mt-4 max-w-[40ch] text-ink/80">{c.intro}</p>
        {lines.length > 1 ? (
          <ul className="mt-6 border-t border-line">
            {lines.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={productHref(p)} className="t-small link-hover block w-fit py-2.5">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <Link href={categoryHref(c)} className="t-small link mt-6 inline-block">
          Pogledajte {c.short.toLowerCase()}
        </Link>
      </div>
    </article>
  );
}

export default function OfferPage() {
  const withImage = categories.filter((c) => c.hero);
  const textOnly = categories.filter((c) => !c.hero);
  return (
    <>
      <PageIntro
        id="ponuda-title"
        title={
          <>
            Ponuda —
            <br />
            šest grupa proizvoda
          </>
        }
        text="Parketi, podne obloge, sigurnosna vrata, kancelarijski namještaj te ljepila i lakovi za drvene podove. Prodajemo isključivo proizvode svjetski priznatih i domaćih proizvođača, a dio asortimana možete pogledati u salonu."
        crumbs={[
          { name: "Naslovna", path: "/" },
          { name: "Ponuda", path: "/ponuda" },
        ]}
        thumb="oakPlanks"
      >
        <Link href="/kontakt#upit" className="link">
          Zatražite ponudu
        </Link>
      </PageIntro>

      <div className="shell">
        {withImage.map((c) => (
          <CategoryRow key={c.slug} c={c} />
        ))}

        <section className="pt-24 md:pt-36" aria-labelledby="takodjer-title">
          <div className="grid-12 gap-y-6">
            <h2 id="takodjer-title" className="t-caption col-span-4 text-mute md:col-span-3">
              Također u ponudi
            </h2>
            <ul className="col-span-4 border-t border-line-strong md:col-span-7 md:col-start-6">
              {textOnly.map((c) => (
                <li key={c.slug} className="border-b border-line">
                  <Link href={categoryHref(c)} className="group grid gap-x-6 gap-y-1 py-6 md:grid-cols-[1fr_1fr_auto]">
                    <span className="t-h3 link-hover justify-self-start">{c.name}</span>
                    <span className="t-small text-ink/75">{c.intro}</span>
                    <span aria-hidden className="t-small hidden md:block">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <InquiryLine subject="neki od proizvoda" />
    </>
  );
}
