/** Parse profile nav paths like "/#work" into router-friendly segments. */
export function parseNavTo(to: string): { pathname: string; hash?: string } {
  const hashIndex = to.indexOf("#");
  if (hashIndex === -1) return { pathname: to };
  const pathname = to.slice(0, hashIndex) || "/";
  const hash = to.slice(hashIndex);
  return { pathname, hash };
}

export function scrollToSection(hash: string, behavior: ScrollBehavior = "smooth"): boolean {
  const id = hash.replace(/^#/, "");
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

export const HERO_INTERACTIVE_SELECTOR =
  ".split-hero-nav, .split-hero-copy, .split-hero-scroll-cue, a, button";

export function isHeroInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest(HERO_INTERACTIVE_SELECTOR));
}
