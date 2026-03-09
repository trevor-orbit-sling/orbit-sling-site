import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Starfield from "../starfield";

const DISCOVERY_CALL_URL = "https://schedule.orbitsling.com/discoverycall";

const CONTACT_CONTENT = {
  hero: {
    eyebrow: "Contact",
    title: "Ready to fix the bottlenecks slowing revenue?",
    copy:
      "If manual work, inconsistent follow-up, or unclear reporting are dragging down pipeline performance, we can map the bottlenecks and show you the right outbound, automation, and RevOps system to fix them.",
  },
  options: {
    eyebrow: "How Can We Help?",
    title: "Pick the right next conversation",
    items: [
      { label: "Pipeline Audit", href: DISCOVERY_CALL_URL },
      { label: "Outbound Engine Build", href: DISCOVERY_CALL_URL },
      { label: "Automation or RevOps Review", href: DISCOVERY_CALL_URL },
    ],
  },
  steps: {
    eyebrow: "What Happens Next?",
    title: "A clear four-step path",
    items: [
      { title: "The Discovery Call", text: "A 15-minute diagnostic to assess fit and urgency." },
      { title: "The Diagnostic", text: "We identify leaks and handoff friction across your current motion." },
      { title: "The Proposal", text: "You get a practical roadmap with priorities and implementation scope." },
      { title: "The Launch", text: "We start execution and move from plan to operating system." },
    ],
  },
};

export const metadata: Metadata = {
  title: { absolute: "Contact Orbit Sling | Book a Discovery Call" },
  description:
    "Ready to make more money and save time? Book a discovery call to see how Orbit Sling builds human-led AI sales systems for sales leaders.",
};

export default function ContactPage() {
  const content = CONTACT_CONTENT;

  return (
    <div className="page-shell team-shell">
      <Starfield />

      <header className="site-header container">
        <nav className="nav-row">
          <Link href="/" className="logo-wrap" aria-label="Orbit Sling Home">
            <Image src="/assets/brand/logo-horizontal.svg" alt="Orbit Sling" width={240} height={75} priority />
          </Link>
          <div className="nav-links">
            <Link href="/team/" className="muted">
              Our Team
            </Link>
            <Link href="/our-philosophy/" className="muted">
              Our Philosophy
            </Link>
            <Link href="/how-it-works/" className="muted">
              How It Works
            </Link>
            <a href={DISCOVERY_CALL_URL} className="btn-primary" target="_blank" rel="noreferrer">
              Book a Discovery Call
            </a>
          </div>
        </nav>
      </header>

      <main className="container content-main team-main">
        <section className="section team-hero" id="top">
          <div className="team-topline">
            <span className="eyebrow">{content.hero.eyebrow}</span>
          </div>
          <h1 className="hero-title team-title">{content.hero.title}</h1>
          <p className="hero-copy team-intro">{content.hero.copy}</p>
        </section>

        <section className="section" aria-label="Contact options">
          <span className="eyebrow">{content.options.eyebrow}</span>
          <h2 className="section-title">{content.options.title}</h2>
          <div className="industry-detail-grid industry-detail-grid-usecases">
            {content.options.items.map((item) => (
              <article key={item.label} className="industry-detail-card industry-detail-card-usecase">
                <h3 className="team-principle-title">{item.label}</h3>
                <div className="cta-actions">
                  <a href={item.href} className="btn-primary" target="_blank" rel="noreferrer">
                    Book a Discovery Call
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-label="Next steps">
          <span className="eyebrow">{content.steps.eyebrow}</span>
          <h2 className="section-title">{content.steps.title}</h2>
          <div className="industry-detail-grid industry-detail-grid-process">
            {content.steps.items.map((step, index) => (
              <article key={step.title} className="industry-detail-card industry-detail-card-process">
                <p className="industry-detail-card-label">Step {String(index + 1).padStart(2, "0")}</p>
                <h3 className="process-title">{step.title}</h3>
                <p className="muted">{step.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container flex flex-wrap items-center justify-between gap-3">
          <p className="muted">© {new Date().getFullYear()} Orbit Sling. Human-led AI sales systems.</p>
          <a
            className="muted"
            href="https://www.linkedin.com/company/orbit-sling"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
