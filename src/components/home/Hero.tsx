import Link from "next/link";
import type { CSSProperties } from "react";
import { Cta } from "@/components/ui/Cta";
import { Lines } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";
import { PlankGrid } from "@/components/ui/PlankGrid";
import { categories, categoryHref } from "@/content/catalog";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <PlankGrid className="opacity-70" />

      <div className="shell relative">
        {/* Top rail */}
        <div className="grid-12 pt-6 pb-8 md:pt-6 md:pb-6">
          <p className="t-label col-span-3 md:col-span-4" suppressHydrationWarning data-reveal="fade">
            {site.tagline}
          </p>
          <p className="t-index col-span-1 text-right text-mute md:col-span-2 md:col-start-9 md:text-left" suppressHydrationWarning data-reveal="fade">
            Nº 01
          </p>
          <p className="t-label col-span-2 hidden text-right text-mute md:col-start-11 md:block" suppressHydrationWarning data-reveal="fade">
            {site.showroom.street}, {site.showroom.city}
          </p>
        </div>

        {/* Headline × image composition, standing on the floor line */}
        <div className="grid-12 relative border-b border-ink pb-0">
          <Lines
            as="h1"
            id="hero-title"
            className="t-mega col-span-4 md:col-span-7 md:col-start-1 md:row-start-1 md:self-end md:pb-[0.04em]"
            lines={[
              "Prostor",
              <span key="b" className="md:pl-[1.15em]">počinje</span>,
              <span key="c" className="t-serif-italic text-oak-deep md:pl-[0.55em]">
                od poda.
              </span>,
            ]}
          />

          <div className="relative col-span-4 mt-10 md:col-span-4 md:col-start-9 md:row-start-1 md:mt-0">
            <Photo
              id="oakDeskPlaster"
              preload
              sizes="(min-width: 768px) 34vw, 100vw"
              className="aspect-[4/5] md:aspect-auto md:h-[min(60svh,42rem)]"
              tag
            />
          </div>

          {/* Small detail plate, offset like a sample pinned to the wall */}
          <div className="hidden md:col-span-1 md:col-start-8 md:row-start-1 md:block md:self-end" aria-hidden>
            <Photo id="herringbonePortrait" sizes="9vw" className="aspect-[3/4] w-full" delay={450} reveal="rise" />
            <p className="t-index mt-2 mb-3 text-mute">Hrast · riblja kost</p>
          </div>
        </div>

        {/* Beneath the floor line: what we sell, and the two actions */}
        <div className="grid-12 gap-y-10 pt-8 pb-20 md:pt-8 md:pb-28">
          <p className="t-lead col-span-4 max-w-[38ch] text-ink/85 md:col-span-6 lg:col-span-4" suppressHydrationWarning data-reveal="up" style={{ "--d": 250 } as CSSProperties}>
            Parketi, podne obloge, sigurnosna vrata i sve za njihovu ugradnju i njegu. Pogledajte uzorke u našem salonu u Sarajevu.
          </p>
          <div className="col-span-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6 md:col-span-6 md:justify-end lg:col-span-4 lg:justify-start" suppressHydrationWarning data-reveal="up" style={{ "--d": 350 } as CSSProperties}>
            <Cta href="/kolekcije" className="w-full sm:w-auto">
              Istražite kolekcije
            </Cta>
            <Cta href="/kontakt#upit" variant="line">
              Zatražite ponudu
            </Cta>
          </div>
          <nav aria-label="Kolekcije" className="col-span-4 md:col-span-12 lg:col-span-4" suppressHydrationWarning data-reveal="up" style={{ "--d": 450 } as CSSProperties}>
            <ul className="grid grid-cols-2 gap-x-6 border-t border-line md:grid-cols-3 lg:grid-cols-2">
              {categories.map((c) => (
                <li key={c.slug} className="border-b border-line">
                  <Link href={categoryHref(c)} className="group flex items-baseline gap-2.5 py-2.5">
                    <span className="t-index text-mute">{c.index}</span>
                    <span className="t-small link-reveal">{c.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
