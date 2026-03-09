import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Starfield from "../../starfield";

const DISCOVERY_CALL_URL = "https://schedule.orbitsling.com/discoverycall";

const LOGISTICS_CONTENT = {
  hero: {
    eyebrow: "Industry: Logistics & Supply Chain",
    title: "Scale Your Operations with Logistics Sales Automation",
    copy:
      "We provide high-performance lead generation for 3PL and freight forwarders, automating high-volume outreach and relationship management.",
  },
  solution: {
    eyebrow: "Our Logistics Sales Solution",
    title: "Built for speed, volume, and operational reality",
    items: [
      {
        title: "High-Volume Lead Generation for 3PL",
        text: "Robust outbound systems that safely handle large outreach volume while preserving deliverability and signal quality.",
      },
      {
        title: "Real-Time Lead Enrichment",
        text: "Message timing and prioritization triggered by market activity, shipment context, and buyer relevance signals.",
      },
    ],
  },
  cta: {
    label: "Book a Discovery Call",
    href: DISCOVERY_CALL_URL,
  },
};

export const metadata: Metadata = {
  title: { absolute: "Logistics Sales Automation | Lead Generation for 3PL" },
  description:
    "Scale your freight and logistics business. We provide logistics sales automation and high-volume lead generation for 3PL and freight forwarders.",
};

export default function LogisticsIndustryPage() {
  const content = LOGISTICS_CONTENT;

  return (
    <div className="page-shell logistics-shell">
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

      <main className="container content-main logistics-main">
        <section className="section logistics-hero" id="top">
          <div className="logistics-topline">
            <span className="eyebrow">{content.hero.eyebrow}</span>
          </div>
          <h1 className="hero-title logistics-title">{content.hero.title}</h1>
          <p className="hero-copy logistics-copy">{content.hero.copy}</p>
          <div className="hero-actions logistics-hero-actions">
            <a href={content.cta.href} className="btn-primary" target="_blank" rel="noreferrer">
              {content.cta.label}
            </a>
            <Link href="/how-it-works/" className="btn-ghost">
              See How We Work
            </Link>
          </div>
        </section>

        <section className="section logistics-usecases" id="solution-pillars">
          <span className="eyebrow">{content.solution.eyebrow}</span>
          <h2 className="section-title">{content.solution.title}</h2>
          <div className="logistics-usecase-grid industry-detail-grid industry-detail-grid-usecases">
            {content.solution.items.map((item) => (
              <article
                key={item.title}
                className="industry-detail-card industry-detail-card-usecase logistics-usecase-card"
              >
                <h3 className="logistics-usecase-title">{item.title}</h3>
                <p className="muted">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="next-step">
          <div className="cta-shell logistics-cta">
            <span className="eyebrow">Next Step</span>
            <h2 className="section-title cta-title">Ready to scale logistics pipeline without chaos?</h2>
            <p className="muted cta-copy">
              We will map your outbound motion and deploy a high-volume system your team can operate reliably.
            </p>
            <div className="cta-actions logistics-cta-actions">
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
