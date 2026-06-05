import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../../lib/navScroll";

/** Scroll to top on route change; scroll to section when the URL has a hash. */
const ScrollToHash: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, "");
      if (!id) return;
      const run = () => scrollToSection(`#${id}`, "auto");
      requestAnimationFrame(() => requestAnimationFrame(run));
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
