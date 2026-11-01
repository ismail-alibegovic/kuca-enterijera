"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { productBySlug, productHref } from "@/content/catalog";
import { inspiration, spaceLabels, type Space } from "@/content/inspiration";
import { media } from "@/content/media";

/** Varying frame proportions + column spans keep the rhythm editorial rather than a uniform grid. */
const frames = [
  "md:col-span-7 aspect-[4/3]",
  "md:col-span-4 md:col-start-9 md:mt-32 aspect-[3/4]",
  "md:col-span-4 md:col-start-2 aspect-[4/5]",
  "md:col-span-6 md:col-start-7 md:mt-20 aspect-[16/10]",
  "md:col-span-5 aspect-square",
  "md:col-span-6 md:col-start-7 md:-mt-12 aspect-[4/3]",
];

export function InspirationGallery() {
  const [space, setSpace] = useState<Space | "sve">("sve");
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const list = inspiration.filter((e) => space === "sve" || e.space === space);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const current = open !== null ? list[open] : null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-y border-line py-3" role="group" aria-label="Vrsta prostora">
        <span className="t-label mr-4 text-mute">Prostor</span>
        {(["sve", "rezidencijalni", "poslovni", "komercijalni"] as const).map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={space === s}
            onClick={() => setSpace(s)}
            className={`t-small border px-3 py-2 transition-colors duration-300 ${space === s ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
          >
            {s === "sve" ? "Svi" : spaceLabels[s]}
            <span className={`t-index ml-2 ${space === s ? "text-paper/60" : "text-mute"}`}>
              {s === "sve" ? inspiration.length : inspiration.filter((e) => e.space === s).length}
            </span>
          </button>
        ))}
      </div>

      <ul className="grid-12 mt-14 gap-y-14 md:gap-y-10">
        {list.map((e, i) => (
          <li key={e.id} id={e.id} className={`col-span-4 scroll-mt-32 ${frames[i % frames.length].replace(/aspect-\S+/, "")}`}>
            <button type="button" onClick={() => setOpen(i)} className="group block w-full text-left" aria-label={`Otvori: ${e.title}`}>
              <div className={`img-zoom relative overflow-hidden bg-paper-2 ${frames[i % frames.length].match(/aspect-\S+/)?.[0]}`}>
                <Image
                  src={media[e.image].src}
                  alt={media[e.image].alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  quality={70}
                  placeholder="blur"
                  className="object-cover"
                  style={{ objectPosition: media[e.image].focus }}
                />
              </div>
            </button>
            <div className="mt-4 grid grid-cols-[1fr_auto] gap-x-6">
              <h3 className="t-h3">{e.title}</h3>
              <p className="t-label pt-1 text-[0.58rem] text-mute">
                {spaceLabels[e.space]} · {e.kind === "project" ? "Projekat" : "Inspiracija"}
              </p>
              <p className="t-small col-span-2 mt-2 max-w-[52ch] text-ink/70">{e.note}</p>
              <p className="t-small col-span-2 mt-3 flex flex-wrap gap-x-4 gap-y-1">
                <span className="text-mute">Uklapa se:</span>
                {e.relatedProducts.map((r) => (
                  <Link key={r} href={productHref(productBySlug[r])} className="link-line">
                    {productBySlug[r].name}
                  </Link>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <dialog
        ref={dlg}
        onClose={() => setOpen(null)}
        onKeyDown={(ev) => {
          if (open === null) return;
          if (ev.key === "ArrowRight") setOpen((open + 1) % list.length);
          if (ev.key === "ArrowLeft") setOpen((open - 1 + list.length) % list.length);
        }}
        aria-label="Galerija inspiracije"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink"
      >
        {current ? (
          <div className="on-dark flex h-full flex-col">
            <div className="flex items-center justify-between px-[var(--gutter)] py-4">
              <p className="t-label text-paper/70">
                {current.title} · Ilustracija
              </p>
              <button type="button" className="t-label p-2" onClick={() => setOpen(null)} autoFocus>
                Zatvori ×
              </button>
            </div>
            <div className="relative flex-1">
              <Image src={media[current.image].src} alt={media[current.image].alt} fill sizes="100vw" quality={80} className="object-contain" />
            </div>
            <div className="flex items-center justify-between px-[var(--gutter)] py-4">
              <button type="button" className="t-label p-2" onClick={() => setOpen((open! - 1 + list.length) % list.length)}>
                ← Prethodna
              </button>
              <p className="t-index text-paper/60">
                {String(open! + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
              </p>
              <button type="button" className="t-label p-2" onClick={() => setOpen((open! + 1) % list.length)}>
                Sljedeća →
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
