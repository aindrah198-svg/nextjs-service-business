import Link from "next/link";
export function CTA() {
  return (
    <section className="cta container">
      <div>
        <span className="eyebrow">GOOD THINGS START WITH A CONVERSATION</span>
        <h2>
          Something on your mind?
          <br />
          Let’s make it happen<span>.</span>
        </h2>
      </div>
      <Link href="/contact" className="round-link" aria-label="Start a project">
        ↗
      </Link>
    </section>
  );
}
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <Link className="logo" href="/">
          forma<span>✳</span>
        </Link>
        <p>
          Thoughtful design.
          <br />
          Practical solutions. A little personality.
        </p>
        <div>
          <Link href="/services">Services</Link>
          <Link href="/work">Our work</Link>
          <Link href="/contact">Get in touch ↗</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Forma · Fictional studio / portfolio demo
        </span>
        <span>Built by Afrijal Indra Hendrawan</span>
        <a href="https://github.com/aindrah198-svg/nextjs-service-business">
          GitHub ↗
        </a>
      </div>
    </footer>
  );
}
