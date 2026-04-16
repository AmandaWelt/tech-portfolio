import React from "react";

import { PopupWindow } from "./PopupWindow";

type Props = {
  title: string;
  codesLine: string;
  buttons: readonly string[];
  widthPx: number;
  minHeightPx: number;
};

const WarnIcon: React.FC = () => (
  <svg className="h-8 w-8 shrink-0 text-[#f5e100]" viewBox="0 0 32 32" aria-hidden>
    <polygon points="16,2 30,29 2,29" fill="currentColor" stroke="#000" strokeWidth="1.2" />
    <text
      x="16"
      y="24"
      textAnchor="middle"
      fill="#000"
      fontSize="14"
      fontFamily="ui-monospace, monospace"
      fontWeight="900"
    >
      !
    </text>
  </svg>
);

/** Fare row + 2×2 Win9x-style buttons (mock “fare information”). */
export const FareInfoPopup: React.FC<Props> = ({
  title,
  codesLine,
  buttons,
  widthPx,
  minHeightPx,
}) => (
  <PopupWindow
    title={title}
    accent="blue"
    widthPx={widthPx}
    minHeightPx={minHeightPx}
    rotationDeg={0}
    tone="utility"
  >
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <WarnIcon />
        <p className="pt-1 font-mono text-[11px] font-bold tabular-nums tracking-tight text-white">
          {codesLine}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {buttons.map((label) => (
          <button
            key={label}
            type="button"
            tabIndex={-1}
            className="intro-win-button px-1.5 py-1 font-mono text-[8px] font-medium uppercase leading-tight tracking-[0.08em] text-white"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </PopupWindow>
);
