import type { CSSProperties } from "react";
import { TOOL_LOGOS, type ToolLogo } from "@/lib/tool-logos";

type ToolLogoStyle = CSSProperties & {
  "--tool-logo-src": string;
  "--tool-logo-width": number;
  "--tool-logo-height": number;
};

function ToolLogoList({
  logos,
  keyPrefix,
  ariaHidden = false,
}: {
  logos: ToolLogo[];
  keyPrefix: string;
  ariaHidden?: boolean;
}) {
  return (
    <ul className="tool-logo-marquee__list" aria-hidden={ariaHidden ? "true" : undefined}>
      {logos.map((logo) => {
        const style = {
          "--tool-logo-src": `url("${logo.src}")`,
          "--tool-logo-width": logo.width,
          "--tool-logo-height": logo.height,
        } as ToolLogoStyle;

        return (
          <li key={`${keyPrefix}-${logo.id}`} className="tool-logo-marquee__item">
            <span className="tool-logo-marquee__sr-only">{logo.label}</span>
            <span aria-hidden="true" className="tool-logo-marquee__mark" style={style} />
            {logo.showFallbackText !== false ? (
              <span aria-hidden="true" className="tool-logo-marquee__fallback">
                {logo.label}
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export default function ToolLogoMarquee() {
  const row = TOOL_LOGOS;

  return (
    <section className="tool-logo-marquee" aria-label="Tools we use">
      <div className="tool-logo-marquee__viewport">
        <div className="tool-logo-marquee__row">
          <div className="tool-logo-marquee__track">
            <ToolLogoList logos={row} keyPrefix="row-a" />
            <ToolLogoList logos={row} keyPrefix="row-b" ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
