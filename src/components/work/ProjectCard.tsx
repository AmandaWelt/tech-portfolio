import React from "react";
import { Link } from "react-router-dom";
import ProjectCardPreview from "./ProjectCardPreview";
import type { Project } from "../../types/portfolio";

type Props = {
  project: Project;
  variant?: "featured" | "compact";
};

const ProjectCard: React.FC<Props> = ({ project: p }) => (
  <article>
    <Link to={`/work/${p.slug}`} className="work-card">
      <div className="work-card-image">
        <ProjectCardPreview
          image={p.image}
          imageAlt={p.imageAlt ?? p.title}
          livePreview={p.livePreview}
        />
      </div>
      <div className="px-1 py-4">
        <h2 className="text-[15px] font-medium text-ink">{p.title}</h2>
        <p className="mt-1 text-[14px] leading-relaxed text-muted">{p.tagline}</p>
        {p.impactMetric ? (
          <p className="mt-2 text-[13px] text-subtle">{p.impactMetric}</p>
        ) : null}
      </div>
    </Link>
  </article>
);

export default ProjectCard;
