import React from "react";
import { Link } from "react-router-dom";

const AIPage: React.FC = () => (
  <div className="page-container pb-section pt-24">
    <Link to="/" className="site-link-muted font-mono text-[13px]">
      ← Home
    </Link>
    <p className="site-label mt-6">AI</p>
    <h1 className="section-heading mt-2">AI product surfaces</h1>
    <p className="section-body mt-4 max-w-xl">
      Grounded chat, retrieval with citations, streaming UX, and rate aware clients, the same primitives
      shipped in production. This route is for a live or recorded demo when you are ready.
    </p>

    <div className="mt-12 rounded-md border border-hairline bg-surface px-6 py-8 md:px-8 md:py-10">
      <p className="site-label">Notes</p>
      <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
        <li>Keep keys and model calls off the client; use a thin BFF.</li>
        <li>Stream with explicit loading, partial failure, and retry paths.</li>
        <li>Log and retain only what policy allows.</li>
      </ul>
      <p className="mt-6 text-[14px] text-subtle">
        Mount your demo under something like{" "}
        <code className="rounded bg-canvas px-1.5 py-0.5 font-mono text-[12px]">src/ai/</code>.
      </p>
    </div>

    <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
      <Link to="/work/ai-chatbot-saas" className="site-link">
        AI platform case study
      </Link>
      <Link to="/contact" className="site-link-muted">
        Contact
      </Link>
    </div>
  </div>
);

export default AIPage;
