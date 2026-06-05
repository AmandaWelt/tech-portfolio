import { ChevronDown } from "lucide-react";
import React from "react";
import { scrollToSection } from "../../lib/navScroll";

/** Mobile-only hint — hero uses touch-none for the split scrub, so vertical scroll needs a tap target. */
const HeroScrollCue: React.FC = () => {
  const handleScroll = () => {
    scrollToSection("#expertise", "smooth");
  };

  return (
    <button
      type="button"
      className="split-hero-scroll-cue lg:hidden"
      aria-label="Scroll to content"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={handleScroll}
    >
      <ChevronDown className="split-hero-scroll-cue__icon" strokeWidth={1.75} aria-hidden />
    </button>
  );
};

export default HeroScrollCue;
