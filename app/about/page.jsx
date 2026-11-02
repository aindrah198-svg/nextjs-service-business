import { CTA } from "../../components/Footer";
export const metadata = {
  title: "About the studio concept",
  description:
    "The thinking behind Forma: clear communication, practical design and thoughtful handover.",
};
export default function About() {
  return (
    <>
      <section className="container page-hero">
        <div className="eyebrow">THE THINKING BEHIND FORMA</div>
        <h1>
          Small by design.
          <br />
          <em>Thoughtful by nature.</em>
        </h1>
        <p>
          Forma is an original fictional service studio, built to demonstrate
          how a small business can present its work clearly and confidently
          online.
        </p>
      </section>
      <section className="container detail-grid">
        <div>
          <h2>Design with a purpose.</h2>
          <p>
            The concept brings together warm visual design, plain-language
            service descriptions and practical website features. Every page
            should help a visitor understand what is offered and choose a useful
            next step.
          </p>
          <p>
            This portfolio was specified by Afrijal Indra Hendrawan and built
            with Codex assistance. It is not a claim of running an established
            agency.
          </p>
        </div>
        <div className="values">
          <div>
            <span>01</span>
            <h3>Clarity before complexity.</h3>
            <p>Understand the problem before choosing a solution.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Care in the details.</h3>
            <p>Mobile layouts, readable content and usable forms matter.</p>
          </div>
          <div>
            <span>03</span>
            <h3>A useful handover.</h3>
            <p>Document the work so the next person can build on it.</p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
