import { Cta } from "@/components/ui/Cta";
import { PlankGrid } from "@/components/ui/PlankGrid";
import { primaryPhone } from "@/content/site";

export function InquiryBand({ title, italic, productSlug }: { title: string; italic: string; productSlug?: string }) {
  const href = `/kontakt${productSlug ? `?proizvod=${productSlug}` : ""}#upit`;
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-paper" aria-label="Upit">
      <PlankGrid className="opacity-50" />
      <div className="shell grid-12 relative gap-y-10 py-20 md:py-28">
        <h2 className="t-h1 col-span-4 md:col-span-7" suppressHydrationWarning data-reveal="up">
          {title} <span className="t-serif-italic text-sand">{italic}</span>
        </h2>
        <div className="col-span-4 flex flex-col items-start justify-end gap-4 md:col-span-4 md:col-start-9" suppressHydrationWarning data-reveal="up">
          <p className="t-body text-paper/70">Recite nam prostor i približnu površinu, a mi pripremamo ponudu i savjet.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Cta href={href} variant="solid-inverse">
              Zatražite ponudu
            </Cta>
            <Cta href={primaryPhone.href} variant="line" className="text-paper">
              {primaryPhone.display}
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
