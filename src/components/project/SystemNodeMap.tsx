import React from "react";
import type { SystemExplorerLayer } from "../../types/portfolio";
import SystemNode from "./SystemNode";

type Props = {
  layers: SystemExplorerLayer[];
  selectedId: string | null;
  onSelect: (layer: SystemExplorerLayer) => void;
};

const SystemNodeMap: React.FC<Props> = ({ layers, selectedId, onSelect }) => {
  const row1 = layers.slice(0, 3);
  const row2 = layers.slice(3, 6);

  return (
    <div className="relative mx-auto max-w-4xl px-2 md:px-4">
      <svg
        className="pointer-events-none absolute left-1/2 top-[44%] hidden w-[min(100%,520px)] -translate-x-1/2 -translate-y-1/2 md:block"
        viewBox="0 0 400 140"
        aria-hidden
      >
        <path
          d="M 40 35 L 360 35 M 40 105 L 360 105 M 40 35 L 40 105 M 200 35 L 200 105 M 360 35 L 360 105"
          fill="none"
          stroke="rgba(100, 255, 218, 0.12)"
          strokeWidth="1"
        />
      </svg>

      <div className="relative grid gap-3 md:grid-cols-3 md:gap-4">
        {row1.map((layer) => (
          <SystemNode
            key={layer.id}
            layer={layer}
            selected={selectedId === layer.id}
            onSelect={() => onSelect(layer)}
          />
        ))}
      </div>
      {row2.length > 0 ? (
        <div className="relative mt-3 grid gap-3 md:mt-4 md:grid-cols-3 md:gap-4">
          {row2.map((layer) => (
            <SystemNode
              key={layer.id}
              layer={layer}
              selected={selectedId === layer.id}
              onSelect={() => onSelect(layer)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SystemNodeMap;
