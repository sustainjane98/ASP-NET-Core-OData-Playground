/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { copyFilesI18n } from '@odata-playground/odata/i18n';

export default defineConfig(({ mode }) => ({
  cacheDir: '../../node_modules/.vite/odata-playground',

  server: {
    port: 3000,
    host: 'localhost',
    open:
      mode === 'development'
        ? 'http://localhost:3000?odataPath=http://localhost:8080'
        : undefined,
  },

  plugins: [
    svgr(),
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
    copyFilesI18n(mode),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
}));
