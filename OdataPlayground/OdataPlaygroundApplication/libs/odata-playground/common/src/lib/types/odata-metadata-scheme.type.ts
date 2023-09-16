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
  EntityType?: EntityType[];
  EntityContainer?: EntityContainer;
}

interface EntityContainer {
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
  Property: Property[];
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

interface Property {
  '@Name': string;
  '@Type': string;
  '@Nullable': string;
  '@Scale'?: string;
}
