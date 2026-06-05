import React from "react";
import { experience, experienceSummary } from "../../data/experience";
import { skills } from "../../data/skills";
import { site } from "../../data/profile";

const SKILL_GROUP_LABEL: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks & libraries",
  databases: "Databases & ORMs",
  tools: "Tools & technologies",
  additional: "Additional",
};

const ResumeSection: React.FC = () => (
  <div className="page-container pb-section pt-24 md:pt-28">
    <h1 className="font-serif text-[clamp(2rem,5vw,2.75rem)] font-normal text-ink">about.</h1>
    <p className="mt-4 text-[14px] text-muted">
      {site.title} · {site.location}
    </p>
    <p className="site-body mt-6 max-w-[36rem]">{experienceSummary}</p>

    <div className="mt-8 flex flex-wrap gap-4 text-[14px]">
      <a href={site.contact.resumeUrl} target="_blank" rel="noreferrer" className="site-link">
        Download résumé
      </a>
      <a href={`mailto:${site.contact.email}`} className="site-link-muted">
        Email
      </a>
    </div>

    <section className="mt-16">
      <h2 className="site-label">Experience</h2>
      <ol className="mt-6 divide-y divide-hairline border-t border-hairline">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="py-8 first:pt-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-[15px] font-medium text-ink">{job.title}</h3>
              <p className="text-[13px] text-subtle">{job.period}</p>
            </div>
            <p className="mt-1 text-[14px] text-muted">{job.company}</p>
            <p className="site-body mt-3 text-[14px]">{job.description}</p>
            <ul className="mt-4 space-y-2">
              {job.highlights.slice(0, 4).map((h) => (
                <li key={h} className="text-[14px] leading-relaxed text-muted">
                  {h}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>

    <aside className="mt-16 space-y-8 border-t border-hairline pt-10">
      <div>
        <h2 className="site-label">Education</h2>
        <p className="mt-2 text-[15px] text-muted">{site.about.education}</p>
      </div>
      <div>
        <h2 className="site-label">Languages</h2>
        <p className="mt-2 text-[15px] text-muted">{site.about.languages}</p>
      </div>
      <div>
        <h2 className="site-label">Skills</h2>
        <div className="mt-4 space-y-5">
          {(Object.entries(skills) as [string, readonly string[]][]).map(([key, list]) => (
            <div key={key}>
              <p className="text-[13px] font-medium text-ink">{SKILL_GROUP_LABEL[key] ?? key}</p>
              <p className="mt-1 text-[14px] text-muted">{list.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  </div>
);

export default ResumeSection;
