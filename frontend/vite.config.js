import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/socket.io": {
        target: "ws://127.0.0.1:5000",
        ws: true,
      },
    },
  },
  plugins: [react()],
});
