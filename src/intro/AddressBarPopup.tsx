import React from "react";

import { WindowChrome } from "./WindowChrome";

type Props = {
  urlLine: string;
  widthPx: number;
};

/** Full-width mock “Address” strip — white slab + blue URL field + chrome. */
export const AddressBarPopup: React.FC<Props> = ({ urlLine, widthPx }) => (
  <div
    className="intro-address-bar select-none border-2 border-black bg-white text-black shadow-[4px_4px_0_rgba(0,0,0,0.85)]"
    style={{ width: `min(${widthPx}px, 92vw)` }}
  >
    <div className="flex min-h-[38px] items-stretch border-b-2 border-black">
      <span className="flex shrink-0 items-center border-r border-black/25 px-2.5 font-serif text-[13px] text-black/80">
        Address
      </span>
      <div className="flex min-w-0 flex-1 items-center bg-[#0000ff] px-2">
        <span className="truncate font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white">
          {urlLine}
        </span>
      </div>
      <div className="flex shrink-0 items-center bg-[#0000ff] px-1">
        <WindowChrome accent="blue" />
      </div>
    </div>
  </div>
);
