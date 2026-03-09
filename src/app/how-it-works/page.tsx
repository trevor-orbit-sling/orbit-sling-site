import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Starfield from "../starfield";

const DISCOVERY_CALL_URL = "https://schedule.orbitsling.com/discoverycall";

const HOW_IT_WORKS_CONTENT = {
  hero: {
    eyebrow: "How It Works",
    title: "How we build human-led AI sales systems",
    copy:
      "We start with the revenue bottlenecks, build the outbound, automation, and RevOps layer that fits your team, validate it in market, and scale only what proves itself.",
  },
  engagement: {
    eyebrow: "Stage 1",
    title: "Start with the diagnostic",
    items: [
      {
        label: "01",
        title: "The Discovery Call",
        text: "A focused 15-minute diagnostic to map your pipeline bottlenecks, rep capacity, and target segment priorities.",
      },
      {
        label: "02",
        title: "Agreement and Onboarding",
        text: "Once opportunity is clear, we finalize scope and launch onboarding to align teams quickly.",
      },
      {
        label: "03",
        title: "The Kickoff Call",
        text: "We align stakeholders on ICP, offers, and agentic enrichment, the research and prep workflows behind better outreach, before building begins.",
      },
    ],
  },
  build: {
    eyebrow: "Stage 2",
    title: "Build and validate in market",
    phases: [
      {
        label: "Phase 1",
        title: "Foundation and First Tests",
        points: [
          "Offer definition and message refinement.",
          "Agentic research and prep for accounts and contacts.",
          "Small-scale campaign testing to validate hooks.",
        ],
      },
      {
        label: "Phase 2",
        title: "Validation",
        points: [
          "Analyze reply quality, intent, and sentiment.",
          "Pivot messaging based on real market signals.",
          "Double down only where intent quality is proven.",
        ],
      },
      {
        label: "Phase 3",
        title: "Scaling Up",
        points: [
          "Expand deployment across email and LinkedIn.",
          "Increase throughput once offer-market fit is validated.",
          "Run ongoing optimization with fractional RevOps support.",
        ],
      },
    ],
  },
  process: {
    eyebrow: "Stage 3",
    title: "Operationalize the system",
    steps: [
      {
        label: "Step 01: Diagnose",
        goal: "Find the leaks.",
        text: "Audit tech stack, data, and messaging.",
        deliverable: "The Pipeline Audit Report",
      },
      {
        label: "Step 02: Design",
        goal: "Map the system.",
        text: "Build workflow architecture and execution blueprint.",
        deliverable: "The Sales System Blueprint",
      },
      {
        label: "Step 03: Deploy",
        goal: "Launch the workflows.",
        text: "Set up domains, LinkedIn automation, CRM integrations, and agentic workflows that research accounts, route work, and prep reps.",
        deliverable: "Your Live Outbound Engine",
      },
      {
        label: "Step 04: Deepen",
        goal: "Improve what works.",
        text: "Run RevOps optimization and experimentation loops.",
        deliverable: "Ongoing Performance Reports",
      },
    ],
  },
  cta: {
    label: "Book a Discovery Call",
    href: DISCOVERY_CALL_URL,
  },
};

export const metadata: Metadata = {
  title: { absolute: "How We Build Human-Led AI Sales Systems" },
  description:
    "Learn how Orbit Sling builds human-led AI sales systems for sales leaders. Our process diagnoses leaks, validates what works, and scales with clean reporting.",
};

export default function HowItWorksPage() {
  const content = HOW_IT_WORKS_CONTENT;

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
            <a href={content.cta.href} className="btn-primary" target="_blank" rel="noreferrer">
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

        <section className="section" aria-label="Engagement process">
          <span className="eyebrow">{content.engagement.eyebrow}</span>
          <h2 className="section-title">{content.engagement.title}</h2>
          <div className="industry-detail-grid industry-detail-grid-process">
            {content.engagement.items.map((item) => (
              <article key={item.title} className="industry-detail-card industry-detail-card-process">
                <p className="industry-detail-card-label">{item.label}</p>
                <h3 className="process-title">{item.title}</h3>
                <p className="muted">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-label="Three phase execution">
          <span className="eyebrow">{content.build.eyebrow}</span>
          <h2 className="section-title">{content.build.title}</h2>
          <div className="industry-detail-grid industry-detail-grid-usecases">
            {content.build.phases.map((phase) => (
              <article key={phase.title} className="industry-detail-card industry-detail-card-usecase">
                <p className="industry-detail-card-label">{phase.label}</p>
                <h3 className="team-principle-title">{phase.title}</h3>
                <ul className="team-focus-list">
                  {phase.points.map((point) => (
                    <li key={`${phase.label}-${point}`}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-label="Core process">
          <span className="eyebrow">{content.process.eyebrow}</span>
          <h2 className="section-title">{content.process.title}</h2>
          <div className="industry-detail-grid industry-detail-grid-process">
            {content.process.steps.map((step) => (
              <article key={step.label} className="industry-detail-card industry-detail-card-process">
                <p className="industry-detail-card-label">{step.label}</p>
                <p className="muted">
                  <strong>Goal:</strong> {step.goal}
                </p>
                <p className="muted">{step.text}</p>
                <p className="industry-overview-label">Deliverable: {step.deliverable}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="next-step">
          <div className="cta-shell team-cta">
            <span className="eyebrow">Next Step</span>
            <h2 className="section-title cta-title">Ready to build a sales system that makes more money and saves time?</h2>
            <p className="muted cta-copy">
              We will diagnose your bottlenecks, map the right operating model, and launch with measurable execution.
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
