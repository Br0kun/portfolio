"use client";

import { CONTENT } from "@/data/portfolio";
import { SVGIcon } from "./SVGIcon";

const CI = ["shield", "cpu", "cube", "bulb", "globe"];

export function CertificationsSection() {
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`);
  };

  return (
    <section className="s" id="certifications">
      <div className="wrap">
        <div className="sh">
          <span className="ic">
            <SVGIcon name="award" />
          </span>
          <h2>Certifications</h2>
          <span className="mono">~/certifications/</span>
        </div>
        <p className="lede">
          Credentials issued by IBM. Each one can be verified on Credly.
        </p>

        <div className="certs" id="g-cert">
          {CONTENT.certifications.map((c, i) => (
            <div key={c.id} className="tr" id={`c-${i}`}>
              <article className="cert" onPointerMove={handlePointerMove}>
                <span className="ic">
                  <SVGIcon name={CI[i] || "award"} />
                </span>
                <div>
                  <span className="mono">
                    SN-C0{i + 1} / IBM
                  </span>
                  <h3>{c.name}</h3>
                  <a
                    className="vf"
                    href={`https://www.credly.com/badges/${c.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Verify on Credly</span>
                    <SVGIcon name="arrow" />
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
