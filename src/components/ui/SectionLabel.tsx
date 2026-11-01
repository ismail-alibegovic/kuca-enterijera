import type { ReactNode } from "react";

/** Catalogue-style section marker: "Nº 03 — Kolekcije". */
export function SectionLabel({ index, children, className = "" }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`t-label flex items-center gap-3 ${className}`} suppressHydrationWarning data-reveal="fade">
      {index ? <span className="t-index tracking-normal opacity-60">Nº {index}</span> : null}
      {index ? <span aria-hidden className="h-px w-8 bg-current opacity-40" /> : null}
      <span>{children}</span>
    </p>
  );
}
