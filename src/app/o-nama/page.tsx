import type { Metadata } from "next";
import Link from "next/link";
import { Partners } from "@/components/home/Partners";
import { PageIntro } from "@/components/page/PageIntro";
import { Photo } from "@/components/ui/Photo";
import { serviceAreas } from "@/content/catalog";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "O nama: parketni centar u Sarajevu",
  description:
    "Kuća Enterijera je parketni centar u Sarajevu. Prodajemo isključivo kvalitetne proizvode svjetski priznatih i domaćih proizvođača: parkete, podne obloge, sigurnosna vrata Dierre i više.",
  path: "/o-nama",
  image: "bedroomOak",
});

/** Taken from "Naše prednosti" on the existing site (the ISO claim is omitted until confirmed). */
const strengths = [
  { name: "Izložbeni salon", text: "U salonu možete pogledati proizvode i uzorke te dio našeg asortimana." },
  { name: "Stručnost i posvećenost", text: "Naši zaposlenici su educirani stručnjaci s višegodišnjim iskustvom u svom području." },
  { name: "Provjereni proizvođači", text: "Prodajemo isključivo kvalitetne proizvode svjetski priznatih i domaćih proizvođača." },
  { name: "Savjet prije kupovine", text: "Saslušamo šta vam treba i predložimo rješenje prema prostoru, namjeni i budžetu." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        id="o-nama-title"
        title={
          <>
            Parketni centar —
            <br />u Sarajevu
          </>
        }
        text="U našem salonu možete pogledati proizvode najboljih svjetskih i domaćih proizvođača: parkete, podne obloge, sigurnosna vrata i sve što je potrebno za njihovo postavljanje i njegu."
        crumbs={[
          { name: "Naslovna", path: "/" },
          { name: "O nama", path: "/o-nama" },
        ]}
        thumb="corridorDoors"
        wide="bedroomOak"
        wideCaption={["Iz arhive Kuće Enterijera", `${site.showroom.street}, ${site.showroom.city}`]}
      />

      <section className="shell pt-24 md:pt-40" aria-labelledby="pristup-title">
        <div className="grid-12 gap-y-10">
          <Photo
            id="oakStudy"
            sizes="(min-width: 768px) 42vw, 100vw"
            className="col-span-4 md:col-span-5"
            frameClassName="aspect-[4/5] md:aspect-[7/8]"
            caption="Hrastov pod i zidna obloga · Foto: ITLAS"
          />
          <div className="col-span-4 flex flex-col md:col-span-6 md:col-start-7">
            <h2 id="pristup-title" className="t-statement indent" data-reveal="" suppressHydrationWarning>
              <span className="italic">Recite nam</span> šta vam treba — naše stručno i ljubazno osoblje predložit će vam
              najbolje moguće rješenje.
            </h2>
            <p className="t-small mt-10 max-w-[40ch] text-ink/80 md:mt-auto md:pt-16">
              Posebno izdvajamo našeg partnera za sigurnosna vrata, talijansku kompaniju Dierre, jednog od svjetskih lidera u
              proizvodnji blindiranih vrata. Za postavljanje i njegu drvenih podova nudimo program proizvođača Chimiver.
            </p>
          </div>
        </div>
      </section>

      <section className="shell pt-24 md:pt-40" aria-labelledby="prednosti-title">
        <div className="grid-12 gap-y-10">
          <h2 id="prednosti-title" className="t-statement indent col-span-4 md:col-span-6">
            Zašto kupci biraju salon, a ne samo katalog.
          </h2>
          <ul className="col-span-4 border-t border-line-strong md:col-span-7 md:col-start-6">
            {strengths.map((s) => (
              <li key={s.name} className="grid gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-2 md:py-6">
                <span className="t-h3">{s.name}</span>
                <span className="t-small text-ink/80">{s.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell pt-24 md:pt-36" aria-labelledby="prostori-title">
        <div className="grid-12 gap-y-6">
          <h2 id="prostori-title" className="t-caption col-span-4 text-mute md:col-span-3">
            Za koje prostore
          </h2>
          <ul className="col-span-4 grid gap-x-[var(--col-gap)] gap-y-6 sm:grid-cols-3 md:col-span-8 md:col-start-5">
            {serviceAreas.map((a) => (
              <li key={a.name} className="border-t border-line-strong pt-4">
                <p className="t-body">{a.name}</p>
                <p className="t-small mt-2 text-ink/75">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="t-small mt-12">
          <Link href="/ponuda" className="link">
            Pogledajte ponudu
          </Link>
        </p>
      </section>

      <Partners />
    </>
  );
}
