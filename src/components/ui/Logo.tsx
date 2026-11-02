import Image from "next/image";
import logo from "@/assets/ke-logo.png";

/**
 * The ORIGINAL Kuća Enterijera logo, byte-identical to
 * https://kuca-enterijera.ba/wp-content/uploads/2022/08/ke-logo.png (233 × 60 px, the largest version
 * the company publishes). Never redrawn, recoloured or re-typeset. `unoptimized` serves the
 * original file as-is; the aspect ratio is always preserved from the intrinsic size.
 */
export function Logo({ width = 186, className = "", preload = false }: { width?: number; className?: string; preload?: boolean }) {
  return (
    <Image
      src={logo}
      alt="Kuća Enterijera"
      width={width}
      height={Math.round((width * logo.height) / logo.width)}
      unoptimized
      preload={preload}
      className={`block h-auto max-w-full ${className}`}
    />
  );
}
