"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { media, type MediaKey } from "@/content/media";

export function Gallery({ images, name }: { images: MediaKey[]; name: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (d: number) => {
      setZoomed(false);
      setActive((a) => (a + d + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      document.documentElement.classList.add("is-locked");
    }
    if (!open && dlg.open) dlg.close();
    if (!open) document.documentElement.classList.remove("is-locked");
  }, [open]);

  // Close if the route is hidden by <Activity> while the lightbox is open.
  useEffect(() => () => document.documentElement.classList.remove("is-locked"), []);

  const current = media[images[active]];

  return (
    <div>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-paper-2 md:aspect-[5/6]"
          aria-label={`Uvećaj fotografiju ${active + 1} od ${images.length}`}
        >
          {images.map((k, i) => (
            <Image
              key={k}
              src={media[k].src}
              alt={i === active ? media[k].alt : ""}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              quality={80}
              preload={i === 0}
              placeholder="blur"
              className={`object-cover transition-[opacity,scale] duration-[1200ms] ease-[var(--ease-architect)] group-hover:scale-[1.02] ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectPosition: media[k].focus }}
            />
          ))}
          <span className="t-label absolute bottom-3 left-3 bg-paper/85 px-2 py-1 text-[0.58rem]">
            {current.provenance === "illustrative" ? "Ilustracija · " : ""}Uvećaj +
          </span>
        </button>
        <p className="t-index absolute -bottom-7 right-0 text-mute" aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </p>
      </div>

      {images.length > 1 ? (
        <ul className="mt-10 grid grid-cols-4 gap-2 md:grid-cols-5" aria-label={`Fotografije: ${name}`}>
          {images.map((k, i) => (
            <li key={k}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Prikaži fotografiju ${i + 1}`}
                aria-current={i === active}
                className={`relative block aspect-square w-full overflow-hidden bg-paper-2 transition-opacity duration-500 ${
                  i === active ? "opacity-100 outline-1 outline-offset-2 outline-ink" : "opacity-55 hover:opacity-100"
                }`}
              >
                <Image src={media[k].src} alt="" fill sizes="120px" quality={70} className="object-cover" style={{ objectPosition: media[k].focus }} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <dialog
        ref={dialogRef}
        onClose={() => {
          setOpen(false);
          setZoomed(false);
          triggerRef.current?.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        aria-label={`${name}: galerija`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink"
      >
        {open ? (
          <div className="on-dark relative flex h-full flex-col">
            <div className="flex items-center justify-between px-[var(--gutter)] py-4">
              <p className="t-label text-paper/70">
                {name} · {String(active + 1).padStart(2, "0")}/{String(images.length).padStart(2, "0")}
                {current.provenance === "illustrative" ? " · Ilustracija" : ""}
              </p>
              <button type="button" onClick={() => setOpen(false)} className="t-label p-2" autoFocus>
                Zatvori ×
              </button>
            </div>
            <div
              className={`relative flex-1 overflow-hidden ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
                setZoomed((z) => !z);
              }}
              onPointerMove={(e) => {
                if (!zoomed || e.pointerType !== "mouse") return;
                const r = e.currentTarget.getBoundingClientRect();
                setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
              }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                quality={80}
                className="object-contain transition-transform duration-700 ease-[var(--ease-architect)]"
                style={{ transform: zoomed ? "scale(2.2)" : "scale(1)", transformOrigin: origin }}
              />
            </div>
            {images.length > 1 ? (
              <div className="flex items-center justify-between px-[var(--gutter)] py-4">
                <button type="button" onClick={() => go(-1)} className="t-label p-2">
                  ← Prethodna
                </button>
                <p className="t-small hidden text-paper/60 md:block">Kliknite na fotografiju za uvećanje detalja</p>
                <button type="button" onClick={() => go(1)} className="t-label p-2">
                  Sljedeća →
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
