import Image from "next/image";
import type { CSSProperties } from "react";
import { LogoSvg } from "@/components/brand/Logo";
import { Split } from "@/components/motion/Split";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { media } from "@/content/media";

/** Four cells laid over the photograph, each with a heading and an outlined tag. */
const cells = [
  { title: "Provjereni proizvođači", tag: "Pouzdanost" },
  { title: "Izložbeni salon", tag: "Uzorci" },
  { title: "Stručan savjet", tag: "Iskustvo" },
  { title: "Njega i održavanje", tag: "Trajnost" },
];

const reasons = [
  "Prodajemo isključivo visokokvalitetne proizvode svjetski priznatih i domaćih proizvođača.",
  "U salonu uzorke vidite, dodirnete i usporedite prije odluke.",
  "Pomažemo odabrati vrstu, konstrukciju i završnu obradu prema prostoru.",
  "Od Dierre sigurnosnih vrata do Chimiver lakova i ulja za njegu.",
];

function Tag({ children }: { children: string }) {
  return (
    <span className="t-label inline-flex items-center rounded-full border border-white/35 px-3 py-1.5 text-[0.58rem] tracking-[0.14em] text-white/85">
      {children}
    </span>
  );
}

export function Intro() {
  const photo = media.oakQuietRoom;
  return (
    <section aria-labelledby="intro-title" className="relative py-24 md:py-36">
      <div className="shell grid-12 gap-y-12">
        <div className="col-span-4 md:col-span-3">
          <SectionLabel index="02">Ko smo mi</SectionLabel>
        </div>
        <h2 id="intro-title" className="t-statement col-span-4 md:col-span-8 md:col-start-4" suppressHydrationWarning data-scrub="words">
          <Split mask={false}>
            Parketni centar u srcu Sarajeva. Biramo proizvođače kojima vjerujemo i savjetujemo vas{" "}
            <span className="t-serif-italic">od prvog uzorka do posljednje daske.</span>
          </Split>
        </h2>
      </div>

      {/* Brand board: photograph, hairline grid, cells with tags, and a solid panel on the right. */}
      <div className="shell mt-16 md:mt-24">
        <div className="relative grid overflow-hidden border border-line lg:grid-cols-[4.5rem_1fr_1fr_minmax(18rem,0.9fr)]" suppressHydrationWarning data-reveal="rise">
          <div className="relative col-span-full grid lg:col-span-3 lg:grid-cols-subgrid">
            <div className="absolute inset-0" data-parallax="5">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 70vw, 100vw" quality={80} className="object-cover" style={{ objectPosition: photo.focus }} />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(11_11_10/0.55),rgb(11_11_10/0.15)_45%,rgb(11_11_10/0.45))]" />
            </div>

            {/* Vertical logo column */}
            <div className="relative hidden border-r border-white/15 lg:block">
              <div aria-hidden className="absolute bottom-10 left-1/2 w-[22rem] origin-left -translate-x-[0.7rem] -rotate-90">
                <LogoSvg title={null} className="block h-auto w-full" />
              </div>
            </div>

            {/* Cells */}
            <ul className="relative grid min-h-[32rem] grid-cols-2 md:min-h-[38rem] lg:col-span-2 lg:min-h-[44rem]">
              {cells.map((c, i) => (
                <li
                  key={c.title}
                  className={`flex flex-col justify-between gap-6 p-5 md:p-8 ${i % 2 === 0 ? "border-r border-white/15" : ""} ${i < 2 ? "border-b border-white/15" : ""}`}
                  suppressHydrationWarning
                  data-reveal="fade"
                  style={{ "--d": 200 + i * 120 } as CSSProperties}
                >
                  <span className="t-small text-white/90 md:text-[0.95rem]">{c.title}</span>
                  <span>
                    <Tag>{c.tag}</Tag>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solid panel */}
          <div className="relative col-span-full flex flex-col gap-8 bg-charcoal p-6 md:p-10 lg:col-span-1">
            <p className="t-h2">Ko smo mi</p>
            <p className="t-label text-mute">Zašto nam vjeruju?</p>
            <p className="t-small max-w-[32ch] text-ink/85">
              Tim s višegodišnjim iskustvom u podovima, vratima i opremanju stambenih i poslovnih prostora.
            </p>
            <ul className="t-small space-y-4 text-ink/70">
              {reasons.map((r) => (
                <li key={r} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 bg-roof" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
