"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { nav, primaryPhone, site } from "@/content/site";

/**
 * Header after the reference: logo left, a small address/phone block beside it, one text-only nav
 * column at the middle of the page and a quiet link on the right. Static (not sticky), no buttons,
 * no borders. On phones, a single "Izbornik" text button opens a full-screen panel.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu on navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="shell relative z-40">
      <div className="grid-12 items-start pt-6 pb-4 md:pt-9">
        <Link href="/" className="col-span-2 block w-[150px] pt-0.5 md:col-span-2 md:w-[168px] lg:w-[186px]" aria-label={`${site.name}, naslovna`}>
          <Logo preload width={186} />
        </Link>

        <p className="t-label col-span-3 col-start-4 hidden text-ink/80 lg:block">
          {site.showroom.city}, {site.showroom.country}
          <br />
          <a href={primaryPhone.href} className="link-hover">
            {primaryPhone.display}
          </a>
        </p>

        <nav aria-label="Glavna navigacija" className="col-span-2 col-start-7 hidden md:block">
          <ul className="t-label space-y-[0.3rem]">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`link-hover ${isActive(n.href) ? "text-ink" : "text-ink/75 hover:text-ink"}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-3 col-start-10 hidden justify-end md:flex">
          <Link href="/kontakt#upit" className="t-label link">
            Zatražite ponudu
          </Link>
        </div>

        <div className="col-span-2 col-start-3 flex justify-end md:hidden">
          <button
            ref={buttonRef}
            type="button"
            className="t-label -mr-2 min-h-11 px-2"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Zatvori" : "Izbornik"}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-0 bottom-0 z-[-1] overflow-y-auto bg-paper px-[var(--gutter)] pt-24 pb-10 md:hidden"
      >
        <nav aria-label="Mobilna navigacija">
          <ul className="border-t border-line">
            {nav.map((n) => (
              <li key={n.href} className="border-b border-line">
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className="block py-4 text-[2rem] leading-tight tracking-[-0.02em]"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="t-small mt-10 space-y-1 text-ink/80">
          <p>
            {site.showroom.street}, {site.showroom.postalCode} {site.showroom.city}
          </p>
          <p>
            <a href={primaryPhone.href} className="link">
              {primaryPhone.display}
            </a>
          </p>
          <p>
            <a href="mailto:info@kuca-enterijera.ba" className="link">
              info@kuca-enterijera.ba
            </a>
          </p>
        </div>
        <Link href="/kontakt#upit" className="t-label link mt-10 inline-block">
          Zatražite ponudu
        </Link>
      </div>
    </header>
  );
}
