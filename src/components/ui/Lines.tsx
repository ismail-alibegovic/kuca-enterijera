import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Headline split into masked lines that rise into place. Pass each line as an array item.
 */
export function Lines({
  as: Tag = "h2",
  lines,
  className,
  delay = 0,
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag id={id} className={className} suppressHydrationWarning data-reveal="lines" style={{ "--d": delay } as CSSProperties}>
      {lines.map((l, i) => (
        <span key={i} className="line">
          <span style={{ "--i": i } as CSSProperties}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
