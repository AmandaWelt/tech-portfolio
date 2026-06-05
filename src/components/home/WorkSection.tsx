import React from "react";
import { Link } from "react-router-dom";
import { site } from "../../data/profile";
import { getWorkScopeCounts, homepageProjects, WORK_SCOPE_CATEGORIES, WORK_SCOPE_LABELS } from "../../lib/workCategories";
import WorkProjectGrid from "../work/WorkProjectGrid";

const WorkSection: React.FC = () => {
  const scope = getWorkScopeCounts();

  return (
    <section id="work" className="work-section-home border-t border-hairline">
      <div className="work-section-home__inner page-container-wide">
        <div className="work-section-home__header">
          <h2 className="section-heading">Work</h2>
          <p className="work-section-home__intro section-body mt-2 max-w-2xl">{site.workIntro}</p>
        </div>

        <WorkProjectGrid projects={homepageProjects} compact className="work-section-home__grid" />

        <div className="work-more-teaser work-section-home__teaser border-t border-hairline">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="site-label">More in the archive</p>
              <p className="mt-1 font-mono text-[12px] text-muted">
                {scope.featured} highlights shown · {scope.total} case studies total
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {WORK_SCOPE_CATEGORIES.map((category) => (
                  <li key={category} className="work-scope-pill">
                    <span className="work-scope-pill__label">{WORK_SCOPE_LABELS[category]}</span>
                    <span className="work-scope-pill__count">
                      {String(scope.byCategory[category]).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/work" className="site-link shrink-0 font-mono text-[13px]">
              View all work →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
