import React from "react";
import { site } from "../../data/profile";

const ContactSection: React.FC = () => (
  <section id="contact" className="section-block border-t border-hairline bg-surface/30">
    <div className="page-container-wide">
      <h2 className="section-heading">{site.contact.headline}</h2>
      <p className="section-body mt-4 max-w-xl">{site.contact.body}</p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a href={`mailto:${site.contact.email}`} className="btn-primary">
          Send email
        </a>
        <a
          href={site.contact.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
        >
          GitHub
        </a>
        <a href={site.contact.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost">
          Résumé
        </a>
      </div>

      <footer className="mt-section border-t border-hairline pt-8">
        <p className="font-mono text-[12px] text-subtle">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
      </footer>
    </div>
  </section>
);

export default ContactSection;
