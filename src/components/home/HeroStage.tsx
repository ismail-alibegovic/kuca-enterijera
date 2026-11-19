"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { media, type MediaKey } from "@/content/media";
import { useHydrated, useReducedMotion } from "@/lib/useMediaState";

export type HeroSlide = { id: MediaKey; caption: string; focus?: string; mobileFocus?: string };

const PLANKS = 6;
const HOLD = 6.5;

/**
 * Hero stage: wide interior photographs that change the way a floor is laid, one board at a time.
 * Each slide is a stack of six vertical "planks" (clip-path columns of the same image); a change raises the
 * incoming planks from the floor line, left to right.
 *
 * - Static first frame: without JS, with reduced motion or if motion fails, slide 1 is simply visible.
 * - Autoplay pauses offscreen, in a hidden tab, while the pointer rests on the stage, and on request (pause button).
 *   It never runs under prefers-reduced-motion; the numbered controls still work there, without animation.
 * - Pointer: a small additive drift on fine pointers only; it eases back on leave and on window blur.
 */
export function HeroStage({ slides }: { slides: HeroSlide[] }) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const mounted = useHydrated();
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);
  const activeRef = useRef(0);
  const hold = useRef<{ offscreen: boolean; hidden: boolean; hover: boolean }>({ offscreen: false, hidden: false, hover: false });
  const timer = useRef<gsap.core.Tween | null>(null);

  const layerPlanks = (i: number) =>
    Array.from(root.current?.querySelectorAll<HTMLElement>(`[data-layer="${i}"] [data-plank]`) ?? []);

  const go = useCallback(
    (to: number) => {
      const from = activeRef.current;
      if (busy.current || to === from) return;
      const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const layers = root.current?.querySelectorAll<HTMLElement>("[data-layer]");
      layers?.forEach((l) => (l.style.zIndex = l.dataset.layer === String(to) ? "2" : l.dataset.layer === String(from) ? "1" : "0"));
      const incoming = layerPlanks(to);
      activeRef.current = to;
      setActive(to);
      if (motionOff) {
        gsap.set(incoming, { "--t": 0 });
        return;
      }
      busy.current = true;
      const img = root.current?.querySelectorAll(`[data-layer="${to}"] img`);
      gsap.set(incoming, { "--t": 1 });
      gsap.fromTo(img ?? [], { scale: 1.08 }, { scale: 1, duration: 2, ease: "expo.out" });
      gsap.to(incoming, {
        "--t": 0,
        duration: 1.15,
        ease: "expo.inOut",
        stagger: 0.075,
        onComplete: () => {
          // Park the previous slide under the new one, fully laid, so the next change has a clean base.
          busy.current = false;
        },
      });
    },
    [],
  );

  // Autoplay timeline: a progress rule fills, then the next board is laid.
  const schedule = useCallback(() => {
    timer.current?.kill();
    if (!bar.current) return;
    timer.current = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: HOLD,
        ease: "none",
        paused: true,
        onComplete: () => go((activeRef.current + 1) % slides.length),
      },
    );
  }, [go, slides.length]);

  const sync = useCallback(() => {
    const h = hold.current;
    const t = timer.current;
    if (!t) return;
    if (paused || h.offscreen || h.hidden || h.hover) t.pause();
    else t.play();
  }, [paused]);

  // Intro: the first slide's planks are laid on load (CSS holds them down until then).
  useEffect(() => {
    const planks = layerPlanks(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(planks, { "--t": 0 });
      return;
    }
    const img = root.current?.querySelectorAll('[data-layer="0"] img');
    const tl = gsap.timeline({ delay: 0.25 });
    tl.fromTo(planks, { "--t": 1 }, { "--t": 0, duration: 1.35, ease: "expo.inOut", stagger: 0.085 }).fromTo(
      img ?? [],
      { scale: 1.12 },
      { scale: 1, duration: 2.4, ease: "expo.out" },
      0,
    );
    return () => {
      tl.progress(1).kill();
    };
  }, []);

  // Restart the progress rule whenever the active slide changes.
  useEffect(() => {
    if (reduced || !mounted) {
      timer.current?.kill();
      timer.current = null;
      return;
    }
    schedule();
    sync();
    return () => {
      timer.current?.kill();
    };
  }, [active, reduced, mounted, schedule, sync]);

  useEffect(sync, [sync]);

  // Pause offscreen and in background tabs.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      hold.current.offscreen = !e.isIntersecting;
      sync();
    });
    io.observe(el);
    const onVis = () => {
      hold.current.hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [sync]);

  // Pointer drift (fine pointers only) and a scrubbed sink as the hero scrolls away.
  useEffect(() => {
    const stage = root.current;
    const target = inner.current;
    if (!stage || !target || reduced) return;
    // Text sits over the photograph, so the whole hero section is the pointer surface.
    const el = (stage.closest("section") as HTMLElement | null) ?? stage;
    gsap.registerPlugin(ScrollTrigger);
    const st = gsap.fromTo(
      target,
      { yPercent: 0 },
      { yPercent: 9, ease: "none", scrollTrigger: { trigger: stage, start: "top top+=80", end: "bottom top", scrub: true } },
    );
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return () => st.scrollTrigger?.kill();
    // The photographs drift inside fixed plank columns, so the joints never move.
    const qx = gsap.quickTo(target, "--px", { duration: 1.4, ease: "power3.out" });
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        qx(nx * -2.4);
      });
    };
    const reset = () => qx(0);
    const enter = () => {
      hold.current.hover = true;
      sync();
    };
    const leave = () => {
      hold.current.hover = false;
      reset();
      sync();
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      st.scrollTrigger?.kill();
      gsap.set(target, { clearProps: "transform,--px" });
    };
  }, [reduced, sync]);

  const current = slides[active];

  return (
    <div className="absolute inset-0">
      <div
        ref={root}
        role="region"
        aria-roledescription="galerija"
        aria-label="Prostori s našim podovima"
        className="hero-stage absolute inset-0 overflow-hidden bg-paper-2"
      >
        <div ref={inner} className="absolute inset-x-0 -inset-y-[6%] will-change-transform">
          {slides.map((s, i) => {
            // Only the first slide renders on the server; the rest join after hydration and load in the background.
            if (i > 0 && !mounted) return null;
            const m = media[s.id];
            return (
              <div
                key={s.id}
                data-layer={i}
                className="absolute inset-0"
                style={{ zIndex: i === 0 ? 1 : 0 }}
                aria-hidden={i !== active}
              >
                {Array.from({ length: PLANKS }).map((_, p) => (
                  <div
                    key={p}
                    data-plank
                    className="absolute inset-0"
                    style={
                      {
                        ...(i === 0 ? {} : { "--t": 1 }),
                        clipPath: `inset(calc(var(--t) * 100%) ${((PLANKS - 1 - p) / PLANKS) * 100}% 0 ${(p / PLANKS) * 100}%)`,
                      } as CSSProperties
                    }
                  >
                    <Image
                      src={m.src}
                      alt={p === 0 && i === active ? m.alt : ""}
                      fill
                      sizes="100vw"
                      quality={80}
                      preload={i === 0 && p === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="object-cover [object-position:var(--fm)] [translate:calc(var(--px,0)*1%)_0] md:[object-position:var(--fd)]"
                      style={{ "--fd": s.focus ?? m.focus, "--fm": s.mobileFocus ?? s.focus ?? m.focus } as CSSProperties}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        {/* Plank joints over the photograph, aligned with the planks. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] grid grid-cols-6">
          {Array.from({ length: PLANKS }).map((_, p) => (
            <span key={p} className={p ? "border-l border-white/[0.09]" : ""} />
          ))}
        </div>
      </div>

      {/* Caption rail over the foot of the photograph */}
      <div className="absolute inset-x-0 bottom-0 z-[6]">
      <div className="shell flex items-center justify-between gap-6 border-t border-white/15 py-2 md:py-3">
        <p className="t-small min-w-0 truncate text-ink/80">
          <span className="t-index mr-3 text-mute">{String(active + 1).padStart(2, "0")}</span>
          <span className="max-sm:hidden">{current.caption}</span>
          <span className="sm:hidden">{current.caption.split(" · ")[0]}</span>
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <ol className="flex items-center" aria-label="Odaberite fotografiju">
            {slides.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === active ? "true" : undefined}
                  aria-label={`Fotografija ${i + 1} od ${slides.length}: ${s.caption}`}
                  className="group relative flex h-11 w-11 items-center justify-center md:w-14"
                >
                  <span className={`t-index transition-colors duration-500 ${i === active ? "text-ink" : "text-mute group-hover:text-ink"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="absolute inset-x-2 bottom-2 h-px overflow-hidden bg-line md:inset-x-3">
                    {i === active ? (
                      <span ref={bar} className="block h-full w-full origin-left bg-ink" style={{ transform: reduced ? "none" : "scaleX(0)" }} />
                    ) : null}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          {reduced ? null : (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? "Pokreni izmjenu fotografija" : "Zaustavi izmjenu fotografija"}
              className="flex h-11 w-11 items-center justify-center text-ink/80 hover:text-ink"
            >
              <span aria-hidden className="t-index">
                {paused ? "▶" : "❙❙"}
              </span>
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
