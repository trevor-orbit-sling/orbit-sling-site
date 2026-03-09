import type { Metadata } from "next";
import styles from "./page.module.css";

type ColorToken = {
  token: string;
  value: string;
  usage: string;
  swatch: string;
  border?: string;
};

type SpecRow = {
  item: string;
  selector: string;
  value: string;
  notes: string;
};

const colorTokens: ColorToken[] = [
  {
    token: "--brand-black",
    value: "#06070b",
    usage: "Base background",
    swatch: "#06070b",
  },
  {
    token: "--brand-black-soft",
    value: "#0e1018",
    usage: "Soft dark surface",
    swatch: "#0e1018",
  },
  {
    token: "--brand-white",
    value: "#f4f6fb",
    usage: "Primary text",
    swatch: "#f4f6fb",
    border: "rgba(6, 7, 11, 0.25)",
  },
  {
    token: "--brand-muted",
    value: "#9aa0b5",
    usage: "Secondary text",
    swatch: "#9aa0b5",
  },
  {
    token: "--brand-panel",
    value: "#121520",
    usage: "Panel base",
    swatch: "#121520",
  },
  {
    token: "--brand-panel-alt",
    value: "#1a1e2d",
    usage: "Alternate panel",
    swatch: "#1a1e2d",
  },
  {
    token: "--brand-indigo",
    value: "#5966d9",
    usage: "Primary accent",
    swatch: "#5966d9",
  },
  {
    token: "--brand-violet",
    value: "#774cc8",
    usage: "Secondary accent",
    swatch: "#774cc8",
  },
  {
    token: "--brand-crimson",
    value: "#e01a4f",
    usage: "Tertiary accent",
    swatch: "#e01a4f",
  },
];

const typographySpecs: SpecRow[] = [
  {
    item: "Body base",
    selector: "body",
    value: "font-family: Inter; font-size: 16px; line-height: 1.6",
    notes: "Default UI/body text",
  },
  {
    item: "Display headings",
    selector: "h1-h4",
    value: "font-family: Inter Tight; line-height: 1.12",
    notes: "All heading levels",
  },
  {
    item: "Hero title",
    selector: ".hero-title",
    value: "font-size: clamp(2.05rem, 5vw, 4.35rem); letter-spacing: -0.025em",
    notes: "Primary marketing headline",
  },
  {
    item: "Section title",
    selector: ".section-title",
    value: "font-size: clamp(1.65rem, 4vw, 3rem); letter-spacing: -0.018em",
    notes: "Major section headings",
  },
  {
    item: "Eyebrow",
    selector: ".eyebrow",
    value: "font-size: 0.78rem; font-weight: 600; letter-spacing: 0.11em; uppercase",
    notes: "Section labels",
  },
  {
    item: "Button text",
    selector: ".btn-primary, .btn-ghost",
    value: "font-weight: 650",
    notes: "CTA emphasis",
  },
  {
    item: "Nav text",
    selector: ".nav-links",
    value: "font-size: 1rem; font-weight: 540; letter-spacing: 0.008em",
    notes: "Desktop navigation",
  },
];

const spacingSpecs: SpecRow[] = [
  {
    item: "Container width",
    selector: ".container",
    value: "width: min(1280px, 92vw)",
    notes: "Global content frame",
  },
  {
    item: "Section vertical rhythm",
    selector: ".section",
    value: "padding: clamp(32px, 5vw, 90px) 0",
    notes: "Primary page cadence",
  },
  {
    item: "Header padding",
    selector: ".site-header",
    value: "padding: clamp(24px, 2.5vw, 32px) 0",
    notes: "Reduced to 12px when scrolled",
  },
  {
    item: "Hero shell",
    selector: ".section-hero",
    value: "padding: clamp(24px, 3.2vw, 38px)",
    notes: "Main hero container",
  },
  {
    item: "Button internal spacing",
    selector: ".btn-primary, .btn-ghost",
    value: "padding: 0.86rem 1.36rem",
    notes: "Global CTA sizing",
  },
  {
    item: "Card spacing",
    selector: ".card",
    value: "padding: 1.8rem",
    notes: "Services/industry cards",
  },
  {
    item: "Detail card spacing",
    selector: ".industry-detail-card",
    value: "padding: clamp(1rem, 2vw, 1.35rem); gap: 0.82rem",
    notes: "Industry deep-dive cards",
  },
];

const radiusSpecs: SpecRow[] = [
  {
    item: "Pill",
    selector: "Buttons, badges",
    value: "999px",
    notes: "High-emphasis rounded elements",
  },
  {
    item: "Small",
    selector: ".testimonial-shot-shell",
    value: "8px",
    notes: "Image shell",
  },
  {
    item: "Small+",
    selector: "Focus/mini surfaces",
    value: "10px, 12px, 14px",
    notes: "Focus outlines and compact panels",
  },
  {
    item: "Medium",
    selector: "Team photo / base cards",
    value: "18px, 20px, 22px",
    notes: "Default system corners",
  },
  {
    item: "Large",
    selector: "Glass panels / feature cards",
    value: "24px",
    notes: "Core hero and card glass style",
  },
  {
    item: "XL",
    selector: "Hero / CTA shells",
    value: "30px, 32px",
    notes: "Key sectional containers",
  },
];

const componentSpecs: SpecRow[] = [
  {
    item: "Primary button",
    selector: ".btn-primary",
    value: "Linear gradient + inset highlight + ambient glow",
    notes: "Hover lift: translateY(-2px)",
  },
  {
    item: "Ghost button",
    selector: ".btn-ghost",
    value: "Subtle dark fill + bright border",
    notes: "Hover increases contrast",
  },
  {
    item: "Glass card layer",
    selector: ".hero-content, .hero-panel, .card.*",
    value: "blur(12px) saturate(180%), border 1px rgba(244,246,251,0.12)",
    notes: "Shared premium glass treatment",
  },
  {
    item: "Detail industry cards",
    selector: ".industry-detail-card",
    value: "blur(10px) saturate(140%), dual gradient background",
    notes: "Hover border accent with indigo",
  },
  {
    item: "CTA shell",
    selector: ".cta-shell",
    value: "padding clamp(3rem,5vw,5rem); radius 32px",
    notes: "Primary conversion block",
  },
];

const motionSpecs: SpecRow[] = [
  {
    item: "Standard hover transitions",
    selector: "cards/buttons/links",
    value: "0.2s ease",
    notes: "Lift and border/opacity polish",
  },
  {
    item: "Header transition",
    selector: ".site-header",
    value: "0.4s ease (padding/backdrop/background)",
    notes: "Scroll state change",
  },
  {
    item: "Section entrance",
    selector: "@keyframes section-rise",
    value: "600ms to 760ms",
    notes: "Subtle upward reveal",
  },
  {
    item: "Ambient background",
    selector: "nebula/star/comet layers",
    value: "5.8s to 240s loops",
    notes: "Atmosphere and depth",
  },
];

function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Selector</th>
            <th>Value</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.item}-${row.selector}`}>
              <td>{row.item}</td>
              <td>
                <code>{row.selector}</code>
              </td>
              <td>{row.value}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Brand Guidelines",
  description:
    "Orbit Sling brand guidelines with exact design tokens, typography, spacing, radius scale, and component specs used in the staging site.",
};

export default function BrandGuidelinesPage() {
  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Orbit Sling Brand System</p>
          <h1>Brand Guidelines</h1>
          <p>
            This page documents the live design system used on staging. Print this page (`Ctrl/Cmd + P`) for a
            PDF-style handoff.
          </p>
        </header>

        <section className={styles.section}>
          <h2>Color System</h2>
          <p className={styles.sectionIntro}>Core tokens used across backgrounds, text, accents, and glass surfaces.</p>
          <div className={styles.colorGrid}>
            {colorTokens.map((token) => (
              <article key={token.token} className={styles.colorCard}>
                <div
                  className={styles.swatch}
                  style={{
                    background: token.swatch,
                    borderColor: token.border ?? "rgba(255,255,255,0.12)",
                  }}
                  aria-hidden="true"
                />
                <p className={styles.tokenName}>{token.token}</p>
                <p className={styles.tokenValue}>{token.value}</p>
                <p className={styles.tokenUsage}>{token.usage}</p>
              </article>
            ))}
          </div>
          <div className={styles.gradientRow}>
            <article className={styles.gradientCard}>
              <p className={styles.gradientTitle}>Primary CTA Gradient</p>
              <div className={styles.gradientSwatchCta} />
              <p>linear-gradient(140deg, rgba(49,56,108,0.92), rgba(75,46,121,0.9) 52%, rgba(131,36,79,0.92))</p>
            </article>
            <article className={styles.gradientCard}>
              <p className={styles.gradientTitle}>Page Shell Atmosphere</p>
              <div className={styles.gradientSwatchPage} />
              <p>Layered radial gradients with indigo/crimson glows on top of --brand-black.</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Typography</h2>
          <p className={styles.sectionIntro}>Font families and numeric type specs in production.</p>

          <div className={styles.typeShowcase}>
            <article className={styles.typeCard}>
              <h3>Inter (Body/UI)</h3>
              <p className={styles.specimenRegular}>Regular 400: The quick brown fox jumps over the lazy dog.</p>
              <p className={styles.specimenSemibold}>Semibold 600: The quick brown fox jumps over the lazy dog.</p>
              <p className={styles.specimenBold}>Bold 700: The quick brown fox jumps over the lazy dog.</p>
              <p className={styles.specimenItalic}>Italic 400: The quick brown fox jumps over the lazy dog.</p>
            </article>
            <article className={styles.typeCard}>
              <h3>Inter Tight (Display)</h3>
              <p className={styles.specimenDisplay}>Display specimen: Build growth systems with less operational drag.</p>
            </article>
          </div>

          <SpecTable rows={typographySpecs} />
        </section>

        <section className={styles.section}>
          <h2>Spacing & Layout</h2>
          <p className={styles.sectionIntro}>Core spacing rules that determine page rhythm and component density.</p>
          <SpecTable rows={spacingSpecs} />
        </section>

        <section className={styles.section}>
          <h2>Corner Radius Scale</h2>
          <p className={styles.sectionIntro}>Rounded corner values currently in use.</p>
          <SpecTable rows={radiusSpecs} />
          <div className={styles.radiusSamples}>
            {[8, 10, 12, 14, 18, 20, 22, 24, 30, 32, 999].map((radius) => (
              <div key={radius} className={styles.radiusSample} style={{ borderRadius: radius }}>
                {radius === 999 ? "999px" : `${radius}px`}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Component Specs</h2>
          <p className={styles.sectionIntro}>Reference specs for recurring brand components.</p>
          <SpecTable rows={componentSpecs} />
        </section>

        <section className={styles.section}>
          <h2>Motion & Effects</h2>
          <p className={styles.sectionIntro}>Animation and transition timings used in the live system.</p>
          <SpecTable rows={motionSpecs} />
        </section>

        <section className={`${styles.section} ${styles.notesSection}`}>
          <h2>Implementation Notes</h2>
          <ul>
            <li>Use `Inter Tight` for major display headings and `Inter` for body/UI text.</li>
            <li>Prefer pill buttons (`999px`) and 20-24px radii for cards/panels.</li>
            <li>Use glass surfaces with subtle blur/saturation instead of flat fills for premium depth.</li>
            <li>Keep hover motion subtle (`translateY(-2px)` with `0.2s ease`).</li>
            <li>For print/PDF exports, keep this route as the source of truth: `/brand-guidelines/`.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
