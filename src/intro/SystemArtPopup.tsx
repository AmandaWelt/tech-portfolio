import React from "react";
import { motion } from "framer-motion";

import { FakeScrollbar } from "./FakeScrollbar";
import { PopupWindow } from "./PopupWindow";

type Props = {
  title: string;
  subtitle: string;
  widthPx: number;
  minHeightPx: number;
  reducedMotion: boolean;
};

export const SystemArtPopup: React.FC<Props> = ({
  title,
  subtitle,
  widthPx,
  minHeightPx,
  reducedMotion,
}) => {
  const blockH = Math.max(112, minHeightPx - 48);

  return (
    <PopupWindow
      title={title}
      accent="blue"
      widthPx={widthPx}
      minHeightPx={minHeightPx}
      rotationDeg={0}
      tone="art"
      windowClassName="overflow-visible"
    >
      <div className="flex gap-1.5">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div
            className="relative overflow-hidden border-2 border-[#0047ff]/50 bg-gradient-to-b from-white/[0.07] to-transparent"
            style={{ height: blockH }}
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,rgba(255,255,255,0.05)_6px,rgba(255,255,255,0.05)_7px)]" />
            {!reducedMotion && (
              <motion.div
                className="intro-glitch-strip top-[32%]"
                animate={{ opacity: [0.4, 0.9, 0.5], x: ["-10%", "4%", "-2%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <div className="absolute left-2 top-3 h-10 w-px bg-white/40" />
            <div className="absolute left-2 top-3 h-px w-10 bg-white/40" />
            <div className="absolute bottom-3 right-10 h-8 w-12 border border-[#0047ff]/60 bg-black/60" />
            <div className="absolute bottom-4 left-4 right-10 top-10 bg-[linear-gradient(180deg,rgba(0,71,255,0.15),transparent)]" />
            <motion.div
              className="absolute left-6 top-8 h-16 w-24 bg-white/5"
              animate={
                reducedMotion
                  ? undefined
                  : { x: [0, 3, -2, 0], opacity: [0.35, 0.55, 0.4] }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="absolute bottom-2 left-2 z-[2] font-mono text-[9px] uppercase tracking-[0.4em] text-white/45">
              {subtitle}
            </p>
          </div>
          <div className="flex justify-between gap-2 font-mono text-[7px] uppercase tracking-widest text-white/40">
            <span>ARTIFACT</span>
            <span className="text-[#0047ff]">LOCK</span>
          </div>
        </div>
        <FakeScrollbar heightPx={blockH + 20} />
      </div>
    </PopupWindow>
  );
};
