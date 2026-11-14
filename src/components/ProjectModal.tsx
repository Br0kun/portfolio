"use client";

import { useEffect, useRef } from "react";
import { ProjectType } from "@/data/portfolio";
import { SVGIcon } from "./SVGIcon";

const SLUG: Record<string, string> = {
  "SN-P01": "pfe-medical-platform",
  "SN-P02": "pfa-password-manager",
  "SN-P03": "world-app-security",
  "SN-P04": "local-hacking-agent",
};

interface ProjectModalProps {
  project: ProjectType | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    if (project) {
      if (!dlg.open) {
        dlg.showModal();
      }
    } else {
      if (dlg.open) {
        dlg.close();
      }
    }
  }, [project]);

  if (!project) return null;

  const d = project.detail;
  const slug = SLUG[project.id] || project.id.toLowerCase();

  return (
    <dialog
      ref={dialogRef}
      id="dlg"
      aria-labelledby="dt"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      onClose={onClose}
    >
      <div className="dh">
        <span className="mono">~/work/{slug}.md</span>
        <button type="button" id="cl" onClick={onClose}>
          <SVGIcon name="x" />
          <span>Close</span>
        </button>
      </div>
      <div className="db">
        <span className="badge">{project.badge}</span>
        <h2 id="dt">{project.title}</h2>

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
          <SVGIcon name="layers" />
          <span>Technologies</span>
        </h4>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

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
          <SVGIcon name="cube" />
          <span>Screenshots and diagrams</span>
        </h4>
        <div className="shot">
          <span className="mono">Add images in the project data</span>
        </div>

        <h4>
          <SVGIcon name="branch" />
          <span>Repository</span>
        </h4>
        <p>
          <a
            className="btn"
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SVGIcon name="arrow" />
            <span>View on GitHub</span>
          </a>
        </p>
      </div>
    </dialog>
  );
}
