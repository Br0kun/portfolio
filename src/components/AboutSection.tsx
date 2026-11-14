"use client";

import { useState } from "react";
import { CONTENT } from "@/data/portfolio";
import { SVGIcon } from "./SVGIcon";

const TABS = [
  { file: "profile.md", icon: "user" },
  { file: "focus.md", icon: "search" },
  { file: "stack.md", icon: "layers" },
  { file: "security.md", icon: "shield" },
  { file: "education.md", icon: "cap" },
];

export function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);

  const P = CONTENT.profile;
  const C = CONTENT;
  const S = CONTENT.secProfile;

  const handleKeyDown = (e: React.KeyboardEvent, k: number) => {
    let next = k;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      next = (k + 1) % TABS.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      next = (k - 1 + TABS.length) % TABS.length;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(next);
  };

  return (
    <section className="s" id="about">
      <div className="wrap">
        <div className="sh">
          <span className="ic">
            <SVGIcon name="user" />
          </span>
          <h2>About</h2>
          <span className="mono">~/about/</span>
        </div>

        <div className="abt">
          <div className="at" role="tablist" aria-label="About sections">
            <span className="mono rt">about/</span>
            {TABS.map((tab, k) => {
              const isLast = k === TABS.length - 1;
              const isSelected = activeTab === k;

              return (
                <button
                  key={tab.file}
                  type="button"
                  role="tab"
                  id={`tab${k}`}
                  aria-selected={isSelected}
                  aria-controls="pan"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTab(k)}
                  onKeyDown={(e) => handleKeyDown(e, k)}
                >
                  <span className="br">{isLast ? "└── " : "├── "}</span>
                  <SVGIcon name={tab.icon} />
                  <span>{tab.file}</span>
                </button>
              );
            })}
          </div>

          <div
            className="ap"
            id="pan"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`tab${activeTab}`}
          >
            <h3 className="mono">
              <SVGIcon name={TABS[activeTab].icon} />
              <span>~/about/{TABS[activeTab].file}</span>
            </h3>

            <div className="pb">
              {activeTab === 0 && (
                <div>
                  <p className="pull serif">{P.aboutLead}</p>
                  <p>{P.aboutBody}</p>
                  <p className="note">{P.aboutNote}</p>
                </div>
              )}

              {activeTab === 1 && (
                <div>
                  <h4 className="mono">Interests</h4>
                  <ul className="li2">
                    {P.interests.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>

                  <h4 className="mono">Background</h4>
                  <ul className="li2">
                    {P.background.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <h4 className="mono">Languages</h4>
                  <ul className="li2">
                    {P.languages.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>

                  <h4 className="mono">Frameworks</h4>
                  <ul className="li2">
                    {P.frameworks.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>

                  <h4 className="mono">Tools</h4>
                  <ul className="li2">
                    {C.tools.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 3 && (
                <div>
                  <h4 className="mono">Methodology</h4>
                  <ol className="flow">
                    {S.method.map((m, i) => (
                      <li key={m}>
                        <span className="mono">0{i + 1}</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ol>

                  <h4 className="mono">Coverage</h4>
                  <div className="cov">
                    {S.coverage.map(([l, a]) => (
                      <div key={l} className="cr">
                        <span className="mono">{l}</span>
                        <span>{a.join(" · ")}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="mono">Applied in</h4>
                  <div className="cov">
                    {S.applied.map(([l, t]) => (
                      <div key={l} className="cr">
                        <span className="mono">{l}</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 4 && (
                <div>
                  <h4 className="mono">Education</h4>
                  <ul className="li2 one">
                    {C.education.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>

                  <h4 className="mono">Spoken</h4>
                  <ul className="li2 one">
                    {C.spoken.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
