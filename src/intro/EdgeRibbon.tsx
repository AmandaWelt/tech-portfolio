import React from "react";

type Props = {
  text: string;
  side?: "left" | "right";
};

/** Tall vertical label — poster / ticket strip. */
export const EdgeRibbon: React.FC<Props> = ({ text, side = "left" }) => (
  <div
    className={`pointer-events-none absolute bottom-10 top-10 z-[9] flex items-center ${side === "left" ? "left-[86px]" : "right-2"}`}
    aria-hidden
  >
    <p
      className="max-h-[min(65vh,480px)] font-mono text-[8px] uppercase leading-snug tracking-[0.55em] text-white/[0.16] [writing-mode:vertical-rl] [text-orientation:mixed]"
    >
      {text}
    </p>
  </div>
);
