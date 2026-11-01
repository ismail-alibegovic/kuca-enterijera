import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Partners } from "@/components/home/Partners";
import { ShowroomCta } from "@/components/home/ShowroomCta";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Lines } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";
import { PlankGrid } from "@/components/ui/PlankGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { categories, serviceAreas } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "O nama: parketni centar Kuća Enterijera, Sarajevo",
  description:
    "Kuća Enterijera je parketni centar u Sarajevu. Prodajemo isključivo visokokvalitetne proizvode svjetski priznatih i domaćih proizvođača, uz stručan savjet i izložbeni salon.",
  path: "/o-nama",
  image: "oakQuietRoom",
});

const advantages = [
  { title: "Nove tehnologije", text: "Želimo vam pružiti najviši nivo usluge i proizvode izrađene najnovijim tehnologijama." },
  { title: "Izložbeni salon", text: "U salonu možete pogledati proizvode najboljih svjetskih i domaćih proizvođača." },
  { title: "Stručnost i posvećenost", text: "Naši zaposlenici su educirani stručnjaci s višegodišnjim iskustvom u svojim oblastima." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden" aria-labelledby="onama-title">
        <PlankGrid className="opacity-60" />
        <div className="shell relative pt-8 pb-20 md:pb-28">
          <Breadcrumbs items={[{ name: "Početna", path: "/" }, { name: "O nama", path: "/o-nama" }]} />
          <div className="grid-12 mt-10 gap-y-10 md:mt-14">
            <Lines
              as="h1"
              id="onama-title"
              className="t-mega col-span-4 md:col-span-12"
              lines={["Kuća", <span key="2" className="md:pl-[2.2em]">Enterijera</span>]}
            />
            <div className="col-span-4 md:col-span-5 md:col-start-1 md:mt-10">
              <Photo id="oakQuietRoom" preload sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5]" tag />
            </div>
            <div className="col-span-4 flex flex-col justify-end md:col-span-6 md:col-start-7">
              <p className="t-statement" suppressHydrationWarning data-reveal="up">
                Parketni centar u Sarajevu, gdje na jednom mjestu birate proizvode najboljih svjetskih i domaćih proizvođača,{" "}
                <span className="t-serif-italic text-oak-deep">uz savjet ljudi koji ih poznaju.</span>
              </p>
              <p className="t-lead mt-8 max-w-[52ch] text-ink/75" suppressHydrationWarning data-reveal="up" style={{ "--d": 150 } as CSSProperties}>
                Prodajemo samo visokokvalitetne proizvode svjetski priznatih proizvođača. Kao partnera posebno izdvajamo talijansku kompaniju Dierre, jednog od svjetskih lidera u proizvodnji sigurnosnih vrata.
              </p>
              <p className="t-lead mt-6 max-w-[52ch] text-ink/75" suppressHydrationWarning data-reveal="up" style={{ "--d": 250 } as CSSProperties}>
                Recite nam šta vam treba, a naše stručno i ljubazno osoblje predložit će vam najbolje moguće rješenje.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="on-dark bg-charcoal text-paper" aria-labelledby="ponuda-title">
        <div className="shell grid-12 gap-y-10 py-20 md:py-28">
          <div className="col-span-4 md:col-span-3">
            <p className="t-label text-paper/70">Šta nudimo</p>
          </div>
          <div className="col-span-4 md:col-span-8 md:col-start-5">
            <h2 id="ponuda-title" className="t-h1" suppressHydrationWarning data-reveal="up">
              Od poda do ulaznih vrata, <span className="t-serif-italic text-sand">i sve između.</span>
            </h2>
            <ol className="mt-12 border-t border-paper/25">
              {categories.map((c) => (
                <li key={c.slug} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-paper/15 py-4 md:grid-cols-[3rem_1fr_1fr]">
                  <span className="t-index text-paper/50">{c.index}</span>
                  <span className="t-h3">{c.name}</span>
                  <span className="t-small col-start-2 text-paper/60 md:col-start-auto">{c.kicker}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="prednosti-title">
        <div className="shell grid-12 gap-y-10 py-20 md:py-28">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel>Zašto mi</SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-8 md:col-start-5">
            <h2 id="prednosti-title" className="t-h2" suppressHydrationWarning data-reveal="up">
              Ono što nas izdvaja
            </h2>
            <dl className="mt-10 border-t border-ink">
              {advantages.map((a, i) => (
                <div key={a.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-8 md:gap-[var(--col-gap)]" suppressHydrationWarning data-reveal="up" style={{ "--d": i * 100 } as CSSProperties}>
                  <dt className="flex items-baseline gap-4 md:col-span-3">
                    <span className="t-index text-mute">0{i + 1}</span>
                    <span className="t-h3">{a.title}</span>
                  </dt>
                  <dd className="t-body text-ink/75 md:col-span-5">{a.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-paper-2" aria-labelledby="usluge-title">
        <div className="shell grid-12 gap-y-10 py-20 md:py-28">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel>Područja rada</SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-8 md:col-start-5">
            <h2 id="usluge-title" className="t-h2">
              Rezidencijalni, poslovni <span className="t-serif-italic">i komercijalni prostori</span>
            </h2>
            <ul className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
              {serviceAreas.map((s, i) => (
                <li key={s.name} className="bg-paper p-6">
                  <p className="t-index text-mute">0{i + 1}</p>
                  <p className="t-h3 mt-3">{s.name}</p>
                  <p className="t-small mt-2 text-ink/70">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Partners />
      <ShowroomCta />
    </>
  );
}
