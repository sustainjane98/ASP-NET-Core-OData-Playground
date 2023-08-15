import DynamicPublicDirectory from 'vite-multiple-assets';
import copy from 'rollup-plugin-copy';
import { PluginOption } from 'vite';
import path from 'path';
const dirAssets = ['libs/odata-playground/i18n/config/src/lib'];

const src = path.resolve(__dirname, '../../../../config/src/lib/locales/**/*');
const dest = path.resolve(
  __dirname,
  '../../../../../../../dist/apps/odata-playground/locales'
);
export const copyFilesI18n = (integrated = false): PluginOption =>
  integrated
    ? (copy({
        targets: [
          {
            src,
            dest,
          },
        ],
        verbose: true,
        hook: 'writeBundle',
        copyOnce: true,
        flatten: true,
      }) as any)
    : DynamicPublicDirectory(dirAssets);
