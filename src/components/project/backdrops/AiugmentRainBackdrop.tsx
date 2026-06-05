import React, { useMemo } from "react";

type BeamKind = "streak" | "fall" | "grain";
type SparkKind = "dot" | "shard" | "glitch";

function beamStyle(i: number): React.CSSProperties {
  const xBand = (i * 0.137) % 1;
  const centerWeight = 1 - Math.min(1, Math.abs(xBand - 0.5) * 1.2);
  const spread = 8 + (1 - centerWeight) * 38;
  const x = 50 + Math.sin(i * 1.73) * spread + ((i * 19) % 100) - 50;
  const clampedX = Math.min(96, Math.max(4, x));
  const y = 16 + ((i * 27.13) % 78);
  const topJag = y < 24 ? (y - 16) / 8 : 1;
  const botJag = y > 86 ? (94 - y) / 8 : 1;
  const edgeFade = Math.min(topJag, botJag);
  const jag = Math.abs(Math.sin(i * 0.847) * Math.cos(i * 1.291));
  const len = 12 + jag * 28 + centerWeight * 10;
  const peak = 0.62 + jag * 0.38 * edgeFade + centerWeight * 0.15;

  return {
    ["--x" as string]: `${clampedX.toFixed(1)}%`,
    ["--y" as string]: `${y.toFixed(1)}%`,
    ["--delay" as string]: `${((i * 0.11) % 4.5).toFixed(2)}s`,
    ["--dur" as string]: `${(2.2 + (i % 7) * 0.28).toFixed(2)}s`,
    ["--drift" as string]: `${((i * 5) % 6) - 3}px`,
    ["--len" as string]: `${len.toFixed(0)}px`,
    ["--peak" as string]: peak.toFixed(2),
  };
}

function beamKind(i: number): BeamKind {
  if (i % 3 === 0) return "streak";
  if (i % 6 === 0) return "grain";
  return "fall";
}

function sparkStyle(i: number): React.CSSProperties {
  return {
    ["--left" as string]: `${((i * 37.17) % 100).toFixed(2)}%`,
    ["--start" as string]: `${(-8 + ((i * 13) % 22)).toFixed(1)}%`,
    ["--travel" as string]: `${95 + (i % 12)}vh`,
    ["--delay" as string]: `${((i * 0.19) % 6).toFixed(2)}s`,
    ["--dur" as string]: `${(2.2 + (i % 5) * 0.55).toFixed(2)}s`,
    ["--drift" as string]: `${((i * 11) % 20) - 10}px`,
  };
}

function sparkKind(i: number): SparkKind {
  if (i % 7 === 0) return "shard";
  if (i % 4 === 0) return "glitch";
  return "dot";
}

const BEAM_COUNT = 240;
const SPARK_COUNT = 96;

const AiugmentRainBackdrop: React.FC = () => {
  const beams = useMemo(
    () => Array.from({ length: BEAM_COUNT }, (_, i) => ({ id: i, kind: beamKind(i), style: beamStyle(i) })),
    [],
  );
  const sparks = useMemo(
    () => Array.from({ length: SPARK_COUNT }, (_, i) => ({ id: i, kind: sparkKind(i), style: sparkStyle(i) })),
    [],
  );

  return (
    <div className="project-backdrop project-backdrop--aiugment" aria-hidden>
      <div className="project-backdrop__base project-backdrop__base--aiugment" />
      <div className="project-backdrop__glow project-backdrop__glow--aiugment" />
      <div className="project-backdrop__beam-rain">
        {beams.map((beam) => (
          <span
            key={beam.id}
            className={`project-beam-spark project-beam-spark--${beam.kind}`}
            style={beam.style}
          />
        ))}
      </div>
      <div className="project-backdrop__spark-rain">
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className={`project-spark project-spark--${spark.kind}`}
            style={spark.style}
          />
        ))}
      </div>
      <div className="project-backdrop__veil project-backdrop__veil--aiugment" />
    </div>
  );
};

export default AiugmentRainBackdrop;
