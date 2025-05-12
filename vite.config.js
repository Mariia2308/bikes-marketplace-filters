import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [react()],
 base: "/bikes-marketplace-filters/",
 build: {
  sourcemap: true,
 },
 preprocessorOptions: {
    scss: {
      additionalData: '@use "./src/styles/main.scss" as *;', 
    },
    },
});
