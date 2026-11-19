"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { splitWords } from "./splitWords";

/**
 * The site's single motion system.
 *
 * - Smooth scroll: Lenis (the only scroll engine), driven by the GSAP ticker and wired to ScrollTrigger.
 * - Reveals: server components opt in with `data-reveal="up|fade|rise|wipe|rule"` plus an optional
 *   `style={{ "--d": 120 }}` delay in ms. Headings opt in with `data-split` (word-by-word rise).
 *   Statements opt in with `data-scrub="words"` (words brighten as the reader scrolls through them).
 *   Images opt in with `data-parallax` (a short, scrubbed vertical drift).
 * - Initial hidden states live in CSS under `html.js` + `prefers-reduced-motion: no-preference`, so content is
 *   never hidden without JS. `html.motion-off` (set by a failsafe in layout.tsx) shows everything.
 * - Reduced motion: no Lenis, no scrub, nothing split; every element is marked shown immediately.
 */

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const EASE = "expo.out";

function delayOf(el: Element) {
  const v = parseFloat(getComputedStyle(el).getPropertyValue("--d"));
  return Number.isFinite(v) ? v / 1000 : 0;
}

function revealEl(el: HTMLElement) {
  const type = el.dataset.reveal;
  const delay = delayOf(el);
  el.setAttribute("data-shown", "");
  const kids = Array.from(el.children) as HTMLElement[];
  switch (type) {
    case "up":
      gsap.fromTo(el, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 1.2, delay, ease: EASE, clearProps: "transform,opacity,visibility" });
      break;
    case "fade":
      gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.1, delay, ease: "power2.out", clearProps: "opacity,visibility" });
      break;
    case "rise":
      gsap.fromTo(kids, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, delay, ease: "expo.inOut", clearProps: "clipPath" });
      // A parallax frame owns its image transform; only a static frame gets the settle-in zoom.
      if (!("parallax" in el.dataset)) {
        gsap.fromTo(el.querySelectorAll("img"), { scale: 1.14 }, { scale: 1, duration: 2.1, delay, ease: EASE, clearProps: "scale" });
      }
      break;
    case "wipe":
      gsap.fromTo(kids, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, delay, ease: "expo.inOut", clearProps: "clipPath" });
      break;
    case "rule":
      gsap.fromTo(el, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.5, delay, ease: "expo.inOut", clearProps: "transform" });
      break;
  }
}

function revealSplit(el: HTMLElement) {
  const words = splitWords(el);
  el.setAttribute("data-shown", "");
  gsap.fromTo(
    words,
    { yPercent: 112 },
    { yPercent: 0, duration: 1.25, delay: delayOf(el), ease: EASE, stagger: Math.min(0.07, 0.6 / Math.max(words.length, 1)) },
  );
}

function showAllImmediately(root: ParentNode) {
  root.querySelectorAll("[data-reveal],[data-split]").forEach((el) => el.setAttribute("data-shown", ""));
}

function setup(root: ParentNode) {
  const triggers: ScrollTrigger[] = [];
  const pending = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(`${sel}:not([data-shown])`));

  for (const el of pending("[data-reveal]")) {
    triggers.push(ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => revealEl(el) }));
  }
  for (const el of pending("[data-split]")) {
    triggers.push(ScrollTrigger.create({ trigger: el, start: "top 94%", once: true, onEnter: () => revealSplit(el) }));
  }

  // Statements: each word brightens as it passes through the reading zone.
  for (const el of Array.from(root.querySelectorAll<HTMLElement>("[data-scrub='words']"))) {
    const words = splitWords(el);
    el.setAttribute("data-shown", "");
    const tween = gsap.fromTo(
      words,
      { opacity: 0.16 },
      { opacity: 1, ease: "none", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: 0.6 } },
    );
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  }

  // Parallax drift for framed images (the frame stays put, the photograph moves inside it).
  for (const el of Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"))) {
    const img = el.querySelector("img");
    if (!img) continue;
    const amount = parseFloat(el.dataset.parallax || "") || 8;
    gsap.set(img, { scale: 1 + amount / 50 });
    const tween = gsap.fromTo(
      img,
      { yPercent: -amount },
      { yPercent: amount, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
    );
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  }

  return () => triggers.forEach((t) => t.kill());
}

export function MotionRoot() {
  const pathname = usePathname();

  // Engine: Lenis + GSAP ticker + ScrollTrigger, created once for the session.
  useEffect(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    html.classList.add("motion-ready");
    if (reduce.matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: true, prevent: (n) => n.closest?.("[data-lenis-prevent]") != null });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Pause smooth scroll while a dialog locks the page (mobile menu, lightbox).
    const lockObserver = new MutationObserver(() => (html.classList.contains("is-locked") ? lenis.stop() : lenis.start()));
    lockObserver.observe(html, { attributes: true, attributeFilter: ["class"] });

    // Re-measure once fonts and late media have settled.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      lockObserver.disconnect();
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Per page: build reveals for the new DOM and tear them down on navigation.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      showAllImmediately(document);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const lenis = window.__lenis;
    if (lenis && !window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
    let cleanup = () => {};
    const ctx = gsap.context(() => {
      cleanup = setup(document);
    });
    // Anchor links (/kontakt#upit): land on the target, and land again once fonts and images have
    // settled the layout, unless the reader has already started scrolling.
    let userScrolled = false;
    const markUser = () => (userScrolled = true);
    window.addEventListener("wheel", markUser, { once: true, passive: true });
    window.addEventListener("touchstart", markUser, { once: true, passive: true });
    const toHash = () => {
      const hash = window.location.hash;
      if (!hash || !lenis || userScrolled) return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) lenis.scrollTo(target, { immediate: true, force: true });
    };
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      toHash();
    });
    const late = window.setTimeout(() => {
      ScrollTrigger.refresh();
      toHash();
    }, 700);
    document.fonts?.ready.then(toHash);
    return () => {
      window.clearTimeout(late);
      window.removeEventListener("wheel", markUser);
      window.removeEventListener("touchstart", markUser);
      cancelAnimationFrame(raf);
      cleanup();
      ctx.kill();
    };
  }, [pathname]);

  return null;
}
