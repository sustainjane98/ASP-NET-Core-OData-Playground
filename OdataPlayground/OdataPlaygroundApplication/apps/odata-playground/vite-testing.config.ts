/// <reference types="vitest" />
import { config } from './vite.config';
import { defineConfig } from 'vite';
import { ApplicationConfig } from '@odata-playground/odata/application-config/dist';
export default defineConfig(async (env) => {
  const mainViteConfigResolved = await config(env);

  return {
    ...mainViteConfigResolved,
    server: {
      ...mainViteConfigResolved.server,
      port: ApplicationConfig.TESTING_PORT,
      open: undefined,
    },
  };
});
