export type ProjectBackdropKind = "aiugment-rain" | "popup-jam-map";

export type ProjectStatus = "Production" | "Development";

/** Layer identifiers for the optional System Explorer (Experience Mode). */
export type SystemExplorerLayerId =
  | "ui"
  | "state"
  | "api"
  | "logic"
  | "metrics"
  | "lessons";

export type SystemExplorerLayer = {
  id: SystemExplorerLayerId;
  /** Short label on the node, e.g. "UI" */
  label: string;
  /** One line under the label */
  headline: string;
  bullets: string[];
};

/**
 * Optional interactive deconstruction per project.
 * Set `enabled: false` to hide “Explore System” entirely.
 */
export type ProjectSystemExplorer = {
  enabled: boolean;
  /** Shown at top of explorer overlay */
  intro?: string;
  /** Typically six layers; order defines default reading order. */
  layers: SystemExplorerLayer[];
};

export type Project = {
  slug: string;
  tagline: string;
  title: string;
  /** System View — overview */
  description: string;
  problem: string;
  solution: string;
  /** Ownership and scope in plain language */
  myRole: string;
  /** Architecture narrative (short paragraphs or bullets as strings) */
  architecture: string[];
  technicalDecisions: string[];
  /** Shipped capabilities (recruiter-scannable) */
  features: string[];
  tech: string[];
  impact: string[];
  /** Placeholder until you wire real metrics, e.g. "Latency p95 — target &lt;800ms" */
  impactMetric: string;
  lessonsLearned: string[];
  /** Your title on this work, e.g. "Lead frontend / full-stack" */
  role: string;
  status: ProjectStatus;
  link?: string;
  repo?: string;
  /** External URL to embed as a live preview (e.g. marketing site hero). */
  livePreview?: string;
  /** Path under public/ to an interactive demo hub, e.g. /sapo-demo/ */
  demo?: string;
  /** Individual demo pages when a project has multiple prototypes */
  demoLinks?: { label: string; href: string }[];
  image?: string;
  imageAlt?: string;
  gallery?: string[];
  /** Immersive fixed backdrop on the project detail page */
  backdrop?: ProjectBackdropKind;
  systemExplorer?: ProjectSystemExplorer;
};

export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  footer?: string;
  highlights: string[];
};
