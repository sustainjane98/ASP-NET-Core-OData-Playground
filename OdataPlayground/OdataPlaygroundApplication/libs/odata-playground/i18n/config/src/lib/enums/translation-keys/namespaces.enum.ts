export const NamespacesEnum = {
  COMMON: 'common',
  INDEX: 'index',
  ODATA_COMMON: 'odata-common',
  ODATA_ERROR: 'odata-error',
} as const;

export type NamespacesUnion =
  (typeof NamespacesEnum)[keyof typeof NamespacesEnum];
