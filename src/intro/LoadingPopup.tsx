import React from "react";

import { FakeScrollbar } from "./FakeScrollbar";
import { PopupWindow } from "./PopupWindow";

type Props = {
  title: string;
  label: string;
  progress: number;
  widthPx: number;
  minHeightPx: number;
  /** Mock loading window: black title bar + frame (`dark`) vs classic blue utility (`blue`). */
  chrome?: "blue" | "dark";
  /** Extra line above banner (e.g. bilingual “加载界面” row). */
  prefaceLine?: string;
  banner?: string;
  subBanner?: string;
};

const SEGMENTS = 16;

export const LoadingPopup: React.FC<Props> = ({
  title,
  label,
  progress,
  widthPx,
  minHeightPx,
  chrome = "blue",
  prefaceLine,
  banner = "COMPUTER INTERFACE DATA LOADING",
  subBanner = "Data is being updated.",
}) => {
  const filled = Math.round(progress * SEGMENTS);
  const isDark = chrome === "dark";

  return (
    <PopupWindow
      title={title}
      accent={isDark ? "black" : "blue"}
      widthPx={widthPx}
      minHeightPx={minHeightPx}
      rotationDeg={0}
      tone="utility"
      className={isDark ? "intro-loading-popup--dark" : undefined}
    >
      <div className="flex gap-1.5">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="space-y-0.5 border border-white/25 bg-black px-1.5 py-1">
            {prefaceLine && (
              <p className="font-mono text-[8px] leading-tight tracking-[0.08em] text-white/75">
                {prefaceLine}
              </p>
            )}
            <p className="font-mono text-[7px] uppercase leading-tight tracking-[0.2em] text-white/55">
              {banner}
            </p>
            <p
              className={`font-mono text-[7px] uppercase tracking-widest ${isDark ? "text-white/55" : "text-[#0000ff]"}`}
            >
              {subBanner}
            </p>
          </div>
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/45">
            {label}
          </p>
          <div
            className="flex h-9 items-end justify-between gap-px border-2 border-[#2a2a2a] bg-black px-0.5 py-0.5"
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {Array.from({ length: SEGMENTS }).map((_, i) => (
              <span
                key={i}
                className={`flex-1 bg-white ${i < filled ? "opacity-100" : "opacity-[0.12]"}`}
                style={{ height: "82%" }}
              />
            ))}
          </div>
          <div className="flex items-stretch justify-between gap-2">
            <button
              type="button"
              className="intro-win-button flex-1 px-2 py-1.5 font-mono text-[9px] uppercase tracking-[0.35em] text-white/90"
              tabIndex={-1}
            >
              HOLD ON
            </button>
            <span
              className={`flex items-center border border-white/35 px-1.5 font-mono text-[9px] ${isDark ? "text-white/70" : "text-[#0000ff]"}`}
            >
              {String(Math.round(progress * 100)).padStart(3, "0")}%
            </span>
          </div>
        </div>
        <FakeScrollbar heightPx={Math.max(96, minHeightPx - 40)} />
      </div>
    </PopupWindow>
  );
};
