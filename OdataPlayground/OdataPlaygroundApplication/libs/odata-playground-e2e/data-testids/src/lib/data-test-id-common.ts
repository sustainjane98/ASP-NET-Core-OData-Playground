import * as hash from 'object-hash';

export const DataTestIdCommon = {
  AUTOCOMPLETE_BUTTON: (url: string, httpMethod: string) =>
    hash({ url, httpMethod }),
} as const;
