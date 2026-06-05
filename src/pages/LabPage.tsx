import React from "react";
import { Link } from "react-router-dom";

const LabPage: React.FC = () => (
  <div className="page-container pb-section pt-24">
    <Link to="/" className="site-link-muted font-mono text-[13px]">
      ← Home
    </Link>
    <p className="site-label mt-6">Lab</p>
    <h1 className="section-heading mt-2">Experimental work</h1>
    <p className="section-body mt-4 max-w-xl">
      Optional space for art led prototypes, kept off the main hire path so Work and Experience stay
      recruiter first.
    </p>

    <div className="mt-12 rounded-md border border-hairline bg-surface px-6 py-8 md:px-8 md:py-10">
      <p className="site-label">Status</p>
      <p className="section-body mt-4">
        Nothing mounted here yet. When you add experiments, keep the same bar as product work: loading
        states, reduced motion, and a clear exit to Work or Contact.
      </p>
    </div>

    <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
      <Link to="/work" className="site-link">
        Work
      </Link>
      <Link to="/ai" className="site-link-muted">
        AI
      </Link>
      <Link to="/contact" className="site-link-muted">
        Contact
      </Link>
    </div>
  </div>
);

export default LabPage;
