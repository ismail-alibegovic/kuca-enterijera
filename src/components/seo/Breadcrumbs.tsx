import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items, className = "" }: { items: { name: string; path: string }[]; className?: string }) {
  return (
    <>
      <nav aria-label="Putanja" className={className}>
        <ol className="t-label flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.62rem] text-mute">
          {items.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2.5">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {it.name}
                </span>
              ) : (
                <Link href={it.path} className="hover:text-ink">
                  {it.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
