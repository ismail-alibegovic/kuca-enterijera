import Link from "next/link";
import { primaryPhone } from "@/content/site";

/** Quiet closing call to action on internal pages: one statement, two text links. */
export function InquiryLine({ subject, productSlug }: { subject: string; productSlug?: string }) {
  const href = productSlug ? `/kontakt?proizvod=${productSlug}#upit` : "/kontakt#upit";
  return (
    <section className="shell pt-24 md:pt-36" aria-label="Upit">
      <div className="grid-12 gap-y-6 border-t border-line pt-10 md:pt-14">
        <p className="t-statement indent col-span-4 md:col-span-7">
          Zanima vas <span className="italic">{subject}</span>? Opišite nam prostor i namjenu — pripremit ćemo ponudu.
        </p>
        <div className="t-small col-span-4 flex flex-col items-start gap-2 md:col-span-3 md:col-start-10 md:self-end">
          <Link href={href} className="link">
            Zatražite ponudu
          </Link>
          <a href={primaryPhone.href} className="link-hover">
            Nazovite {primaryPhone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
