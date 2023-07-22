/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import copy from 'rollup-plugin-copy';
import path from 'path';

const localesSrc = path.normalize(
  path.resolve(__dirname, '../../libs/odata-playground/i18n/src/lib/locales')
);

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
    copy({
      targets:
        mode === 'development'
          ? [
              {
                src: localesSrc,
                dest: path.resolve(
                  __dirname,
                  '../../apps/odata-playground/public'
                ),
              },
            ]
          : [
              {
                src: localesSrc,
                dest: path.resolve(
                  __dirname,
                  '../../dist/apps/odata-playground/'
                ),
              },
            ],
      hook: 'buildStart',
      copyOnce: true,
    }) as never,
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
