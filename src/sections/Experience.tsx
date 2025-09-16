import React from "react";
import type { ExperienceItem } from "../types/portfolio";

type Props = { experience: ExperienceItem[] };

const Experience: React.FC<Props> = ({ experience }) => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">EXPERIENCE</h2>
      <div className="w-16 h-px bg-black mx-auto" />
    </div>

    <div className="space-y-16">
      {experience.map((job, idx) => (
        <div key={idx} className="border-b border-gray-100 pb-16 last:border-b-0">
          <div className="grid lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-light text-black mb-2">{job.title}</h3>
              <p className="text-gray-600 font-light mb-2">{job.company}</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{job.period}</p>
            </div>

            <div className="lg:col-span-2">
              <p className="text-gray-700 leading-relaxed font-light mb-6">{job.description}</p>
              <ul className="space-y-3">
                {job.highlights.map((h) => (
                  <li key={h} className="text-gray-700 font-light flex items-start">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-3 mr-4 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Experience;
