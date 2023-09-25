export const OdataPrimitiveEntityTypes = {
  STRING: 'string',
  DECIMAL: 'decimal',
  INT: 'int',
  INT_32: 'int32',
  BOOLEAN: 'boolean',
  INT_64: 'int64',
};

export const OdataEntityTypes = {
  ...OdataPrimitiveEntityTypes,
  ARRAY: (of?: string) => (of ? `array(${of})` : 'array'),
  OBJECT: 'object',
};

export type OdataEntityTypesType = typeof OdataEntityTypes;

export type OdataEntityTypesUnion =
  OdataEntityTypesType[keyof OdataEntityTypesType];

export type OdataPrimitiveEntityTypesType = typeof OdataPrimitiveEntityTypes;

export type OdataPrimitiveEntityTypesUnion =
  OdataPrimitiveEntityTypesType[keyof OdataPrimitiveEntityTypesType];
