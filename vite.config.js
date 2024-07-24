import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import purgecss from "@fullhuman/postcss-purgecss";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "brotliCompress" }), // Brotli-Komprimierung
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss("./tailwind.config.js"),
        autoprefixer,
        purgecss({
          content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        }),
      ],
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  server: {
    port: 3000,
  },
});
