import Link from "next/link";
import { LogoSvg } from "@/components/brand/Logo";
import { categories, categoryHref } from "@/content/catalog";
import { fullAddress, mapsUrl, nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="shell grid-12 gap-y-12 pt-20 pb-10 md:pt-28">
        <div className="col-span-4 md:col-span-4">
          <p className="t-statement max-w-[18ch] text-[1.75rem]! text-paper/90">
            Dođite vidjeti, dodirnuti <span className="t-serif-italic">i odabrati.</span>
          </p>
        </div>

        <div className="col-span-2 md:col-span-2 md:col-start-6">
          <h2 className="t-label mb-5 text-paper/65">Salon</h2>
          <address className="t-small not-italic text-paper/85">
            {site.showroom.street}
            <br />
            {site.showroom.postalCode} {site.showroom.city}
            <br />
            {site.showroom.country}
          </address>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="t-small link-line mt-4 inline-block text-paper">
            Upute za dolazak ↗
          </a>
        </div>

        <div className="col-span-2 md:col-span-2">
          <h2 className="t-label mb-5 text-paper/65">Kontakt</h2>
          <ul className="t-small space-y-1.5 text-paper/85">
            {site.contact.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="hover:text-paper">
                  {p.display}
                </a>
              </li>
            ))}
            {site.contact.emails.map((e) => (
              <li key={e.href} className="break-all">
                <a href={e.href} className="hover:text-paper">
                  {e.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-2">
          <h2 className="t-label mb-5 text-paper/65">Kolekcije</h2>
          <ul className="t-small space-y-1.5 text-paper/85">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={categoryHref(c)} className="hover:text-paper">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h2 className="t-label mb-5 text-paper/65">Stranice</h2>
          <ul className="t-small space-y-1.5 text-paper/85">
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-paper">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/kontakt#upit" className="hover:text-paper">
                Upit
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* The logo at architectural scale: the wordmark stands on its own floor line. */}
      <div className="shell pt-6 pb-4 md:pt-10" suppressHydrationWarning data-reveal="wipe">
        <div>
          <LogoSvg inverse title={null} className="block h-auto w-full" />
        </div>
      </div>

      <div className="shell flex flex-col gap-3 py-6 text-paper/55 max-md:pb-24 md:flex-row md:items-center md:justify-between">
        <p className="t-small">© {site.copyrightYear} Kuća Enterijera · Parketni centar Sarajevo · {fullAddress}</p>
        <p className="t-small flex gap-5">
          <Link href="/napomene" className="hover:text-paper">
            Napomene o sadržaju i fotografijama
          </Link>
        </p>
      </div>
    </footer>
  );
}
