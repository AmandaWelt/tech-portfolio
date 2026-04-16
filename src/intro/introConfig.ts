/**
 * Intro sequence: timing, popup layout, and copy.
 * Toggle via REACT_APP_INTRO_DISABLED=true or INTRO_FORCE_DISABLED below.
 *
 * Session note: sessionStorage survives hard refresh in the same tab. In development
 * we ignore that flag by default so localhost refresh replays the intro. Production
 * always uses “once per tab session”. Set REACT_APP_INTRO_PERSIST_SESSION=true in
 * .env.local to mimic production while developing.
 */

export const SESSION_STORAGE_KEY = "tech-portfolio-intro-v1";

/** Set to true to skip the intro while developing (overrides session). */
export const INTRO_FORCE_DISABLED = false;

export function isIntroDisabledByEnv(): boolean {
  return process.env.REACT_APP_INTRO_DISABLED === "true";
}

/** In dev, only read session if explicitly testing “once per session” behavior. */
function shouldCheckSessionForIntroSeen(): boolean {
  if (process.env.NODE_ENV === "production") return true;
  return process.env.REACT_APP_INTRO_PERSIST_SESSION === "true";
}

export function hasIntroBeenSeen(): boolean {
  if (!shouldCheckSessionForIntroSeen()) return false;
  if (typeof sessionStorage === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * Clears the session flag so the full intro plays again on the next load.
 * Replay: DevTools → Application → Session Storage → remove `tech-portfolio-intro-v1`, or call this then reload.
 */
export function clearIntroSession(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export interface IntroTimings {
  bootMs: number;
  /** Time from infection start until the last popup is scheduled. */
  infectionDurationMs: number;
  overloadMs: number;
  /** Fade duration when leaving the intro after “Enter site”. */
  exitFadeMs: number;
  popupStaggerMs: number;
}

export const INTRO_TIMINGS: IntroTimings = {
  bootMs: 2400,
  infectionDurationMs: 5200,
  overloadMs: 3200,
  exitFadeMs: 900,
  /** Fallback when `spawnDelayMs` is omitted on a popup. */
  popupStaggerMs: 140,
};

export const INTRO_TIMINGS_REDUCED: IntroTimings = {
  bootMs: 400,
  infectionDurationMs: 1200,
  overloadMs: 400,
  exitFadeMs: 350,
  popupStaggerMs: 95,
};

/** Ms from intro mount until gate phase (loading bar should read 100%). */
export function gatePhaseAtMs(t: IntroTimings): number {
  return t.bootMs + t.infectionDurationMs + t.overloadMs;
}

/** Ms over which the loading popup advances 0 → 1 (infection + overload). */
export function loadingBarDurationMs(t: IntroTimings): number {
  return t.infectionDurationMs + t.overloadMs;
}

/**
 * Early-2000s “adware / system dialog” spawn: fast snap at final position,
 * no spring (springs read as bouncy “drop-ins”). Tune here.
 */
export const POPUP_SPAWN = {
  fromScale: 0.96,
  /** Snap-in length (stagger handles “how fast they appear”). */
  durationSec: 0.075,
  /** 0 = linear (robotic); raise slightly for a tiny ease-out settle. */
  easeOut: [0.12, 0, 0.55, 1] as [number, number, number, number],
} as const;

export type PopupKind =
  | "loading"
  | "warning"
  | "art"
  | "fragment"
  | "dither"
  | "address"
  | "fare"
  | "ticketGate"
  | "virusFloater"
  | "vickiBanner"
  | "yearStamp"
  | "dateFloat";

export interface PopupBase {
  id: string;
  kind: PopupKind;
  leftPct: number;
  topPct: number;
  widthPx: number;
  minHeightPx: number;
  zIndex: number;
  rotationDeg: number;
  /** Order index for stagger (0 = first). */
  order: number;
  /**
   * Ms after infection start when this window fades in. When set, overrides
   * `order * popupStaggerMs` so cascades can use ~50ms gaps and solo windows ~150ms+.
   */
  spawnDelayMs?: number;
  /** Nudge from % anchor — negative crops off-screen (poster crop). */
  offsetXPx?: number;
  offsetYPx?: number;
}

export interface LoadingPopupDef extends PopupBase {
  kind: "loading";
  title: string;
  label: string;
  /** Placeholder; `IntroSequence` drives progress from wall-clock vs {@link gatePhaseAtMs}. */
  progress: number;
  /** `dark` = black title bar / frame like reference loading window. */
  chrome?: "blue" | "dark";
  prefaceLine?: string;
  banner?: string;
  subBanner?: string;
}

export interface WarningPopupDef extends PopupBase {
  kind: "warning";
  title: string;
  code: string;
  message: string;
  /** `standalone` = black slab + thick white frame (mock); `cascade` = blue Win9x application chrome. */
  chrome?: "cascade" | "standalone";
}

export interface SystemArtPopupDef extends PopupBase {
  kind: "art";
  title: string;
  subtitle: string;
}

export interface FragmentPopupDef extends PopupBase {
  kind: "fragment";
  title: string;
  lines: string[];
  editorial?: string;
  microLine?: string;
  verticalLabel?: string;
  addressStrip?: string;
}

export interface DitherPortraitDef extends PopupBase {
  kind: "dither";
  title: string;
  caption: string;
  dominant?: boolean;
  portraitSrc?: string;
  hideMetaRow?: boolean;
  portraitStack?: "cascade" | "foreground";
}

export interface AddressBarDef extends PopupBase {
  kind: "address";
  urlLine: string;
}

export interface FarePopupDef extends PopupBase {
  kind: "fare";
  title: string;
  codesLine: string;
  buttons: readonly string[];
}

export interface TicketGatePopupDef extends PopupBase {
  kind: "ticketGate";
  title: string;
  headline: string;
  actionLabel: string;
}

export interface VirusFloaterDef extends PopupBase {
  kind: "virusFloater";
  title: string;
  floater: "triangleNo" | "hourglass" | "shard";
  shardLines?: readonly string[];
}

export interface VickiBannerDef extends PopupBase {
  kind: "vickiBanner";
  displayText: string;
}

export interface YearStampDef extends PopupBase {
  kind: "yearStamp";
  stampTitle: string;
  year: string;
}

export interface DateFloatDef extends PopupBase {
  kind: "dateFloat";
  topLine: string;
  bottomLine: string;
}

export type PopupDef =
  | LoadingPopupDef
  | WarningPopupDef
  | SystemArtPopupDef
  | FragmentPopupDef
  | DitherPortraitDef
  | AddressBarDef
  | FarePopupDef
  | TicketGatePopupDef
  | VirusFloaterDef
  | VickiBannerDef
  | YearStampDef
  | DateFloatDef;

export const BOOT_LINES = [
  "INITIALIZING INTERFACE",
  "LOADING SYSTEM",
  "DATA UPLINK",
  "SCANNING",
] as const;

/** Shown on the gate screen above the enter button. */
export const GATE_LINES = [
  "INTERFACE STABILIZED",
  "SIGNAL LOCKED",
] as const;

export const ENTER_SITE_LABEL = "ENTER SITE";

/**
 * Layout anchors follow reference mock (pic 1): center ♥ Vicki cascade (up-left behind front);
 * standalone portrait on the right under the NO/virus stack; left column fare/tickets/notice;
 * right column alerts. `spawnDelayMs` controls cadence.
 */
export const POPUPS: PopupDef[] = [
  {
    id: "address-bar",
    kind: "address",
    order: 0,
    spawnDelayMs: 0,
    leftPct: 50,
    topPct: 3.2,
    widthPx: 920,
    minHeightPx: 44,
    zIndex: 30,
    rotationDeg: 0,
    offsetXPx: -460,
    urlLine: "WWW. 纽约曼哈顿中央大街 .COM",
  },
  {
    id: "load-main",
    kind: "loading",
    order: 1,
    spawnDelayMs: 100,
    leftPct: 16,
    topPct: 9,
    widthPx: 224,
    minHeightPx: 132,
    zIndex: 26,
    rotationDeg: 0,
    chrome: "dark",
    title: "加载界面 loading..",
    label: "INTERFACE DATA",
    progress: 0,
    banner: "COMPUTER INTERFACE DATA LOADING",
    subBanner: "Data is being updated.",
  },
  {
    id: "vicki-stack-1",
    kind: "dither",
    order: 2,
    spawnDelayMs: 330,
    leftPct: 43,
    topPct: 9,
    widthPx: 252,
    minHeightPx: 248,
    zIndex: 42,
    rotationDeg: 0,
    offsetXPx: -48,
    offsetYPx: -44,
    title: "♥ Vicki",
    caption: "You Didn't Grab The Ticket.",
    dominant: false,
    portraitSrc: "/IMG_1064.jpg",
    hideMetaRow: true,
    portraitStack: "cascade",
  },
  {
    id: "vicki-stack-2",
    kind: "dither",
    order: 3,
    spawnDelayMs: 385,
    leftPct: 43,
    topPct: 9,
    widthPx: 268,
    minHeightPx: 258,
    zIndex: 46,
    rotationDeg: 0,
    offsetXPx: -24,
    offsetYPx: -22,
    title: "♥ Vicki",
    caption: "You Didn't Grab The Ticket.",
    dominant: false,
    portraitSrc: "/IMG_1064.jpg",
    hideMetaRow: true,
    portraitStack: "cascade",
  },
  {
    id: "vicki-stack-3",
    kind: "dither",
    order: 4,
    spawnDelayMs: 440,
    leftPct: 43,
    topPct: 9,
    widthPx: 284,
    minHeightPx: 268,
    zIndex: 52,
    rotationDeg: 0,
    offsetXPx: 0,
    offsetYPx: 0,
    title: "♥ Vicki",
    caption: "You Didn't Grab The Ticket.",
    dominant: false,
    portraitSrc: "/IMG_1064.jpg",
    hideMetaRow: true,
    portraitStack: "cascade",
  },
  {
    id: "vicki-portrait-foreground",
    kind: "dither",
    order: 4.4,
    spawnDelayMs: 500,
    leftPct: 64,
    topPct: 14,
    widthPx: 336,
    minHeightPx: 372,
    zIndex: 44,
    rotationDeg: 0,
    offsetXPx: 0,
    offsetYPx: 0,
    title: "♥ Vicki",
    caption: "You Didn't Grab The Ticket.",
    dominant: false,
    portraitSrc: "/IMG_1065.jpg",
    hideMetaRow: true,
    portraitStack: "foreground",
  },
  {
    id: "warn-error",
    kind: "warning",
    order: 5,
    spawnDelayMs: 520,
    leftPct: 48,
    topPct: 26,
    widthPx: 172,
    minHeightPx: 108,
    zIndex: 60,
    rotationDeg: 0,
    offsetXPx: -80,
    chrome: "standalone",
    title: "ERROR",
    code: "X / 0 / TICKET",
    message: "ACCESS DENIED",
  },
  {
    id: "fare-info",
    kind: "fare",
    order: 6,
    spawnDelayMs: 700,
    leftPct: 14,
    topPct: 31,
    widthPx: 200,
    minHeightPx: 168,
    zIndex: 28,
    rotationDeg: 0,
    title: "FARE INFO",
    codesLine: "1717/1317/1017",
    buttons: ["LOVE POWDER", "BLACK D", "INFIELD", "OUTFIELD"],
  },
  {
    id: "date-float",
    kind: "dateFloat",
    order: 6.5,
    spawnDelayMs: 880,
    leftPct: 11,
    topPct: 35,
    widthPx: 120,
    minHeightPx: 96,
    zIndex: 35,
    rotationDeg: 0,
    topLine: "9.29",
    bottomLine: "9.30",
  },
  {
    id: "ticket-gate",
    kind: "ticketGate",
    order: 7,
    spawnDelayMs: 1080,
    leftPct: 13,
    topPct: 41,
    widthPx: 212,
    minHeightPx: 128,
    zIndex: 48,
    rotationDeg: 0,
    title: "TICKETS",
    headline: "NO TICKET FOUND",
    actionLabel: "ACCESS DENIED",
  },
  {
    id: "ticket-sorry",
    kind: "warning",
    order: 8,
    spawnDelayMs: 1220,
    leftPct: 15,
    topPct: 49,
    widthPx: 228,
    minHeightPx: 108,
    zIndex: 50,
    rotationDeg: 0,
    chrome: "standalone",
    title: "TICKET",
    code: "VOID / NULL",
    message: "Sorry, you didn't grab the ticket.",
  },
  {
    id: "warn-alert",
    kind: "warning",
    order: 9,
    spawnDelayMs: 1480,
    leftPct: 73,
    topPct: 7,
    widthPx: 192,
    minHeightPx: 108,
    zIndex: 54,
    rotationDeg: 0,
    chrome: "standalone",
    title: "ALERT",
    code: "1717 / 1317 / 1017",
    message: "THRESHOLD EXCEEDED",
  },
  {
    id: "virus-stack-a",
    kind: "virusFloater",
    order: 10,
    spawnDelayMs: 1640,
    leftPct: 77,
    topPct: 15,
    widthPx: 156,
    minHeightPx: 140,
    zIndex: 52,
    rotationDeg: 0,
    title: " ",
    floater: "triangleNo",
  },
  {
    id: "virus-stack-b",
    kind: "virusFloater",
    order: 11,
    spawnDelayMs: 1690,
    leftPct: 76,
    topPct: 20,
    widthPx: 156,
    minHeightPx: 140,
    zIndex: 53,
    rotationDeg: 0,
    title: " ",
    floater: "triangleNo",
  },
  {
    id: "virus-stack-c",
    kind: "virusFloater",
    order: 12,
    spawnDelayMs: 1740,
    leftPct: 75,
    topPct: 25,
    widthPx: 168,
    minHeightPx: 152,
    zIndex: 56,
    rotationDeg: 0,
    title: "WARNING",
    floater: "triangleNo",
  },
  {
    id: "virus-shard",
    kind: "virusFloater",
    order: 13,
    spawnDelayMs: 1790,
    leftPct: 74,
    topPct: 30,
    widthPx: 148,
    minHeightPx: 96,
    zIndex: 55,
    rotationDeg: 0,
    title: "!",
    floater: "shard",
    shardLines: ["TS", "IS"],
  },
  {
    id: "virus-hourglass",
    kind: "virusFloater",
    order: 14,
    spawnDelayMs: 1840,
    leftPct: 81,
    topPct: 40,
    widthPx: 132,
    minHeightPx: 128,
    zIndex: 58,
    rotationDeg: 0,
    title: "WAIT",
    floater: "hourglass",
  },
  {
    id: "warn-notice",
    kind: "warning",
    order: 15,
    spawnDelayMs: 2000,
    leftPct: 12,
    topPct: 56,
    widthPx: 218,
    minHeightPx: 118,
    zIndex: 49,
    rotationDeg: 0,
    chrome: "standalone",
    title: "NOTICE",
    code: "NULL / VOID / 000",
    message: "NO TICKETS · ACCESS DENIED",
  },
  {
    id: "year-stamp",
    kind: "yearStamp",
    order: 16,
    spawnDelayMs: 2060,
    leftPct: 22,
    topPct: 46,
    widthPx: 96,
    minHeightPx: 76,
    zIndex: 61,
    rotationDeg: 0,
    stampTitle: "AFAN",
    year: "2023",
  },
  {
    id: "vicki-banner",
    kind: "vickiBanner",
    order: 17,
    spawnDelayMs: 2160,
    leftPct: 50,
    topPct: 58,
    widthPx: 440,
    minHeightPx: 88,
    zIndex: 62,
    rotationDeg: 0,
    offsetXPx: -200,
    displayText: "V I C K I   V A",
  },
  {
    id: "addr-frag",
    kind: "fragment",
    order: 18,
    spawnDelayMs: 2280,
    leftPct: 10,
    topPct: 64,
    widthPx: 236,
    minHeightPx: 104,
    zIndex: 40,
    rotationDeg: 0,
    offsetXPx: 0,
    offsetYPx: 2,
    title: "ADDR",
    lines: ["WWW.", "INTERFACE", ".COM"],
    addressStrip: "SECURE · UPLINK · NODE",
    microLine: "LATENCY 44MS · JITTER +",
  },
];
