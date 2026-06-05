export const HERO_BG = 0x000000;

/** [x, y, z, size] — simple stacked cluster */
export const CUBE_LAYOUT: [number, number, number, number][] = [
  [0, 0, 0, 1.4],
  [-0.78, 0.02, 0.2, 1.02],
  [0.76, -0.04, 0.05, 0.98],
  [-0.28, 0.56, 0.12, 0.78],
  [0.38, 0.48, -0.02, 0.82],
  [0.02, -0.64, 0.06, 0.68],
];

/** Tamal-style: cool sides, warm tops on blocks near the lamp */
export const CUBE_COLORS = [
  { side: "#3a4554", top: "#b06838", bottom: "#252c36" },
  { side: "#384352", top: "#985830", bottom: "#232a34" },
  { side: "#404958", top: "#586878", bottom: "#282f38" },
  { side: "#3a4554", top: "#a86034", bottom: "#252c36" },
  { side: "#384352", top: "#905028", bottom: "#232a34" },
  { side: "#404958", top: "#505c6a", bottom: "#282f38" },
] as const;

export const SCENE_ROTATION = { x: -0.24, y: 0.5 };
export const CENTER_CUBE_Y = CUBE_LAYOUT[0][1];
export const CENTER_CUBE_SIZE = CUBE_LAYOUT[0][3];
