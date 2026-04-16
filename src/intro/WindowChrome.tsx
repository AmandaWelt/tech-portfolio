import React from "react";

import type { TitleBarAccent } from "./PopupWindow";

type Props = {
  accent: TitleBarAccent;
};

/** Classic − □ × in framed cells (Win9x-style), not three identical dots. */
export const WindowChrome: React.FC<Props> = ({ accent }) => {
  const fg =
    accent === "white"
      ? "text-black"
      : accent === "black"
        ? "text-white"
        : "text-white";

  return (
    <div
      className={`flex shrink-0 items-center gap-[3px] font-mono text-[11px] leading-none ${fg}`}
      aria-hidden
    >
      <span className="inline-flex h-[14px] w-[14px] items-center justify-center border border-current/50">
        −
      </span>
      <span className="inline-flex h-[14px] w-[14px] items-center justify-center border border-current/50">
        □
      </span>
      <span className="inline-flex h-[14px] w-[14px] items-center justify-center border border-current/50 pb-0.5">
        ×
      </span>
    </div>
  );
};
