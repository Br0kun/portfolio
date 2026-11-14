"use client";

import { useEffect, useState } from "react";

export function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 12;
        return Math.min(100, prev + step);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const fadeTimer = setTimeout(() => setIsFading(true), 250);
      const doneTimer = setTimeout(() => onComplete(), 600);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(doneTimer);
      };
    }
  }, [progress, onComplete]);

  // Generate ASCII progress bar blocks: [████████░░░░░░░░]
  const totalBars = 20;
  const filledBars = Math.round((progress / 100) * totalBars);
  const barString =
    "█".repeat(filledBars) + "░".repeat(Math.max(0, totalBars - filledBars));

  return (
    <div
      className={`minimal-loader ${isFading ? "fade-out" : ""}`}
      aria-label="Loading..."
    >
      <div className="loader-box mono">
        <div className="loader-title">
          <span className="bin-name">0x90.exe</span>
          <span className="pct">{progress}%</span>
        </div>

        <div className="bar-wrapper">
          <span className="bracket">[</span>
          <span className="fill-bar">{barString}</span>
          <span className="bracket">]</span>
        </div>

        <div className="loader-sub">
          <span>loading archive</span>
          <span className="dots-pulse">...</span>
        </div>
      </div>
    </div>
  );
}

