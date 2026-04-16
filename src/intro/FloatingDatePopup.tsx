import React from "react";

type Props = {
  /** Smaller line (e.g. 9.29) */
  topLine: string;
  /** Larger line below (e.g. 9.30) — mock “floating” date between fare and tickets. */
  bottomLine: string;
};

/** Borderless stacked dates — no window chrome. */
export const FloatingDatePopup: React.FC<Props> = ({ topLine, bottomLine }) => (
  <div
    className="pointer-events-none select-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
    aria-hidden
  >
    <p className="font-body text-[11px] font-light tracking-[0.2em] opacity-80">
      {topLine}
    </p>
    <p className="mt-0.5 font-body text-3xl font-extralight leading-none tracking-tight">
      {bottomLine}
    </p>
  </div>
);
