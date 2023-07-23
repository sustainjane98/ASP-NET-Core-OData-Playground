export const TranslationKeysIndexEnum = {
  SEND: 'send',
  CANCEL: 'cancel',
  PLEASE_INSERT_TEXT: 'please_insert_text',
} as const;

export type TranslationKeysIndexUnion =
  (typeof TranslationKeysIndexEnum)[keyof typeof TranslationKeysIndexEnum];
