"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryPhone } from "@/content/site";

/** Slim contact bar for small screens; appears after the first viewport. */
export function MobileActionBar() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/kontakt")) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] transition-transform duration-700 ease-[var(--ease-architect)] md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a href={primaryPhone.href} className="t-label flex h-14 items-center justify-center gap-2 border-r border-line text-[0.68rem]" tabIndex={show ? 0 : -1}>
        Pozovite salon
      </a>
      <Link href="/kontakt#upit" className="t-label flex h-14 items-center justify-center gap-2 bg-ink text-[0.68rem] text-paper" tabIndex={show ? 0 : -1}>
        Zatražite ponudu →
      </Link>
    </div>
  );
}
