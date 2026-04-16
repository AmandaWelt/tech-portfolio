import React from "react";

import { WindowChrome } from "./WindowChrome";

export type TitleBarAccent = "blue" | "white" | "black";

/** A = utility / B = alert / C = art / D = sticker */
export type PopupTone = "utility" | "alert" | "art" | "sticker";

type Props = {
  title: string;
  accent?: TitleBarAccent;
  widthPx: number;
  minHeightPx?: number;
  rotationDeg?: number;
  className?: string;
  titleRight?: React.ReactNode;
  children: React.ReactNode;
  windowClassName?: string;
  tone?: PopupTone;
  /** Extra mass + bleed for dominant art windows. */
  heroChrome?: boolean;
};

function titleBarClasses(accent: TitleBarAccent, tone: PopupTone): string {
  if (tone === "alert" && accent === "white") {
    return "border-b-2 border-black bg-[#e6e2dc] text-[#0a0a0a]";
  }
  if (tone === "sticker" && accent === "black") {
    return "border-b border-white/35 bg-black text-white";
  }
  switch (accent) {
    case "blue":
      return tone === "art"
        ? "bg-[#0000ff] text-white intro-popup-title-art"
        : "bg-[#0000ff] text-white";
    case "white":
      return "border-b-2 border-black bg-[#ece8e3] text-black";
    case "black":
      return "border-b-2 border-white bg-black text-white";
    default:
      return "";
  }
}

function outerToneClass(tone: PopupTone, heroChrome: boolean): string {
  const h = heroChrome ? " intro-popup--hero" : "";
  switch (tone) {
    case "utility":
      return `intro-popup--utility${h}`;
    case "alert":
      return "intro-popup--alert";
    case "art":
      return `intro-popup--art${h}`;
    case "sticker":
      return "intro-popup--sticker";
    default:
      return "";
  }
}

/**
 * Stepped Win9x frame + tonal poster treatment (grit, bleed, off-white alerts).
 */
export const PopupWindow: React.FC<Props> = ({
  title,
  accent = "blue",
  widthPx,
  minHeightPx = 120,
  rotationDeg = 0,
  className = "",
  titleRight,
  children,
  windowClassName = "",
  tone = "utility",
  heroChrome = false,
}) => {
  const blueLift =
    accent === "blue" && tone !== "sticker"
      ? "shadow-[4px_4px_0_0_rgba(0,0,255,0.4)]"
      : "";

  const innerPad = tone === "sticker" ? "p-px" : "p-[1px]";
  const innerRing =
    tone === "sticker"
      ? "border border-white/45 bg-[#050505]"
      : "border border-white bg-[#050505]";

  return (
    <div
      className={`intro-root select-none ${outerToneClass(tone, heroChrome)} ${className}`}
      style={{
        width: widthPx,
        minHeight: minHeightPx,
        transform: `rotate(${rotationDeg}deg)`,
        transformOrigin: "center center",
      }}
    >
      <div
        className={`border-2 border-[#0a0a0a] bg-[#050505] ${innerPad} ${blueLift}`}
      >
        <div className={`flex flex-col ${innerRing} ${windowClassName}`}>
          <div
            className={`flex min-h-[26px] items-center justify-between gap-1 px-1.5 py-1 ${titleBarClasses(accent, tone)}`}
          >
            <span
              className={`truncate pl-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${tone === "art" ? "tracking-[0.18em]" : ""}`}
            >
              {title}
            </span>
            <div className="flex shrink-0 items-center gap-1">
              {titleRight}
              <WindowChrome accent={accent} />
            </div>
          </div>
          <div
            className={`intro-window-body intro-window-body--${tone} relative min-h-[72px] flex-1 overflow-hidden border-t-2 border-black bg-[#030303] p-2`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
