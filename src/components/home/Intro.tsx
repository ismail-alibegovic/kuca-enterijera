import type { CSSProperties } from "react";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";

const principles = [
  {
    title: "Provjereni proizvođači",
    text: "Prodajemo isključivo visokokvalitetne proizvode svjetski priznatih i domaćih proizvođača, od Dierre vrata do Chimiver lakova.",
  },
  {
    title: "Izložbeni salon",
    text: "Materijal se bira okom i dlanom. U salonu možete vidjeti i usporediti uzorke prije odluke.",
  },
  {
    title: "Stručan savjet",
    text: "Naš tim ima višegodišnje iskustvo. Recite nam šta vam treba i predložit ćemo najbolje rješenje.",
  },
];

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="relative py-24 md:py-36">
      <div className="shell grid-12 gap-y-12">
        <div className="col-span-4 md:col-span-3">
          <SectionLabel index="02">Kuća Enterijera</SectionLabel>
        </div>
        <h2 id="intro-title" className="t-statement col-span-4 md:col-span-8 md:col-start-4" suppressHydrationWarning data-reveal="up">
          Parketni centar u srcu Sarajeva. Biramo proizvođače kojima vjerujemo i savjetujemo vas{" "}
          <span className="t-serif-italic text-oak-deep">od prvog uzorka do posljednje daske.</span>
        </h2>

        <div className="col-span-3 col-start-2 md:col-span-2 md:col-start-1 md:row-start-3 md:mt-24">
          <Photo id="oakSideboard" sizes="(min-width: 768px) 16vw, 70vw" className="aspect-[4/5]" tag />
        </div>

        <dl className="col-span-4 border-t border-ink md:col-span-8 md:col-start-4 md:row-start-3">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="grid gap-2 border-b border-line py-6 md:grid-cols-8 md:gap-[var(--col-gap)] md:py-8"
              suppressHydrationWarning data-reveal="up"
              style={{ "--d": i * 120 } as CSSProperties}
            >
              <dt className="flex items-baseline gap-4 md:col-span-3">
                <span className="t-index text-mute">0{i + 1}</span>
                <span className="t-h3">{p.title}</span>
              </dt>
              <dd className="t-body text-ink/75 md:col-span-5">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
