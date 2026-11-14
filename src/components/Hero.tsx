"use client";

import { useEffect, useState } from "react";
import { CONTENT } from "@/data/portfolio";
import { SVGIcon } from "./SVGIcon";

export function Hero() {
  const [nameText, setNameText] = useState(CONTENT.profile.name);

  useEffect(() => {
    const rd = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (rd) return;

    const f = CONTENT.profile.name;
    const g = "ABCDEF0123456789#/<>_";
    const s = performance.now();

    let raf = 0;
    function r(n: number) {
      const p = Math.min(1, (n - s) / 1400);
      if (p >= 1) {
        setNameText(f);
        return;
      }
      setNameText(
        [...f]
          .map((c, i) =>
            c === " " || i < p * f.length * 1.15 - 1
              ? c
              : g[(Math.random() * g.length) | 0]
          )
          .join("")
      );
      raf = requestAnimationFrame(r);
    }

    raf = requestAnimationFrame(r);
    return () => cancelAnimationFrame(raf);
  }, []);

  const P = CONTENT.profile;
  const C = CONTENT;

  return (
    <section id="home" aria-label="Home">
      <div id="fallback" aria-hidden="true" />
      <div className="wrap hero-in">
        <div className="mono" id="h-id">
          SN-000 / SCAN THE FIELD TO RESOLVE THE SIGNAL
        </div>
        <h1 id="h-name">{nameText}</h1>
        <p className="role serif" id="h-role">
          {P.role}
        </p>
        <p className="intro" id="h-intro">
          {P.intro}
        </p>
        <div className="cta" id="h-cta">
          <a className="btn p" href="#work">
            <SVGIcon name="folder" />
            <span>Explore Work</span>
          </a>
          <a className="btn" href="#about">
            <SVGIcon name="user" />
            <span>About Me</span>
          </a>
          <a
            className="btn"
            href={C.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SVGIcon name="branch" />
            <span>GitHub</span>
          </a>
        </div>
        <div className="facts" id="h-facts">
          <div className="tf">
            <i>ilyas-dahbi/</i>
            {"\n"}├── <b>focus</b>      Web &amp; application security
            {"\n"}├── <b>role</b>       Junior developer
            {"\n"}├── <b>location</b>   Casablanca, Morocco
            {"\n"}└── <b>archive</b>    {C.projects.length} projects ·{" "}
            {C.training.length} training · {C.certifications.length} credentials
          </div>
        </div>
      </div>
    </section>
  );
}
