import { PropertyResolved } from '../types/property-resolved.type';
import { Property } from '../types/odata-property.type';

export const isPropertyResolved = (
  property: Property | PropertyResolved
): property is PropertyResolved => {
  return !!(property as PropertyResolved)?.Property;
};
