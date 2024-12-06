import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/TodoVue/",
  plugins: [vue()],
  build: {
    assetsDir: "assets",
  },
});
