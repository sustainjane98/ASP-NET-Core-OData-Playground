export const NamespacesEnum = {
  COMMON: 'common',
  INDEX: 'index',
} as const;

export type NamespacesUnion =
  (typeof NamespacesEnum)[keyof typeof NamespacesEnum];
