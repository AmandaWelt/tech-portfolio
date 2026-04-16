import React from "react";
import { motion } from "framer-motion";

import { FakeScrollbar } from "./FakeScrollbar";
import { PopupWindow } from "./PopupWindow";

type Props = {
  title: string;
  caption: string;
  widthPx: number;
  minHeightPx: number;
  reducedMotion: boolean;
  variant: "hero" | "support";
  portraitSrc?: string;
  /** Hide footer “RAW · BUFFER / LOCK” row for tighter mock stacks. */
  hideMetaRow?: boolean;
  /** Second portrait in mock: same blue window, different photo, on top of the cascade. */
  portraitStack?: "cascade" | "foreground";
};

export const DitherPortraitPopup: React.FC<Props> = ({
  title,
  caption,
  widthPx,
  minHeightPx,
  reducedMotion,
  variant,
  portraitSrc,
  hideMetaRow = false,
  portraitStack = "cascade",
}) => {
  const isHero = variant === "hero";
  const isForeground = portraitStack === "foreground";
  const panelH = Math.max(isHero ? 168 : 120, minHeightPx - 56);

  return (
    <PopupWindow
      title={title}
      accent="blue"
      widthPx={widthPx}
      minHeightPx={minHeightPx}
      rotationDeg={0}
      tone="art"
      heroChrome={isHero}
      windowClassName="overflow-visible"
    >
      <div className="flex gap-1.5">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div
            className={`intro-dither-panel relative overflow-hidden border border-white/25 ${isHero ? "intro-dither-panel--hero" : ""} ${portraitSrc ? "intro-dither-panel--photo" : ""} ${isForeground ? "intro-dither-panel--foreground" : ""}`}
            style={{ height: panelH }}
          >
            {portraitSrc ? (
              <img
                src={portraitSrc}
                alt=""
                className={`intro-hero-portrait-img ${isForeground ? "intro-hero-portrait-img--foreground" : ""}`}
                draggable={false}
                loading="eager"
                decoding="async"
                role="presentation"
              />
            ) : (
              <>
                <div className="intro-dither-silhouette" />
                <div className="intro-dither-head" />
              </>
            )}

            <div className="intro-dither-halftone" />

            {!isForeground && !reducedMotion && (
              <motion.div
                className="intro-dither-smear top-[36%]"
                animate={{ opacity: [0.35, 0.75, 0.4] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {!isForeground && !reducedMotion && (
              <>
                <motion.div
                  className="intro-glitch-strip top-[22%]"
                  animate={{ opacity: [0.35, 0.85, 0.45] }}
                  transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="intro-glitch-strip top-[58%] h-[3px]"
                  animate={{ opacity: [0.25, 0.7, 0.35] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.09] to-transparent" />
            <p
              className={`absolute bottom-1.5 left-2 z-[2] max-w-[92%] uppercase leading-snug text-white/55 ${isHero ? "font-body text-[9px] tracking-[0.28em]" : "font-mono text-[8px] tracking-[0.35em]"}`}
            >
              {caption}
            </p>
          </div>
          {!hideMetaRow && (
            <div className="flex justify-between gap-2 font-mono text-[7px] uppercase tracking-widest text-white/30">
              <span>{isHero ? "RAW · WITNESS · BUFFER" : "RAW · BUFFER"}</span>
              <span className="text-[#0000ff]/90">LOCK</span>
            </div>
          )}
        </div>
        <FakeScrollbar heightPx={panelH + 28} />
      </div>
    </PopupWindow>
  );
};
