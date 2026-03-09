import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Starfield from "../starfield";
import SiteHeader from "@/components/SiteHeader";

const DISCOVERY_CALL_URL = "https://schedule.orbitsling.com/discoverycall";

const PHILOSOPHY_CONTENT = {
  hero: {
    eyebrow: "Our Philosophy",
    title: "Sales is human work. AI should magnify it.",
    copy:
      "Sales is still won by human judgment, trust, and follow-through. We use AI and agentic workflows that surface context, support follow-up, and remove admin to give your team better context, faster execution, and more time for the conversations that create revenue.",
  },
  principles: {
    eyebrow: "Core Principles",
    title: "How we apply this in real systems",
    items: [
      {
        title: "Human-first execution",
        text: "We design systems that protect and increase the amount of real human conversation in the pipeline.",
      },
      {
        title: "AI as a force multiplier",
        text: "We use AI to increase speed and consistency, never to replace the human relationship that closes deals.",
      },
      {
        title: "The human edge grows over time",
        text: "As AI becomes more common in sales, authentic human judgment and communication will matter even more.",
      },
    ],
  },
  applications: {
    eyebrow: "Practical AI Uses",
    title: "Where AI saves time without reducing trust",
    items: [
      "Building and enriching lead lists with faster research cycles.",
      "Preparing outreach context and account notes before conversations.",
      "Supporting follow-up draft quality while humans own final tone and decisions.",
      "Helping fill and personalize proposal templates.",
      "Improve output and profitability per salesperson.",
    ],
  },
  growth: {
    eyebrow: "Business Philosophy",
    title: "Test fast and hard, with sustainable execution",
    copy:
      "We believe in sustainable growth and disciplined systems. We also believe that when capacity exists, it should be used fully to drive more revenue. More qualified leads and more deals closed create upside for the entire business.",
  },
};

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "Orbit Sling believes AI should magnify human sales performance, not replace it. We build human-led AI systems that increase conversation quality, execution speed, and revenue impact.",
};

export default function OurPhilosophyPage() {
  const content = PHILOSOPHY_CONTENT;

  return (
    <div className="page-shell team-shell">
      <Starfield />

      <SiteHeader navAction={{ label: "Book a Discovery Call", href: DISCOVERY_CALL_URL }} navActionIsExternal={true} />

      <main className="container content-main team-main">
        <section className="section team-hero" id="top">
          <div className="team-topline">
            <span className="eyebrow">{content.hero.eyebrow}</span>
          </div>
          <h1 className="hero-title team-title">{content.hero.title}</h1>
          <p className="hero-copy team-intro">{content.hero.copy}</p>
        </section>

        <section className="section" aria-label="Philosophy principles">
          <span className="eyebrow">{content.principles.eyebrow}</span>
          <h2 className="section-title">{content.principles.title}</h2>
          <div className="industry-detail-grid industry-detail-grid-usecases">
            {content.principles.items.map((item) => (
              <article key={item.title} className="industry-detail-card industry-detail-card-usecase">
                <h3 className="team-principle-title">{item.title}</h3>
                <p className="muted">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-label="AI applications">
          <span className="eyebrow">{content.applications.eyebrow}</span>
          <h2 className="section-title">{content.applications.title}</h2>
          <div className="industry-detail-card team-ai-philosophy-card">
            <ul className="team-focus-list">
              {content.applications.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-label="Growth philosophy">
          <div className="cta-shell team-cta">
            <span className="eyebrow">{content.growth.eyebrow}</span>
            <h2 className="section-title cta-title">{content.growth.title}</h2>
            <p className="muted cta-copy">{content.growth.copy}</p>
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
