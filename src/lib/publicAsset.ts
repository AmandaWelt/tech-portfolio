/** Resolve paths under `public/` when the app uses a homepage basename. */
export const publicAsset = (path: string) => {
  if (!path.startsWith("/")) return path;
  const base = process.env.PUBLIC_URL || "";
  if (base && path.startsWith(base)) return path;
  return `${base}${encodeURI(path)}`;
};
