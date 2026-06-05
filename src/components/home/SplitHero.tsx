import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../../data/profile";
import { publicAsset } from "../../lib/publicAsset";
import { isHeroInteractiveTarget } from "../../lib/navScroll";
import BuildSideDeco from "./BuildSideDeco";
import SketchDrawOverlay from "./SketchDrawOverlay";
import SplitHeroNav from "./SplitHeroNav";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const SKETCH_EXPAND_THRESHOLD = 50;

const SplitHero: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const metricsRef = useRef({ left: 0, width: 1 });
  const dragRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pendingXRef = useRef<number | null>(null);
  const scrubIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sketchExpandedRef = useRef(false);
  const [sketchExpanded, setSketchExpanded] = useState(false);

  const syncMetrics = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    metricsRef.current = { left: rect.left, width: rect.width };
  }, []);

  const syncSketchDraw = useCallback((split: number) => {
    const expanded = split > SKETCH_EXPAND_THRESHOLD;
    if (expanded === sketchExpandedRef.current) return;
    sketchExpandedRef.current = expanded;
    setSketchExpanded(expanded);
  }, []);

  const flushSplit = useCallback(() => {
    rafRef.current = null;
    const el = rootRef.current;
    const x = pendingXRef.current;
    if (!el || x === null) return;
    const { left, width } = metricsRef.current;
    const split = clamp(((x - left) / width) * 100, 12, 88);
    el.style.setProperty("--split", String(split));
    syncSketchDraw(split);
  }, [syncSketchDraw]);

  const scheduleSplit = useCallback(
    (clientX: number) => {
      pendingXRef.current = clientX;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(flushSplit);
    },
    [flushSplit],
  );

  const endDrag = useCallback(() => {
    dragRef.current = false;
    rootRef.current?.classList.remove("is-dragging");
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    flushSplit();
  }, [flushSplit]);

  const markScrubbing = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    el.classList.add("is-scrubbing");
    if (scrubIdleRef.current) clearTimeout(scrubIdleRef.current);
    scrubIdleRef.current = setTimeout(() => {
      el.classList.remove("is-scrubbing");
      scrubIdleRef.current = null;
    }, 150);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--split", "50");
    syncMetrics();
    const ro = new ResizeObserver(syncMetrics);
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (scrubIdleRef.current) clearTimeout(scrubIdleRef.current);
    };
  }, [syncMetrics]);

  const onPointerEnter = () => {
    syncMetrics();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (isHeroInteractiveTarget(e.target)) return;
    const el = rootRef.current;
    if (!el) return;
    syncMetrics();
    dragRef.current = true;
    el.classList.add("is-dragging");
    el.setPointerCapture(e.pointerId);
    scheduleSplit(e.clientX);
    markScrubbing();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current && isHeroInteractiveTarget(e.target)) return;
    scheduleSplit(e.clientX);
    markScrubbing();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    rootRef.current?.releasePointerCapture(e.pointerId);
    endDrag();
  };

  const onPointerCancel = () => {
    endDrag();
  };

  const { design, build, portrait, portraitSketch, sketchBackground } = site.splitHero;
  const portraitColorSrc = publicAsset(portrait);
  const portraitSketchSrc = publicAsset(portraitSketch ?? portrait);
  const sketchBgSrc = publicAsset(sketchBackground);

  return (
    <section
      id="home"
      ref={rootRef}
      className="split-hero"
      onPointerEnter={onPointerEnter}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onLostPointerCapture={onPointerCancel}
    >
      <h1 className="sr-only">{site.name}</h1>
      <SplitHeroNav />

      <div className="split-hero-panel split-hero-panel--build">
        <BuildSideDeco />

        <div className="split-hero-copy split-hero-copy--build">
          <h2 className="split-hero-headline split-hero-headline--build">
            {build.headlineLead}{" "}
            <span className="split-hero-headline-accent--build">
              {build.headlineAccent}
              <span className="split-hero-cursor" aria-hidden>
                _
              </span>
              .
            </span>
          </h2>
          <Link to={build.ctaTo} className="split-hero-cta split-hero-cta--build">
            {build.ctaLabel} →
          </Link>
        </div>
      </div>

      <div className="split-hero-sketch-bg" aria-hidden>
        <img src={sketchBgSrc} alt="" decoding="async" className="split-hero-sketch-bg__img" />
      </div>

      <div className="split-hero-panel split-hero-panel--design" aria-hidden />

      <div className="split-hero-copy split-hero-copy--design">
        <h2 className="split-hero-headline split-hero-headline--design">
          {design.headlineLead}{" "}
          <span className="split-hero-headline-accent--design">{design.headlineAccent}</span>
        </h2>
      </div>

      {sketchExpanded && (
        <div className="split-hero-live-sketch" aria-hidden>
          <SketchDrawOverlay active={sketchExpanded} />
        </div>
      )}

      <div className="split-hero-portrait-stack" aria-hidden>
        <div className="split-hero-portrait-layer split-hero-portrait-layer--color">
          <div className="split-hero-portrait-frame">
            <img src={portraitColorSrc} alt="" className="split-hero-portrait__img" decoding="async" />
          </div>
        </div>
        <div className="split-hero-portrait-layer split-hero-portrait-layer--sketch">
          <div className="split-hero-portrait-frame">
            <img src={portraitSketchSrc} alt="" className="split-hero-portrait__img split-hero-portrait__img--sketch" decoding="async" />
          </div>
        </div>
      </div>

      <div className="split-hero-handle" aria-hidden>
        <span className="split-hero-handle-grip" />
      </div>
    </section>
  );
};

export default SplitHero;
