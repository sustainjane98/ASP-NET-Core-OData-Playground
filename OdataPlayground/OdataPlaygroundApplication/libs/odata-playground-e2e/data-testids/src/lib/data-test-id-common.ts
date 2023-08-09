import * as hash from 'object-hash';

export const DataTestIdCommon = {
  DIALOG_TITLE_CLOSE_BUTTON: 'ec0e590c-8cb3-4fe1-9e34-63d9256f6e31',
  AUTOCOMPLETE_BUTTON: (url: string, httpMethod: string) =>
    hash({ url, httpMethod }),
} as const;
