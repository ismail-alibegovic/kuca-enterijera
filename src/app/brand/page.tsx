import type { Metadata } from "next";
import Image from "next/image";
import { LogoMark, Wordmark } from "@/components/brand/Logo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Prijedlog vizualnog identiteta",
  description: "Prijedlog moderniziranog znaka Kuće Enterijera: kuća i list konstruisani iz kvadrata. Nije odobreno.",
  path: "/brand",
  noindex: true,
});

export default function BrandPage() {
  return (
    <div className="shell pt-8 pb-24">
      <Breadcrumbs items={[{ name: "Početna", path: "/" }, { name: "Prijedlog identiteta", path: "/brand" }]} />
      <div className="mt-10 border-l-2 border-oak pl-4">
        <p className="t-label">Prijedlog · čeka odobrenje klijenta</p>
        <p className="t-small mt-1 max-w-[70ch] text-ink/70">
          Ovo je prijedlog, ne zamjena postojećeg logotipa. Originalni logo je sačuvan nepromijenjen u <code>/public/brand/original</code>. Web stranica može koristiti
          bilo koju verziju preko jedne postavke (<code>site.brandLogo</code>).
        </p>
      </div>

      <h1 className="t-display mt-12">
        Kuća i list, <span className="t-serif-italic text-oak-deep">iz jednog kvadrata.</span>
      </h1>

      <section className="grid-12 mt-16 gap-y-10" aria-label="Usporedba">
        <figure className="col-span-4 md:col-span-5">
          <div className="flex aspect-[4/3] items-center justify-center border border-line bg-white p-10">
            <Image src="/brand/original/ke-logo.png" alt="Postojeći logo Kuće Enterijera" width={233} height={60} className="w-[80%] max-w-[466px]" />
          </div>
          <figcaption className="t-small mt-3 text-mute">Postojeći logo (raster 233×60 px, jedini dostupni format)</figcaption>
        </figure>
        <figure className="col-span-4 md:col-span-7">
          <div className="flex aspect-[4/3] items-center justify-center gap-6 border border-ink bg-paper p-10 md:aspect-[7/4]">
            <LogoMark className="h-24 w-24 md:h-32 md:w-32" />
            <Wordmark className="text-[1.15rem] md:text-[1.6rem]" />
          </div>
          <figcaption className="t-small mt-3 text-mute">Prijedlog: znak + riječni znak (Instrument Sans, razmak slova 0,2 em)</figcaption>
        </figure>
      </section>

      <section className="grid-12 mt-24 gap-y-10" aria-labelledby="konstrukcija">
        <div className="col-span-4 md:col-span-4">
          <SectionLabel>Konstrukcija</SectionLabel>
          <h2 id="konstrukcija" className="t-h2 mt-6">
            Geometrija, <span className="t-serif-italic">ne ilustracija.</span>
          </h2>
          <ul className="t-body mt-6 space-y-3 text-ink/75">
            <li>Zidovi kuće čine kvadrat, a krov je jednostavan zabat.</li>
            <li>List je presjek dvaju četvrtina kruga, povučenih šestarom iz suprotnih uglova kvadrata.</li>
            <li>Središnja žila lista je dijagonala kvadrata koja spaja pod i strehu.</li>
            <li>Akcent na slovu Ć je mali list, kao poveznica s originalnim logotipom.</li>
          </ul>
        </div>
        <div className="col-span-4 md:col-span-7 md:col-start-6">
          <svg viewBox="0 0 48 48" className="w-full max-w-[520px] border border-line bg-paper" role="img" aria-label="Konstrukcijski crtež znaka">
            <g stroke="var(--color-oak)" strokeWidth="0.2" fill="none" strokeDasharray="0.8 0.8">
              <rect x="10" y="16" width="28" height="28" />
              <circle cx="10" cy="16" r="28" />
              <circle cx="38" cy="44" r="28" />
              <path d="M10 44 L38 16" />
            </g>
            <path d="M10 44 V17 L24 5 L38 17 V44 Z" fill="none" stroke="var(--color-ink)" strokeWidth="0.6" />
            <path d="M10 44 A28 28 0 0 1 38 16 A28 28 0 0 1 10 44 Z" fill="var(--color-oak)" fillOpacity="0.25" stroke="var(--color-oak-deep)" strokeWidth="0.3" />
          </svg>
        </div>
      </section>

      <section className="mt-24" aria-labelledby="primjena">
        <SectionLabel>Primjena</SectionLabel>
        <h2 id="primjena" className="sr-only">
          Primjena
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          <li className="flex aspect-square flex-col items-center justify-center gap-3 bg-paper">
            <LogoMark className="h-20 w-20" />
            <span className="t-label text-mute">Dvobojni</span>
          </li>
          <li className="flex aspect-square flex-col items-center justify-center gap-3 bg-paper">
            <LogoMark tone="mono" className="h-20 w-20" />
            <span className="t-label text-mute">Jednobojni</span>
          </li>
          <li className="on-dark flex aspect-square flex-col items-center justify-center gap-3 bg-ink">
            <LogoMark tone="inverse" className="h-20 w-20" />
            <span className="t-label text-paper/60">Inverzni</span>
          </li>
          <li className="flex aspect-square flex-col items-center justify-center gap-4 bg-paper">
            <div className="flex items-end gap-4">
              <Image src="/brand/proposal/mark-solid-small.svg" alt="" width={32} height={32} />
              <Image src="/brand/proposal/mark-solid-small.svg" alt="" width={24} height={24} />
              <Image src="/brand/proposal/mark-solid-small.svg" alt="" width={16} height={16} />
            </div>
            <span className="t-label text-mute">Male veličine · 32/24/16 px</span>
          </li>
        </ul>
        <p className="t-small mt-4 text-mute">
          Datoteke: <code>/public/brand/proposal/*.svg</code>. Prije produkcije riječni znak treba pretvoriti u krivulje i provjeriti zaštitu znaka.
        </p>
      </section>
    </div>
  );
}
