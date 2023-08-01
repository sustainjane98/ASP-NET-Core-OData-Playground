import DynamicPublicDirectory from 'vite-multiple-assets';

const dirAssets = ['libs/odata-playground/i18n/config/src/lib'];

export const copyFilesI18n = DynamicPublicDirectory(dirAssets);
