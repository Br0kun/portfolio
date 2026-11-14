import React from "react";

export const ICON_PATHS: Record<string, string> = {
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  branch: "M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM18 9c0 6-12 3-12 6",
  link: "M10 14a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 10a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1",
  brief: "M3 8h18v12H3zM9 8V5h6v3",
  cap: "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5",
  award: "M12 14a6 6 0 100-12 6 6 0 000 12zM8.5 13L7 22l5-3 5 3-1.5-9",
  cpu: "M6 6h12v12H6zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-5-5",
  cross: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
  key: "M14 10a4 4 0 100-.01M10.5 13.5L3 21M6 18l2 2",
  target: "M12 3a9 9 0 110 18 9 9 0 010-18zM12 8a4 4 0 110 8 4 4 0 010-8z",
  pin: "M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  globe: "M12 3a9 9 0 110 18 9 9 0 010-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  tool: "M14 6a4 4 0 005 5l-9 9a2 2 0 01-3-3l9-9a4 4 0 00-2-2z",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  arrow: "M7 17L17 7M8 7h9v9",
  flask: "M9 3h6M10 3v6L4 20h16l-6-11V3",
  bug: "M9 9h6v8a3 3 0 01-6 0zM9 6a3 3 0 016 0M5 10h4M15 10h4M5 16h4M15 16h4",
  cube: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5",
  bot: "M5 8h14v10H5zM12 4v4M9 13h.01M15 13h.01",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 00-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 00-4-10z",
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  folder: "M3 6h6l2 2h10v11H3z",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6",
  send: "M21 3L3 11l7 3 3 7zM10 14l11-11",
  wave: "M2 12h4l3-8 4 16 3-8h6",
  x: "M6 6l12 12M18 6L6 18",
};

export function SVGIcon({
  name,
  className = "i",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const path = ICON_PATHS[name] || ICON_PATHS.folder;
  return (
    <svg
      className={`i ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={style}
    >
      <path d={path} />
    </svg>
  );
}
