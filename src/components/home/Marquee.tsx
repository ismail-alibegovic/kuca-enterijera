/**
 * The reference's oversized moving word line ("INNOVATION"), set in our own vocabulary.
 * Pure CSS, decorative (hidden from assistive tech), stops for reduced motion.
 */
const words = ["Parket", "Podovi", "Vrata", "Sarajevo"];

function Run() {
  return (
    <span className="flex shrink-0 items-baseline">
      {words.map((w) => (
        <span key={w} className="flex items-baseline">
          <span className="px-[0.2em]">{w}</span>
          <span className="px-[0.6em] text-[0.3em] italic tracking-normal">o</span>
        </span>
      ))}
    </span>
  );
}

export function Marquee() {
  return (
    <div aria-hidden className="mt-24 overflow-hidden border-t border-line pt-5 pb-2 md:mt-40 md:pt-6">
      <div className="marquee-track flex w-max text-[clamp(3rem,7.4vw,7.25rem)] leading-[0.95] tracking-[-0.035em] whitespace-nowrap uppercase">
        <Run />
        <Run />
        <Run />
        <Run />
      </div>
    </div>
  );
}
