"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PlankGrid } from "@/components/ui/PlankGrid";
import { species } from "@/content/catalog";
import { media, type MediaKey } from "@/content/media";

type Chapter = { key: string; title: string; italic: string; text: string; image: MediaKey; aside?: "species" | "link" };

const chapters: Chapter[] = [
  {
    key: "vrsta",
    title: "Vrsta",
    italic: "dvanaest karaktera.",
    text: "Od svijetlog javora do gotovo crnog wengea, vrsta drveta određuje boju, crtež godova i to kako prostor djeluje ujutro i uvečer.",
    image: "darkPlanks",
    aside: "species",
  },
  {
    key: "konstrukcija",
    title: "Konstrukcija",
    italic: "masivno ili slojevito.",
    text: "Masivni parket izrađen je od punog drveta. Kod dvoslojnog i troslojnog parketa plemeniti gornji sloj leži na nosivoj podlozi. Pomoći ćemo vam odabrati konstrukciju prema prostoru i podlozi.",
    image: "herringboneTimberCeiling",
  },
  {
    key: "obrada",
    title: "Završna obrada",
    italic: "lak, ulje i njega.",
    text: "Poliuretanski i vodeni lakovi, ulja za unutarnje i vanjske podove te sredstva za njegu, od proizvođača Chimiver. Završna obrada određuje sjaj, dodir i održavanje poda.",
    image: "oakQuietRoom",
    aside: "link",
  },
];

export function MaterialStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="materijal-title" className="on-dark relative bg-charcoal text-paper">
      <PlankGrid className="opacity-60" />
      <div className="shell relative pt-24 md:pt-36">
        <div className="grid-12 gap-y-6">
          <p className="t-label col-span-4 flex items-center gap-3 text-paper/70 md:col-span-3" suppressHydrationWarning data-reveal="fade">
            <span className="t-index tracking-normal opacity-60">Nº 05</span>
            <span aria-hidden className="h-px w-8 bg-current opacity-40" />
            Materijal
          </p>
          <h2 id="materijal-title" className="t-display col-span-4 md:col-span-9" suppressHydrationWarning data-reveal="up">
            Drvo pamti <span className="t-serif-italic text-sand">svjetlo, korak i vrijeme.</span>
          </h2>
        </div>

        <div className="grid-12 mt-16 md:mt-24">
          {/* Sticky image stage (desktop) */}
          <div className="hidden md:col-span-6 md:block">
            <div className="sticky top-[calc(var(--header-h)+1.5rem)] h-[calc(100svh-var(--header-h)-3rem)] pb-6">
              <div className="relative h-full overflow-hidden bg-ink">
                {chapters.map((c, i) => (
                  <Image
                    key={c.key}
                    src={media[c.image].src}
                    alt={i === active ? media[c.image].alt : ""}
                    fill
                    sizes="50vw"
                    quality={70}
                    className={`object-cover transition-[opacity,scale,clip-path] duration-[1400ms] ease-[var(--ease-curtain)] ${
                      i === active
                        ? "scale-100 opacity-100 [clip-path:inset(0_0_0_0)]"
                        : i < active
                          ? "scale-105 opacity-0 [clip-path:inset(0_0_100%_0)]"
                          : "scale-105 opacity-0 [clip-path:inset(100%_0_0_0)]"
                    }`}
                    style={{ objectPosition: media[c.image].focus }}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                  <span className="t-label bg-ink/60 px-2 py-1 text-[0.58rem] text-paper/80">Ilustracija</span>
                  <span className="t-index text-paper/90">
                    {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters */}
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            {chapters.map((c, i) => (
              <div
                key={c.key}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-idx={i}
                className="flex flex-col justify-center border-t border-paper/20 py-14 md:min-h-[88svh] md:py-24"
              >
                <div className="relative mb-8 aspect-[4/3] overflow-hidden md:hidden">
                  <Image src={media[c.image].src} alt={media[c.image].alt} fill sizes="100vw" quality={70} className="object-cover" style={{ objectPosition: media[c.image].focus }} />
                </div>
                <p className="t-index text-paper/60">0{i + 1}</p>
                <h3 className="t-h1 mt-4" suppressHydrationWarning data-reveal="up">
                  {c.title}, <span className="t-serif-italic text-sand">{c.italic}</span>
                </h3>
                <p className="t-lead mt-6 max-w-[44ch] text-paper/75" suppressHydrationWarning data-reveal="up">
                  {c.text}
                </p>

                {c.aside === "species" ? (
                  <div className="mt-10" suppressHydrationWarning data-reveal="up">
                    <ul className="grid grid-cols-3 gap-px bg-paper/15 sm:grid-cols-4" aria-label="Vrste drveta u ponudi">
                      {species.map((s) => (
                        <li key={s.slug} className="bg-charcoal p-2">
                          <span aria-hidden className="block aspect-[5/3] w-full" style={{ background: s.tone }} />
                          <span className="t-small mt-2 block text-[0.78rem] leading-tight text-paper/85">{s.name}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="t-small mt-4 text-paper/50">Orijentacijski tonovi. Stvarnu boju provjerite na uzorku u salonu.</p>
                  </div>
                ) : null}
                {c.aside === "link" ? (
                  <Link href="/kolekcije/ljepila-lakovi-i-njega" className="t-label link-line mt-10 self-start text-paper">
                    Ljepila, lakovi i njega →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
