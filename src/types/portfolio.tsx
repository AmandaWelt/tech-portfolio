export type ProjectStatus = "Production" | "Development";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  status: ProjectStatus;
  link?: string;   // live site
  repo?: string;   // GitHub
  image?: string;  // imported asset or /public path
  imageAlt?: string;
  gallery?: string[];
};

export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  /** Optional; shown as a single line after bullets (e.g. "Tech: …"). */
  footer?: string;
  highlights: string[];
};
