import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { categoryHref, productHref, products } from "@/content/catalog";

/**
 * Reference "A language of lines and light" section: statement top-left, a small text and a round
 * arrow link at the bottom-left, a large photograph on the right with a smaller one set inside it.
 * Parquet gets this, the largest feature on the page.
 */
export function ParquetFeature() {
  const lines = products.filter((p) => p.category === "parketi");
  return (
    <section className="shell pt-28 md:pt-44" aria-labelledby="parket-title">
      <div className="grid-12 gap-y-12">
        <div className="col-span-4 flex flex-col md:col-span-5">
          <h2 id="parket-title" className="t-statement indent" data-reveal="" suppressHydrationWarning>
            Parket je srce naše ponude — dvoslojni, troslojni i masivni, od domaćih i egzotičnih vrsta drveta.
          </h2>

          <ul className="mt-10 border-t border-line md:mt-14">
            {lines.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={productHref(p)} className="group flex items-baseline justify-between gap-6 py-3.5">
                  <span className="t-body link-hover">{p.name}</span>
                  <span className="t-caption text-right text-mute">{p.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex items-end justify-between gap-8 md:mt-auto md:pt-16">
            <p className="t-small max-w-[36ch] text-ink/80">
              Hrast, jasen, javor, bukva, bagrem, parena trešnja, parena kruška, pareni orah i kesten, a od egzotičnih
              vrsta jatoba, afrički teak i wenge. Za postavljanje i njegu nudimo ljepila, lakove i ulja Chimiver.
            </p>
            <Link
              href={categoryHref("parketi")}
              aria-label="Parketi: pogledajte ponudu"
              className="flex size-16 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper md:size-20"
            >
              <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 14L14 4M6 4h8v8" stroke="currentColor" strokeWidth="1" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="relative col-span-4 md:col-span-6 md:col-start-7">
          <Photo
            id="oiledFloor"
            sizes="(min-width: 768px) 48vw, 100vw"
            frameClassName="aspect-[4/5] md:aspect-[1/1.02]"
            caption="Drveni pod zaštićen uljem i lakom · Foto: Chimiver"
          />
          <Photo
            id="adhesiveTrowel"
            sizes="(min-width: 768px) 26vw, 55vw"
            className="absolute top-[10%] left-0 w-[56%] md:left-[12%] md:w-[54%]"
            frameClassName="aspect-[1.25/1]"
            focus="40% 45%"
            delay={200}
          />
        </div>
      </div>
    </section>
  );
}
