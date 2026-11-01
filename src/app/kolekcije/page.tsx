import type { Metadata } from "next";
import { PlankStrip } from "@/components/catalog/PlankStrip";
import { ProductExplorer } from "@/components/catalog/ProductExplorer";
import { ShowroomCta } from "@/components/home/ShowroomCta";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Lines } from "@/components/ui/Lines";
import { products } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kolekcije: parketi, podne obloge i sigurnosna vrata",
  description:
    "Pregled ponude Kuće Enterijera: troslojni, dvoslojni i masivni parketi, PVC i tekstilni podovi, WPC vanjske obloge, Dierre sigurnosna vrata, kancelarijski namještaj i Chimiver ljepila i lakovi.",
  path: "/kolekcije",
  image: "herringbonePortrait",
});

export default function CollectionsPage() {
  return (
    <>
      <section className="shell pt-8 pb-12 md:pb-16" aria-labelledby="kolekcije-h1">
        <Breadcrumbs items={[{ name: "Početna", path: "/" }, { name: "Kolekcije", path: "/kolekcije" }]} />
        <div className="grid-12 mt-10 items-end gap-y-6 md:mt-14">
          <Lines as="h1" id="kolekcije-h1" className="t-mega col-span-4 md:col-span-8" lines={["Kolekcije"]} />
          <p className="t-lead col-span-4 max-w-[40ch] text-ink/80 md:col-span-4 md:pb-3" suppressHydrationWarning data-reveal="up">
            Šest kolekcija i {products.length} linija proizvoda, od parketa do sigurnosnih vrata. Filtrirajte po primjeni i materijalu ili otvorite kolekciju.
          </p>
        </div>
      </section>

      <section className="shell" aria-label="Kolekcije">
        <PlankStrip />
      </section>

      <section className="shell py-20 md:py-28" aria-labelledby="sve-linije">
        <div className="grid-12 mb-10 items-end gap-y-4">
          <h2 id="sve-linije" className="t-h1 col-span-4 md:col-span-7" suppressHydrationWarning data-reveal="up">
            Sve linije proizvoda
          </h2>
          <p className="t-small col-span-4 text-mute md:col-span-4 md:col-start-9">
            Katalog prikazuje linije proizvoda. Pojedinačne modele, dekore, dimenzije i dostupnost provjerite u salonu ili putem upita.
          </p>
        </div>
        <ProductExplorer products={products} facets={["category", "application", "material"]} />
      </section>

      <ShowroomCta />
    </>
  );
}
