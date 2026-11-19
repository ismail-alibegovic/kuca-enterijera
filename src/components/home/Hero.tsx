import Link from "next/link";
import type { CSSProperties } from "react";
import { LogoSvg } from "@/components/brand/Logo";
import { Cta } from "@/components/ui/Cta";
import { Lines } from "@/components/ui/Lines";
import { categories, categoryHref } from "@/content/catalog";
import { site } from "@/content/site";
import { HeroStage, type HeroSlide } from "./HeroStage";

const slides: HeroSlide[] = [
  { id: "herringboneLiving", caption: "Dnevni boravak · lamele, tekstil i tamni tonovi", focus: "50% 62%", mobileFocus: "62% 60%" },
  { id: "warmLiving", caption: "Dnevni boravak · toplo zidno svjetlo", focus: "50% 70%", mobileFocus: "38% 70%" },
  { id: "herringbonePortrait", caption: "Spavaća soba · parket u uzorku riblje kosti", focus: "50% 78%", mobileFocus: "45% 70%" },
  { id: "chevronKitchen", caption: "Kuhinja i blagovaonica · drveni pod", focus: "50% 62%", mobileFocus: "50% 62%" },
];

/**
 * First viewport, framed like a brand presentation: a full-bleed photograph laid plank by plank, the logo
 * standing vertically on the left edge, and the message set over the darkest part of the image.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative h-[calc(100svh-var(--header-h))] min-h-[36rem] overflow-hidden">
        <HeroStage slides={slides} />

        {/* Scrim: keeps the message legible on any slide without flattening the photograph. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(90deg,rgb(11_11_10/0.86)_0%,rgb(11_11_10/0.55)_38%,rgb(11_11_10/0)_72%),linear-gradient(0deg,rgb(11_11_10/0.7)_0%,rgb(11_11_10/0)_38%)] max-md:bg-[linear-gradient(0deg,rgb(11_11_10/0.92)_0%,rgb(11_11_10/0.55)_55%,rgb(11_11_10/0.25)_100%)]"
        />

        <div className="pointer-events-none absolute inset-0 z-[5]">
          <div className="shell relative flex h-full">
            {/* Vertical logo on the left edge, as on a brand board. */}
            <div aria-hidden className="relative hidden w-16 shrink-0 border-r border-white/12 lg:block">
              <div className="absolute bottom-24 left-1/2 w-[min(44svh,24rem)] origin-left -translate-x-[0.9rem] -rotate-90">
                <LogoSvg title={null} className="block h-auto w-full opacity-75" />
              </div>
            </div>

            <div className="pointer-events-auto flex min-w-0 flex-1 flex-col justify-end pb-24 md:pb-28 lg:pl-12">
              <p className="t-label mb-6 flex items-center gap-3 text-ink/85">
                <span aria-hidden className="inline-block h-1.5 w-1.5 bg-roof" />
                {site.tagline}
              </p>
              <Lines
                as="h1"
                id="hero-title"
                delay={250}
                className="t-mega max-w-[14ch]"
                lines={[
                  "Prostor počinje",
                  <span key="b" className="t-serif-italic">
                    od poda.
                  </span>,
                ]}
              />
              <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
                <p className="t-lead max-w-[42ch] text-ink/80">
                  Parketi, podne obloge, sigurnosna vrata te sve za njihovu ugradnju i njegu. Uzorke vidite i dodirnete u našem salonu u Sarajevu.
                </p>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Cta href="/kolekcije">Istražite kolekcije</Cta>
                  <Cta href="/kontakt#upit" variant="line">
                    Zatražite ponudu
                  </Cta>
                </div>
              </div>
            </div>

            <p className="t-label pointer-events-auto absolute top-6 right-[var(--gutter)] hidden text-ink/70 sm:block">
              Salon · {site.showroom.street}, {site.showroom.city}
            </p>
          </div>
        </div>
      </div>

      {/* Collections index, directly under the first viewport */}
      <nav aria-label="Kolekcije" className="shell">
        <ul className="grid grid-cols-2 border-b border-line sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => (
            <li
              key={c.slug}
              className="border-b border-line lg:border-b-0 lg:px-4 lg:first:pl-0 lg:[&:not(:first-child)]:border-l"
              suppressHydrationWarning
              data-reveal="up"
              style={{ "--d": 80 * i } as CSSProperties}
            >
              <Link href={categoryHref(c)} className="group flex h-full items-baseline gap-3 py-5 lg:py-6">
                <span className="t-index text-mute">{c.index}</span>
                <span className="t-label link-reveal text-[0.66rem]">{c.short}</span>
                <span aria-hidden className="arrow t-index ml-auto pr-3 text-mute transition-colors group-hover:text-ink">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
