import Image from "next/image";
import type { CSSProperties } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { manufacturers } from "@/content/catalog";

export function Partners({ index, showText = true }: { index?: string; showText?: boolean }) {
  const withLogo = manufacturers.filter((m) => m.logo);
  const textOnly = manufacturers.filter((m) => !m.logo);
  return (
    <section aria-labelledby="partneri-title" className="relative py-24 md:py-32">
      <div className="shell">
        <div className="grid-12 gap-y-6">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel index={index}>Proizvođači</SectionLabel>
          </div>
          <h2 id="partneri-title" className="t-h2 col-span-4 md:col-span-6" suppressHydrationWarning data-reveal="up">
            Samo provjereni proizvođači, <span className="t-serif-italic">svjetski i domaći.</span>
          </h2>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7" aria-label="Proizvođači s logotipom">
          {withLogo.map((m, i) => {
            const l = m.logo!;
            const h = Math.min(44, (l.height / l.width) * 120);
            return (
              <li
                key={m.slug}
                className="group relative flex aspect-[3/2] items-center justify-center bg-paper p-6"
                suppressHydrationWarning data-reveal="fade"
                style={{ "--d": (i % 7) * 60 } as CSSProperties}
              >
                <Image
                  src={l.src}
                  alt={m.name}
                  width={l.width}
                  height={l.height}
                  className="w-auto opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ height: `${h}px`, maxWidth: "80%" }}
                />
                {m.segment ? (
                  <span className="t-label absolute inset-x-2 bottom-2 text-center text-[0.52rem] tracking-[0.12em] text-mute opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {m.segment}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>

        {showText ? (
          <div className="marquee mt-10 overflow-hidden border-y border-line py-5" aria-label="Također u ponudi">
            <p className="sr-only">Također u ponudi: {textOnly.map((m) => m.name).join(", ")}.</p>
            <div aria-hidden className="marquee-track flex w-max gap-10 whitespace-nowrap">
              {[0, 1].map((k) => (
                <div key={k} className="flex items-baseline gap-10">
                  <span className="t-label text-mute">Također u ponudi</span>
                  {textOnly.map((m) => (
                    <span key={m.slug} className="t-statement text-[1.6rem]! text-ink/70">
                      {m.name}
                      <span className="mx-5 text-oak">·</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
