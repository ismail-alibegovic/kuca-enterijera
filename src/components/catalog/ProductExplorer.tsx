"use client";

import { useMemo } from "react";
import { replaceSearch, useLocationSearch } from "@/lib/useLocationSearch";
import {
  applicationLabels,
  categories,
  constructionLabels,
  materialLabels,
  speciesBySlug,
  type Product,
} from "@/content/catalog";
import { SampleBoard } from "./SampleBoard";

export type FacetKey = "category" | "application" | "material" | "construction" | "origin" | "species";

type Option = { value: string; label: string };

const facetTitles: Record<FacetKey, string> = {
  category: "Kategorija",
  application: "Primjena",
  material: "Materijal",
  construction: "Konstrukcija",
  origin: "Porijeklo drveta",
  species: "Vrsta drveta",
};

/** Values a product carries for a facet, derived only from verified metadata. */
function valuesOf(p: Product, f: FacetKey): string[] {
  switch (f) {
    case "category":
      return [p.category];
    case "application":
      return p.applications;
    case "material":
      return [p.material];
    case "construction":
      return p.constructions ?? [];
    case "origin":
      return Array.from(new Set((p.species ?? []).map((s) => speciesBySlug[s].origin)));
    case "species":
      return p.species ?? [];
  }
}

function labelOf(f: FacetKey, v: string): string {
  switch (f) {
    case "category":
      return categories.find((c) => c.slug === v)?.short ?? v;
    case "application":
      return applicationLabels[v as keyof typeof applicationLabels];
    case "material":
      return materialLabels[v as keyof typeof materialLabels];
    case "construction":
      return constructionLabels[v as keyof typeof constructionLabels];
    case "origin":
      return v === "domace" ? "Domaće vrste" : "Egzotične vrste";
    case "species":
      return speciesBySlug[v]?.name ?? v;
  }
}

type State = Partial<Record<FacetKey, string[]>>;

const matches = (p: Product, state: State, skip?: FacetKey) =>
  (Object.keys(state) as FacetKey[]).every((f) => {
    if (f === skip) return true;
    const sel = state[f];
    if (!sel?.length) return true;
    const vals = valuesOf(p, f);
    return sel.some((s) => vals.includes(s));
  });

export function ProductExplorer({
  products,
  facets,
  columns = "md:grid-cols-2 xl:grid-cols-3",
  headingLevel = "h2",
}: {
  products: Product[];
  facets: FacetKey[];
  columns?: string;
  headingLevel?: "h2" | "h3";
}) {
  // Filters live in the URL (shareable, survives reload); read on the client only, so the page stays prerendered.
  const search = useLocationSearch();
  const state = useMemo<State>(() => {
    const params = new URLSearchParams(search);
    const out: State = {};
    for (const f of facets) {
      const v = params.get(f);
      if (v) out[f] = v.split(",").filter(Boolean);
    }
    return out;
  }, [search, facets]);

  const write = (next: State) => {
    const params = new URLSearchParams(window.location.search);
    for (const f of facets) {
      const v = next[f];
      if (v?.length) params.set(f, v.join(","));
      else params.delete(f);
    }
    replaceSearch(params);
  };

  const toggle = (f: FacetKey, v: string) => {
    const cur = state[f] ?? [];
    write({ ...state, [f]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] });
  };
  const clear = (f?: FacetKey) => write(f ? { ...state, [f]: [] } : {});

  const options = useMemo(() => {
    const out = {} as Record<FacetKey, (Option & { count: number })[]>;
    for (const f of facets) {
      const all = Array.from(new Set(products.flatMap((p) => valuesOf(p, f))));
      out[f] = all.map((v) => ({
        value: v,
        label: labelOf(f, v),
        // Facet counts reflect the other active filters (standard faceted-search behaviour).
        count: products.filter((p) => matches(p, state, f) && valuesOf(p, f).includes(v)).length,
      }));
    }
    return out;
  }, [products, facets, state]);

  const results = products.filter((p) => matches(p, state));
  const activeCount = Object.values(state).reduce((n, v) => n + (v?.length ?? 0), 0);

  return (
    <div>
      <div className="border-y border-line" role="group" aria-label="Filteri proizvoda">
        {facets.map((f) => (
          <fieldset key={f} className="flex min-w-0 items-center gap-x-6 border-b border-line py-3 last:border-b-0 max-md:flex-col max-md:items-start max-md:gap-y-2">
            <legend className="sr-only">{facetTitles[f]}</legend>
            <span aria-hidden className="t-label w-40 shrink-0 text-mute">
              {facetTitles[f]}
            </span>
            <div className="-mx-1 flex max-w-full gap-1.5 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] md:flex-wrap">
              <button
                type="button"
                aria-pressed={!state[f]?.length}
                onClick={() => clear(f)}
                className={`t-small shrink-0 border px-3 py-2 transition-colors duration-300 ${
                  !state[f]?.length ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                }`}
              >
                Sve
              </button>
              {options[f].map((o) => {
                const on = state[f]?.includes(o.value) ?? false;
                const disabled = !on && o.count === 0;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={on}
                    disabled={disabled}
                    onClick={() => toggle(f, o.value)}
                    className={`t-small flex shrink-0 items-center gap-2 border px-3 py-2 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${
                      on ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                    }`}
                  >
                    {f === "species" ? (
                      <span aria-hidden className="h-3 w-3 border border-ink/10" style={{ backgroundColor: speciesBySlug[o.value]?.tone }} />
                    ) : null}
                    {o.label}
                    <span className={`t-index ${on ? "text-paper/60" : "text-mute"}`}>{o.count}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="flex items-center justify-between py-5">
        <p className="t-label text-mute" aria-live="polite">
          {results.length} {results.length === 1 ? "linija proizvoda" : results.length < 5 ? "linije proizvoda" : "linija proizvoda"}
        </p>
        {activeCount > 0 ? (
          <button type="button" onClick={() => clear()} className="t-label link-line">
            Poništi filtere ({activeCount})
          </button>
        ) : null}
      </div>

      {results.length ? (
        <div className={`grid grid-cols-1 gap-x-[var(--col-gap)] gap-y-12 ${columns} xl:[&>*:nth-child(3n+2)]:mt-16`}>
          {results.map((p, i) => (
            <SampleBoard key={p.slug} product={p} number={String(i + 1).padStart(2, "0")} delay={(i % 3) * 90} headingLevel={headingLevel} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="t-h3">Nema linija proizvoda za odabranu kombinaciju.</p>
          <p className="t-small mt-2 text-mute">Pokušajte s manje filtera ili nas pitajte: ponuda u salonu je šira od kataloga.</p>
          <button type="button" onClick={() => clear()} className="t-label link-line mt-6">
            Poništi filtere
          </button>
        </div>
      )}
    </div>
  );
}
