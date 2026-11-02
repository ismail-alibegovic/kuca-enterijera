import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell pt-16 md:pt-24" aria-labelledby="nf-title">
      <p className="t-caption text-mute">Greška 404</p>
      <h1 id="nf-title" className="t-display mt-6 max-w-[14ch]">
        Ova stranica ne postoji —
        <br />
        ili je premještena
      </h1>
      <p className="t-small mt-10 flex gap-6">
        <Link href="/" className="link">
          Naslovna
        </Link>
        <Link href="/ponuda" className="link">
          Ponuda
        </Link>
      </p>
    </section>
  );
}
