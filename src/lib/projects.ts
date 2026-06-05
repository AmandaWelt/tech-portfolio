import { projects } from "../data/projects";
import type { Project } from "../types/portfolio";

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
}
