import React from "react";

type Props = {
  widthPx: number;
  minHeightPx: number;
  /** Shown in the top strip; omit for ×-only chrome (mock “virus” slabs). */
  title?: string;
  children: React.ReactNode;
};

/**
 * Mock “standalone” stack: thick white frame on black, × only (no − / □ / blue bar).
 * Distinct from {@link PopupWindow} cascaded Win9x application windows.
 */
export const StandalonePopup: React.FC<Props> = ({
  widthPx,
  minHeightPx,
  title,
  children,
}) => (
  <div
    className="intro-standalone-popup select-none bg-black text-white"
    style={{ width: widthPx, minHeight: minHeightPx }}
  >
    <div className="flex min-h-[22px] items-center justify-between gap-2 border-b-2 border-white px-1.5 py-1">
      <span className="min-h-[12px] min-w-[8px] truncate font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white/80">
        {title ?? ""}
      </span>
      <span className="shrink-0 font-mono text-[14px] leading-none text-white" aria-hidden>
        ×
      </span>
    </div>
    <div className="intro-standalone-popup-body relative min-h-[56px] overflow-hidden bg-black p-2">
      {children}
    </div>
  </div>
);
