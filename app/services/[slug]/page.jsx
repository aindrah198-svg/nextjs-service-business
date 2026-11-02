import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "../../../lib/services";
import { CTA } from "../../../components/Footer";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return { title: s?.name || "Service not found", description: s?.intro };
}
export default async function Detail({ params }) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <section className="container page-hero">
        <Link className="back" href="/services">
          ← All services
        </Link>
        <div className="eyebrow">
          {s.number} / {s.tag}
        </div>
        <h1>
          {s.name}
          <span>.</span>
        </h1>
        <p>{s.intro}</p>
      </section>
      <section className="container detail-grid">
        <div>
          <h2>A considered approach.</h2>
          <p>{s.description}</p>
          <div className="scope-note">
            {s.timeline}
            <small>
              Illustrative planning guidance, not a delivery guarantee. Final
              scope and timeline depend on requirements.
            </small>
          </div>
        </div>
        <div className="deliverables">
          <h2>What a project can include</h2>
          <ul>
            {s.deliverables.map((d) => (
              <li key={d}>
                <span>✓</span>
                {d}
              </li>
            ))}
          </ul>
          <Link
            href={"/contact?service=" + encodeURIComponent(s.name)}
            className="button"
          >
            Talk about this service <span>↗</span>
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
