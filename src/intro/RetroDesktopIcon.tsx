import React from "react";

export type RetroDesktopIconKind =
  | "computer"
  | "network"
  | "folder"
  | "folder-doc"
  | "recycle";

const px = {
  shapeRendering: "crispEdges" as const,
};

/** Win9x-style 32×32 shell bitmap look (CSS/SVG, no assets). */
export const RetroDesktopIcon: React.FC<{ kind: RetroDesktopIconKind }> = ({
  kind,
}) => {
  switch (kind) {
    case "folder":
      return (
        <svg
          viewBox="0 0 32 32"
          className="intro-retro-desktop-icon h-9 w-9"
          aria-hidden
          {...px}
        >
          {/* Tab (back) */}
          <rect x="4" y="7" width="13" height="6" fill="#806040" />
          {/* Tab (face) */}
          <rect x="5" y="8" width="11" height="4" fill="#d8c078" />
          <rect x="5" y="8" width="11" height="1" fill="#f8f0c8" />
          <rect x="5" y="8" width="1" height="4" fill="#f8f0c8" />
          <rect x="15" y="9" width="1" height="3" fill="#604020" />
          {/* Body */}
          <rect x="2" y="12" width="28" height="18" fill="#c8a860" />
          <rect x="2" y="12" width="28" height="2" fill="#e8d8a0" />
          <rect x="2" y="12" width="2" height="18" fill="#e8d8a0" />
          <rect x="28" y="14" width="2" height="16" fill="#705030" />
          <rect x="4" y="28" width="26" height="2" fill="#705030" />
          <rect x="29" y="12" width="1" height="2" fill="#705030" />
        </svg>
      );
    case "folder-doc":
      return (
        <svg
          viewBox="0 0 32 32"
          className="intro-retro-desktop-icon h-9 w-9"
          aria-hidden
          {...px}
        >
          <rect x="4" y="7" width="13" height="6" fill="#806040" />
          <rect x="5" y="8" width="11" height="4" fill="#d8c078" />
          <rect x="5" y="8" width="11" height="1" fill="#f8f0c8" />
          <rect x="5" y="8" width="1" height="4" fill="#f8f0c8" />
          <rect x="15" y="9" width="1" height="3" fill="#604020" />
          <rect x="2" y="12" width="28" height="18" fill="#c8a860" />
          <rect x="2" y="12" width="28" height="2" fill="#e8d8a0" />
          <rect x="2" y="12" width="2" height="18" fill="#e8d8a0" />
          <rect x="28" y="14" width="2" height="16" fill="#705030" />
          <rect x="4" y="28" width="26" height="2" fill="#705030" />
          <rect x="29" y="12" width="1" height="2" fill="#705030" />
          {/* Paper */}
          <rect x="14" y="10" width="12" height="14" fill="#f8f8f8" />
          <rect x="14" y="10" width="12" height="1" fill="#ffffff" />
          <rect x="14" y="10" width="1" height="14" fill="#ffffff" />
          <rect x="25" y="11" width="1" height="13" fill="#a0a0a0" />
          <rect x="15" y="23" width="11" height="1" fill="#a0a0a0" />
          <rect x="16" y="13" width="8" height="1" fill="#2040a0" />
          <rect x="16" y="16" width="8" height="1" fill="#2040a0" />
          <rect x="16" y="19" width="5" height="1" fill="#2040a0" />
        </svg>
      );
    case "computer":
      return (
        <svg
          viewBox="0 0 32 32"
          className="intro-retro-desktop-icon h-9 w-9"
          aria-hidden
          {...px}
        >
          {/* CRT */}
          <rect x="5" y="5" width="22" height="16" fill="#404040" />
          <rect x="6" y="6" width="20" height="14" fill="#808080" />
          <rect x="7" y="7" width="18" height="12" fill="#000080" />
          <rect x="8" y="8" width="7" height="4" fill="#4080c0" />
          <rect x="7" y="7" width="18" height="1" fill="#a0a0a0" />
          <rect x="7" y="7" width="1" height="12" fill="#a0a0a0" />
          <rect x="24" y="8" width="1" height="11" fill="#303030" />
          <rect x="8" y="18" width="17" height="1" fill="#303030" />
          {/* Base */}
          <rect x="10" y="21" width="12" height="3" fill="#a0a0a0" />
          <rect x="10" y="21" width="12" height="1" fill="#d8d8d8" />
          <rect x="10" y="21" width="1" height="3" fill="#d8d8d8" />
          <rect x="21" y="22" width="1" height="2" fill="#606060" />
          <rect x="8" y="24" width="16" height="1" fill="#606060" />
          <rect x="6" y="25" width="20" height="2" fill="#909090" />
          <rect x="6" y="25" width="20" height="1" fill="#d0d0d0" />
          <rect x="6" y="25" width="1" height="2" fill="#d0d0d0" />
          <rect x="25" y="26" width="1" height="1" fill="#505050" />
        </svg>
      );
    case "network":
      return (
        <svg
          viewBox="0 0 32 32"
          className="intro-retro-desktop-icon h-9 w-9"
          aria-hidden
          {...px}
        >
          {/* Left PC */}
          <rect x="3" y="10" width="12" height="10" fill="#606060" />
          <rect x="4" y="11" width="10" height="8" fill="#909090" />
          <rect x="5" y="12" width="8" height="6" fill="#000080" />
          <rect x="6" y="13" width="3" height="2" fill="#5090d0" />
          <rect x="4" y="20" width="10" height="2" fill="#a8a8a8" />
          {/* Right PC */}
          <rect x="17" y="6" width="12" height="10" fill="#606060" />
          <rect x="18" y="7" width="10" height="8" fill="#909090" />
          <rect x="19" y="8" width="8" height="6" fill="#000080" />
          <rect x="22" y="9" width="3" height="2" fill="#5090d0" />
          <rect x="18" y="16" width="10" height="2" fill="#a8a8a8" />
          {/* Cable */}
          <rect x="13" y="14" width="6" height="2" fill="#303030" />
          <rect x="15" y="12" width="2" height="6" fill="#303030" />
        </svg>
      );
    case "recycle":
      return (
        <svg
          viewBox="0 0 32 32"
          className="intro-retro-desktop-icon h-9 w-9"
          aria-hidden
          {...px}
        >
          {/* Rim */}
          <rect x="8" y="8" width="16" height="3" fill="#a0a0a0" />
          <rect x="8" y="8" width="16" height="1" fill="#e8e8e8" />
          <rect x="8" y="8" width="1" height="3" fill="#e8e8e8" />
          <rect x="23" y="9" width="1" height="2" fill="#606060" />
          {/* Bin body */}
          <rect x="9" y="11" width="14" height="16" fill="#c0c0c0" />
          <rect x="9" y="11" width="14" height="2" fill="#e8e8e8" />
          <rect x="9" y="11" width="2" height="16" fill="#e8e8e8" />
          <rect x="21" y="13" width="2" height="14" fill="#707070" />
          <rect x="11" y="25" width="12" height="2" fill="#707070" />
          {/* Vert slats */}
          <rect x="12" y="13" width="2" height="12" fill="#909090" />
          <rect x="15" y="13" width="2" height="12" fill="#909090" />
          <rect x="18" y="13" width="2" height="12" fill="#909090" />
          <rect x="11" y="14" width="1" height="10" fill="#d8d8d8" />
        </svg>
      );
  }
};
