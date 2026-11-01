import Link from "next/link";
import type { CSSProperties } from "react";
import { Photo } from "@/components/ui/Photo";
import {
  applicationLabels,
  categoryBySlug,
  constructionLabels,
  materialLabels,
  productHref,
  speciesBySlug,
  type Product,
} from "@/content/catalog";

/**
 * A product line presented like a showroom sample board: tall material image plus a specimen label.
 */
export function SampleBoard({
  product,
  number,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 768px) 30vw, 85vw",
  delay = 0,
  headingLevel = "h3",
}: {
  product: Product;
  number?: string;
  aspect?: string;
  sizes?: string;
  delay?: number;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const cat = categoryBySlug[product.category];
  const meta = [
    product.constructions?.map((c) => constructionLabels[c]).join(" / "),
    materialLabels[product.material],
    product.applications.map((a) => applicationLabels[a]).join(" · "),
  ].filter(Boolean);

  return (
    <article className="group relative" suppressHydrationWarning data-reveal="up" style={{ "--d": delay } as CSSProperties}>
      <Link href={productHref(product)} className="block focus-visible:outline-offset-8">
        <Photo id={product.images[0]} sizes={sizes} className={aspect} reveal={false} zoom tag />
        <div className="mt-0 border-x border-b border-line bg-paper px-4 pt-3 pb-4">
          <div className="flex items-baseline justify-between gap-4">
            <span className="t-index text-mute">{number ?? cat.index} · {cat.short}</span>
            <span aria-hidden className="arrow t-index">→</span>
          </div>
          <H className="t-h3 mt-3">
            <span className="link-reveal">{product.name}</span>
          </H>
          <p className="t-small mt-1 text-mute">{product.tagline}</p>
          {product.species?.length ? (
            <div className="mt-4 flex items-center gap-1.5" aria-label={`${product.species.length} vrsta drveta`}>
              {product.species.slice(0, 9).map((s) => (
                <span
                  key={s}
                  title={speciesBySlug[s].name}
                  className="h-3 w-3 border border-ink/10"
                  style={{ backgroundColor: speciesBySlug[s].tone }}
                />
              ))}
              <span className="t-index ml-2 text-mute">{product.species.length} vrsta</span>
            </div>
          ) : null}
          <p className="t-label mt-4 border-t border-line pt-3 text-[0.6rem] text-mute">{meta.join(" — ")}</p>
        </div>
      </Link>
    </article>
  );
}
