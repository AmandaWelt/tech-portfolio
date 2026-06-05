/** Classic golden rectangle — nested squares + Fibonacci quarter-arc spiral */

export const SPIRAL_CANVAS = { w: 300, h: 440 };

export type SketchLine = {
  p0: [number, number];
  p1: [number, number];
  start: number;
  draw: number;
  alphaScale?: number;
};

export type SketchArc = {
  cx: number;
  cy: number;
  r: number;
  startAngle: number;
  endAngle: number;
  start: number;
  draw: number;
  lineWidth?: number;
};

export type SpiralPath = {
  points: [number, number][];
  start: number;
  draw: number;
  lineWidth: number;
  alphaScale?: number;
};

const PHI = (1 + Math.sqrt(5)) / 2;
const SIDES = ["bottom", "right", "top", "left"] as const;

type Square = { x: number; y: number; size: number };
type Corner = "tl" | "tr" | "br" | "bl";

const CORNERS: Corner[] = ["tl", "tr", "br", "bl"];

/** Spiral passes through these adjacent corners in each subdivided square */
const SPIRAL_CORNERS: Record<(typeof SIDES)[number], [Corner, Corner]> = {
  bottom: ["bl", "tr"],
  right: ["br", "tl"],
  top: ["tr", "bl"],
  left: ["tl", "br"],
};

const cornerPoint = (sq: Square, corner: Corner): [number, number] => {
  const { x, y, size: s } = sq;
  switch (corner) {
    case "tl":
      return [x, y];
    case "tr":
      return [x + s, y];
    case "br":
      return [x + s, y + s];
    case "bl":
      return [x, y + s];
  }
};

const cross = (ax: number, ay: number, bx: number, by: number) => ax * by - ay * bx;

/** Pick the arc whose midpoint bulges away from the spiral pole */
const outwardArc = (
  sq: Square,
  entry: Corner,
  exit: Corner,
  poleX: number,
  poleY: number,
  invert = false,
): Omit<SketchArc, "start" | "draw"> => {
  const entryPt = cornerPoint(sq, entry);
  const exitPt = cornerPoint(sq, exit);
  const candidates = CORNERS.filter((c) => c !== entry && c !== exit);

  const chordX = exitPt[0] - entryPt[0];
  const chordY = exitPt[1] - entryPt[1];
  const poleSide = cross(chordX, chordY, poleX - entryPt[0], poleY - entryPt[1]);

  const matches: Omit<SketchArc, "start" | "draw">[] = [];

  for (const corner of candidates) {
    const [cx, cy] = cornerPoint(sq, corner);
    const startAngle = Math.atan2(entryPt[1] - cy, entryPt[0] - cx);
    const endAngle = Math.atan2(exitPt[1] - cy, exitPt[0] - cx);
    let sweep = endAngle - startAngle;
    while (sweep <= -Math.PI) sweep += 2 * Math.PI;
    while (sweep > Math.PI) sweep -= 2 * Math.PI;
    const midAngle = startAngle + sweep / 2;
    const midX = cx + sq.size * Math.cos(midAngle);
    const midY = cy + sq.size * Math.sin(midAngle);
    const midSide = cross(chordX, chordY, midX - entryPt[0], midY - entryPt[1]);

    if (poleSide === 0 || midSide === 0 || poleSide * midSide >= 0) {
      matches.push({ cx, cy, r: sq.size, startAngle, endAngle });
    } else {
      matches.unshift({ cx, cy, r: sq.size, startAngle, endAngle });
    }
  }

  if (matches.length === 0) {
    throw new Error("Unable to resolve outward arc for square");
  }

  return invert ? matches[matches.length - 1] : matches[0];
};

/** Arc indices (0-based) that need the alternate quarter-circle */
const FLIPPED_ARC_INDICES = new Set([2, 5, 6]);

const buildFibonacciStudy = (ox: number, oy: number, width: number, maxIter = 8) => {
  const height = width * PHI;
  let x = ox;
  let y = oy;
  let w = width;
  let h = height;

  const squares: Square[] = [];
  const arcs: Omit<SketchArc, "start" | "draw">[] = [];
  let arcIndex = 0;

  for (let i = 0; i < maxIter; i += 1) {
    if (w < 3 || h < 3) break;
    const side = SIDES[i % SIDES.length];
    const [entry, exit] = SPIRAL_CORNERS[side];
    const invert = FLIPPED_ARC_INDICES.has(arcIndex);

    if (side === "bottom") {
      const s = w;
      const sq = { x, y: y + h - s, size: s };
      squares.push(sq);
      arcs.push(outwardArc(sq, entry, exit, ox, oy, invert));
      h -= s;
    } else if (side === "right") {
      const s = h;
      const sq = { x: x + w - s, y, size: s };
      squares.push(sq);
      arcs.push(outwardArc(sq, entry, exit, ox, oy, invert));
      w -= s;
    } else if (side === "top") {
      const s = w;
      const sq = { x, y, size: s };
      squares.push(sq);
      arcs.push(outwardArc(sq, entry, exit, ox, oy, invert));
      y += s;
      h -= s;
    } else {
      const s = h;
      const sq = { x, y: y + h - s, size: s };
      squares.push(sq);
      arcs.push(outwardArc(sq, entry, exit, ox, oy, invert));
      x += s;
      w -= s;
    }

    arcIndex += 1;
  }

  return { squares, arcs, bounds: { x: ox, y: oy, w: width, h: height } };
};

/** Sample a quarter arc into polyline points for progressive drawing */
export const arcToPoints = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
  steps = 36,
): [number, number][] => {
  const pts: [number, number][] = [];
  let sweep = endAngle - startAngle;
  while (sweep <= -Math.PI) sweep += 2 * Math.PI;
  while (sweep > Math.PI) sweep -= 2 * Math.PI;

  for (let i = 0; i <= steps; i += 1) {
    const a = startAngle + sweep * (i / steps);
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
};

const RECT_W = 228;
const ORIGIN = { x: 36, y: 28 };
const { squares, arcs } = buildFibonacciStudy(ORIGIN.x, ORIGIN.y, RECT_W, 8);

const LINE_STEP = 0.028;
const ARC_STEP = 0.075;

export const FIBONACCI_LINES: SketchLine[] = squares.flatMap((sq, sqIndex) => {
  const { x, y, size: s } = sq;
  const base = sqIndex * LINE_STEP * 4;
  const edges: [[number, number], [number, number]][] = [
    [
      [x, y],
      [x + s, y],
    ],
    [
      [x + s, y],
      [x + s, y + s],
    ],
    [
      [x + s, y + s],
      [x, y + s],
    ],
    [
      [x, y + s],
      [x, y],
    ],
  ];

  return edges.map(([p0, p1], edgeIndex) => ({
    p0,
    p1,
    start: base + edgeIndex * LINE_STEP,
    draw: LINE_STEP * 0.92,
    alphaScale: sqIndex === 0 ? 1 : 0.92,
  }));
});

export const FIBONACCI_ARCS: SketchArc[] = arcs.map((arc, index) => ({
  ...arc,
  start: 0.32 + index * ARC_STEP,
  draw: ARC_STEP * 0.95,
  lineWidth: 1.05,
}));

/** Full spiral as one continuous path (for optional single-stroke pass) */
export const GOLDEN_SPIRAL: SpiralPath = {
  points: arcs.flatMap((arc) =>
    arcToPoints(arc.cx, arc.cy, arc.r, arc.startAngle, arc.endAngle, 40),
  ),
  start: 0.32,
  draw: ARC_STEP * arcs.length,
  lineWidth: 1.05,
};
