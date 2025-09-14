import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Only import cartographer in dev mode
const cartographerPlugin =
  process.env.NODE_ENV !== "production" && process.env.REPL_ID
    ? await import("@replit/vite-plugin-cartographer").then((m) => m.cartographer())
    : null;

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(cartographerPlugin ? [cartographerPlugin] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.url.replace("file://", ""), "../client/src"),
      "@shared": path.resolve(import.meta.url.replace("file://", ""), "../shared"),
      "@assets": path.resolve(import.meta.url.replace("file://", ""), "../attached_assets"),
    },
  },
  root: path.resolve(import.meta.url.replace("file://", ""), "../client"),
  build: {
    outDir: path.resolve(import.meta.url.replace("file://", ""), "../server/public"), // Render-ready
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
