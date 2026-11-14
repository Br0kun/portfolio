"use client";

import { useState } from "react";
import { CONTENT } from "@/data/portfolio";
import { SVGIcon } from "./SVGIcon";

const SLUG: Record<string, string> = {
  "SN-P01": "pfe-medical-platform",
  "SN-P02": "pfa-password-manager",
  "SN-P03": "world-app-security",
  "SN-P04": "local-hacking-agent",
  "SN-T01": "pentesterlab",
  "SN-T02": "htb-cpts",
  "SN-E01": "qa-tester",
  "SN-E02": "odoo-intern",
};

const sg = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

interface SidebarProps {
  activeSection: string;
}

export function Sidebar({ activeSection }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const C = CONTENT;
  const L = CONTENT.links;

  const NAV = [
    ["home", "Home", "home"],
    ["work", "Work", "folder"],
    ["experience", "Experience", "brief"],
    ["training", "Training", "flask"],
    ["certifications", "Certifications", "award"],
    ["about", "About", "user"],
    ["contact", "Contact", "send"],
  ] as const;

  const KIDS: Record<string, Array<[string, string]>> = {
    work: C.projects.map((p) => [SLUG[p.id] + ".md", "#w-" + p.id]),
    experience: C.experience.map((x) => [SLUG[x.id] + ".log", "#w-" + x.id]),
    training: C.training.map((t) => [SLUG[t.id] + "/", "#w-" + t.id]),
    certifications: C.certifications.map((c, i) => [sg(c.name) + ".cert", "#c-" + i]),
    contact: [
      ["email.link", "mailto:" + L.email],
      ["github.link", L.github],
      ["linkedin.link", L.linkedin],
    ],
  };

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <aside className="side">
      <div className="bar">
        <a
          className="logo"
          href="#home"
          id="logo"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#home");
          }}
        >
          <SVGIcon name="wave" />
          <span>
            SIGNAL<b> / </b>NOISE
          </span>
        </a>
        <button
          className="burger"
          aria-expanded={mobileOpen}
          aria-controls="menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          Menu
        </button>
      </div>

      <nav aria-label="Primary" className={mobileOpen ? "open" : ""}>
        <ul id="menu" className="st">
          <li className="mono rt">ilyas-dahbi/</li>
          {NAV.map(([i, n, c], a) => {
            const k = KIDS[i] || [];
            const last = a === NAV.length - 1;
            const on = activeSection === i;

            return (
              <li key={i} className={`dir ${on ? "open" : ""}`}>
                <a
                  href={`#${i}`}
                  data-n={i}
                  className={on ? "on" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(`#${i}`);
                  }}
                >
                  <span className="br">{last ? "└── " : "├── "}</span>
                  <SVGIcon name={c} />
                  <span className="nm">{n}/</span>
                  {k.length > 0 && <small>[{k.length}]</small>}
                </a>

                {k.length > 0 && (
                  <ul>
                    {k.map(([label, href], b) => (
                      <li key={label}>
                        <a
                          href={href}
                          title={label}
                          onClick={(e) => {
                            if (href.startsWith("#")) {
                              e.preventDefault();
                              handleLinkClick(href);
                            }
                          }}
                        >
                          <span className="br">
                            {last ? "    " : "│   "}
                            {b === k.length - 1 ? "└── " : "├── "}
                          </span>
                          <span className="nm">{label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sf" id="sf">
        <a
          href={L.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <SVGIcon name="branch" />
        </a>
        <a
          href={L.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <SVGIcon name="link" />
        </a>
        <a href={`mailto:${L.email}`} aria-label="Email">
          <SVGIcon name="mail" />
        </a>
      </div>
    </aside>
  );
}
