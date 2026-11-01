import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { MapEmbed } from "@/components/forms/MapEmbed";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Lines } from "@/components/ui/Lines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { mapsUrl, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Salon i kontakt: Alipašina 55, Sarajevo",
  description:
    "Posjetite salon Kuća Enterijera u ulici Alipašina 55 u Sarajevu ili pošaljite upit za ponudu parketa, podnih obloga i sigurnosnih vrata. Telefon +387 61 221 173.",
  path: "/kontakt",
  image: "staircaseOak",
});

export default function ContactPage() {
  const { phones, emails } = site.contact;
  return (
    <>
      <section className="shell pt-8 pb-16 md:pb-24" aria-labelledby="kontakt-title">
        <Breadcrumbs items={[{ name: "Početna", path: "/" }, { name: "Salon i kontakt", path: "/kontakt" }]} />
        <div className="grid-12 mt-10 gap-y-12 md:mt-14">
          <div className="col-span-4 md:col-span-7">
            <Lines as="h1" id="kontakt-title" className="t-mega" lines={["Alipašina 55", <span key="2" className="t-serif-italic text-oak-deep">Sarajevo.</span>]} />
            <p className="t-lead mt-10 max-w-[46ch] text-ink/80">
              Recite nam šta vam treba i dozvolite našem stručnom i ljubaznom osoblju da vam predloži najbolje moguće rješenje. Pažljivo ćemo vas saslušati.
            </p>
          </div>

          {/* Tap-friendly contact list */}
          <div className="col-span-4 md:col-span-4 md:col-start-9 md:pt-4">
            <ul className="border-t border-ink">
              {phones.map((p, i) => (
                <li key={p.href} className="border-b border-line">
                  <a href={p.href} className="group flex min-h-16 items-center justify-between gap-4 py-3">
                    <span>
                      <span className="t-label block text-mute">{i === 0 ? "Telefon · glavni" : p.label}</span>
                      <span className={i === 0 ? "t-h3 mt-1 block" : "t-body mt-1 block"}>{p.display}</span>
                    </span>
                    <span aria-hidden className="arrow">→</span>
                  </a>
                </li>
              ))}
              {emails.map((e) => (
                <li key={e.href} className="border-b border-line">
                  <a href={e.href} className="flex min-h-16 items-center justify-between gap-4 py-3">
                    <span>
                      <span className="t-label block text-mute">Email</span>
                      <span className="t-body mt-1 block break-all">{e.display}</span>
                    </span>
                    <span aria-hidden className="arrow">→</span>
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-4 py-3">
                  <span>
                    <span className="t-label block text-mute">Upute za dolazak</span>
                    <span className="t-body mt-1 block">
                      {site.showroom.street}, {site.showroom.postalCode} {site.showroom.city}
                    </span>
                  </span>
                  <span aria-hidden>↗</span>
                </a>
              </li>
            </ul>
            <p className="t-small mt-5 text-mute">
              {site.showroom.openingHours
                ? site.showroom.openingHours.map((h) => `${h.days}: ${h.hours}`).join(" · ")
                : "Radno vrijeme salona provjerite telefonom prije dolaska."}
            </p>
          </div>
        </div>
      </section>

      <section id="upit" className="scroll-mt-24 border-t border-ink bg-paper-2" aria-labelledby="upit-title">
        <div className="shell grid-12 gap-y-12 py-20 md:py-28">
          <div className="col-span-4 md:col-span-4">
            <SectionLabel>Upit i ponuda</SectionLabel>
            <h2 id="upit-title" className="t-h1 mt-6">
              Zatražite <span className="t-serif-italic">ponudu.</span>
            </h2>
            <p className="t-body mt-6 max-w-[38ch] text-ink/75">
              Napišite koji proizvod vas zanima, približnu površinu i gdje se prostor nalazi. Što više znamo, to preciznija može biti ponuda.
            </p>
            <ol className="t-small mt-10 space-y-3 border-t border-line pt-6 text-ink/75">
              <li className="flex gap-4">
                <span className="t-index text-mute">01</span>Pošaljete upit ili nas nazovete.
              </li>
              <li className="flex gap-4">
                <span className="t-index text-mute">02</span>Javljamo se s pitanjima ili prijedlogom.
              </li>
              <li className="flex gap-4">
                <span className="t-index text-mute">03</span>Uzorke pogledate uživo u salonu.
              </li>
            </ol>
          </div>
          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="shell grid-12 gap-y-8 py-20 md:py-28" aria-labelledby="karta-title">
        <div className="col-span-4 md:col-span-4">
          <SectionLabel>Lokacija</SectionLabel>
          <h2 id="karta-title" className="t-h2 mt-6">
            Salon <span className="t-serif-italic">u ulici Alipašina</span>
          </h2>
          <p className="t-body mt-6 max-w-[36ch] text-ink/75">
            U salonu na adresi {site.showroom.street} u Sarajevu možete pogledati dio našeg asortimana.
          </p>
        </div>
        <div className="col-span-4 md:col-span-7 md:col-start-6">
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
