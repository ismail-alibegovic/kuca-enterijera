import Image from "next/image";
import Link from "next/link";
import { categoryHref } from "@/content/catalog";
import { media } from "@/content/media";

/**
 * The reference's full-width photographic band with light text set directly on the image
 * ("Our mission is to create pieces that feel permanent"). A flat tint keeps the text legible.
 */
export function Doors() {
  const m = media.doorVilla;
  return (
    <section className="relative mt-28 overflow-hidden text-paper md:mt-44" aria-labelledby="vrata-title">
      <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[2.1/1]">
        <Image src={m.src} alt={m.alt} fill sizes="100vw" quality={80} className="object-cover" style={{ objectPosition: m.focus }} />
        <div aria-hidden className="absolute inset-0 bg-ink/35" />
      </div>
      <div className="shell absolute inset-0 flex flex-col justify-between py-8 md:py-12">
        <div className="max-w-[22rem] sm:max-w-[30rem] md:max-w-[34rem]">
          <h2 id="vrata-title" className="t-statement" data-reveal="" suppressHydrationWarning>
            <span className="italic">Sigurnosna vrata</span> talijanske kompanije Dierre — granica između vašeg doma i
            ostatka svijeta.
          </h2>
          <p className="t-small mt-6 hidden max-w-[42ch] md:block">
            Široka paleta blindiranih ulaznih vrata jednog od svjetskih lidera u njihovoj proizvodnji. Odabir modela i
            ponuda u salonu.
          </p>
          <Link href={categoryHref("sigurnosna-vrata")} className="t-small link mt-4 inline-block">
            Sigurnosna vrata
          </Link>
        </div>
        <p className="t-caption self-end opacity-80">Foto: Dierre</p>
      </div>
    </section>
  );
}
