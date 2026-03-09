import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Starfield from "../starfield";

const TEAM_CONTENT = {
  hero: {
    eyebrow: "Our Team",
    title: "Meet the People Behind Orbit Sling",
    copy:
      "Orbit Sling is led by operators who combine positioning, systems design, and agentic workflow execution to help sales leaders grow revenue without removing the human layer from sales.",
  },
  members: {
    eyebrow: "Co-Founders",
    title: "The operators building Orbit Sling",
    items: [
      {
        id: "trevor",
        name: "Trevor",
        role: "Co-founder",
        imageSrc: "/assets/brand/trevor.png",
        imageAlt: "Trevor, co-founder of Orbit Sling",
        blurb:
          "Trevor brings extensive experience across marketing agencies, operations, and automation systems. He is passionate about applying data from unexpected sources and turning it into reliable performance in new contexts. Outside of work, you will usually find him exploring Taipei, cooking a good meal, or getting outside.",
        focus: [
          "Marketing agency and operations depth",
          "Systems design and automation execution",
          "Applying unconventional data to practical growth decisions",
        ],
      },
      {
        id: "gustaf",
        name: "Gustaf",
        role: "Co-founder",
        imageSrc: "/assets/brand/gustaf.png",
        imageAlt: "Gustaf, co-founder of Orbit Sling",
        blurb:
          "Gustaf has worked with fast-growing startups across teams large and small. His focus is presenting each brand as clearly as possible to exactly the right prospects. He has also worked extensively with teams to clarify operations and build scalable sales structures.",
        focus: [
          "Clear brand positioning for the right prospects",
          "Cross-team operational clarity",
          "Scalable sales structure design",
        ],
      },
    ],
  },
  values: {
    eyebrow: "Our Values",
    title: "How we operate",
    items: ["Integrity over volume.", "Continuous learning.", "Relentless clarity."],
  },
  cta: {
    eyebrow: "Next Step",
    title: "Ready to work with a human-led AI team?",
    copy: "We can review your current motion and map the highest-impact system changes for this quarter.",
    primaryAction: {
      label: "Book a Discovery Call",
      href: "https://schedule.orbitsling.com/discoverycall",
    },
  },
};

export const metadata: Metadata = {
  title: { absolute: "Meet the Orbit Sling Team | Human-Led AI Sales Systems" },
  description:
    "Meet the operators behind Orbit Sling. We build human-led AI sales systems that help sales leaders grow revenue without removing the human layer from sales.",
};

function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href);
}

export default function TeamPage() {
  const teamContent = TEAM_CONTENT;
  const ctaIsExternal = isExternalLink(teamContent.cta.primaryAction.href);

  return (
    <div className="page-shell team-shell">
      <Starfield />

      <header className="site-header container">
        <nav className="nav-row">
          <Link href="/" className="logo-wrap" aria-label="Orbit Sling Home">
            <Image src="/assets/brand/logo-horizontal.svg" alt="Orbit Sling" width={240} height={75} priority />
          </Link>
          <div className="nav-links">
            <Link href="/team/" className="muted" aria-current="page">
              Our Team
            </Link>
            <Link href="/our-philosophy/" className="muted">
              Our Philosophy
            </Link>
            <Link href="/how-it-works/" className="muted">
              How It Works
            </Link>
            <a
              href={teamContent.cta.primaryAction.href}
              className="btn-primary"
              target={ctaIsExternal ? "_blank" : undefined}
              rel={ctaIsExternal ? "noreferrer" : undefined}
            >
              {teamContent.cta.primaryAction.label}
            </a>
          </div>
        </nav>
      </header>

      <main className="container content-main team-main">
        <section className="section team-hero" id="top">
          <div className="team-topline">
            <span className="eyebrow">{teamContent.hero.eyebrow}</span>
          </div>
          <h1 className="hero-title team-title">{teamContent.hero.title}</h1>
          <p className="hero-copy team-intro">{teamContent.hero.copy}</p>
        </section>

        <section className="section" aria-label="Orbit Sling leadership">
          <span className="eyebrow">{teamContent.members.eyebrow}</span>
          <h2 className="section-title">{teamContent.members.title}</h2>
          <div className="team-grid">
            {teamContent.members.items.map((member) => (
              <article key={member.id} className="team-card industry-detail-card industry-detail-card-team">
                <div className="team-photo-wrap">
                  <Image
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 420px"
                    className={`team-photo${member.id === "trevor" ? " team-photo-trevor" : ""}`}
                  />
                </div>
                <div className="team-copy">
                  <p className="industry-detail-card-label">Role</p>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="muted team-blurb">{member.blurb}</p>
                  <p className="team-focus-label">Primary focus</p>
                  <ul className="team-focus-list">
                    {member.focus.map((item) => (
                      <li key={`${member.id}-${item}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section team-principles" aria-label="Our values">
          <span className="eyebrow">{teamContent.values.eyebrow}</span>
          <h2 className="section-title">{teamContent.values.title}</h2>
          <div className="industry-detail-card team-ai-philosophy-card">
            <ul className="team-focus-list">
              {teamContent.values.items.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
            <div className="team-ai-philosophy-actions">
              <Link href="/our-philosophy/" className="btn-ghost">
                Read Our Philosophy
              </Link>
            </div>
          </div>
        </section>

        <section className="section" id="next-step">
          <div className="cta-shell team-cta">
            <span className="eyebrow">{teamContent.cta.eyebrow}</span>
            <h2 className="section-title cta-title">{teamContent.cta.title}</h2>
            <p className="muted cta-copy">{teamContent.cta.copy}</p>
            <div className="cta-actions">
              <a
                href={teamContent.cta.primaryAction.href}
                className="btn-primary"
                target={ctaIsExternal ? "_blank" : undefined}
                rel={ctaIsExternal ? "noreferrer" : undefined}
              >
                {teamContent.cta.primaryAction.label}
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
