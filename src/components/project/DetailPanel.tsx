import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SystemExplorerLayer } from "../../types/portfolio";

type Props = {
  layer: SystemExplorerLayer;
  onClose: () => void;
};

const DetailPanel: React.FC<Props> = ({ layer, onClose }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      role="dialog"
      aria-modal="true"
      aria-labelledby="explorer-panel-title"
      initial={reduceMotion ? false : { x: 28, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={reduceMotion ? undefined : { x: 16, opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-y-0 right-0 z-[120] flex w-full max-w-md flex-col border-l border-voidline bg-panel shadow-[-16px_0_48px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center justify-between border-b border-voidline bg-void px-5 py-4">
        <h2
          id="explorer-panel-title"
          className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted"
        >
          Layer
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-2.5 py-1.5 text-[12px] font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          Close
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-panel px-5 py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{layer.label}</p>
        <p className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-ink">{layer.headline}</p>
        <ul className="mt-8 space-y-4 text-[14px] leading-[1.55] text-muted">
          {layer.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-2.5 h-px w-3 shrink-0 bg-accent/40" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
};

export default DetailPanel;
