"use client";

import { useEffect, useRef } from "react";

export function CrosshairReticle() {
  const retRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rd = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const isTouch = window.matchMedia("(pointer:coarse)").matches;
    if (rd || isTouch) return;

    const rt = retRef.current;
    const tx = spanRef.current;
    if (!rt || !tx) return;

    let x = 0;
    let y = 0;
    let px = 0;
    let py = 0;
    let raf = 0;

    const onPointerMove = (ev: PointerEvent) => {
      px = ev.clientX;
      py = ev.clientY;
      rt.style.opacity = "1";
      tx.textContent = `x ${(px / window.innerWidth).toFixed(3)}  y ${(
        py / window.innerHeight
      ).toFixed(3)}`;
    };

    window.addEventListener("pointermove", onPointerMove);

    function loop() {
      x += (px - x) * 0.18;
      y += (py - y) * 0.18;
      if (rt) {
        rt.style.transform = `translate(${x}px,${y}px)`;
      }
      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={retRef} className="ret" aria-hidden="true">
      <span ref={spanRef} className="mono" />
    </div>
  );
}
