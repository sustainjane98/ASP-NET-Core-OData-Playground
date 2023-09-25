import { NavigationProperty } from './odata-navigation-property-type';
import { Property } from './odata-property.type';
import { PropertyResolved } from './property-resolved.type';

export interface OdataMetadataScheme {
  '?xml': XML;
  'edmx:Edmx': EdmxEdmx;
}

interface XML {
  '@version': string;
  '@encoding': string;
}

interface EdmxEdmx {
  '@Version': string;
  '@xmlns:edmx': string;
  'edmx:DataServices': EdmxDataServices;
}

interface EdmxDataServices {
  Schema: Schema[];
}

class ComplexType {}

interface Schema {
  '@Namespace': string;
  '@xmlns': string;
  EntityType?: EntityType | EntityType[];
  EntityContainer?: EntityContainer;
  ComplexType: ComplexType | ComplexType[];
  [x: string]:
    | ComplexType
    | string
    | EntityType
    | EntityContainer
    | ComplexType[]
    | EntityType[]
    | undefined;
}

export interface EntityContainer {
  '@Name': string;
  EntitySet: EntitySet | EntitySet[];
  Singleton: EntitySet | EntitySet[];
}

export interface EntitySet {
  '@Name': string;
  '@EntityType': string;
  '@Type': string;
}

export interface EntityType {
  '@Name': string;
  Key: Key;
  Property: Property | (Property | PropertyResolved)[] | PropertyResolved;
  NavigationProperty?: NavigationProperty;
}

interface Key {
  PropertyRef: PropertyRef;
}

interface PropertyRef {
  '@Name': string;
}
