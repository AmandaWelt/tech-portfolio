import React from "react";

type Props = {
  /** Wide-spaced headline, e.g. V I C K I   V A */
  text: string;
  widthPx: number;
  minHeightPx: number;
};

/** Large electric-blue banner with thick white frame (mock bottom strip). */
export const VickiBannerPopup: React.FC<Props> = ({ text, widthPx, minHeightPx }) => (
  <div
    className="select-none border-[3px] border-white bg-[#0000ff] text-white shadow-[6px_6px_0_rgba(0,0,0,0.85)]"
    style={{ width: widthPx, minHeight: minHeightPx }}
  >
    <div className="flex min-h-[28px] items-center justify-between border-b-2 border-white/40 px-2 py-1">
      <span className="font-mono text-[12px] leading-none text-white">×</span>
      <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/70">
        close
      </span>
    </div>
    <div className="flex min-h-[44px] items-center justify-center px-4 py-3">
      <p className="text-center font-body text-lg font-medium uppercase tracking-[0.65em] sm:text-xl">
        {text}
      </p>
    </div>
  </div>
);
