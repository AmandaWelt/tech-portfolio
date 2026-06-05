import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatePresence } from "../motion/AnimatePresence";
import { X } from "lucide-react";
import type { Project, SystemExplorerLayer } from "../../types/portfolio";
import SystemNodeMap from "./SystemNodeMap";
import DetailPanel from "./DetailPanel";

type Props = {
  project: Project;
  open: boolean;
  onClose: () => void;
};

const ExperienceMode: React.FC<Props> = ({ project, open, onClose }) => {
  const reduceMotion = useReducedMotion();
  const explorer = project.systemExplorer;
  const [selected, setSelected] = useState<SystemExplorerLayer | null>(null);

  const layers = explorer?.layers ?? [];

  const handleClose = useCallback(() => {
    setSelected(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      setSelected(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!explorer?.enabled || layers.length === 0) return null;

  const node = (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="experience-mode"
          role="presentation"
          className="experience-mode fixed inset-0 z-[110] flex flex-col bg-void text-ink"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] motion-safe:animate-grain-shift">
            <div className="site-grain h-full w-full" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.2]"
            aria-hidden
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.24]"
            aria-hidden
            style={{
              background:
                "radial-gradient(circle at 24% 72%, rgba(255,255,255,0.12) 0 1px, transparent 2px), radial-gradient(circle at 58% 64%, rgba(255,255,255,0.09) 0 1px, transparent 2px), radial-gradient(circle at 80% 28%, rgba(224,113,74,0.45) 0 2px, transparent 3px)",
            }}
          />
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[40vh] w-full opacity-35 md:block"
            viewBox="0 0 1200 320"
            aria-hidden
          >
            <path
              d="M40 270 C 180 120, 280 120, 420 270 S 660 420, 800 270 S 1020 120, 1160 270"
              fill="none"
              stroke="rgba(255,255,255,0.42)"
              strokeWidth="1.2"
            />
            <path
              d="M40 300 C 180 150, 280 150, 420 300 S 660 450, 800 300 S 1020 150, 1160 300"
              fill="none"
              stroke="rgba(255,255,255,0.26)"
              strokeWidth="1"
            />
          </svg>

          <header className="relative z-10 flex items-start justify-between gap-4 border-b border-voidline bg-void/95 px-4 py-4 backdrop-blur-sm md:px-6">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                System explorer
              </p>
              <h2 className="mt-1 text-[17px] font-semibold tracking-tight text-ink md:text-[19px]">{project.title}</h2>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-subtle">
                Architecture map / interactive layers
              </p>
              {explorer.intro ? (
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">{explorer.intro}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-voidline bg-surface px-3 py-2 text-[12px] font-semibold text-ink transition-colors hover:border-accent/30 hover:bg-panel"
              aria-label="Close system explorer"
            >
              <X className="h-4 w-4" strokeWidth={1.5} aria-hidden />
              Exit
            </button>
          </header>

          <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-3 py-6 md:px-6 md:py-8">
              <SystemNodeMap layers={layers} selectedId={selected?.id ?? null} onSelect={setSelected} />
            </div>
          </div>

          <AnimatePresence>
            {selected ? (
              <DetailPanel
                key={selected.id}
                layer={selected}
                onClose={() => setSelected(null)}
              />
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return createPortal(node, document.body);
};

export default ExperienceMode;
