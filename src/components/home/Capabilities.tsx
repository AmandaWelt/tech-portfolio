import React from "react";
import { site } from "../../data/profile";

const Capabilities: React.FC = () => (
  <section className="border-b border-hairline bg-elevated">
    <div className="editorial-container py-section">
      <p className="issue-tag">
        Section <em>04</em> · Practice
      </p>
      <h2 className="display-serif mt-4 max-w-[14ch] text-[clamp(2rem,4vw,2.75rem)]">
        How the work gets <em>done</em>.
      </h2>

      <hr className="rule mt-12" />

      <ul className="mt-12 divide-y divide-hairline">
        {site.capabilities.map((cap, i) => (
          <li key={cap.title} className="grid gap-4 py-8 md:grid-cols-[4rem_1fr] md:gap-10">
            <span className="spread-index pt-1">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-serif text-[1.35rem] text-ink">{cap.title}</h3>
              <p className="deck mt-3 text-[1rem]">{cap.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Capabilities;
