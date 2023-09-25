import { ComplexType } from '../types/odata-complex-type.type';
import {
  EntityContainer,
  EntityType,
} from '../types/odata-metadata-scheme.type';
import { Property } from '../types/odata-property.type';
import { PropertyResolved } from '../types/property-resolved.type';
import { isPrimitiveOdataType } from '../helpers/is-example-value.helper';
import { findEntityTypeInCollection } from '../helpers/find-entity-type-in-collection.helper';
import { mapEntityTypeToProperties } from './entity-type-to-properties.mapper';

export const mapEntitySubtypes = (
  et: EntityType,
  collection: (ComplexType | EntityType | EntityContainer)[]
) => {
  const properties = mapEntityTypeToProperties(et);

  for (const prop of properties) {
    mapSingleSubtype(prop, collection);
  }

  const result = { ...et, Property: properties };
  delete result.NavigationProperty;

  return result;
};

const mapSingleSubtype = (
  prop: Property,
  collection: (ComplexType | EntityType | EntityContainer)[]
) => {
  const type = prop['@Type'].match(/\w+\)?$/)?.[0]?.replace(')', '') ?? '';

  if (!isPrimitiveOdataType(type?.toLowerCase() ?? '')) {
    const subEntityType = findEntityTypeInCollection(collection, type);
    if (subEntityType)
      (prop as PropertyResolved).Property = subEntityType.Property as
        | Property
        | Property[];
  }
};
