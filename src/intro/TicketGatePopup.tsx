import React from "react";

import { PopupWindow } from "./PopupWindow";

type Props = {
  title: string;
  headline: string;
  actionLabel: string;
  widthPx: number;
  minHeightPx: number;
};

const RedX: React.FC = () => (
  <svg className="h-9 w-9 shrink-0" viewBox="0 0 36 36" aria-hidden>
    <circle cx="18" cy="18" r="16" fill="none" stroke="#c00" strokeWidth="2" />
    <path
      d="M12 12 L24 24 M24 12 L12 24"
      stroke="#c00"
      strokeWidth="2.5"
      strokeLinecap="square"
    />
  </svg>
);

/** “NO TICKET FOUND” + primary action (mock Tickets window). */
export const TicketGatePopup: React.FC<Props> = ({
  title,
  headline,
  actionLabel,
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
        <RedX />
        <p className="min-w-0 flex-1 pt-1 font-mono text-[10px] font-bold uppercase leading-snug tracking-[0.12em] text-white">
          {headline}
        </p>
      </div>
      <div className="flex justify-end border-t-2 border-white/15 pt-2">
        <button
          type="button"
          tabIndex={-1}
          className="intro-win-button min-w-[100px] px-3 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.25em] text-white"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  </PopupWindow>
);
