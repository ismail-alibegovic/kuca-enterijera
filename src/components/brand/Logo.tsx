import Image from "next/image";
import { site } from "@/content/site";

/**
 * PROPOSED modernised identity (pending client approval). The original logo is preserved in
 * /public/brand/original and can be restored via `site.brandLogo = "original"`.
 *
 * Construction: the walls form a square; the leaf is the intersection of two quarter-circles
 * drawn with a compass from the square's opposite corners; the midrib is the square's diagonal.
 */
export function LogoMark({
  className,
  tone = "duo",
  title,
}: {
  className?: string;
  tone?: "duo" | "mono" | "inverse";
  title?: string;
}) {
  const ink = tone === "inverse" ? "var(--color-paper)" : "var(--color-ink)";
  const leaf = tone === "duo" ? "var(--color-oak)" : ink;
  const rib = tone === "inverse" ? "var(--color-ink)" : "var(--color-paper)";
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M10 44 V17 L24 5 L38 17 V44 Z" fill="none" stroke={ink} strokeWidth="1.9" strokeLinejoin="miter" />
      <path d="M10 44 A28 28 0 0 1 38 16 A28 28 0 0 1 10 44 Z" fill={leaf} />
      <path d="M10 44 L38 16" stroke={rib} strokeWidth="1.1" />
    </svg>
  );
}

/** The small leaf that replaces the acute accent on Ć, a nod to the original wordmark. */
function AccentLeaf() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden className="absolute left-1/2 top-[-0.52em] h-[0.42em] w-[0.42em] -translate-x-[15%]">
      <path d="M1 9 A8 8 0 0 1 9 1 A8 8 0 0 1 1 9 Z" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline whitespace-nowrap font-sans font-[560] uppercase tracking-[0.2em] ${className ?? ""}`}>
      <span aria-hidden className="inline-flex">
        KU
        <span className="relative">
          C
          <AccentLeaf />
        </span>
        A&nbsp;ENTERIJERA
      </span>
      <span className="sr-only">Kuća Enterijera</span>
    </span>
  );
}

export function Logo({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  if (site.brandLogo === "original") {
    return (
      <Image
        src="/brand/original/ke-logo.png"
        alt="Kuća Enterijera"
        width={233}
        height={60}
        className={`h-9 w-auto ${inverse ? "invert" : ""}`}
        preload
      />
    );
  }
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark className="h-8 w-8 shrink-0" tone={inverse ? "inverse" : "duo"} />
      <Wordmark className={`text-[0.78rem] ${compact ? "max-sm:hidden" : ""}`} />
    </span>
  );
}
