import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500, // ostrzeżenie przy chunkach >500kb
    cssCodeSplit: true, // osobne pliki CSS dla chunków
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("react-router-dom")) return "router-vendor";
            if (id.includes("axios")) return "axios-vendor";
            if (id.includes("@mui")) return "mui-vendor";
            return "vendor";
          }
        }
      }
    }
  }
});
