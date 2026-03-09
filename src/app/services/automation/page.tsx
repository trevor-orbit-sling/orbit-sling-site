import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Starfield from "../../starfield";

const DISCOVERY_CALL_URL = "https://schedule.orbitsling.com/discoverycall";

const AUTOMATION_CONTENT = {
  hero: {
    eyebrow: "Service: Automation Systems",
    title: "Agentic workflows that save time across the sales process.",
    copy:
      "We design and deploy agentic workflows that route leads, enrich records, support follow-up, and handle CRM admin so your sales team can stay focused on selling.",
  },
  pillars: {
    eyebrow: "How We Automate Success",
    title: "Workflows that save time in the right places",
    items: [
      {
        title: "Lead Routing and Distribution",
        text: "Get the right lead to the right rep instantly with cleaner assignment logic.",
      },
      {
        title: "Automated Enrichment",
        text: "As soon as a lead enters your system, agentic workflows pull profile data, market context, and stack details automatically.",
      },
      {
        title: "Smart Follow-Up Sequences",
        text: "Keep momentum across email, LinkedIn, and sequence logic without manual chasing.",
      },
    ],
  },
  outcomes: {
    eyebrow: "The Outcome",
    title: "Time back and cleaner execution",
    items: [
      "Less admin burden across the sales process.",
      "Cleaner CRM data integrity through automation.",
      "Faster response windows measured in seconds, not hours.",
    ],
  },
  cta: {
    label: "Book a Discovery Call",
    href: DISCOVERY_CALL_URL,
  },
};

export const metadata: Metadata = {
  title: { absolute: "Sales Automation Systems | Human-Led AI Workflows for Sales Leaders" },
  description:
    "Built for sales leaders. We deploy human-led AI workflows for routing, enrichment, follow-up, and CRM admin so reps spend more time selling.",
};

export default function AutomationPage() {
  const content = AUTOMATION_CONTENT;

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

        <section className="section" aria-label="Automation pillars">
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

        <section className="section" aria-label="Automation outcomes">
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
            <h2 className="section-title cta-title">Want workflows that save time without slowing sales?</h2>
            <p className="muted cta-copy">
              We will audit your bottlenecks and deploy a workflow layer that removes manual drag across the pipeline.
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
