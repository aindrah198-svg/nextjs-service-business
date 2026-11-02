import Link from "next/link";
import { services } from "../../lib/services";
import { CTA } from "../../components/Footer";
export const metadata = {
  title: "Services",
  description:
    "Explore web design, brand identity and website care at the fictional Forma studio.",
};
export default function Services() {
  return (
    <>
      <section className="container page-hero">
        <div className="eyebrow">OUR SERVICES</div>
        <h1>
          Good ideas deserve
          <br />a thoughtful <em>execution.</em>
        </h1>
        <p>
          Three focused ways to help your business move forward. Each engagement
          starts with a clear scope and shared priorities.
        </p>
      </section>
      <section className="container service-grid service-list">
        {services.map((s) => (
          <Link
            className="service-card"
            key={s.slug}
            href={"/services/" + s.slug}
          >
            <div className="card-top">
              <span>{s.number}</span>
              <span className="service-symbol">{s.icon}</span>
            </div>
            <h2>{s.name}</h2>
            <p>{s.short}</p>
            <div className="card-bottom">
              See what’s included <span>↗</span>
            </div>
          </Link>
        ))}
      </section>
      <CTA />
    </>
  );
}
