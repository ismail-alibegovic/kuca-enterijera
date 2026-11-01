"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/brand/Logo";
import { categories, categoryHref } from "@/content/catalog";
import { fullAddress, mapsUrl, nav, primaryEmail, primaryPhone } from "@/content/site";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!open) return;
    html.classList.add("is-locked");
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Meni"
      inert={!open}
      className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper transition-[clip-path] duration-[900ms] ease-[var(--ease-curtain)] lg:hidden ${
        open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
      }`}
    >
      <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line">
        <Link href="/" onNavigate={onClose}>
          <Logo />
        </Link>
        <button ref={closeRef} type="button" onClick={onClose} className="t-label -mr-2 flex items-center gap-3 p-2 text-[0.7rem]">
          Zatvori <span aria-hidden className="text-lg leading-none">×</span>
        </button>
      </div>

      <nav aria-label="Mobilna navigacija" className="shell flex-1 py-8">
        <p className="t-label mb-4 text-mute">Kolekcije</p>
        <ul className="border-t border-line">
          {categories.map((c, i) => (
            <li key={c.slug} className="border-b border-line">
              <Link
                href={categoryHref(c)}
                onNavigate={onClose}
                className={`flex items-baseline gap-4 py-3.5 transition-[opacity,transform] duration-700 ease-[var(--ease-architect)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${180 + i * 50}ms` : "0ms" } as CSSProperties}
              >
                <span className="t-index w-6 text-mute">{c.index}</span>
                <span className="text-[1.6rem] leading-tight tracking-[-0.02em]">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-8 flex flex-col gap-1">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onNavigate={onClose} className="t-h3 inline-block py-1.5">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shell grid shrink-0 grid-cols-2 gap-px border-t border-line bg-line pb-[env(safe-area-inset-bottom)]">
        <a href={primaryPhone.href} className="flex flex-col gap-1 bg-paper py-5 pr-4">
          <span className="t-label text-mute">Pozovite</span>
          <span className="t-small">{primaryPhone.display}</span>
        </a>
        <a href={primaryEmail.href} className="flex flex-col gap-1 bg-paper py-5 pl-4">
          <span className="t-label text-mute">Pišite</span>
          <span className="t-small break-all">{primaryEmail.display}</span>
        </a>
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="col-span-2 flex items-center justify-between bg-paper py-5">
          <span className="flex flex-col gap-1">
            <span className="t-label text-mute">Salon</span>
            <span className="t-small">{fullAddress}</span>
          </span>
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  );
}
