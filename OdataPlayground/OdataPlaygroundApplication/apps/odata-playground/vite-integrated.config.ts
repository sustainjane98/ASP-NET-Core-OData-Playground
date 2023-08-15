/// <reference types="vitest" />
import { config } from './vite.config';
import { defineConfig, PluginOption } from 'vite';
import { copyFilesI18n } from '@odata-playground/odata/i18n/vite';
export default defineConfig(async (env) => {
  const mainViteConfigResolved = await config(env);

  return {
    ...mainViteConfigResolved,
    plugins: [
      ...(mainViteConfigResolved.plugins as PluginOption[]),
      copyFilesI18n(true),
    ],
  };
});
