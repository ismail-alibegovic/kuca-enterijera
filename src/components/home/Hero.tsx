import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/content/site";

/**
 * Reference hero: a two-line headline left, a small photo with a short text in the column at ~60%,
 * then one wide architectural photograph across the full content width with three captions below.
 */
export function Hero() {
  return (
    <section className="shell pt-10 md:pt-16 lg:pt-20" aria-labelledby="hero-title">
      <div className="grid-12 gap-y-8">
        <h1 id="hero-title" className="t-display col-span-4 md:col-span-7">
          Plemenito drvo —
          <br />
          Pod koji traje
        </h1>

        <div className="col-span-4 grid grid-cols-4 gap-x-[var(--col-gap)] md:col-span-4 md:col-start-8 md:grid-cols-4">
          <Photo
            id="oakPlanks"
            preload
            sizes="(min-width: 768px) 14vw, 45vw"
            className="col-span-2"
            frameClassName="aspect-[3/2]"
            reveal={false}
          />
          <div className="col-span-4 mt-5 md:col-span-3">
            <p className="t-small text-ink/80">
              {site.tagline}. Parketi, podne obloge i sigurnosna vrata svjetski priznatih proizvođača — izloženi u našem
              salonu u Sarajevu.
            </p>
            <p className="t-small mt-3 flex gap-6">
              <Link href="/ponuda" className="link">
                Pogledajte ponudu
              </Link>
              <Link href="/kontakt#upit" className="link-hover">
                Zatražite ponudu
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Photo
        id="oakFloorChair"
        preload
        sizes="100vw"
        className="mt-10 md:mt-16 lg:mt-20"
        frameClassName="aspect-[4/3] sm:aspect-[16/9] md:aspect-[2.45/1]"
        reveal={false}
      />
      <div className="grid-12 t-caption mt-2.5 gap-y-1 text-mute">
        <p className="col-span-2 md:col-span-3">Parketni centar</p>
        <p className="col-span-2 text-right md:col-span-3 md:col-start-8 md:text-left">Hrastov parket · Foto: Lalegno</p>
        <p className="hidden text-right md:col-span-2 md:col-start-11 md:block">
          {site.showroom.street}, {site.showroom.city}
        </p>
      </div>
    </section>
  );
}
