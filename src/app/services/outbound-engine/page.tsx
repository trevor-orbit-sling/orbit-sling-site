import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Starfield from "../../starfield";

const DISCOVERY_CALL_URL = "https://schedule.orbitsling.com/discoverycall";

const OUTBOUND_CONTENT = {
  hero: {
    eyebrow: "Service: Outbound Engine Build",
    title: "Human-led outbound systems that create more qualified opportunities.",
    copy:
      "We build human-led outbound systems that use agentic research, meaning automated account research and rep prep, plus relevant messaging and structured follow-up to help your team create more qualified conversations without wasting rep time on low-fit prospects.",
  },
  pillars: {
    eyebrow: "Why an Outbound Engine",
    title: "Built to create better opportunities",
    items: [
      {
        title: "Agentic Research and Relevance",
        text: "Agentic workflows gather account context and rep-ready insights so every message starts with a real reason to connect.",
      },
      {
        title: "Structured Multi-Channel Follow-Up",
        text: "Email and LinkedIn work together so your team follows up consistently with context.",
      },
    ],
  },
  outcomes: {
    eyebrow: "The Outcome",
    title: "Built to create more qualified opportunities",
    items: [
      "More qualified meetings from better-fit accounts.",
      "Less wasted rep time on low-fit lists.",
      "A repeatable top-of-funnel system your team can run every week.",
    ],
  },
  cta: {
    label: "Book a Discovery Call",
    href: DISCOVERY_CALL_URL,
  },
};

export const metadata: Metadata = {
  title: { absolute: "Outbound Engine Build | Human-Led Outbound for Sales Leaders" },
  description:
    "Built for sales leaders. We create more qualified opportunities with human-led outbound systems, agentic research, and structured follow-up.",
};

export default function OutboundEnginePage() {
  const content = OUTBOUND_CONTENT;

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

        <section className="section" aria-label="Outbound pillars">
          <span className="eyebrow">{content.pillars.eyebrow}</span>
          <h2 className="section-title">{content.pillars.title}</h2>
          <div className="industry-detail-grid industry-detail-grid-usecases">
            {content.pillars.items.map((item) => (
              <article key={item.title} className="industry-detail-card industry-detail-card-usecase">
                <h3 className="team-principle-title">{item.title}</h3>
                <p className="muted">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-label="Outbound outcomes">
          <span className="eyebrow">{content.outcomes.eyebrow}</span>
          <h2 className="section-title">{content.outcomes.title}</h2>
          <div className="industry-detail-card team-ai-philosophy-card">
            <ul className="team-focus-list">
              {content.outcomes.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="next-step">
          <div className="cta-shell team-cta">
            <span className="eyebrow">Next Step</span>
            <h2 className="section-title cta-title">Ready to create more qualified opportunities?</h2>
            <p className="muted cta-copy">
              We will map your offer, design the channel orchestration, and deploy a repeatable outbound operating loop.
            </p>
            <div className="cta-actions">
              <a href={content.cta.href} className="btn-primary" target="_blank" rel="noreferrer">
                {content.cta.label}
              </a>
            </div>
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
