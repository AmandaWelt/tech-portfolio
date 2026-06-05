import React from "react";
import type { Project } from "../../types/portfolio";

type Props = {
  project: Project;
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section>
    <h2 className="site-label">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

const Prose: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="site-body text-[15px]">{children}</div>
);

const SystemView: React.FC<Props> = ({ project: p }) => (
  <div className="mt-16 space-y-12 border-t border-hairline pt-12">
    <Section title="Overview">
      <Prose>
        <p>{p.description}</p>
      </Prose>
    </Section>

    <Section title="Problem">
      <Prose>
        <p>{p.problem}</p>
      </Prose>
    </Section>

    <Section title="Solution">
      <Prose>
        <p>{p.solution}</p>
      </Prose>
    </Section>

    <Section title="My role">
      <Prose>
        <p>{p.myRole}</p>
      </Prose>
    </Section>

    <Section title="Architecture">
      <ul className="space-y-2 text-[15px] leading-relaxed text-muted">
        {p.architecture.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </Section>

    <Section title="Technical decisions">
      <ul className="space-y-2 text-[15px] leading-relaxed text-muted">
        {p.technicalDecisions.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </Section>

    <Section title="Impact">
      <ul className="space-y-2 text-[15px] leading-relaxed text-muted">
        {p.impact.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="mt-4 rounded-md bg-surface px-4 py-3 text-[14px] text-muted">
        <span className="font-medium text-ink">Metric. </span>
        {p.impactMetric}
      </p>
    </Section>

    <Section title="Lessons learned">
      <ul className="space-y-2 text-[15px] leading-relaxed text-muted">
        {p.lessonsLearned.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </Section>
  </div>
);

export default SystemView;
