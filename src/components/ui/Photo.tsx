import Image from "next/image";
import type { CSSProperties } from "react";
import { media, type MediaKey } from "@/content/media";

type Reveal = "rise" | "fade" | "wipe" | "up" | false;

/**
 * Art-directed image frame. Always sized by its container (aspect or explicit height),
 * with focal-point cropping. Illustrative images can show a discreet provenance tag.
 */
export function Photo({
  id,
  sizes,
  className = "",
  imgClassName = "",
  reveal = "rise",
  delay = 0,
  preload = false,
  tag = false,
  zoom = false,
  parallax = false,
  alt,
  focus,
}: {
  id: MediaKey;
  sizes: string;
  className?: string;
  imgClassName?: string;
  reveal?: Reveal;
  delay?: number;
  preload?: boolean;
  tag?: boolean | "dark";
  zoom?: boolean;
  parallax?: boolean;
  alt?: string;
  focus?: string;
}) {
  const m = media[id];
  return (
    <figure
      className={`relative overflow-hidden bg-paper-2 ${zoom ? "img-zoom" : ""} ${parallax ? "parallax" : ""} ${className}`}
      suppressHydrationWarning data-reveal={reveal || undefined}
      style={{ "--d": delay } as CSSProperties}
    >
      <Image
        src={m.src}
        alt={alt ?? m.alt}
        fill
        sizes={sizes}
        quality={70}
        preload={preload}
        className={`object-cover ${imgClassName}`}
        style={{ objectPosition: focus ?? m.focus ?? "50% 50%" }}
      />
      {tag && m.provenance === "illustrative" ? (
        <figcaption
          className={`t-label absolute bottom-2.5 right-2.5 px-1.5 py-1 text-[0.55rem] tracking-[0.18em] ${
            tag === "dark" ? "bg-ink/70 text-paper" : "bg-paper/80 text-ink/70"
          }`}
        >
          Ilustracija
        </figcaption>
      ) : null}
    </figure>
  );
}
