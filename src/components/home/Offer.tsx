import Link from "next/link";
import { categories, categoryHref } from "@/content/catalog";

/**
 * Reference "values" section: an indented statement on the left, one large italic figure on the
 * right, and a ruled two-column table starting at ~43% of the width. Here the table is the
 * complete offer: six real product groups, each a link.
 */
export function Offer() {
  return (
    <section className="shell pt-20 md:pt-28" aria-labelledby="ponuda-title">
      <div className="grid-12 gap-y-6">
        <h2 id="ponuda-title" className="t-statement indent col-span-4 md:col-span-6" data-reveal="" suppressHydrationWarning>
          Sve za pod i ulaz u jednom salonu — od prve daske parketa do posljednjeg sloja laka.
        </h2>
        <p aria-hidden className="col-span-4 hidden text-right text-[clamp(4rem,7vw,7rem)] leading-[0.8] italic md:col-span-2 md:col-start-11 md:block">
          6
        </p>
      </div>

      <div className="grid-12 mt-12 gap-y-10 md:mt-20">
        <p className="t-small order-2 col-span-4 max-w-[34ch] self-end text-ink/80 md:order-1 md:col-span-3">
          Ako niste sigurni što vam treba, opišite nam prostor i namjenu. Predložit ćemo rješenje i pripremiti ponudu.
        </p>
        <ul className="order-1 col-span-4 border-t border-line-strong md:order-2 md:col-span-7 md:col-start-6">
          {categories.map((c) => (
            <li key={c.slug} className="border-b border-line">
              <Link
                href={categoryHref(c)}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 md:grid-cols-[1fr_1fr_auto] md:py-6"
              >
                <span className="t-h3 link-hover justify-self-start">{c.name}</span>
                <span className="t-caption col-start-1 text-mute md:col-start-2 md:row-start-1">{c.kicker}</span>
                <span aria-hidden className="t-small col-start-2 row-start-1 transition-transform duration-500 group-hover:translate-x-1 md:col-start-3">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
