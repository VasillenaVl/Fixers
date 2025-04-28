import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
  optimizeDeps: {
    exclude: ["aws-sdk", "mock-aws-s3", "@mapbox/node-pre-gyp", "nock"],
  },
  build: {
    rollupOptions: {
      external: ["aws-sdk", "mock-aws-s3", "@mapbox/node-pre-gyp", "nock"],
    },
  },
});
