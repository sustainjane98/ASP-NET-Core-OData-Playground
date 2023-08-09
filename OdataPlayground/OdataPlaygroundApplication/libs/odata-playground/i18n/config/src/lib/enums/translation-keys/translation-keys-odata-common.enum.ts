export const TranslationKeysOdataCommonEnum = {
  UNKNOWN_ERROR: 'unknown_error',
  EXPLAINING_ERROR_TEXT: 'explaining_error_text',
  RELOAD: 'reload',
  SHOW_ERROR: 'show_error',
} as const;

export type TranslationKeysOdataCommonUnion =
  (typeof TranslationKeysOdataCommonEnum)[keyof typeof TranslationKeysOdataCommonEnum];
