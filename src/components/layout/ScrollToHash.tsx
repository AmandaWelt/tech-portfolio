import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../../lib/navScroll";

/** Scroll to in-page section when the URL hash changes (e.g. /#work). */
const ScrollToHash: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const run = () => scrollToSection(`#${id}`);
    requestAnimationFrame(run);
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
