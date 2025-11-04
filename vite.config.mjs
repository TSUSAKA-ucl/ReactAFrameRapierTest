import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'node_modules/@ucl-nuee/ik-cd-worker/public/*',
          dest: '.', },
        { src: 'node_modules/@ucl-nuee/rapier-worker/dist-worker/*',
          dest: '.', },
        { src: 'node_modules/@ucl-nuee/jaka-zu5/public/*',
          dest: '.', },
        { src: 'node_modules/@ucl-nuee/nova2/public/*',
          dest: '.', },
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
