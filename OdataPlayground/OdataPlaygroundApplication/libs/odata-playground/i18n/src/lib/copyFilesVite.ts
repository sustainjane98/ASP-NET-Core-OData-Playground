import copy from 'rollup-plugin-copy';
import path from 'path';

const localesSrc = path.normalize(
  path.resolve(__dirname, '../../libs/odata-playground/i18n/src/lib/locales')
);

export default (mode: string) =>
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
  }) as never;
