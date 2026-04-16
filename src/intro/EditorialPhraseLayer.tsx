import React from "react";

export type EditorialPhrase = {
  id: string;
  text: string;
  fontSize: string;
  opacity: number;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  rotate?: number;
  maxWidth?: string;
  lineHeight?: number;
  className?: string;
};

type Props = {
  phrases: readonly EditorialPhrase[];
};

export const EditorialPhraseLayer: React.FC<Props> = ({ phrases }) => (
  <div
    className="pointer-events-none absolute inset-0 z-[8] overflow-hidden"
    aria-hidden
  >
    {phrases.map((p) => (
      <p
        key={p.id}
        className={`absolute font-body font-extralight uppercase tracking-[0.08em] text-white ${p.className ?? ""}`}
        style={{
          left: p.left,
          right: p.right,
          top: p.top,
          bottom: p.bottom,
          fontSize: p.fontSize,
          opacity: p.opacity,
          transform: p.rotate != null ? `rotate(${p.rotate}deg)` : undefined,
          maxWidth: p.maxWidth,
          lineHeight: p.lineHeight ?? 0.92,
        }}
      >
        {p.text}
      </p>
    ))}
  </div>
);
