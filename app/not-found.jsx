import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container page-hero">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>
        This page took
        <br />
        another <em>direction.</em>
      </h1>
      <p>Let’s get you back to somewhere useful.</p>
      <Link className="button" href="/">
        Back to home ↗
      </Link>
    </section>
  );
}
