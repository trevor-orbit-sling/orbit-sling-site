import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Starfield from "../../starfield";

const DISCOVERY_CALL_URL = "https://schedule.orbitsling.com/discoverycall";

const REVOPS_CONTENT = {
  hero: {
    eyebrow: "Service: Fractional RevOps Support",
    title: "RevOps systems that give sales leaders a clearer pipeline.",
    copy:
      "We build the reporting, process, and workflow layer that helps sales leaders trust their pipeline, spot execution gaps early, and make better decisions week to week.",
  },
  pillars: {
    eyebrow: "Our RevOps Pillars",
    title: "Reporting, process, and visibility that leaders can trust",
    items: [
      {
        title: "Stack Consolidation and Management",
        text: "Audit tool sprawl, remove overlap, and align systems to real workflow requirements.",
      },
      {
        title: "Pipeline Reporting and Forecasting",
        text: "Build real-time visibility so leadership can trust progression signals, lead quality, and conversion health.",
      },
      {
        title: "Process Documentation and Enablement",
        text: "Create practical playbooks and internal training so teams can run the system confidently.",
      },
    ],
  },
  outcomes: {
    eyebrow: "The Outcome",
    title: "Cleaner visibility and stronger execution discipline",
    items: [
      "Clearer visibility into pipeline performance.",
      "Lower operational drag across handoffs.",
      "Team adoption reinforced through documented workflows.",
    ],
  },
  cta: {
    label: "Book a Discovery Call",
    href: DISCOVERY_CALL_URL,
  },
};

export const metadata: Metadata = {
  title: { absolute: "Revenue Operations (RevOps) | Clearer Pipeline for Sales Leaders" },
  description:
    "Built for sales leaders. We align reporting, process, and workflows so leaders get cleaner pipeline visibility and better weekly decision-making.",
};

export default function RevopsPage() {
  const content = REVOPS_CONTENT;

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

        <section className="section" aria-label="RevOps pillars">
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

        <section className="section" aria-label="RevOps outcomes">
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
            <h2 className="section-title cta-title">Need a clearer pipeline and better weekly visibility?</h2>
            <p className="muted cta-copy">
              We will diagnose your reporting and process gaps, then deploy a practical RevOps layer you can trust.
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
