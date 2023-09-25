import { Property } from './odata-property.type';

export type ComplexType = {
  '@Name': string;
  Property: Property[];
};
