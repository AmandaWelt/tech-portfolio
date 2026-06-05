import React from "react";
import { Link } from "react-router-dom";
import ProjectCardPreview from "./ProjectCardPreview";
import { projectCategory } from "../../lib/workCategories";
import type { Project } from "../../types/portfolio";

type Props = {
  projects: Project[];
  className?: string;
  compact?: boolean;
};

const WorkProjectGrid: React.FC<Props> = ({ projects, className = "mt-10", compact = false }) => (
  <ul
    className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${compact ? "work-project-grid--compact" : ""} ${className}`}
  >
    {projects.map((project) => (
      <li key={project.slug}>
        <Link to={`/work/${project.slug}`} className={`work-card ${compact ? "work-card--compact" : ""}`}>
          <div className="work-card-image">
            <ProjectCardPreview
              image={project.image}
              imageAlt={project.imageAlt ?? project.title}
              livePreview={project.livePreview}
            />
          </div>
          <div className={compact ? "p-4" : "p-5"}>
            <p className="font-mono text-[11px] text-accent">{projectCategory(project.slug)}</p>
            <h3
              className={`font-display font-medium text-ink ${compact ? "mt-1.5 text-[1rem] leading-snug" : "mt-2 text-[1.05rem]"}`}
            >
              {project.title}
            </h3>
            <p className={`section-body text-muted ${compact ? "mt-1.5 line-clamp-2 text-[13px] leading-snug" : "mt-2 text-[14px]"}`}>
              {project.tagline}
            </p>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);

export default WorkProjectGrid;
