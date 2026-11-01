import Link from "next/link";
import {
  applicationLabels,
  constructionLabels,
  manufacturerBySlug,
  materialLabels,
  productHref,
  speciesBySlug,
  type Product,
} from "@/content/catalog";

/** Side-by-side overview of product lines. Rows appear only when at least one line has a verified value. */
export function ComparisonTable({ items }: { items: Product[] }) {
  const rows: { label: string; get: (p: Product) => string | undefined }[] = [
    { label: "Materijal", get: (p) => materialLabels[p.material] },
    { label: "Konstrukcija", get: (p) => p.constructions?.map((c) => constructionLabels[c]).join(", ") },
    { label: "Vrste drveta", get: (p) => p.species?.map((s) => speciesBySlug[s].name).join(", ") },
    { label: "Primjena", get: (p) => p.applications.map((a) => applicationLabels[a]).join(", ") },
    { label: "Proizvođač", get: (p) => p.manufacturers?.map((m) => manufacturerBySlug[m].name).join(", ") },
  ];
  const specLabels = Array.from(new Set(items.flatMap((p) => p.specs?.map((s) => s.label) ?? [])));
  for (const l of specLabels) rows.push({ label: l, get: (p) => p.specs?.find((s) => s.label === l)?.value });
  const visible = rows.filter((r) => items.some((p) => r.get(p)));

  return (
    <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)]">
      <table className="w-full min-w-[40rem] table-fixed border-collapse text-left">
        <caption className="sr-only">Usporedba linija proizvoda</caption>
        <thead>
          <tr className="border-b border-ink">
            <th scope="col" className="t-label w-[22%] py-4 pr-6 align-bottom text-mute">
              Linija
            </th>
            {items.map((p) => (
              <th key={p.slug} scope="col" className="py-4 pr-6 align-bottom">
                <Link href={productHref(p)} className="t-h3 link-reveal">
                  {p.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visible.map((r) => (
            <tr key={r.label} className="border-b border-line">
              <th scope="row" className="t-label py-4 pr-6 align-top font-[550] text-mute">
                {r.label}
              </th>
              {items.map((p) => (
                <td key={p.slug} className="t-small py-4 pr-6 align-top">
                  {r.get(p) ?? <span className="text-mute">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
