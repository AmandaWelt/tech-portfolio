import React, { useEffect, useRef, useState } from "react";
import { publicAsset } from "../../lib/publicAsset";

type Props = {
  image?: string;
  imageAlt?: string;
  livePreview?: string;
  variant?: "card" | "detail";
};

const ProjectCardPreview: React.FC<Props> = ({ image, imageAlt, livePreview, variant = "card" }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [loadFrame, setLoadFrame] = useState(false);

  useEffect(() => {
    if (!livePreview || !rootRef.current) return;
    const node = rootRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadFrame(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [livePreview]);

  if (livePreview) {
    return (
      <div
        ref={rootRef}
        className={variant === "detail" ? "project-live-preview" : "work-card-live-preview"}
      >
        {image ? (
          <img
            src={publicAsset(image)}
            alt=""
            className="work-card-live-preview__fallback"
            aria-hidden
          />
        ) : null}
        {loadFrame ? (
          <iframe
            src={livePreview}
            title={imageAlt ?? "Live site preview"}
            className="work-card-live-preview__frame"
            loading="lazy"
            tabIndex={-1}
          />
        ) : null}
      </div>
    );
  }

  if (!image) return null;

  return (
    <img
      src={publicAsset(image)}
      alt={imageAlt ?? ""}
      loading="lazy"
      className={variant === "detail" ? "w-full object-cover object-top" : undefined}
    />
  );
};

export default ProjectCardPreview;
