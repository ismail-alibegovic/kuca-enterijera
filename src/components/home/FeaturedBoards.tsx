import { SampleBoard } from "@/components/catalog/SampleBoard";
import { Cta } from "@/components/ui/Cta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { productBySlug } from "@/content/catalog";

const featured = ["dvoslojni-i-troslojni-parket", "klasicni-masivni-parket", "egzoticni-masivni-parket", "dierre-sigurnosna-vrata"];
// Staggered like boards leaning against a showroom wall.
const offsets = ["md:mt-0", "md:mt-28", "md:mt-12", "md:mt-40"];

export function FeaturedBoards() {
  return (
    <section aria-labelledby="uzorci-title" className="relative bg-paper-2 py-24 md:py-36">
      <div className="shell">
        <div className="grid-12 gap-y-6">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel index="04">Iz ponude</SectionLabel>
          </div>
          <h2 id="uzorci-title" className="t-h1 col-span-4 md:col-span-6" suppressHydrationWarning data-reveal="up">
            Uzorci koje ćete <span className="t-serif-italic">poželjeti dodirnuti</span>
          </h2>
          <p className="t-body col-span-4 text-ink/75 md:col-span-3" suppressHydrationWarning data-reveal="up">
            Izdvojene linije proizvoda. Pravi uzorci, boje i dimenzije čekaju vas u salonu.
          </p>
        </div>

        <div className="-mx-[var(--gutter)] mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-6 [scrollbar-width:thin] md:mx-0 md:grid md:grid-cols-4 md:gap-[var(--col-gap)] md:overflow-visible md:px-0 md:pb-0">
          {featured.map((slug, i) => (
            <div key={slug} className={`w-[78vw] shrink-0 snap-start sm:w-[46vw] md:w-auto ${offsets[i]}`}>
              <SampleBoard product={productBySlug[slug]} number={String(i + 1).padStart(2, "0")} aspect="aspect-[3/4]" sizes="(min-width: 768px) 24vw, 78vw" delay={i * 110} />
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-start md:justify-end">
          <Cta href="/kolekcije" variant="outline">
            Sve linije proizvoda
          </Cta>
        </div>
      </div>
    </section>
  );
}
