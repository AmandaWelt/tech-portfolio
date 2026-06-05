import React from "react";
import type { SystemExplorerLayer } from "../../types/portfolio";

type Props = {
  layer: SystemExplorerLayer;
  selected: boolean;
  onSelect: () => void;
};

const SystemNode: React.FC<Props> = ({ layer, selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    className={`group relative flex w-full flex-col overflow-hidden rounded-lg border px-3 py-3.5 text-left transition-colors md:px-4 md:py-4 ${
      selected
        ? "border-accent/35 bg-panel shadow-[0_0_0_1px_rgba(100,255,218,0.08)]"
        : "border-voidline bg-surface hover:border-accent/20 hover:bg-panel"
    }`}
  >
    <span className="absolute right-3 top-3 font-mono text-[9px] uppercase tracking-[0.2em] text-subtle">
      node
    </span>
    <span
      className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      aria-hidden
    />
    <span className="relative z-[1] font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
      {layer.label}
    </span>
    <span className="relative z-[1] mt-2 text-[13px] font-medium leading-snug tracking-[-0.01em] text-ink">
      {layer.headline}
    </span>
  </button>
);

export default SystemNode;
