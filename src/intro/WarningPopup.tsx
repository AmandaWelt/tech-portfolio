import React from "react";

import { PopupWindow } from "./PopupWindow";
import { StandalonePopup } from "./StandalonePopup";

type Props = {
  title: string;
  code: string;
  message: string;
  widthPx: number;
  minHeightPx: number;
  chrome?: "cascade" | "standalone";
};

const WarningTriangle: React.FC = () => (
  <svg
    className="h-10 w-10 shrink-0 text-[#f5e100]"
    viewBox="0 0 32 32"
    aria-hidden
  >
    <polygon
      points="16,2 30,29 2,29"
      fill="currentColor"
      stroke="#000"
      strokeWidth="1.2"
    />
    <text
      x="16"
      y="24"
      textAnchor="middle"
      fill="#000"
      fontSize="15"
      fontFamily="ui-monospace, monospace"
      fontWeight="900"
    >
      !
    </text>
  </svg>
);

const WarningBody: React.FC<{ code: string; message: string }> = ({
  code,
  message,
}) => (
  <>
    <div className="flex gap-2">
      <WarningTriangle />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-white/50">
          {code}
        </p>
        <p className="font-mono text-[11px] font-bold uppercase leading-snug tracking-[0.08em] text-white">
          {message}
        </p>
      </div>
    </div>
    <div className="mt-3 flex justify-end border-t-2 border-white/15 pt-2">
      <button
        type="button"
        className="intro-win-button min-w-[52px] px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white"
        tabIndex={-1}
      >
        OK
      </button>
    </div>
  </>
);

export const WarningPopup: React.FC<Props> = ({
  title,
  code,
  message,
  widthPx,
  minHeightPx,
  chrome = "standalone",
}) => {
  if (chrome === "cascade") {
    return (
      <PopupWindow
        title={title}
        accent="white"
        widthPx={widthPx}
        minHeightPx={minHeightPx}
        rotationDeg={0}
        tone="alert"
      >
        <WarningBody code={code} message={message} />
      </PopupWindow>
    );
  }

  return (
    <StandalonePopup title={title} widthPx={widthPx} minHeightPx={minHeightPx}>
      <WarningBody code={code} message={message} />
    </StandalonePopup>
  );
};
