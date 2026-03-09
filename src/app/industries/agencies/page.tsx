import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Starfield from "../../starfield";

const DISCOVERY_CALL_URL = "https://schedule.orbitsling.com/discoverycall";

const AGENCIES_CONTENT = {
  hero: {
    eyebrow: "Industry: High-Ticket Agencies",
    title: "Move Beyond Referrals. Build a Growth Engine.",
    copy:
      "We help agencies move beyond word-of-mouth with human-led AI outbound systems that create more qualified opportunities without adding founder-led manual follow-up.",
  },
  pillars: {
    eyebrow: "How We Help Agencies Scale",
    title: "Agency-focused growth pillars",
    items: [
      {
        title: "Positioning and Offer Clarity",
        text: "Find your wedge in a crowded market and align messaging around the right buyer intent.",
      },
      {
        title: "High-Touch LinkedIn Automation",
        text: "Human-led AI outreach that mirrors the nuance and context of founder-level engagement.",
      },
      {
        title: "Automated Portfolio Showcasing",
        text: "Embed proof and case studies directly into sequences so trust builds faster.",
      },
    ],
  },
  cta: {
    label: "Book a Discovery Call",
    href: DISCOVERY_CALL_URL,
  },
};

export const metadata: Metadata = {
  title: { absolute: "Lead Generation for Agencies | High-Ticket Agency Sales" },
  description:
    "Break the referral cycle. We help agencies land high-ticket clients with human-led AI outbound systems and stronger follow-up.",
};

export default function AgenciesIndustryPage() {
  const content = AGENCIES_CONTENT;

  return (
    <div className="page-shell agency-shell">
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

      <main className="container content-main agency-main">
        <section className="section agency-hero" id="top">
          <div className="agency-topline">
            <span className="eyebrow">{content.hero.eyebrow}</span>
          </div>
          <h1 className="hero-title agency-title">{content.hero.title}</h1>
          <p className="hero-copy agency-copy">{content.hero.copy}</p>
          <div className="hero-actions agency-hero-actions">
            <a href={content.cta.href} className="btn-primary" target="_blank" rel="noreferrer">
              {content.cta.label}
            </a>
            <Link href="/how-it-works/" className="btn-ghost">
              See How We Work
            </Link>
          </div>
        </section>

        <section className="section agency-usecases" id="support-pillars">
          <span className="eyebrow">{content.pillars.eyebrow}</span>
          <h2 className="section-title">{content.pillars.title}</h2>
          <div className="agency-usecase-grid industry-detail-grid industry-detail-grid-usecases">
            {content.pillars.items.map((pillar) => (
              <article key={pillar.title} className="industry-detail-card industry-detail-card-usecase agency-usecase-card">
                <h3 className="agency-usecase-title">{pillar.title}</h3>
                <p className="muted">{pillar.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="next-step">
          <div className="cta-shell agency-cta">
            <span className="eyebrow">Next Step</span>
            <h2 className="section-title cta-title">Want a predictable agency pipeline engine?</h2>
            <p className="muted cta-copy">
              We will map your offer, build your outbound operating system, and launch with clear performance
              visibility.
            </p>
            <div className="cta-actions agency-cta-actions">
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
