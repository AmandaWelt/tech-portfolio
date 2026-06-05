import React from "react";
import { Link } from "react-router-dom";
import { site } from "../../data/profile";

const CTASection: React.FC = () => (<section>
 <div className="editorial-container py-section">
 <p className="issue-tag">
 Section <em>05</em> · Contact
 </p>
 <h2 className="display-serif mt-4 max-w-[12ch] text-[clamp(2rem,4vw,2.75rem)]">
 Available for senior <em>product</em> roles.
 </h2>
 <p className="deck mt-6 max-w-measure">
 Payments, UI systems, AI products, teams that care about ownership and craft.
 </p>

 <div className="mt-10 flex flex-wrap items-center gap-8">
 <a href={`mailto:${site.contact.email}`} className="text-link-mark">
 {site.contact.email} <span aria-hidden> to </span>
 </a>
 <Link to="/experience" className="text-link">
 Experience <span aria-hidden> to </span>
 </Link>
 </div>

 <p className="colophon mt-16 border-t border-hairline pt-8">
 Colophon · {site.name} · Product engineering portfolio · {new Date().getFullYear()}
 </p>
 </div>
 </section>);

export default CTASection;
