import React from "react";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";

type Props = {
  variant?: "featured" | "compact";
  showHeading?: boolean;
};

/** @deprecated Use FeaturedWork on the homepage. Kept for backward compatibility. */
const SelectedWork: React.FC<Props> = ({ variant = "featured", showHeading = true }) => (
  <section className="border-b border-hairline bg-canvas">
    <div className="editorial-container py-section">
      {showHeading ? (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="editorial-kicker">Selected work</h2>
          <Link to="/work" className="editorial-link">
            Full index
          </Link>
        </div>
      ) : null}

      <div
        className={`grid ${variant === "compact" ? "mt-14 gap-8 sm:grid-cols-2 lg:grid-cols-3" : "mt-14 gap-10 md:grid-cols-2"}`}
      >
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} variant={variant} />
        ))}
      </div>
    </div>
  </section>
);

export default SelectedWork;
