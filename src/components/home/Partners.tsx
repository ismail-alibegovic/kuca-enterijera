import Image from "next/image";
import { manufacturers } from "@/content/catalog";

/** The eight partners featured as logos; all others are listed by name. */
const featured = ["dierre", "scheucher", "chimiver", "forbo", "itlas", "lalegno", "mazzonetto", "modulyss"];

/**
 * Reference team section ("Behind every piece is a human hand"): indented statement left,
 * small text right, then a calm row of equal cells. Here: manufacturer logos, not portraits.
 */
export function Partners({ className = "" }: { className?: string }) {
  const logos = featured.map((s) => manufacturers.find((m) => m.slug === s)!).filter((m) => m.logo);
  const others = manufacturers.filter((m) => !featured.includes(m.slug)).map((m) => m.name);
  return (
    <section className={`shell pt-28 md:pt-44 ${className}`} aria-labelledby="partneri-title">
      <div className="grid-12 gap-y-8">
        <h2 id="partneri-title" className="t-statement indent col-span-4 md:col-span-6" data-reveal="" suppressHydrationWarning>
          Iza svakog poda stoji proizvođač kojem vjerujemo — svjetski i domaći, provjereni u našem salonu.
        </h2>
        <p className="t-small col-span-4 max-w-[38ch] text-ink/80 md:col-span-3 md:col-start-10">
          Surađujemo i s kompanijama {others.slice(0, -1).join(", ")} i {others.at(-1)}.
        </p>
      </div>

      <ul className="mt-14 grid grid-cols-2 border-t border-l border-line sm:grid-cols-4 md:mt-20">
        {logos.map((m) => (
          <li key={m.slug} className="flex aspect-[3/2] items-center justify-center border-r border-b border-line p-6 md:p-10">
            <Image
              src={m.logo!.src}
              alt={m.name}
              width={m.logo!.width}
              height={m.logo!.height}
              className="max-h-12 w-auto max-w-[70%] object-contain opacity-80 md:max-h-14"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
