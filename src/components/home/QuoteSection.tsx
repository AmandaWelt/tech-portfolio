import React from "react";
import { site } from "../../data/profile";

const QuoteSection: React.FC = () => (
  <section className="section-block border-t border-hairline bg-surface/40">
    <div className="page-container-wide">
      <blockquote className="mx-auto max-w-2xl text-center">
        <p className="font-display text-[clamp(1.25rem,3vw,1.75rem)] leading-snug text-ink">
          &ldquo;{site.quote.text}&rdquo;
        </p>
        <footer className="mt-6 font-mono text-[13px] text-subtle">, {site.quote.attribution}</footer>
      </blockquote>
    </div>
  </section>
);

export default QuoteSection;
