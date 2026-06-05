import { projects } from "../data/projects";

export const WORK_CATEGORIES = [
  "All",
  "Enterprise Applications",
  "Applied AI Systems",
  "Landing Pages",
  "Product Prototypes",
] as const;
export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export type WorkScopeCategory = Exclude<WorkCategory, "All">;

export const WORK_SCOPE_CATEGORIES: WorkScopeCategory[] = [
  "Enterprise Applications",
  "Applied AI Systems",
  "Landing Pages",
  "Product Prototypes",
];

export const WORK_SCOPE_LABELS: Record<WorkScopeCategory, string> = {
  "Enterprise Applications": "Enterprise",
  "Applied AI Systems": "Applied AI",
  "Landing Pages": "Landing pages",
  "Product Prototypes": "Prototypes",
};

export const projectCategory = (slug: string): WorkScopeCategory => {
  if (slug === "ai-chatbot-saas" || slug === "aiugment") return "Applied AI Systems";
  if (slug === "modular-business-card") return "Landing Pages";
  if (slug === "popup-jam") return "Product Prototypes";
  return "Enterprise Applications";
};

/** Flagship case studies on the homepage. */
export const homepageProjects = projects.slice(0, 3);

export function getWorkScopeCounts() {
  const byCategory = Object.fromEntries(
    WORK_SCOPE_CATEGORIES.map((category) => [
      category,
      projects.filter((p) => projectCategory(p.slug) === category).length,
    ]),
  ) as Record<WorkScopeCategory, number>;

  return {
    total: projects.length,
    featured: homepageProjects.length,
    byCategory,
  };
}
