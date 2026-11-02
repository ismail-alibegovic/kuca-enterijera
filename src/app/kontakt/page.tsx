import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { MapEmbed } from "@/components/forms/MapEmbed";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { mapsUrl, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt i salon: Hiseta 19, Sarajevo",
  description:
    "Posjetite salon Kuća Enterijera u ulici Hiseta 19 u Sarajevu ili pošaljite upit za ponudu parketa, podnih obloga i sigurnosnih vrata. Telefon +387 61 221 173.",
  path: "/kontakt",
  image: "oakPlanks",
});

/** The contact page is the reference's "GET IN TOUCH" block, expanded with the form and map. */
export default function ContactPage() {
  const { phones, emails } = site.contact;
  return (
    <>
      <section className="shell pt-10 md:pt-16" aria-labelledby="kontakt-title">
        <Breadcrumbs
          items={[
            { name: "Naslovna", path: "/" },
            { name: "Kontakt", path: "/kontakt" },
          ]}
        />
        <h1 id="kontakt-title" className="t-mega mt-8 md:mt-12">
          K<span className="italic">o</span>ntakt
        </h1>

        <div className="grid-12 mt-12 gap-y-10 md:mt-16">
          <div className="col-span-4 md:col-span-5">
            <a href={emails[0].href} className="t-h3 link-hover">
              {emails[0].display}
            </a>
            <p className="t-small mt-4 max-w-[38ch] text-ink/80">
              Recite nam šta vam treba i dozvolite našem stručnom i ljubaznom osoblju da vam predloži najbolje moguće
              rješenje. Pažljivo ćemo vas saslušati.
            </p>
            <a href={emails[1].href} className="t-small link-hover mt-4 inline-block text-ink/80">
              {emails[1].display}
            </a>
          </div>

          <div className="t-small col-span-2 md:col-span-3 md:col-start-7">
            <p className="text-mute">Salon</p>
            <p className="mt-1">
              {site.showroom.street}
              <br />
              {site.showroom.postalCode} {site.showroom.city}
            </p>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="link mt-3 inline-block">
              Upute za dolazak
            </a>
            <p className="mt-6 text-mute">Radno vrijeme</p>
            <p className="mt-1 max-w-[24ch]">
              {site.showroom.openingHours
                ? site.showroom.openingHours.map((h) => `${h.days}: ${h.hours}`).join(", ")
                : "Molimo provjerite telefonom prije dolaska."}
            </p>
          </div>

          <div className="t-small col-span-2 md:col-span-2 md:col-start-10">
            <p className="text-mute">Telefon</p>
            <ul className="mt-1">
              {phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="link-hover">
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="upit" className="shell scroll-mt-6 pt-24 md:pt-36" aria-labelledby="upit-title">
        <div className="grid-12 gap-y-10 border-t border-line pt-10 md:pt-14">
          <div className="col-span-4 md:col-span-4">
            <h2 id="upit-title" className="t-statement">
              Zatražite <span className="italic">ponudu</span>
            </h2>
            <p className="t-small mt-5 max-w-[34ch] text-ink/80">
              Napišite koji proizvod vas zanima, približnu površinu i gdje se prostor nalazi. Što više znamo, to preciznija
              može biti ponuda.
            </p>
          </div>
          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="shell pt-24 md:pt-36" aria-labelledby="karta-title">
        <div className="grid-12 gap-y-8">
          <div className="col-span-4 md:col-span-4">
            <h2 id="karta-title" className="t-statement">
              Salon u ulici <span className="italic">{site.showroom.street.split(" ")[0]}</span>
            </h2>
            <p className="t-small mt-5 max-w-[34ch] text-ink/80">
              U našem prodajnom salonu na adresi {site.showroom.street} u Sarajevu možete pogledati dio našeg asortimana.
            </p>
          </div>
          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
