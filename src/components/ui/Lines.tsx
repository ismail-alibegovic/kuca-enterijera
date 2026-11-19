import type { CSSProperties, ElementType, ReactNode } from "react";
import { Split } from "@/components/motion/Split";

/**
 * Display heading set line by line. The motion system splits it into words that rise from behind
 * their own baseline (`data-split`); without JavaScript or with reduced motion it renders as plain text.
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
    <Tag id={id} className={className} suppressHydrationWarning data-split="" style={{ "--d": delay } as CSSProperties}>
      <Split>
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </Split>
    </Tag>
  );
}
