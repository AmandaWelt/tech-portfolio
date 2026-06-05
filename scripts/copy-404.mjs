import { copyFileSync, existsSync } from "node:fs";

const index = "build/index.html";
const notFound = "build/404.html";

if (!existsSync(index)) {
  console.error("copy-404: build/index.html not found — run npm run build first");
  process.exit(1);
}

copyFileSync(index, notFound);
console.log("copy-404: wrote build/404.html for GitHub Pages SPA routing");
