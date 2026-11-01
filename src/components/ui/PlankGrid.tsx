/**
 * Hairline column joints, like the seams of a laid floor. Decorative only.
 * Mobile: 4 planks (joints between the 4 columns). Desktop: 6 planks (a joint every 2 of 12 columns).
 */
export function PlankGrid({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="shell grid-12 plank-grid h-full">
        {Array.from({ length: 12 }).map((_, i) => {
          const mobile = i >= 1 && i <= 3 ? "border-l" : "border-l-0";
          const desktop = i > 0 && i % 2 === 0 ? "md:border-l" : "md:border-l-0";
          return <span key={i} className={`${i >= 4 ? "hidden md:block" : ""} ${mobile} ${desktop}`} />;
        })}
      </div>
    </div>
  );
}
