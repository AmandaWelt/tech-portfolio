import React, { useState } from "react";
import { Github, Globe, X } from "lucide-react";
import type { Project } from "../types/portfolio";

type Props = { projects: Project[] };

const Projects: React.FC<Props> = ({ projects }) => {
  const [open, setOpen] = useState<number | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">FEATURED PROJECTS</h2>
          <div className="w-16 h-px bg-black mx-auto" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const isOpen = open === i;
            return (
              <article
                key={p.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Screenshot */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.imageAlt || `${p.title} screenshot`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
                  )}
                  <span
                    className={`absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-wider ${
                      p.status === "Production" ? "bg-black text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-light text-black">{p.title}</h3>
                    <div className="flex items-center gap-2">
                      {p.link && (
                        <a
                          href={p.link}
                          className="text-gray-600 hover:text-black"
                          aria-label="Open live site"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Globe size={18} strokeWidth={1} />
                        </a>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          className="text-gray-600 hover:text-black"
                          aria-label="Open GitHub repo"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Github size={18} strokeWidth={1} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mb-4 text-sm text-gray-700">{p.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-1 border border-gray-300 text-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs uppercase tracking-wider text-gray-800 transition hover:bg-gray-50"
                      aria-expanded={isOpen}
                      aria-controls={`proj-${i}`}
                    >
                      {isOpen ? "Hide Details" : "View Case Study"}
                    </button>

                    {/* Expanded panel */}
                    <div
                      id={`proj-${i}`}
                      className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                        isOpen ? "max-h-[2000px]" : "max-h-0"
                      }`}
                    >
                      <div className="pt-4">
                        {/* Features */}
                        <h4 className="mb-2 text-xs uppercase tracking-wider text-gray-500">Key Features</h4>
                        <ul className="space-y-1 mb-4">
                          {p.features.map((f) => (
                            <li key={f} className="text-sm text-gray-700">
                              • {f}
                            </li>
                          ))}
                        </ul>

                        {/* Gallery (optional) */}
                        {p.gallery && p.gallery.length > 0 && (
                          <div>
                            <h4 className="mb-2 text-xs uppercase tracking-wider text-gray-500">Screenshots</h4>

                            {/* Responsive grid thumbnails */}
                            <div className="-mx-1 flex flex-wrap">
                              {p.gallery.map((src, idx) => (
                                <button
                                  key={src + idx}
                                  type="button"
                                  onClick={() => setLightboxSrc(src)}
                                  className="w-1/2 p-1 sm:w-1/3"
                                  aria-label="Open screenshot"
                                >
                                  <div className="aspect-[16/10] overflow-hidden rounded-lg ring-1 ring-gray-200">
                                    <img
                                      src={src}
                                      alt=""
                                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxSrc(null);
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Projects;
