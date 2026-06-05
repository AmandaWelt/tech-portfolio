import type { SpiralPath } from "../data/goldenSpiral";

type TimedPath = Pick<SpiralPath, "start" | "draw"> & { alphaScale?: number };

export type Point = [number, number];

export const pathTotalLength = (points: Point[], closed = false): number => {
  let length = 0;
  for (let i = 1; i < points.length; i += 1) {
    length += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }
  if (closed && points.length > 2) {
    const last = points[points.length - 1];
    const first = points[0];
    length += Math.hypot(first[0] - last[0], first[1] - last[1]);
  }
  return length;
};

export const slicePathToLength = (
  points: Point[],
  dist: number,
  closed = false,
): Point[] => {
  if (points.length === 0 || dist <= 0) return [];

  const chain: Point[] = [points[0]];
  let remaining = dist;

  const segments: [Point, Point][] = [];
  for (let i = 1; i < points.length; i += 1) {
    segments.push([points[i - 1], points[i]]);
  }
  if (closed && points.length > 2) {
    segments.push([points[points.length - 1], points[0]]);
  }

  for (const [a, b] of segments) {
    const segLen = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (remaining >= segLen) {
      chain.push(b);
      remaining -= segLen;
      continue;
    }
    const t = segLen === 0 ? 0 : remaining / segLen;
    chain.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    break;
  }

  return chain;
};

export const sketchDrawAlpha = (
  cycle: number,
  start: number,
  draw: number,
  holdUntil: number,
  fadeEnd: number,
  peak: number,
  scale = 1,
) => {
  const end = start + draw;
  if (cycle < start) return 0;
  if (cycle < end) return peak * scale * ((cycle - start) / draw);
  if (cycle < holdUntil) return peak * scale;
  if (cycle < fadeEnd) return peak * scale * (1 - (cycle - holdUntil) / (fadeEnd - holdUntil));
  return 0;
};

export const sketchDrawProgress = (cycle: number, start: number, draw: number) => {
  if (cycle < start) return 0;
  return Math.min(1, (cycle - start) / draw);
};

export const pathDrawAlpha = (
  cycle: number,
  path: TimedPath,
  holdUntil: number,
  fadeEnd: number,
  peak: number,
) => sketchDrawAlpha(cycle, path.start, path.draw, holdUntil, fadeEnd, peak, path.alphaScale ?? 1);

export const pathDrawProgress = (cycle: number, path: TimedPath) =>
  sketchDrawProgress(cycle, path.start, path.draw);
