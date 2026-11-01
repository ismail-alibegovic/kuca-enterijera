import Link from "next/link";
import { Cta } from "@/components/ui/Cta";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { inspiration, spaceLabels } from "@/content/inspiration";

/** Asymmetric collage: four frames at four different scales. */
const layout = [
  { id: "drvo-od-poda-do-stropa", cls: "col-span-4 md:col-span-4 md:col-start-1", aspect: "aspect-[3/4]" },
  { id: "terasa-iznad-vrta", cls: "col-span-2 md:col-span-3 md:col-start-6 md:mt-40", aspect: "aspect-square" },
  { id: "sala-za-sastanke", cls: "col-span-2 md:col-span-3 md:col-start-10 md:mt-16", aspect: "aspect-[4/5]" },
  { id: "kuhinja-chevron", cls: "col-span-4 md:col-span-5 md:col-start-6 md:-mt-24", aspect: "aspect-[16/10]" },
];

export function InspirationTeaser() {
  return (
    <section aria-labelledby="inspiracija-title" className="relative py-24 md:py-36">
      <div className="shell">
        <div className="grid-12 gap-y-6">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel index="06">Inspiracija</SectionLabel>
          </div>
          <h2 id="inspiracija-title" className="t-h1 col-span-4 md:col-span-6" suppressHydrationWarning data-reveal="up">
            Prostori koji počinju <span className="t-serif-italic">od materijala</span>
          </h2>
          <p className="t-small col-span-4 text-mute md:col-span-3" suppressHydrationWarning data-reveal="up">
            Ilustrativne fotografije prostora za inspiraciju. Ne prikazuju projekte Kuće Enterijera.
          </p>
        </div>

        <div className="grid-12 mt-14 gap-y-8 md:mt-20">
          {layout.map((l, i) => {
            const e = inspiration.find((x) => x.id === l.id)!;
            return (
              <Link key={l.id} href={`/inspiracija#${e.id}`} className={`group block ${l.cls}`}>
                <Photo id={e.image} sizes="(min-width: 768px) 33vw, 100vw" className={l.aspect} zoom delay={i * 90} />
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <p className="t-small link-reveal">{e.title}</p>
                  <p className="t-label shrink-0 text-[0.58rem] text-mute">{spaceLabels[e.space]}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16">
          <Cta href="/inspiracija" variant="outline">
            Galerija inspiracije
          </Cta>
        </div>
      </div>
    </section>
  );
}
