const GITHUB_PROJECT_PREFIX = "/tech-portfolio";

/** Where the app is mounted: custom domain root vs github.io project subpath. */
export function getBasePath(): string {
  if (typeof window === "undefined") {
    return process.env.PUBLIC_URL?.replace(/\/$/, "") || "";
  }

  const { pathname } = window.location;
  if (pathname === GITHUB_PROJECT_PREFIX || pathname.startsWith(`${GITHUB_PROJECT_PREFIX}/`)) {
    return GITHUB_PROJECT_PREFIX;
  }

  return "";
}

export function getRouterBasename(): string | undefined {
  const base = getBasePath();
  return base || undefined;
}

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;

  const base = getBasePath();
  if (!base || path.startsWith(`${base}/`) || path === base) return path;

  return `${base}${encodeURI(path)}`;
}
