import React from "react";

import { StandalonePopup } from "./StandalonePopup";

type Props = {
  windowTitle: string;
  year: string;
  widthPx: number;
  minHeightPx: number;
};

/** Tiny AFAN / year stamp — same standalone slab chrome as mock black overlays. */
export const YearStampPopup: React.FC<Props> = ({
  windowTitle,
  year,
  widthPx,
  minHeightPx,
}) => (
  <StandalonePopup title={windowTitle} widthPx={widthPx} minHeightPx={minHeightPx}>
    <p className="text-center font-mono text-2xl font-bold tabular-nums tracking-tight text-white">
      {year}
    </p>
  </StandalonePopup>
);
