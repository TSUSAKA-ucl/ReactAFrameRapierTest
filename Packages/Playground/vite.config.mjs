import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path';

export default defineConfig({
  optimizeDeps: {
    exclude: [
      '@ucl-nuee/ik-cd-worker',
      '@ucl-nuee/robot-loader',
    ]
  },
  plugins: [
    react(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  build2: {
    outDir: 'dist2',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index2.html'),
      },
    },
  },
});
