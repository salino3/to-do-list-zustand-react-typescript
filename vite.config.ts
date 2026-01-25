import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/to-do-list-zustand-react-typescript/",
  plugins: [react()],
  optimizeDeps: {
    include: ["immer", "zustand/middleware/immer"],
  },
});
