import { withBasePath } from "./basePath";

/** Resolve paths under `public/` for GitHub Pages (project URL or custom domain). */
export const publicAsset = (path: string) => withBasePath(path);
