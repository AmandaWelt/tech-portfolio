import React, { useEffect, useRef } from "react";
import {
  FIBONACCI_ARCS,
  FIBONACCI_LINES,
  SPIRAL_CANVAS,
  arcToPoints,
  type SketchArc,
  type SketchLine,
} from "../../data/goldenSpiral";
import {
  pathDrawAlpha,
  pathDrawProgress,
  pathTotalLength,
  sketchDrawAlpha,
  sketchDrawProgress,
  slicePathToLength,
} from "../../lib/sketchPath";

const CYCLE_MS = 8000;
const HOLD_UNTIL = 0.85;
const FADE_END = 0.96;
const PEAK_ALPHA = 0.62;
const GUIDE_PEAK = 0.48;

const easeOut = (t: number) => 1 - (1 - t) ** 3;
/** Warm sepia ink — matches split-hero design copy (#2f2a25 / #1a1714) */
const INK = "47, 38, 28";
const INK_GUIDE = "82, 66, 48";

type SketchDrawOverlayProps = {
  active: boolean;
};

/** Live graphite — classic Fibonacci golden rectangle + spiral */
const SketchDrawOverlay: React.FC<SketchDrawOverlayProps> = ({ active }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !active) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const designW = SPIRAL_CANVAS.w;
    const designH = SPIRAL_CANVAS.h;

    const syncCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const cssW = Math.max(1, Math.round(rect.width));
      const cssH = Math.max(1, Math.round(rect.height));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      return { cssW, cssH, dpr, sx: cssW / designW, sy: cssH / designH };
    };

    let size = syncCanvasSize();
    const resizeObserver = new ResizeObserver(() => {
      size = syncCanvasSize();
    });
    resizeObserver.observe(container);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();

    const paintLine = (line: SketchLine, cycle: number, peak = PEAK_ALPHA) => {
      const scale = line.alphaScale ?? 1;
      const alpha = reducedMotion
        ? peak * scale * 0.8
        : sketchDrawAlpha(cycle, line.start, line.draw, HOLD_UNTIL, FADE_END, peak, scale);
      const progress = reducedMotion ? 1 : sketchDrawProgress(cycle, line.start, line.draw);
      if (progress <= 0 || alpha <= 0) return;

      const eased = easeOut(progress);
      const x1 = line.p0[0] + (line.p1[0] - line.p0[0]) * eased;
      const y1 = line.p0[1] + (line.p1[1] - line.p0[1]) * eased;

      ctx.save();
      ctx.strokeStyle = `rgba(${INK_GUIDE}, ${alpha})`;
      ctx.lineWidth = 0.9;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(line.p0[0], line.p0[1]);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.restore();
    };

    const paintArc = (arc: SketchArc, cycle: number) => {
      const progress = reducedMotion ? 1 : pathDrawProgress(cycle, arc);
      const alpha = reducedMotion
        ? PEAK_ALPHA
        : pathDrawAlpha(cycle, arc, HOLD_UNTIL, FADE_END, PEAK_ALPHA);
      if (progress <= 0 || alpha <= 0) return;

      const eased = easeOut(progress);
      const points = arcToPoints(arc.cx, arc.cy, arc.r, arc.startAngle, arc.endAngle, 40);
      const total = pathTotalLength(points);
      const visible = slicePathToLength(points, total * eased);
      if (visible.length < 2) return;

      ctx.save();
      ctx.strokeStyle = `rgba(${INK}, ${alpha})`;
      ctx.lineWidth = arc.lineWidth ?? 1.05;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(visible[0][0], visible[0][1]);
      for (let i = 1; i < visible.length; i += 1) {
        ctx.lineTo(visible[i][0], visible[i][1]);
      }
      ctx.stroke();
      ctx.restore();
    };

    const frame = (now: number) => {
      const cycle = reducedMotion ? 1 : ((now - started) % CYCLE_MS) / CYCLE_MS;
      const { dpr, sx, sy } = size;

      ctx.setTransform(dpr * sx, 0, 0, dpr * sy, 0, 0);
      ctx.clearRect(0, 0, designW, designH);

      for (const line of FIBONACCI_LINES) {
        paintLine(line, cycle, GUIDE_PEAK);
      }

      for (const arc of FIBONACCI_ARCS) {
        paintArc(arc, cycle);
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active]);

  return (
    <div ref={containerRef} className="sketch-draw-canvas-wrap">
      <canvas ref={canvasRef} className="sketch-draw-canvas" aria-hidden />
    </div>
  );
};

export default SketchDrawOverlay;
