import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { categoryHref, productHref, productBySlug } from "@/content/catalog";

/**
 * Mirror of the reference's section 2: statement and a small photograph on the left,
 * a tall photograph on the right. Resilient and textile floors.
 */
export function Floors() {
  const pvc = productBySlug["pvc-podne-obloge"];
  const textile = productBySlug["tekstilni-podovi"];
  return (
    <section className="shell pt-28 md:pt-44" aria-labelledby="podovi-title">
      <div className="grid-12 gap-y-12">
        <div className="col-span-4 flex flex-col md:col-span-6">
          <h2 id="podovi-title" className="t-statement indent" data-reveal="" suppressHydrationWarning>
            <span className="italic">PVC i tekstilne</span> podne obloge za stanove, urede i hotele — trajne, tople i
            prilagođene namjeni prostora.
          </h2>

          <div className="mt-14 grid grid-cols-6 items-end gap-x-[var(--col-gap)] gap-y-8 md:mt-auto md:pt-16">
            <Photo
              id="carpetOffice"
              sizes="(min-width: 768px) 16vw, 50vw"
              className="col-span-3 sm:col-span-2"
              frameClassName="aspect-[1/1.1]"
              caption="Tekstilne ploče · Foto: Modulyss"
            />
            <div className="col-span-6 sm:col-span-3 sm:col-start-4">
              <p className="t-small text-ink/80">
                PVC podovi uz pravilno odabranu kvalitetu i stručnu ugradnju mogu trajati oko dvadeset godina. Tekstilne
                obloge dolaze u velikom izboru gramatura, tkanja, dizajna i boja.
              </p>
              <p className="t-small mt-4 flex flex-wrap gap-x-6 gap-y-1">
                <Link href={productHref(pvc)} className="link">
                  PVC podne obloge
                </Link>
                <Link href={productHref(textile)} className="link">
                  Tekstilni podovi
                </Link>
              </p>
            </div>
          </div>
        </div>

        <Link href={categoryHref("pvc-i-tekstilni-podovi")} className="group col-span-4 md:col-span-5 md:col-start-8">
          <Photo
            id="lvtRestaurant"
            sizes="(min-width: 768px) 40vw, 100vw"
            frameClassName="aspect-[4/5] md:aspect-[7/8]"
            zoom
            caption="Elastična LVT podna obloga · Foto: Modulyss"
          />
        </Link>
      </div>
    </section>
  );
}
