"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories, categoryHref, products, productsInCategory } from "@/content/catalog";
import { media } from "@/content/media";

/**
 * Typographic index of collections with a sticky preview that changes on hover/focus (desktop).
 * On small screens each row carries its own image.
 */
export function CategoryIndex() {
  const [active, setActive] = useState(0);
  return (
    <section aria-labelledby="kolekcije-title" className="relative pb-24 md:pb-36">
      <div className="shell">
        <div className="grid-12 items-end border-b border-ink pb-6">
          <p className="t-label col-span-4 mb-6 flex items-center gap-3 md:col-span-3 md:mb-0" suppressHydrationWarning data-reveal="fade">
            <span className="t-index tracking-normal text-mute">Nº 03</span>
            <span aria-hidden className="h-px w-8 bg-current opacity-40" />
            Kolekcije
          </p>
          <h2 id="kolekcije-title" className="t-display col-span-4 md:col-span-6 md:col-start-4" suppressHydrationWarning data-reveal="up">
            Materijali <span className="t-serif-italic">u glavnoj ulozi</span>
          </h2>
          <p className="t-index col-span-4 mt-4 text-mute md:col-span-3 md:mt-0 md:text-right">{String(categories.length).padStart(2, "0")} kolekcija · {String(products.length).padStart(2, "0")} linija proizvoda</p>
        </div>

        <div className="grid-12">
          <ol className="col-span-4 md:col-span-7">
            {categories.map((c, i) => {
              const count = productsInCategory(c.slug).length;
              return (
                <li key={c.slug} className="border-b border-line" suppressHydrationWarning data-reveal="up" style={{ ["--d" as string]: i * 70 }}>
                  <Link
                    href={categoryHref(c)}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 py-5 md:grid-cols-[3rem_1fr_auto] md:py-7"
                  >
                    <span className="t-index self-start pt-2 text-mute">{c.index}</span>
                    <span>
                      <span
                        className={`block text-[clamp(1.75rem,3.6vw,3.6rem)] leading-[1] tracking-[-0.035em] transition-[transform,color] duration-700 ease-[var(--ease-architect)] md:group-hover:translate-x-3 ${
                          active === i ? "md:text-ink" : "md:text-ink/45"
                        }`}
                      >
                        {c.name}
                      </span>
                      <span className="t-small mt-2 block text-mute">
                        {c.kicker} <span className="max-md:hidden">· {count} {count === 1 ? "linija" : "linije"}</span>
                      </span>
                    </span>
                    {/* Mobile thumbnail */}
                    <span className="relative block h-20 w-16 overflow-hidden bg-paper-2 md:hidden">
                      <Image src={media[c.hero].src} alt="" fill sizes="64px" quality={70} className="object-cover" style={{ objectPosition: media[c.hero].focus }} />
                    </span>
                    <span aria-hidden className="arrow t-h3 hidden md:block">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="relative hidden md:col-span-4 md:col-start-9 md:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)] mt-8">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper-2" suppressHydrationWarning data-reveal="rise">
                {categories.map((c, i) => (
                  <Image
                    key={c.slug}
                    src={media[c.hero].src}
                    alt={i === active ? media[c.hero].alt : ""}
                    fill
                    sizes="30vw"
                    quality={70}
                    className={`object-cover transition-[opacity,scale,clip-path] duration-[1100ms] ease-[var(--ease-architect)] ${
                      i === active ? "scale-100 opacity-100 [clip-path:inset(0_0_0_0)]" : "scale-[1.06] opacity-0 [clip-path:inset(0_0_0_18%)]"
                    }`}
                    style={{ objectPosition: media[c.hero].focus }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <p className="t-label">{categories[active].materials}</p>
                <p className="t-label text-mute">Ilustracija</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
