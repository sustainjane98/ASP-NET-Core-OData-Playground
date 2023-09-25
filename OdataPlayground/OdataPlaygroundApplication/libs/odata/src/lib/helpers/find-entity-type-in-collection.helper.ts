import {
  EntityContainer,
  EntityType,
} from '../types/odata-metadata-scheme.type';
import { ComplexType } from '../types/odata-complex-type.type';

export const findEntityTypeInCollection = (
  collection: (ComplexType | EntityType | EntityContainer)[],
  name: string
) => {
  return (collection as EntityType[]).find((e) => e['@Name'] === name);
};
