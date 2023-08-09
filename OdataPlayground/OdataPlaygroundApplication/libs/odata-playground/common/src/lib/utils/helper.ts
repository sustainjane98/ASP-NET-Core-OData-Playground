import { EntityType } from '../types/odata-metadata-scheme.type';
import { isMetadataScheme } from '../types/odata-metadata-scheme.typeguard';

export const findEntityTypeInCollection = (
  collection: EntityType[] | EntityType,
  name: string
) => {
  if (isMetadataScheme(collection)) {
    if (collection['@Name'] === name) {
      return collection;
    }
  }
  return (collection as EntityType[]).find((e) => e['@Name'] === name);
};
