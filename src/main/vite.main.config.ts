import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  root: "src/main",
  build: {
    outDir: "../../.vite/main",

    // emptyOutDir: true,
  },
});
