import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "line" | "solid-inverse" | "outline" | "outline-inverse";

const styles: Record<Variant, string> = {
  solid:
    "bg-ink text-paper hover:bg-charcoal px-6 py-4 min-h-12 inline-flex items-center justify-between gap-6 transition-colors duration-500",
  "solid-inverse":
    "bg-paper text-ink hover:bg-sand px-6 py-4 min-h-12 inline-flex items-center justify-between gap-6 transition-colors duration-500",
  outline:
    "border border-ink/80 text-ink hover:bg-ink hover:text-paper px-6 py-4 min-h-12 inline-flex items-center justify-between gap-6 transition-colors duration-500",
  "outline-inverse":
    "border border-paper/60 text-paper hover:bg-paper hover:text-ink px-6 py-4 min-h-12 inline-flex items-center justify-between gap-6 transition-colors duration-500",
  line: "link-line inline-flex items-center gap-3 py-2",
};

export function Cta({
  href,
  children,
  variant = "solid",
  className = "",
  arrow = true,
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; className?: string; arrow?: boolean } & Omit<
  ComponentProps<"a">,
  "href"
>) {
  const external = /^(tel:|mailto:|https?:)/.test(href);
  const content = (
    <>
      <span className="t-label text-[0.72rem] tracking-[0.14em]">{children}</span>
      {arrow ? (
        <span aria-hidden className="arrow text-[1rem] leading-none">
          →
        </span>
      ) : null}
    </>
  );
  const cls = `${styles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} {...rest} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
