import React from "react";
import { Link } from "react-router-dom";
import { site } from "../data/profile";

const ContactPage: React.FC = () => {
  const { email, resumeUrl, githubUrl } = site.contact;
  const githubDisplay = githubUrl.replace(/^https?:\/\//i, "").replace(/\/$/, "");

  return (
    <div className="page-container pb-section pt-24">
      <Link to="/" className="site-link-muted font-mono text-[13px]">
        ← Home
      </Link>
      <h1 className="section-heading mt-6">Contact</h1>
      <p className="section-body mt-4 max-w-xl">{site.contact.body}</p>

      <dl className="mt-12 space-y-8">
        <div>
          <dt className="site-label">Email</dt>
          <dd className="mt-2">
            <a href={`mailto:${email}`} className="site-link text-[16px] no-underline hover:underline">
              {email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="site-label">GitHub</dt>
          <dd className="mt-2">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="site-link text-[15px]">
              {githubDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="site-label">Location</dt>
          <dd className="mt-2 text-[15px] text-muted">{site.location}</dd>
        </div>
        <div>
          <dt className="site-label">Résumé</dt>
          <dd className="mt-2">
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="site-link text-[15px]">
              Download PDF
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ContactPage;
