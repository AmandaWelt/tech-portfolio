import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { site } from "../../data/profile";
import { parseNavTo, scrollToSection } from "../../lib/navScroll";

const SplitHeroNav: React.FC = () => {
  const { pathname, hash } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header className="split-hero-nav">
      <Link to="/" className="split-hero-brand" onClick={() => setMobileOpen(false)}>
        <span className="split-hero-mark" aria-hidden>
          {site.mark}
        </span>
        <span className="split-hero-brand-name">{site.name.toUpperCase()}</span>
        <span className="split-hero-brand-rule" aria-hidden />
      </Link>

      <nav className="split-hero-nav-links hidden lg:flex" aria-label="Primary">
        {links.map((item) => {
          const target = parseNavTo(item.to);
          return (
            <Link
              key={item.id}
              to={target.hash ? { pathname: target.pathname, hash: target.hash } : target.pathname}
              onClick={(event) => handleNavClick(event, item.to)}
              className={`split-hero-nav-link ${isActive(item.id, item.to) ? "split-hero-nav-link--active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className="split-hero-nav-menu lg:hidden"
        onClick={() => setMobileOpen((o) => !o)}
        aria-expanded={mobileOpen}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {mobileOpen ? (
        <nav className="split-hero-nav-mobile lg:hidden" aria-label="Primary mobile">
          {links.map((item) => {
            const target = parseNavTo(item.to);
            return (
              <Link
                key={item.id}
                to={target.hash ? { pathname: target.pathname, hash: target.hash } : target.pathname}
                onClick={(event) => handleNavClick(event, item.to)}
                className="split-hero-nav-link"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
};

export default SplitHeroNav;
