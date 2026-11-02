import { CTA } from "../../components/Footer";
export const metadata = {
  title: "Concept work",
  description: "Two original fictional design studies: Botanical and Goodform.",
};
export default function Work() {
  return (
    <>
      <section className="container page-hero">
        <div className="eyebrow">ORIGINAL CONCEPT STUDIES</div>
        <h1>
          Room to explore.
          <br />
          Space to <em>make it better.</em>
        </h1>
        <p>
          Fictional businesses, practical design exercises. These concepts show
          visual direction and problem-solving, with no invented clients,
          testimonials or results.
        </p>
      </section>
      <section className="container case-study" id="botanical">
        <span className="eyebrow">01 / BOTANICAL · WEB DESIGN CONCEPT</span>
        <h2>A greener kind of living.</h2>
        <div className="detail-grid">
          <div>
            <h3>The brief</h3>
            <p>
              Make a small plant shop feel welcoming online. Help a first-time
              visitor understand the offer and take a clear next step.
            </p>
            <h3>The approach</h3>
            <p>
              A gentle green palette, botanical illustration and clear content
              hierarchy connect the shop’s personality to a simple digital
              experience.
            </p>
          </div>
          <div className="botanical study-art">
            <div className="mock-nav">botanical</div>
            <h3>
              Bring a little
              <br />
              outside, in.
            </h3>
            <span>✳</span>
          </div>
        </div>
      </section>
      <section className="container case-study" id="goodform">
        <span className="eyebrow">02 / GOODFORM · BRAND IDENTITY CONCEPT</span>
        <h2>Everyday objects. Better considered.</h2>
        <div className="detail-grid">
          <div>
            <h3>The brief</h3>
            <p>
              Create a warm, restrained identity for an everyday objects brand
              without relying on a large catalogue or product photography.
            </p>
            <h3>The approach</h3>
            <p>
              Earthy color, bold typography and simple geometric forms create a
              flexible visual language. The concept demonstrates direction
              rather than a full brand asset delivery.
            </p>
          </div>
          <div className="goodform study-art">
            <strong>goodform®</strong>
            <div className="study-circle"></div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
