import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import type { MediaKey } from "@/content/media";

/**
 * Internal-page version of the reference hero: title on the left, a small photograph and a short
 * text in the column at ~60%, optionally followed by one wide photograph with captions.
 */
export function PageIntro({
  id,
  title,
  text,
  crumbs,
  thumb,
  wide,
  wideCaption,
  children,
}: {
  id: string;
  title: ReactNode;
  text: ReactNode;
  crumbs: { name: string; path: string }[];
  thumb?: MediaKey;
  wide?: MediaKey;
  wideCaption?: [ReactNode, ReactNode?];
  children?: ReactNode;
}) {
  return (
    <section className="shell pt-10 md:pt-16" aria-labelledby={id}>
      <Breadcrumbs items={crumbs} />
      <div className="grid-12 mt-8 gap-y-8 md:mt-12">
        <h1 id={id} className="t-title col-span-4 md:col-span-7">
          {title}
        </h1>
        <div className="col-span-4 grid grid-cols-4 gap-x-[var(--col-gap)] md:col-span-4 md:col-start-8">
          {thumb ? (
            <Photo id={thumb} preload sizes="(min-width: 768px) 14vw, 45vw" className="col-span-2 mb-5" frameClassName="aspect-[3/2]" reveal={false} />
          ) : null}
          <div className="col-span-4 md:col-span-3">
            <div className="t-small text-ink/80">{text}</div>
            {children ? <div className="t-small mt-3 flex flex-wrap gap-x-6 gap-y-1">{children}</div> : null}
          </div>
        </div>
      </div>
      {wide ? (
        <>
          <Photo
            id={wide}
            preload
            sizes="100vw"
            className="mt-10 md:mt-16"
            frameClassName="aspect-[4/3] sm:aspect-[16/9] md:aspect-[2.45/1]"
            reveal={false}
          />
          {wideCaption ? (
            <div className="grid-12 t-caption mt-2.5 text-mute">
              <p className="col-span-2 md:col-span-6">{wideCaption[0]}</p>
              {wideCaption[1] ? <p className="col-span-2 text-right md:col-span-5 md:col-start-8 md:text-left">{wideCaption[1]}</p> : null}
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
