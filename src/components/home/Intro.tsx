import Link from "next/link";
import { Photo } from "@/components/ui/Photo";

/**
 * Reference section 2: a tall photograph on the left, an indented statement at the top right,
 * and at the bottom right a small text block beside a small photograph.
 */
export function Intro() {
  return (
    <section className="shell pt-24 md:pt-40 lg:pt-48" aria-labelledby="intro-title">
      <div className="grid-12 gap-y-10">
        <Photo
          id="bedroomOak"
          sizes="(min-width: 768px) 42vw, 100vw"
          className="col-span-4 md:col-span-5"
          frameClassName="aspect-[4/5] md:aspect-[7/8]"
          focus="72% 60%"
          caption="Iz arhive Kuće Enterijera"
        />

        <div className="col-span-4 flex flex-col md:col-span-6 md:col-start-7">
          <h2 id="intro-title" className="t-statement indent" data-reveal="" suppressHydrationWarning>
            <span className="italic">Kuća Enterijera</span> je parketni centar u Sarajevu. Prodajemo isključivo kvalitetne
            proizvode svjetski priznatih i domaćih proizvođača — i pomažemo vam odabrati pravi.
          </h2>

          <div className="mt-14 grid grid-cols-6 items-end gap-x-[var(--col-gap)] gap-y-8 md:mt-auto md:pt-16">
            <div className="col-span-6 sm:col-span-3">
              <p className="t-small text-ink/80">
                U salonu možete pogledati proizvode i uzorke, a naše osoblje predložit će rješenje prema vašem prostoru,
                namjeni i budžetu. Posebno izdvajamo partnera za sigurnosna vrata, talijansku kompaniju Dierre.
              </p>
              <Link href="/o-nama" className="t-small link mt-4 inline-block">
                O nama
              </Link>
            </div>
            <Photo
              id="livingDark"
              sizes="(min-width: 768px) 16vw, 50vw"
              className="col-span-3 col-start-4 sm:col-span-2 sm:col-start-5"
              frameClassName="aspect-[1/1.05]"
              focus="35% 75%"
              delay={150}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
