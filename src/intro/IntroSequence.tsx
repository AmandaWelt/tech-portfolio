import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import "./intro.css";

import {
  BOOT_LINES,
  INTRO_TIMINGS,
  INTRO_TIMINGS_REDUCED,
  POPUP_SPAWN,
  POPUPS,
  gatePhaseAtMs,
  loadingBarDurationMs,
  markIntroSeen,
  type IntroTimings,
  type PopupDef,
} from "./introConfig";
import { EnterSiteGate } from "./EnterSiteGate";
import { PosterBackdrop } from "./PosterBackdrop";
import { AddressBarPopup } from "./AddressBarPopup";
import { DitherPortraitPopup } from "./DitherPortraitPopup";
import { FareInfoPopup } from "./FareInfoPopup";
import { LoadingPopup } from "./LoadingPopup";
import { TicketGatePopup } from "./TicketGatePopup";
import { VickiBannerPopup } from "./VickiBannerPopup";
import { VirusFloaterPopup } from "./VirusFloaterPopup";
import { WarningPopup } from "./WarningPopup";
import { YearStampPopup } from "./YearStampPopup";
import { FloatingDatePopup } from "./FloatingDatePopup";
import { SystemArtPopup } from "./SystemArtPopup";
import { FragmentPopup } from "./FragmentPopup";

type Phase =
  | "boot"
  | "infection"
  | "overload"
  | "gate"
  | "exit";

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type IntroSequenceProps = {
  onComplete: () => void;
};

const sortedPopups = [...POPUPS].sort((a, b) => a.order - b.order);

function anchorX(def: PopupDef): string {
  const ox = def.offsetXPx ?? 0;
  return `calc(${def.leftPct}% + ${ox}px)`;
}

function anchorY(def: PopupDef): string {
  const oy = def.offsetYPx ?? 0;
  return `calc(${def.topPct}% + ${oy}px)`;
}

/** Uses per-popup `spawnDelayMs` when set; otherwise `order * popupStaggerMs`. */
function spawnDelaySec(
  def: PopupDef,
  timings: IntroTimings,
  reducedMotion: boolean
): number {
  const ms = def.spawnDelayMs ?? def.order * timings.popupStaggerMs;
  const scaled = reducedMotion ? ms * 1.18 : ms;
  return scaled / 1000;
}

function renderPopupContent(
  def: PopupDef,
  reducedMotion: boolean,
  liveLoadingProgress: number
) {
  switch (def.kind) {
    case "loading":
      return (
        <LoadingPopup
          title={def.title}
          label={def.label}
          progress={liveLoadingProgress}
          widthPx={def.widthPx}
          minHeightPx={def.minHeightPx}
          chrome={def.chrome}
          prefaceLine={def.prefaceLine}
          banner={def.banner}
          subBanner={def.subBanner}
        />
      );
    case "warning":
      return (
        <WarningPopup
          title={def.title}
          code={def.code}
          message={def.message}
          widthPx={def.widthPx}
          minHeightPx={def.minHeightPx}
          chrome={def.chrome}
        />
      );
    case "art":
      return (
        <SystemArtPopup
          title={def.title}
          subtitle={def.subtitle}
          widthPx={def.widthPx}
          minHeightPx={def.minHeightPx}
          reducedMotion={reducedMotion}
        />
      );
    case "fragment":
      return (
        <FragmentPopup
          title={def.title}
          lines={def.lines}
          editorial={def.editorial}
          widthPx={def.widthPx}
          minHeightPx={def.minHeightPx}
          microLine={def.microLine}
          verticalLabel={def.verticalLabel}
          addressStrip={def.addressStrip}
        />
      );
    case "dither":
      return (
        <DitherPortraitPopup
          title={def.title}
          caption={def.caption}
          widthPx={def.widthPx}
          minHeightPx={def.minHeightPx}
          reducedMotion={reducedMotion}
          variant={def.dominant ? "hero" : "support"}
          portraitSrc={def.portraitSrc}
          hideMetaRow={def.hideMetaRow}
          portraitStack={def.portraitStack ?? "cascade"}
        />
      );
    case "address":
      return (
        <AddressBarPopup urlLine={def.urlLine} widthPx={def.widthPx} />
      );
    case "fare":
      return (
        <FareInfoPopup
          title={def.title}
          codesLine={def.codesLine}
          buttons={def.buttons}
          widthPx={def.widthPx}
          minHeightPx={def.minHeightPx}
        />
      );
    case "ticketGate":
      return (
        <TicketGatePopup
          title={def.title}
          headline={def.headline}
          actionLabel={def.actionLabel}
          widthPx={def.widthPx}
          minHeightPx={def.minHeightPx}
        />
      );
    case "virusFloater":
      return (
        <VirusFloaterPopup
          title={def.title}
          kind={def.floater}
          shardLines={def.shardLines}
          widthPx={def.widthPx}
          minHeightPx={def.minHeightPx}
        />
      );
    case "vickiBanner":
      return (
        <VickiBannerPopup
          text={def.displayText}
          widthPx={def.widthPx}
          minHeightPx={def.minHeightPx}
        />
      );
    case "yearStamp":
      return (
        <YearStampPopup
          windowTitle={def.stampTitle}
          year={def.year}
          widthPx={def.widthPx}
          minHeightPx={def.minHeightPx}
        />
      );
    case "dateFloat":
      return (
        <FloatingDatePopup topLine={def.topLine} bottomLine={def.bottomLine} />
      );
    default:
      return null;
  }
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const reducedMotion = useReducedMotion();
  const timings = reducedMotion ? INTRO_TIMINGS_REDUCED : INTRO_TIMINGS;

  const [phase, setPhase] = useState<Phase>("boot");
  const [bootLineIndex, setBootLineIndex] = useState(0);
  const [liveLoadingProgress, setLiveLoadingProgress] = useState(0);
  const timersRef = useRef<number[]>([]);
  const exitStartedRef = useRef(false);
  const introMountTimeRef = useRef<number>(performance.now());

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    markIntroSeen();
    onComplete();
  }, [clearTimers, onComplete]);

  const finishRef = useRef(finish);
  finishRef.current = finish;

  const schedule = useCallback(
    (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
    },
    []
  );

  useEffect(() => {
    const t = reducedMotion ? INTRO_TIMINGS_REDUCED : INTRO_TIMINGS;
    const infectionEnd = t.bootMs + t.infectionDurationMs;
    const overloadEnd = infectionEnd + t.overloadMs;

    schedule(() => setPhase("infection"), t.bootMs);
    schedule(() => setPhase("overload"), infectionEnd);
    schedule(() => setPhase("gate"), overloadEnd);

    return () => clearTimers();
  }, [clearTimers, reducedMotion, schedule]);

  /** Loading bar: 0% until boot ends, then 0→100% over infection+overload, 100% at gate. */
  useEffect(() => {
    const boot = timings.bootMs;
    const gateAt = gatePhaseAtMs(timings);
    const span = loadingBarDurationMs(timings);
    const t0 = introMountTimeRef.current;

    const tick = () => {
      const elapsed = performance.now() - t0;
      if (elapsed < boot) {
        setLiveLoadingProgress(0);
        return;
      }
      if (elapsed >= gateAt) {
        setLiveLoadingProgress(1);
        return;
      }
      setLiveLoadingProgress(Math.min(1, Math.max(0, (elapsed - boot) / span)));
    };

    tick();
    const id = window.setInterval(tick, 40);
    return () => window.clearInterval(id);
  }, [timings]);

  useEffect(() => {
    if (phase !== "exit") return undefined;
    const id = window.setTimeout(() => {
      finishRef.current();
    }, timings.exitFadeMs);
    return () => window.clearTimeout(id);
  }, [phase, timings.exitFadeMs]);

  useEffect(() => {
    if (phase !== "boot") return undefined;
    const id = window.setInterval(() => {
      setBootLineIndex((i) => (i + 1) % BOOT_LINES.length);
    }, reducedMotion ? 600 : 420);
    return () => window.clearInterval(id);
  }, [phase, reducedMotion]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const skipIntro = useCallback(() => {
    clearTimers();
    finish();
  }, [clearTimers, finish]);

  const enterSite = useCallback(() => {
    if (exitStartedRef.current) return;
    exitStartedRef.current = true;
    setPhase("exit");
  }, []);

  const showPopups = phase !== "boot";

  const popupTransition = useMemo(() => {
    const spawnDur = reducedMotion
      ? Math.min(0.06, POPUP_SPAWN.durationSec * 0.6)
      : POPUP_SPAWN.durationSec;
    const spawnEase = reducedMotion ? ([0, 0, 1, 1] as const) : POPUP_SPAWN.easeOut;
    return {
      spawn: {
        opacity: {
          duration: spawnDur,
          ease: spawnEase,
        },
        scale: {
          duration: spawnDur,
          ease: spawnEase,
        },
      },
    };
  }, [reducedMotion]);

  return (
    <motion.div
      className="intro-root intro-canvas fixed inset-0 z-[100] text-white"
      role="presentation"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: timings.exitFadeMs / 1000, ease: EASE_OUT_EXPO }}
    >
      <PosterBackdrop />
      <div className="intro-film-grain" />
      <div className="intro-scanlines" />
      <div className="intro-noise" />
      <div className="intro-vignette" />

      <button
        type="button"
        onClick={skipIntro}
        className="absolute right-4 top-4 z-[120] border border-white/25 bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.35em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
      >
        Skip intro
      </button>

      {phase === "boot" && (
        <motion.div
          className="absolute inset-0 z-[40] flex flex-col items-center justify-center gap-6 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-[9px] uppercase tracking-[0.65em] text-white/35">
            Computer interface · data loading
          </p>
          <motion.p
            key={bootLineIndex}
            className="intro-boot-line font-body text-xs text-white/80 sm:text-sm"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {BOOT_LINES[bootLineIndex]}
          </motion.p>
        </motion.div>
      )}

      <div className="absolute inset-0 overflow-visible">
        {showPopups &&
          sortedPopups.map((def) => (
            <motion.div
              key={def.id}
              className="absolute will-change-transform"
              style={{
                zIndex: def.zIndex,
              }}
              initial={{
                opacity: 0,
                scale: reducedMotion
                  ? Math.min(0.96, POPUP_SPAWN.fromScale + 0.08)
                  : POPUP_SPAWN.fromScale,
                left: anchorX(def),
                top: anchorY(def),
                rotate: def.rotationDeg,
              }}
              animate={{
                left: anchorX(def),
                top: anchorY(def),
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                rotate: def.rotationDeg,
              }}
              transition={{
                opacity: {
                  ...popupTransition.spawn.opacity,
                  delay: spawnDelaySec(def, timings, !!reducedMotion),
                },
                scale: {
                  ...popupTransition.spawn.scale,
                  delay: spawnDelaySec(def, timings, !!reducedMotion),
                },
                left: { duration: 0 },
                top: { duration: 0 },
                rotate: { duration: 0 },
                x: { duration: 0 },
                y: { duration: 0 },
              }}
            >
              {renderPopupContent(def, !!reducedMotion, liveLoadingProgress)}
            </motion.div>
          ))}
      </div>

      <EnterSiteGate
        visible={phase === "gate"}
        onEnter={enterSite}
        reducedMotion={!!reducedMotion}
      />
    </motion.div>
  );
};
