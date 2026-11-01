import { Cta } from "@/components/ui/Cta";
import { PlankGrid } from "@/components/ui/PlankGrid";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <PlankGrid className="opacity-60" />
      <div className="shell relative grid-12 min-h-[70svh] content-center gap-y-8 py-24">
        <p className="t-label col-span-4 md:col-span-12">Greška 404</p>
        <h1 className="t-mega col-span-4 md:col-span-9">
          Ova daska <span className="t-serif-italic text-oak-deep">nedostaje.</span>
        </h1>
        <p className="t-lead col-span-4 max-w-[40ch] text-ink/75 md:col-span-5">Stranica koju tražite ne postoji ili je premještena.</p>
        <div className="col-span-4 flex flex-col gap-3 sm:flex-row md:col-span-8">
          <Cta href="/">Početna</Cta>
          <Cta href="/kolekcije" variant="outline">
            Kolekcije
          </Cta>
        </div>
      </div>
    </section>
  );
}
