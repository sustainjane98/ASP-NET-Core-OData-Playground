/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/odata-playground',

  server: {
    port: 3000,
    host: 'localhost',
  },

  plugins: [
    svgr(),
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
    viteStaticCopy({
      targets: [
        {
          src:
            path.resolve(__dirname, '../../libs/i18n/src/stories/locales') +
            '/[!.]*',
          dest: './locales',
        },
      ],
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
});
