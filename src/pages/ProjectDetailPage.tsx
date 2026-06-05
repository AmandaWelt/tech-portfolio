import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { getProjectBySlug } from "../lib/projects";
import { publicAsset } from "../lib/publicAsset";
import ProjectCardPreview from "../components/work/ProjectCardPreview";
import ProjectDetailBackdrop from "../components/project/ProjectDetailBackdrop";
import SystemView from "../components/project/SystemView";
import ExperienceMode from "../components/project/ExperienceMode";

const ProjectDetailPage: React.FC = () => {
 const { slug } = useParams<{ slug: string }>();
 const project = getProjectBySlug(slug);
 const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
 const [explorerOpen, setExplorerOpen] = useState(false);

 if (!project) {
 return <Navigate to="/work" replace />;
 }

 const explorerEnabled =
 project.systemExplorer?.enabled && (project.systemExplorer.layers?.length ?? 0) > 0;
 const immersive = Boolean(project.backdrop);
 const panelClass = immersive
 ? "project-detail-glass mt-10 p-6 md:p-8"
 : "mt-10 rounded-md border border-hairline bg-elevated p-6 md:p-8";
 const previewClass = immersive
 ? "project-detail-glass mt-12 overflow-hidden"
 : "mt-12 overflow-hidden rounded-md bg-surface";
 const bodyClass = immersive ? "project-detail-glass mt-16 p-8 md:p-10" : "mt-16";

 return (<>
 {project.backdrop ? <ProjectDetailBackdrop kind={project.backdrop} /> : null}
 <div
 className={[
 "project-detail-shell",
 project.backdrop && "project-detail-shell--immersive",
 project.backdrop === "aiugment-rain" && "project-detail-shell--aiugment",
 project.backdrop === "popup-jam-map" && "project-detail-shell--popup-jam",
 ]
 .filter(Boolean)
 .join(" ")}
 >
 <article className="page-container pb-section pt-24 md:pt-28">
 <Link to="/work" className="site-link-muted inline-block text-[14px]">
 ← Work
 </Link>

 <header className="mt-8">
 <p className="site-label">{project.status}</p>
 <h1 className="site-title mt-3">{project.title}</h1>
 <p className="site-body mt-4 max-w-[36rem]">{project.tagline}</p>

 <dl className="mt-10 grid gap-6 sm:grid-cols-3">
 <div>
 <dt className="site-label">Role</dt>
 <dd className="mt-1.5 text-[14px] text-muted">{project.role}</dd>
 </div>
 <div>
 <dt className="site-label">Stack</dt>
 <dd className="mt-1.5 text-[14px] text-muted">{project.tech.slice(0, 5).join(", ")}</dd>
 </div>
 <div>
 <dt className="site-label">Impact</dt>
 <dd className="mt-1.5 text-[14px] text-muted">{project.impactMetric}</dd>
 </div>
 </dl>

 {(explorerEnabled || project.link || project.demo) ? (<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
 {project.link ? (<a href={project.link} target="_blank" rel="noreferrer" className="site-link text-[14px]">
 Live site  to 
 </a>) : null}
 {explorerEnabled ? (<button
 type="button"
 onClick={() => setExplorerOpen(true)}
 className="site-link text-[14px]"
 >
 Explore architecture
 </button>) : null}
 {project.demo ? (<a
 href={publicAsset(project.demo)}
 target="_blank"
 rel="noreferrer"
 className="site-link text-[14px]"
 >
 Open interactive demo  to 
 </a>) : null}
 </div>) : null}
 </header>

 {project.demoLinks && project.demoLinks.length > 0 ? (<section className={panelClass}>
 <h2 className="site-label">Interactive prototypes</h2>
 <p className="section-body mt-3 max-w-2xl">
 Self-contained HTML demos, open in a new tab to explore the interactive prototype.
 </p>
 <ul className="mt-5 grid gap-2 sm:grid-cols-2">
 {project.demoLinks.map((item) => (<li key={item.href}>
 <a
 href={publicAsset(item.href)}
 target="_blank"
 rel="noreferrer"
 className="flex items-center justify-between rounded-md border border-hairline bg-surface px-4 py-3 text-[14px] text-ink transition hover:border-accent/40"
 >
 {item.label}
 <span className="font-mono text-[12px] text-accent" aria-hidden>
  to 
 </span>
 </a>
 </li>))}
 </ul>
 </section>) : null}

 {project.image || project.livePreview ? (<div className={previewClass}>
 <ProjectCardPreview
 image={project.image}
 imageAlt={project.imageAlt || project.title}
 livePreview={project.livePreview}
 variant="detail"
 />
 </div>) : null}

 <div className={bodyClass}>
 <SystemView project={project} />
 </div>

 {project.gallery && project.gallery.length > 0 ? (<section className="mt-16 border-t border-hairline pt-10">
 <h2 className="site-label">Gallery</h2>
 <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
 {project.gallery.map((src, idx) => (<button
 key={`${src}-${idx}`}
 type="button"
 onClick={() => setLightboxSrc(publicAsset(src))}
 className="relative aspect-[16/10] overflow-hidden rounded-md bg-surface"
 aria-label="Expand image"
 >
 <img src={publicAsset(src)} alt="" className="h-full w-full object-cover" loading="lazy" />
 </button>))}
 </div>
 </section>) : null}

 <div className="mt-12 flex flex-wrap gap-5 border-t border-hairline pt-8 text-[14px]">
 {project.repo ? (<a href={project.repo} target="_blank" rel="noreferrer" className="site-link">
 Source
 </a>) : null}
 <Link to="/work" className="site-link-muted">
 All work
 </Link>
 </div>
 </article>
 </div>

 {explorerEnabled ? (<ExperienceMode project={project} open={explorerOpen} onClose={() => setExplorerOpen(false)} />) : null}

 {lightboxSrc ? (<div
 role="dialog"
 aria-modal="true"
 className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/90 p-4"
 onClick={() => setLightboxSrc(null)}
 >
 <button
 type="button"
 className="absolute right-4 top-4 rounded-full p-2 text-white/80 hover:text-white"
 onClick={(e) => {
 e.stopPropagation();
 setLightboxSrc(null);
 }}
 aria-label="Close"
 >
 <X className="h-5 w-5" strokeWidth={1.5} />
 </button>
 <img
 src={lightboxSrc}
 alt=""
 className="max-h-[90vh] max-w-[min(100%,1100px)] object-contain"
 onClick={(e) => e.stopPropagation()}
 />
 </div>) : null}
 </>);
};

export default ProjectDetailPage;
