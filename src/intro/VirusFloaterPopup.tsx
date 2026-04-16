import React from "react";

import { StandalonePopup } from "./StandalonePopup";

export type VirusFloaterKind = "triangleNo" | "hourglass" | "shard";

type Props = {
  title: string;
  kind: VirusFloaterKind;
  /** For `shard`: short glitch lines */
  shardLines?: readonly string[];
  widthPx: number;
  minHeightPx: number;
};

const Tri: React.FC = () => (
  <svg className="h-12 w-12 shrink-0 text-[#f5e100]" viewBox="0 0 32 32" aria-hidden>
    <polygon points="16,2 30,29 2,29" fill="currentColor" stroke="#000" strokeWidth="1.2" />
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

const Hourglass: React.FC = () => (
  <svg
    className="mx-auto h-14 w-10 text-white"
    viewBox="0 0 40 56"
    fill="none"
    aria-hidden
  >
    <path
      d="M4 4h32v8l-10 16 10 16v8H4v-8l10-16L4 12V4z"
      stroke="currentColor"
      strokeWidth="2"
      fill="rgba(0,0,0,0.4)"
    />
    <path d="M8 10h24M8 46h24" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/** Mock right-hand “virus” stack: black slabs, thick white frame, × only — not cascaded Win9x windows. */
export const VirusFloaterPopup: React.FC<Props> = ({
  title,
  kind,
  shardLines = ["TS", "IS"],
  widthPx,
  minHeightPx,
}) => {
  const stripTitle = title.trim() || undefined;

  if (kind === "hourglass") {
    return (
      <StandalonePopup
        title={stripTitle}
        widthPx={widthPx}
        minHeightPx={minHeightPx}
      >
        <div className="flex flex-col items-center justify-center gap-2 py-1">
          <Hourglass />
        </div>
      </StandalonePopup>
    );
  }

  if (kind === "shard") {
    return (
      <StandalonePopup
        title={stripTitle}
        widthPx={widthPx}
        minHeightPx={minHeightPx}
      >
        <div className="flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
          {shardLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </StandalonePopup>
    );
  }

  return (
    <StandalonePopup title={stripTitle} widthPx={widthPx} minHeightPx={minHeightPx}>
      <div className="flex flex-col items-center gap-2">
        <Tri />
        <button
          type="button"
          tabIndex={-1}
          className="intro-win-button w-full px-2 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-black"
        >
          NO
        </button>
      </div>
    </StandalonePopup>
  );
};
