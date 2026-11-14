"use client";

import { CONTENT } from "@/data/portfolio";
import { SVGIcon } from "./SVGIcon";

const EI = ["bug", "layers"];

export function ExperienceSection() {
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`);
  };

  return (
    <section className="s" id="experience">
      <div className="wrap">
        <div className="sh">
          <span className="ic">
            <SVGIcon name="brief" />
          </span>
          <h2>Experience</h2>
          <span className="mono">~/experience/</span>
        </div>
        <p className="lede">Part-time and internship work.</p>

        <div id="g-exp">
          <div className="trees">
            {CONTENT.experience.map((x, i) => (
              <div key={x.id} className="tr" id={`w-${x.id}`}>
                <article className="tn" onPointerMove={handlePointerMove}>
                  <div className="top">
                    <span className="mono">{x.id}</span>
                    <span className="badge">{x.period}</span>
                  </div>
                  <h3>
                    <SVGIcon name={EI[i] || "brief"} />
                    <span>{x.title}</span>
                  </h3>
                  <span className="mono">
                    {x.org}
                    {x.note ? ` · ${x.note}` : ""}
                  </span>
                  <ul>
                    {x.points.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
