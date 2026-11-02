import Image from "next/image";
import type { CSSProperties } from "react";
import { media, type MediaKey } from "@/content/media";

/**
 * Art-directed image frame, sized by its container (aspect class or explicit height).
 * Optional caption: small text under the image, as in the reference ("Visual Archive").
 */
export function Photo({
  id,
  sizes,
  className = "",
  frameClassName = "",
  preload = false,
  zoom = false,
  reveal = true,
  delay = 0,
  focus,
  caption,
}: {
  id: MediaKey;
  sizes: string;
  /** Classes for the outer figure (grid placement, width). */
  className?: string;
  /** Classes for the image frame (aspect ratio, height). */
  frameClassName?: string;
  preload?: boolean;
  zoom?: boolean;
  reveal?: boolean;
  delay?: number;
  focus?: string;
  caption?: React.ReactNode;
}) {
  const m = media[id];
  return (
    <figure
      className={className}
      suppressHydrationWarning
      data-reveal={reveal ? "" : undefined}
      style={{ "--d": delay } as CSSProperties}
    >
      <div className={`relative overflow-hidden bg-paper-2 ${zoom ? "img-zoom" : ""} ${frameClassName}`}>
        <Image
          src={m.src}
          alt={m.alt}
          fill
          sizes={sizes}
          quality={80}
          preload={preload}
          className="object-cover"
          style={{ objectPosition: focus ?? m.focus ?? "50% 50%" }}
        />
      </div>
      {caption ? <figcaption className="t-caption mt-2.5 text-mute">{caption}</figcaption> : null}
    </figure>
  );
}

/** Caption helper: manufacturer images always name their source. */
export const credit = (id: MediaKey) => (media[id].provenance === "manufacturer" ? `Foto: ${media[id].credit}` : "Kuća Enterijera");
