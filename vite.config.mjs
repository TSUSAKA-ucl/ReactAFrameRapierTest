import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from 'vite-plugin-static-copy';
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
        { src: 'node_modules/@ucl-nuee/kinova-gen3/public/*', dest: '.', },
        { src: 'node_modules/@ucl-nuee/kinova-gen3-lite/public/*', dest: '.', },
        { src: 'node_modules/@ucl-nuee/g1-right/public/*', dest: '.', },
        { src: 'node_modules/@ucl-nuee/g1-left/public/*', dest: '.', },
        { src: 'node_modules/@ucl-nuee/ur5e/public/*', dest: '.', },
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
  build2: {
    outDir: 'dist2',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index2.html'),
      },
    },
  },
});
