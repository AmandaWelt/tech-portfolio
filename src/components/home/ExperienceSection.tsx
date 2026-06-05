import React from "react";
import { experience } from "../../data/experience";

const JOB_TAGS: Record<string, string[]> = {
  "Constellation Payments": ["Payments platform", "PayFac ops", "Team lead", "Enterprise UX"],
  "Funky Outer Space": ["Product delivery", "Multi-tenant SaaS", "Applied AI"],
  "Sacred Art Tattoo": ["Visual design", "Client collaboration"],
};

const ExperienceSection: React.FC = () => (
  <section id="experience" className="section-block border-t border-hairline">
    <div className="page-container-wide">
      <h2 className="section-heading">Professional Experience</h2>

      <ol className="mt-12 space-y-0">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="experience-item">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-display text-[1.05rem] font-medium text-ink">
                {job.title}{" "}
                <span className="text-muted">@ {job.company}</span>
              </h3>
              <p className="font-mono text-[12px] text-subtle">{job.period}</p>
            </div>
            <p className="section-body mt-3">{job.description}</p>
            <ul className="mt-4 space-y-2">
              {job.highlights.slice(0, 4).map((h) => (
                <li key={h} className="text-[14px] leading-relaxed text-muted">
                  · {h}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {(JOB_TAGS[job.company] ?? ["Product delivery"]).map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ExperienceSection;
