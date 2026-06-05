import React from "react";

/** Faint film grain only — no grid. Stays peripheral so the UI reads first. */
const GrainBackdrop: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
    <div className="site-grain absolute inset-0 opacity-[0.055] motion-safe:animate-grain-shift" />
  </div>
);

export default GrainBackdrop;
