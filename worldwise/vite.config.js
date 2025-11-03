import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint"; // ✅ add this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(), // ✅ add this plugin here
  ],
});
