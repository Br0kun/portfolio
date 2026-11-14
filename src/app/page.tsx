"use client";

import { useState, useEffect } from "react";
import { Terrain } from "@/components/Terrain";
import { CrosshairReticle } from "@/components/CrosshairReticle";
import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/WorkSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { TrainingSection } from "@/components/TrainingSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const navSections = [
      "home",
      "work",
      "experience",
      "training",
      "certifications",
      "about",
      "contact",
    ];

    const elements = navSections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    // Smooth anchor navigation
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      const href = target?.getAttribute("href");
      if (!href || href.length < 2) return;

      const dest = document.getElementById(href.slice(1));
      if (!dest) return;

      e.preventDefault();
      const rm = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      dest.scrollIntoView({
        behavior: rm ? "auto" : "smooth",
        block: dest.matches("section") ? "start" : "center",
      });

      dest.classList.remove("flash");
      void dest.offsetWidth;
      dest.classList.add("flash");
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  return (
    <>
      <Sidebar activeSection={activeSection} />
      <CrosshairReticle />
      <Terrain />

      <main>
        <Hero />
        <WorkSection />
        <ExperienceSection />
        <TrainingSection />
        <CertificationsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
