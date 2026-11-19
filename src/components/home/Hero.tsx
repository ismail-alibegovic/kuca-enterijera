import Link from "next/link";
import type { CSSProperties } from "react";
import { Cta } from "@/components/ui/Cta";
import { Lines } from "@/components/ui/Lines";
import { categories, categoryHref } from "@/content/catalog";
import { site } from "@/content/site";
import { HeroStage, type HeroSlide } from "./HeroStage";

const slides: HeroSlide[] = [
  { id: "herringboneLiving", caption: "Dnevni boravak · drveni pod u otvorenom prostoru", focus: "50% 72%", mobileFocus: "72% 80%" },
  { id: "oakQuietRoom", caption: "Spavaća soba · podne daske uz terasu", focus: "40% 70%", mobileFocus: "18% 70%" },
  { id: "warmLiving", caption: "Dnevni boravak · tamni drveni pod", focus: "45% 78%", mobileFocus: "30% 80%" },
  { id: "hallDoor", caption: "Hodnik · tamna vrata i svijetli pod", focus: "50% 60%", mobileFocus: "47% 60%" },
];

/**
 * First viewport. The headline stands on the floor line (the same line the logo's wordmark stands on);
 * the photographs below it are laid like boards.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="shell flex min-h-[calc(100svh-var(--header-h))] flex-col pb-6 md:pb-8">
        {/* Rail */}
        <div className="flex items-baseline justify-between gap-6 pt-5 pb-6 md:pt-6 md:pb-4">
          <p className="t-label flex items-center gap-3">
            <span aria-hidden className="inline-block h-2 w-2 bg-roof" />
            {site.tagline}
          </p>
          <p className="t-label hidden text-mute sm:block">
            Salon · {site.showroom.street}, {site.showroom.city}
          </p>
        </div>

        {/* Headline × actions, standing on the floor line */}
        <div className="grid-12 items-end gap-y-8 border-b-2 border-ink pb-6 md:pb-5">
          <Lines
            as="h1"
            id="hero-title"
            delay={150}
            className="t-mega col-span-4 md:col-span-8 lg:col-span-8"
            lines={[
              "Prostor počinje",
              <span key="b" className="t-serif-italic pr-[0.08em] text-oak-deep">
                od poda.
              </span>,
            ]}
          />
          <div className="col-span-4 flex flex-col gap-6 md:col-span-4 md:pb-[0.6em] lg:col-span-3 lg:col-start-10">
            <p className="t-lead max-w-[34ch] text-ink/80">
              Parketi, podne obloge, sigurnosna vrata te sve za njihovu ugradnju i njegu. Uzorke vidite i dodirnete u našem salonu u Sarajevu.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Cta href="/kolekcije">Istražite kolekcije</Cta>
              <Cta href="/kontakt#upit" variant="line">
                Zatražite ponudu
              </Cta>
            </div>
          </div>
        </div>

        {/* The floor: interiors laid plank by plank */}
        <div className="mt-4 flex h-[62svh] min-h-[22rem] flex-col md:mt-5 md:h-auto md:min-h-[24rem] md:flex-1">
          <HeroStage slides={slides} />
        </div>
      </div>

      {/* Collections index, directly under the first viewport */}
      <nav aria-label="Kolekcije" className="shell">
        <ul className="grid grid-cols-2 border-t border-line sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => (
            <li
              key={c.slug}
              className="border-b border-line lg:border-b-0 lg:px-4 lg:first:pl-0 lg:[&:not(:first-child)]:border-l"
              suppressHydrationWarning
              data-reveal="up"
              style={{ "--d": 80 * i } as CSSProperties}
            >
              <Link href={categoryHref(c)} className="group flex h-full items-baseline gap-3 py-4 lg:py-5">
                <span className="t-index text-mute">{c.index}</span>
                <span className="t-small link-reveal">{c.short}</span>
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
