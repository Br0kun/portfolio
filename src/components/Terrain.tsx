"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Terrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const small = window.innerWidth < 760;

    let ren: THREE.WebGLRenderer;
    try {
      ren = new THREE.WebGLRenderer({
        canvas: cv,
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      document.body.classList.add("nogl");
      return;
    }

    const COLS = small ? 48 : 110;
    const ROWS = small ? 44 : 100;
    const W = small ? 15 : 22;
    const D = small ? 18 : 26;
    const N = COLS * ROWS;

    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        pos[i * 3] = (c / (COLS - 1) - 0.5) * W;
        pos[i * 3 + 2] = (r / (ROWS - 1) - 0.5) * D;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: small ? 0.045 : 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const pts = new THREE.Points(geo, mat);

    const LN = 8;
    const lp = new Float32Array(LN * 6);
    const lgeo = new THREE.BufferGeometry();
    lgeo.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    const lmat = new THREE.LineBasicMaterial({
      color: 0xff4b2b,
      transparent: true,
      opacity: 0.55,
    });
    const lines = new THREE.LineSegments(lgeo, lmat);
    lines.visible = false;

    const scene = new THREE.Scene();
    scene.add(pts, lines);
    scene.fog = new THREE.Fog(0x07080a, 9, 24);

    const NP: [number, number, number][] = [
      [2.6, 1.5, 4],
      [-2.8, 1.3, 0],
      [2.4, 1.4, -4],
      [-2.2, 1.3, -8],
      [0, 1.5, -11],
    ];

    const nodes = NP.map((p, i) => {
      const n = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.75, 1)),
        new THREE.LineBasicMaterial({
          color: i % 2 ? 0x8a8d91 : 0xff4b2b,
          transparent: true,
          opacity: 0.8,
        })
      );
      n.position.set(...p);
      scene.add(n);
      return n;
    });

    scene.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          new THREE.CatmullRomCurve3(NP.map((p) => new THREE.Vector3(...p))).getPoints(120)
        ),
        new THREE.LineBasicMaterial({
          color: 0xff4b2b,
          transparent: true,
          opacity: 0.35,
        })
      )
    );

    const tp = new THREE.Plane(new THREE.Vector3(0, 0, 1), -3);
    const th = new THREE.Vector3();

    let WN = 0;
    let wTx: Float32Array;
    let wTy: Float32Array;
    let wNz: Float32Array;
    let wCur: Float32Array;
    let wPos: Float32Array;
    let wCol: Float32Array;
    let wGeo: THREE.BufferGeometry | null = null;
    let intro = reduce ? 1 : 0;
    let wOn = false;
    let wA = 0;
    let sx = 0;
    let sy = 0;

    const WW = small ? 3.2 : 7;
    const WZ = 3;
    const WY = small ? 2.1 : 2.3;

    function buildWord() {
      const c = document.createElement("canvas");
      const w = 600;
      const hh = 140;
      c.width = w;
      c.height = hh;
      const x = c.getContext("2d");
      if (!x) return;
      x.fillStyle = "#fff";
      x.font = '700 128px "IBM Plex Mono", monospace';
      x.textAlign = "center";
      x.textBaseline = "middle";
      x.fillText("SIGNAL", w / 2, hh / 2 + 6);

      const d = x.getImageData(0, 0, w, hh).data;
      const st = small ? 5 : 3;
      const a: number[] = [];
      for (let y = 0; y < hh; y += st) {
        for (let q = 0; q < w; q += st) {
          if (d[(y * w + q) * 4 + 3] > 128) a.push(q, y);
        }
      }

      WN = a.length / 2;
      wTx = new Float32Array(WN);
      wTy = new Float32Array(WN);
      wNz = new Float32Array(WN * 3);
      wCur = new Float32Array(WN);
      wPos = new Float32Array(WN * 3);
      wCol = new Float32Array(WN * 3);

      for (let i = 0; i < WN; i++) {
        wTx[i] = (a[i * 2] / w - 0.5) * WW;
        wTy[i] = ((0.5 - a[i * 2 + 1] / hh) * WW * hh) / w;
        for (let k = 0; k < 3; k++) {
          wNz[i * 3 + k] = Math.random() * 2 - 1;
        }
      }

      wGeo = new THREE.BufferGeometry();
      wGeo.setAttribute("position", new THREE.BufferAttribute(wPos, 3));
      wGeo.setAttribute("color", new THREE.BufferAttribute(wCol, 3));

      const wPts = new THREE.Points(
        wGeo,
        new THREE.PointsMaterial({
          size: small ? 0.04 : 0.045,
          vertexColors: true,
          transparent: true,
          depthWrite: false,
        })
      );
      wPts.position.set(0, WY, WZ);
      scene.add(wPts);
    }

    if (document.fonts && document.fonts.load) {
      document.fonts.load('700 128px "IBM Plex Mono"').then(buildWord, buildWord);
    } else {
      buildWord();
    }

    const cam = new THREE.PerspectiveCamera(48, 1, 0.1, 60);
    cam.position.set(0, 3.2, 7.2);
    cam.lookAt(0, 0, 0);

    const h = (x: number, z: number, t: number) =>
      Math.sin(x * 0.55 + t * 0.35) * 0.38 +
      Math.sin(z * 0.9 - t * 0.28 + x * 0.2) * 0.26 +
      Math.sin(x * 1.7 + z * 1.3 + t * 0.5) * 0.1;

    const m = { x: 0, z: 0, tx: 0, tz: 0, on: false, a: 0, hx: 0, hy: 0 };

    function size() {
      const w = window.innerWidth;
      const hh = window.innerHeight;
      ren.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
      ren.setSize(w, hh, false);
      cam.aspect = w / hh;
      cam.updateProjectionMatrix();
    }

    size();
    window.addEventListener("resize", size);

    const rc = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const v2 = new THREE.Vector2();
    const hit = new THREE.Vector3();

    function move(cx: number, cy: number) {
      if (!cv) return;
      const b = cv.getBoundingClientRect();
      v2.set(((cx - b.left) / b.width) * 2 - 1, -((cy - b.top) / b.height) * 2 + 1);
      rc.setFromCamera(v2, cam);
      wOn = true;
      if (rc.ray.intersectPlane(tp, th)) {
        m.hx = th.x;
        m.hy = th.y;
      }
      if (rc.ray.intersectPlane(plane, hit)) {
        m.tx = hit.x;
        m.tz = hit.z;
        if (!m.on) {
          m.x = m.tx;
          m.z = m.tz;
        }
        m.on = true;
      }
    }

    const onPointerMove = (e: PointerEvent) => move(e.clientX, e.clientY);
    window.addEventListener("pointermove", onPointerMove);

    const onMouseLeave = () => {
      m.on = false;
      wOn = false;
    };
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    const sig = [1, 0.294, 0.169];
    const dim = [0.42, 0.43, 0.45];

    let t = 0;
    let raf = 0;
    let vis = true;
    let last = 0;
    let sp = 0;

    const scrollP = () => {
      const mx = document.documentElement.scrollHeight - window.innerHeight;
      return mx > 0 ? Math.min(1, window.scrollY / mx) : 0;
    };

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (!vis || (small && now - last < 33)) return;
      last = now;

      t = reduce ? 0 : t + 0.016;
      sp += (scrollP() - sp) * (reduce ? 1 : 0.07);

      const cz = 10 - sp * 17;
      const cx = Math.sin(sp * 5) * 1.2;
      cam.position.set(cx, 3.2 - sp * 1.6, cz);
      cam.lookAt(cx * 0.4, 0.2, cz - 9);

      nodes.forEach((n, i) => {
        n.rotation.y = t * 0.4 + i;
        n.rotation.x = t * 0.25;
        n.scale.setScalar(1 + 0.12 * Math.sin(t * 2 + i));
      });

      if (wGeo) {
        intro = Math.min(1, intro + (reduce ? 1 : 0.006));
        wA += ((wOn ? 1 : 0) - wA) * 0.08;
        const f = reduce ? 1 : intro < 0.5 ? intro * 2 : 1 - (intro - 0.5) * 1.6;
        sx += ((m.hx || 0) - sx) * 0.15;
        sy += ((m.hy || 0) - sy) * 0.15;
        const oy = sy - WY;

        for (let i = 0; i < WN; i++) {
          const dx = wTx[i] - sx;
          const dy = wTy[i] - oy;
          const r = Math.sqrt(dx * dx + dy * dy);
          const tg = Math.max(f, Math.max(0, 1 - r / 1.5) * wA);
          wCur[i] += (tg - wCur[i]) * 0.1;
          const c = wCur[i];
          const k = (1 - c) * 0.9;

          wPos[i * 3] = wTx[i] + wNz[i * 3] * k + Math.sin(t * 0.9 + i) * 0.03 * (1 - c);
          wPos[i * 3 + 1] = wTy[i] + wNz[i * 3 + 1] * k * 0.7;
          wPos[i * 3 + 2] = wNz[i * 3 + 2] * k;

          const a = c < 0.5 ? c * 2 : (c - 0.5) * 2;
          wCol[i * 3] = c < 0.5 ? 0.42 + 0.58 * a : 1 - 0.07 * a;
          wCol[i * 3 + 1] = c < 0.5 ? 0.43 - 0.136 * a : 0.294 + 0.62 * a;
          wCol[i * 3 + 2] = c < 0.5 ? 0.45 - 0.28 * a : 0.169 + 0.71 * a;
        }

        wGeo.attributes.position.needsUpdate = true;
        wGeo.attributes.color.needsUpdate = true;
      }

      m.x += (m.tx - m.x) * 0.12;
      m.z += (m.tz - m.z) * 0.12;
      m.a += ((m.on ? 1 : 0) - m.a) * 0.08;

      const R = 1.9;
      const R2 = R * R;
      const near: number[] = [];

      for (let i = 0; i < N; i++) {
        const x = pos[i * 3];
        const z = pos[i * 3 + 2];
        let y = h(x, z, t);
        const dx = x - m.x;
        const dz = z - m.z;
        const d2 = dx * dx + dz * dz;
        let k = 0;
        if (m.a > 0.01 && d2 < R2) {
          k = (1 - d2 / R2) * m.a;
          y += k * 0.55;
          if (near.length < 400 && i % 5 === 0) near.push(i);
        }
        pos[i * 3 + 1] = y;
        const depth = Math.max(0.2, 1 - Math.abs(z - (cz - 5)) / 14);
        const b = (0.55 + y * 0.5) * depth;
        col[i * 3] = dim[0] * b * (1 - k) + sig[0] * k;
        col[i * 3 + 1] = dim[1] * b * (1 - k) + sig[1] * k;
        col[i * 3 + 2] = dim[2] * b * (1 - k) + sig[2] * k;
      }

      if (near.length > 2 && m.a > 0.2) {
        const cy = h(m.x, m.z, t) + 0.6;
        for (let j = 0; j < LN; j++) {
          const i = near[(j * 37 + ((t * 3) | 0)) % near.length];
          lp[j * 6] = m.x;
          lp[j * 6 + 1] = cy;
          lp[j * 6 + 2] = m.z;
          lp[j * 6 + 3] = pos[i * 3];
          lp[j * 6 + 4] = pos[i * 3 + 1];
          lp[j * 6 + 5] = pos[i * 3 + 2];
        }
        lgeo.attributes.position.needsUpdate = true;
        lines.visible = true;
      } else {
        lines.visible = false;
      }

      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      ren.render(scene, cam);

      if (reduce) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    raf = requestAnimationFrame(frame);

    const onVisibilityChange = () => {
      vis = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scene.traverse((o) => {
        if ("geometry" in o && o.geometry instanceof THREE.BufferGeometry) {
          o.geometry.dispose();
        }
        if ("material" in o && o.material instanceof THREE.Material) {
          o.material.dispose();
        }
      });
      ren.dispose();
    };
  }, []);

  return <canvas id="terrain" ref={canvasRef} aria-hidden="true" />;
}
