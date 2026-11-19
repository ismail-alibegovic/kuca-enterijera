import { ACCENT, BRAND, HOUSE, LEAF, ROOF, STEM, TEXT } from "./logoPaths";

/**
 * The original Kuća Enterijera logo, redrawn as a vector from the client's 233×60 px PNG
 * (preserved untouched in /public/brand/original). Orange roof, green house outline with the leaf
 * growing out of the floor, and the wordmark standing on the same floor line.
 *
 * `data-logo-part` hooks let the motion system draw the logo in on first load.
 */
export function LogoSvg({
  inverse = false,
  className,
  title = "Kuća Enterijera",
  markOnly = false,
}: {
  inverse?: boolean;
  className?: string;
  title?: string | null;
  markOnly?: boolean;
}) {
  const ink = inverse ? "var(--color-paper)" : "var(--color-ink)";
  return (
    <svg
      viewBox={markOnly ? "3.6 14.2 35 29" : "3.5 13.8 223.6 30"}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title ?? undefined}
      data-logo
    >
      <path data-logo-part="roof" d={ROOF} fill={BRAND.orange} />
      <g fill="none" stroke={BRAND.green}>
        <path data-logo-part="house" d={HOUSE} pathLength={1} strokeWidth="1.35" strokeLinecap="square" />
        <path data-logo-part="leaf" d={LEAF} pathLength={1} strokeWidth="1.25" />
        <path data-logo-part="leaf" d={STEM} pathLength={1} strokeWidth="1.25" strokeLinecap="round" />
        {markOnly ? null : <path data-logo-part="accent" d={ACCENT} pathLength={1} strokeWidth=".95" />}
      </g>
      {markOnly ? null : (
        <>
          <path data-logo-part="text" d={TEXT} fill={ink} stroke={ink} strokeWidth=".9" strokeLinejoin="round" />
          <rect data-logo-part="floor" x="42.6" y="41.6" width="183.8" height="1.4" fill={ink} />
        </>
      )}
    </svg>
  );
}

export function Logo({ inverse = false, className = "h-8 w-auto md:h-9" }: { inverse?: boolean; className?: string }) {
  return <LogoSvg inverse={inverse} className={className} />;
}
