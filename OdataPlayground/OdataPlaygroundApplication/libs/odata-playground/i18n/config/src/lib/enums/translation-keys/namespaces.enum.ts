export const NamespacesEnum = {
  COMMON: 'common',
  INDEX: 'index',
  ODATA_COMMON: 'odata-common',
} as const;

export type NamespacesUnion =
  (typeof NamespacesEnum)[keyof typeof NamespacesEnum];
