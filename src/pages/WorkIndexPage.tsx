import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/profile";
import { projects } from "../data/projects";
import WorkProjectGrid from "../components/work/WorkProjectGrid";
import { WORK_CATEGORIES, projectCategory, type WorkCategory } from "../lib/workCategories";

const WorkIndexPage: React.FC = () => {
  const [filter, setFilter] = useState<WorkCategory>("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => projectCategory(p.slug) === filter)),
    [filter],
  );

  return (
    <div className="page-container-wide pb-section pt-24 md:pt-28">
      <Link to="/" className="site-link-muted inline-block font-mono text-[13px]">
        ← Home
      </Link>
      <h1 className="section-heading mt-6">Work</h1>
      <p className="section-body mt-4 max-w-2xl">{site.workIntro}</p>

      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="site-label">Filter by</span>
        {WORK_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`filter-btn ${filter === cat ? "filter-btn-active" : ""}`}
          >
            / {cat}{" "}
            {cat === "All"
              ? String(projects.length).padStart(2, "0")
              : String(projects.filter((p) => projectCategory(p.slug) === cat).length).padStart(2, "0")}
          </button>
        ))}
      </div>

      <WorkProjectGrid projects={filtered} />
    </div>
  );
};

export default WorkIndexPage;
