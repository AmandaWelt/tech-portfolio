import React from "react";
import { site } from "../../data/profile";

const ProofStrip: React.FC = () => (
  <section className="border-b border-hairline bg-elevated">
    <div className="editorial-container py-14 md:py-16">
      <div className="flex items-baseline justify-between gap-6">
        <p className="issue-tag">
          Section <em>02</em> · Proof
        </p>
        <p className="caption hidden md:block">At a glance</p>
      </div>

      <hr className="rule mt-8" />

      <dl className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
        {site.proof.map((item, i) => (
          <div key={item.label}>
            <dt className="spread-index">{String(i + 1).padStart(2, "0")}</dt>
            <dt className="caption mt-3">{item.label}</dt>
            <dd className="mt-2 font-serif text-[1.35rem] leading-snug text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default ProofStrip;
