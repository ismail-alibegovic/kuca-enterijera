import { speciesBySlug } from "@/content/catalog";

export function SpeciesChips({ slugs, size = "md" }: { slugs: string[]; size?: "sm" | "md" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {slugs.map((s) => {
        const sp = speciesBySlug[s];
        return (
          <li key={s} className={`flex items-center gap-2.5 border border-line bg-paper ${size === "sm" ? "py-1.5 pr-3 pl-1.5" : "py-2 pr-4 pl-2"}`}>
            <span aria-hidden className={size === "sm" ? "h-4 w-4" : "h-6 w-6"} style={{ background: sp.tone }} />
            <span className="t-small">{sp.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export const toneDisclaimer =
  "Tonovi su orijentacijski. Stvarna boja drveta ovisi o klasi, obradi i završnom sloju, pa je uvijek provjerite na uzorku u salonu.";
