import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

// Cache-bust plugin: Force new hashes and add cache-control headers
function vitePluginCacheBust(): Plugin {
  return {
    name: "cache-bust",
    transformIndexHtml(html) {
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);

      // Add cache-control meta tags
      let modified = html.replace(
        /<meta charset="UTF-8" \/>/,
        `<meta charset="UTF-8" /><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta http-equiv="Pragma" content="no-cache" /><meta http-equiv="Expires" content="0" /><meta name="cache-bust" content="${timestamp}-${randomSuffix}" />`
      );

      // Add query parameters to all script and link tags
      modified = modified
        .replace(/(<script[^>]*src="[^"]*)"/g, `$1?v=${timestamp}"`)
        .replace(/(<link[^>]*href="[^"]*)"/g, `$1?v=${timestamp}"`);

      return modified;
    },
  };
}

const plugins = [react(), tailwindcss(), vitePluginCacheBust()];

export default defineConfig({
  base: "/",
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: "client",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
