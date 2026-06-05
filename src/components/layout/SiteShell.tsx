import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToHash from "./ScrollToHash";
import TopNav from "./TopNav";

const SiteShell: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div id="top" className="min-h-screen bg-base text-ink">
      <ScrollToHash />
      {!isHome ? <TopNav /> : null}
      <main className={isHome ? "" : "pt-20 md:pt-24"}>
        <Outlet />
      </main>
    </div>
  );
};

export default SiteShell;
