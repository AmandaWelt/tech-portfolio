import React from "react";

import {
  RetroDesktopIcon,
  type RetroDesktopIconKind,
} from "./RetroDesktopIcon";

const DESKTOP_ICONS: readonly { label: string; kind: RetroDesktopIconKind }[] =
  [
    { label: "MY COMPUTER", kind: "computer" },
    { label: "NETWORK", kind: "network" },
    { label: "DOCUMENTS", kind: "folder-doc" },
    { label: "RECYCLE BIN", kind: "recycle" },
    { label: "ALIEN OBJECTS", kind: "folder" },
    { label: "READ ME", kind: "folder-doc" },
    { label: "VICKI_VA", kind: "folder-doc" },
    { label: "TOUR INFO", kind: "folder" },
  ];

/**
 * Retro Win9x-style chrome on a **solid black** workspace (mock):
 * status strip, left icons, bottom taskbar — no poster typography or tint layers.
 */
export const PosterBackdrop: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    aria-hidden
  >
    <div className="intro-retro-desktop absolute inset-0" />

    <div className="intro-retro-statusbar">
      <span className="intro-retro-statusbar-left uppercase">
        Computer interface data loading
      </span>
      <div className="intro-retro-statusbar-right">
        <span>10:17 PM</span>
        <svg
          width="14"
          height="11"
          viewBox="0 0 14 11"
          className="shrink-0 text-white/45"
          aria-hidden
        >
          <rect
            x="1"
            y="1.5"
            width="10"
            height="6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M6 8v2M3 10h8" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </div>

    {/* Pixel-ish icon column (decorative) */}
    <div className="intro-retro-icons">
      {DESKTOP_ICONS.map(({ label, kind }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <RetroDesktopIcon kind={kind} />
          <span className="max-w-[72px] text-center font-mono text-[7px] leading-[1.15] tracking-wide text-white/70 drop-shadow-[0_1px_0_rgba(0,0,0,0.9)]">
            {label}
          </span>
        </div>
      ))}
    </div>

    {/* 3D taskbar strip */}
    <div className="intro-retro-taskbar">
      <div className="intro-retro-taskbar-inner">
        <span className="intro-retro-start">Start</span>
        <span className="intro-retro-task-pill intro-retro-task-pill--active">
          VICKI VA
        </span>
        <span className="intro-retro-task-pill">loading..</span>
        <span className="ml-auto font-mono text-[10px] tabular-nums text-black/70">
          10:17 PM
        </span>
      </div>
    </div>
  </div>
);
