import React from "react";
import { site } from "../../data/profile";

const ExpertiseSection: React.FC = () => (
  <section id="expertise" className="section-block border-t border-hairline">
    <div className="page-container-wide">
      <h2 className="section-heading">Expertise</h2>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {site.expertise.map((item) => (
          <article key={item.title} className="expertise-card">
            <h3 className="font-display text-[1.35rem] font-medium text-ink">{item.title}</h3>
            <p className="section-body mt-4">{item.body}</p>
            <p className="section-body mt-3">{item.support}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ExpertiseSection;
