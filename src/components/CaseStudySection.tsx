"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { CaseStudy } from "@/lib/case-studies";

type CaseStudySectionProps = {
  eyebrow: string;
  title: string;
  studies: CaseStudy[];
};

export default function CaseStudySection({ eyebrow, title, studies }: CaseStudySectionProps) {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (!selectedStudy) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedStudy(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedStudy]);

  function closeModal() {
    setSelectedStudy(null);
  }

  return (
    <section className="section" id="case-study">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>

      <div className="case-study-grid">
        {studies.map((study) => (
          <article key={study.id} className="panel case-study-card">
            <button
              type="button"
              className="case-study-card-trigger"
              onClick={() => setSelectedStudy(study)}
              aria-haspopup="dialog"
            >
              <p className="text-sm muted mb-2">{study.company}</p>
              <h3 className="case-result">{study.cardTitle}</h3>
              <p className="muted">{study.cardDetail}</p>
              <p className="case-study-link">{study.ctaLabel}</p>
            </button>
          </article>
        ))}
      </div>

      {selectedStudy
        ? createPortal(
            <div
              className="case-study-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${selectedStudy.id}-title`}
              aria-describedby={`${selectedStudy.id}-summary`}
            >
              <button
                type="button"
                className="case-study-modal-backdrop"
                onClick={closeModal}
                aria-label="Close case study"
              />

              <article className="case-study-modal-shell">
                <button type="button" className="case-study-modal-close" onClick={closeModal} autoFocus>
                  Close
                </button>

                <div className="case-study-modal-body">
                  <section className="case-study-modal-hero">
                    <div className="case-study-modal-hero-grid">
                      <div className="case-study-modal-copy">
                        <span className="eyebrow">{selectedStudy.eyebrow}</span>
                        <p className="case-study-modal-company">{selectedStudy.company}</p>
                        <h3 id={`${selectedStudy.id}-title`} className="case-study-modal-title">
                          {selectedStudy.headline}
                        </h3>
                        <p id={`${selectedStudy.id}-summary`} className="case-study-modal-summary">
                          {selectedStudy.summary}
                        </p>
                        <div className="case-study-modal-chip-row" aria-label="Case study highlights">
                          {selectedStudy.chips.map((chip) => (
                            <span key={chip} className="case-study-modal-chip">
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>

                      <aside className="case-study-modal-overview">
                        <p className="hero-panel-label">Engagement snapshot</p>
                        <div className="case-study-modal-overview-grid">
                          {selectedStudy.overview.map((item) => (
                            <article key={`${item.value}-${item.label}`} className="case-study-modal-overview-card">
                              <p className="metric">{item.value}</p>
                              <p className="muted">{item.label}</p>
                            </article>
                          ))}
                        </div>
                      </aside>
                    </div>
                  </section>

                  <section className="case-study-modal-section">
                    <div className="case-study-modal-section-heading">
                      <p className="case-study-modal-section-label">Background</p>
                      <h4>{selectedStudy.background.title}</h4>
                    </div>
                    <div className="case-study-modal-prose">
                      {selectedStudy.background.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="muted">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>

                  <section className="case-study-modal-section">
                    <div className="case-study-modal-section-heading">
                      <p className="case-study-modal-section-label">What we implemented</p>
                      <h4>{selectedStudy.implementation.title}</h4>
                    </div>
                    <div className="case-study-modal-prose">
                      <p className="muted">{selectedStudy.implementation.intro}</p>
                    </div>
                    <div className="case-study-phase-grid">
                      {selectedStudy.implementation.phases.map((phase) => (
                        <article key={phase.name} className="case-study-phase-card">
                          <p className="case-study-phase-name">{phase.name}</p>
                          <p className="muted">{phase.description}</p>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="case-study-modal-section">
                    <div className="case-study-modal-section-heading">
                      <p className="case-study-modal-section-label">Results</p>
                      <h4>{selectedStudy.results.title}</h4>
                    </div>
                    <p className="case-study-modal-timeframe">{selectedStudy.results.timeframe}</p>
                    <div className="case-study-modal-metrics-grid">
                      {selectedStudy.results.metrics.map((metric) => (
                        <article key={`${metric.value}-${metric.label}`} className="case-study-modal-metric-card">
                          <p className="case-study-modal-metric-value">{metric.value}</p>
                          <p className="case-study-modal-metric-label">{metric.label}</p>
                          {metric.detail ? <p className="case-study-modal-metric-detail">{metric.detail}</p> : null}
                        </article>
                      ))}
                    </div>

                    <div className="case-study-pipeline-panel">
                      <div className="case-study-pipeline-header">
                        <p className="hero-panel-label">{selectedStudy.results.chart.title}</p>
                        <p className="muted">{selectedStudy.results.chart.subtitle}</p>
                      </div>

                      <div className="case-study-pipeline-list">
                        {selectedStudy.results.chart.stages.map((stage) => {
                          const maxCount = Math.max(...selectedStudy.results.chart.stages.map((item) => item.count), 1);
                          const fillPercent = Math.max((stage.count / maxCount) * 100, 6);
                          const stageStyle = {
                            "--case-study-fill": `${fillPercent}%`,
                          } as CSSProperties;

                          return (
                            <article key={stage.label} className="case-study-pipeline-stage">
                              <div className="case-study-pipeline-stage-head">
                                <p className="case-study-pipeline-stage-label">{stage.label}</p>
                                <p className="case-study-pipeline-stage-count">{stage.count}</p>
                              </div>
                              <div className="case-study-pipeline-track" style={stageStyle}>
                                <div className="case-study-pipeline-fill" />
                              </div>
                              <p className="case-study-pipeline-note">{stage.note}</p>
                            </article>
                          );
                        })}
                      </div>
                    </div>

                    <p className="case-study-modal-results-summary">{selectedStudy.results.summary}</p>
                    <p className="case-study-modal-results-footnote">{selectedStudy.results.footnote}</p>
                  </section>
                </div>
              </article>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
