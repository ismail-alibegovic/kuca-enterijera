"use client";

import { useState } from "react";
import { fullAddress, mapsUrl, osmUrl } from "@/content/site";

/** Click-to-load map: no third-party requests or cookies until the visitor asks for the map. */
export function MapEmbed() {
  const [load, setLoad] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=16&output=embed`;
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-paper-2 md:aspect-[16/11]">
      {load ? (
        <iframe title={`Karta: ${fullAddress}`} src={src} className="absolute inset-0 h-full w-full grayscale-[0.85] contrast-[0.95]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          {/* Abstract street-grid drawing, not a map */}
          <svg aria-hidden viewBox="0 0 400 260" className="absolute inset-0 h-full w-full text-ink/15" preserveAspectRatio="xMidYMid slice">
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <path d="M-10 190 L410 120" />
              <path d="M-10 60 L410 20" />
              <path d="M80 -10 L130 270" />
              <path d="M250 -10 L290 270" />
              <path d="M-10 250 L410 210" strokeWidth="6" className="text-ink/10" />
            </g>
            <circle cx="210" cy="152" r="6" fill="var(--color-oak)" />
            <circle cx="210" cy="152" r="16" fill="none" stroke="var(--color-oak)" strokeWidth="1" />
          </svg>
          <p className="t-label relative text-mute">Salon · {fullAddress}</p>
          <div className="relative flex flex-wrap gap-3">
            <button type="button" onClick={() => setLoad(true)} className="t-label min-h-11 bg-ink px-4 text-[0.68rem] text-paper">
              Prikaži kartu
            </button>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="t-label inline-flex min-h-11 items-center border border-ink bg-paper px-4 text-[0.68rem]">
              Google Maps ↗
            </a>
            <a href={osmUrl} target="_blank" rel="noreferrer" className="t-label inline-flex min-h-11 items-center border border-ink bg-paper px-4 text-[0.68rem]">
              OpenStreetMap ↗
            </a>
          </div>
          <p className="t-small relative max-w-[40ch] text-mute">Karta se učitava s Google Maps tek nakon vašeg klika.</p>
        </div>
      )}
    </div>
  );
}
