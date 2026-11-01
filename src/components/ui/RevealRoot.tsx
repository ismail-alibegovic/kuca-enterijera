"use client";

import { useEffect } from "react";

/**
 * One observer for the whole site. Server components opt in with `data-reveal="up|fade|rise|wipe|lines|rule"`
 * and an optional `style={{ "--d": 120 }}` delay. Reveal styles only apply under `html.js` and
 * `prefers-reduced-motion: no-preference`, so content is never hidden without JS or with reduced motion.
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
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
