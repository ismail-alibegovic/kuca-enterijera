"use client";

import { useEffect } from "react";

/**
 * One observer for the whole site. Elements opt in with `data-reveal` (and an optional `--d` delay).
 * Styles only apply under `html.js` and `prefers-reduced-motion: no-preference`.
 */
export function RevealRoot() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    const scan = (root: ParentNode) =>
      root.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    scan(document);
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof Element && scan(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
