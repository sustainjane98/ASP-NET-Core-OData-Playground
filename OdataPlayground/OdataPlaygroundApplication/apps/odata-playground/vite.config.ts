/// <reference types="vitest" />
import { defineConfig, UserConfigFn } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { copyFilesI18n } from '@odata-playground/odata/i18n/vite';
import { ApplicationConfig } from '@odata-playground/odata/application-config/dist';

export const config: UserConfigFn = ({ mode }) => ({
  cacheDir: '../../node_modules/.vite/odata-playground',

  server: {
    port: ApplicationConfig.PORT,
    host: 'localhost',
    open:
      mode === 'development' ? ApplicationConfig.URL_WITH_PARAMS : undefined,
  },

  plugins: [
    svgr(),
    react(),
    copyFilesI18n(mode),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
});

export default defineConfig(config);
