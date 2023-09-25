import { EntityType } from '../types/odata-metadata-scheme.type';
import { Property } from '../types/odata-property.type';
import { PropertyResolved } from '../types/property-resolved.type';

export const mapEntityTypeToProperties = (et: EntityType) => {
  let properties: (Property | PropertyResolved)[] = [];

  if (Array.isArray(et.Property)) {
    properties = [...properties, ...et.Property];
  } else {
    properties.push(et.Property as Property | PropertyResolved);
  }

  if (Array.isArray(et.NavigationProperty)) {
    properties = [...properties, ...et.NavigationProperty];
  } else {
    if (et.NavigationProperty)
      properties.push({ ...et.NavigationProperty, '@Nullable': undefined });
  }

  return properties;
};
