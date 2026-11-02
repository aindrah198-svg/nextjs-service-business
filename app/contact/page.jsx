import ContactForm from "../../components/ContactForm";
export const metadata = {
  title: "Let’s talk",
  description:
    "Try the validated contact form and explore how Forma scopes a new project.",
};
export default function Contact() {
  return (
    <section className="container contact-page">
      <div className="contact-copy">
        <div className="eyebrow">LET’S START A CONVERSATION</div>
        <h1>
          Good things
          <br />
          start with
          <br />
          <em>a hello.</em>
        </h1>
        <p>
          Have an idea, a challenge, or a website that could use a little care?
          Tell us a bit about it.
        </p>
        <div className="contact-note">
          <span>↗</span>
          <div>
            <h3>A clear next step.</h3>
            <p>
              A real engagement would start with a discovery conversation, then
              a written scope and timeline.
            </p>
          </div>
        </div>
        <div className="demo-disclosure">
          Portfolio demo: this form validates your inquiry but does not send
          email or store your details.
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
