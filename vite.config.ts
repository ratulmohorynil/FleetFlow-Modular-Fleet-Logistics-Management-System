import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Optional Lovable tagger import (safe dynamic)
let componentTagger;
try {
  componentTagger = require("lovable-tagger").componentTagger;
} catch {
  componentTagger = null;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];

  // Add tagger only if available AND dev mode
  if (mode === "development" && componentTagger) {
    plugins.push(componentTagger());
  }

  return {
    server: {
      host: "0.0.0.0", // safer than "::"
      port: 8080,
      open: true,
      hmr: {
        overlay: false,
      },
    },

    plugins,

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      outDir: "dist",
    },

    preview: {
      port: 4173,
    },
  };
});