import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRY_PROFILES } from "@/lib/industry-content";
import { CASE_STUDIES } from "@/lib/case-studies";
import DeferredVisualEffects from "./deferred-visual-effects";
import SiteHeader from "@/components/SiteHeader";
import ToolLogoMarquee from "@/components/ToolLogoMarquee";
import CaseStudySection from "@/components/CaseStudySection";

export const metadata: Metadata = {
  title: { absolute: "Orbit Sling | Human-Led AI Systems for Sales Leaders" },
  description:
    "Orbit Sling builds outbound, automation, and RevOps systems for sales leaders who need more qualified pipeline, faster follow-up, and cleaner revenue visibility.",
};

const HOME_CONTENT = {
  hero: {
    eyebrow: "Built for Scaling Sales Leaders",
    title: "Human-led AI systems for sales leaders who need more pipeline and less manual work.",
    copy:
      "Orbit Sling builds outbound, automation, and RevOps systems for sales leaders. We use AI for research, routing, and follow-up so your team can spend more time selling and less time buried in manual work.",
    impactLabel: "What you get",
    metrics: [
      {
        value: "More Qualified Pipeline",
        text: "Targeting and outreach focus on better-fit accounts and higher-quality opportunities.",
      },
      {
        value: "Faster Follow-Up",
        text: "Workflows keep leads moving so good opportunities do not go cold.",
      },
      {
        value: "More Selling Time",
        text: "Reps spend less time on research, admin, and CRM cleanup.",
      },
      {
        value: "Cleaner Revenue Visibility",
        text: "Sales leaders get clearer pipeline data and better weekly decision-making.",
      },
      {
        value: "Human Conversations Stay Human",
        text: "AI handles research and process while your team owns trust, tone, and close.",
      },
    ],
    primaryAction: {
      label: "Book a Discovery Call",
      href: "https://schedule.orbitsling.com/discoverycall",
    },
    secondaryAction: {
      label: "See How We Work",
      href: "/how-it-works/",
    },
  },
  services: {
    eyebrow: "Our Services",
    title: "Three systems that create pipeline, speed, and visibility",
    items: [
      {
        title: "Outbound Engine Build",
        description: "Human-led outbound systems that create more qualified opportunities from better-fit accounts.",
        href: "/services/outbound-engine/",
      },
      {
        title: "Automation Systems",
        description: "Automation that handles routing, follow-up, and CRM work so reps get time back.",
        href: "/services/automation/",
      },
      {
        title: "Revenue Operations",
        description: "RevOps systems that give sales leaders clearer pipeline visibility and cleaner operating discipline.",
        href: "/services/revops/",
      },
    ],
  },
  solution: {
    eyebrow: "For Sales Leaders",
    title: "What sales leaders get once the system is working",
    pillars: [
      {
        label: "Who to target",
        text: "Agentic research and qualification show your team which accounts deserve attention now.",
        outcome: "Outcome: We know who is worth pursuing.",
      },
      {
        label: "What to do next",
        text: "Workflows and process design make the next best action obvious instead of leaving reps to chase admin.",
        outcome: "Outcome: The team follows up faster and misses fewer opportunities.",
      },
      {
        label: "What the pipeline is saying",
        text: "Reporting and RevOps discipline turn activity into a cleaner signal leaders can use.",
        outcome: "Outcome: We can see what is working and where deals are getting stuck.",
      },
    ],
  },
  caseStudySection: {
    eyebrow: "Case Study",
    title: "Proof that clearer positioning and execution turn into revenue",
  },
  cta: {
    eyebrow: "Ready to fix the revenue system?",
    title: "Build the outbound, automation, and RevOps layer your team can actually run.",
    copy:
      "If your team is losing time to manual work, slow follow-up, or messy pipeline visibility, we can build the system that creates more opportunities without adding operational drag.",
    primaryAction: {
      label: "Book a Discovery Call",
      href: "https://schedule.orbitsling.com/discoverycall",
    },
  },
};

const LINKEDIN_HEADER_STYLE_ENABLED = false;

function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href);
}

export default function Home() {
  const homeContent = HOME_CONTENT;
  const navAction = homeContent.cta.primaryAction;
  const navActionIsExternal = isExternalLink(navAction.href);
  const heroPrimaryAction = homeContent.hero.primaryAction;
  const heroSecondaryAction = homeContent.hero.secondaryAction;
  const heroPrimaryActionIsExternal = isExternalLink(heroPrimaryAction.href);
  const heroSecondaryActionIsExternal = isExternalLink(heroSecondaryAction.href);
  const ctaPrimaryAction = homeContent.cta.primaryAction;
  const ctaPrimaryActionIsExternal = isExternalLink(ctaPrimaryAction.href);
  const pageShellClassName = LINKEDIN_HEADER_STYLE_ENABLED
    ? "page-shell home-linkedin-style"
    : "page-shell";

  return (
    <div className={pageShellClassName}>
      <DeferredVisualEffects />
      <SiteHeader navAction={navAction} navActionIsExternal={navActionIsExternal} />

      <main className="container">
        <section className="section section-hero" id="hero">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="eyebrow">{homeContent.hero.eyebrow}</span>
              <h1 className="hero-title">{homeContent.hero.title}</h1>
              <p className="hero-copy">{homeContent.hero.copy}</p>
              <div className="hero-actions">
                <a
                  href={heroPrimaryAction.href}
                  className="btn-primary"
                  target={heroPrimaryActionIsExternal ? "_blank" : undefined}
                  rel={heroPrimaryActionIsExternal ? "noreferrer" : undefined}
                >
                  {heroPrimaryAction.label}
                </a>
                {heroSecondaryActionIsExternal ? (
                  <a href={heroSecondaryAction.href} className="btn-ghost" target="_blank" rel="noreferrer">
                    {heroSecondaryAction.label}
                  </a>
                ) : (
                  <Link href={heroSecondaryAction.href} className="btn-ghost">
                    {heroSecondaryAction.label}
                  </Link>
                )}
              </div>
            </div>
            <aside className="hero-panel">
              <p className="hero-panel-label">{homeContent.hero.impactLabel}</p>
              <div className="hero-metric-grid">
                {homeContent.hero.metrics.map((metric) => (
                  <article key={metric.value} className="hero-metric">
                    <p className="metric">{metric.value}</p>
                    <p className="muted">{metric.text}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>
        <ToolLogoMarquee />

        <section className="section" id="services">
          <span className="eyebrow">{homeContent.services.eyebrow}</span>
          <h2 className="section-title">{homeContent.services.title}</h2>
          <div className="cards services-grid">
            {homeContent.services.items.map((service) => (
              <article key={service.title} className="card service-card">
                <h3>{service.title}</h3>
                <p className="muted">{service.description}</p>
                <Link href={service.href} className="industry-link">
                  Learn more
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="industries">
          <span className="eyebrow">Built for Scaling Sales Teams</span>
          <h2 className="section-title">Industry systems with practical execution depth</h2>
          <div className="industries-grid">
            {INDUSTRY_PROFILES.map((industry) => (
              <article key={industry.id} className="card industry-card">
                <p className="industry-icon" aria-hidden="true">
                  {industry.icon}
                </p>
                <h3>{industry.name}</h3>
                <p className="muted">{industry.homeTeaser}</p>
                <Link href={industry.href} className="industry-link">
                  Explore {industry.name}
                </Link>
              </article>
            ))}
          </div>
          <div className="industries-actions">
            <Link href="/industries/" className="btn-ghost">
              View Industry Overview
            </Link>
          </div>
        </section>

        <section className="section" id="process">
          <span className="eyebrow">{homeContent.solution.eyebrow}</span>
          <h2 className="section-title">{homeContent.solution.title}</h2>
          <div className="process-grid">
            {homeContent.solution.pillars.map((pillar) => (
              <article key={pillar.label} className="panel process-card">
                <p className="text-sm muted mb-1">{pillar.label}</p>
                <p className="muted">{pillar.text}</p>
                <p className="industry-overview-label">{pillar.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <CaseStudySection
          eyebrow={homeContent.caseStudySection.eyebrow}
          title={homeContent.caseStudySection.title}
          studies={CASE_STUDIES}
        />

        <section className="section" id="cta">
          <div className="cta-shell">
            <span className="eyebrow">{homeContent.cta.eyebrow}</span>
            <h2 className="section-title cta-title">{homeContent.cta.title}</h2>
            <p className="muted cta-copy">{homeContent.cta.copy}</p>
            <div className="cta-actions">
              <a
                href={ctaPrimaryAction.href}
                className="btn-primary"
                target={ctaPrimaryActionIsExternal ? "_blank" : undefined}
                rel={ctaPrimaryActionIsExternal ? "noreferrer" : undefined}
              >
                {ctaPrimaryAction.label}
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
