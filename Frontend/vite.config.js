import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import url from "./src/assets/url"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["uninterrogatory-goldie-subnaturally.ngrok-free.dev"],
    proxy: {
      // This creates a shortcut: /storage -> https://your-ngrok-url/storage
      "/storage": {
        target: url,
        changeOrigin: true,
        // This is the magic header that tells ngrok to skip the warning
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    },
  },
})
