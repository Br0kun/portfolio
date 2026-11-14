"use client";

import { CONTENT } from "@/data/portfolio";
import { SVGIcon } from "./SVGIcon";

export function ContactSection() {
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`);
  };

  const L = CONTENT.links;

  const contacts = [
    {
      icon: "mail",
      label: "Email",
      href: `mailto:${L.email}`,
      value: L.email,
    },
    {
      icon: "branch",
      label: "GitHub",
      href: L.github,
      value: L.github.replace(/^https?:\/\//, ""),
    },
    {
      icon: "link",
      label: "LinkedIn",
      href: L.linkedin,
      value: "LinkedIn profile",
    },
  ];

  return (
    <>
      <section className="s" id="contact">
        <div className="wrap">
          <div className="sh">
            <span className="ic">
              <SVGIcon name="send" />
            </span>
            <h2>Contact</h2>
            <span className="mono">~/contact/</span>
          </div>
          <p className="lede">Reach me through any of these channels.</p>

          <div className="cc" id="g-contact">
            {contacts.map((c) => (
              <a
                key={c.label}
                className="ccard"
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                onPointerMove={handlePointerMove}
              >
                <span className="ic">
                  <SVGIcon name={c.icon} />
                </span>
                <span className="mono">{c.label}</span>
                <span className="cv">{c.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap mono">
          SIGNAL / NOISE — personal technical archive
        </div>
      </footer>
    </>
  );
}
