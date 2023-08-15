import { EntityType } from '@odata-playground/odata/common';

export const isMetadataScheme = (
  b: EntityType | EntityType[]
): b is EntityType => {
  if (b instanceof Array) {
    return false;
  }

  return typeof b?.Key != 'undefined';
};
