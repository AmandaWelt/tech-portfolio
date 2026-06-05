import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp, Menu, X } from "lucide-react";
import { site } from "../../data/profile";
import { parseNavTo, scrollToSection } from "../../lib/navScroll";

const TopNav: React.FC = () => {
  const { pathname, hash } = useLocation();
  const [showTop, setShowTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (id: string, to: string) => {
    const target = parseNavTo(to);
    if (target.hash) return hash === target.hash;
    if (id === "work") return pathname.startsWith("/work");
    return pathname === target.pathname;
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    setMobileOpen(false);
    const target = parseNavTo(to);
    if (!target.hash || pathname !== target.pathname) return;
    event.preventDefault();
    scrollToSection(target.hash);
    const base = process.env.PUBLIC_URL || "";
    window.history.pushState(null, "", `${base}${target.pathname}${target.hash}`);
  };

  const links = site.nav.filter((item) => item.id !== "home");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-base/90 backdrop-blur-md">
        <div className="topnav-inner flex items-center justify-between py-5 md:py-6">
          <Link to="/" className="topnav-brand-mock" aria-label={site.name}>
            <span className="topnav-mark">{site.mark}</span>
            <span className="topnav-name">{site.name.toUpperCase()}</span>
          </Link>

          <nav className="hidden items-center gap-8 md:gap-10 lg:flex" aria-label="Primary">
            {links.map((item) => {
              const target = parseNavTo(item.to);
              return (
                <Link
                  key={item.id}
                  to={target.hash ? { pathname: target.pathname, hash: target.hash } : target.pathname}
                  onClick={(event) => handleNavClick(event, item.to)}
                  className={`topnav-link-mock ${isActive(item.id, item.to) ? "topnav-link-mock--active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-muted lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-base/98 pt-24 lg:hidden">
          <nav className="topnav-inner flex flex-col gap-6" aria-label="Primary mobile">
            {links.map((item) => {
              const target = parseNavTo(item.to);
              return (
                <Link
                  key={item.id}
                  to={target.hash ? { pathname: target.pathname, hash: target.hash } : target.pathname}
                  onClick={(event) => handleNavClick(event, item.to)}
                  className="topnav-link-mock text-base"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}

      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-accent transition-colors hover:border-accent/40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2} />
        </button>
      ) : null}
    </>
  );
};

export default TopNav;
