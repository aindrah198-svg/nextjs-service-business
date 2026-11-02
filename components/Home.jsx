import Image from "next/image";
import Link from "next/link";
import { services } from "../lib/services";
import { CTA } from "./Footer";
export default function Home({ baseline = false }) {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-star">✳</span> SMALL STUDIO. BIG
            POSSIBILITIES.
          </div>
          <h1>
            A little clarity.
            <br />A lot of
            <br />
            <em>possibility.</em>
          </h1>
          <p>
            We build thoughtful websites and memorable brands for businesses
            ready to move forward.
          </p>
          <Link href="/contact" className="button">
            Let’s build something <span>↗</span>
          </Link>
          <div className="hero-note">
            <span className="note-line"></span>Good people. Clear process. Work
            that matters.
          </div>
        </div>
        <div className="hero-art">
          {baseline ? (
            <img
              src="/studio-original.png"
              width="1100"
              height="1100"
              alt="An illustrated brand and website design workspace with a botanical shop concept"
            />
          ) : (
            <Image
              src="/studio.webp"
              width={1100}
              height={1100}
              sizes="(max-width: 760px) 100vw, 50vw"
              priority
              alt="An illustrated brand and website design workspace with a botanical shop concept"
            />
          )}
          <div className="art-caption">
            <span>↳ IDEAS INTO SOMETHING REAL</span>
            <span>FORMA / STUDIO NOTES</span>
          </div>
        </div>
      </section>
      <section className="intro-strip">
        <div className="container strip-content">
          <span>DESIGNED WITH INTENTION.</span>
          <span>BUILT TO MAKE A DIFFERENCE.</span>
          <span className="strip-star">✳</span>
          <span>MADE FOR YOUR NEXT CHAPTER.</span>
        </div>
      </section>
      <section className="container section services-section">
        <div className="section-head">
          <div>
            <div className="eyebrow">01 / WHAT WE DO</div>
            <h2>
              Good design.
              <br />A better way forward<span>.</span>
            </h2>
          </div>
          <p>
            From your first impression to your next big step, we help the pieces
            come together.
          </p>
        </div>
        <div className="service-grid">
          {services.map((s) => (
            <Link
              href={"/services/" + s.slug}
              key={s.slug}
              className="service-card"
            >
              <div className="card-top">
                <span>{s.number}</span>
                <span className="service-symbol">{s.icon}</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.short}</p>
              <div className="card-bottom">
                Explore service <span>↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="work-section">
        <div className="container section">
          <div className="section-head">
            <div>
              <div className="eyebrow">02 / A GLIMPSE OF THE POSSIBILITIES</div>
              <h2>
                Thoughtful from
                <br />
                the very first detail<span>.</span>
              </h2>
            </div>
            <Link className="text-link" href="/work">
              Explore concept work ↗
            </Link>
          </div>
          <div className="work-grid">
            <Link href="/work#botanical" className="work-card">
              <div className="work-image botanical">
                <div className="mock-browser">
                  <div className="mock-nav">
                    botanical<span>ROOTED IN THE EVERYDAY</span>
                  </div>
                  <div className="mock-content">
                    <span>GROW A LITTLE GOOD.</span>
                    <h3>
                      A greener
                      <br />
                      kind of living.
                    </h3>
                    <div className="mock-pot">✳</div>
                    <span className="mock-button">Find your green →</span>
                  </div>
                </div>
              </div>
              <div className="work-meta">
                <div>
                  <h3>Botanical</h3>
                  <p>A fresh digital home for a plant shop concept.</p>
                </div>
                <span>WEB DESIGN ↗</span>
              </div>
            </Link>
            <Link href="/work#goodform" className="work-card">
              <div className="work-image goodform">
                <div className="goodform-label">
                  <small>EVERYDAY OBJECTS. BETTER CONSIDERED.</small>
                  <strong>
                    good
                    <br />
                    form<span>®</span>
                  </strong>
                  <div className="goodform-line"></div>
                  <p>Less, but better.</p>
                </div>
                <div className="shape-disc"></div>
              </div>
              <div className="work-meta">
                <div>
                  <h3>Goodform</h3>
                  <p>A warm, minimal identity for an objects brand concept.</p>
                </div>
                <span>BRAND IDENTITY ↗</span>
              </div>
            </Link>
          </div>
          <p className="concept-note">
            Original fictional concepts, created for this portfolio. No client
            results or endorsements are claimed.
          </p>
        </div>
      </section>
      <section className="container section process">
        <div>
          <div className="eyebrow">03 / HOW WE GET THERE</div>
          <h2>
            Less guesswork.
            <br />
            More good work<span>.</span>
          </h2>
          <p>A clear path from “what if” to “here it is.”</p>
          <Link href="/about" className="text-link">
            Meet the studio concept ↗
          </Link>
        </div>
        <ol>
          {[
            [
              "Listen & understand",
              "We start with your business, your customers and what a good outcome looks like.",
            ],
            [
              "Make a clear plan",
              "Together, we define the scope, the priorities and the steps that get us there.",
            ],
            [
              "Design, build & refine",
              "Ideas take shape through focused work, honest feedback and careful testing.",
            ],
            [
              "Launch & look ahead",
              "You get a considered handover and a clear path for what comes next.",
            ],
          ].map(([title, text], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="container faq">
        <div>
          <div className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</div>
          <h2>
            Good questions<span>.</span>
          </h2>
        </div>
        <div>
          {[
            [
              "What kind of businesses is this for?",
              "This example studio is positioned for independent shops, service businesses and growing small teams that need a focused website or identity.",
            ],
            [
              "How is a project scoped?",
              "A discovery conversation defines pages, content, integrations, timeline and handover. A written scope should be agreed before work begins.",
            ],
            [
              "Can I try the contact form?",
              "Yes. It validates inputs in the browser and on the server. This portfolio demo does not send email or save your inquiry.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
