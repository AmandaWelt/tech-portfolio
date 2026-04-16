import React from "react";

type Props = {
  /** Total height of the scrollbar track area (arrows + thumb channel). */
  heightPx?: number;
  className?: string;
};

/** Win9x-style vertical scrollbar: grey track, thumb, pixel arrow blocks. */
export const FakeScrollbar: React.FC<Props> = ({
  heightPx = 100,
  className = "",
}) => (
  <div
    className={`flex w-[11px] shrink-0 flex-col border border-[#1a1a1a] bg-[#c4c4c4] ${className}`}
    style={{ height: heightPx }}
    aria-hidden
  >
    <div className="flex h-[10px] shrink-0 items-center justify-center border-b border-[#6a6a6a] bg-[#d8d8d8] text-[6px] leading-none text-black">
      ▲
    </div>
    <div className="relative min-h-0 flex-1 bg-[#9a9a9a]">
      <div
        className="absolute left-[1px] right-[1px] top-[18%] border border-[#4a4a4a] bg-[#dcdcdc] shadow-[inset_1px_1px_0_#fff]"
        style={{ height: "42%" }}
      />
    </div>
    <div className="flex h-[10px] shrink-0 items-center justify-center border-t border-[#6a6a6a] bg-[#d8d8d8] text-[6px] leading-none text-black">
      ▼
    </div>
  </div>
);
