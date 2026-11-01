import { Cta } from "@/components/ui/Cta";
import { Lines } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";
import { mapsUrl, primaryPhone, site } from "@/content/site";

export function ShowroomCta({ index }: { index?: string }) {
  return (
    <section aria-labelledby="salon-title" className="relative border-t border-ink">
      <div className="shell grid-12 gap-y-12 py-24 md:py-32">
        <div className="col-span-4 md:col-span-6">
          <p className="t-label flex items-center gap-3" suppressHydrationWarning data-reveal="fade">
            {index ? <span className="t-index tracking-normal text-mute">Nº {index}</span> : null}
            {index ? <span aria-hidden className="h-px w-8 bg-current opacity-40" /> : null}
            Salon
          </p>
          <Lines
            id="salon-title"
            className="t-display mt-8"
            lines={["Dođite vidjeti", <span key="i" className="t-serif-italic text-oak-deep">uzorke.</span>]}
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div suppressHydrationWarning data-reveal="up">
              <p className="t-label text-mute">Adresa</p>
              <p className="t-h3 mt-3">
                {site.showroom.street}
                <br />
                {site.showroom.postalCode} {site.showroom.city}
              </p>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="t-small link-line mt-3 inline-block">
                Upute za dolazak ↗
              </a>
            </div>
            <div suppressHydrationWarning data-reveal="up" style={{ ["--d" as string]: 100 }}>
              <p className="t-label text-mute">Telefon i email</p>
              <p className="t-h3 mt-3">
                <a href={primaryPhone.href} className="hover:text-oak-deep">
                  {primaryPhone.display}
                </a>
              </p>
              <a href={site.contact.emails[0].href} className="t-small link-line mt-3 inline-block">
                {site.contact.emails[0].display}
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6" suppressHydrationWarning data-reveal="up">
            <Cta href="/kontakt#upit">Zatražite ponudu</Cta>
            <Cta href={primaryPhone.href} variant="line">
              Pozovite salon
            </Cta>
          </div>
        </div>
        <div className="col-span-4 md:col-span-5 md:col-start-8">
          <Photo id="staircaseOak" sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5]" parallax tag />
        </div>
      </div>
    </section>
  );
}
