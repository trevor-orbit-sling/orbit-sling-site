import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Starfield from "../../starfield";

const DISCOVERY_CALL_URL = "https://schedule.orbitsling.com/discoverycall";

const BIOTECH_CONTENT = {
  hero: {
    eyebrow: "Industry: Biotechnology & Life Sciences",
    title: "Precision Biotech Lead Generation for Complex Science",
    copy:
      "We help biotech and life science teams navigate long sales cycles and high-level decision-makers with automation that preserves professional integrity.",
  },
  solution: {
    eyebrow: "Our Biotech Sales Solution",
    title: "Built for technical stakeholders and complex cycles",
    items: [
      {
        title: "Advanced Biotech Stakeholder Mapping",
        text: "AI-driven mapping of principal investigators, lab managers, and C-suite buyers across long decision paths.",
      },
      {
        title: "Life Science Sales Automation",
        text: "Evidence-based messaging that respects technical depth and translates science into business value.",
      },
    ],
  },
  cta: {
    label: "Book a Discovery Call",
    href: DISCOVERY_CALL_URL,
  },
};

export const metadata: Metadata = {
  title: { absolute: "Biotech Lead Generation | Life Science Sales Automation" },
  description:
    "Precision outreach for complex science. We provide biotech lead generation and life science sales automation to reach high-level decision-makers.",
};

export default function BiotechIndustryPage() {
  const content = BIOTECH_CONTENT;

  return (
    <div className="page-shell biotech-shell">
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
            <a href={content.cta.href} className="btn-primary" target="_blank" rel="noreferrer">
              Book a Discovery Call
            </a>
          </div>
        </nav>
      </header>

      <main className="container content-main biotech-main">
        <section className="section biotech-hero" id="top">
          <div className="biotech-topline">
            <span className="eyebrow">{content.hero.eyebrow}</span>
          </div>
          <h1 className="hero-title biotech-title">{content.hero.title}</h1>
          <p className="hero-copy biotech-copy">{content.hero.copy}</p>
          <div className="hero-actions biotech-hero-actions">
            <a href={content.cta.href} className="btn-primary" target="_blank" rel="noreferrer">
              {content.cta.label}
            </a>
            <Link href="/how-it-works/" className="btn-ghost">
              See How We Work
            </Link>
          </div>
        </section>

        <section className="section biotech-usecases" id="solution-pillars">
          <span className="eyebrow">{content.solution.eyebrow}</span>
          <h2 className="section-title">{content.solution.title}</h2>
          <div className="biotech-usecase-grid industry-detail-grid industry-detail-grid-usecases">
            {content.solution.items.map((item) => (
              <article key={item.title} className="industry-detail-card industry-detail-card-usecase biotech-usecase-card">
                <h3 className="biotech-usecase-title">{item.title}</h3>
                <p className="muted">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="next-step">
          <div className="cta-shell biotech-cta">
            <span className="eyebrow">Next Step</span>
            <h2 className="section-title cta-title">Need biotech outreach with technical credibility?</h2>
            <p className="muted cta-copy">
              We will map stakeholders, align technical messaging, and deploy a repeatable growth system your team can
              run weekly.
            </p>
            <div className="cta-actions biotech-cta-actions">
              <a href={content.cta.href} className="btn-primary" target="_blank" rel="noreferrer">
                {content.cta.label}
              </a>
              <Link href="/industries/" className="btn-ghost">
                Back to industries
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container flex flex-wrap items-center justify-between gap-3">
          <p className="muted">© {new Date().getFullYear()} Orbit Sling. Human-led AI sales systems.</p>
          <a className="muted" href="https://www.linkedin.com/company/orbit-sling" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
