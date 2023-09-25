import {
  OdataPrimitiveEntityTypes,
  OdataPrimitiveEntityTypesUnion,
} from '../enums/odata-entity-types.enum';

export const isPrimitiveEntityTypes = (
  obj: string | Record<string, any> | undefined
): obj is OdataPrimitiveEntityTypesUnion =>
  !!obj &&
  !Array.isArray(obj) &&
  typeof obj !== 'object' &&
  Object.values(OdataPrimitiveEntityTypes).includes(obj);
