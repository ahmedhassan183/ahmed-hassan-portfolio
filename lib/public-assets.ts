import { existsSync } from "node:fs";
import path from "node:path";

// Server-rendered availability check: add sanitized assets at the documented
// paths, then rebuild. Never request a known missing image from the browser.
export function publicAssetExists(publicPath: string) {
  return existsSync(path.join(process.cwd(), "public", publicPath));
}
