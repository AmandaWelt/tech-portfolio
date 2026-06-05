import React from "react";
import type { ProjectBackdropKind } from "../../types/portfolio";
import AiugmentRainBackdrop from "./backdrops/AiugmentRainBackdrop";
import PopupJamMapBackdrop from "./backdrops/PopupJamMapBackdrop";

type Props = {
  kind: ProjectBackdropKind;
};

const ProjectDetailBackdrop: React.FC<Props> = ({ kind }) => {
  switch (kind) {
    case "aiugment-rain":
      return <AiugmentRainBackdrop />;
    case "popup-jam-map":
      return <PopupJamMapBackdrop />;
    default:
      return null;
  }
};

export default ProjectDetailBackdrop;
