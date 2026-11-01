import type { Metadata } from "next";
import { InspirationGallery } from "@/components/catalog/InspirationGallery";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Cta } from "@/components/ui/Cta";
import { Lines } from "@/components/ui/Lines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { serviceAreas } from "@/content/catalog";
import { realProjects } from "@/content/inspiration";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Inspiracija: parket, podne obloge i materijali u prostoru",
  description:
    "Galerija inspiracije za stambene, poslovne i komercijalne prostore: parket riblja kost, drvene terase, tekstilni podovi. Ilustrativne fotografije.",
  path: "/inspiracija",
  image: "herringboneTimberCeiling",
});

export default function InspirationPage() {
  return (
    <>
      <section className="shell pt-8 pb-14" aria-labelledby="insp-title">
        <Breadcrumbs items={[{ name: "Početna", path: "/" }, { name: "Inspiracija", path: "/inspiracija" }]} />
        <div className="grid-12 mt-10 items-end gap-y-8 md:mt-14">
          <Lines
            as="h1"
            id="insp-title"
            className="t-mega col-span-4 md:col-span-8"
            lines={["Inspiracija", <span key="2" className="t-serif-italic text-oak-deep">za prostor.</span>]}
          />
          <div className="col-span-4 md:col-span-4 md:pb-3">
            <p className="t-lead text-ink/80">Kako materijali oblikuju dom, ured i javni prostor.</p>
            <p className="t-small mt-4 border-l-2 border-oak pl-4 text-ink/70">
              Fotografije na ovoj stranici su <strong className="font-[560]">ilustrativne</strong> i ne prikazuju projekte Kuće Enterijera. Uz svaku sliku navodimo linije iz naše ponude koje se uklapaju u taj ugođaj.
            </p>
          </div>
        </div>
      </section>

      <section className="shell pb-24" aria-label="Galerija">
        <InspirationGallery />
      </section>

      <section className="border-t border-ink" aria-labelledby="projekti-title">
        <div className="shell grid-12 gap-y-10 py-20 md:py-28">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel>Realizirani projekti</SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-8 md:col-start-5">
            <h2 id="projekti-title" className="t-h1">
              {realProjects.length ? "Naši projekti" : <>Galeriju realiziranih projekata <span className="t-serif-italic">pripremamo.</span></>}
            </h2>
            <p className="t-lead mt-6 max-w-[56ch] text-ink/75">
              Dugogodišnje iskustvo i kvalitet rada omogućili su nam saradnju s mnogobrojnim kompanijama koje su lideri u svojim oblastima u Bosni i Hercegovini. Za reference za određenu vrstu prostora pitajte nas u salonu.
            </p>
            <ul className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
              {serviceAreas.map((s, i) => (
                <li key={s.name} className="bg-paper p-6">
                  <p className="t-index text-mute">0{i + 1}</p>
                  <p className="t-h3 mt-3">{s.name}</p>
                  <p className="t-small mt-2 text-ink/70">{s.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Cta href="/kontakt#upit">Pitajte za reference</Cta>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
