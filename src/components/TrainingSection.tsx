"use client";

import { CONTENT } from "@/data/portfolio";
import { SVGIcon } from "./SVGIcon";

const TI: Record<string, string> = {
  "SN-T01": "flask",
  "SN-T02": "bug",
};

export function TrainingSection() {
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`);
  };

  return (
    <section className="s" id="training">
      <div className="wrap">
        <div className="sh">
          <span className="ic">
            <SVGIcon name="flask" />
          </span>
          <h2>Training</h2>
          <span className="mono">~/training/</span>
        </div>
        <p className="lede">
          Practical learning, kept separate from independent projects.
        </p>

        <div id="g-train">
          {CONTENT.training.map((t) => {
            const iconName = TI[t.id] || "flask";

            return (
              <div key={t.id} className="tr" id={`w-${t.id}`}>
                <article
                  className="spec static"
                  onPointerMove={handlePointerMove}
                >
                  <div className="pv" aria-hidden="true">
                    <span className="mono id">{t.id}</span>
                    <span className="big">
                      <SVGIcon name={iconName} />
                    </span>
                  </div>
                  <div className="sb">
                    <div className="top">
                      <span className="mono">{t.category}</span>
                      <span className="badge">{t.badge}</span>
                    </div>
                    <h3>{t.title}</h3>
                    <p>{t.desc}</p>
                    {t.note && <span className="mono nt">{t.note}</span>}
                    <div className="tags">
                      {t.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
