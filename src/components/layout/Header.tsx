"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { categories, categoryHref } from "@/content/catalog";
import { media } from "@/content/media";
import { nav, primaryPhone } from "@/content/site";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [panelOpen, setPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState(categories[0].slug);
  const [hidden, setHidden] = useState(false);
  const [panelLoaded, setPanelLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Close everything on navigation (adjusting state during render, per React guidance).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setPanelOpen(false);
    setMenuOpen(false);
  }
  // Panel images load only once the panel has been opened.
  if (panelOpen && !panelLoaded) setPanelLoaded(true);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 240);
          last = y;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanelOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) setPanelOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [panelOpen]);

  const openSoon = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setPanelOpen(true);
  }, []);
  const closeSoon = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanelOpen(false), 220);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const previewCat = categories.find((c) => c.slug === preview) ?? categories[0];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-architect)] ${
          hidden && !panelOpen && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`relative z-10 bg-paper transition-[border-color] duration-500 ${
            scrolled || panelOpen ? "border-b border-line" : "border-b border-transparent"
          }`}
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
            <Link href="/" className="relative z-10 -my-2 py-2" aria-label="Kuća Enterijera, početna stranica">
              <Logo />
            </Link>

            <nav aria-label="Glavna navigacija" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                <li onPointerEnter={(e) => e.pointerType === "mouse" && openSoon()} onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}>
                  <button
                    ref={triggerRef}
                    type="button"
                    aria-expanded={panelOpen}
                    aria-controls={panelId}
                    onClick={(e) => {
                      // With a mouse, hover already opened the panel; a click should not close it again.
                      const pointer = (e.nativeEvent as PointerEvent).pointerType;
                      setPanelOpen((o) => (pointer === "mouse" ? true : !o));
                    }}
                    className={`t-label flex items-center gap-2 py-3 text-[0.7rem] ${isActive("/kolekcije") ? "" : "text-ink/80 hover:text-ink"}`}
                  >
                    Kolekcije
                    <span aria-hidden className={`inline-block transition-transform duration-500 ${panelOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                </li>
                {nav.slice(1).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`t-label py-3 text-[0.7rem] ${isActive(item.href) ? "link-line" : "link-reveal text-ink/80 hover:text-ink"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-6">
              <a href={primaryPhone.href} className="t-index hidden text-ink/80 hover:text-ink xl:inline">
                {primaryPhone.display}
              </a>
              <Link href="/kontakt#upit" className="t-label hidden bg-ink px-4 py-3 text-[0.68rem] text-paper transition-colors duration-500 hover:bg-charcoal md:inline-flex">
                Zatražite ponudu
              </Link>
              <button
                type="button"
                className="t-label -mr-2 flex items-center gap-3 p-2 text-[0.7rem] lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(true)}
              >
                Meni
                <span aria-hidden className="flex w-6 flex-col gap-[5px]">
                  <span className="h-px w-full bg-ink" />
                  <span className="h-px w-2/3 self-end bg-ink" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Collections panel */}
        <div
          id={panelId}
          ref={panelRef}
          onPointerEnter={(e) => e.pointerType === "mouse" && openSoon()}
          onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
          className={`absolute inset-x-0 top-full hidden border-b border-line bg-paper lg:block transition-[clip-path,opacity] duration-700 ease-[var(--ease-curtain)] ${
            panelOpen ? "visible opacity-100 [clip-path:inset(0_0_0_0)]" : "invisible opacity-0 [clip-path:inset(0_0_100%_0)]"
          }`}
        >
          <div className="shell grid-12 py-10">
            <div className="col-span-3 flex flex-col justify-between pr-6">
              <p className="t-statement text-[1.6rem]!">
                Šest kolekcija, <span className="t-serif-italic">jedan salon.</span>
              </p>
              <Link href="/kolekcije" className="t-label link-line self-start text-[0.7rem]" tabIndex={panelOpen ? 0 : -1}>
                Sve kolekcije i filteri →
              </Link>
            </div>
            <ul className="col-span-5 border-t border-line">
              {categories.map((c) => (
                <li key={c.slug} className="border-b border-line">
                  <Link
                    href={categoryHref(c)}
                    tabIndex={panelOpen ? 0 : -1}
                    onPointerEnter={() => setPreview(c.slug)}
                    onFocus={() => setPreview(c.slug)}
                    className="group flex items-baseline gap-5 py-3.5"
                  >
                    <span className="t-index w-6 text-mute">{c.index}</span>
                    <span className="t-h3 transition-transform duration-500 group-hover:translate-x-1.5">{c.name}</span>
                    <span className="t-small ml-auto text-mute">{c.kicker}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="relative col-span-4 ml-6 aspect-[4/3] overflow-hidden bg-paper-2">
              {panelLoaded && categories.map((c) => (
                <Image
                  key={c.slug}
                  src={media[c.hero].src}
                  alt=""
                  fill
                  sizes="33vw"
                  quality={70}
                  className={`object-cover transition-[opacity,scale] duration-1000 ease-[var(--ease-architect)] ${
                    c.slug === previewCat.slug ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                  }`}
                  style={{ objectPosition: media[c.hero].focus }}
                />
              ))}
              <span className="t-label absolute bottom-3 left-3 bg-paper px-2 py-1 text-[0.6rem]">
                {previewCat.index} · {previewCat.short}
              </span>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
