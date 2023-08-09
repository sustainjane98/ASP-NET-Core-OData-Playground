export const TranslationKeysOdataErrorEnum = {
  ERROR: 'error',
  CLOSE: 'close',
} as const;

export type TranslationKeysOdataErrorUnion =
  (typeof TranslationKeysOdataErrorEnum)[keyof typeof TranslationKeysOdataErrorEnum];
