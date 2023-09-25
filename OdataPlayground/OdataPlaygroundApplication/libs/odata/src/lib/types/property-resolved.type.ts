import { Property } from './odata-property.type';

export interface PropertyResolved extends Property {
  Property: Property | Property[];
}
