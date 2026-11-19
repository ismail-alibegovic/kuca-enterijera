"use client";

import { gsap } from "gsap";
import { type RefObject, useEffect } from "react";

/**
 * Draws the logo in once per page load: the roof settles, the house outline is drawn from the floor,
 * the leaf grows from its stem, then the wordmark is laid along its floor line.
 * Skipped (logo shown immediately) under prefers-reduced-motion.
 */
export function useLogoIntro(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const done = () => root.setAttribute("data-drawn", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return done();
    const q = (part: string) => root.querySelectorAll<SVGElement>(`[data-logo-part="${part}"]`);
    done();
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(q("house"), { opacity: 1, strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power3.inOut" })
      .fromTo(q("roof"), { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.9 }, 0.55)
      .fromTo(q("leaf"), { opacity: 1, strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.7)
      .fromTo(q("floor"), { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.1, ease: "expo.inOut" }, 0.35)
      .fromTo(q("text"), { opacity: 0, clipPath: "inset(0 100% 0 0)" }, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "expo.inOut" }, 0.55)
      .fromTo(q("accent"), { opacity: 1, strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" }, 1.15);
    return () => {
      tl.progress(1).kill();
    };
  }, [ref]);
}
