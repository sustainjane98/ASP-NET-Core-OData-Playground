import copy from 'rollup-plugin-copy';
import * as path from 'path';
import { PluginOption } from 'vite';
import DynamicPublicDirectory from 'vite-multiple-assets';

const dirAssets = ['libs/odata-playground/i18n/config/src/lib'];

const localesSrc = path.normalize(
  path.resolve(
    __dirname,
    '../../libs/odata-playground/i18n/config/src/lib/locales'
  )
);

export const copyFilesI18n = (mode: string) =>
  mode === 'development'
    ? DynamicPublicDirectory(dirAssets)
    : (copy({
        targets: [
          {
            src: localesSrc,
            dest: path.resolve(__dirname, '../../dist/apps/odata-playground/'),
          },
        ],
        hook: 'buildStart',
        copyOnce: true,
      }) as unknown as PluginOption[]);
