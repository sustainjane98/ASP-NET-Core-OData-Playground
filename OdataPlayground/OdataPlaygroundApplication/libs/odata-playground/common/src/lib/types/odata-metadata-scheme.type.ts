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

export type ComplexType = {
  '@Name': string;
  Property: Property[];
};

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

interface NavigationProperty {
  '@Name': string;
  '@Type': string;
}

export interface Property {
  '@Name': string;
  '@Type': string;
  '@Nullable': string;
  '@Scale'?: string;
}

export interface PropertyResolved extends Property {
  Property: Property | Property[];
}
