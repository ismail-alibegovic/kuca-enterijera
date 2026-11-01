import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { categories, categoryHref } from "@/content/catalog";
import { media } from "@/content/media";

/**
 * Six collections laid side by side like floorboards. The hovered/focused board widens (pure CSS).
 */
export function PlankStrip() {
  return (
    <ul className="grid grid-cols-2 gap-2 md:flex md:h-[min(72svh,46rem)] md:gap-1.5">
      {categories.map((c, i) => (
        <li
          key={c.slug}
          className="group relative md:min-w-0 md:flex-1 md:transition-[flex-grow] md:duration-[900ms] md:ease-[var(--ease-architect)] md:hover:flex-[2.6] md:focus-within:flex-[2.6]"
          suppressHydrationWarning
          data-reveal="rise"
          style={{ "--d": i * 90 } as CSSProperties}
        >
          <Link href={categoryHref(c)} className="relative block aspect-[3/4] h-full overflow-hidden bg-paper-2 md:aspect-auto">
            <Image
              src={media[c.hero].src}
              alt=""
              fill
              sizes="(min-width: 768px) 30vw, 50vw"
              quality={70}
              preload={i < 3}
              className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-architect)] group-hover:scale-[1.04]"
              style={{ objectPosition: media[c.hero].focus }}
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/0 to-ink/0" />
            <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3 text-paper md:p-5">
              <span className="t-index text-paper/75">{c.index}</span>
              <span className="text-[1.1rem] leading-[1.1] tracking-[-0.02em] [hyphens:auto] md:text-[clamp(1.1rem,1.5vw,1.45rem)]">{c.name}</span>
              <span className="t-small hidden max-w-[28ch] text-paper/80 opacity-0 transition-opacity duration-700 md:block md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                {c.kicker}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
