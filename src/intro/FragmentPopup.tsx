import React from "react";

import { FakeScrollbar } from "./FakeScrollbar";
import { PopupWindow } from "./PopupWindow";

type Props = {
  title: string;
  lines: string[];
  editorial?: string;
  widthPx: number;
  minHeightPx: number;
  microLine?: string;
  verticalLabel?: string;
  addressStrip?: string;
};

export const FragmentPopup: React.FC<Props> = ({
  title,
  lines,
  editorial,
  widthPx,
  minHeightPx,
  microLine,
  verticalLabel,
  addressStrip,
}) => (
  <PopupWindow
    title={title}
    accent="black"
    widthPx={widthPx}
    minHeightPx={minHeightPx}
    rotationDeg={0}
    tone="sticker"
  >
    <div className="flex gap-1.5">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {addressStrip && (
          <p className="border border-white/20 bg-white/[0.04] px-1 py-0.5 font-mono text-[7px] uppercase tracking-[0.15em] text-white/45">
            {addressStrip}
          </p>
        )}
        {editorial && (
          <p className="font-body text-4xl font-extralight leading-none tracking-tight text-white">
            {editorial}
          </p>
        )}
        <div className="flex gap-2">
          {verticalLabel && (
            <p
              className="shrink-0 font-mono text-[8px] uppercase leading-tight tracking-[0.35em] text-white/35 [writing-mode:vertical-rl] [text-orientation:mixed]"
            >
              {verticalLabel}
            </p>
          )}
          <div className="min-w-0 flex-1 space-y-1 border-l-2 border-[#0047ff] pl-2">
            {lines.map((line) => (
              <p
                key={line}
                className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/75"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
        {microLine && (
          <p className="font-mono text-[7px] uppercase tracking-[0.4em] text-[#0047ff]/80">
            {microLine}
          </p>
        )}
        <div className="h-px w-full bg-gradient-to-r from-white/50 via-[#0047ff]/50 to-transparent" />
      </div>
      <FakeScrollbar heightPx={Math.max(88, minHeightPx - 36)} />
    </div>
  </PopupWindow>
);
