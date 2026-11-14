"use client";

import { useState } from "react";
import { CONTENT, ProjectType } from "@/data/portfolio";
import { SVGIcon } from "./SVGIcon";

const PI: Record<string, string> = {
  "SN-P01": "cross",
  "SN-P02": "key",
  "SN-P03": "search",
  "SN-P04": "target",
};

export function WorkSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rd = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const c = e.currentTarget;
    const b = c.getBoundingClientRect();
    c.style.setProperty("--mx", `${e.clientX - b.left}px`);
    c.style.setProperty("--my", `${e.clientY - b.top}px`);

    if (!rd) {
      const a = (e.clientX - b.left) / b.width - 0.5;
      const d = (e.clientY - b.top) / b.height - 0.5;
      c.style.transform = `perspective(800px) rotateX(${-d * 6}deg) rotateY(${a * 8}deg) translateY(-3px)`;
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section className="s" id="work">
      <div className="wrap">
        <div className="sh">
          <span className="ic">
            <SVGIcon name="folder" />
          </span>
          <h2>Work</h2>
          <span className="mono">~/work/</span>
        </div>
        <p className="lede">
          Selected projects and investigations. Click any item to inspect details inline.
        </p>

        <div id="g-work">
          {CONTENT.projects.map((p) => {
            const meta = [p.category, p.year, p.status].filter(Boolean).join(" · ");
            const iconName = PI[p.id] || "folder";
            const isExpanded = expandedId === p.id;
            const d = p.detail;

            return (
              <div key={p.id} className="tr" id={`w-${p.id}`}>
                <button
                  type="button"
                  className={`spec ${isExpanded ? "active-spec" : ""}`}
                  aria-expanded={isExpanded}
                  aria-label={`Toggle details: ${p.title}`}
                  onClick={() => toggleProject(p.id)}
                  onPointerMove={handlePointerMove}
                  onPointerLeave={handlePointerLeave}
                >
                  <div className="pv" aria-hidden="true">
                    <span className="mono id">{p.id}</span>
                    <span className="go expand-indicator">
                      <SVGIcon name="arrow" />
                    </span>
                    <span className="big">
                      <SVGIcon name={iconName} />
                    </span>
                  </div>

                  <div className="sb">
                    <div className="top">
                      <span className="mono">{meta}</span>
                      <span className="badge">{p.badge}</span>
                    </div>

                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>

                    <div className="tags">
                      {p.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>

                {/* Inline Tree Expansion — keeps user directly in place with no side overlay */}
                {isExpanded && (
                  <div className="spec-tree-detail">
                    <div className="d-header">
                      <span className="mono">~/work/{p.id.toLowerCase()}.md</span>
                      <button
                        type="button"
                        className="btn"
                        style={{ padding: "4px 10px", fontSize: ".78rem" }}
                        onClick={() => toggleProject(p.id)}
                      >
                        <SVGIcon name="x" />
                        <span>Collapse</span>
                      </button>
                    </div>

                    <h4>
                      <SVGIcon name="search" />
                      <span>Overview</span>
                    </h4>
                    {d.overview ? <p>{d.overview}</p> : <p className="pending">To be added.</p>}

                    <h4>
                      <SVGIcon name="folder" />
                      <span>Context</span>
                    </h4>
                    {d.context ? <p>{d.context}</p> : <p className="pending">To be added.</p>}

                    <h4>
                      <SVGIcon name="cpu" />
                      <span>Technical approach</span>
                    </h4>
                    {d.approach ? <p>{d.approach}</p> : <p className="pending">To be added.</p>}

                    <h4>
                      <SVGIcon name="shield" />
                      <span>Implementation notes</span>
                    </h4>
                    {d.implementation ? <p>{d.implementation}</p> : <p className="pending">To be added.</p>}

                    <h4>
                      <SVGIcon name="branch" />
                      <span>Repository</span>
                    </h4>
                    <p>
                      <a
                        className="btn"
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginTop: "6px" }}
                      >
                        <SVGIcon name="arrow" />
                        <span>View on GitHub</span>
                      </a>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
