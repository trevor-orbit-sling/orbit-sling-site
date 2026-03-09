import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { INDUSTRY_PROFILES } from "@/lib/industry-content";
import Starfield from "../starfield";

const DISCOVERY_CALL_URL = "https://schedule.orbitsling.com/discoverycall";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Orbit Sling builds market-specific outbound, automation, and RevOps systems for agencies, biotech teams, and logistics operators.",
};

export default function IndustriesPage() {
  return (
    <div className="page-shell industries-shell">
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

      <main className="container content-main industries-main">
        <section className="section industries-hero" id="top">
          <div className="industries-hero-topline">
            <span className="eyebrow">Industries</span>
          </div>
          <h1 className="hero-title industries-title">Market-specific sales systems for teams that need execution</h1>
          <p className="hero-copy industries-copy">
            We build human-led AI sales systems for markets with complex buying motions, long sales cycles, or
            high-volume outreach needs. Each segment gets its own targeting, messaging, and workflow design so your
            team creates more opportunities without adding manual work.
          </p>
        </section>

        <section className="section industries-overview-grid" aria-label="Industry overviews">
          {INDUSTRY_PROFILES.map((industry) => (
            <article key={industry.id} id={industry.id} className="panel industry-overview-card">
              <div className="industry-overview-head">
                <p className="industry-overview-icon" aria-hidden="true">
                  {industry.icon}
                </p>
                <div>
                  <p className="text-sm muted">Industry</p>
                  <h2 className="industry-overview-title">{industry.name}</h2>
                </div>
              </div>

              <p className="industry-overview-label">Why this industry works with Orbit Sling</p>
              <p className="muted">{industry.why}</p>

              <p className="industry-overview-label">How we support this segment</p>
              <ul className="industry-capability-list">
                {industry.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>

              {industry.detailHref ? (
                <Link href={industry.detailHref} className="industry-overview-detail-link">
                  View industry framework
                </Link>
              ) : null}
            </article>
          ))}
        </section>

        <section className="section" id="next-step">
          <div className="cta-shell industries-cta">
            <span className="eyebrow">Next Step</span>
            <h2 className="section-title cta-title">Need a market-specific system that creates more opportunities?</h2>
            <p className="muted cta-copy">
              We will map your segment, diagnose the bottlenecks, and build the outbound, automation, and RevOps layer
              your team can run every week.
            </p>
            <div className="cta-actions">
              <a href={DISCOVERY_CALL_URL} className="btn-primary" target="_blank" rel="noreferrer">
                Book a Discovery Call
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
