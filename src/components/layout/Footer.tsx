"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Photo } from "@/components/ui/Photo";
import { mapsUrl, nav, site } from "@/content/site";

/**
 * Closing contact block + footer, after the reference's "GET IN TOUCH" composition.
 * On /kontakt the large block is omitted (the page itself is the contact block).
 */
export function Footer() {
  const pathname = usePathname();
  const compact = pathname === "/kontakt";
  const { phones, emails } = site.contact;

  return (
    <footer className="mt-24 border-t border-line md:mt-36">
      {!compact ? (
        <section className="shell pt-12 md:pt-16" aria-labelledby="footer-title">
          <div className="grid-12 gap-y-10">
            <h2 id="footer-title" className="t-mega col-span-4 md:col-span-10">
              Posjetite sal<span className="italic">o</span>n
            </h2>
            <Photo
              id="oakStudy"
              sizes="(min-width: 768px) 15vw, 40vw"
              className="col-span-2 md:col-span-2 md:col-start-11"
              frameClassName="aspect-[5/6]"
              reveal={false}
            />
          </div>

          <div className="grid-12 mt-12 gap-y-10 md:mt-16">
            <div className="col-span-4 md:col-span-5">
              <a href={emails[0].href} className="t-h3 link-hover">
                {emails[0].display}
              </a>
              <p className="t-small mt-4 max-w-[36ch] text-ink/75">
                Za ponude, uzorke i savjet pri odabiru poda. U salonu možete pogledati dio našeg asortimana i porazgovarati s
                našim osobljem.
              </p>
              <Link href="/kontakt#upit" className="t-h3 link mt-12 inline-block uppercase tracking-[-0.01em] md:mt-24">
                Zatražite ponudu/
              </Link>
            </div>

            <div className="t-small col-span-2 md:col-span-3 md:col-start-7">
              <p>
                {site.showroom.street}
                <br />
                {site.showroom.postalCode} {site.showroom.city}
              </p>
              <p className="mt-3">
                {phones.map((p) => (
                  <a key={p.href} href={p.href} className="link-hover block w-fit">
                    {p.display}
                  </a>
                ))}
              </p>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="link mt-3 inline-block">
                Upute za dolazak
              </a>
            </div>

            <nav aria-label="Podnožje" className="t-small col-span-2 md:col-span-2 md:col-start-10">
              <ul className="space-y-[0.3rem]">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-hover">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      ) : null}

      <div className="shell mt-16 pb-8 md:mt-24 md:pb-10">
        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
          <div className="t-caption flex flex-wrap gap-x-10 gap-y-2 text-ink/70">
            <span>
              © {site.copyrightYear} {site.name}
            </span>
            <span>{site.tagline}</span>
            <a href={emails[1].href} className="link-hover">
              {emails[1].display}
            </a>
          </div>
          <Link href="/" aria-label={`${site.name}, naslovna`} className="block w-[186px] md:w-[233px]">
            <Logo width={233} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
