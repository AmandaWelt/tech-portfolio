import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatePresence } from "../motion/AnimatePresence";

/**
 * Subtle route transitions. Respects Framer's `useReducedMotion` (synced with OS setting).
 */
const PageTransition: React.FC = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="w-full min-w-0"
        initial={reduceMotion ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -2 }}
        transition={{
          duration: reduceMotion ? 0 : 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
