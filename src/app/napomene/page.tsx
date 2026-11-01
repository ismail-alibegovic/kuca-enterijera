import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Napomene o sadržaju i fotografijama",
  description: "Porijeklo fotografija i sadržaja na web stranici Kuće Enterijera.",
  path: "/napomene",
  noindex: true,
});

export default function NotesPage() {
  const entries = Object.entries(media);
  return (
    <div className="shell pt-8 pb-24">
      <Breadcrumbs items={[{ name: "Početna", path: "/" }, { name: "Napomene", path: "/napomene" }]} />
      <h1 className="t-h1 mt-10 max-w-[20ch]">Napomene o sadržaju i fotografijama</h1>
      <div className="t-body mt-10 max-w-[68ch] space-y-5 text-ink/80">
        <p>
          Podaci o ponudi, proizvođačima i kontaktu preuzeti su s postojeće web stranice {site.name}. Gdje podatak nije bio dostupan (npr. dimenzije,
          cijene, radno vrijeme), izostavili smo ga umjesto da ga pretpostavljamo.
        </p>
        <p>
          <strong className="font-[560]">Sve fotografije prostora i materijala trenutno su ilustrativne</strong> (Unsplash License) i ne prikazuju proizvode,
          salon ni projekte Kuće Enterijera. Označene su oznakom „Ilustracija”. Zamijenit ćemo ih autentičnim fotografijama čim budu dostupne.
        </p>
        <p>Logotipi proizvođača preuzeti su s postojeće web stranice i prikazani jednobojno radi ujednačenosti.</p>
        <p>
          Tonovi vrsta drveta su orijentacijski. Stvarnu boju uvijek provjerite na uzorku. Prijedlog novog vizualnog identiteta opisan je na stranici{" "}
          <Link href="/brand" className="link-line">
            Prijedlog identiteta
          </Link>
          .
        </p>
      </div>

      <h2 className="t-label mt-16 mb-4 text-mute">Popis fotografija</h2>
      <div className="overflow-x-auto">
        <table className="t-small w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink">
              <th className="t-label py-3 pr-4">Opis</th>
              <th className="t-label py-3 pr-4">Porijeklo</th>
              <th className="t-label py-3">Izvor i licenca</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([k, m]) => (
              <tr key={k} className="border-b border-line align-top">
                <td className="py-3 pr-4">{m.alt}</td>
                <td className="py-3 pr-4">{m.provenance === "illustrative" ? "Ilustracija" : m.provenance === "company" ? "Kuća Enterijera" : "Proizvođač"}</td>
                <td className="py-3">
                  <a href={m.source} className="link-line break-all" target="_blank" rel="noreferrer">
                    {m.source.replace("https://", "")}
                  </a>
                  <span className="block text-mute">{m.license}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
