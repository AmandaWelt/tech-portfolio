import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => (
  <div className="page-container flex min-h-[40vh] flex-col justify-center py-section">
    <p className="site-label">404</p>
    <h1 className="site-title mt-2">Page not found</h1>
    <p className="site-body mt-3">That path doesn&apos;t exist.</p>
    <Link to="/" className="site-link mt-6 inline-block text-[14px]">
      Back home
    </Link>
  </div>
);

export default NotFoundPage;
