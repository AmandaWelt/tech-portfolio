import React from "react";
import { motion } from "framer-motion";

import { ENTER_SITE_LABEL, GATE_LINES } from "./introConfig";

type Props = {
  visible: boolean;
  onEnter: () => void;
  reducedMotion: boolean;
};

export const EnterSiteGate: React.FC<Props> = ({
  visible,
  onEnter,
  reducedMotion,
}) => {
  if (!visible) return null;

  const t = reducedMotion ? 0.2 : 0.55;

  return (
    <motion.div
      className="absolute inset-0 z-[70] flex flex-col items-center justify-center gap-10 bg-black px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: t, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        {GATE_LINES.map((line, i) => (
          <motion.p
            key={line}
            className="font-body text-sm uppercase tracking-[0.55em] text-white/90 sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? 0 : 0.06 * i,
              duration: reducedMotion ? 0.15 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={onEnter}
        className="border-2 border-white bg-black px-8 py-3 font-body text-xs uppercase tracking-[0.45em] text-white transition-colors hover:border-[#0047ff] hover:text-white"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: reducedMotion ? 0 : 0.2,
          duration: reducedMotion ? 0.15 : 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {ENTER_SITE_LABEL}
      </motion.button>
    </motion.div>
  );
};
