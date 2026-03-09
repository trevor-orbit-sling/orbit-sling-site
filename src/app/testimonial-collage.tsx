"use client";

import { useEffect, useState } from "react";

type TestimonialShot = {
  id: string;
  src: string;
  alt: string;
};

export default function TestimonialCollage({ shots }: { shots: TestimonialShot[] }) {
  const [selectedShot, setSelectedShot] = useState<TestimonialShot | null>(null);

  useEffect(() => {
    if (!selectedShot) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedShot(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedShot]);

  function openShot(shot: TestimonialShot) {
    setSelectedShot(shot);
  }

  function closeShot() {
    setSelectedShot(null);
  }

  return (
    <>
      <div className="testimonial-strew">
        {shots.map((shot) => (
          <figure key={shot.id} className="testimonial-shot">
            <button
              type="button"
              className="testimonial-shot-trigger"
              onClick={() => openShot(shot)}
              aria-label={`Open ${shot.alt}`}
            >
              <div className="testimonial-shot-shell">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="testimonial-shot-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </button>
          </figure>
        ))}
      </div>

      {selectedShot ? (
        <div className="testimonial-modal" role="dialog" aria-modal="true" aria-label="Testimonial preview">
          <button type="button" className="testimonial-modal-backdrop" onClick={closeShot} aria-label="Close modal" />
          <figure className="testimonial-modal-shell">
            <button type="button" className="testimonial-modal-close" onClick={closeShot}>
              Close
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedShot.src}
              alt={selectedShot.alt}
              className="testimonial-modal-image"
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
      ) : null}
    </>
  );
}
